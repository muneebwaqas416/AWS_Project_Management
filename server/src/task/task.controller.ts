import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, Query, BadRequestException, Res, Req } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { LoggingValidationPipe } from 'src/common/pipes/validation.pipes';
import { PrismaService } from 'src/prisma/prisma.service';
import { Response } from 'express';

@Controller('task')
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
  ) {}

  @Post("/createTask")
  @UsePipes(new LoggingValidationPipe())
  create(@Body() createTaskDto : CreateTaskDto , @Res() res : Response) {
    return this.taskService.create(createTaskDto , res);
  }

  @Get('/getTasks')
  findAll(@Query('projectId') projectId : string , @Res() res : Response) {
    if (!projectId) {
      throw new BadRequestException('projectId is required');
    }
    return this.taskService.findAll(projectId , res);
  }

  @Get()
  findOne(@Query('query') query: string   , @Res() res : Response) {
    return this.taskService.findOne(query , res);
  }

  @Patch('/updateTask/:id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto , @Res() res : Response) {
    return this.taskService.update(+id, updateTaskDto , res);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(+id);
  }

  @Get('/getTaskByUser/:userId')
  getTaskByUser(@Param('userId') userId: number , @Res() res : Response){
    return this.taskService.getTaskByUser(userId , res);
  }
}
