import { Injectable } from '@nestjs/common';
import { Task } from './task.model';

@Injectable()
export class TaskService {
  private tasks: Task[] = [];

  public getAllTask(): Task[] {
    return this.tasks;
  }
}
