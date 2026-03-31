// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { JobVacancyDetailsPage } from "pages/careergrowth/jobs/JobVacancyDetailsPage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";
import { AddSkillToCareerProfileScenario } from "scenarios/profile/AddSkillToCareerProfileScenario";
import { expect } from "common/testing/playwright";

export class JobVacancySkillPassportTest_SkillLevel extends BaseRestTest {

    private TITLE: string = "Ruby developer " + UUID.randomUUID();
    private numberOfYourSkillsBeforeAddingSkill: number = 0;
    private numberOfYourSkillsAfterAddingSkill: number = 1;
    private contests: string = "contests";
    private ruby: string = "ruby";
    private beginner: string = "Beginner";
    private intermediate: string = "Intermediate";
    private jobId: string;
    private user: UserModel;

    public initialize(): void {
      this.jobId = this.createJob(this.TITLE);
      this.user = this.createUser();
    }

    public shouldAddSkillsToSkillPassport(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.run(new AddRoleAndFamilyToNewUserScenario(this.user.name));
        __page1 = __page1.goToCareerGrowthPage();
        __page1 = __page1.goToVacanciesPageViaTab();
        __page1 = __page1.typeSearchValue(this.TITLE);
        __page1 = __page1.goToFirstJobVacancyOnAllJobsList();
        __page1 = __page1.waitForSkills();
        expect(__page1.jobTitle).toContainText(this.TITLE, { timeout: 30000 });
        expect(__page1.addSkillsToPassportButton).toBeVisible({ timeout: 30000 });
        __page1 = __page1.showMatchDetails();
        __page1 = __page1.updateSkills();
        __page1 = __page1.run(new AddSkillToCareerProfileScenario(this.contests, this.beginner));
        __page1 = __page1.clickSaveAndContinueButton();
        __page1 = __page1.clickXButton(JobVacancyDetailsPage);
        __page1 = __page1.openMatchDetailsWithWaitForData();
        expect(__page1.numberOfPossessedSkills).toContainText(String.format("%d of", this.numberOfYourSkillsBeforeAddingSkill));
        __page1 = __page1.clickCLose();
        __page1 = __page1.addSkillsToPassport();
        __page1 = __page1.selectLevel(this.ruby, this.intermediate);
        __page1 = __page1.addSkill();
        __page1 = __page1.openMatchDetailsWithWaitForData();
        expect(__page1.numberOfPossessedSkills).toContainText(String.format("%d of", this.numberOfYourSkillsAfterAddingSkill));
    }

    public shouldDeleteSkill(): void {
                let __page2: any = this;
        __page2 = __page2.getOmpLoginPage();
        __page2 = __page2.run(new LoginScenario(this.user));
        __page2 = __page2.goToMePageProfile();
        __page2 = __page2.goToSkillPassportTab();
        __page2 = __page2.openSkillDetails(this.ruby);
        __page2 = __page2.deleteSkill();
        __page2 = __page2.clickConfirm();
        expect(__page2.addedSkill(this.ruby)).not.toBeVisible({ timeout: 5000 });
    }

    public afterTests(): void {
        this.deleteJob(this.jobId);
        this.deleteUser(this.user);
    }
}
