// @ts-nocheck
import "./javaCompat";
import { chromium, expect, firefox, request, webkit, TimeoutError } from "@playwright/test";

export { chromium, expect, firefox, request, webkit, TimeoutError };

class Builder {
  [key: string]: any;

  protected setOption(key: string, value: unknown) {
    (this as Record<string, unknown>)[key] = value;
    return this;
  }

  setArgs(value: unknown) {
    return this.setOption("args", value);
  }
  setBaseURL(value: unknown) {
    return this.setOption("baseURL", value);
  }
  setContent(value: unknown) {
    return this.setOption("content", value);
  }
  setData(value: unknown) {
    return this.setOption("data", value);
  }
  setDeviceScaleFactor(value: unknown) {
    return this.setOption("deviceScaleFactor", value);
  }
  setExact(value: unknown) {
    return this.setOption("exact", value);
  }
  setExtraHTTPHeaders(value: unknown) {
    return this.setOption("extraHTTPHeaders", value);
  }
  setForce(value: unknown) {
    return this.setOption("force", value);
  }
  setFullPage(value: unknown) {
    return this.setOption("fullPage", value);
  }
  setHeadless(value: unknown) {
    return this.setOption("headless", value);
  }
  setIgnoreHTTPSErrors(value: unknown) {
    return this.setOption("ignoreHTTPSErrors", value);
  }
  setIsMobile(value: unknown) {
    return this.setOption("isMobile", value);
  }
  setName(value: unknown) {
    return this.setOption("name", value);
  }
  setPath(value: unknown) {
    return this.setOption("path", value);
  }
  setProxy(value: unknown) {
    return this.setOption("proxy", value);
  }
  setState(value: unknown) {
    return this.setOption("state", value);
  }
  setStorageStatePath(value: unknown) {
    return this.setOption("storageState", value);
  }
  setTimeout(value: unknown) {
    return this.setOption("timeout", value);
  }
  setViewportSize(width: unknown, height?: unknown) {
    if (typeof width === "object" && width !== null) {
      return this.setOption("viewport", width);
    }
    return this.setOption("viewport", { width, height });
  }
}

export const AriaRole = new Proxy(
  {},
  {
    get: (_target, property) => String(property).toLowerCase().replaceAll("_", "")
  }
) as Record<string, string>;

export const LoadState = {
  DOMCONTENTLOADED: "domcontentloaded",
  LOAD: "load",
  NETWORKIDLE: "networkidle"
} as const;

export const WaitForSelectorState = {
  ATTACHED: "attached",
  DETACHED: "detached",
  HIDDEN: "hidden",
  VISIBLE: "visible"
} as const;

export class Proxy {
  server?: string;
  constructor(server?: string) {
    this.server = server;
  }
}

export type Browser = any;
export namespace Browser {
  export class NewContextOptions extends Builder {}
}

export type BrowserContext = any;
export type BrowserType = any;
export namespace BrowserType {
  export class LaunchOptions extends Builder {}
}

export type FileChooser = any;
export type Locator = any;
export namespace Locator {
  export class ClickOptions extends Builder {}
  export class FilterOptions extends Builder {}
  export class FillOptions extends Builder {}
  export class GetByAltTextOptions extends Builder {}
  export class GetByLabelOptions extends Builder {}
  export class GetByPlaceholderOptions extends Builder {}
  export class GetByRoleOptions extends Builder {}
  export class GetByTextOptions extends Builder {}
  export class GetByTitleOptions extends Builder {}             
  export class IsCheckedOptions extends Builder {}
  export class WaitForOptions extends Builder {}
}

export type Page = any;
export namespace Page {
  export class AddScriptTagOptions extends Builder {}
  export class GetByAltTextOptions extends Builder {}
  export class GetByLabelOptions extends Builder {}
  export class GetByPlaceholderOptions extends Builder {}
  export class GetByRoleOptions extends Builder {}
  export class GetByTextOptions extends Builder {}
  export class GetByTitleOptions extends Builder {}
  export class ScreenshotOptions extends Builder {}
  export class WaitForSelectorOptions extends Builder {}
}

export type APIRequestContext = any;
export type APIResponse = any;
export type APIRequest = any;
export namespace APIRequest {
  export class NewContextOptions extends Builder {}
}

export const RequestOptions = {
  create() {
    return new (class RequestOptionsBuilder extends Builder {})();
  }
};

export const Playwright = {
  create() {
    return {
      chromium: () => chromium,
      firefox: () => firefox,
      request: () => request,
      webkit: () => webkit,
      close() {}
    };
  }
};
