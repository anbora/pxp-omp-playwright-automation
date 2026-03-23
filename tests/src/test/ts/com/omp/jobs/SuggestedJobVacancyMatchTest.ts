import { SuggestionsAssertions } from "assertions/careergrowth/careergrowth/SuggestionsAssertions";
import { JobVacancyDetailsAssertions } from "assertions/careergrowth/jobs/JobVacancyDetailsAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { ResultContainer } from "models/ResultContainer";
import { UserModel } from "models/user/UserModel";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";
import { AddSkillToNewUserScenario_SkillLevel } from "scenarios/profile/AddSkillToNewUserScenario_SkillLevel";

export class SuggestedJobVacancyMatchTest extends BaseRestTest {

    private matchTooltip: string = "The match estimates how close your experience and skills fit this opportunity.";
    private scoringName: ResultContainer = new ResultContainer();
    private scoringValue: ResultContainer = new ResultContainer();
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser();

    }

    public jobVacancyMatchingShouldBeVisibleInJobVacancyDetailsPage(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .run(new AddRoleAndFamilyToNewUserScenario(this.user.name))
                .run(new AddSkillToNewUserScenario_SkillLevel())
                .goToSuggestionsPageViaCard()
                .waitForSuggestions()
                .goToVacanciesPageViaTab()
//                .hoverOverSuggestedJobVacancyMatchName()
//                .check(CareerGrowthAssertions)
//                    .assertThatTooltipTextIsEqualTo(matchTooltip)
//                .endAssertion()
//                .hoverOverSuggestedJobVacancyProgressbar()
//                .check(CareerGrowthAssertions)
//                    .assertThatTooltipTextIsEqualTo(matchTooltip)
//                .endAssertion()
                .getJobVacancyScoringValues(this.scoringName, this.scoringValue)
                .goToFirstSuggestedJobVacancyDetailsPage()
                .check(JobVacancyDetailsAssertions)
                    .assertThatJobVacancyHasProperScoringValue(this.scoringName.getValue(), this.scoringValue.getValue());
//                    .assertThatTooltipTextIsEqualTo(matchTooltip);
    }

    public backButtonFunctionalityInSuggestedJobVacancyDetailsPage(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToCareerGrowthPage()
                .goToSuggestionsPageViaTab()
                .check(SuggestionsAssertions)
                    .assertThatSuggestedJobVacancyIsVisibleUnderSuggestions()
                .endAssertion()
                .goToFirstSuggestedJobVacancyDetailsPage()
                .clickBackButtonToSuggestionPage()
                .check(SuggestionsAssertions)
                    .assertThatSuggestedJobVacancyIsVisibleUnderSuggestions();
    }

    public afterTests(): void {

      this.deleteUser(this.user);

    }
}
