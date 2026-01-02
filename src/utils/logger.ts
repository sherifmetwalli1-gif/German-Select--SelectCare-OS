/**
 * Production-safe Logger
 * Logs are only output in development environment
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LoggerConfig {
  isDevelopment: boolean;
}

class Logger {
  private isDevelopment: boolean;

  constructor(config: LoggerConfig = { isDevelopment: false }) {
    this.isDevelopment = config.isDevelopment;
  }

  setEnvironment(isDevelopment: boolean) {
    this.isDevelopment = isDevelopment;
  }

  private log(level: LogLevel, message: string, ...args: any[]) {
    // Always log errors
    if (level === 'error') {
      console.error(`[ERROR] ${message}`, ...args);
      return;
    }

    // Only log other levels in development
    if (!this.isDevelopment) return;

    switch (level) {
      case 'debug':
        console.debug(`[DEBUG] ${message}`, ...args);
        break;
      case 'info':
        console.info(`[INFO] ${message}`, ...args);
        break;
      case 'warn':
        console.warn(`[WARN] ${message}`, ...args);
        break;
    }
  }

  debug(message: string, ...args: any[]) {
    this.log('debug', message, ...args);
  }

  info(message: string, ...args: any[]) {
    this.log('info', message, ...args);
  }

  warn(message: string, ...args: any[]) {
    this.log('warn', message, ...args);
  }

  error(message: string, ...args: any[]) {
    this.log('error', message, ...args);
  }
}

export const logger = new Logger();
export { Logger };
