// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";
import { expect } from "common/testing/playwright";

export class CrudSkillsTest extends BaseRestTest {

    private skillValue: string = "Skill";
    private skillName: string = "cardiology";
    private skillNameInModal: string = "cardiology";
    private skillLevel: string = "Beginner";
    private yearValue: string = "1";
    private monthValue: string = "1";
    private skillDescriptionText: string = "Skill description";

    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser();

    }

    public shouldAddSkill(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.run(new AddRoleAndFamilyToNewUserScenario(this.user.name));
        __page1 = __page1.goToMePageProfile();
        __page1 = __page1.goToSkillPassportTab();
        __page1 = __page1.clickAddMoreSkillsButton();
        __page1 = __page1.selectSkillValue(this.skillValue);
        __page1 = __page1.selectSkillFromInput(this.skillNameInModal, this.skillName);
        __page1 = __page1.selectSkillLevel(this.skillLevel);
        __page1 = __page1.selectYearValue(this.yearValue);
        __page1 = __page1.selectMonthValue(this.monthValue);
        __page1 = __page1.clickSaveButton();
        expect(__page1.addedSkill(this.skillName)).toBeVisible({ timeout: 30000 });
    }

    public shouldUpdateSkill(): void {
                let __page2: any = this;
        __page2 = __page2.getOmpLoginPage();
        __page2 = __page2.run(new LoginScenario(this.user));
        __page2 = __page2.goToMePageProfile();
        __page2 = __page2.goToSkillPassportTab();
        __page2 = __page2.openSkillDetails(this.skillName);
        __page2 = __page2.editSkillDetails();
        __page2 = __page2.addDescription(this.skillDescriptionText);
        __page2 = __page2.clickSaveButton();
        __page2 = __page2.clickSkillBox(this.skillName);
        expect(__page2.skillDescription).toBeVisible({ timeout: 30000 });
    }

    public shouldDeleteSkill(): void {
                let __page3: any = this;
        __page3 = __page3.getOmpLoginPage();
        __page3 = __page3.run(new LoginScenario(this.user));
        __page3 = __page3.goToMePageProfile();
        __page3 = __page3.goToSkillPassportTab();
        __page3 = __page3.openSkillDetails(this.skillName);
        __page3 = __page3.deleteSkill();
        __page3 = __page3.clickConfirm();
        expect(__page3.addedSkill(this.skillName)).not.toBeVisible({ timeout: 5000 });
    }

    public afterTests(): void {

      this.deleteUser(this.user);

    }
}
