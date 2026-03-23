import { RoleDetailsAssertions } from "assertions/careergrowth/roles/RoleDetailsAssertions";
import { LandingPageAssertions } from "assertions/landing/LandingPageAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { ResultContainer } from "models/ResultContainer";
import { UserModel } from "models/user/UserModel";
import { LandingPage } from "pages/landing/LandingPage";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";

export class YourNextCareerMilestoneWidgetTest extends BaseRestTest {

    private aspirationalRoleContainer: ResultContainer = new ResultContainer();
    private noPath: string = "No path selection";
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser();

    }

    public yourNextCareerMilestoneWidgetEmptyTest(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .check(LandingPageAssertions)
                    .assertThatYourNextCareerMilestoneWidgetIsDisplayed()
                    .assertThatYourNextCareerMilestoneWidgetIsEmpty()
                .endAssertion()
                .run(new AddRoleAndFamilyToNewUserScenario(this.user.name))
                .goToCareerGrowthPage()
                .goToRolesPageViaTab()
                .getCardNameInAllBox(this.aspirationalRoleContainer)
                .goToFirstRoleCard()
                .markRoleAspirational_alternate()
                .goDirectlyTo(LandingPage)
                .check(LandingPageAssertions)
                    .assertThatYourNextCareerMilestoneWidgetIsDisplayed()
                    .assertThatAspirationRoleIsDisplayed(this.aspirationalRoleContainer.getValue())
                .endAssertion()
                .clickAspirationalRoleCard(this.aspirationalRoleContainer.getValue())
                .check(RoleDetailsAssertions)
                    .assertThatRoleNameEqualTo(this.aspirationalRoleContainer.getValue())
                .endAssertion();
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
