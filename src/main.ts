import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import {join} from "path";
import {config} from "dotenv";

config({
  path: join(__dirname, '../../.env'),
});


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  console.log(process.env.PORT)

  await app.listen(process.env.PORT || 4000);
}
bootstrap();
