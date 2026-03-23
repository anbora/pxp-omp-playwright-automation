import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { WelcomePage_New } from "pages/careergrowth/careergrowth/WelcomePage_New";
import { CreateProjectPage } from "pages/careergrowth/project/CreateProjectPage";
import { ProjectDiscoveryPage } from "pages/careergrowth/project/ProjectDiscoveryPage";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

export class ProjectTranslationTest extends BaseRestTest {

    private user: UserModel;
    private listOfExcludedStringForLandingPage: Array<string> = [];

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public shouldCheckTranslationForProjectPage(): void {
        this.listOfExcludedStringForLandingPage.addAll(Arrays.asList("20%", "0","1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "master", "+","*", this.user.fullName, "Test This"));
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .changeUserDefinedLanguage("Pseudo Localization (xx-XX-native)")
                .goDirectlyTo(WelcomePage_New)
                .goToProjectsPageViaTab()
                .checkTranslationWithPageRefresh(ProjectDiscoveryPage, this.listOfExcludedStringForLandingPage)
                .clickInFiltersButton()
                .checkTranslationWithoutPageRefresh(ProjectDiscoveryPage, this.listOfExcludedStringForLandingPage)
                .closeFilters()
                .clickSortByButton();
//                .checkTranslationWithoutPageRefresh(ProjectDiscoveryPage, listOfExcludedStringForLandingPage)
//                .clickActionsButtonJobVacancy()
//                .checkTranslationWithoutPageRefresh(ProjectDiscoveryPage, listOfExcludedStringForLandingPage)
//                .hoverOverShareProjects()
//                .checkTranslationWithoutPageRefresh(ProjectDiscoveryPage, listOfExcludedStringForLandingPage)
//                .hoverOverBookmarkProjects()
//                .checkTranslationWithoutPageRefresh(ProjectDiscoveryPage, listOfExcludedStringForLandingPage)
//                .clickCreateButton()
//                .clickCreateProjectButton()
//                .checkTranslationWithPageRefresh(CreateProjectPage, listOfExcludedStringForLandingPage);
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
