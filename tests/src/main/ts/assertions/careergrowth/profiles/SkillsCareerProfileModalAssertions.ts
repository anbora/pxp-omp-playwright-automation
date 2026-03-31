// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { Assert } from "common/testing/runtime";
import { ResultContainer } from "models/ResultContainer";
import { SkillsCareerProfileModalPage } from "pages/careergrowth/profiles/SkillsCareerProfileModalPage";
import { expect } from "common/testing/playwright";

export class SkillsCareerProfileModalAssertions extends BaseAssertion<SkillsCareerProfileModalPage> {

    public assertThatSkillIsDisplayed(skillLevel: string, skillName: string): SkillsCareerProfileModalAssertions {
        Assert.assertTrue(this.page.skillsOfLevel(skillLevel).allTextContents().contains(skillName), "Skill of name " + skillName + " is missing!");
        return this;
    }

    public assertWarningText(expectedWarning: string): SkillsCareerProfileModalAssertions {
        expect(this.page.warning).toHaveText(expectedWarning);
        return this;
    }

    public assertThatRemainingNumberOfSuggestedSkillsDecreased(remainingSuggestedSkillsContainer: ResultContainer): SkillsCareerProfileModalAssertions {
        const remainingSuggestedSkills = this.page.moreSkillsButton.textContent() ?? "";
        const match = remainingSuggestedSkills.match(Pattern.compile("\\d+"));
        if (match != null) {
            Assert.assertEquals(Integer.parseInt(remainingSuggestedSkillsContainer.getValue()), Integer.parseInt(match[0]) + 1);
        }
        return this;
    }

    public assertCompleteYourProfileModalSubHeaderIsDisplayed(subheaderName: string): SkillsCareerProfileModalAssertions {
        expect(this.page.completeYourProfileModalSubHeader(subheaderName)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertCompleteYourProfileProgressCount(progressPercentage: string): SkillsCareerProfileModalAssertions {
        expect(this.page.completeYourProfileModalProgressCount(progressPercentage)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatSaveAndContinueIsDisplayed(): SkillsCareerProfileModalAssertions {
        expect(this.page.saveAndContinue()).toBeVisible(this.isVisibleOptions);
        return this;
    }
}
