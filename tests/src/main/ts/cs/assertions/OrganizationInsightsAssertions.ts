// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { ManageObjectivesPage } from "cs/pages/ManageObjectivesPage";
import { OrganizationInsightsPage } from "cs/pages/OrganizationInsightsPage";
import { expect } from "common/testing/playwright";

export class OrganizationInsightsAssertions  extends BaseAssertion<OrganizationInsightsPage>{

	public assertThatTabIsVisible(message: string): OrganizationInsightsAssertions {
        expect(this.page.locateButtonText(message)).toBeVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatHeadingIsVisible(message: string): OrganizationInsightsAssertions {
        expect(this.page.locatePTagByText(message)).toBeVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatHeadingIsNotVisible(message: string): OrganizationInsightsAssertions {
        expect(this.page.locatePTagByText(message)).not.toBeVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatNagigationBetaTagVisible(): OrganizationInsightsAssertions {
        expect(this.page.navigation_betaText).toBeVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatHeaderBetaTagVisible(message: string): OrganizationInsightsAssertions {
        expect(this.page.header_betaText(message)).toBeVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatContentSourceVisible(): OrganizationInsightsAssertions {
        expect(this.page.contentSourceDropdown).toBeVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatContentSourceOptionVisible(message: string): OrganizationInsightsAssertions {
        expect(this.page.locate_LI_TagByText(message)).toBeVisible(this.extendedIsVisibleOptions);
        return this;
    }

  	public assertThatStickyHeaderVisible(headerName: string): OrganizationInsightsAssertions {
		expect(this.page.loc_DIV_ByText(headerName)).toBeVisible(this.extendedIsVisibleOptions);
        return this;
    }

  	public assertThatOUVisible(ouName: string): OrganizationInsightsAssertions {
		expect(this.page.ouLable(ouName)).toBeVisible(this.extendedIsVisibleOptions);
        return this;
    }

    public assertThatAppliedFilterIsVisible(name: string, value: string): OrganizationInsightsAssertions {
    	expect(this.page.verifyAppliedFilter(name,value)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatCompanionInsightSummaryHeader(message: string): OrganizationInsightsAssertions {
    	expect(this.page.locatePTagByText(message)).toBeVisible(this.isVisibleOptions);
        return this;
    }

}
