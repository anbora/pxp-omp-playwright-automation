// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { EditJobDiscardChangesModalPage } from "pages/careergrowth/jobs/EditJobDiscardChangesModalPage";
import { expect } from "common/testing/playwright";

export class EditJobDiscardChangesModalAssertions extends BaseAssertion<EditJobDiscardChangesModalPage> {

    public assertThatDiscardChangesTitleIsDisplayed(): EditJobDiscardChangesModalAssertions {
        expect(this.page.getModalHeader()).toBeVisible(this.isVisibleOptions);
        return this;
    }
}
