import  { config } from 'dotenv';
import { join } from 'path';
import { ConnectionOptions } from 'typeorm';
import {PostgresConnectionOptions} from "typeorm/driver/postgres/PostgresConnectionOptions";
// import { UserEntity } from '../entities/user.entity';
// import { TaskEntity } from '../entities/task.entity';
// import { BoardEntity } from '../entities/board.entity';
// import { ColumnEntity } from '../entities/column.entity';

config({
  path: join(__dirname, './.env'),
});

export const ormConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env['DB_HOST'],
  port: +(process.env['POSTGRES_PORT'] || 5433),
  username: process.env['POSTGRES_USER'],
  password: process.env['POSTGRES_PASSWORD'],
  database: process.env['POSTGRES_DB'],
  entities: ['./src/**/*.entity.js', './src/**/*.entity.ts'],
  migrations: ['./src/migration/*.js', './src/migration/*.ts'],
  // @ts-ignore
  cli: {
    migrationsDir: './src/migration',
  },
  migrationsRun: true,
};

export default ormConfig;
