import { config } from 'dotenv';
import { join } from 'path';

config({
  path: join(__dirname, '../../../.env'),
});

export const ENV = {
  PORT: +process.env['PORT'] || 4001,
  JWT_SECRET_KEY: process.env['JWT_SECRET_KEY'],
  LOGGER_FILE_SIZE: process.env['LOGGER_FILE_SIZE'],
  LOGGER_LEVEL: process.env['LOGGER_LEVEL'],
};
