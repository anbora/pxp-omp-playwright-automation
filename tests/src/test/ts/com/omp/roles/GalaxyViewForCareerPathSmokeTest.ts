import { CareerPathAssertions } from "assertions/careergrowth/roles/CareerPathAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";
import { AddSkillToNewUserScenario_SkillLevel } from "scenarios/profile/AddSkillToNewUserScenario_SkillLevel";

export class GalaxyViewForCareerPathSmokeTest extends BaseRestTest {

    private one: number = 1;
    private startingRole: string = "Current role for Smoke Test";
    private endRole: string = "End role for Smoke Test";
    private startingRoleFullName: string = "First Job Family -  Current role for Smoke Test";
    private exploreTip: string = "Can't find the right Job Role in the chart?";
    private firstJobFamily: string = "First Job Family";
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public shouldCheckSimpleGalaxyView(): void {
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
                .check(CareerPathAssertions)
                    .assertThatJobFamilySectionLineHasTitleEqualTo(this.firstJobFamily)
                    .assertThatCurrentRoleIsEqualTo(this.startingRole)
//                    .assertThatTheNumberOfRolePillsIsEqualTo(one)
                    .assertThatRoleNamePillIsDisplayed(this.endRole)
                    .assertThatShowPanelIsNotDisplayed()
                    .assertThatExploreJobRolesTipIsDisplayed(this.exploreTip)
                .endAssertion()
                .clickRolePill(this.endRole)
                .check(CareerPathAssertions)
                    .assertThatJobRoleNameOnCardDetailsIsEqualTo(this.endRole);
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
