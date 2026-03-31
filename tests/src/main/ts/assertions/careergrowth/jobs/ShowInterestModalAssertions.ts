// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { ShowInterestModalPage } from "pages/careergrowth/jobs/ShowInterestModalPage";
import { expect } from "common/testing/playwright";

export class ShowInterestModalAssertions extends BaseAssertion<ShowInterestModalPage> {

    public assertThatHeaderIsEqualTo(header: string): ShowInterestModalAssertions {
        expect(this.page.header).toContainText(header, this.containsTextOptions);
//        this.page.header().should('contain.text', header)
        return this;
    }

    public assertThatContentIsEqualTo(content: string): ShowInterestModalAssertions {
        expect(this.page.content).toContainText(content, this.containsTextOptions);
//        this.page.content().should('contain.text', content)
        return this;
    }

    public assertThatHintIsEqualTo(hint: string): ShowInterestModalAssertions {
        expect(this.page.hint).toContainText(hint, this.containsTextOptions);
//        this.page.hint().should('contain.text', hint)
        return this;
    }

    public assertThatValidateMessageWhenClickOnApplyButton(expectedMessage: string): ShowInterestModalAssertions {
        expect(this.page.applyButtonMessage).toContainText(expectedMessage, this.containsTextOptions);
        return this;
    }
}
