// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { PortalsEnum } from "common/enums/portals/PortalsEnum";
import { TeamsResponsibleEnum } from "common/enums/TeamsResponsibleEnum";
import { UserModel } from "models/user/UserModel";
import { WelcomePage_New } from "pages/careergrowth/careergrowth/WelcomePage_New";
import { NewProfilePage } from "pages/newprofile/NewProfilePage";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { expect } from "common/testing/playwright";

export class VisibilityOfMentorProfileButtonInNewProfileTest extends BaseRestTest {

    private static readonly RANDOM_SUFFIX: string = UUID.randomUUID().toString();
    private readonly skillName: string = "java";
    private readonly description: string = "Become a mentor" + VisibilityOfMentorProfileButtonInNewProfileTest.RANDOM_SUFFIX;;

    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public shouldDisplayMentorProfile(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.goDirectlyTo(NewProfilePage);
        __page1 = __page1.clickAddYourSkillsButton();
        __page1 = __page1.clickAddSkillTag();
        __page1 = __page1.selectSkillLevel();
        __page1 = __page1.clickSaveButton();
        __page1 = __page1.goDirectlyTo(WelcomePage_New);
        __page1 = __page1.goToMenthorshipPageViaTab();
        __page1 = __page1.clickBecomeAMentor();
        __page1 = __page1.clickOnCreateProfileButton();
        __page1 = __page1.addSkillsAndDescription(this.skillName, this.skillName, this.description);
        __page1 = __page1.clickOnCreateProfileButton();
        __page1 = __page1.clickOnCloseMentorProfileButton();
        __page1 = __page1.goDirectlyTo(NewProfilePage);
        __page1 = __page1.clickPublicProfileButton();
        expect(__page1.mentorProfileButton).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified, that Mentor Profile button is visible");
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
