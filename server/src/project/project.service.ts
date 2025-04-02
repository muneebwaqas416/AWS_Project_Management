import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Response } from 'express';

@Injectable()
export class ProjectService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}
  async create(createProjectDto: CreateProjectDto , res : Response) {
    try {
      console.log(createProjectDto)
      const {name , description , startDate , endDate} = createProjectDto;
      const newProject = await this.prisma.project.create({
        data : {
            name,
            description,
            startDate : new Date(startDate),
            endDate : new Date(endDate)
        }
      })
        return res.json({
          message : "Project created successfully",
          data : newProject
        })
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException();
    }
    
  }

  async findAll() {
    try {
      const projects = await this.prisma.project.findMany();
      if(!projects){
        throw new NotFoundException('No projects found')
      }
      return {
        status: 200,
        message: 'Projects found successfully',
        data: projects,
      }
    } catch (error) {
      console.log(error);
      throw new NotFoundException({
        status : 500,
        message : 'Error fetching projects'
      })
    }
  }

  async findOne(id: number) {
    const project = await this.prisma.project.findUnique({
      where : {
        id : id
      }
    })
    return project;
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
