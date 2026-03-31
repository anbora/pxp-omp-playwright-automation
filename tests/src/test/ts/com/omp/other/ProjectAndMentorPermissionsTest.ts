// @ts-nocheck

import { BaseTest } from "common/BaseTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { TeamsResponsibleEnum } from "common/enums/TeamsResponsibleEnum";
import { LandingPage } from "pages/landing/LandingPage";
import { HomePage } from "pages/other/HomePage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { expect } from "common/testing/playwright";

export class ProjectAndMentorPermissionsTest extends BaseTest {

    public userWithoutCreateProjectPermissionCannotCreateProject(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginScenario(this.getUserByName("Smokey Bear")));
        __page1 = __page1.clickCreateButton();
        expect(__page1.createProjectButton().first()).not.toBeVisible({ timeout: 5000 });
        __page1 = __page1.goToMePageProfile();
        __page1 = __page1.goToProjectsTab();
        expect(__page1.publishedLeftTab).toBeVisible({ timeout: 30000 });
        expect(__page1.createAProjectButton).not.toBeVisible({ timeout: 5000 });
        __page1 = __page1.goDirectlyTo(LandingPage);
        __page1 = __page1.goToCareerGrowthPage();
        __page1 = __page1.goToProjectsPageViaCard();
        expect(__page1.allProjectsHeader).toBeVisible({ timeout: 30000 });
        expect(__page1.createAProjectButton).not.toBeVisible({ timeout: 5000 });
    }

    public userWithoutCanBeAMentorPermissionCannotBecomeAMentor(): void {
                let __page2: any = this;
        __page2 = __page2.getOmpLoginPage();
        __page2 = __page2.run(new LoginScenario(this.getUserByName("Smokey Bear")));
        __page2 = __page2.goToCareerGrowthPage();
        __page2 = __page2.goToMentorshipPageViaCard();
        expect(__page2.allMentorsHeader).toBeVisible({ timeout: 30000 });
        expect(__page2.becomeAMentorButton).not.toBeVisible({ timeout: 5000 });
        expect(__page2.viewMyMentorProfileButton).not.toBeVisible({ timeout: 5000 });
        __page2 = __page2.goDirectlyTo(LandingPage);
        __page2 = __page2.goToMePageProfile();
        __page2 = __page2.goToMentorshipsTab();
        expect(__page2.myMenteesTab).not.toBeVisible({ timeout: 5000 });
        expect(__page2.viewMyMentorProfileButton).not.toBeVisible({ timeout: 5000 });
    }

    public userWithoutViewProjectMentorshipPermissionsCannotViewProjectsAndMentorships(): void {
                let __page3: any = this;
        __page3 = __page3.getOmpLoginPage();
        __page3 = __page3.run(new LoginScenario(this.getUserByName("Steven Smith")));
        __page3 = __page3.goToCareerGrowthPage();
        __page3 = __page3.goDirectlyTo(LandingPage);
        __page3 = __page3.goToMePageProfile();
        expect(__page3.projectsTab).not.toBeVisible({ timeout: 5000 });
        expect(__page3.mentorshipsTab).not.toBeVisible({ timeout: 5000 });
    }
}
