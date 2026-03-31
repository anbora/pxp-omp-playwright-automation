// @ts-nocheck
import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";
import { ResultContainer } from "models/ResultContainer";
import { CareerGrowthCarouselComponent } from "pages/careergrowth/careergrowth/components/CareerGrowthCarouselComponent";
import { CareerGrowthFiltersComponent } from "pages/careergrowth/careergrowth/components/CareerGrowthFiltersComponent";
import { CareerGrowthLeftMenuComponent } from "pages/careergrowth/careergrowth/components/CareerGrowthLeftMenuComponent";
import { CareerGrowthTopPanelComponent } from "pages/careergrowth/careergrowth/components/CareerGrowthTopPanelComponent";
import { ManageRolePage } from "pages/careergrowth/roles/ManageRolePage";
import { RoleDetailsPage } from "pages/careergrowth/roles/RoleDetailsPage";
import { ShareRolePage } from "pages/careergrowth/share/ShareRolePage";

export class RolesListPage_New extends BasePage {
  [key: string]: any;
  constructor(...args: any[]) {
    super(...args as any);
  }
}
