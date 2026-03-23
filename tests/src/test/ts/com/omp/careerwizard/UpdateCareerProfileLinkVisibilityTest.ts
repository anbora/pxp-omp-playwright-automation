import { WelcomePageAssertions } from "assertions/careergrowth/careergrowth/WelcomePageAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";

export class UpdateCareerProfileLinkVisibilityTest extends BaseRestTest {

    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser();

    }

    public verifyCareerProfileLinkIsVisible(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .run(new AddRoleAndFamilyToNewUserScenario(this.user.name))
                .goToCareerGrowthPage()
                .check(WelcomePageAssertions)
                    .assertThatUpdateCareerProfileLinkIsVisible();
    }

    public afterTests(): void {

      this.deleteUser(this.user);

    }
}
