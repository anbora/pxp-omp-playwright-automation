// @ts-nocheck
import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { AriaRole, Browser, Locator } from "common/testing/playwright";
import { ResultContainer } from "models/ResultContainer";
import { ShareContentModalPage } from "pages/careergrowth/jobs/ShareContentModalPage";
import { LiveEventCardModal } from "pages/smartcard/LiveEventCardModal";
import { PollCardModal } from "pages/smartcard/PollCardModal";
import { ProjectCardModal } from "pages/smartcard/ProjectCardModal";
import { QuizCardModal } from "pages/smartcard/QuizCardModal";

export class SmartCardStandAlonePage extends BasePage {
  [key: string]: any;
  constructor(...args: any[]) {
    super(...args as any);
  }
}
