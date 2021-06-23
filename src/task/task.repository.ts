import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  public async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.create({
      ...createTaskDto,
      status: TaskStatus.OPEN,
    });

    await this.save(task);
    return task;
  }

  public async deleteTaskById(id: string): Promise<void> {
    return this.deleteTaskById(id);
  }

  public async getAllTask(filterDto: GetTaskFilterDto): Promise<Task[]> {
    const query = this.createQueryBuilder('task');
    const { status, search } = filterDto;

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
        {
          search: `%${search}%`,
        },
      );
    }

    return query.getMany();
  }
}
