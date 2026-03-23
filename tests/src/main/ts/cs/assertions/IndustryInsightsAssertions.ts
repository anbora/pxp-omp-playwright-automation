import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { CuratorInsightsPage } from "cs/pages/CuratorInsightsPage";
import { IndustryInsightsPage } from "cs/pages/IndustryInsightsPage";

export class IndustryInsightsAssertions extends BaseAssertion<IndustryInsightsPage>{

	public assertThatHeaderBetaTagVisible(message: string): IndustryInsightsAssertions {
        this.assertThat(this.page.header_betaText(message)).isVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatHeadingIsNotVisible(message: string): IndustryInsightsAssertions {
        this.assertThat(this.page.locatePTagByText(message)).not().isVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatHeadingIsVisible(message: string): IndustryInsightsAssertions {
        this.assertThat(this.page.locatePTagByText(message)).isVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertTextAssignedLlearningIsVisible(sectionName: string): IndustryInsightsAssertions {
        this.assertThat(this.page.locateTextAssignedLearningInSection(sectionName)).isVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertTextSelfDirectedLearningVisible(sectionName: string): IndustryInsightsAssertions {
        this.assertThat(this.page.locateTextSelfDirectedInSection(sectionName)).isVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertSelfDirectedTableDataCount(sectionName: string): IndustryInsightsAssertions {
        this.assertThat(this.page.countSelfDirectedData(sectionName)).hasCount(10);
        return this;
    }

	public assertAssignedLearningTableDataCount(sectionName: string): IndustryInsightsAssertions {
        this.assertThat(this.page.countAssignedLearningData(sectionName)).hasCount(10);
        return this;
    }

	public assertThatTimeFameSelectorIsVisible(time: string): IndustryInsightsAssertions {
        this.assertThat(this.page.regionTimeFrameArrow(time)).isVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatLearningCultureIsVisible(): IndustryInsightsAssertions {
        this.assertThat(this.page.learningCultureArrow).isVisible(this.extendedIsVisibleOptions);
        return this;
    }

  	public assertThatStickyHeaderVisible(headerName: string): IndustryInsightsAssertions {
		this.assertThat(this.page.loc_DIV_ByText(headerName)).isVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatLastSyncMessageVisible(message: string): IndustryInsightsAssertions {
        this.assertThat(this.page.locatelastSyncMessage(message)).isVisible(this.extendedIsVisibleOptions);
        return this;
    }

}
