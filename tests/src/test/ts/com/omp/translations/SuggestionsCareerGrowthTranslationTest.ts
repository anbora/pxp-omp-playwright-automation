import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { RolesListPage_New } from "pages/careergrowth/careergrowth/RolesListPage_New";
import { SuggestionsPage_New } from "pages/careergrowth/careergrowth/SuggestionsPage_New";
import { WelcomePage_New } from "pages/careergrowth/careergrowth/WelcomePage_New";
import { RoleDetailsPage } from "pages/careergrowth/roles/RoleDetailsPage";
import { AddWorkHistoryToCareerProfileScenario } from "scenarios/jobs/AddWorkHistoryToCareerProfileScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddBasicCareerPreferencesForUser } from "scenarios/profile/AddBasicCareerPreferencesForUser";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";
import { AddSkillToNewUserScenario_SkillLevel } from "scenarios/profile/AddSkillToNewUserScenario_SkillLevel";

export class SuggestionsCareerGrowthTranslationTest extends BaseRestTest {

    private user: UserModel;
    private listOfExcludedStringForLandingPage: Array<string> = [];

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public shouldCheckTranslationForSuggestionsPage(): void {
        this.listOfExcludedStringForLandingPage.addAll(Arrays.asList("20%", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "master", "+", this.user.fullName, "Test This"));
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .run(new AddRoleAndFamilyToNewUserScenario(this.user.name))
                .run(new AddSkillToNewUserScenario_SkillLevel())
                .changeUserDefinedLanguage("Pseudo Localization (xx-XX-native)")
                .goDirectlyTo(WelcomePage_New)
                .goToSuggestionsPageViaTab()
                .checkTranslationWithPageRefresh(SuggestionsPage_New, this.listOfExcludedStringForLandingPage)
                .clickActionsButtonJobVacancy()
                .checkTranslationWithoutPageRefresh(SuggestionsPage_New, this.listOfExcludedStringForLandingPage)
                .hoverOverShare()
                .checkTranslationWithoutPageRefresh(SuggestionsPage_New, this.listOfExcludedStringForLandingPage)
                .hoverOverDismiss()
                .checkTranslationWithoutPageRefresh(SuggestionsPage_New, this.listOfExcludedStringForLandingPage)
                .hoverOverBookmark()
                .checkTranslationWithoutPageRefresh(SuggestionsPage_New, this.listOfExcludedStringForLandingPage)
                .clickActionsButtonJobRoles()
                .checkTranslationWithoutPageRefresh(SuggestionsPage_New, this.listOfExcludedStringForLandingPage)
                .markFirstRoleAsAspirational()
                .hoverOverMarkedAsAspirational()
                .checkTranslationWithoutPageRefresh(SuggestionsPage_New, this.listOfExcludedStringForLandingPage)
                .clickActionsButtonJobRoles()
                .checkTranslationWithoutPageRefresh(SuggestionsPage_New, this.listOfExcludedStringForLandingPage);
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
