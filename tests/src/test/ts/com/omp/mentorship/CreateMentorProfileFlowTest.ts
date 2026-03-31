// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LandingPage } from "pages/landing/LandingPage";
import { HomePage } from "pages/other/HomePage";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";
import { expect } from "common/testing/playwright";

export class CreateMentorProfileFlowTest extends BaseRestTest {

    private skillName: string = "java 8";
    private advancedSkillLevel: string = "Advanced";
    private description: string = "I want to become mentor in Java 8 am open.";
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public CreateMentorProfileTest(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.run(new AddRoleAndFamilyToNewUserScenario(this.user.name));
        __page1 = __page1.goDirectlyTo(LandingPage);
        __page1 = __page1.goToCareerGrowthPage();
        __page1 = __page1.goToMentorshipPageViaCard();
        __page1 = __page1.clickBecomeAMentor();
        __page1 = __page1.addSkillsToSkillPassport(this.skillName, this.skillName, this.advancedSkillLevel);
        __page1 = __page1.goToCareerGrowthPage();
        __page1 = __page1.goToMentorshipPageViaCard();
        __page1 = __page1.clickBecomeAMentor();
        __page1 = __page1.addSkillsAndDescription(this.skillName, this.skillName, this.description);
        __page1 = __page1.clickOnCreateProfileButton();
        expect(__page1.createdMentorProfileText()).toBeVisible({ timeout: 30000 });
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
