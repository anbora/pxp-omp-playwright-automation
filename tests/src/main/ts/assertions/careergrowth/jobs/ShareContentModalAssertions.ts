import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { ShareContentModalPage } from "pages/careergrowth/jobs/ShareContentModalPage";

export class ShareContentModalAssertions extends BaseAssertion<ShareContentModalPage> {

    public assertThatModalHeaderIsEqualTo(title: string): ShareContentModalAssertions {
        this.assertThat(this.page.modalHeader).containsText(title, this.containsTextOptions);
//        this.page.modalHeader().should('contain.text', title)
        return this;
    }
}
