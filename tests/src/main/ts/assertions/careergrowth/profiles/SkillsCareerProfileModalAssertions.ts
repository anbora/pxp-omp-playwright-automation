import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { Assert } from "common/testing/runtime";
import { ResultContainer } from "models/ResultContainer";
import { SkillsCareerProfileModalPage } from "pages/careergrowth/profiles/SkillsCareerProfileModalPage";

export class SkillsCareerProfileModalAssertions extends BaseAssertion<SkillsCareerProfileModalPage> {

    public assertThatSkillIsDisplayed(skillLevel: string, skillName: string): SkillsCareerProfileModalAssertions {
        Assert.assertTrue(this.page.skillsOfLevel(skillLevel).allTextContents().contains(skillName), "Skill of name " + skillName + " is missing!");
        return this;
    }

    public assertWarningText(expectedWarning: string): SkillsCareerProfileModalAssertions {
        this.assertThat(this.page.warning).hasText(expectedWarning);
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
        this.assertThat(this.page.completeYourProfileModalSubHeader(subheaderName)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertCompleteYourProfileProgressCount(progressPercentage: string): SkillsCareerProfileModalAssertions {
        this.assertThat(this.page.completeYourProfileModalProgressCount(progressPercentage)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatSaveAndContinueIsDisplayed(): SkillsCareerProfileModalAssertions {
        this.assertThat(this.page.saveAndContinue()).isVisible(this.isVisibleOptions);
        return this;
    }
}
