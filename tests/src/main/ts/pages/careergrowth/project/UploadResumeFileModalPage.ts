// @ts-nocheck
import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, FileChooser, Locator, Page, WaitForSelectorState } from "common/testing/playwright";
import { WorkHistoryItem } from "models/job/WorkHistoryItem";
import { WelcomePage_New } from "pages/careergrowth/careergrowth/WelcomePage_New";
import { ExperienceCareerProfileModalPage } from "pages/careergrowth/profiles/ExperienceCareerProfileModalPage";
import { PreferencesCareerProfileModalPage } from "pages/careergrowth/profiles/PreferencesCareerProfileModalPage";

export class UploadResumeFileModalPage extends BasePage {
  [key: string]: any;
  constructor(...args: any[]) {
    super(...args as any);
  }
}
