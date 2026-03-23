import { RoleListAssertions } from "assertions/careergrowth/careergrowth/RoleListAssertions";
import { VacanciesListAssertions } from "assertions/careergrowth/careergrowth/VacanciesListAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";

export class JobsAndRolesListPaginationTest extends BaseRestTest {

    private vacanciesUrlPage1: string = "/career/job-vacancies/all?page=1";
    private vacanciesUrlPage2: string = "/career/job-vacancies/all?page=2";
    private vacanciesUrlPage6: string = "/career/job-vacancies/all?page=6";
    private rolesUrlPage1: string = "/career/job-roles/all?page=1";
    private rolesUrlPage2: string = "/career/job-roles/all?page=2";
    private previous: string = "«";
    private dots: string = "...";
    private one: string = "1";
    private two: string = "2";
    private six: string = "6";
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public shouldCheckJobsListPagination(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .run(new AddRoleAndFamilyToNewUserScenario(this.user.name))
                .goToCareerGrowthPage()
                .goToVacanciesPageViaCard()
                .check(VacanciesListAssertions)
                    .assertThatActivePageIsEqualTo(this.one)
                    .assertThatPageIsNotClickable(this.previous)
//                    .assertThatPageButtonIsNotDisplayed(six)
                .endAssertion()
                .clickRightArrowButton()
                .check(VacanciesListAssertions)
                    .assertThatUrlContainsProperText(this.vacanciesUrlPage2)
                .endAssertion()
                .clickLeftArrowButton()
                .check(VacanciesListAssertions)
                    .assertThatUrlContainsProperText(this.vacanciesUrlPage1)
                .endAssertion()
                .clickPageNumber(this.dots)
                .check(VacanciesListAssertions)
                    .assertThatActivePageIsEqualTo(this.six)
                    .assertThatUrlContainsProperText(this.vacanciesUrlPage6)
//                    .assertThatPageButtonIsNotDisplayed(two)
                    ;
    }

    public shouldCheckRolesListPagination(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToCareerGrowthPage()
                .goToRolesPageViaCard()
                .clickRightArrowButton()
                .check(RoleListAssertions)
                    .assertThatUrlContainsProperText(this.rolesUrlPage2)
                .endAssertion()
                .clickLeftArrowButton()
                .check(RoleListAssertions)
                    .assertThatUrlContainsProperText(this.rolesUrlPage1);
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
