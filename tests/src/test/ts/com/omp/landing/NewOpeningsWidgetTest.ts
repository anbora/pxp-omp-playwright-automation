import { JobVacancyDetailsAssertions } from "assertions/careergrowth/jobs/JobVacancyDetailsAssertions";
import { ProjectDetailsAssertions } from "assertions/careergrowth/project/ProjectDetailsAssertions";
import { ProjectDiscoveryAssertions } from "assertions/careergrowth/project/ProjectDiscoveryAssertions";
import { LandingPageAssertions } from "assertions/landing/LandingPageAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { ResultContainer } from "models/ResultContainer";
import { UserModel } from "models/user/UserModel";
import { LandingPage } from "pages/landing/LandingPage";
import { HomePage } from "pages/other/HomePage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

export class NewOpeningsWidgetTest extends BaseRestTest {

    private projectTitleContainer: ResultContainer = new ResultContainer();
    private jobVacancyTitleContainer: ResultContainer = new ResultContainer();
    private user: UserModel;

    public newOpeningsWidgetTest(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.getUserByName("Rajendran Sridhar")))//changing to existing this.user as suggested openings show up only for existing this.user
                .refreshUntilNewOpeningsWidgetTitleLoads()
                .check(LandingPageAssertions)
                    .assertThatNewOpeningsWidgetIsDisplayed()
                    .assertThatThereIsAtLeastOneProjectInProjectsTab()
                .endAssertion()
                .getFirstItemOnAllProjectsList(this.projectTitleContainer)
                .clickProjectCardWithProjectTitle(this.projectTitleContainer.getValue())
                .check(ProjectDetailsAssertions)
                    .assertThatProjectDetailsPageLoadsForOwner(this.projectTitleContainer.getValue())
                .endAssertion()
                .goDirectlyTo(LandingPage)
                .clickSeeAllButtonInNewOpeningsWidget()
                .check(ProjectDiscoveryAssertions)
                    .assertProjectsDiscoveryPageLoadsFromLandingPage()
                .endAssertion()
                .goDirectlyTo(LandingPage)
                .clickJobVacanciesTab()
                .getFirstItemOnAllJobVacanciesList(this.jobVacancyTitleContainer)
                .clickJobVacancyCardWithTitle(this.jobVacancyTitleContainer.getValue())
                .check(JobVacancyDetailsAssertions)
                    .assertThatTitleEqualTo(this.jobVacancyTitleContainer.getValue())
                .endAssertion()
                .goDirectlyTo(LandingPage)
                .clickJobVacanciesTab()
                .clickSeeAllButtonInJobVacanciesTab()
                .check(LandingPageAssertions)
                    .assertThatJobVacancyAllPageLoads();
    }
}
