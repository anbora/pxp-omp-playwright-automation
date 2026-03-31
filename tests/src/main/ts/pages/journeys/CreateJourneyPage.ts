// @ts-nocheck
import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { AriaRole, Browser, Locator } from "common/testing/playwright";
import { JourneyDetailsPage } from "pages/journeys/JourneyDetailsPage";
import { ContentMePage } from "pages/me/ContentMePage";
import { WebURLSmartCardModal } from "pages/smartcard/WebURLSmartCardModal";

export class CreateJourneyPage extends BasePage {
  [key: string]: any;
  constructor(...args: any[]) {
    super(...args as any);
  }
}
