import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { CourseDetailsPage } from "cs/pages/CourseDetailsPage";
import { LMSPage } from "cs/pages/LMSPage";

export class LMSPageAssertions extends BaseAssertion<LMSPage>{

	public assertThatLMSCollectionNameIsVisible(name: string): LMSPageAssertions {
		this.assertThat(this.page.verifyPlaylistName(name)).isVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThaURLIsVisible(): LMSPageAssertions {
		this.page.pause(5000);
		//System.out.println(this.page.getPage().url());
		this.assertThat(this.page.getPage()).hasURL(Pattern.compile("((http|https):\\/\\/*)(thinkcontent.csod.com)"));
        return this;
    }

}
