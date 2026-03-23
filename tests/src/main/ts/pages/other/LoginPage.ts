import { BasePage } from "common/BasePage";
import { BaseTest } from "common/BaseTest";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { AriaRole, Browser, Locator } from "common/testing/playwright";
import { LandingPage } from "pages/landing/LandingPage";
import { OnboardingPage } from "pages/other/OnboardingPage";

export class LoginPage extends BasePage {
  static pageModel = { pageName: "Login Page", url: "/user/login" };

    private static readonly LOGIN_FORM: string = ".login-right-section";
    private emailInput(): Locator {
      return this.aiLocator(LOGIN_FORM, "#email");
    }
    private passwordInput(): Locator {
      return this.aiLocator(LOGIN_FORM, "#password");
    }
    private loginButton(): Locator {
      return this.aiLocator(LOGIN_FORM, "//button[text() = 'Login']");
    }
    private readonly loginUsingCredentialButton: Locator = this.page.locator("//button[text() = 'Login using your credentials']");
    private readonly userTermsCheckBox: Locator = this.page.locator("form input[type = 'checkbox']");

    constructor(browser: Browser, page: PageHandler, portalIndex: number) {

      super(browser, page, BaseTest.getPortalConfig(portalIndex).getUrl() + "/user/login", Logger.getLogger(LoginPage), portalIndex);

    }

    constructor(browser: Browser, page: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, page, BaseTest.getPortalConfig(portalIndex).getUrl() + "/user/login", logger, portalIndex);

    }

    public clickLoginWithCredentialButton(): LoginPage {
        if (BaseTest.getPortalConfig(this.portalIndex).getLoginSettings().loginUsingCredentialButton) {
            loginUsingCredentialButton.click();
        }
        return this;
    }

    public clickUserTermsCheckBox(): LoginPage {
        if (BaseTest.getPortalConfig(this.portalIndex).getLoginSettings().userTermsCheckBox) {
            userTermsCheckBox.click();
        }
        return this;
    }

    public fillInLoginInput(login: string): LoginPage {
        this.page.waitForLoadState();
//        emailInput().clear();
        this.emailInput().fill(login);
        this.page.waitForLoadState();
        this.logger.info("Email input filled: '" + login + "'");
        return this;
    }

    public fillInPasswordInput(password: string): LoginPage {
        this.page.waitForLoadState();
//        passwordInput().clear();
        this.passwordInput().fill(password);
        this.page.waitForLoadState();
        this.logger.info("Password input filled: '" + password + "'");
        return this;
    }

    public clickLoginButton(): LandingPage {
        this.page.waitForLoadState();
        this.loginButton().click();
        this.page.waitForLoadState();
        this.logger.info("Login button clicked");
        return this.getPageClassInstance(LandingPage);
    }

    public clickLoginButtonAndGoToOnboarding(): OnboardingPage {
        this.page.waitForLoadState();
      if(System.getProperty("config").equalsIgnoreCase("uswest"): System.getProperty("config") != null &&):  {
            this.page.locator("#tandc").click();
        }
//        pause(4000);
        loginButton().click();
        this.logger.info("Login button clicked and moved to onboarding this.page.");
        this.page.waitForLoadState();
        return this.getPageClassInstance(OnboardingPage);
    }
}
