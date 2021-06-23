import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskService {
  private tasks = [];

  public getAllTask() {
    return this.tasks;
  }
}
