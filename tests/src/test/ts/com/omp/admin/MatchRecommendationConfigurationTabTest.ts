// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { TeamsResponsibleEnum } from "common/enums/TeamsResponsibleEnum";
import { UserModel } from "models/user/UserModel";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { expect } from "common/testing/playwright";
import { assertTrue } from "common/testing/runtime";

export class MatchRecommendationConfigurationTabTest extends BaseRestTest {

    private talentMarketplace: string = "Talent Marketplace";
    private lowMatch: string = "Low match";
    private fairMatch: string = "Fair match";
    private goodMatch: string = "Good match";
    private excellentMatch: string = "Excellent match";
    private faces: string = "faces";
    private bars: string = "bars";
    private networkBars: string = "network-this.bars";
    private circle: string = "circle";
    private diamond: string = "diamond";
    private pie: string = "pie";
    private english: string = "English";
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public shouldCheckMatchRecommendationConfigurationTab(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.goToAdminPanel();
        __page1 = __page1.selectMainTab(this.talentMarketplace);
        __page1 = __page1.openMenuForGeneralOpportunityMarketplace();
        __page1 = __page1.clickMatchRecommendationConfigurationButton();
        __page1 = __page1.clickActionButton(this.lowMatch);
        expect(__page1.matchLevelLanguage.first()).toContainText(this.english, { timeout: 30000 });
        __page1.logger.info("Successfully verified that match level label is '" + this.english + "'.");
        assertTrue(__page1.defaultLabel.getAttribute("value").contains(this.lowMatch));
        __page1.logger.info("Successfully verified that default this.lowMatch is '" + this.lowMatch + "'.");
        __page1 = __page1.clickCancelButton();
        expect(__page1.matchLevelAction(this.lowMatch)).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified that action is displayed for '" + this.lowMatch + "' level.");
        expect(__page1.matchLevelAction(this.fairMatch)).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified that action is displayed for '" + this.fairMatch + "' level.");
        expect(__page1.matchLevelAction(this.goodMatch)).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified that action is displayed for '" + this.goodMatch + "' level.");
        expect(__page1.matchLevelAction(this.excellentMatch)).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified that action is displayed for '" + this.excellentMatch + "' level.");
        expect(__page1.iconSetRadiobutton(this.faces)).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified that icon set '" + this.faces + "' is displayed.");
        expect(__page1.iconSetRadiobutton(this.bars)).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified that icon set '" + this.bars + "' is displayed.");
        expect(__page1.iconSetRadiobutton(this.networkBars)).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified that icon set '" + this.networkBars + "' is displayed.");
        expect(__page1.iconSetRadiobutton(this.circle)).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified that icon set '" + this.circle + "' is displayed.");
        expect(__page1.iconSetRadiobutton(this.diamond)).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified that icon set '" + this.diamond + "' is displayed.");
        expect(__page1.iconSetRadiobutton(this.pie)).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified that icon set '" + this.pie + "' is displayed.");
        expect(__page1.iconSetRadiobutton(this.faces)).toBeChecked();
        __page1.logger.info("Successfully verified that icon set '" + this.faces + "' is checked.");
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
