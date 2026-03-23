import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { ManageObjectivesPage } from "cs/pages/ManageObjectivesPage";
import { OrganizationInsightsPage } from "cs/pages/OrganizationInsightsPage";

export class OrganizationInsightsAssertions  extends BaseAssertion<OrganizationInsightsPage>{

	public assertThatTabIsVisible(message: string): OrganizationInsightsAssertions {
        this.assertThat(this.page.locateButtonText(message)).isVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatHeadingIsVisible(message: string): OrganizationInsightsAssertions {
        this.assertThat(this.page.locatePTagByText(message)).isVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatHeadingIsNotVisible(message: string): OrganizationInsightsAssertions {
        this.assertThat(this.page.locatePTagByText(message)).not().isVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatNagigationBetaTagVisible(): OrganizationInsightsAssertions {
        this.assertThat(this.page.navigation_betaText).isVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatHeaderBetaTagVisible(message: string): OrganizationInsightsAssertions {
        this.assertThat(this.page.header_betaText(message)).isVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatContentSourceVisible(): OrganizationInsightsAssertions {
        this.assertThat(this.page.contentSourceDropdown).isVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatContentSourceOptionVisible(message: string): OrganizationInsightsAssertions {
        this.assertThat(this.page.locate_LI_TagByText(message)).isVisible(this.extendedIsVisibleOptions);
        return this;
    }

  	public assertThatStickyHeaderVisible(headerName: string): OrganizationInsightsAssertions {
		this.assertThat(this.page.loc_DIV_ByText(headerName)).isVisible(this.extendedIsVisibleOptions);
        return this;
    }

  	public assertThatOUVisible(ouName: string): OrganizationInsightsAssertions {
		this.assertThat(this.page.ouLable(ouName)).isVisible(this.extendedIsVisibleOptions);
        return this;
    }

    public assertThatAppliedFilterIsVisible(name: string, value: string): OrganizationInsightsAssertions {
    	this.assertThat(this.page.verifyAppliedFilter(name,value)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatCompanionInsightSummaryHeader(message: string): OrganizationInsightsAssertions {
    	this.assertThat(this.page.locatePTagByText(message)).isVisible(this.isVisibleOptions);
        return this;
    }

}
