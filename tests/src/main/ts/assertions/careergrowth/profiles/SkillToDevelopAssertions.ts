// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { SkillsToDevelopPage } from "pages/careergrowth/profiles/SkillsToDevelopPage";
import { expect } from "common/testing/playwright";

export class SkillToDevelopAssertions extends BaseAssertion<SkillsToDevelopPage> {

    public assertCompleteYourProfileModalSubHeaderIsDisplayed(subheaderName: string): SkillToDevelopAssertions {
        expect(this.page.completeYourProfileModalSubHeader(subheaderName)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertCompleteYourProfileProgressCount(progressPercentage: string): SkillToDevelopAssertions {
        expect(this.page.completeYourProfileModalProgressCount(progressPercentage)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatSaveAndContinueIsDisplayed(): SkillToDevelopAssertions {
        expect(this.page.saveAndContinue()).toBeVisible(this.isVisibleOptions);
        return this;
    }
}
