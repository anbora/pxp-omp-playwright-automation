import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { RolesListPage_New } from "pages/careergrowth/careergrowth/RolesListPage_New";
import { WelcomePage_New } from "pages/careergrowth/careergrowth/WelcomePage_New";
import { RoleDetailsPage } from "pages/careergrowth/roles/RoleDetailsPage";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

export class RolesTranslationTest extends BaseRestTest {

    private user: UserModel;
    private listOfExcludedStringForLandingPage: Array<string> = [];

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public shouldCheckTranslationForJobRolesPage(): void {
        this.listOfExcludedStringForLandingPage.addAll(Arrays.asList("20%", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "master", "+", this.user.fullName, "Test This"));
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .changeUserDefinedLanguage("Pseudo Localization (xx-XX-native)")
                .goDirectlyTo(WelcomePage_New)
                .goToRolesPageViaTab()
                .checkTranslationWithPageRefresh(RolesListPage_New, this.listOfExcludedStringForLandingPage)
                .clickInFiltersButton()
                .checkTranslationWithoutPageRefresh(RolesListPage_New, this.listOfExcludedStringForLandingPage)
                .closeFilters()
                .clickSortByButton()
                .checkTranslationWithoutPageRefresh(RolesListPage_New, this.listOfExcludedStringForLandingPage)
                .clickActionsButtonJobRoles()
                .checkTranslationWithoutPageRefresh(RolesListPage_New, this.listOfExcludedStringForLandingPage)
                .hoverOverShare()
                .checkTranslationWithoutPageRefresh(RolesListPage_New, this.listOfExcludedStringForLandingPage)
                .hoverOverDismiss()
                .checkTranslationWithoutPageRefresh(RolesListPage_New, this.listOfExcludedStringForLandingPage)
                .markFirstRoleAsAspirational()
                .hoverOverMarkedAsAspirational()
                .checkTranslationWithoutPageRefresh(RolesListPage_New, this.listOfExcludedStringForLandingPage)
                .clickActionsButtonJobRoles()
                .checkTranslationWithoutPageRefresh(RolesListPage_New, this.listOfExcludedStringForLandingPage)
                .goToFirstRoleCard()
                .checkTranslationWithPageRefresh(RoleDetailsPage, this.listOfExcludedStringForLandingPage);
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
