import { SuggestionsAssertions } from "assertions/careergrowth/careergrowth/SuggestionsAssertions";
import { VacanciesListAssertions } from "assertions/careergrowth/careergrowth/VacanciesListAssertions";
import { JobVacancyDetailsAssertions } from "assertions/careergrowth/jobs/JobVacancyDetailsAssertions";
import { MyOpportunitiesAssertions } from "assertions/careergrowth/jobs/MyOpportunitiesAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { ResultContainer } from "models/ResultContainer";
import { UserModel } from "models/user/UserModel";
import { AddWorkHistoryToCareerProfileScenario } from "scenarios/jobs/AddWorkHistoryToCareerProfileScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddBasicCareerPreferencesForUser } from "scenarios/profile/AddBasicCareerPreferencesForUser";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";
import { AddSkillToNewUserScenario_SkillLevel } from "scenarios/profile/AddSkillToNewUserScenario_SkillLevel";

export class SuggestedJobDismissTest extends BaseRestTest {

    private dismissed: string = "Dismissed";
    private jobTitleContainer: ResultContainer = new ResultContainer();
    private user: UserModel;
    private javaDeveloper: string = "Java developer";
    private lumesse: string = "Lumesse";
    private coding: string = "coding";
    private october: string = "Oct";
    private year_2017: string = "2017";
    private june: string = "Jun";
    private year_2022: string = "2022";

    public initialize(): void {

    this.user = this.createUser();

    }

    public shouldDismissJobOnJobDetailsPage(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .run(new AddRoleAndFamilyToNewUserScenario(this.user.name))
                .run(new AddSkillToNewUserScenario_SkillLevel())
                .run(new AddBasicCareerPreferencesForUser())
                .clickUpdateCareerProfileLink()
                .run(new AddWorkHistoryToCareerProfileScenario(this.javaDeveloper,this.lumesse,this.coding,this.october,this.year_2017,this.june,this.year_2022 ))
                .clickSaveAndContinueButton()
                .clickXButton()
                .goToSuggestionsPageViaCard()
                .waitForSuggestions()
				.goToVacanciesPageViaTab()
				.getFirstItemOnSuggestedJobVacanciesList(this.jobTitleContainer)
				.goToFirstSuggestedJobVacancyDetailsPage()
				.check(JobVacancyDetailsAssertions)
					.assertThatBookmarkIsEnabled()
				.endAssertion()
				.clickBackButton()
                .goToSuggestionsPageViaTab()
                .waitForJobVacanciesSuggestionByTitle(this.jobTitleContainer.getValue())
                .check(SuggestionsAssertions)
                    .assertThatVacancyIsNotDismissed(this.jobTitleContainer.getValue())
                    .assertThatJobVacancySuggestionIsPresentOnTheList(this.jobTitleContainer.getValue())
                .endAssertion()
                .dismissFirstCard()
                .refreshPage()
                .check(SuggestionsAssertions)
                    .assertThatJobVacancySuggestionIsNotPresentOnTheList(this.jobTitleContainer.getValue())
                .endAssertion()
                .goToVacanciesPageViaTab()
                .check(VacanciesListAssertions)
                    .assertThatJobVacancySuggestionIsNotPresentOnTheList(this.jobTitleContainer.getValue())
                .endAssertion()
                .goToProfileFromUserDropDown(this.user.name)
                .clickOpenJobsTab()
                .selectLeftMenuTab(this.dismissed)
                .waitForJobToBeVisible()
                .check(MyOpportunitiesAssertions)
                    .assertThatJobTitleIsPresentOnTheList(this.jobTitleContainer.getValue())
                    .assertThatVacancyIsMarkedAsDismissed(this.jobTitleContainer.getValue())
                .endAssertion()
                .undismissJobByTitle(this.jobTitleContainer.getValue())
                .goToCareerGrowthPage()
                .goToVacanciesPageViaCard()
                .waitForSuggestions()
                .refreshPage()
                .check(VacanciesListAssertions)
                    .assertThatVacancyIsNotDismissed(this.jobTitleContainer.getValue())
                    .assertThatJobVacancySuggestionIsPresentOnTheList(this.jobTitleContainer.getValue());
    }

    public afterTests(): void {

      this.deleteUser(this.user);

    }
}
