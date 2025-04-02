import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Response } from 'express';

@Injectable()
export class TaskService {
  constructor(private readonly prisma : PrismaService){}

  async create(createTaskDto: CreateTaskDto , res : Response) {
    try {
      const {
        title,
        description,
        status,
        priority,
        tags,
        startDate,
        dueDate,
        points,
        projectId,
        authorUserId,
        assignedUserId,
      } = createTaskDto;
      const newTask = await this.prisma.task.create({
        data: {
          title,
          description,
          status,
          priority,
          tags,
          startDate,
          dueDate,
          points,
          projectId,
          authorUserId,
          assignedUserId,
        },
      });
      res.status(201).json(newTask);
    } catch (error) {
      console.log(error);
      res.json({
        status : 500,
        message : "Server Error occured"
      })
    }
  }

  async findAll(projectId : string , res : Response) {
    try {
      const tasks = await this.prisma.task.findMany({
        where : {
          projectId : Number(projectId)
        },
        include : {
          author : true,
          assignee : true,
          comments : true,
          attachments : true
        }
      })
      return res.json({
        status : 200,
        message : "Tasks found successfully",
        data : tasks
      })
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException(`${error}`);
    }
  }

  async findOne(query: string , res : Response) {
    const tasks = await this.prisma.task.findMany({
      where : {
        OR : [
          {title : {contains : query}},
          {description : {contains : query}},
        ]
      }
    })

    const projects = await this.prisma.project.findMany({
      where : {
        OR : [
          {name : {contains : query}},
          {description : {contains : query}},
        ]
      }
    })

    const users= await this.prisma.user.findMany({
      where : {
        OR : [
          {username : {contains : query}},
        ]
      }
    })

    return res.json({tasks , projects , users})
  }

  async update(id: number, updateTaskDto: UpdateTaskDto , res : Response) {
  try {
    const {status} = updateTaskDto;
    const updatedTask = await this.prisma.task.update({
      where: {
        id: Number(id),
      },
      data: {
        status: status,
      },
    });
    res.json(updatedTask);
  } catch (error: any) {
    console.log(error)
    res.status(500).json({ message: `Error updating task: ${error.message}` });
  }
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }

  async getTaskByUser(userId : number , res : Response){
    const tasks = await this.prisma.task.findMany({
      where : {
        OR : [
          {authorUserId : Number(userId)},
          {assignedUserId : Number(userId)},
        ]
      },
      include : {
        author : true,
        assignee : true
      }
    })
    return res.json({
      data : tasks
    })
  }
}
