// @ts-nocheck
import assert from "node:assert/strict";

export function assertTrue(value: unknown, message?: string) {
  assert.equal(Boolean(value), true, message);
}

export function assertFalse(value: unknown, message?: string) {
  assert.equal(Boolean(value), false, message);
}

export function assertEquals(actual: unknown, expected: unknown, message?: string) {
  assert.deepEqual(actual, expected, message);
}

export function assertNotEquals(actual: unknown, expected: unknown, message?: string) {
  assert.notDeepEqual(actual, expected, message);
}

export function assertNotSame(actual: unknown, expected: unknown, message?: string) {
  assert.notStrictEqual(actual, expected, message);
}

export class Assert {
  static assertTrue = assertTrue;
  static assertFalse = assertFalse;
  static assertEquals = assertEquals;
  static assertNotEquals = assertNotEquals;
  static assertNotSame = assertNotSame;
}

export class ITestContext {
  private attributes = new Map<string, unknown>();
  private currentXmlTest = {
    getXmlClasses: () => []
  };

  getCurrentXmlTest() {
    return this.currentXmlTest;
  }

  setAttribute(key: string, value: unknown) {
    this.attributes.set(key, value);
  }

  getAttribute(key: string) {
    return this.attributes.get(key);
  }
}
