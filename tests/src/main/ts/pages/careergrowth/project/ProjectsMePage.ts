// @ts-nocheck
import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { AriaRole, Browser, LoadState, Locator } from "common/testing/playwright";
import { ResultContainer } from "models/ResultContainer";
import { ManageProjectPage } from "pages/careergrowth/project/ManageProjectPage";
import { CreateProjectMePage } from "pages/me/CreateProjectMePage";

export class ProjectsMePage extends BasePage {
  [key: string]: any;
  constructor(...args: any[]) {
    super(...args as any);
  }
}
