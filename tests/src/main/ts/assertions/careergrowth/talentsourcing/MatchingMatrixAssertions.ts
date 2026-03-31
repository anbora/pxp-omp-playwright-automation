// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { MatchingMatrixPage } from "pages/careergrowth/talentsourcing/MatchingMatrixPage";
import { expect } from "common/testing/playwright";

export class MatchingMatrixAssertions extends BaseAssertion<MatchingMatrixPage> {

    public assertThatMatchingSkillTitleIsDisplayed(): MatchingMatrixAssertions {
        expect(this.page.matchingSkill).toBeVisible();
        return this;
    }

    public assertThatFirstMatchingSkillsIsDisplayed(): MatchingMatrixAssertions {
        expect(this.page.getFirstMatchingSkills).toBeVisible(this.isVisibleOptions);
        return this;
    }
}
