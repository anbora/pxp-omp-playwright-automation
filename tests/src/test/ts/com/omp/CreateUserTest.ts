// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { UsersAdminPage } from "pages/admin/users/UsersAdminPage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { expect } from "common/testing/playwright";

export class CreateUserTest extends BaseRestTest {

    private userModel: UserModel;
    private accountsLabel: string = "Accounts";
    private csvFile: string;
    private email: string = "testusername@csod.com";
    private userName: string = "TestUserName";
    private userLastName: string = "TestLastName";
    private password: string = "T@lentlink.1";
    private newUserModel: UserModel = new UserModel();

    public initialize(): void {
      this.csvFile = "src/main/resources/fixtures/csv/users/" + System.getProperty("config", "qaAws") + "/bulk_import_sample.csv";
        this.newUserModel.name = this.userName;
        this.newUserModel.email = this.email;
        this.newUserModel.password = this.password;
        this.newUserModel.id = "3334441155";
    }

    public createUserViaRest(): void {

    this.userModel = this.createUser(true);

    }

    public logInToNewUserCreatedViaRest(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.userModel));
        __page1 = __page1.goToAdminPanel();
        __page1 = __page1.selectMainTab(this.accountsLabel);
        __page1 = __page1.openUsersPage();
        __page1 = __page1.clickAddUsersButton();
        __page1 = __page1.uploadCsvFile(this.csvFile);
        __page1 = __page1.clickSendWelcomeMessageCheckbox();
        __page1 = __page1.clickPreviewButton();
        __page1 = __page1.clickImportButton();
        __page1 = __page1.refreshCurrentPage(UsersAdminPage);
        __page1 = __page1.fillInSearchInput(this.userName);
        expect(__page1.userEmailInTable(this.email)).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified that user email in visible on the list.");

    }

    public deleteUserViaRest(): void {

      this.deleteUser(this.userModel);

    }

    public logInToNewUserCreatedManually(): void {
                let __page2: any = this;
        __page2 = __page2.getOmpLoginPage();
        __page2 = __page2.fillInLoginInput(this.email);
        __page2 = __page2.fillInPasswordInput(this.password);
        __page2 = __page2.clickLoginButtonAndGoToOnboarding();
        __page2 = __page2.clickNextButtonAndGoToInterest();
        __page2 = __page2.clickNextButtonAndGoToLandingPage();
        __page2.assertHomePageLoaded(this.newUserModel);
        __page2 = __page2.goToCareerGrowthPage();
        expect(__page2.currentRoleName()).toContainText("Unusual job family - Unusual role", { timeout: 30000 });
    }

    public deleteUserManually(): void {
                let __page3: any = this;
        __page3 = __page3.getOmpLoginPage();
        __page3 = __page3.run(new LoginScenario(this.userModel));
        __page3 = __page3.goToAdminPanel();
        __page3 = __page3.selectMainTab(this.accountsLabel);
        __page3 = __page3.openUsersPage();
        __page3 = __page3.fillInSearchInput(this.userName);
        __page3 = __page3.clickUserCheckBox(this.userName + " " + this.userLastName);
        __page3 = __page3.clickDeleteUserButton();
        __page3 = __page3.clickYesForDeletionConfirmation();
        __page3 = __page3.refreshCurrentPage(UsersAdminPage);
        __page3 = __page3.fillInSearchInput(this.userName);
        expect(__page3.emptyListLabel).toContainText("No data available.", { timeout: 30000 });
        __page3.logger.info("Successfully verified that user list is empty.");
    }
}
