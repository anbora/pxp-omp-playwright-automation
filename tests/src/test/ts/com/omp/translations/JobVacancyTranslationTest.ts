// @ts-nocheck
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { VacanciesListPage_New } from "pages/careergrowth/careergrowth/VacanciesListPage_New";
import { WelcomePage_New } from "pages/careergrowth/careergrowth/WelcomePage_New";
import { EditJobVacancyPage } from "pages/careergrowth/jobs/EditJobVacancyPage";
import { JobVacancyDetailsPage } from "pages/careergrowth/jobs/JobVacancyDetailsPage";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

export class JobVacancyTranslationTest extends BaseRestTest {

    private user: UserModel;
    private listOfExcludedStringForLandingPage: Array<string> = [];

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public shouldCheckTranslationForJobVacancyPage(): void {
        this.listOfExcludedStringForLandingPage.addAll(Arrays.asList("*","0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "master", "+", this.user.fullName, "Test This"));
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .changeUserDefinedLanguage("Pseudo Localization (xx-XX-native)")
                .goDirectlyTo(WelcomePage_New)
                .goToVacanciesPageViaTab()
                .checkTranslationWithPageRefresh(VacanciesListPage_New, this.listOfExcludedStringForLandingPage)
                .clickInFiltersButton()
                .checkTranslationWithoutPageRefresh(VacanciesListPage_New, this.listOfExcludedStringForLandingPage)
                .closeFilters();
//                .clickSortByButton()
//                .checkTranslationWithoutPageRefresh(VacanciesListPage_New, listOfExcludedStringForLandingPage)
//                .clickActionsButtonJobVacancy()
//                .checkTranslationWithoutPageRefresh(VacanciesListPage_New, listOfExcludedStringForLandingPage)
//                .hoverOverShare()
//                .checkTranslationWithoutPageRefresh(VacanciesListPage_New, listOfExcludedStringForLandingPage)
//                .hoverOverBookmark()
//                .checkTranslationWithoutPageRefresh(VacanciesListPage_New, listOfExcludedStringForLandingPage)
//                .goToFirstJobVacancyOnAllJobsList()
//                .checkTranslationWithPageRefresh(JobVacancyDetailsPage, listOfExcludedStringForLandingPage)
//                .clickEditVacancyButton()
//                .checkTranslationWithPageRefresh(EditJobVacancyPage, listOfExcludedStringForLandingPage);
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
