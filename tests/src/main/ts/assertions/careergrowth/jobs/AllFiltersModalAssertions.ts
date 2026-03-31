// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { AllFiltersModalPage } from "pages/careergrowth/jobs/AllFiltersModalPage";
import { expect } from "common/testing/playwright";

export class AllFiltersModalAssertions extends BaseAssertion<AllFiltersModalPage> {

    public assertThatFilterTitleIsDisplayed(filter: string): AllFiltersModalAssertions {
        expect(this.page.filterTitle(filter)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatFilterOptionIsDisplayed(filter: string, option: string, index: string): AllFiltersModalAssertions;
    public assertThatFilterOptionIsDisplayed(filter: string, option: string): AllFiltersModalAssertions;
    public assertThatFilterOptionIsDisplayed(filter: string, option: string, index?: string): AllFiltersModalAssertions {
        if (index != null) {
            expect(this.page.filterOption(filter, index)).toContainText(option, this.containsTextOptions);
            return this;
        }

        expect(this.page.filterOptionWithText(filter, option)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatFilterOptionsIsChecked(filter: string, option: string): AllFiltersModalAssertions {
        expect(this.page.filterWithSearchValueCheckbox(filter, option)).toBeChecked();
//        this.page.filterWithSearchValueCheckbox(filter, option).should('be.checked')
        return this;
    }

    public assertThatFilterModalIsOpened(): AllFiltersModalAssertions {
        expect(this.page.allFiltersModal).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatLocationIsVisibleOnJobVacancyFilter(): AllFiltersModalAssertions {
        expect(this.page.jobFilterLocation).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatLocationIsNotVisibleOnJobVacancyFilter(): AllFiltersModalAssertions {
        expect(this.page.jobFilterLocation).toBeHidden();
        return this;
    }

    public assertThatLocationIsVisibleOnJobCardFilter(): AllFiltersModalAssertions {
        expect(this.page.jobFilterLocation).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatLocationIsNotVisibleOnJobCardFilter(): AllFiltersModalAssertions {
        expect(this.page.jobFilterLocation).toBeHidden();
        return this;
    }
}
