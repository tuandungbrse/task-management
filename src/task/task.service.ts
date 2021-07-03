import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { User } from 'src/user/user.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskRepository) private readonly taskRepo: TaskRepository,
  ) {}

  public getAllTask(filterDto: GetTaskFilterDto, user: User): Promise<Task[]> {
    return this.taskRepo.getAllTask(filterDto, user);
  }

  public async getTaskById(id: string): Promise<Task> {
    const found = await this.taskRepo.findOne(id);
    if (!found) {
      throw new NotFoundException(`Task with ${id} not found!`);
    }
    return found;
  }

  public createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.taskRepo.createTask(createTaskDto, user);
  }

  public async updateTaskStatusById(
    id: string,
    status: TaskStatus,
  ): Promise<Task> {
    const found = await this.getTaskById(id);

    found.status = status;
    await this.taskRepo.save(found);
    return found;
  }

  public async deleteTaskById(id: string): Promise<void> {
    const found = await this.getTaskById(id);
    return this.taskRepo.deleteTaskById(found.id);
  }
}
