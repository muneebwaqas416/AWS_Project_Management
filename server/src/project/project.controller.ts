import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, HttpCode, HttpStatus, Res } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { LoggingValidationPipe } from 'src/common/pipes/validation.pipes';
import { Response } from 'express';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post('/createProject')
  @UsePipes(new LoggingValidationPipe())
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createProjectDto: CreateProjectDto , @Res() res : Response) {
    return this.projectService.create(createProjectDto , res);
  }

  @Get("/findAll")
  findAll() {
    return this.projectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(+id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectService.remove(+id);
  }
}
