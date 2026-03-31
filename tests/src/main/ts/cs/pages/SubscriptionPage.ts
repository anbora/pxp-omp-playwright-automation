// @ts-nocheck
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, ElementHandle, LoadState, Locator, MouseButton, Page } from "common/testing/playwright";
import { GlobalNavigationPage } from "cs/pages/GlobalNavigationPage";
import { ResultContainer } from "models/ResultContainer";

export class SubscriptionPage extends GlobalNavigationPage {
  [key: string]: any;
  constructor(...args: any[]) {
    super(...args as any);
  }
}
