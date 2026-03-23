import path from "node:path";
import { randomUUID } from "node:crypto";

type MutableGlobal = typeof globalThis & Record<string, unknown>;

const globalScope = globalThis as MutableGlobal;

if (!(String as unknown as { format?: unknown }).format) {
  (String as unknown as { format: (template: string, ...values: unknown[]) => string }).format = (
    template,
    ...values
  ) => template.replace(/%[sdif]/g, () => String(values.shift() ?? ""));
}

(String as unknown as { valueOf: (value: unknown) => string }).valueOf = (value) => String(value);

if (!(String.prototype as Record<string, unknown>).equals) {
  (String.prototype as Record<string, unknown>).equals = function equals(value: unknown) {
    return this.toString() === String(value);
  };
}

if (!(String.prototype as Record<string, unknown>).equalsIgnoreCase) {
  (String.prototype as Record<string, unknown>).equalsIgnoreCase = function equalsIgnoreCase(
    value: unknown
  ) {
    return this.toString().toLowerCase() === String(value).toLowerCase();
  };
}

if (!(String.prototype as Record<string, unknown>).contains) {
  (String.prototype as Record<string, unknown>).contains = function contains(value: unknown) {
    return this.toString().includes(String(value));
  };
}

if (!(String.prototype as Record<string, unknown>).isEmpty) {
  (String.prototype as Record<string, unknown>).isEmpty = function isEmpty() {
    return this.toString().length === 0;
  };
}

if (!(Array.prototype as Record<string, unknown>).get) {
  (Array.prototype as Record<string, unknown>).get = function get(index: number) {
    return this[index];
  };
}

if (!(Array.prototype as Record<string, unknown>).contains) {
  (Array.prototype as Record<string, unknown>).contains = function contains(value: unknown) {
    return this.includes(value);
  };
}

if (!(Array.prototype as Record<string, unknown>).containsAll) {
  (Array.prototype as Record<string, unknown>).containsAll = function containsAll(values: Iterable<unknown>) {
    return Array.from(values ?? []).every((value) => this.includes(value));
  };
}

if (!(Array.prototype as Record<string, unknown>).size) {
  (Array.prototype as Record<string, unknown>).size = function size() {
    return this.length;
  };
}

if (!(Array.prototype as Record<string, unknown>).isEmpty) {
  (Array.prototype as Record<string, unknown>).isEmpty = function isEmpty() {
    return this.length === 0;
  };
}

if (!(Array.prototype as Record<string, unknown>).add) {
  (Array.prototype as Record<string, unknown>).add = function add(value: unknown) {
    this.push(value);
    return true;
  };
}

if (!(Array.prototype as Record<string, unknown>).toArray) {
  (Array.prototype as Record<string, unknown>).toArray = function toArray() {
    return Array.from(this);
  };
}

if (!(Array.prototype as Record<string, unknown>).stream) {
  (Array.prototype as Record<string, unknown>).stream = function stream() {
    return new JavaStream(Array.from(this));
  };
}

class RuntimeException extends Error {}
class ArrayList<T> extends Array<T> {}
class HashMap<K, V> extends Map<K, V> {
  put(key: K, value: V) {
    this.set(key, value);
    return value;
  }

  getOrDefault(key: K, fallback: V) {
    return this.has(key) ? (this.get(key) as V) : fallback;
  }
}
class HashSet<T> extends Set<T> {}
class Random {
  nextInt(bound: number) {
    if (bound <= 0) {
      return 0;
    }
    return Math.floor(Math.random() * bound);
  }
}
class SecureRandom extends Random {}
class DateFormat {
  constructor(protected readonly pattern = "yyyy-MM-dd") {}

  format(value: Date | number | string) {
    const date = value instanceof Date ? value : new Date(value);
    return formatDate(this.pattern, date);
  }
}
class SimpleDateFormat extends DateFormat {
  constructor(pattern: string, _locale?: unknown) {
    super(pattern);
  }
}

class JavaPath {
  constructor(private readonly value: string) {}

  toAbsolutePath() {
    return new JavaPath(path.resolve(this.value));
  }

  toString() {
    return this.value;
  }
}

class AtomicReference<T> {
  constructor(private value: T | null = null) {}
  get() {
    return this.value;
  }
  set(value: T) {
    this.value = value;
  }
}

class AtomicInteger {
  constructor(private value = 0) {}
  get() {
    return this.value;
  }
  set(value: number) {
    this.value = value;
  }
  getAndIncrement() {
    const current = this.value;
    this.value += 1;
    return current;
  }
  incrementAndGet() {
    this.value += 1;
    return this.value;
  }
}

class JavaStream<T> {
  constructor(private values: T[]) {}
  filter(callback: (value: T) => boolean) {
    return new JavaStream(this.values.filter(callback));
  }
  map<U>(callback: (value: T) => U) {
    return new JavaStream(this.values.map(callback));
  }
  forEach(callback: (value: T) => void) {
    this.values.forEach(callback);
  }
  findFirst() {
    return {
      get: () => this.values[0]
    };
  }
  collect() {
    return this.values;
  }
  toList() {
    return this.values;
  }
}

