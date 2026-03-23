type Class<T> = new (...args: any[]) => T;
type Runnable = (...args: any[]) => any;
type Callable<T = any> = (...args: any[]) => T;
type List<T> = T[];
type Path = JavaPath | string;

declare class RuntimeException extends Error {}
declare class ArrayList<T> extends Array<T> {}
declare class HashMap<K, V> extends Map<K, V> {
  put(key: K, value: V): V;
  getOrDefault(key: K, fallback: V): V;
}
declare class HashSet<T> extends Set<T> {}
declare class Random {
  nextInt(bound: number): number;
}
declare class SecureRandom extends Random {}
declare class DateFormat {
  constructor(pattern?: string);
  format(value: Date | number | string): string;
}
declare class SimpleDateFormat extends DateFormat {
  constructor(pattern: string, locale?: unknown);
}
declare class AtomicReference<T> {
  constructor(value?: T | null);
  get(): T | null;
  set(value: T): void;
}
declare class AtomicInteger {
  constructor(value?: number);
  get(): number;
  set(value: number): void;
  getAndIncrement(): number;
  incrementAndGet(): number;
}

declare class JavaPath {
  toAbsolutePath(): JavaPath;
  toString(): string;
}

declare class Simulation {
  pause(seconds: number): any;
  setUp(...args: any[]): {
    protocols(...protocols: any[]): any;
  };
}

declare const Pattern: {
  compile(pattern: string): RegExp;
};

declare const Integer: {
  parseInt(value: unknown): number;
  valueOf(value: unknown): number;
};

declare const Long: {
  parseLong(value: unknown): number;
  valueOf(value: unknown): number;
};

declare const UUID: {
  randomUUID(): string;
};

declare const Paths: {
  get(...segments: string[]): JavaPath;
};

declare const Files: {
  write(path: Path, lines: Iterable<unknown>): void;
};

declare const File: {
  separator: string;
};

declare const Collections: {
  sort<T>(values: T[]): void;
  singletonList<T>(value: T): T[];
  emptyList<T>(): T[];
};

declare const List: {
  of<T>(...values: T[]): T[];
};

declare const Arrays: {
  asList<T>(...values: T[]): T[];
  stream<T>(values: T[]): {
    filter(callback: (value: T) => boolean): any;
    map<U>(callback: (value: T) => U): any;
    forEach(callback: (value: T) => void): void;
    findFirst(): {
      get(): T;
    };
    collect(): T[];
    toList(): T[];
  };
};

declare const Thread: {
  sleep(milliseconds: number): Promise<void>;
  currentThread(): {
    getName(): string;
    getId(): number;
  };
};

declare const System: {
  out: {
    print(...values: unknown[]): void;
    println(...values: unknown[]): void;
    printf(template: string, ...values: unknown[]): void;
  };
  getProperty(key: string, fallback?: string): string;
  setProperty(key: string, value: string): void;
};

declare const Locale: {
  US: string;
};

declare const http: any;
declare const scenario: any;
declare const exec: any;
declare const RawFileBody: any;
declare const AllowList: any;
declare const DenyList: any;
declare const nothingFor: any;
declare const atOnceUsers: any;
declare const rampUsers: any;

interface BooleanConstructor {
  parseBoolean(value: unknown): boolean;
}

interface StringConstructor {
  format(template: string, ...values: unknown[]): string;
  valueOf(value: unknown): string;
}

interface String {
  contains(value: unknown): boolean;
  equals(value: unknown): boolean;
  equalsIgnoreCase(value: unknown): boolean;
  isEmpty(): boolean;
}

interface Array<T> {
  get(index: number): T;
  contains(value: unknown): boolean;
  containsAll(values: Iterable<unknown>): boolean;
  size(): number;
  isEmpty(): boolean;
  add(value: T): boolean;
  toArray(values?: unknown): T[];
  stream(): {
    filter(callback: (value: T) => boolean): any;
    map<U>(callback: (value: T) => U): any;
    forEach(callback: (value: T) => void): void;
    findFirst(): {
      get(): T;
    };
    collect(): T[];
    toList(): T[];
  };
}

interface Set<T> {
  isEmpty(): boolean;
}
