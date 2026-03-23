import { BaseAssertion } from "common/BaseAssertion";
import { AllFiltersModalPage } from "pages/careergrowth/jobs/AllFiltersModalPage";

export class AllFiltersModalAssertions extends BaseAssertion<AllFiltersModalPage> {

    public assertThatFilterTitleIsDisplayed(filter: string): AllFiltersModalAssertions {
        this.assertThat(this.page.filterTitle(filter)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatFilterOptionIsDisplayed(filter: string, option: string, index: string): AllFiltersModalAssertions;
    public assertThatFilterOptionIsDisplayed(filter: string, option: string): AllFiltersModalAssertions;
    public assertThatFilterOptionIsDisplayed(filter: string, option: string, index?: string): AllFiltersModalAssertions {
        if (index != null) {
            this.assertThat(this.page.filterOption(filter, index)).containsText(option, this.containsTextOptions);
            return this;
        }

        this.assertThat(this.page.filterOptionWithText(filter, option)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatFilterOptionsIsChecked(filter: string, option: string): AllFiltersModalAssertions {
        this.assertThat(this.page.filterWithSearchValueCheckbox(filter, option)).isChecked();
//        this.page.filterWithSearchValueCheckbox(filter, option).should('be.checked')
        return this;
    }

    public assertThatFilterModalIsOpened(): AllFiltersModalAssertions {
        this.assertThat(this.page.allFiltersModal).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatLocationIsVisibleOnJobVacancyFilter(): AllFiltersModalAssertions {
        this.assertThat(this.page.jobFilterLocation).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatLocationIsNotVisibleOnJobVacancyFilter(): AllFiltersModalAssertions {
        this.assertThat(this.page.jobFilterLocation).isHidden();
        return this;
    }

    public assertThatLocationIsVisibleOnJobCardFilter(): AllFiltersModalAssertions {
        this.assertThat(this.page.jobFilterLocation).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatLocationIsNotVisibleOnJobCardFilter(): AllFiltersModalAssertions {
        this.assertThat(this.page.jobFilterLocation).isHidden();
        return this;
    }
}
