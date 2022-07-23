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
  // autoLoadEntities: true,
  // entities: [UserEntity, TaskEntity, BoardEntity, ColumnEntity],
  // entities: [],
  // migrations: ['dist/migration/**/*.{ts,js}'],
  entities: [join(__dirname, '**', '*.entity.{ts,js}')],
  migrations: [join(__dirname, 'migration', '*.{ts,js}')],
  cli: {
    migrationsDir: join(__dirname, './src/migration'),
  },  // cli: {
  //   entitiesDir: 'src/entities',
  //   migrationsDir: 'src/migration',
  // },
  // migrationsTableName: 'migrations',
  // type: 'postgres',
  // host: 'localhost',
  // port: 5432,
  // username: 'user',
  // password: 'pass',
  // database: 'somehealthchecker',
  // logging: false,
  // synchronize: false,
  // name: 'default',
  // entities: ['src/**/**.entity{.ts,.js}'],
  // migrations: ['src/migrations/**/*{.ts,.js}'],
  // subscribers: ['src/subscriber/**/*{.ts,.js}'],
  // cli: {
  //   migrationsDir: 'src/migration',
  // },
} as ConnectionOptions;
//   "typeorm": "ts-node ./node_modules/typeorm/cli.js --config=cli.orm.config.ts",
//     "typeorm": "ts-node ./node_modules/typeorm/cli.js --config=src/configs/ormconfig.ts",
//     "migration:run": "npm run typeorm migration:run",
//     "migration:revert": "npm run typeorm migration:revert",
//     "migration:generate": "npm run typeorm migration:generate -- -n migrationNameHere"