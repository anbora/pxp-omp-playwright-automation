// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { ShareContentModalPage } from "pages/careergrowth/jobs/ShareContentModalPage";
import { expect } from "common/testing/playwright";

export class ShareContentModalAssertions extends BaseAssertion<ShareContentModalPage> {

    public assertThatModalHeaderIsEqualTo(title: string): ShareContentModalAssertions {
        expect(this.page.modalHeader).toContainText(title, this.containsTextOptions);
//        this.page.modalHeader().should('contain.text', title)
        return this;
    }
}
