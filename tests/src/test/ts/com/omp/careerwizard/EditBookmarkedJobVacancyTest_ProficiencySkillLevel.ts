// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { JobVacancyDetailsPage } from "pages/careergrowth/jobs/JobVacancyDetailsPage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { Assert, assertTrue } from "common/testing/runtime";
import { expect } from "common/testing/playwright";

export class EditBookmarkedJobVacancyTest_ProficiencySkillLevel extends BaseRestTest {

    public TITLE: string = UUID.randomUUID().toString();
    public SKILL_DEBUGGING: string = "debugging";
    public SKILL_CRYPTOGRAPHY: string = "cryptography";
    public applications: string = "Applications";
    public bookmarked: string = "Bookmarked";
    public jobId: string;
    private user: UserModel;

    public initialize(): void {
      this.user = this.createUser();
      this.jobId = this.createJob(this.TITLE, true);
    }

    public shouldAddSkillToBookmarkedJob(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.goToCareerGrowthPage();
        __page1 = __page1.goToVacanciesPageViaCard();
        __page1 = __page1.typeSearchValue(this.TITLE);
        __page1 = __page1.clickJobVacancyCardsDetails(this.TITLE);
        __page1 = __page1.clickBookmarkButton();
        __page1 = __page1.goToMePageProfile();
        __page1 = __page1.clickOpenJobsTab();
        __page1 = __page1.selectLeftMenuTab(this.bookmarked);
        __page1 = __page1.waitForJobToBeVisible();
        __page1 = __page1.editJob(this.TITLE);
        __page1 = __page1.addSkillToProficiencyLevel(this.SKILL_DEBUGGING, "Advanced");
        Assert.assertTrue(__page1.skillContainer("Advanced").allTextContents().contains(this.SKILL_DEBUGGING));
        __page1 = __page1.clickSaveButtonAndGoBackToMyOpportunitiesPage();
        __page1 = __page1.goToMePageProfile();
    }

    public unbookmarkJobVacancy(): void {
                let __page2: any = this;
        __page2 = __page2.getOmpLoginPage();
        __page2 = __page2.run(new LoginScenario(this.user));
        __page2 = __page2.goToMePageProfile();
        __page2 = __page2.clickOpenJobsTab();
        __page2 = __page2.selectLeftMenuTab(this.applications);
        __page2 = __page2.selectLeftMenuTab(this.bookmarked);
        __page2 = __page2.waitForJobSkillToBeVisibleOnJobCard(this.TITLE, this.SKILL_DEBUGGING);
        expect(__page2.skillChip(this.TITLE)).toContainText(this.SKILL_DEBUGGING, { timeout: 30000 });
        __page2 = __page2.clickUnbookmarkJobVacancyByTitle(this.TITLE);
    }

    public shouldCheckIfDiscardChangesModalAppears(): void {
                let __page3: any = this;
        __page3 = __page3.getOmpLoginPage();
        __page3 = __page3.run(new LoginScenario(this.user));
        __page3 = __page3.goToCareerGrowthPage();
        __page3 = __page3.goToVacanciesPageViaCard();
        __page3 = __page3.typeSearchValue(this.TITLE);
        __page3 = __page3.clickJobVacancyCardsDetails(this.TITLE);
        __page3 = __page3.clickEditVacancyButton();
        __page3 = __page3.addSkillToProficiencyLevel(this.SKILL_CRYPTOGRAPHY, "Beginner");
        Assert.assertTrue(__page3.skillContainer("Beginner").allTextContents().contains(this.SKILL_CRYPTOGRAPHY));
        __page3 = __page3.clickCancelButton();
        expect(__page3.getModalHeader()).toBeVisible({ timeout: 30000 });
        __page3 = __page3.clickCancelButton();
        expect(__page3.pageTitle).toBeVisible({ timeout: 30000 });
        __page3 = __page3.clickCancelButton();
        expect(__page3.getModalHeader()).toBeVisible({ timeout: 30000 });
        __page3 = __page3.clickDiscardButton(JobVacancyDetailsPage);
        expect(__page3.jobTitle).toContainText(this.TITLE, { timeout: 30000 });
    }

    public afterTests(): void {
        this.deleteJob(this.jobId);
        this.deleteUser(this.user);
    }
}
