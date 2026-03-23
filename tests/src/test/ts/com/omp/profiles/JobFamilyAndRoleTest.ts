import { WelcomePageAssertions } from "assertions/careergrowth/careergrowth/WelcomePageAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";

export class JobFamilyAndRoleTest extends BaseRestTest {

    private static readonly FULL_ROLE_NAME: string = "Unusual job family -  Java developer";
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser();

    }

    public shouldChangeRoleInEditProfilePage(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .goToCareerGrowthPage()
                .check(WelcomePageAssertions)
                    .assertThatCurrentRoleNameIsNotVisible()
                    .assertThatUpdateCareerProfileLinkIsNotVisible()
                .endAssertion()
                .run(new AddRoleAndFamilyToNewUserScenario(this.user.name))
                .goToCareerGrowthPage()
                .check(WelcomePageAssertions)
                    .assertThatCurrentRoleNameIsEqualTo(JobFamilyAndRoleTest.FULL_ROLE_NAME)
                    .assertThatUpdateCareerProfileLinkIsVisible();
    }

    public afterTests(): void {

      this.deleteUser(this.user);

    }
}
