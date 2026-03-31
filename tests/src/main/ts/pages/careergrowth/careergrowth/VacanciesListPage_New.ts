// @ts-nocheck
import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { AriaRole, Browser, Locator, WaitForSelectorState } from "common/testing/playwright";
import { ResultContainer } from "models/ResultContainer";
import { CareerGrowthCarouselComponent } from "pages/careergrowth/careergrowth/components/CareerGrowthCarouselComponent";
import { CareerGrowthFiltersComponent } from "pages/careergrowth/careergrowth/components/CareerGrowthFiltersComponent";
import { CareerGrowthLeftMenuComponent } from "pages/careergrowth/careergrowth/components/CareerGrowthLeftMenuComponent";
import { CareerGrowthTopPanelComponent } from "pages/careergrowth/careergrowth/components/CareerGrowthTopPanelComponent";
import { SuggestionsPage_New } from "pages/careergrowth/careergrowth/SuggestionsPage_New";
import { EditJobVacancyPage } from "pages/careergrowth/jobs/EditJobVacancyPage";
import { JobVacancyDetailsPage } from "pages/careergrowth/jobs/JobVacancyDetailsPage";
import { MyOpportunitiesPage } from "pages/careergrowth/jobs/MyOpportunitiesPage";
import { SkillDetailsModalPage } from "pages/careergrowth/jobs/SkillDetailsModalPage";
import { MatchingSkillsModalPage } from "pages/careergrowth/MatchingSkillsModalPage";

export class VacanciesListPage_New extends BasePage {
  [key: string]: any;
  constructor(...args: any[]) {
    super(...args as any);
  }
}
