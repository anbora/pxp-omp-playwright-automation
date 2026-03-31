// @ts-nocheck
import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";
import { ResultContainer } from "models/ResultContainer";
import { HrDataConfigurationStandardFieldPage } from "pages/admin/hrdata/configuration/HrDataConfigurationStandardFieldPage";
import { LanguageModalPage } from "pages/admin/LanguageModalPage";
import { OpportunityMarketplaceConfigurationPage } from "pages/careergrowth/jobs/OpportunityMarketplaceConfigurationPage";

export class EditFieldModalPage extends BasePage {
  [key: string]: any;
  constructor(...args: any[]) {
    super(...args as any);
  }
}
