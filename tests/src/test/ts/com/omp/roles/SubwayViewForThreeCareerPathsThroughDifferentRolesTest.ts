import { RoleDetailsAssertions } from "assertions/careergrowth/roles/RoleDetailsAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

export class SubwayViewForThreeCareerPathsThroughDifferentRolesTest extends BaseRestTest {

    private user: UserModel;
    private pathA: string = "Path A";
    private pathB: string = "Path B";
    private pathC: string = "Path C";
    private noPath: string = "No path selection";
    private zero: string = "0";
    private one: string = "1";
    private two: string = "2";
    private three: string = "3";
    private nopolitan2FullName: string = "Subway -  Nopolitan2";
    private nopolitan2: string = "Nopolitan2";
    private nopolitan4: string = "Nopolitan4";
    private nopolitan5: string = "Nopolitan5";
    private nopolitan5b: string = "Nopolitan5b";
    private nopolitan6: string = "Nopolitan6";

    private row1_col0: string = "cp-role-pill__wrapper row_1 col_0 ";
    private row1_col1: string = "cp-role-pill__wrapper row_1 col_1 ";
    private row1_col2: string = "cp-role-pill__wrapper row_1 col_2 ";
    private row2_col0_highlighted: string = "cp-role-pill__wrapper row_2 col_0  cp-role-pill--highlighted cp-role-pill--selected";

    private moveOneLeftParameter: string = "M350,417 H115 a25,25 0 0 1 -25,-25 V251";
    private moveTwoLeftParameter: string = "M90,251 V110 a-25,-25 0 0 1 25,-25 H325 ";

    private moveOneRightParameter: string = "M350,417 H585 a-25,-25 0 0 0 25,-25 V251";
    private moveTwoRightParameter: string = "M610,251 V110 a25,25 0 0 0 -25,-25 H375 ";

    private moveOneStraightParameter: string = "M350 417 L350 251";
    private moveTwoStraightParameter: string = "M350 251 L350 85";

    private whiteColor: string = "rgb(255, 255, 255)";
    private blackColor: string = "rgb(38, 39, 59)";

    public initialize(): void {

    this.user = this.createUser();

    }

    public shouldCheckSubwayView(): void {
        //paths: A => B1 => C and A => B2 => C and A => B3 => C
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .goToMePageProfile()
                .editProfile()
                .goToEditProfileFromUserDropDown(this.user.name)
                .clickEditProfileButton()
                .clickAddJobFamilyAndRoleButton()
                .selectFirstJobRoleFromInput(this.nopolitan2, this.nopolitan2FullName)
                .clickSelectButton()
                .clickSaveButton()
                .goToCareerGrowthPage()
                .goToRolesPageViaCard()
                .typeSearchValue(this.nopolitan6)
                .goToFirstRoleCard()
                .refreshPageUntilSubwayViewIsDisplayed()
                .clickOnRoleName(this.nopolitan6)
                .check(RoleDetailsAssertions)
                    .assertThatUserRoleNameIsEqualTo(this.nopolitan2)
                    .assertThatNumberOfGridLinesIsEqualTo(this.two)
                    .assertThatNumberOfPathsIsEqualTo(this.three)
                    .assertThatNumberOfMovesForThePathIsEqualTo(this.zero, this.two)
                    .assertThatNumberOfMovesForThePathIsEqualTo(this.one, this.two)
                    .assertThatNumberOfMovesForThePathIsEqualTo(this.two, this.two)
                    .assertThatGoalRoleNameIsEqualTo(this.nopolitan6)
                    .assertThatRolePositionOnTheGridIsEqualTo(this.nopolitan4, this.row1_col1)
                    .assertThatRolePositionOnTheGridIsEqualTo(this.nopolitan5, this.row1_col2)
                    .assertThatRolePositionOnTheGridIsEqualTo(this.nopolitan5b, this.row1_col0)
                    .assertThatRolePositionOnTheGridIsEqualTo(this.nopolitan6, this.row2_col0_highlighted);
    }

