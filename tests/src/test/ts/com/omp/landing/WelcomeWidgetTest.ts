import { LandingPageAssertions } from "assertions/landing/LandingPageAssertions";
import { MePageAssertions } from "assertions/me/MePageAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LandingPage } from "pages/landing/LandingPage";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";

//@Group(GroupNameEnum.OMP_REGRESSION) will be fixed soon as part of july release feature
//@FunctionalArea(FunctionalAreaEnum.LANDING)
export class WelcomeWidgetTest extends BaseRestTest {

    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser();

    }

    public welcomeWidget(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .run(new AddRoleAndFamilyToNewUserScenario(this.user.name))
                .goDirectlyTo(LandingPage)
                .check(LandingPageAssertions)
                    .assertThatWelcomeStringAndSubTextInWelcomeWidgetIsVisible()
                .endAssertion();
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
