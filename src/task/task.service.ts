import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';

@Injectable()
export class TaskService {
  private tasks: Task[] = [];

  public getAllTask(): Task[] {
    return this.tasks;
  }

  public getTaskByFilter(filterDto: GetTaskFilterDto): Task[] {
    const { status, search } = filterDto;
    let tasks = this.getAllTask();
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter(
        (task) =>
          task.title.includes(search) || task.description.includes(search),
      );
    }

    return tasks;
  }

  public getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  public createTask(createTaskDto: CreateTaskDto): Task {
    const task = {
      id: uuid(),
      ...createTaskDto,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  public updateTaskStatusById(id: string, status: TaskStatus) {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }

  public deleteTaskById(id: string): Task {
    const task = this.tasks.find((task) => task.id === id);
    this.tasks = this.tasks.filter((task) => task.id !== id);
    return task;
  }
}
