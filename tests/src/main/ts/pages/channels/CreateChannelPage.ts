// @ts-nocheck
import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { AriaRole, Browser, Locator } from "common/testing/playwright";
import { ChannelDetailsPage } from "pages/channels/ChannelDetailsPage";
import { EditGroupPage } from "pages/groups/EditGroupPage";
import { ContentMePage } from "pages/me/ContentMePage";
import { SmartCardStandAlonePage } from "pages/smartcard/SmartCardStandAlonePage";

export class CreateChannelPage extends BasePage {
  [key: string]: any;
  constructor(...args: any[]) {
    super(...args as any);
  }
}
