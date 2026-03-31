// @ts-nocheck
import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, LoadState, Locator, Page, WaitForSelectorState } from "common/testing/playwright";
import { VacanciesListPage_New } from "pages/careergrowth/careergrowth/VacanciesListPage_New";
import { EditJobDiscardChangesModalPage } from "pages/careergrowth/jobs/EditJobDiscardChangesModalPage";
import { Interface1 } from "pages/careergrowth/jobs/Interface1";
import { Interface2 } from "pages/careergrowth/jobs/Interface2";
import { JobVacancyDetailsPage } from "pages/careergrowth/jobs/JobVacancyDetailsPage";
import { MyOpportunitiesPage } from "pages/careergrowth/jobs/MyOpportunitiesPage";
import { ProficiencySkillsLevelsHandler } from "pages/handlers/ProficiencySkillsLevelsHandler";

export class EditJobVacancyPage extends BasePage {
  [key: string]: any;
  constructor(...args: any[]) {
    super(...args as any);
  }
}
