// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";
import { expect } from "common/testing/playwright";

export class SkillsPassportVisibilitySanityTest extends BaseRestTest {

    private skill: string = "skill";
    private refinery: string = "refinery";
    private beginner: string = "Beginner";
    private skills: string = "Skills";
    private publicType: string = "Public";
    private privateType: string = "Private";
    private userLastName: string = " User";

    private user: UserModel;
    private user2: UserModel;

    public initialize(): void {
      this.user = this.createUser();
//        this.waitForResponse(15000);
      this.user2 = this.createUser();
    }

    public shouldCheckIfSkillsPassportChangesAccordingToSettings(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.run(new AddRoleAndFamilyToNewUserScenario(this.user.name));
        __page1 = __page1.goToMePageProfile();
        __page1 = __page1.goToSkillPassportTab();
        __page1 = __page1.clickAddMoreSkillsButton();
        __page1 = __page1.selectSkillType();
        __page1 = __page1.selectSkillFromInput(this.refinery, this.refinery);
        __page1 = __page1.selectSkillLevel(this.beginner);
        __page1 = __page1.clickSaveButton();
        __page1 = __page1.openVisibilityModal(this.skills);
        __page1 = __page1.setVisibility(this.publicType);
        __page1 = __page1.saveChanges();
        __page1 = __page1.viewPublicProfile();
        expect(__page1.skillsTab).toBeVisible({ timeout: 30000 });
        __page1 = __page1.goToSkillPassportTab();
        expect(__page1.addedSkill(this.refinery)).toBeVisible({ timeout: 30000 });
    }

    public shouldVerifyPublicVisibilityForOtherUser(): void {
                let __page2: any = this;
        __page2 = __page2.getOmpLoginPage();
        __page2 = __page2.run(new LoginWithOnboardingScenario(this.user2));
        __page2 = __page2.useKeywordSearch(this.user.name);
        __page2 = __page2.visitPeopleTab();
        __page2 = __page2.goToUserProfile(this.user.name + this.userLastName);
        __page2 = __page2.goToSkillPassportTab();
        expect(__page2.addedSkill(this.refinery)).toBeVisible({ timeout: 30000 });
    }

    public shouldSetVisibilityToPrivate(): void {
                let __page3: any = this;
        __page3 = __page3.getOmpLoginPage();
        __page3 = __page3.run(new LoginScenario(this.user));
        __page3 = __page3.goToMePageProfile();
        __page3 = __page3.goToSkillPassportTab();
        __page3 = __page3.openVisibilityModal(this.skills);
        __page3 = __page3.setVisibility(this.privateType);
        __page3 = __page3.saveChanges();
        __page3 = __page3.viewPublicProfile();
        __page3 = __page3.goToSkillPassportTab();
        expect(__page3.addedSkill(this.refinery)).not.toBeVisible({ timeout: 5000 });
    }

    public shouldVerifyPrivateVisibilityForOtherUser(): void {
                let __page4: any = this;
        __page4 = __page4.getOmpLoginPage();
        __page4 = __page4.run(new LoginScenario(this.user2));
        __page4 = __page4.useKeywordSearch(this.user.name);
        __page4 = __page4.visitPeopleTab();
        __page4 = __page4.goToUserProfile(this.user.name + this.userLastName);
        __page4 = __page4.goToSkillPassportTab();
        expect(__page4.addedSkill(this.refinery)).not.toBeVisible({ timeout: 5000 });
    }

    public afterTests(): void {
        this.deleteUser(this.user);
        this.deleteUser(this.user2);
    }
}
