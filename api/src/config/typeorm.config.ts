import { DataSource, DataSourceOptions } from 'typeorm';
import { TaskEntity } from '../tasks/entities/task.entity';

export const typeOrmConfig: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'admin',
  password: 'admin123',
  database: 'nx-app',
  entities: [TaskEntity],
  synchronize: true,
};

export const AppDataSource = new DataSource(typeOrmConfig);
