import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { TaskController } from './task.controller';
import { TaskRepository } from './task.repository';
import { TaskService } from './task.service';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([TaskRepository]),
    AuthModule,
  ],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
