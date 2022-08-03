import { config } from 'dotenv';
import { join } from 'path';

config({
  path: join(__dirname, '../../.env'),
});

export const ENV = {
  PORT: +process.env['PORT'] || 4000,
};
