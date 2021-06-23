import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TaskService {
  private tasks: Task[] = [];

  public getAllTask(): Task[] {
    return this.tasks;
  }

  public createTask(title: string, description: string): Task {
    const task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }
}
