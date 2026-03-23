import { VacanciesListAssertions } from "assertions/careergrowth/careergrowth/VacanciesListAssertions";
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

export class JobVacancyMarkAsBookmarkTest extends BaseRestTest {

    private titleResultContainer: ResultContainer = new ResultContainer();
    private bookmarked: string = "Bookmarked";
    private javaDeveloper: string = "Java developer";
    private lumesse: string = "Lumesse";
    private coding: string = "coding";
    private october: string = "Oct";
    private year_2017: string = "2017";
    private june: string = "Jun";
    private year_2022: string = "2022";
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser();

    }

    public shouldBookmarkJobVacancy(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .run(new AddRoleAndFamilyToNewUserScenario(this.user.name))
                .run(new AddSkillToNewUserScenario_SkillLevel())
                .run(new AddBasicCareerPreferencesForUser())
                .clickUpdateCareerProfileLink()
                .run(new AddWorkHistoryToCareerProfileScenario(this.javaDeveloper, this.lumesse, this.coding,this.october,this.year_2017,this.june,this.year_2022 ))
                .clickSaveAndContinueButton()
                .clickXButton()
                .goToSuggestionsPageViaCard()
                .waitForSuggestions()
                .goToVacanciesPageViaTab()
                .getFirstItemOnSuggestedJobVacanciesList(this.titleResultContainer)
                .goToFirstSuggestedJobVacancyDetailsPage()
                .clickBookmarkButton()
                .clickBackButton()
                .refreshPage()
                .check(VacanciesListAssertions)
                    .assertThatVacancyIsBookmarked(this.titleResultContainer.getValue())
                .endAssertion()
                .goToProfileFromUserDropDown(this.user.name)
                .clickOpenJobsTab()
                .selectLeftMenuTab(this.bookmarked)
                .check(MyOpportunitiesAssertions)
                    .assertThatJobTitleIsPresentOnTheList(this.titleResultContainer.getValue())
                    .assertThatVacancyIsMarkedAsBookmarked(this.titleResultContainer.getValue())
                .endAssertion()
                .clickUnbookmarkJobVacancyByTitle(this.titleResultContainer.getValue())
                .goToCareerGrowthPage()
                .goToVacanciesPageViaCard()
                .typeSearchValue(this.titleResultContainer.getValue())
                .check(VacanciesListAssertions)
                    .assertThatVacancyIsNotBookmarked(this.titleResultContainer.getValue());
    }

    public afterTests(): void {

      this.deleteUser(this.user);

    }
}
