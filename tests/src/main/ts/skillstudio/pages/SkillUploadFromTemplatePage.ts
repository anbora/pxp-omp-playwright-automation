// @ts-nocheck
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, FileChooser, Locator } from "common/testing/playwright";
import { SkillsStudioGlobalNavigationPage } from "skillstudio/pages/SkillsStudioGlobalNavigationPage";

export class SkillUploadFromTemplatePage extends SkillsStudioGlobalNavigationPage {
  [key: string]: any;
  constructor(...args: any[]) {
    super(...args as any);
  }
}
