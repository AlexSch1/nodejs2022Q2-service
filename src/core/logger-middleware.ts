import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { getLogLevel, Levels } from '../shared/logging/logging-utils';
import { ENV } from './config';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private level = getLogLevel(ENV.LOGGER_LEVEL);
  private logger = new Logger('HTTP');

  stringifyObj(query): string {
    return JSON.stringify(query);
  }

  use(request: Request, response: Response, next: NextFunction): void {
    const { originalUrl, method } = request;
    const query = this.stringifyObj(request.query);
    const body = this.stringifyObj(request.body);

    response.on('finish', () => {
      const { statusCode, statusMessage } = response;

      const message = `mth: ${method} url: ${originalUrl} query: ${query} body: ${body} StatusCode: ${statusCode} StatusMessage: ${statusMessage}`;

      if (this.level.includes(Levels.ERROR) && statusCode >= 500) {
        return this.logger.error(message);
      } else if (
        this.level.includes(Levels.WARM) &&
        statusCode >= 400 &&
        statusCode < 500
      ) {
        return this.logger.warn(message);
      } else if (this.level.includes(Levels.LOG) && statusCode < 400) {
        return this.logger.log(message);
      } else if (this.level.includes(Levels.VERB) && statusCode < 400) {
        return this.logger.verbose(message);
      } else if (this.level.includes(Levels.DEBUG) && statusCode < 400) {
        return this.logger.debug(message);
      }
    });

    next();
  }
}
