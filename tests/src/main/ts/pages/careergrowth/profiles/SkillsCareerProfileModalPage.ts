// @ts-nocheck
import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, LoadState, Locator, WaitForSelectorState } from "common/testing/playwright";
import { ResultContainer } from "models/ResultContainer";
import { WelcomePage_New } from "pages/careergrowth/careergrowth/WelcomePage_New";
import { JobVacancyDetailsPage } from "pages/careergrowth/jobs/JobVacancyDetailsPage";
import { SkillsPassportMePage } from "pages/careergrowth/jobs/SkillsPassportMePage";
import { ExperienceCareerProfileModalPage } from "pages/careergrowth/profiles/ExperienceCareerProfileModalPage";
import { PreferencesCareerProfileModalPage } from "pages/careergrowth/profiles/PreferencesCareerProfileModalPage";
import { SkillsToDevelopPage } from "pages/careergrowth/profiles/SkillsToDevelopPage";
import { SuggestedSkillsModalPage } from "pages/careergrowth/profiles/SuggestedSkillsModalPage";
import { UpdateCareerProfilePage } from "pages/careergrowth/profiles/UpdateCareerProfilePage";
import { UploadResumeFileModalPage } from "pages/careergrowth/project/UploadResumeFileModalPage";

export class SkillsCareerProfileModalPage extends UpdateCareerProfilePage {
  [key: string]: any;
  constructor(...args: any[]) {
    super(...args as any);
  }
}
