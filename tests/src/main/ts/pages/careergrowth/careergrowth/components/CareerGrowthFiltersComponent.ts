import { BasePage } from "common/BasePage";
import { AriaRole, Locator, WaitForSelectorState } from "common/testing/playwright";
import { BaseInterface } from "pages/careergrowth/careergrowth/components/BaseInterface";
import { AllFiltersModalPage } from "pages/careergrowth/jobs/AllFiltersModalPage";

export interface CareerGrowthFiltersComponent<T extends BasePage> extends BaseInterface<T> {
    T getP();

    searchInputElement(): default Locator {

      return getP().getByPlaceholder("Search here...", true).build();

    }
    searchButtonElement(): default Locator {
      return getP().getByRole(AriaRole.BUTTON, "Search").build().last();
    }
    sortByDropDown(): default Locator {
      return getP().getByText("Sort By").locator("//..").getByRole(AriaRole.COMBOBOX).build();
    }
    filtersButton(): default Locator {
      return getP().getByRole(AriaRole.BUTTON, "Filters").build();
    }
    removeSearchKeywordButton(): default Locator {
      return getP().locator(".icon-cross-circle").build();
    }
    searchHerePlaceholder(): default Locator {
      return getP().locator("//input[@placeholder='Search here...']").build();
    }
    sortingListOptions(): default Locator {
      return getP().locator(".ed-select").build();
    }
    removeFilterButton(filterValue: string): default Locator {
      return getP().locator("//i[@class='icon-x-mark-Close']/parent::button[contains(@aria-label,'" + filterValue + "')]").build();
    }
    removeAllFiltersButton(): default Locator {
      return getP().locator("button.tm-filterbar__button--remove").build();
    }
    closeFiltersButton(): default Locator {
      return getP().getByRole(AriaRole.BUTTON, "Cancel").build().first();
    }

    typeSearchValue(value: string): default T {
        this.searchInputElement().clear();
        this.searchInputElement().fill(value);
        this.searchButtonElement().click();
        return this.getP();
    }

    typeSearchValueWithWaitForElement(value: string, firstElementOnTheListBeforeWait: Locator, elementToWaitFor: Locator): default T {
        this.getP().repeatUntilElementToBeVisible(() => {
            firstElementOnTheListBeforeWait.first().waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE).setTimeout(30000));
            this.searchInputElement().clear();
            this.getP().pause(1000);
            this.searchInputElement().fill(value);
            this.searchButtonElement().click();
            this.getP().pause(3000);
        }, elementToWaitFor, 24, 10000, () => {
            this.searchInputElement().clear();
            this.searchButtonElement().click();
        });
        return this.getP();
    }

    closeFilters(): default T {
        this.closeFiltersButton().click();
        return this.getP();
    }

    clickInFiltersButton(): default AllFiltersModalPage {
        this.filtersButton().click();
        return this.getP().getPageClassInstance(AllFiltersModalPage);
    }

    clickSortByButton(): default T {
        this.refreshPage();
        this.pause(2000);
        this.sortByDropDown().click();
        return this.getP();
    }

    sortListBy(sortingName: string): default T {

      return getP();

    }

    sortListBy(sortingName: string, firstElementOnTheList: Locator): default T {
        firstElementOnTheList.first().waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        this.sortingListOptions().selectOption(sortingName);
        this.getP().pause(2000);
        return this.getP();
    }

    clearSearchKeywordCriteria(): default T {
        this.removeSearchKeywordButton().click();
//        cy.wait(5000)
        return this.getP();
    }

    removeAllFilter(): default T {
        this.removeAllFiltersButton().click();
        return this.getP();
    }

    openFiltersModal(clazz: Class<G>): default <G extends BasePage> G {
        this.filtersButton().click();
        this.pause(2000);
        return this.getP().getPageClassInstance(clazz);
    }

    removeFilter(filterValue: string): default T {
        this.removeFilterButton(filterValue).click();
        return this.getP();
    }
}
