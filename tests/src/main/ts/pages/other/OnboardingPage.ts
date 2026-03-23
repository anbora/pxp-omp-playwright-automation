import { BasePage } from "common/BasePage";
import { BaseTest } from "common/BaseTest";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { AriaRole, Browser, LoadState, Locator } from "common/testing/playwright";
import { LandingPage } from "pages/landing/LandingPage";

export class OnboardingPage extends BasePage {

    private nextButton: Locator = getByRole(AriaRole.BUTTON, "Next").build();
    private loginError: Locator = this.page.locator("div.error-msg");
    private termsCheckbox: Locator = this.page.locator("#tandCheckbox");
    private familySelect: Locator = this.page.locator("#react-select-2-input");
    private familyOption: Locator = this.page.locator("//div[text() = 'Finance - 1 -  QA Engineer']");
    private skillDropDown: Locator = this.page.locator(".ed-multi-select__input");
    private skillOption: Locator = this.page.locator("//div[text() = 'Java (Programming Language)']");
    private levelSelect: Locator = this.page.locator("#select-level");
    private addSkillButton: Locator = this.page.locator("//button[text() = 'Add']");
    private nextSkillFormButton: Locator = this.page.locator("//button[text() = 'Next']");
    private skipButton: Locator = this.page.locator("//button[text() = 'Skip']");
    private getStartedButton: Locator = this.page.locator("//button[text() = \"Let's Get Started\"]");

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public clickNextButtonAndGoToLandingPage(): LandingPage {
        if (BaseTest.getPortalConfig(this.portalIndex).getLoginSettings().onBoardingSkillsForm) {
            this.pause(1000);
            nextSkillFormButton.click(new Locator.ClickOptions().setForce(true));
            this.pause(500);
            skipButton.click();
            this.pause(500);
            getStartedButton.click();
        }
        return this.getPageClassInstance(LandingPage);
    }

    public clickNextButtonAndGoToInterest(): OnboardingPage {
        this.page.waitForLoadState();
        this.pause(1000);
//        this.page.waitForLoadState(LoadState.DOMCONTENTLOADED);
        this.page.waitForLoadState(LoadState.LOAD);
        this.page.waitForLoadState(LoadState.DOMCONTENTLOADED);
      if(!loginError.isVisible(): ):  {
          if(System.getProperty("config").equalsIgnoreCase("uswest"): System.getProperty("config")!=null &&):  {
                this.page.locator(".ed-input-container input[type='checkbox']").click();
            }
//            this.page.waitForLoadState(LoadState.DOMCONTENTLOADED);
            this.page.waitForLoadState(LoadState.LOAD);
            this.page.waitForLoadState(LoadState.DOMCONTENTLOADED);
          if(!nextButton.isVisible(): ):  {
                this.logger.info("Page refreshed on onboarding this.page.");
//                refreshCurrentPage(OnboardingPage);
            }
            if (BaseTest.getPortalConfig(portalIndex).getLoginSettings().onBoardingTermsCheckBox) {
                termsCheckbox.click();
            }
            nextButton.click(new Locator.ClickOptions().setForce(true));
        } else {
            // reset password
        }
        return this;
    }

    public fillInInterestForm(): OnboardingPage {
        if (BaseTest.getPortalConfig(this.portalIndex).getLoginSettings().onBoardingInterestForm) {
            familySelect.fill("Finance");
            this.pause(500);
            familyOption.click();
        }
        return this;
    }

    public clickNextButtonAndGoToSkills(): OnboardingPage {
        if (BaseTest.getPortalConfig(this.portalIndex).getLoginSettings().onBoardingInterestForm) {
            this.pause(1000);
            nextButton.click(new Locator.ClickOptions().setForce(true));
            this.pause(1000);
        }
        return this;
    }

    public fillInSkillsForm(): OnboardingPage {
        if (BaseTest.getPortalConfig(this.portalIndex).getLoginSettings().onBoardingSkillsForm) {
            skillDropDown.fill("java");
            skillOption.click();
            levelSelect.selectOption("Intermediate");
            this.pause(500);
            addSkillButton.click();
        }
        return this;
    }
}
