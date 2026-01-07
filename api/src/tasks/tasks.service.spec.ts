import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TaskEntity } from './entities/task.entity';

describe('TasksService', () => {
  let service: TasksService;

  const mockRepository = {
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(TaskEntity),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
