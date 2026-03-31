// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddSkillToCareerProfileScenario } from "scenarios/profile/AddSkillToCareerProfileScenario";
import { Assert, assertTrue } from "common/testing/runtime";
import { expect } from "common/testing/playwright";

export class AddSkillsManuallyToCareerProfileTest extends BaseRestTest {

    private static readonly GARDENER: string = "Gardener";
    public static readonly HORTICULTURE: string = "horticulture";
    public static readonly GARDENING: string = "gardening";
    public static readonly SHRUB: string = "shrub";
    public static readonly ADVANCED: string = "Advanced";
    public static readonly INTERMEDIATE: string = "Intermediate";
    public static readonly BEGINNER: string = "Beginner";
    public static readonly MULCH: string = "mulch";
    public static readonly EXPERT: string = "Expert";
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser();

    }

    public shouldAddSkillsManuallyToCareerProfile(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.goToCareerGrowthPage();
        __page1 = __page1.editProfile();
        __page1 = __page1.clickEditProfileButton();
        __page1 = __page1.clickAddJobFamilyAndRoleButton();
        __page1 = __page1.selectFirstJobRoleFromInput(AddSkillsManuallyToCareerProfileTest.GARDENER, AddSkillsManuallyToCareerProfileTest.GARDENER);
        __page1 = __page1.clickSelectButton();
        __page1 = __page1.clickSaveButton();
        __page1 = __page1.goToCareerGrowthPage();
        __page1 = __page1.refreshPage();
        __page1 = __page1.clickUpdateCareerProfileLink();
        __page1 = __page1.clickSkipForNowButton();
        __page1 = __page1.run(new AddSkillToCareerProfileScenario(AddSkillsManuallyToCareerProfileTest.SHRUB, AddSkillsManuallyToCareerProfileTest.BEGINNER));
        __page1 = __page1.run(new AddSkillToCareerProfileScenario(AddSkillsManuallyToCareerProfileTest.GARDENING, AddSkillsManuallyToCareerProfileTest.INTERMEDIATE));
        __page1 = __page1.run(new AddSkillToCareerProfileScenario(AddSkillsManuallyToCareerProfileTest.HORTICULTURE, AddSkillsManuallyToCareerProfileTest.ADVANCED));
        __page1 = __page1.run(new AddSkillToCareerProfileScenario(AddSkillsManuallyToCareerProfileTest.MULCH, AddSkillsManuallyToCareerProfileTest.EXPERT));
        Assert.assertTrue(__page1.skillsOfLevel(AddSkillsManuallyToCareerProfileTest.BEGINNER).allTextContents().contains(AddSkillsManuallyToCareerProfileTest.SHRUB), "Skill of name " + AddSkillsManuallyToCareerProfileTest.SHRUB + " is missing!");
        Assert.assertTrue(__page1.skillsOfLevel(AddSkillsManuallyToCareerProfileTest.INTERMEDIATE).allTextContents().contains(AddSkillsManuallyToCareerProfileTest.GARDENING), "Skill of name " + AddSkillsManuallyToCareerProfileTest.GARDENING + " is missing!");
        Assert.assertTrue(__page1.skillsOfLevel(AddSkillsManuallyToCareerProfileTest.ADVANCED).allTextContents().contains(AddSkillsManuallyToCareerProfileTest.HORTICULTURE), "Skill of name " + AddSkillsManuallyToCareerProfileTest.HORTICULTURE + " is missing!");
        Assert.assertTrue(__page1.skillsOfLevel(AddSkillsManuallyToCareerProfileTest.EXPERT).allTextContents().contains(AddSkillsManuallyToCareerProfileTest.MULCH), "Skill of name " + AddSkillsManuallyToCareerProfileTest.MULCH + " is missing!");
        __page1 = __page1.clickSaveAndContinueButton();
        __page1 = __page1.clickXButton();
        __page1 = __page1.goToMePageProfile();
        __page1 = __page1.goToSkillPassportTab();
        expect(__page1.addedSkill(AddSkillsManuallyToCareerProfileTest.SHRUB)).toBeVisible({ timeout: 30000 });
        expect(__page1.addedSkill(AddSkillsManuallyToCareerProfileTest.GARDENING.toLowerCase())).toBeVisible({ timeout: 30000 });
        expect(__page1.addedSkill(AddSkillsManuallyToCareerProfileTest.HORTICULTURE.toLowerCase())).toBeVisible({ timeout: 30000 });
        expect(__page1.addedSkill(AddSkillsManuallyToCareerProfileTest.MULCH.toLowerCase())).toBeVisible({ timeout: 30000 });
    }

    public afterTests(): void {

      this.deleteUser(this.user);

    }
}
