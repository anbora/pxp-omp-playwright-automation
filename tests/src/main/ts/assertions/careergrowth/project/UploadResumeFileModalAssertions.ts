import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { Assert } from "common/testing/runtime";
import { WorkHistoryItem } from "models/job/WorkHistoryItem";
import { UploadResumeFileModalPage } from "pages/careergrowth/project/UploadResumeFileModalPage";

export class UploadResumeFileModalAssertions extends BaseAssertion<UploadResumeFileModalPage> {

    public assertThatDocumentNameIsEqualTo(name: string): UploadResumeFileModalAssertions {
        this.assertThat(this.page.documentName).containsText(name, this.containsTextOptions);
//        this.page.documentName().should('contain.text', name)
        return this;
    }

    public assertWorkHistory(expectedWorkHistory: Set<WorkHistoryItem>): UploadResumeFileModalAssertions {
        Assert.assertEquals(this.page.getWorkHistory(), expectedWorkHistory);
        return this;
    }

    public assertThatTitleErrorIsVisible(): UploadResumeFileModalAssertions {
        this.assertThat(this.page.addTitleError).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatTitleErrorIsNotVisible(): UploadResumeFileModalAssertions {
        this.assertThat(this.page.addTitleError).not().isVisible(this.isNotVisibleOptions);
        return this;
    }
}
