// @ts-nocheck
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator, MouseButton, Page } from "common/testing/playwright";
import { GlobalNavigationPage } from "cs/pages/GlobalNavigationPage";

export class ManageObjectivesPage extends GlobalNavigationPage {
  [key: string]: any;
  constructor(...args: any[]) {
    super(...args as any);
  }
}
