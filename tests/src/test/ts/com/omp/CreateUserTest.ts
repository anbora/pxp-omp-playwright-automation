import { UsersAdminAssertions } from "assertions/admin/users/UsersAdminAssertions";
import { WelcomePageAssertions } from "assertions/careergrowth/careergrowth/WelcomePageAssertions";
import { LandingPageAssertions } from "assertions/landing/LandingPageAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { UsersAdminPage } from "pages/admin/users/UsersAdminPage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

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
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.userModel))
                .goToAdminPanel()
                .selectMainTab(this.accountsLabel)
                .openUsersPage()
                .clickAddUsersButton()
                .uploadCsvFile(this.csvFile)
                .clickSendWelcomeMessageCheckbox()
                .clickPreviewButton()
                .clickImportButton()
                .refreshCurrentPage(UsersAdminPage)
                .fillInSearchInput(this.userName)
                .check(UsersAdminAssertions)
                    .assertThatUserEmailIsOnTheList(this.email);

    }

    public deleteUserViaRest(): void {

      this.deleteUser(this.userModel);

    }

    public logInToNewUserCreatedManually(): void {
        this.getOmpLoginPage()
                .fillInLoginInput(this.email)
                .fillInPasswordInput(this.password)
                .clickLoginButtonAndGoToOnboarding()
                .clickNextButtonAndGoToInterest()
                .clickNextButtonAndGoToLandingPage()
                .check(LandingPageAssertions)
                    .assertThatHomePageIsLoaded(this.newUserModel)
                .endAssertion()
                .goToCareerGrowthPage()
                .check(WelcomePageAssertions)
                    .assertThatCurrentRoleNameIsEqualTo("Unusual job family - Unusual role");
    }

    public deleteUserManually(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.userModel))
                .goToAdminPanel()
                .selectMainTab(this.accountsLabel)
                .openUsersPage()
                .fillInSearchInput(this.userName)
                .clickUserCheckBox(this.userName + " " + this.userLastName)
                .clickDeleteUserButton()
                .clickYesForDeletionConfirmation()
                .refreshCurrentPage(UsersAdminPage)
                .fillInSearchInput(this.userName)
                .check(UsersAdminAssertions)
                    .assertThatUserListIsEmpty();
    }
}
