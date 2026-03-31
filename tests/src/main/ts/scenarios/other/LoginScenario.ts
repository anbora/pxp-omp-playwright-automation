// @ts-nocheck
import { BaseScenario } from "common/BaseScenario";
import { UserModel } from "models/user/UserModel";
import { LandingPage } from "pages/landing/LandingPage";
import { LoginPage } from "pages/other/LoginPage";

export class LoginScenario implements BaseScenario<LoginPage, LandingPage> {
  constructor(private readonly user: UserModel) {}

  public run(entry: LoginPage): LandingPage {
    return entry.login(this.user).assertHomePageLoaded(this.user);
  }
}
