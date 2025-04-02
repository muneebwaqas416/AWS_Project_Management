import { IsString, IsNotEmpty, IsOptional, IsEnum, IsInt, IsDateString, IsUUID, ArrayNotEmpty, IsNumber } from 'class-validator';
import { TaskStatus, TaskPriority } from '../task-types'; // Define Enums separately

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(TaskStatus)
  status: TaskStatus;

  @IsEnum(TaskPriority)
  priority: TaskPriority;

  @IsString()
  tags: string;

  @IsDateString()
  @IsOptional()
  startDate?: string;

  @IsDateString()
  @IsOptional()
  dueDate?: string;

  @IsInt()
  @IsOptional()
  points?: number;

  @IsNumber()
  projectId: number;

  @IsNumber()
  authorUserId: number;

  @IsNumber()
  assignedUserId: number;
}
