import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {LogsService} from "./logging.service";
import {MyLoggerService} from "./my-logger.service";

@Module({
	imports: [ConfigModule],
	providers: [MyLoggerService, LogsService],
	exports: [MyLoggerService],
})
export class LoggerModule {}