import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { assertTrue } from "common/testing/runtime";
import { ProjectDiscoveryPage } from "pages/careergrowth/project/ProjectDiscoveryPage";

export class ProjectDiscoveryAssertions extends BaseAssertion<ProjectDiscoveryPage> {

    public assertProjectsDiscoveryPageLoads(): ProjectDiscoveryAssertions {
        this.assertThat(this.page.allProjectsHeader).isVisible(this.isVisibleOptions);
        this.assertThat(this.page.filtersButton).isVisible(this.isVisibleOptions);
        this.assertThat(this.page.sortByDropDown().first()).isVisible(this.isVisibleOptions);
        this.assertThat(this.page.searchInputField).isVisible(this.isVisibleOptions);
        this.assertThat(this.page.createAProjectButton).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertProjectsDiscoveryPageLoadsWithoutSuggest(): ProjectDiscoveryAssertions {
        this.assertThat(this.page.allProjectsHeader).isVisible(this.isVisibleOptions);
        this.assertThat(this.page.filtersButton).isVisible(this.isVisibleOptions);
        this.assertThat(this.page.sortByDropDown().first()).isVisible(this.isVisibleOptions);
        this.assertThat(this.page.searchInputField).isVisible(this.isVisibleOptions);
        this.assertThat(this.page.createAProjectButton).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertProjectsDiscoveryPageLoadsFromLandingPage(): ProjectDiscoveryAssertions {
        this.assertThat(this.page.filtersButton).isVisible(this.isVisibleOptions);
        this.assertThat(this.page.sortByDropDown().first()).isVisible(this.isVisibleOptions);
        this.assertThat(this.page.searchInputField).isVisible(this.isVisibleOptions);
        this.assertThat(this.page.createAProjectButton).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertFilterPageLoads(): ProjectDiscoveryAssertions {
        this.assertThat(this.page.allFiltersHeader).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertProjectIsDisplayedInSearchResults(projectTitle: string): ProjectDiscoveryAssertions {
        this.assertThat(this.page.projectCardTitle(projectTitle)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertProjectOrgNameIsDisplayedInProjectCard(projectTitle: string, orgNameValue: string): ProjectDiscoveryAssertions {
        this.assertThat(this.page.projectCardOrgValue(projectTitle, orgNameValue)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertAllProjectsHeaderDisplays(): ProjectDiscoveryAssertions {
        this.assertThat(this.page.allProjectsHeader).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertCreateAProjectButtonIsNotDisplayed(): ProjectDiscoveryAssertions {
        this.assertThat(this.page.createAProjectButton).not().isVisible(this.isNotVisibleOptions);
        return this;
    }

    public assertOrgHeaderAndDepartmentFilterIsDisplayed(): ProjectDiscoveryAssertions {
        this.assertThat(this.page.orgFilterDepartmentSubFilter).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatUrlContainsProperText(urlText: string): ProjectDiscoveryAssertions {
        this.assertTrue(this.page.getPage().url().contains(urlText), "Expected url: '" + urlText + "' but was: '" + this.page.getPage().url() + "'");
        return this;
    }

    public assertThatLocationIsVisibleOnProjectCard(): ProjectDiscoveryAssertions {
        this.assertThat(this.page.projectCardLocation).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatLocationIsNotVisibleOnProjectCard(): ProjectDiscoveryAssertions {
        this.assertThat(this.page.projectCardLocation).isHidden();
        return this;
    }

    public assertThatLocationIsVisibleOnProjectFilter(): ProjectDiscoveryAssertions {
        this.assertThat(this.page.projectFilterLocation).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatLocationIsNotVisibleOnProjectFilter(): ProjectDiscoveryAssertions {
        this.assertThat(this.page.projectFilterLocation).isHidden();
        return this;
    }
}
