// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { Assert } from "common/testing/runtime";
import { WorkHistoryItem } from "models/job/WorkHistoryItem";
import { UploadResumeFileModalPage } from "pages/careergrowth/project/UploadResumeFileModalPage";
import { expect } from "common/testing/playwright";

export class UploadResumeFileModalAssertions extends BaseAssertion<UploadResumeFileModalPage> {

    public assertThatDocumentNameIsEqualTo(name: string): UploadResumeFileModalAssertions {
        expect(this.page.documentName).toContainText(name, this.containsTextOptions);
//        this.page.documentName().should('contain.text', name)
        return this;
    }

    public assertWorkHistory(expectedWorkHistory: Set<WorkHistoryItem>): UploadResumeFileModalAssertions {
        Assert.assertEquals(this.page.getWorkHistory(), expectedWorkHistory);
        return this;
    }

    public assertThatTitleErrorIsVisible(): UploadResumeFileModalAssertions {
        expect(this.page.addTitleError).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatTitleErrorIsNotVisible(): UploadResumeFileModalAssertions {
        expect(this.page.addTitleError).not.toBeVisible(this.isNotVisibleOptions);
        return this;
    }
}
