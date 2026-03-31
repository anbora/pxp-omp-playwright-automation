// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { CuratorInsightsPage } from "cs/pages/CuratorInsightsPage";
import { IndustryInsightsPage } from "cs/pages/IndustryInsightsPage";
import { expect } from "common/testing/playwright";

export class IndustryInsightsAssertions extends BaseAssertion<IndustryInsightsPage>{

	public assertThatHeaderBetaTagVisible(message: string): IndustryInsightsAssertions {
        expect(this.page.header_betaText(message)).toBeVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatHeadingIsNotVisible(message: string): IndustryInsightsAssertions {
        expect(this.page.locatePTagByText(message)).not.toBeVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatHeadingIsVisible(message: string): IndustryInsightsAssertions {
        expect(this.page.locatePTagByText(message)).toBeVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertTextAssignedLlearningIsVisible(sectionName: string): IndustryInsightsAssertions {
        expect(this.page.locateTextAssignedLearningInSection(sectionName)).toBeVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertTextSelfDirectedLearningVisible(sectionName: string): IndustryInsightsAssertions {
        expect(this.page.locateTextSelfDirectedInSection(sectionName)).toBeVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertSelfDirectedTableDataCount(sectionName: string): IndustryInsightsAssertions {
        expect(this.page.countSelfDirectedData(sectionName)).toHaveCount(10);
        return this;
    }

	public assertAssignedLearningTableDataCount(sectionName: string): IndustryInsightsAssertions {
        expect(this.page.countAssignedLearningData(sectionName)).toHaveCount(10);
        return this;
    }

	public assertThatTimeFameSelectorIsVisible(time: string): IndustryInsightsAssertions {
        expect(this.page.regionTimeFrameArrow(time)).toBeVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatLearningCultureIsVisible(): IndustryInsightsAssertions {
        expect(this.page.learningCultureArrow).toBeVisible(this.extendedIsVisibleOptions);
        return this;
    }

  	public assertThatStickyHeaderVisible(headerName: string): IndustryInsightsAssertions {
		expect(this.page.loc_DIV_ByText(headerName)).toBeVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatLastSyncMessageVisible(message: string): IndustryInsightsAssertions {
        expect(this.page.locatelastSyncMessage(message)).toBeVisible(this.extendedIsVisibleOptions);
        return this;
    }

}
