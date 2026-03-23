import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { MyOpportunitiesPage } from "pages/careergrowth/jobs/MyOpportunitiesPage";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

export class MeJobVacancyTranslationTest extends BaseRestTest {

    private user: UserModel;
    private listOfExcludedStringForLandingPage: Array<string> = [];

    public initialize(): void {

    this.user = this.createUser();

    }

    public shouldCheckTranslationForLandingPage(): void {
        this.listOfExcludedStringForLandingPage.addAll(Arrays.asList("20%", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "master", "+", this.user.fullName, "Test This"));
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .changeUserDefinedLanguage("Pseudo Localization (xx-XX-native)")
                .goToMePageProfile()
                .clickOpenJobsTab()
                .checkTranslationWithPageRefresh(MyOpportunitiesPage, this.listOfExcludedStringForLandingPage)
                .selectLeftMenuTab("Bookmarked")
                .checkTranslationWithPageRefresh(MyOpportunitiesPage, this.listOfExcludedStringForLandingPage)
                .selectLeftMenuTab("Shared with me")
                .checkTranslationWithPageRefresh(MyOpportunitiesPage, this.listOfExcludedStringForLandingPage)
                .selectLeftMenuTab("Dismissed")
                .checkTranslationWithPageRefresh(MyOpportunitiesPage, this.listOfExcludedStringForLandingPage);
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
