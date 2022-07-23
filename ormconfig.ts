import  { config } from 'dotenv';
import { join } from 'path';
import { ConnectionOptions } from 'typeorm';

config({
  path: join(__dirname, '../.env'),
});


export default {
  type: 'postgres',
  name: 'default',
  host: process.env['DB_HOST'],
  port: +(process.env['POSTGRES_PORT'] || 5433),
  username: process.env['POSTGRES_USER'],
  password: process.env['POSTGRES_PASSWORD'],
  database: process.env['POSTGRES_DB'],
  synchronize: false,
  autoReconnect: true,
  migrationsRun: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 1000,
  migrationsTableName: 'migrations',
  entities: [join(__dirname, '**', '*.entity.{ts,js}')],
  migrations: [join(__dirname, 'migration', '*.{ts,js}')],
  cli: {
    migrationsDir: join(__dirname, 'migration'),
  },

} as ConnectionOptions;