globalScope.RuntimeException = globalScope.RuntimeException ?? RuntimeException;
globalScope.ArrayList = globalScope.ArrayList ?? ArrayList;
globalScope.HashMap = globalScope.HashMap ?? HashMap;
globalScope.HashSet = globalScope.HashSet ?? HashSet;
globalScope.Random = globalScope.Random ?? Random;
globalScope.SecureRandom = globalScope.SecureRandom ?? SecureRandom;
globalScope.DateFormat = globalScope.DateFormat ?? DateFormat;
globalScope.SimpleDateFormat = globalScope.SimpleDateFormat ?? SimpleDateFormat;
globalScope.AtomicReference = globalScope.AtomicReference ?? AtomicReference;
globalScope.AtomicInteger = globalScope.AtomicInteger ?? AtomicInteger;
globalScope.Pattern =
  globalScope.Pattern ??
  ({
    compile: (value: string) => new RegExp(value)
  } as const);
globalScope.UUID =
  globalScope.UUID ??
  ({
    randomUUID
  } as const);
globalScope.Paths =
  globalScope.Paths ??
  ({
    get: (...segments: string[]) => new JavaPath(path.join(...segments))
  } as const);
globalScope.Files =
  globalScope.Files ??
  ({
    write: (targetPath: string | { toString(): string }, lines: Iterable<unknown>) => {
      const resolvedPath = typeof targetPath === "string" ? targetPath : targetPath.toString();
      const content = Array.from(lines ?? []).map(String).join("\n");
      return require("node:fs").writeFileSync(resolvedPath, content);
    }
  } as const);
globalScope.File =
  globalScope.File ??
  ({
    separator: path.sep
  } as const);
globalScope.Collections =
  globalScope.Collections ??
  ({
    sort: <T>(values: T[]) => {
      values.sort();
    },
    singletonList: <T>(value: T) => [value],
    emptyList: <T>() => [] as T[]
  } as const);
globalScope.Integer =
  globalScope.Integer ??
  ({
    parseInt: (value: unknown) => Number.parseInt(String(value), 10),
    valueOf: (value: unknown) => Number(value)
  } as const);
globalScope.Long =
  globalScope.Long ??
  ({
    parseLong: (value: unknown) => Number.parseInt(String(value), 10),
    valueOf: (value: unknown) => Number(value)
  } as const);
globalScope.Arrays =
  globalScope.Arrays ??
  ({
    asList: <T>(...values: T[]) => values,
    stream: <T>(values: T[]) => new JavaStream(values)
  } as const);
globalScope.List =
  globalScope.List ??
  ({
    of: <T>(...values: T[]) => values
  } as const);
globalScope.Thread =
  globalScope.Thread ??
  ({
    sleep: async (milliseconds: number) => {
      await new Promise((resolve) => setTimeout(resolve, milliseconds));
    },
    currentThread: () => ({
      getName: () => "main",
      getId: () => 1
    })
  } as const);
globalScope.System =
  globalScope.System ??
  (() => {
    const properties = new Map<string, string>();
    return {
      out: {
        print: (...args: unknown[]) => process.stdout.write(args.map(String).join("")),
        println: (...args: unknown[]) => console.log(...args),
        printf: (template: string, ...values: unknown[]) => {
          console.log(template.replace(/%[sdn]/g, () => String(values.shift() ?? "")));
        }
      },
      getProperty: (key: string, fallback = "") => properties.get(key) ?? process.env[key] ?? fallback,
      setProperty: (key: string, value: string) => {
        properties.set(key, value);
      }
    };
  })();
globalScope.Locale =
  globalScope.Locale ??
  ({
    US: "en-US"
  } as const);

(Boolean as unknown as { parseBoolean?: (value: unknown) => boolean }).parseBoolean =
  (Boolean as unknown as { parseBoolean?: (value: unknown) => boolean }).parseBoolean ??
  ((value: unknown) => String(value).toLowerCase() === "true");

if (!(Set.prototype as Record<string, unknown>).isEmpty) {
  (Set.prototype as Record<string, unknown>).isEmpty = function isEmpty() {
    return this.size === 0;
  };
}

export function randomAlphabetic(length: number) {
  const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return Array.from({ length }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join("");
}

function formatDate(pattern: string, date: Date) {
  const pad = (value: number, size = 2) => String(value).padStart(size, "0");
  return pattern
    .replace(/yyyy/g, String(date.getFullYear()))
    .replace(/yy/g, String(date.getFullYear()).slice(-2))
    .replace(/MM/g, pad(date.getMonth() + 1))
    .replace(/dd/g, pad(date.getDate()))
    .replace(/HH/g, pad(date.getHours()))
    .replace(/mm/g, pad(date.getMinutes()))
    .replace(/ss/g, pad(date.getSeconds()))
    .replace(/SSS/g, pad(date.getMilliseconds(), 3));
}

export {};
