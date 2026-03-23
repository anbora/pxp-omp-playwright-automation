import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { CuratorInsightsPage } from "cs/pages/CuratorInsightsPage";
import { ManageObjectivesPage } from "cs/pages/ManageObjectivesPage";
import { OrganizationInsightsPage } from "cs/pages/OrganizationInsightsPage";

export class CuratorInsightsAssertions  extends BaseAssertion<CuratorInsightsPage>{

	public assertThatTabIsVisible(message: string): CuratorInsightsAssertions {
        this.assertThat(this.page.locateButtonText(message)).isVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatHeadingIsVisible(message: string): CuratorInsightsAssertions {
        this.assertThat(this.page.locatePTagByText(message)).isVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatHeadingIsNotVisible(message: string): CuratorInsightsAssertions {
        this.assertThat(this.page.locatePTagByText(message)).not().isVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatNagigationBetaTagVisible(): CuratorInsightsAssertions {
        this.assertThat(this.page.navigation_betaText).isVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatHeaderBetaTagVisible(message: string): CuratorInsightsAssertions {
        this.assertThat(this.page.header_betaText(message)).isVisible(this.extendedIsVisibleOptions);
        return this;
    }

  	public assertThatStickyHeaderVisible(headerName: string): CuratorInsightsAssertions {
		this.assertThat(this.page.loc_DIV_ByText(headerName)).isVisible(this.extendedIsVisibleOptions);
        return this;
    }


}
