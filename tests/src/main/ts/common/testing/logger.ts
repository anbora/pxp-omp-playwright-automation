// @ts-nocheck
export class Layout {}

export class PatternLayout extends Layout {
  constructor(public pattern: string) {
    super();
  }
}

export class FileAppender {
  constructor(public layout?: Layout, public fileName?: string) {}
  close() {}
}

export class Logger {
  static getLogger(target: unknown) {
    const label = typeof target === "function" ? target.name : String(target);
    return new Logger(label);
  }

  private appenders: unknown[] = [];

  constructor(private label = "Logger") {}

  addAppender(appender: unknown) {
    this.appenders.push(appender);
  }

  removeAppender(appender: unknown) {
    this.appenders = this.appenders.filter((entry) => entry !== appender);
  }

  info(message: unknown) {
    console.log(`[INFO] [${this.label}]`, message);
  }

  warn(message: unknown) {
    console.warn(`[WARN] [${this.label}]`, message);
  }

  error(message: unknown) {
    console.error(`[ERROR] [${this.label}]`, message);
  }
}
