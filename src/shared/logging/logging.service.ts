import { Injectable, LogLevel } from '@nestjs/common';
import { appendFile, writeFile, mkdir, stat, readdir } from 'fs/promises';
import { EOL } from 'os';
import {ENV} from "../../core/config";
import {checkError, getLogLevel} from "./logging-utils";

@Injectable()
export class LogsService {
  private level = getLogLevel(ENV.LOGGER_LEVEL);

  get getFileName(): string {
    return `nest_${Date.now()}.log`;
  }

  async createLog(log) {

    if (!this.level.includes(log.level)) return;

    const logString = `[NEST] ${new Date().toUTCString()} [Level: ${
        log.level
    }] Context: ${log.context} Message: ${log.message}${EOL}`;

    const size = +ENV.LOGGER_FILE_SIZE;

    try {
      if (checkError(log.context)) return;

      const files = await readdir('src/logs');

      const currentFile = files[files.length - 1];

      if (!currentFile) {
        await this.createFile(logString, 0, size, this.getFileName);
      } else {
        const lastFileStat = await stat(`src/logs/${currentFile}`);

        const lastFileSize = lastFileStat.size;

        await this.createFile(logString, lastFileSize, size, currentFile);
      }
    } catch (error) {

      await mkdir('src/logs');

      await this.createFile(logString, 0, size, this.getFileName);
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