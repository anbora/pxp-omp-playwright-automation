import { SuggestionsAssertions } from "assertions/careergrowth/careergrowth/SuggestionsAssertions";
import { MyOpportunitiesAssertions } from "assertions/careergrowth/jobs/MyOpportunitiesAssertions";
import { ShareContentModalAssertions } from "assertions/careergrowth/jobs/ShareContentModalAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { ResultContainer } from "models/ResultContainer";
import { UserModel } from "models/user/UserModel";
import { LeftMenuComponentEnum } from "pages/careergrowth/careergrowth/components/LeftMenuComponentEnum";
import { MyOpportunitiesPage } from "pages/careergrowth/jobs/MyOpportunitiesPage";
import { MyMentorshipPage } from "pages/careergrowth/mentorship/MyMentorshipPage";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

export class JobActionsOnSuggestionsPageTest extends BaseRestTest {

    private readonly jobIdResultsContainer: ResultContainer = new ResultContainer();
    private readonly shareHeader: string = "Share Job Vacancy";
    private readonly javaDeveloperFullTitle: string = "Unusual job family -  Java developer";
    private readonly javaDeveloper: string = "Java developer";
    private readonly lumesse: string = "Lumesse";
    private readonly july: string = "Jul";
    private readonly year_2020: string = "2020";
    private readonly year_2023: string = "2023";
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser();

    }

    public checkActionsForAnySuggestedOpenJob(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .goToCareerGrowthPage()
                .editProfile()
                .clickEditProfileButton()
                .clickAddJobFamilyAndRoleButton()
                .selectFirstJobRoleFromInput(this.javaDeveloper, this.javaDeveloperFullTitle)
                .clickSelectButton()
                .clickSaveButton()
                .goToCareerGrowthPage()
                .clickUpdateCareerProfileLink()
                .clickAddMoreExperience()
                .fillPositionTitle(this.javaDeveloper)
                .fillCompanyName(this.lumesse)
                .selectStartDateMonth(this.july)
                .selectStartDateYear(this.year_2020)
                .selectEndDateMonth(this.july)
                .selectEndDateYear(this.year_2023)
                .clickDoneButton()
                .clickSaveAndContinueButton()
                .clickXButton()
                .goToSuggestionsPageViaTab()
                .waitForSuggestions()
                .clickShare()
                .check(ShareContentModalAssertions)
                    .assertThatModalHeaderIsEqualTo(this.shareHeader)
                .endAssertion()
                .closeModal()
//                .waitForGoodOrExcellentMatchForSuggestedJobVacancy()
                .goToFirstSuggestedJobVacancyDetailsPage()
                .getJobId(this.jobIdResultsContainer)
                .clickBackButtonToSuggestionPage()
                .dismissFirstCard()
                .refreshPage()
                .check(SuggestionsAssertions)
                    .assertThatJobVacancySuggestionIsNotPresentOnTheList(this.jobIdResultsContainer.getValue())
                .endAssertion()
                .goToVacanciesPageViaTab()
                .clickInLeftMenuOption(LeftMenuComponentEnum.DISMISSED, MyOpportunitiesPage)
                .waitForJobToBeVisible()
                .check(MyOpportunitiesAssertions)
                    .assertThatJobIsPresentOnTheList()
                    .assertThatJobIdIsMarkedAsDismissed(this.jobIdResultsContainer.getValue())
                .endAssertion()
                .undismissJobById(this.jobIdResultsContainer.getValue())
                .goToCareerGrowthPage()
                .goToSuggestionsPageViaTab()
                .waitForSuggestions()
                .check(SuggestionsAssertions)
                    .assertThatJobVacancySuggestionIsPresentOnTheList(this.jobIdResultsContainer.getValue())
                .endAssertion()
                .bookmarkFirstCard()
                .check(SuggestionsAssertions)
//                    .assertThatSuggestionCannotBeDismissed(jobIdResultsContainer.getValue())
                .endAssertion()
                .refreshPage()
                .check(SuggestionsAssertions)
//                    .assertThatVacancyIdIsBookmarked(jobIdResultsContainer.getValue())
                .endAssertion()
                .goToVacanciesPageViaTab()
                .clickInLeftMenuOption(LeftMenuComponentEnum.BOOKMARK, MyOpportunitiesPage)
                .waitForJobToBeVisible()
                .check(MyOpportunitiesAssertions)
                    .assertThatJobIdIsPresentOnTheList(this.jobIdResultsContainer.getValue())
                    .assertThatVacancyIdIsMarkedAsBookmarked(this.jobIdResultsContainer.getValue())
                .endAssertion()
                .clickUnbookmarkJobVacancy()
                .goToCareerGrowthPage()
                .goToSuggestionsPageViaTab()
                .check(SuggestionsAssertions)
//                    .assertThatVacancyIdIsNotBookmarked(jobIdResultsContainer.getValue())
                .endAssertion();
    }

    public afterTests(): void {

      this.deleteUser(this.user);

    }
}
