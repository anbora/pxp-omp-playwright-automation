// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { assertTrue } from "common/testing/runtime";
import { ProjectDiscoveryPage } from "pages/careergrowth/project/ProjectDiscoveryPage";
import { expect } from "common/testing/playwright";

export class ProjectDiscoveryAssertions extends BaseAssertion<ProjectDiscoveryPage> {

    public assertProjectsDiscoveryPageLoads(): ProjectDiscoveryAssertions {
        expect(this.page.allProjectsHeader).toBeVisible(this.isVisibleOptions);
        expect(this.page.filtersButton).toBeVisible(this.isVisibleOptions);
        expect(this.page.sortByDropDown().first()).toBeVisible(this.isVisibleOptions);
        expect(this.page.searchInputField).toBeVisible(this.isVisibleOptions);
        expect(this.page.createAProjectButton).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertProjectsDiscoveryPageLoadsWithoutSuggest(): ProjectDiscoveryAssertions {
        expect(this.page.allProjectsHeader).toBeVisible(this.isVisibleOptions);
        expect(this.page.filtersButton).toBeVisible(this.isVisibleOptions);
        expect(this.page.sortByDropDown().first()).toBeVisible(this.isVisibleOptions);
        expect(this.page.searchInputField).toBeVisible(this.isVisibleOptions);
        expect(this.page.createAProjectButton).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertProjectsDiscoveryPageLoadsFromLandingPage(): ProjectDiscoveryAssertions {
        expect(this.page.filtersButton).toBeVisible(this.isVisibleOptions);
        expect(this.page.sortByDropDown().first()).toBeVisible(this.isVisibleOptions);
        expect(this.page.searchInputField).toBeVisible(this.isVisibleOptions);
        expect(this.page.createAProjectButton).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertFilterPageLoads(): ProjectDiscoveryAssertions {
        expect(this.page.allFiltersHeader).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertProjectIsDisplayedInSearchResults(projectTitle: string): ProjectDiscoveryAssertions {
        expect(this.page.projectCardTitle(projectTitle)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertProjectOrgNameIsDisplayedInProjectCard(projectTitle: string, orgNameValue: string): ProjectDiscoveryAssertions {
        expect(this.page.projectCardOrgValue(projectTitle, orgNameValue)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertAllProjectsHeaderDisplays(): ProjectDiscoveryAssertions {
        expect(this.page.allProjectsHeader).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertCreateAProjectButtonIsNotDisplayed(): ProjectDiscoveryAssertions {
        expect(this.page.createAProjectButton).not.toBeVisible(this.isNotVisibleOptions);
        return this;
    }

    public assertOrgHeaderAndDepartmentFilterIsDisplayed(): ProjectDiscoveryAssertions {
        expect(this.page.orgFilterDepartmentSubFilter).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatUrlContainsProperText(urlText: string): ProjectDiscoveryAssertions {
        this.assertTrue(this.page.getPage().url().contains(urlText), "Expected url: '" + urlText + "' but was: '" + this.page.getPage().url() + "'");
        return this;
    }

    public assertThatLocationIsVisibleOnProjectCard(): ProjectDiscoveryAssertions {
        expect(this.page.projectCardLocation).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatLocationIsNotVisibleOnProjectCard(): ProjectDiscoveryAssertions {
        expect(this.page.projectCardLocation).toBeHidden();
        return this;
    }

    public assertThatLocationIsVisibleOnProjectFilter(): ProjectDiscoveryAssertions {
        expect(this.page.projectFilterLocation).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatLocationIsNotVisibleOnProjectFilter(): ProjectDiscoveryAssertions {
        expect(this.page.projectFilterLocation).toBeHidden();
        return this;
    }
}
