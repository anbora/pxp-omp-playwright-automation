// @ts-nocheck
import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, LoadState, Locator, WaitForSelectorState } from "common/testing/playwright";
import { WelcomePage_New } from "pages/careergrowth/careergrowth/WelcomePage_New";
import { PreferencesCareerProfileModalPage } from "pages/careergrowth/profiles/PreferencesCareerProfileModalPage";
import { UpdateCareerProfilePage } from "pages/careergrowth/profiles/UpdateCareerProfilePage";

export class SkillsToDevelopPage extends UpdateCareerProfilePage {
  [key: string]: any;
  constructor(...args: any[]) {
    super(...args as any);
  }
}
