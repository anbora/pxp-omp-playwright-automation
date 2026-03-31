// @ts-nocheck
import { BasePage } from "common/BasePage";
import { BaseTest } from "common/BaseTest";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { AriaRole, Browser, LoadState, Locator } from "common/testing/playwright";
import { LandingPage } from "pages/landing/LandingPage";

export class OnboardingPage extends BasePage {
  private readonly nextButton = this.getByRole(AriaRole.BUTTON, "Next");
  private readonly loginError = this.page.locator("div.error-msg");
  private readonly termsCheckbox = this.page.locator("#tandCheckbox");
  private readonly familySelect = this.page.locator("#react-select-2-input");
  private readonly familyOption = this.page.locator("//div[text()='Finance - 1 -  QA Engineer']");
  private readonly skillDropDown = this.page.locator(".ed-multi-select__input");
  private readonly skillOption = this.page.locator("//div[text()='Java (Programming Language)']");
  private readonly levelSelect = this.page.locator("#select-level");
  private readonly addSkillButton = this.page.locator("//button[text()='Add']");
  private readonly nextSkillFormButton = this.page.locator("//button[text()='Next']");
  private readonly skipButton = this.page.locator("//button[text()='Skip']");
  private readonly getStartedButton = this.page.locator("//button[text()=\"Let's Get Started\"]");

  constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {
    super(browser, pageHandler, logger, portalIndex);
  }

  public clickNextButtonAndGoToLandingPage(): LandingPage {
    if (BaseTest.getPortalConfig(this.portalIndex).getLoginSettings().onBoardingSkillsForm) {
      this.pause(1000);
      this.nextSkillFormButton.click(new Locator.ClickOptions().setForce(true));
      this.pause(500);
      this.skipButton.click();
      this.pause(500);
      this.getStartedButton.click();
    }

    return this.getPageClassInstance(LandingPage);
  }

  public clickNextButtonAndGoToInterest(): OnboardingPage {
    this.page.waitForLoadState?.();
    this.page.waitForLoadState?.(LoadState.LOAD);
    this.page.waitForLoadState?.(LoadState.DOMCONTENTLOADED);

    if (this.isVisible(this.loginError)) {
      this.logger.info("Login error is visible on onboarding page");
      return this;
    }

    if (System.getProperty("config", "").equalsIgnoreCase("uswest")) {
      this.page.locator(".ed-input-container input[type='checkbox']").click();
    }

    if (BaseTest.getPortalConfig(this.portalIndex).getLoginSettings().onBoardingTermsCheckBox) {
      this.termsCheckbox.click();
    }

    this.nextButton.click(new Locator.ClickOptions().setForce(true));
    return this;
  }

  public fillInInterestForm(): OnboardingPage {
    if (BaseTest.getPortalConfig(this.portalIndex).getLoginSettings().onBoardingInterestForm) {
      this.familySelect.fill("Finance");
      this.pause(500);
      this.familyOption.click();
    }

    return this;
  }

  public clickNextButtonAndGoToSkills(): OnboardingPage {
    if (BaseTest.getPortalConfig(this.portalIndex).getLoginSettings().onBoardingInterestForm) {
      this.pause(1000);
      this.nextButton.click(new Locator.ClickOptions().setForce(true));
      this.pause(1000);
    }

    return this;
  }

  public fillInSkillsForm(): OnboardingPage {
    if (BaseTest.getPortalConfig(this.portalIndex).getLoginSettings().onBoardingSkillsForm) {
      this.skillDropDown.fill("java");
      this.skillOption.click();
      this.levelSelect.selectOption("Intermediate");
      this.pause(500);
      this.addSkillButton.click();
    }

    return this;
  }

  public completeDefaultOnboarding(): LandingPage {
    return this.clickNextButtonAndGoToInterest()
      .fillInInterestForm()
      .clickNextButtonAndGoToSkills()
      .fillInSkillsForm()
      .clickNextButtonAndGoToLandingPage();
  }
}
