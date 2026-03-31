// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { CourseDetailsPage } from "cs/pages/CourseDetailsPage";
import { LMSPage } from "cs/pages/LMSPage";
import { expect } from "common/testing/playwright";

export class LMSPageAssertions extends BaseAssertion<LMSPage>{

	public assertThatLMSCollectionNameIsVisible(name: string): LMSPageAssertions {
		expect(this.page.verifyPlaylistName(name)).toBeVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThaURLIsVisible(): LMSPageAssertions {
		this.page.pause(5000);
		//System.out.println(this.page.getPage().url());
		expect(this.page.getPage()).toHaveURL(Pattern.compile("((http|https):\\/\\/*)(thinkcontent.csod.com)"));
        return this;
    }

}
