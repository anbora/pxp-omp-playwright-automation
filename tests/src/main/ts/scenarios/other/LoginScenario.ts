import { LandingPageAssertions } from "assertions/landing/LandingPageAssertions";
import { BaseScenario } from "common/BaseScenario";
import { UserModel } from "models/user/UserModel";
import { LandingPage } from "pages/landing/LandingPage";
import { LoginPage } from "pages/other/LoginPage";

export class LoginScenario implements BaseScenario<LoginPage, LandingPage>{

    private user: UserModel;

    public run(entry: LoginPage): LandingPage {
        return entry
                .fillInLoginInput(user.email)
                .fillInPasswordInput(user.password)
                .clickLoginButton()
                .check(LandingPageAssertions)
                    .assertThatHomePageIsLoaded(user)
                .endAssertion();
    }
}
