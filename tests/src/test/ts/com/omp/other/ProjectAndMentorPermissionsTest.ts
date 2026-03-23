import { WelcomePageAssertions } from "assertions/careergrowth/careergrowth/WelcomePageAssertions";
import { MentorshipDiscoveryAssertions } from "assertions/careergrowth/mentorship/MentorshipDiscoveryAssertions";
import { MyMentorshipAssertions } from "assertions/careergrowth/mentorship/MyMentorshipAssertions";
import { ProjectDiscoveryAssertions } from "assertions/careergrowth/project/ProjectDiscoveryAssertions";
import { ProjectMePageAssertions } from "assertions/careergrowth/project/ProjectMePageAssertions";
import { LandingPageAssertions } from "assertions/landing/LandingPageAssertions";
import { MePageAssertions } from "assertions/me/MePageAssertions";
import { BaseTest } from "common/BaseTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { TeamsResponsibleEnum } from "common/enums/TeamsResponsibleEnum";
import { LandingPage } from "pages/landing/LandingPage";
import { HomePage } from "pages/other/HomePage";
import { LoginScenario } from "scenarios/other/LoginScenario";

export class ProjectAndMentorPermissionsTest extends BaseTest {

    public userWithoutCreateProjectPermissionCannotCreateProject(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.getUserByName("Smokey Bear")))
                .clickCreateButton()
                .check(LandingPageAssertions)
                    .assertThatCreateProjectButtonIsNotDisplayed()
                .endAssertion()
                .goToMePageProfile()
                .goToProjectsTab()
                .check(ProjectMePageAssertions)
                    .assertPublishedTabIsDisplayed()
                    .assertCreateAProjectButtonIsNotDisplayed()
                .endAssertion()
                .goDirectlyTo(LandingPage)
                .goToCareerGrowthPage()
                .goToProjectsPageViaCard()
                .check(ProjectDiscoveryAssertions)
                    .assertAllProjectsHeaderDisplays()
                    .assertCreateAProjectButtonIsNotDisplayed();
    }

    public userWithoutCanBeAMentorPermissionCannotBecomeAMentor(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.getUserByName("Smokey Bear")))
                .goToCareerGrowthPage()
                .goToMentorshipPageViaCard()
                .check(MentorshipDiscoveryAssertions)
                    .assertAllMentorsHeaderIsDisplayed()
                    .assertBecomeAMentorButtonIsNotDisplayed()
                    .assertViewMyMentorProfileButtonisNotDisplayed()
                .endAssertion()
                .goDirectlyTo(LandingPage)
                .goToMePageProfile()
                .goToMentorshipsTab()
                .check(MyMentorshipAssertions)
                    .assertMyMenteesTabIsNotDisplayed()
                    .assertViewMyMentorProfileButtonIsNotDisplayed();
    }

    public userWithoutViewProjectMentorshipPermissionsCannotViewProjectsAndMentorships(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.getUserByName("Steven Smith")))
                .goToCareerGrowthPage()
                .check(WelcomePageAssertions)
//                    .assertThatProjectBannerIsNotDisplayed()
//                    .assertThatMentorshipBannerIsNotDisplayed()
                .endAssertion()
                .goDirectlyTo(LandingPage)
                .goToMePageProfile()
                .check(MePageAssertions)
                    .assertThatProjectsTabIsNotDisplayed()
                    .assertThatMentorshipsTabIsNotDisplayed();
    }
}
