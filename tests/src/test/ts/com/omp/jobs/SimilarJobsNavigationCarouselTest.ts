import { JobVacancyDetailsAssertions } from "assertions/careergrowth/jobs/JobVacancyDetailsAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { ResultContainer } from "models/ResultContainer";
import { UserModel } from "models/user/UserModel";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

export class SimilarJobsNavigationCarouselTest extends BaseRestTest {

    private roadMime: string = "Road Mime";
    private fifteen: string = "15";
    private jobTitleContainer: ResultContainer = new ResultContainer();
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser();

    }

    public shouldCheckSimilarJobsCarouselNavigationOnJobVacancyDetailsPage(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .goToCareerGrowthPage()
                .goToVacanciesPageViaCard()
                .typeSearchValue(this.roadMime)
                .goToFirstJobVacancyOnAllJobsList()
                .check(JobVacancyDetailsAssertions)
                    .assertThatCarouselCounterIsEqualTo(this.fifteen)
                    .assertThatTheNumberOfTheJobsOnCarouselIsEqualTo(this.fifteen)
                    .assertThatLeftCarouselControlButtonIsNotDisplayed()
                    .assertThatRightCarouselControlButtonIsDisplayed()
                .endAssertion()
                .clickRightControlButton()
                .check(JobVacancyDetailsAssertions)
                    .assertThatLeftCarouselControlButtonIsDisplayed()
                    .assertThatRightCarouselControlButtonIsDisplayed()
                .endAssertion()
                .clickRightControlButton()
                .clickRightControlButton()
                .check(JobVacancyDetailsAssertions)
                    .assertThatLeftCarouselControlButtonIsDisplayed()
                    .assertThatRightCarouselControlButtonIsNotDisplayed()
                .endAssertion()
                .clickLeftControlButton()
                .clickLeftControlButton()
                .clickLeftControlButton()
                .check(JobVacancyDetailsAssertions)
                    .assertThatLeftCarouselControlButtonIsNotDisplayed()
                    .assertThatRightCarouselControlButtonIsDisplayed()
                .endAssertion()
                .getFirstJobVacancyOnCarousel(this.jobTitleContainer)
                .goToFirstJobVacancyOnCarousel()
                .check(JobVacancyDetailsAssertions)
                    .assertThatTitleEqualTo(this.jobTitleContainer.getValue())
                .endAssertion()
                .clickBackButtonToJobVacancyDetailsPage()
                .check(JobVacancyDetailsAssertions)
                    .assertThatTitleEqualTo(this.roadMime);
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
