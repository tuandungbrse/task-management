import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  public getTasks(@Query() filterDto: GetTaskFilterDto): Promise<Task[]> {
    return this.taskService.getAllTask(filterDto);
  }

  @Get('/:id')
  public getTaskById(@Param('id') id: string): Promise<Task> {
    return this.taskService.getTaskById(id);
  }

  @Post()
  public createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(createTaskDto);
  }

  @Patch('/:id/status')
  public updateTaskStatusById(
    @Param('id') id: string,
    @Body() updateTaskStatusById: UpdateTaskStatusDto,
  ): Promise<Task> {
    const { status } = updateTaskStatusById;
    return this.taskService.updateTaskStatusById(id, status);
  }

  @Delete('/:id')
  public deleteTaskById(@Param('id') id: string): Promise<void> {
    return this.taskService.deleteTaskById(id);
  }
}
