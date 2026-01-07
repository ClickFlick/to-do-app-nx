import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TaskEntity } from './entities/task.entity';

describe('TasksController', () => {
  let controller: TasksController;

  const mockRepository = {
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(TaskEntity),
          useValue: mockRepository,
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
