// @ts-nocheck
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";
import { CreateJourneyPage } from "pages/journeys/CreateJourneyPage";
import { JourneyDetailsPage } from "pages/journeys/JourneyDetailsPage";
import { ContentMePage } from "pages/me/ContentMePage";
import { CreatePathwayPage } from "pages/pathways/CreatePathwayPage";
import { CreateSmartCardModal } from "pages/smartcard/CreateSmartCardModal";

export class TextSmartCardModal extends CreateSmartCardModal {
  [key: string]: any;
  constructor(...args: any[]) {
    super(...args as any);
  }
}
