// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";
import { AddSkillToCareerProfileScenario } from "scenarios/profile/AddSkillToCareerProfileScenario";
import { AddSkillToNewUserScenario_SkillLevel } from "scenarios/profile/AddSkillToNewUserScenario_SkillLevel";
import { expect } from "common/testing/playwright";
import { Assert, assertTrue } from "common/testing/runtime";

export class JobVacancySkillChipAndModalTest extends BaseRestTest {

    private TITLE: string = UUID.randomUUID().toString();
    private SKILL_MORE_LINK: string = "more";
    private jobVacancySkills: string = "Matching skills";
    private zeroMatchingSkillsOutOfFour: string = "0 out of 4 match your profile";
    private oneMatchingSkillsOutOfFive: string = "1 out of 5 match your profile";
    private commissioning: string = "commissioning";
    private cryptography: string = "cryptography";
    private lobbying: string = "lobbying";
    private recruiting: string = "recruiting";
    private regression: string = "regression";
    private beginner: string = "Beginner";
    private intermediate: string = "Intermediate";
    private advanced: string = "Advanced";
    private one: string = "2";
    private two: string = "3";
    private intermediateSkillMatching: string = "icon-skill-this.intermediate skill-matched";
    public jobId: string;

    private user: UserModel;

    public initialize(): void {
      this.jobId = this.createJob(this.TITLE);
      this.user = this.createUser();
    }

    public shouldCheckIfThereIsNoRemainingSkillsAndAddNewOne(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.run(new AddRoleAndFamilyToNewUserScenario(this.user.name));
        __page1 = __page1.run(new AddSkillToNewUserScenario_SkillLevel());
        __page1 = __page1.goToCareerGrowthPage();
        __page1 = __page1.goToVacanciesPageViaCard();
        __page1 = __page1.typeSearchValue(this.TITLE);
        __page1 = __page1.goToFirstJobVacancyOnAllJobsList();
        __page1 = __page1.goToCareerGrowthPage();
        __page1 = __page1.goToVacanciesPageViaTab();
        __page1 = __page1.typeSearchValue(this.TITLE);
        __page1 = __page1.waitForJobSkillToNotBeVisible(this.TITLE);
        __page1 = __page1.typeSearchValue(this.TITLE);
        expect(__page1.noJobSkillsLabel(this.TITLE)).toBeVisible({ timeout: 30000 });
        __page1 = __page1.clickJobVacancyCardsDetails(this.TITLE);
        __page1 = __page1.clickEditVacancyButton();
        __page1 = __page1.addSkillToProficiencyLevel(this.commissioning, this.beginner);
        __page1 = __page1.clickSaveButton();
    }

    public shouldCheckIfNewSkillAppearsSkillsModalAndAddSkillToProfile(): void {
                let __page2: any = this;
        __page2 = __page2.getOmpLoginPage();
        __page2 = __page2.run(new LoginScenario(this.user));
        __page2 = __page2.goToCareerGrowthPage();
        __page2 = __page2.goToVacanciesPageViaTab();
        __page2 = __page2.waitForJobSkillToBeVisible(this.TITLE, this.commissioning);
        expect(__page2.skillChip(this.TITLE, this.commissioning)).toBeVisible({ timeout: 30000 });
        __page2 = __page2.clickUpdateCareerProfileLink();
        __page2 = __page2.clickSkipForNowButton();
        __page2 = __page2.run(new AddSkillToCareerProfileScenario(this.commissioning, this.beginner));
        Assert.assertTrue(__page2.skillsOfLevel(this.beginner).allTextContents().contains(this.commissioning), "Skill of name " + this.commissioning + " is missing!");
        __page2 = __page2.clickSaveAndContinueButton();
        __page2 = __page2.clickXButton();
    }

    public shouldCheckMoreSkillsLinkAndItsModal(): void {
                let __page3: any = this;
        __page3 = __page3.getOmpLoginPage();
        __page3 = __page3.run(new LoginScenario(this.user));
        __page3 = __page3.goToCareerGrowthPage();
        __page3 = __page3.goToVacanciesPageViaTab();
        __page3 = __page3.typeSearchValue(this.TITLE);
        __page3 = __page3.goToFirstJobVacancyOnAllJobsList();
        __page3 = __page3.clickEditVacancyButton();
        __page3 = __page3.addSkillToProficiencyLevel(this.cryptography, this.advanced);
        __page3 = __page3.addSkillToProficiencyLevel(this.lobbying, this.beginner);
        __page3 = __page3.addSkillToProficiencyLevel(this.recruiting, this.intermediate);
        __page3 = __page3.addSkillToProficiencyLevel(this.regression, this.advanced);
        __page3 = __page3.clickSaveButton();
        __page3 = __page3.clickBackButton();
        __page3 = __page3.waitForJobSkillToBeVisible(this.TITLE, this.recruiting);
        expect(__page3.skillChip(this.TITLE, this.recruiting)).toBeVisible({ timeout: 30000 });
        expect(__page3.skillsOnJobCard.last()).toContainText(this.SKILL_MORE_LINK, { timeout: 30000 });
        expect(__page3.moreSkillsOnJobCard(this.TITLE)).toContainText(this.two, { timeout: 30000 });
        __page3 = __page3.clickMoreSkillsButton(this.TITLE);
        expect(__page3.matchingSkillColumn(this.commissioning, 3)).toHaveText(this.beginner);
        expect(__page3.matchingSkillColumn(this.lobbying, 3)).toHaveText(this.beginner);
        expect(__page3.matchingSkillColumn(this.recruiting, 3)).toHaveText(this.intermediate);
        expect(__page3.matchingSkillColumn(this.cryptography, 3)).toHaveText(this.advanced);
        expect(__page3.matchingSkillColumn(this.regression, 3)).toHaveText(this.advanced);
    }

    public afterTests(): void {
        this.deleteJob(this.jobId);
        this.deleteUser(this.user);
    }
}
