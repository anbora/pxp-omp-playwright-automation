import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { CareerPathPage_New } from "pages/careergrowth/careergrowth/CareerPathPage_New";
import { RolesListPage_New } from "pages/careergrowth/careergrowth/RolesListPage_New";
import { WelcomePage_New } from "pages/careergrowth/careergrowth/WelcomePage_New";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";
import { AddSkillToNewUserScenario_SkillLevel } from "scenarios/profile/AddSkillToNewUserScenario_SkillLevel";

export class CareerExplorationCareerGrowthTranslationTest extends BaseRestTest {

    private user: UserModel;
    private listOfExcludedStringForLandingPage: Array<string> = [];
    private roleName: string = "Software Engineer in Tests";

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public shouldCheckTranslationForCareerExplorationPage(): void {
        this.listOfExcludedStringForLandingPage.addAll(Arrays.asList("20%", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "master", "+", this.user.fullName, "Test This"));
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .run(new AddRoleAndFamilyToNewUserScenario(this.user.name))
                .run(new AddSkillToNewUserScenario_SkillLevel())
                .changeUserDefinedLanguage("Pseudo Localization (xx-XX-native)")
                .goDirectlyTo(WelcomePage_New)
                .goToCareerPathPageViaTab()
                .checkTranslationWithoutPageRefresh(CareerPathPage_New, this.listOfExcludedStringForLandingPage)
                .openFiltersModal()
                .checkTranslationWithoutPageRefresh(CareerPathPage_New, this.listOfExcludedStringForLandingPage)
                .closeFilters()
                .clickRolePill(this.roleName)
                .checkTranslationWithoutPageRefresh(CareerPathPage_New, this.listOfExcludedStringForLandingPage)
                .openJobRoleSearch()
                .checkTranslationWithoutPageRefresh(CareerPathPage_New, this.listOfExcludedStringForLandingPage)
                .hoverOverArrow("Move graph right")
                .checkTranslationWithoutPageRefresh(CareerPathPage_New, this.listOfExcludedStringForLandingPage)
                .hoverOverArrow("Move graph left")
                .checkTranslationWithoutPageRefresh(CareerPathPage_New, this.listOfExcludedStringForLandingPage)
                .hoverOverArrow("Move graph up")
                .checkTranslationWithoutPageRefresh(CareerPathPage_New, this.listOfExcludedStringForLandingPage)
                .hoverOverArrow("Move graph down")
                .checkTranslationWithoutPageRefresh(CareerPathPage_New, this.listOfExcludedStringForLandingPage)
                .hoverOverZoomOptions("Zoom in on graph")
                .checkTranslationWithoutPageRefresh(CareerPathPage_New, this.listOfExcludedStringForLandingPage)
                .hoverOverZoomOptions("Zoom out of graph")
                .checkTranslationWithoutPageRefresh(CareerPathPage_New, this.listOfExcludedStringForLandingPage);
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
