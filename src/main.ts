import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";
import yamljs from "yamljs";
import { join } from 'path';
import {SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  // const swaggerDocument = yamljs.load(join(__dirname, '../doc/api.yaml'));
  // SwaggerModule.setup('doc', app, swaggerDocument);

  await app.listen(process.env.PORT || 4000);
}
bootstrap();
