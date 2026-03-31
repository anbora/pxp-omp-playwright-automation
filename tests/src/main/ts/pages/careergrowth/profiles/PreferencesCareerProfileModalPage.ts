// @ts-nocheck
import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { AriaRole, Browser, Locator, WaitForSelectorState } from "common/testing/playwright";
import { WelcomePage_New } from "pages/careergrowth/careergrowth/WelcomePage_New";
import { JobVacancyDetailsPage } from "pages/careergrowth/jobs/JobVacancyDetailsPage";
import { ExperienceCareerProfileModalPage } from "pages/careergrowth/profiles/ExperienceCareerProfileModalPage";
import { SkillsCareerProfileModalPage } from "pages/careergrowth/profiles/SkillsCareerProfileModalPage";
import { UpdateCareerProfilePage } from "pages/careergrowth/profiles/UpdateCareerProfilePage";
import { UploadResumeFileModalPage } from "pages/careergrowth/project/UploadResumeFileModalPage";

export class PreferencesCareerProfileModalPage extends UpdateCareerProfilePage {
  [key: string]: any;
  constructor(...args: any[]) {
    super(...args as any);
  }
}
