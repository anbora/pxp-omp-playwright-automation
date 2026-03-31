// @ts-nocheck
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";
import { ResultContainer } from "models/ResultContainer";
import { CreateSmartCardModal } from "pages/smartcard/CreateSmartCardModal";

export class ProjectCardModal extends CreateSmartCardModal {
  [key: string]: any;
  constructor(...args: any[]) {
    super(...args as any);
  }
}
