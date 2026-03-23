import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { SkillsToDevelopPage } from "pages/careergrowth/profiles/SkillsToDevelopPage";

export class SkillToDevelopAssertions extends BaseAssertion<SkillsToDevelopPage> {

    public assertCompleteYourProfileModalSubHeaderIsDisplayed(subheaderName: string): SkillToDevelopAssertions {
        this.assertThat(this.page.completeYourProfileModalSubHeader(subheaderName)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertCompleteYourProfileProgressCount(progressPercentage: string): SkillToDevelopAssertions {
        this.assertThat(this.page.completeYourProfileModalProgressCount(progressPercentage)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatSaveAndContinueIsDisplayed(): SkillToDevelopAssertions {
        this.assertThat(this.page.saveAndContinue()).isVisible(this.isVisibleOptions);
        return this;
    }
}
