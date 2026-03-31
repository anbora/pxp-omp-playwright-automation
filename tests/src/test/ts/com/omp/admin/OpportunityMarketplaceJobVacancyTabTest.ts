// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { expect } from "common/testing/playwright";

export class OpportunityMarketplaceJobVacancyTabTest extends BaseRestTest {

    private opportunityMarketplace: string = "Talent Marketplace";
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public jobVacancyTab(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.goToAdminPanel();
        __page1 = __page1.selectMainTab(this.opportunityMarketplace);
        __page1 = __page1.openMenuForJobVacancyOpportunityMarketplace();
        expect(__page1.enableJobVacancy).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified data. Enable job vacancy is visible");
        __page1 = __page1.clickLabelsButton();
        expect(__page1.jobVacancy).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified data. Job vacancy label is visible");
        expect(__page1.jobVacancies).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified data. Job vacancies label is visible");
        expect(__page1.browseCurrentInternal).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified data. Browse current job vacancies label is visible");
        __page1 = __page1.clickSkillsButton();
        expect(__page1.automaticallyAssignSkills).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified data. Automatically assign detected skills is visible");
        expect(__page1.overrideDetectedSkills).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified data. Override detected skills is visible");
        expect(__page1.detectedSkillsLevelHeader).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified data. Detected skills level header is visible");
        expect(__page1.detectedSkillsLevelText).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified data. Detected skills level text is visible");
        expect(__page1.maximumNumberOfSkills).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified data. Maximum number of skills assigned label is visible");
        __page1 = __page1.clickRecommendationsButton();
        expect(__page1.levelRankRestrictionsHeader).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified data. Level rank restrictions header is visible");
        expect(__page1.numberOfLevelRanksHigher).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified data. Number of level ranks higher than is visible");
        expect(__page1.numberOfLevelRanksLower).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified data. Number of level ranks lower than is visible");
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
