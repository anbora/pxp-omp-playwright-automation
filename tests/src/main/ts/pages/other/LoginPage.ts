// @ts-nocheck
import { BasePage } from "common/BasePage";
import { BaseTest } from "common/BaseTest";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";
import { UserModel } from "models/user/UserModel";
import { LandingPage } from "pages/landing/LandingPage";
import { OnboardingPage } from "pages/other/OnboardingPage";

export class LoginPage extends BasePage {
  static pageModel = { pageName: "Login Page", url: "/user/login" };

  private static readonly LOGIN_FORM = ".login-right-section";

  private readonly loginUsingCredentialButton = this.page.getByRole("button", {
    name: "Login using your credentials"
  });
  private readonly userTermsCheckBox = this.page.locator("form input[type='checkbox']");

  constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {
    super(
      browser,
      pageHandler,
      `${BaseTest.getPortalConfig(portalIndex).getUrl()}/user/login`,
      logger,
      portalIndex
    );
  }

  private emailInput(): Locator {
    return this.page.locator(LoginPage.LOGIN_FORM).locator("#email");
  }

  private passwordInput(): Locator {
    return this.page.locator(LoginPage.LOGIN_FORM).locator("#password");
  }

  private loginButton(): Locator {
    return this.page.locator(LoginPage.LOGIN_FORM).getByRole("button", { name: "Login" });
  }

  public clickLoginWithCredentialButton(): LoginPage {
    if (BaseTest.getPortalConfig(this.portalIndex).getLoginSettings().loginUsingCredentialButton) {
      this.loginUsingCredentialButton.click();
    }

    return this;
  }

  public clickUserTermsCheckBox(): LoginPage {
    if (BaseTest.getPortalConfig(this.portalIndex).getLoginSettings().userTermsCheckBox) {
      this.userTermsCheckBox.click();
    }

    return this;
  }

  public fillInLoginInput(login: string): LoginPage {
    this.page.waitForLoadState?.();
    this.emailInput().fill(login);
    this.page.waitForLoadState?.();
    this.logger.info("Email input filled: '" + login + "'");
    return this;
  }

  public fillInPasswordInput(password: string): LoginPage {
    this.page.waitForLoadState?.();
    this.passwordInput().fill(password);
    this.page.waitForLoadState?.();
    this.logger.info("Password input filled");
    return this;
  }

  public clickLoginButton(): LandingPage {
    this.page.waitForLoadState?.();
    this.loginButton().click();
    this.page.waitForLoadState?.();
    this.logger.info("Login button clicked");
    return this.getPageClassInstance(LandingPage);
  }

  public clickLoginButtonAndGoToOnboarding(): OnboardingPage {
    this.page.waitForLoadState?.();

    if (System.getProperty("config", "").equalsIgnoreCase("uswest")) {
      this.page.locator("#tandc").click();
    }

    this.loginButton().click();
    this.page.waitForLoadState?.();
    this.logger.info("Login button clicked and onboarding flow started");
    return this.getPageClassInstance(OnboardingPage);
  }

  public login(user: UserModel): LandingPage {
    return this.fillInLoginInput(user.email)
      .fillInPasswordInput(user.password)
      .clickLoginButton();
  }

  public loginWithOnboarding(user: UserModel): LandingPage {
    return this.clickLoginWithCredentialButton()
      .fillInLoginInput(user.email)
      .fillInPasswordInput(user.password)
      .clickUserTermsCheckBox()
      .clickLoginButtonAndGoToOnboarding()
      .completeDefaultOnboarding();
  }
}
