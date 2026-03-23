import { ProjectMePageAssertions } from "assertions/careergrowth/project/ProjectMePageAssertions";
import { MePageProjectsTabAssertions } from "assertions/me/MePageProjectsTabAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

export class MePageProjectBasicTest extends BaseRestTest {

    private user: UserModel;
    private projectTitle: string = "LimtedTest" + UUID.randomUUID();
    private projectDesc: string = "Description Random";

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public basicProjectTest(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .clickCreateButton()
                .clickCreateProjectButton()
                .fillInProjectTitle(this.projectTitle)
                .fillInProjectDescription(this.projectDesc)
                .selectAProjectThumbnail()
                .clickDraftButton()
                .goToMePageProfile()
                .goToProjectsTab()
                .clickDraftTab()
                .check(ProjectMePageAssertions)
                    .assertProjectIsDisplayedInOwnedByMeProjectsHorizontalCard(this.projectTitle)
                .endAssertion()
                .clickEditButton()
                .clickPublishButton()
                .clickMaybeLaterButton()
                .check(ProjectMePageAssertions)
                    .assertProjectIsDisplayedInOwnedByMeProjectsHorizontalCard(this.projectTitle)
                .endAssertion()
                .clickThreeDotMenuButton()
                .clickBookmarkButton()
                .clickShareProjectDropdownButton()
                .clickSelectIndividualShareProject()
                .clickShareProject()
                .clickBookmarkedTab()
                .check(MePageProjectsTabAssertions)
                    .assertThatProjectNameInProjectsTabIsVisible(this.projectTitle)
                .endAssertion()
                .clickUnBookmarkButton()
                .check(MePageProjectsTabAssertions)
                    .assertThatProjectNameInProjectsTabIsNotVisible()
                .endAssertion()
                .clickThreeDotMenuButton()
                .clickCloseProjectThreeDotMenuButton()
                .clickAreYouSureCloseProjectButton()
                .clickClosedTab()
                .check(MePageProjectsTabAssertions)
                    .assertThatProjectNameInProjectsTabIsVisible(this.projectTitle)
                .endAssertion()
                .clickPublishedTab()
                .check(MePageProjectsTabAssertions)
                    .assertThatProjectNameInProjectsTabPublishedIsNotVisible()
                .endAssertion();
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
