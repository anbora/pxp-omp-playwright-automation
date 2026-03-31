// @ts-nocheck
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { expect } from "common/testing/playwright";
import { UserModel } from "models/user/UserModel";
import { LandingPage } from "pages/landing/LandingPage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";

export class CreateProjectValidateAdminProjectConfig extends BaseRestTest {

    private projectTitle: string = "AdminConfig" + UUID.randomUUID();
	private projectDesc: string = "Description Random";
    private user2: UserModel;

    public initialize(): void {
      this.user2 = this.createUser(true);
        this.wait(10000);
    }

    public setDurationToBeRequiredAndTimezoneToBeHidden(): void {
        let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginScenario(this.getUserByName("Rajendran Sridhar")));
        __page1 = __page1.goToAdminPanel();
        __page1 = __page1.selectMainTab("Talent Marketplace");
        __page1 = __page1.openMenuForProjectOpportunityMarketplace();
        __page1 = __page1.clickStandardFieldsButton();
        expect(__page1.projectConfigShowHideColumHeader).toBeVisible({ timeout: 30000 });
        expect(__page1.projectConfigRequiredColumHeader).toBeVisible({ timeout: 30000 });
        __page1 = __page1.toggleTimezonesFieldShowHideToOff();
        __page1 = __page1.toggleTimeCommitmentRequiredToOn();
        __page1 = __page1.clickSaveButtonStandardFieldTab();
    }

    public createProjectValidateAdminProjectConfig(): void {
        let __page2: any = this;
        __page2 = __page2.getOmpLoginPage();
        __page2 = __page2.run(new LoginWithOnboardingScenario(this.user2));
        __page2 = __page2.run(new AddRoleAndFamilyToNewUserScenario(this.user2.name));
        __page2 = __page2.goDirectlyTo(LandingPage);
        __page2 = __page2.clickCreateButton();
        __page2 = __page2.clickCreateProjectButton();
        __page2 = __page2.fillInProjectTitle(this.projectTitle);
        __page2 = __page2.fillInProjectDescription(this.projectDesc);
        __page2 = __page2.selectAProjectThumbnail();
        __page2 = __page2.clickPublishButton();
        expect(__page2.errormessageRequiredField.first()).toContainText("Must provide a time commitment", { timeout: 30000 });
        expect(__page2.searchTimeZonesText).not.toBeVisible({ timeout: 5000 });
    }

    public resetDurationAndTimezoneToDefaultAndSave(): void {
        let __page3: any = this;
        __page3 = __page3.getOmpLoginPage();
        __page3 = __page3.run(new LoginScenario(this.getUserByName("Rajendran Sridhar")));
        __page3 = __page3.goToAdminPanel();
        __page3 = __page3.selectMainTab("Talent Marketplace");
        __page3 = __page3.openMenuForProjectOpportunityMarketplace();
        __page3 = __page3.clickStandardFieldsButton();
        expect(__page3.projectConfigShowHideColumHeader).toBeVisible({ timeout: 30000 });
        expect(__page3.projectConfigRequiredColumHeader).toBeVisible({ timeout: 30000 });
        __page3 = __page3.toggleTimezonesFieldShowHideToOn();
        __page3 = __page3.toggleTimeCommitmentRequiredToOff();
        __page3 = __page3.clickSaveButtonStandardFieldTab();
    }

    public afterClass(): void {

      this.deleteUser(this.user2);

    }
}
