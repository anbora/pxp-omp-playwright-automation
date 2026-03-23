import { RoleDetailsAssertions } from "assertions/careergrowth/roles/RoleDetailsAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

export class SubwayViewForCareerPathSmokeTest extends BaseRestTest {

    private startingRole: string = "Current role for Smoke Test";
    private endRole: string = "End role for Smoke Test";
    private startingRoleFullName: string = "First Job Family -  Current role for Smoke Test";
    private roleDetailsHeader: string = "Career paths";
    private moreThan4MovesToReachTheRole: string = "More than 4 moves";
    private yourCurrentJobRole: string = "Your current Job Role";
    private lowMatching: string = "Low to Excellent Match";
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser();

    }

    public shouldCheckCareerPathSectionForDifferentRoles(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .goToMePageProfile()
                .editProfile()
                .goToEditProfileFromUserDropDown(this.user.name)
                .clickEditProfileButton()
                .clickAddJobFamilyAndRoleButton()
                .selectFirstJobRoleFromInput(this.startingRole, this.startingRoleFullName)
                .clickSelectButton()
                .clickSaveButton()
                .goToCareerGrowthPage()
                .goToRolesPageViaCard()
                .typeSearchValue(this.startingRole)
                .goToFirstRoleCard()
                .check(RoleDetailsAssertions)
                    .assertThatCareerPathIconNotExist()
                    .assertThatCareerPathHeaderNotExist()
                .endAssertion()
                .clickBackButton()
                .clearSearchKeywordCriteria()
                .sortListBy(this.lowMatching)
                .goToFirstRoleCard()
                .check(RoleDetailsAssertions);
//                    .assertThatCareerPathHeaderIsEqualTo(roleDetailsHeader)
//                    .assertThatCustomPillContainsText(moreThan4MovesToReachTheRole);
    }

    public shouldCheckSimpleCareerPath(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToCareerGrowthPage()
                .goToRolesPageViaCard()
                .typeSearchValue(this.endRole)
                .goToFirstRoleCard()
                .check(RoleDetailsAssertions)
                    .assertThatUserRoleNameIsEqualTo(this.startingRole)
                    .assertThatGoalRoleNameIsEqualTo(this.endRole);
    }

    public afterTests(): void {

      this.deleteUser(this.user);

    }
}
