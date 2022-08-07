import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ENV } from './core/config';
import { readFile } from 'fs/promises';
import { dirname, join } from 'path';
import { SwaggerModule } from '@nestjs/swagger';
import { parse } from 'yaml';
import { MyLoggerService } from './shared/logging/my-logger.service';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const rootDirname = dirname(__dirname);

  const DOC_API = await readFile(
    join(rootDirname, '..', 'doc', 'api.yaml'),
    'utf-8',
  );

  const document = parse(DOC_API);

  SwaggerModule.setup('doc', app, document);

  app.useLogger(app.get(MyLoggerService));

  await app.listen(ENV.PORT);

  process.on('uncaughtException', (error: Error) => {
    logger.error(error.message);
    setTimeout(() => {
      process.exit(1);
    }, 1000);
  });

  process.on('unhandledRejection', (reason: Error) => {
    logger.error(reason.message);
    setTimeout(() => {
      process.exit(1);
    }, 1000);
  });
}
bootstrap();