    public shouldCheckPathParametersAndSelectAPath(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToCareerGrowthPage()
                .goToRolesPageViaCard()
                .typeSearchValue(this.nopolitan6)
                .goToFirstRoleCard()
                .check(RoleDetailsAssertions)
                    .assertThatPathHasParameterForTheMove(this.zero, this.two, this.zero, this.moveOneLeftParameter)
                    .assertThatPathHasParameterForTheMove(this.zero, this.two, this.one, this.moveTwoLeftParameter)
                    .assertThatPathHasParameterForTheMove(this.one, this.three, this.zero, this.moveOneRightParameter)
                    .assertThatPathHasParameterForTheMove(this.one, this.three, this.one, this.moveTwoRightParameter)
                    .assertThatPathHasParameterForTheMove(this.two, this.one, this.zero, this.moveOneStraightParameter)
                    .assertThatPathHasParameterForTheMove(this.two, this.one, this.one, this.moveTwoStraightParameter)
                .endAssertion()
                .check(RoleDetailsAssertions)
                    .assertThatMoveWithinAPathIsHighlighted(this.one, this.zero)
                    .assertThatMoveWithinAPathIsHighlighted(this.one, this.one)
                    .assertThatPathHasNoHighlightedMoves(this.zero)
                    .assertThatPathHasNoHighlightedMoves(this.one)
                .endAssertion()
                .selectPath(this.pathB)
                .check(RoleDetailsAssertions)
                    .assertThatMoveWithinAPathIsHighlighted(this.two, this.zero)
                    .assertThatMoveWithinAPathIsHighlighted(this.two, this.one)
                    .assertThatPathHasNoHighlightedMoves(this.zero)
                    .assertThatPathHasNoHighlightedMoves(this.one)
                .endAssertion()
                .selectPath(this.pathC)
                .check(RoleDetailsAssertions)
                    .assertThatMoveWithinAPathIsHighlighted(this.three, this.zero)
                    .assertThatMoveWithinAPathIsHighlighted(this.three, this.one)
                    .assertThatPathHasNoHighlightedMoves(this.zero)
                    .assertThatPathHasNoHighlightedMoves(this.one)
                .endAssertion()
                .selectPath(this.pathC)
                .check(RoleDetailsAssertions)
                    .assertThatPathHasNoHighlightedMoves(this.zero)
                    .assertThatPathHasNoHighlightedMoves(this.one)
                    .assertThatPathHasNoHighlightedMoves(this.two);
    }

    public shouldMarkRoleAsAspirationalChangePathSelectNoPathRemoveRoleAsAspirational(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToCareerGrowthPage()
                .goToRolesPageViaCard()
                .typeSearchValue(this.nopolitan6)
                .goToFirstRoleCard()
                .check(RoleDetailsAssertions)
                    .assertThatArrowIconIsNotDisplayedForPath(this.pathA)
                    .assertThatArrowIconIsNotDisplayedForPath(this.pathB)
                    .assertThatArrowIconIsNotDisplayedForPath(this.pathC)
                    .assertThatBackgroundColorForARoleIsEqualTo(this.nopolitan6, this.whiteColor)
                .endAssertion()
                .markRoleAspirational()
                .selectPathForAspirationalSubmenu(this.pathA)
                .check(RoleDetailsAssertions)
                    .assertThatArrowIconIsDisplayedForPath(this.pathA)
                    .assertThatBackgroundColorForARoleIsEqualTo(this.nopolitan6, this.blackColor)
                    .assertThatArrowIconIsNotDisplayedForPath(this.pathB)
                    .assertThatArrowIconIsNotDisplayedForPath(this.pathC)
                .endAssertion()
                .changePath()
                .selectPathForAspirationalSubmenuForExistingAspirationalRole(this.pathB)
                .check(RoleDetailsAssertions)
                    .assertThatArrowIconIsDisplayedForPath(this.pathB)
                    .assertThatBackgroundColorForARoleIsEqualTo(this.nopolitan6, this.blackColor)
                    .assertThatArrowIconIsNotDisplayedForPath(this.pathA)
                    .assertThatArrowIconIsNotDisplayedForPath(this.pathC)
                .endAssertion()
                .changePath()
                .selectPathForAspirationalSubmenuForExistingAspirationalRole(this.noPath)
                .check(RoleDetailsAssertions)
                    .assertThatBackgroundColorForARoleIsEqualTo(this.nopolitan6, this.blackColor)
                    .assertThatArrowIconIsNotDisplayedForPath(this.pathA)
                    .assertThatArrowIconIsNotDisplayedForPath(this.pathB)
                    .assertThatArrowIconIsNotDisplayedForPath(this.pathC)
                .endAssertion()
                .changePath()
                .selectPathForAspirationalSubmenuForExistingAspirationalRole(this.pathC)
                .check(RoleDetailsAssertions)
                    .assertThatArrowIconIsDisplayedForPath(this.pathC)
                    .assertThatBackgroundColorForARoleIsEqualTo(this.nopolitan6, this.blackColor)
                    .assertThatArrowIconIsNotDisplayedForPath(this.pathA)
                    .assertThatArrowIconIsNotDisplayedForPath(this.pathB)
                .endAssertion()
                .removeRoleAsAspirational()
                .check(RoleDetailsAssertions)
                    .assertThatBackgroundColorForARoleIsEqualTo(this.nopolitan6, this.whiteColor)
                    .assertThatArrowIconIsNotDisplayedForPath(this.pathA)
                    .assertThatArrowIconIsNotDisplayedForPath(this.pathB)
                    .assertThatArrowIconIsNotDisplayedForPath(this.pathC);
    }

    public afterTests(): void {

      this.deleteUser(this.user);

    }
}
