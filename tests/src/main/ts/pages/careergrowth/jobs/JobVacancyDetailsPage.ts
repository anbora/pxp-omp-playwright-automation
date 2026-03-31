// @ts-nocheck
import { BasePage } from "common/BasePage";
import { ElementType } from "common/enums/ElementType";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { AriaRole, Browser, LoadState, Locator, WaitForSelectorState } from "common/testing/playwright";
import { ResultContainer } from "models/ResultContainer";
import { AddToSkillsPassportModalPage } from "pages/careergrowth/AddToSkillsPassportModalPage";
import { SuggestionsPage_New } from "pages/careergrowth/careergrowth/SuggestionsPage_New";
import { VacanciesListPage_New } from "pages/careergrowth/careergrowth/VacanciesListPage_New";
import { EditJobVacancyPage } from "pages/careergrowth/jobs/EditJobVacancyPage";
import { JobVacancySkillModalPage } from "pages/careergrowth/jobs/JobVacancySkillModalPage";
import { ShareContentModalPage } from "pages/careergrowth/jobs/ShareContentModalPage";
import { ShowInterestModalPage } from "pages/careergrowth/jobs/ShowInterestModalPage";
import { MatchingAnalysisModalPage } from "pages/careergrowth/MatchingAnalysisModalPage";
import { RoleDetailsPage } from "pages/careergrowth/roles/RoleDetailsPage";
import { SetYourLerningGoalsModalPage } from "pages/careergrowth/SetYourLerningGoalsModalPage";

export class JobVacancyDetailsPage extends BasePage {
  [key: string]: any;
  constructor(...args: any[]) {
    super(...args as any);
  }
}
