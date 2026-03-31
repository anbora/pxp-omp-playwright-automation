// @ts-nocheck
import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator, Page } from "common/testing/playwright";
import { ResultContainer } from "models/ResultContainer";
import { CreateProjectPage } from "pages/careergrowth/project/CreateProjectPage";
import { ProjectDetailsPage } from "pages/careergrowth/project/ProjectDetailsPage";

export class ManageProjectPage extends BasePage {
  [key: string]: any;
  constructor(...args: any[]) {
    super(...args as any);
  }
}
