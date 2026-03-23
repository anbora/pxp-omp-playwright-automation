import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { EditJobDiscardChangesModalPage } from "pages/careergrowth/jobs/EditJobDiscardChangesModalPage";

export class EditJobDiscardChangesModalAssertions extends BaseAssertion<EditJobDiscardChangesModalPage> {

    public assertThatDiscardChangesTitleIsDisplayed(): EditJobDiscardChangesModalAssertions {
        this.assertThat(this.page.getModalHeader()).isVisible(this.isVisibleOptions);
        return this;
    }
}
