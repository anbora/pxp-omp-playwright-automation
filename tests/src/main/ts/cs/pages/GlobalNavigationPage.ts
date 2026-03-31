// @ts-nocheck
import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator, Page } from "common/testing/playwright";
import { CreateCollectionPage } from "cs/pages/CreateCollectionPage";
import { ResultContainer } from "models/ResultContainer";

export abstract class GlobalNavigationPage extends BasePage {
  [key: string]: any;
  constructor(...args: any[]) {
    super(...args as any);
  }
}
