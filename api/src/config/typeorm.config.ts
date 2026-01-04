import { DataSource, DataSourceOptions } from 'typeorm';
import { TaskEntity } from '@to-do-app-nx/database';

export const typeOrmConfig: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'admin',
  password: 'admin123',
  database: 'nx-app',
  entities: [TaskEntity],
  synchronize: true,
  migrations: ['libs/shared/database/src/lib/migrations/*.ts'],
};

export const AppDataSource = new DataSource(typeOrmConfig);
