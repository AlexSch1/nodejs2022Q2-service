import { Injectable } from '@nestjs/common';
import { appendFile, writeFile, mkdir, stat, readdir } from 'fs/promises';
import { EOL } from 'os';
import { ENV } from '../../core/config';
import { getLogLevel } from './logging-utils';

@Injectable()
export class LogsService {
  private level = getLogLevel(ENV.LOGGER_LEVEL);

  get getFileName(): string {
    return `nest_${Date.now()}.log`;
  }

  getErrorText({
    level,
    context,
    message,
  }: {
    context: string;
    message: string;
    level: string;
  }): string {
    const date = new Date().toUTCString();

    return `${date} [Level: ${level}] Context: ${context} Message: ${message}${EOL}`;
  }

  checkErrorInstances(context: string): boolean {
    return [
      'RouterExplorer',
      'InstanceLoader',
      'NestApplication',
      'RoutesResolver',
      'NestFactory',
    ].includes(context);
  }

  async createLog(log: { context: string; message: string; level: string }) {
    if (!this.level.includes(log.level)) return;

    const logStr = this.getErrorText(log);

    const size = +ENV.LOGGER_FILE_SIZE;

    try {
      if (this.checkErrorInstances(log.context)) return;

      const files = await readdir('src/logs');

      const currentFile = files[files.length - 1];

      if (!currentFile) {
        await this.createFile(logStr, 0, size, this.getFileName);
      } else {
        const lastFileStat = await stat(`src/logs/${currentFile}`);

        const lastFileSize = lastFileStat.size;

        await this.createFile(logStr, lastFileSize, size, currentFile);
      }
    } catch (error) {
      await mkdir('src/logs');

      await this.createFile(logStr, 0, size, this.getFileName);
    }
  }

  async createFile(log, lastSize, size, file) {
    try {
      if (lastSize >= size - 1000) {
        await writeFile(`src/logs/${this.getFileName}`, log);
      } else {
        await appendFile(`src/logs/${file}`, log);
      }
    } catch (e) {
      console.error(e);
    }
  }
}
