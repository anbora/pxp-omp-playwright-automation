// @ts-nocheck
import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Download, Locator } from "common/testing/playwright";
import { ResultContainer } from "models/ResultContainer";
import { GroupDetailsPage } from "pages/groups/GroupDetailsPage";

export class BulkRemovalPage extends BasePage {
  [key: string]: any;
  constructor(...args: any[]) {
    super(...args as any);
  }
}
