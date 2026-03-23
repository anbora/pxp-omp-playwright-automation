import { VacanciesListAssertions } from "assertions/careergrowth/careergrowth/VacanciesListAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { ResultContainer } from "models/ResultContainer";
import { UserModel } from "models/user/UserModel";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";

export class JobListSortingTest extends BaseRestTest {

    private jobContainer: ResultContainer = new ResultContainer();
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser();

    }

    public dataProviderForJobListSorting(): any[][] {
        return [
                        ["Excellent to Low Match", "Low to Excellent Match"],
                        ["Newest First", "Oldest First"],
                        ["Alphabetical: A-Z", "Alphabetical: Z-A"]
                ];
    }

    public prepareUserBeforeTests(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .run(new AddRoleAndFamilyToNewUserScenario(this.user.name))
                .goToCareerGrowthPage()
                .goToVacanciesPageViaCard()
                .waitForGoodOrExcellentMatchForSuggestedJobVacancy();
    }

    public shouldCheckJobsSorting(startSorting: string, endSorting: string): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToCareerGrowthPage()
                .goToVacanciesPageViaCard()
                .sortListBy(startSorting)
                .getFirstItemOnAllVacanciesList(this.jobContainer)
                .check(VacanciesListAssertions)
                    .assertThatFirstJobOnTheListIsEqualTo(this.jobContainer.getValue())
                .endAssertion()
                .sortListBy(endSorting)
                .check(VacanciesListAssertions)
                    .assertThatFirstJobOnTheListIsNotEqualTo(this.jobContainer.getValue())
                .endAssertion()
                .sortListBy(startSorting)
                .check(VacanciesListAssertions)
                    .assertThatFirstJobOnTheListIsEqualTo(this.jobContainer.getValue());
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
