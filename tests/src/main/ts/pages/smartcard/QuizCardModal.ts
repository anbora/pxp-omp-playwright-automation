// @ts-nocheck
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { AriaRole, Browser, Locator } from "common/testing/playwright";
import { ResultContainer } from "models/ResultContainer";
import { CreateSmartCardModal } from "pages/smartcard/CreateSmartCardModal";

export class QuizCardModal extends CreateSmartCardModal {
  [key: string]: any;
  constructor(...args: any[]) {
    super(...args as any);
  }
}
