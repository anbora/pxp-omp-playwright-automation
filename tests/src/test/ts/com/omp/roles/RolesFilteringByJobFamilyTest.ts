import { RoleListAssertions } from "assertions/careergrowth/careergrowth/RoleListAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { TeamsResponsibleEnum } from "common/enums/TeamsResponsibleEnum";
import { UserModel } from "models/user/UserModel";
import { AllFiltersModalPage } from "pages/careergrowth/jobs/AllFiltersModalPage";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";

export class RolesFilteringByJobFamilyTest extends BaseRestTest {

    private user: UserModel;
    private jobFamilyName: string = "QA family";
    private jobRoleName: string = UUID.randomUUID().toString();
    private jobFamily: string = "Job Family";
    private familyId: string = "3771782040293632469";
    private roleId: string;
    private twelve: number = 12;
    private one: number = 1;

    public initialize(): void {
      this.user = this.createUser();
      this.roleId = this.createRole(this.jobRoleName, this.jobRoleName, this.jobRoleName, this.familyId);
    }

    public shouldFilterRolesByJobFamily(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .run(new AddRoleAndFamilyToNewUserScenario(this.user.name))
                .goToCareerGrowthPage()
                .goToRolesPageViaCard()
                .typeSearchValue(this.jobRoleName)
                .check(RoleListAssertions)
                    .assertThatVacancyCardsDisplayProperNumberOfCards(this.one)
                .endAssertion()
                .clearSearchKeywordCriteria()
                .refreshPage()
                .check(RoleListAssertions)
                    .assertThatVacancyCardsDisplayProperNumberOfCards(this.twelve)
                .endAssertion()
                .openFiltersModal(AllFiltersModalPage)
                .searchForFilterWithCheckbox(this.jobFamily, this.jobFamilyName, 1000)
                .applyFiltersAndBackToRoleList()
                .check(RoleListAssertions)
                    .assertThatFilterIsApplied(this.jobFamilyName)
                    .assertThatVacancyCardsDisplayProperNumberOfCards(this.twelve);
    }

    public cleanUp(): void {
        this.deleteRole(this.jobRoleName, this.roleId);
        this.deleteUser(this.user);
    }
}
