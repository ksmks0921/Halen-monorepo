import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BaseLoggerService extends Logger {
  classContext = '';
  constructor(protected readonly configService: ConfigService) {
    super();
  }

  getRootTraceId() {
    const traceId = this.configService.get<string>('_X_AMZN_TRACE_ID');
    if (traceId) {
      const traceIds = traceId.split(';');
      return traceIds.length > 0 ? traceIds[0].replace('Root=', '') : '';
    }
    return '';
  }

  log(message: string, context?: string) {
    super.log(
      `[${this.getRootTraceId()}] - ${message}`,
      context || this.classContext,
    );
  }

  error(message: string, trace: string, context?: string) {
    super.error(
      `[${this.getRootTraceId()}] -  ${message}`,
      trace,
      context || this.classContext,
    );
  }

  warn(message: string, context?: string) {
    super.warn(
      `[${this.getRootTraceId()}] - ${message}`,
      context || this.classContext,
    );
  }

  debug(message: string, context?: string) {
    super.debug(
      `[${this.getRootTraceId()}] - ${message}`,
      context || this.classContext,
    );
  }

  verbose(message: string, context?: string) {
    super.verbose(
      `[${this.getRootTraceId()}] ${message}`,
      context || this.classContext,
    );
  }
}
