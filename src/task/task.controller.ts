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
import { Task, TaskStatus } from './task.model';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  public getTasks(@Query() filterDto: GetTaskFilterDto): Task[] {
    if (Object.keys(filterDto)) {
      return this.taskService.getTaskByFilter(filterDto);
    } else {
      return this.taskService.getAllTask();
    }
  }

  @Get('/:id')
  public getTaskById(@Param('id') id: string): Task {
    return this.taskService.getTaskById(id);
  }

  @Post()
  public createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.taskService.createTask(createTaskDto);
  }

  @Patch('/:id/status')
  public updateTaskStatusById(
    @Param('id') id: string,
    @Body() updateTaskStatusById: UpdateTaskStatusDto,
  ): Task {
    const { status } = updateTaskStatusById;
    return this.taskService.updateTaskStatusById(id, status);
  }

  @Delete('/:id')
  public deleteTaskById(@Param('id') id: string): Task {
    return this.taskService.deleteTaskById(id);
  }
}
