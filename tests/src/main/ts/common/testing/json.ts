// @ts-nocheck
class JsonElementWrapper {
  constructor(protected value: any) {}

  getAsString() {
    return String(this.value ?? "");
  }

  getAsInt() {
    return Number(this.value ?? 0);
  }

  getAsBoolean() {
    return Boolean(this.value);
  }

  getAsJsonArray() {
    return new JsonArray(Array.isArray(this.value) ? this.value : []);
  }

  getAsJsonObject() {
    return new JsonObject(this.value && typeof this.value === "object" ? this.value : {});
  }

  toString() {
    return JSON.stringify(this.value);
  }
}

export class JsonElement extends JsonElementWrapper {}

export class JsonObject extends JsonElementWrapper {
  get(key: string) {
    return wrap(this.value?.[key]);
  }

  getAsJsonArray(key: string) {
    return new JsonArray(this.value?.[key] ?? []);
  }

  getAsJsonObject(key: string) {
    return new JsonObject(this.value?.[key] ?? {});
  }
}

export class JsonArray extends JsonElementWrapper implements Iterable<JsonElement> {
  constructor(value: any[]) {
    super(value);
  }

  get(index: number) {
    return wrap(this.value[index]);
  }

  size() {
    return this.value.length;
  }

  forEach(callback: (value: JsonElement, index: number) => void) {
    this.value.forEach((entry: unknown, index: number) => callback(wrap(entry), index));
  }

  [Symbol.iterator]() {
    const wrapped = this.value.map((entry: unknown) => wrap(entry));
    return wrapped[Symbol.iterator]();
  }
}

export class Gson {
  fromJson(value: unknown, target?: unknown) {
    const parsed = typeof value === "string" ? JSON.parse(value) : value;
    if (target === JsonArray) {
      return new JsonArray(Array.isArray(parsed) ? parsed : []);
    }
    if (target === JsonObject) {
      return new JsonObject(parsed ?? {});
    }
    return parsed;
  }
}

class ObjectReader<T> {
  constructor(private target: new () => T) {}

  readValue(value: unknown) {
    const parsed =
      typeof value === "string"
        ? JSON.parse(value)
        : value && typeof value === "object" && "toString" in (value as Record<string, unknown>)
          ? JSON.parse(String(value))
          : value;
    return Object.assign(new this.target(), parsed ?? {});
  }
}

export class ObjectMapper {
  readerFor<T>(target: new () => T) {
    return new ObjectReader(target);
  }
}

export function Expose(..._args: unknown[]) {
  return undefined;
}

export function JsonProperty(..._args: unknown[]) {
  return undefined;
}

function wrap(value: unknown) {
  if (Array.isArray(value)) {
    return new JsonArray(value);
  }
  if (value && typeof value === "object") {
    return new JsonObject(value as Record<string, unknown>);
  }
  return new JsonElement(value);
}
