import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { ShowInterestModalPage } from "pages/careergrowth/jobs/ShowInterestModalPage";

export class ShowInterestModalAssertions extends BaseAssertion<ShowInterestModalPage> {

    public assertThatHeaderIsEqualTo(header: string): ShowInterestModalAssertions {
        this.assertThat(this.page.header).containsText(header, this.containsTextOptions);
//        this.page.header().should('contain.text', header)
        return this;
    }

    public assertThatContentIsEqualTo(content: string): ShowInterestModalAssertions {
        this.assertThat(this.page.content).containsText(content, this.containsTextOptions);
//        this.page.content().should('contain.text', content)
        return this;
    }

    public assertThatHintIsEqualTo(hint: string): ShowInterestModalAssertions {
        this.assertThat(this.page.hint).containsText(hint, this.containsTextOptions);
//        this.page.hint().should('contain.text', hint)
        return this;
    }

    public assertThatValidateMessageWhenClickOnApplyButton(expectedMessage: string): ShowInterestModalAssertions {
        this.assertThat(this.page.applyButtonMessage).containsText(expectedMessage, this.containsTextOptions);
        return this;
    }
}
