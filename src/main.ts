import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ENV } from './core/config';
import { readFile } from 'fs/promises';
import { dirname, join } from 'path';
import { SwaggerModule } from '@nestjs/swagger';
import { parse } from 'yaml';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const rootDirname = dirname(__dirname);

  const DOC_API = await readFile(join(rootDirname, '..', 'doc', 'api.yaml'), 'utf-8');

  const document = parse(DOC_API);

  SwaggerModule.setup('doc', app, document);

  await app.listen(ENV.PORT);
}
bootstrap();
