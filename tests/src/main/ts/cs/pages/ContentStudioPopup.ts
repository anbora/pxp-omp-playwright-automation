// @ts-nocheck
import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, LoadState, Locator, Page } from "common/testing/playwright";
import { BrowseBySubjectPage } from "cs/pages/BrowseBySubjectPage";
import { GlobalNavigationPage } from "cs/pages/GlobalNavigationPage";

export class ContentStudioPopup extends GlobalNavigationPage {
  [key: string]: any;
  constructor(...args: any[]) {
    super(...args as any);
  }
}
