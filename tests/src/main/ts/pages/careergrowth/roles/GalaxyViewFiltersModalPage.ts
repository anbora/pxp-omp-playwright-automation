import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, LoadState, Locator } from "common/testing/playwright";
import { CareerPathPage_New } from "pages/careergrowth/careergrowth/CareerPathPage_New";

export class GalaxyViewFiltersModalPage extends BasePage {
  static pageModel = { pageName: "All Filters for Galaxy View modal", url: "/career/career-path" };

    public readonly selectButton: Locator = getByLabel("Show selected").build();
    public readonly recommendedOption: Locator = this.page.locator("//option[@value='recommended']");
    public readonly customOption: Locator = this.page.locator("//option[@value='custom']");
    public jobFamilyCheckbox(jobFamily: string): Locator {
      return this.getLocatorWithParam("//input[@type='checkbox'][contains(@aria-label,'%s')]", jobFamily);
    }
    public jobFamilyText(jobFamily: string): Locator {
      return this.getLocatorWithParam("//input[contains(@aria-label, '%s')]/following-sibling::span", jobFamily);
    }
    public selectedFamiliesLabel(number: string): Locator {
      return this.getLocatorWithParam("//div/div[text()='%s']", number);
    }
    public readonly alert: Locator = this.page.locator("//div[@class='tm__careerpathing-filters--alert']");
    public readonly applyButton: Locator = this.page.locator("//button[text()='Apply']");
    public readonly cancelButton: Locator = this.page.locator("//button[text()='Cancel']");
    public readonly closeButton: Locator = this.page.locator("//button[@class='ed-dialog-modal-header-close-button']");

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public selectRecommendedOption(): GalaxyViewFiltersModalPage {
        selectButton.selectOption("recommended");
        return this;
    }

    public selectCustomOption(): GalaxyViewFiltersModalPage {
        selectButton.click();
        return this;
    }

    public selectJobFamilyCheckbox(jobFamily: string): GalaxyViewFiltersModalPage {
        this.jobFamilyCheckbox(jobFamily).click();
        this.page.waitForLoadState(LoadState.DOMCONTENTLOADED);
        return this;
    }

    public applyFilters(): CareerPathPage_New {
        applyButton.click();
        this.pause(10000);
        this.page.waitForLoadState(LoadState.DOMCONTENTLOADED);
        return this.getPageClassInstance(CareerPathPage_New);
    }

    public closeModal(): CareerPathPage_New {
        closeButton.click();
        this.page.waitForLoadState(LoadState.DOMCONTENTLOADED);
        return this.getPageClassInstance(CareerPathPage_New);
    }

    public refreshPage(): GalaxyViewFiltersModalPage {
        this.page.reload();
        return this;
    }
}
