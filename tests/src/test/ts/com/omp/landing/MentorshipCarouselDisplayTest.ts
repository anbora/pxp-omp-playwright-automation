// @ts-nocheck

import { BaseTest } from "common/BaseTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { LandingPage } from "pages/landing/LandingPage";
import { HomePage } from "pages/other/HomePage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { expect } from "common/testing/playwright";

export class MentorshipCarouselDisplayTest extends BaseTest {

    private opportunityMarketplace: string = "Talent Marketplace";

    public checkMentorshipCarouselDisplayedOnHomePageWhenMentorshipAndOmpIsEnabled(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginScenario(this.getUserByName("Vibha Parashar")));
        __page1 = __page1.checkMentorshipOnLandingPage();
        __page1 = __page1.clickStartEditingEmptyLandingPage();
        __page1 = __page1.configureLandingPageAddWidget("Recommended Mentorships");
        __page1 = __page1.clickSaveAndExitButton();
        expect(__page1.mentorsCarousel).toBeVisible({ timeout: 30000 });
        __page1 = __page1.goToAdminPanel();
        __page1 = __page1.selectMainTab(this.opportunityMarketplace);
        __page1 = __page1.openMenuForGeneralOpportunityMarketplace();
        __page1 = __page1.disableTalentMarketPlace();
        __page1 = __page1.goDirectlyTo(LandingPage);
        __page1 = __page1.goToHomePage();
        __page1 = __page1.goDirectlyTo(LandingPage);
        expect(__page1.mentorsCarousel).not.toBeVisible({ timeout: 5000 });
        __page1 = __page1.goToAdminPanel();
        __page1 = __page1.selectMainTab(this.opportunityMarketplace);
        __page1 = __page1.openMenuForGeneralOpportunityMarketplace();
        __page1 = __page1.disableTalentMarketPlace();
        __page1 = __page1.goDirectlyTo(LandingPage);
        __page1 = __page1.goToHomePage();
        __page1 = __page1.goDirectlyTo(LandingPage);
        expect(__page1.mentorsCarousel).toBeVisible({ timeout: 30000 });
        __page1 = __page1.goToAdminPanel();
        __page1 = __page1.selectMainTab(this.opportunityMarketplace);
        __page1 = __page1.openMenuForMentorshipOpportunityMarketplace();
        __page1 = __page1.disableMentorship();
        __page1 = __page1.goDirectlyTo(LandingPage);
        __page1 = __page1.goToHomePage();
        __page1 = __page1.goDirectlyTo(LandingPage);
        expect(__page1.mentorsCarousel).not.toBeVisible({ timeout: 5000 });
        __page1 = __page1.goToAdminPanel();
        __page1 = __page1.selectMainTab(this.opportunityMarketplace);
        __page1 = __page1.openMenuForMentorshipOpportunityMarketplace();
        __page1 = __page1.disableMentorship();
        __page1 = __page1.goDirectlyTo(LandingPage);
        __page1 = __page1.goToHomePage();
        __page1 = __page1.goDirectlyTo(LandingPage);
        expect(__page1.mentorsCarousel).toBeVisible({ timeout: 30000 });
        __page1 = __page1.clickConfigureHomePageButton();
        __page1 = __page1.clickDeleteRowButtonMentorship();
        __page1 = __page1.goDirectlyTo(LandingPage);
        expect(__page1.mentorsCarousel).not.toBeVisible({ timeout: 5000 });
    }
}
