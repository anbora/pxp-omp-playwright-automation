import { RoleListAssertions } from "assertions/careergrowth/careergrowth/RoleListAssertions";
import { CareerPathAssertions } from "assertions/careergrowth/roles/CareerPathAssertions";
import { RoleDetailsAssertions } from "assertions/careergrowth/roles/RoleDetailsAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";
import { AddSkillToNewUserScenario_SkillLevel } from "scenarios/profile/AddSkillToNewUserScenario_SkillLevel";

export class GalaxyViewNavigationTest extends BaseRestTest {

    private zero: string = "0";
    private first: string = "1";
    private second: string = "2";
    private third: string = "3";
    private fourth: string = "4";
    private r0: string = "152";
    private r1: string = "262";
    private r2: string = "372";
    private r3: string = "482";
    private r4: string = "592";
    private r0ZoomedOut: string = "136";
    private r1ZoomedOut: string = "234";
    private r2ZoomedOut: string = "332";
    private r3ZoomedOut: string = "430";
    private r4ZoomedOut: string = "528";
    private r0ZoomedIn: string = "168";
    private r1ZoomedIn: string = "290";
    private r2ZoomedIn: string = "412";
    private r3ZoomedIn: string = "534";
    private r4ZoomedIn: string = "656";
    private xDimension0: string = "355.5";
    private yDimension0: string = "577";
    private xDimensionZoomedIn1: string = "339.5";
    private xDimensionZoomedOut1: string = "371.5";
    private startingRole: string = "Current role for Smoke Test";
    private endRole: string = "End role for Smoke Test";
    private startingRoleFullName: string = "First Job Family -  Current role for Smoke Test";
    private startingPoint: string = "0 0 1200 1200";
    private leftPoint: string = "-16 0 1200 1200";
    private rightPoint: string = "16 0 1200 1200";
    private upPoint: string = "0 -16 1200 1200";
    private downPoint: string = "0 16 1200 1200";
    private leftUpPoint: string = "-16 -16 1200 1200";
    private leftDownPoint: string = "-16 16 1200 1200";
    private rightUpPoint: string = "16 -16 1200 1200";
    private rightDownPoint: string = "16 16 1200 1200";
    private left3Down2Point: string = "-48 32 1200 1200";
    public selectStartingJobRole: string = "Football player trainee";
    public nextRoleFirstValue: string = "Football player junior";
    public nextRoleSecondValue: string = "Football player star";
    public roleLevelValue: string = "LevelAssociate";
    public roleAreaValue: string = "Unusual job family";
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public shouldCheckGalaxyViewRedirection(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .goToCareerGrowthPage()
                .goToMePageProfile()
                .editProfile()
                .clickEditProfileButton()
                .clickAddJobFamilyAndRoleButton()
                .selectFirstJobRoleFromInput(this.startingRole, this.startingRoleFullName)
                .clickSelectButton()
                .clickSaveButton()
                .goToMePageProfile()
                .goToCareerGrowthPage()
                .run(new AddSkillToNewUserScenario_SkillLevel())
                .goToCareerGrowthPage()
                .goToCareerPathPageViaTab()
                .waitForRolePillOnGalaxyView(this.endRole)
                .clickRolePill(this.endRole)
                .clickRoleCard(this.endRole)
                .check(RoleDetailsAssertions)
                    .assertThatRoleNameEqualTo(this.endRole)
                .endAssertion()
                .clickBackButtonAndReturnToGalaxyView()
                .check(CareerPathAssertions)
                    .assertThatGalaxyViewIsDisplayed()
                .endAssertion()
                .exploreJobRoles()
                .check(RoleListAssertions)
                    .assertThatAllJobRolesHeaderIsDisplayed()
                .endAssertion()
                .goToCareerGrowthPage()
                .goToCareerPathPageViaTab()
                .waitForRolePillOnGalaxyView(this.endRole)
                .selectStartingJobRole(this.selectStartingJobRole)
                .waitForRolePillOnGalaxyView(this.selectStartingJobRole)
                .clickRolePill(this.nextRoleFirstValue)
                .check(CareerPathAssertions)
                    .assertThatRoleNamePillIsDisplayed(this.nextRoleFirstValue)
                .endAssertion()
                .collapseButtonClick()
                .clickRolePill(this.nextRoleSecondValue)
                .check(CareerPathAssertions)
                    .assertThatRoleNamePillIsDisplayed(this.nextRoleSecondValue)
                    .assertThatRoleLevelIsDisplayed(this.roleLevelValue)
                    .assertThatRoleAreaIsDisplayed(this.roleAreaValue)
                    .assertThatRoleSkillsAreDisplayed()
                .endAssertion()
                .clickRoleCard(this.nextRoleSecondValue)
                .clickOnMarkRoleAsAspirationalButton()
                .optionallyAddSkillsCloseModal()
                .clickBackButtonAndReturnToGalaxyView()
                .check(CareerPathAssertions)
                    .assertThatRoleIsMarkedAsAspirational(this.nextRoleSecondValue)
                    .assertThatRoleNamePillIsDisplayed(this.nextRoleFirstValue)
                .endAssertion()
                .currentRoleDropdown()
                .waitForRolePillOnGalaxyView(this.endRole)
                .check(CareerPathAssertions)
                    .assertThatRoleNamePillIsDisplayed(this.endRole)
                .endAssertion();
    }

