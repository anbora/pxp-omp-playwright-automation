import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { AriaRole, Browser, LoadState, Locator, WaitForSelectorState } from "common/testing/playwright";
import { RolesListPage_New } from "pages/careergrowth/careergrowth/RolesListPage_New";
import { VacanciesListPage_New } from "pages/careergrowth/careergrowth/VacanciesListPage_New";

export class AllFiltersModalPage extends BasePage {

    private static readonly FILTER_XPATH: string = "//fieldset[legend/div[contains(text(), '%s')] or legend[contains(text(), '%s')]]";
    public filterTitle(filterTitle: string): Locator {
      return this.getLocatorWithParam(AllFiltersModalPage.FILTER_XPATH, filterTitle, filterTitle);
    }
    public filterOption(filterTitle: string, index: string): Locator {
      return this.getLocatorWithParam(AllFiltersModalPage.FILTER_XPATH + "/descendant::input[%s]/following-sibling::span/span", filterTitle, filterTitle, index);
    }
    public filterOptionWithText(filterTitle: string, text: string): Locator {
      return this.getLocatorWithParam(AllFiltersModalPage.FILTER_XPATH + "/descendant::span[contains(text(), '%s')]", filterTitle, filterTitle, text);
    }
    public filterValueCheckbox(filterTitle: string, filterValue: string): Locator {
      return this.getLocatorWithParam(AllFiltersModalPage.FILTER_XPATH + "/descendant::label[(descendant::span[contains(text(), '%s')])]/input", filterTitle, filterTitle, filterValue);
    }
    public filterWithSearchValueCheckbox(filterTitle: string, filterValue: string): Locator {
      return this.getLocatorWithParam(AllFiltersModalPage.FILTER_XPATH + "/descendant::span[contains(text(), '%s')]", filterTitle, filterTitle, filterValue);
    }
    public searchInput(filterTitle: string): Locator {
      return this.getLocatorWithParam(AllFiltersModalPage.FILTER_XPATH + "/descendant::input[@type = 'text']", filterTitle, filterTitle);
    }
    public multiselectOption(filterValue: string): Locator {
      return this.getLocatorWithParam("//div[contains(@class,'ed-multi-select__option')][text() = '%s']", filterValue);
    }
    public showMoreButton(filterTitle: string): Locator {
      return this.getLocatorWithParam(AllFiltersModalPage.FILTER_XPATH + "/button[text() = 'Show More']", filterTitle, filterTitle);
    }
    public applyButton: Locator = this.page.locator("//button[text()='Apply']");
    public closeButton: Locator = this.page.locator("//button[@class='ed-dialog-modal-header-close-button']");
    public locationInput: Locator = this.page.locator("//div[@class='input-group']/input");
    public locationCheckbox: Locator = this.page.locator("//div[@class='ed-input-container ed-search']/following-sibling::ul/li/label[@class='checkbox ']");
    public locationV2Input(location: string): Locator {
      return this.getLocatorWithParam("//span[text() = '%s']/parent::span/parent::label/child::input", location);
    }
    public geoLocationInput: Locator = this.page.locator("//div[@class='geolocation-select-search']/descendant::input");
    public allFiltersModal: Locator = this.page.locator("//h1[text()='All Filters']");
    public setDistance: Locator = this.page.locator("//input[@id='set-distance']");
    public readonly jobFilterLocation: Locator = this.getByLabel("Locations").build();
    public filtersCancelButton: Locator = this.getByRole(AriaRole.BUTTON, "Cancel").build();

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public searchForFilterValue(filterTitle: string, filterValue: string): AllFiltersModalPage {
        this.searchInput(filterTitle).click();
        this.searchInput(filterTitle).fill(filterValue);
        this.multiselectOption(filterValue).first().click();
        return this;
    }

    public searchForLocation(location: string): AllFiltersModalPage {
        this.locationInput.click();
        this.locationInput.clear();
        this.locationInput.fill(location);
        this.locationCheckbox.click();
        return this;
    }

    public searchForLocationV2WithWait(filterValue: string, timeToWait: number): AllFiltersModalPage {
        this.searchInput("Location").first().click();
        this.searchInput("Location").first().clear();
        this.pause(timeToWait);
        this.searchInput("Location").first().pressSequentially(filterValue);
        this.locationV2Input(filterValue).first().click();
        return this;
    }

    public searchForFilterWithCheckbox(filterTitle: string, filterValue: string, timeToWait: number): AllFiltersModalPage {
        this.searchInput(filterTitle).first().click();
        this.searchInput(filterTitle).first().clear();
        this.pause(timeToWait);
        this.searchInput(filterTitle).first().pressSequentially(filterValue);
        this.locationV2Input(filterValue).first().click();
        return this;
    }

    public searchForFilterValueWithWait(filterTitle: string, filterValue: string, timeToWait: number): AllFiltersModalPage {
        this.searchInput(filterTitle).click();
        this.searchInput(filterTitle).clear();
        this.pause(timeToWait);
        this.searchInput(filterTitle).pressSequentially(filterValue);
        this.multiselectOption(filterValue).first().click();
        return this;
    }

	public selectFilterValue(filterTitle: string, filterValue: string): AllFiltersModalPage {
        this.filterValueCheckbox(filterTitle, filterValue).first().click();
        return this;
    }

	public selectFilterValueWithSearch(filterTitle: string, filterValue: string): BasePage {
        this.filterWithSearchValueCheckbox(filterTitle, filterValue).waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        if (!this.filterWithSearchValueCheckbox(filterTitle, filterValue).isChecked()) {
            this.filterWithSearchValueCheckbox(filterTitle, filterValue).click();
        }
        return this;
    }

    public showMore(filterTitle: string): AllFiltersModalPage {
        this.showMoreButton(filterTitle).click();
        return this;
    }

	public applyFilters(): VacanciesListPage_New {
        this.applyButton.click();
        this.pause(7000);
        return this.getPageClassInstance(VacanciesListPage_New);
    }

    public applyFiltersAndBackToRoleList(): RolesListPage_New {
        this.applyButton.click();
        this.pause(7000);
        return this.getPageClassInstance(RolesListPage_New);
    }

	public closeModal(): VacanciesListPage_New {
        this.closeButton.click();
        return this.getPageClassInstance(VacanciesListPage_New);
    }

    public searchForGeoLocation(location: string, timeToWait: number): AllFiltersModalPage {
        this.geoLocationInput.click();
        this.geoLocationInput.clear();
        this.geoLocationInput.fill(location);
        this.pause(timeToWait);
        this.page.keyboard().press("Enter");
        return this;
    }

    public changeDistane(distance: string, timeToWait: number): AllFiltersModalPage {
        this.setDistance.click();
        this.setDistance.clear();
        this.setDistance.fill(distance);
        this.pause(timeToWait);
        return this;
    }

    public closeFiltersModal(): AllFiltersModalPage {
        this.page.waitForLoadState(LoadState.DOMCONTENTLOADED);
        this.filtersCancelButton.click();
        return this;
    }
}
