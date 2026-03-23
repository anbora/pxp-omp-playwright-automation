import { LandingPageAssertions } from "assertions/landing/LandingPageAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { TeamsResponsibleEnum } from "common/enums/TeamsResponsibleEnum";
import { ResultContainer } from "models/ResultContainer";
import { UserModel } from "models/user/UserModel";
import { LandingPage } from "pages/landing/LandingPage";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

export class AnnouncementsWidgetTest extends BaseRestTest {

    private announcementTitleContainer: ResultContainer = new ResultContainer();
    private user: UserModel;
    private adminSettings: string = "Settings";

    public initialize(): void {

    this.user = this.createUser(true);

    }
    public announcementsWidgetTest(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .goToAdminPanel()
                .selectMainTab(this.adminSettings)
                .openSettingsAnnouncementsPage()
                .getFirstEnabledAnnouncementTitle(this.announcementTitleContainer)
                .goDirectlyTo(LandingPage)
                .check(LandingPageAssertions)
                    .assertThatAnnouncementsWidgetIsDisplayed()
                    .assertThatAnnouncementIsVisible(this.announcementTitleContainer)
                .endAssertion();
    }
}