    public shouldCheckGalaxyViewNavigation(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToCareerGrowthPage()
                .goToCareerPathPageViaTab()
                .clickRolePill(this.endRole)
                .check(CareerPathAssertions)
                    .assertThatShowPanelIsNotDisplayed()
                .endAssertion()
                .collapseJobRoleCardDetails()
                .check(CareerPathAssertions)
                    .assertThatRoleCardsPanelIsCollapsed()
                    .assertThatShowPanelIsDisplayed()
                .endAssertion()
                .expandJobRolesPanel()
                .check(CareerPathAssertions)
                    .assertThatRoleCardIsDisplayed(this.endRole)
                    .assertThatShowPanelIsNotDisplayed()
                    .assertThatGalaxyViewBoxParameterIsEqualTo(this.startingPoint)
                    .assertThatGalaxyViewRingParameterIsEqualTo(this.zero, this.r0)
                    .assertThatGalaxyViewRingParameterIsEqualTo(this.first, this.r1)
                    .assertThatGalaxyViewRingParameterIsEqualTo(this.second, this.r2)
                    .assertThatGalaxyViewRingParameterIsEqualTo(this.third, this.r3)
                    .assertThatGalaxyViewRingParameterIsEqualTo(this.fourth, this.r4)
                    .assertThatRolePillLocationIsEqualTo(this.endRole, this.xDimension0, this.yDimension0)
                .endAssertion()
                .moveLeft()
                .check(CareerPathAssertions)
                    .assertThatGalaxyViewBoxParameterIsEqualTo(this.leftPoint)
                .endAssertion()
                .moveUp()
                .check(CareerPathAssertions)
                    .assertThatGalaxyViewBoxParameterIsEqualTo(this.leftUpPoint)
                .endAssertion()
                .moveRight()
                .check(CareerPathAssertions)
                    .assertThatGalaxyViewBoxParameterIsEqualTo(this.upPoint)
                .endAssertion()
                .moveRight()
                .check(CareerPathAssertions)
                    .assertThatGalaxyViewBoxParameterIsEqualTo(this.rightUpPoint)
                .endAssertion()
                .moveDown()
                .check(CareerPathAssertions)
                    .assertThatGalaxyViewBoxParameterIsEqualTo(this.rightPoint)
                .endAssertion()
                .moveDown()
                .check(CareerPathAssertions)
                    .assertThatGalaxyViewBoxParameterIsEqualTo(this.rightDownPoint)
                .endAssertion()
                .moveLeft()
                .check(CareerPathAssertions)
                    .assertThatGalaxyViewBoxParameterIsEqualTo(this.downPoint)
                .endAssertion()
                .moveLeft()
                .check(CareerPathAssertions)
                    .assertThatGalaxyViewBoxParameterIsEqualTo(this.leftDownPoint)
                .endAssertion()
                .moveLeft()
                .moveLeft()
                .moveDown()
                .check(CareerPathAssertions)
                    .assertThatGalaxyViewBoxParameterIsEqualTo(this.left3Down2Point)
                .endAssertion()
                .zoomOut()
                .check(CareerPathAssertions)
                    .assertThatRolePillLocationIsEqualTo(this.endRole, this.xDimensionZoomedOut1, this.yDimension0)
                    .assertThatGalaxyViewRingParameterIsEqualTo(this.zero, this.r0ZoomedOut)
                    .assertThatGalaxyViewRingParameterIsEqualTo(this.first, this.r1ZoomedOut)
                    .assertThatGalaxyViewRingParameterIsEqualTo(this.second, this.r2ZoomedOut)
                    .assertThatGalaxyViewRingParameterIsEqualTo(this.third, this.r3ZoomedOut)
                    .assertThatGalaxyViewRingParameterIsEqualTo(this.fourth, this.r4ZoomedOut)
                .endAssertion()
                .zoomIn()
                .zoomIn()
                .check(CareerPathAssertions)
                    .assertThatRolePillLocationIsEqualTo(this.endRole, this.xDimensionZoomedIn1, this.yDimension0)
                    .assertThatGalaxyViewRingParameterIsEqualTo(this.zero, this.r0ZoomedIn)
                    .assertThatGalaxyViewRingParameterIsEqualTo(this.first, this.r1ZoomedIn)
                    .assertThatGalaxyViewRingParameterIsEqualTo(this.second, this.r2ZoomedIn)
                    .assertThatGalaxyViewRingParameterIsEqualTo(this.third, this.r3ZoomedIn)
                    .assertThatGalaxyViewRingParameterIsEqualTo(this.fourth, this.r4ZoomedIn);
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
