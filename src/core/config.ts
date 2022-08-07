import { config } from 'dotenv';
import { join } from 'path';

config({
  path: join(__dirname, '../../.env'),
});

export const ENV = {
  PORT: +process.env['PORT'] || 4000,
  JWT_SECRET_KEY: process.env['JWT_SECRET_KEY'],
};
