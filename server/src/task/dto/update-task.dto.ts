import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { IsEnum } from 'class-validator';
import { TaskStatus } from '../task-types';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
    @IsEnum(TaskStatus)
    status: TaskStatus;
}
