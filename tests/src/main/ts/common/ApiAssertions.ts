import { Gson, JsonArray, JsonElement, JsonObject } from "common/testing/json";
import { APIResponse } from "common/testing/playwright";
import { Assert } from "common/testing/runtime";

export class ApiAssertions {
  public assertTrue(response: APIResponse, jsonPath: string): void;
  public assertTrue(conditions: boolean): void;
  public assertTrue(value: APIResponse | boolean, jsonPath?: string): void {
    if (typeof value === "boolean") {
      Assert.assertTrue(value);
      return;
    }

    Assert.assertTrue(this.getBooleanValueFromResponse(value, jsonPath ?? ""));
  }

  public assertFalse(response: APIResponse, jsonPath: string): void {
    Assert.assertFalse(this.getBooleanValueFromResponse(response, jsonPath));
  }

  public assertStatus(response: APIResponse, expected: number): void {
    const actualStatus = typeof response?.status === "function" ? response.status() : response?.status ?? 0;
    Assert.assertEquals(
      actualStatus,
      expected,
      `Expected status: [${expected}] but found [${actualStatus}]. ${this.getResponseText(response)}`
    );
  }

  public assertResponseSizeIsEmpty(response: APIResponse): void {
    Assert.assertEquals(this.getJsonArray(response).size(), 0);
  }

  public assertArraySizeEquals(response: APIResponse, jsonPath: string, expected: number): void {
    Assert.assertEquals(this.getJsonArrayFromResponse(response, jsonPath).size(), expected);
  }

  public assertArrayGreaterThan(response: APIResponse, jsonPath: string, expected: number): void {
    Assert.assertTrue(this.getJsonArrayFromResponse(response, jsonPath).size() > expected);
  }

  public assertArrayLowerThan(response: APIResponse, jsonPath: string, expected: number): void {
    Assert.assertTrue(this.getJsonArrayFromResponse(response, jsonPath).size() < expected);
  }

  public assertArrayContains(response: APIResponse, jsonPath: string, expected: string): void {
    Assert.assertTrue(this.getJsonArrayFromResponse(response, jsonPath).toString().includes(expected));
  }

  public assertGreaterThan(response: APIResponse, jsonPath: string, expected: number): void {
    Assert.assertTrue(this.getIntValueFromResponse(response, jsonPath) > expected);
  }

  public assertLowerThan(response: APIResponse, jsonPath: string, expected: number): void {
    Assert.assertTrue(this.getIntValueFromResponse(response, jsonPath) < expected);
  }

  public assertContains(response: APIResponse, jsonPath: string, expected: string): void {
    Assert.assertTrue(this.getStringValueFromResponse(response, jsonPath).includes(expected));
  }

  public assertEqual(response: APIResponse, jsonPath: string, expected: string | number): void {
    const actual =
      typeof expected === "number"
        ? this.getIntValueFromResponse(response, jsonPath)
        : this.getStringValueFromResponse(response, jsonPath);
    Assert.assertEquals(actual, expected);
  }

  public assertNotEqual(response: APIResponse, jsonPath: string, expected: string): void {
    Assert.assertNotEquals(this.getStringValueFromResponse(response, jsonPath), expected);
  }

  public getIntValueFromResponse(response: APIResponse, jsonPath: string): number {
    return this.getJsonElementFromResponse(response, jsonPath).getAsInt();
  }

  public getStringValueFromResponse(response: APIResponse, jsonPath: string): string {
    return this.getJsonElementFromResponse(response, jsonPath).getAsString();
  }

  public getBooleanValueFromResponse(response: APIResponse, jsonPath: string): boolean {
    return this.getJsonElementFromResponse(response, jsonPath).getAsBoolean();
  }

  public getJsonArrayFromResponse(response: APIResponse, jsonPath: string): JsonArray {
    return this.getJsonElementFromResponse(response, jsonPath).getAsJsonArray();
  }

  public getJsonBody(apiResponse: APIResponse): JsonObject {
    return new Gson().fromJson(this.getResponseText(apiResponse) || "{}", JsonObject);
  }

  public getJsonArray(apiResponse: APIResponse): JsonArray {
    return new Gson().fromJson(this.getResponseText(apiResponse) || "[]", JsonArray);
  }

  private getJsonElementFromResponse(response: APIResponse, jsonPath: string): JsonElement {
    let current: JsonElement = jsonPath.startsWith("[")
      ? this.resolveRootArrayPath(response, jsonPath)
      : this.getJsonBody(response);

    const normalizedPath = this.normalizeRootArrayPath(jsonPath);
    const parts = normalizedPath.split("/").filter(Boolean);

    for (const part of parts) {
      current = this.resolvePathPart(current, part);
    }

    return current;
  }

  private getResponseText(response: APIResponse) {
    const value = typeof response?.text === "function" ? response.text() : response?.text ?? response?.body ?? response;
    return typeof value === "string" ? value : "";
  }

  private resolveRootArrayPath(response: APIResponse, jsonPath: string) {
    const match = jsonPath.match(/^\[(\d+)\](?:\/(.*))?$/);
    if (!match) {
      return this.getJsonArray(response);
    }

    return this.getJsonArray(response).get(Number(match[1]));
  }

  private normalizeRootArrayPath(jsonPath: string) {
    return jsonPath.replace(/^\[\d+\]\//, "");
  }

  private resolvePathPart(current: JsonElement, part: string) {
    const indexedMatch = part.match(/^(.+)\[(\d+)\]$/);

    if (indexedMatch) {
      return current.getAsJsonObject().getAsJsonArray(indexedMatch[1]).get(Number(indexedMatch[2]));
    }

    if (part.startsWith("[") && part.endsWith("]")) {
      return current.getAsJsonArray().get(Number(part.slice(1, -1)));
    }

    return current.getAsJsonObject().get(part);
  }
}
