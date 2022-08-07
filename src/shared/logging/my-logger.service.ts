import { Injectable, ConsoleLogger } from '@nestjs/common';
import { ConsoleLoggerOptions } from '@nestjs/common/services/console-logger.service';
import { ConfigService } from '@nestjs/config';
import {LogsService} from "./logging.service";
import {Levels} from "./logging-utils";



@Injectable()
export class MyLoggerService extends ConsoleLogger {
  private readonly logsService: LogsService;

  constructor(
      context: string,
      options: ConsoleLoggerOptions,
      configService: ConfigService,
      logsService: LogsService,
  ) {
    super(context, {
      ...options,
      logLevels: [Levels.DEBUG, Levels.VERB, Levels.LOG, Levels.WARM, Levels.ERROR],
    });

    this.logsService = logsService;
  }

  async error(message: string, stack?: string, context?: string) {
    super.error.apply(this, [message, stack, context]);

    await this.logsService.createLog({
      message,
      context,
      level: Levels.ERROR,
    });
  }

  async warn(message: string, context?: string) {
    super.warn.apply(this, [message, context]);

    await this.logsService.createLog({
      message,
      context,
      level: Levels.WARM,
    });
  }

  async log(message: string, context?: string) {
    super.log.apply(this, [message, context]);

    await this.logsService.createLog({
      message,
      context,
      level: Levels.LOG,
    });
  }

  async debug(message: string, context?: string) {
    super.debug.apply(this, [message, context]);

    await this.logsService.createLog({
      message,
      context,
      level: Levels.DEBUG,
    });
  }

  async verbose(message: string, context?: string) {
    super.verbose.apply(this, [message, context]);

    await this.logsService.createLog({
      message,
      context,
      level: Levels.VERB,
    });
  }
}