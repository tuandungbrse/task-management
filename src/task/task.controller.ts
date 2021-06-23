import { Body, Controller, Get, Post } from '@nestjs/common';
import { Task } from './task.model';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  public getAllTask() {
    return this.taskService.getAllTask();
  }

  @Post()
  public createTask(
    @Body('title') title: string,
    @Body('description') description: string,
  ): Task {
    return this.taskService.createTask(title, description);
  }
}
