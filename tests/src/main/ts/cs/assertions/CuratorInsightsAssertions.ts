// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { CuratorInsightsPage } from "cs/pages/CuratorInsightsPage";
import { ManageObjectivesPage } from "cs/pages/ManageObjectivesPage";
import { OrganizationInsightsPage } from "cs/pages/OrganizationInsightsPage";
import { expect } from "common/testing/playwright";

export class CuratorInsightsAssertions  extends BaseAssertion<CuratorInsightsPage>{

	public assertThatTabIsVisible(message: string): CuratorInsightsAssertions {
        expect(this.page.locateButtonText(message)).toBeVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatHeadingIsVisible(message: string): CuratorInsightsAssertions {
        expect(this.page.locatePTagByText(message)).toBeVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatHeadingIsNotVisible(message: string): CuratorInsightsAssertions {
        expect(this.page.locatePTagByText(message)).not.toBeVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatNagigationBetaTagVisible(): CuratorInsightsAssertions {
        expect(this.page.navigation_betaText).toBeVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatHeaderBetaTagVisible(message: string): CuratorInsightsAssertions {
        expect(this.page.header_betaText(message)).toBeVisible(this.extendedIsVisibleOptions);
        return this;
    }

  	public assertThatStickyHeaderVisible(headerName: string): CuratorInsightsAssertions {
		expect(this.page.loc_DIV_ByText(headerName)).toBeVisible(this.extendedIsVisibleOptions);
        return this;
    }


}
