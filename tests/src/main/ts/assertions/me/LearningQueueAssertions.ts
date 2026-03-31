// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { LearningQueuePage } from "pages/me/LearningQueuePage";
import { expect } from "common/testing/playwright";

export class LearningQueueAssertions extends BaseAssertion<LearningQueuePage> {

    public assertThatLearningTitleContains(learningTitle: string): LearningQueueAssertions {
        expect(this.page.learningTitle).toContainText(learningTitle, this.containsTextOptions);
        return this;
    }
}
