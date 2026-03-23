import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { LearningQueuePage } from "pages/me/LearningQueuePage";

export class LearningQueueAssertions extends BaseAssertion<LearningQueuePage> {

    public assertThatLearningTitleContains(learningTitle: string): LearningQueueAssertions {
        this.assertThat(this.page.learningTitle).containsText(learningTitle, this.containsTextOptions);
        return this;
    }
}
