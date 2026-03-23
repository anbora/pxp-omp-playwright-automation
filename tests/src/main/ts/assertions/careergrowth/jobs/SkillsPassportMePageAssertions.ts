import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { SkillsPassportMePage } from "pages/careergrowth/jobs/SkillsPassportMePage";

export class SkillsPassportMePageAssertions extends BaseAssertion<SkillsPassportMePage> {

    public assertThatSkillIsAdded(skillName: string): SkillsPassportMePageAssertions {
        this.assertThat(this.page.addedSkill(skillName)).isVisible(this.isVisibleOptions);
        return this;
    }

	public assertThatSkillIsNotVisible(skillName: string): SkillsPassportMePageAssertions {
        this.assertThat(this.page.addedSkill(skillName)).not().isVisible(this.isNotVisibleOptions);
        return this;
    }

	public assertThatSkillDetailsShowsDescription(skillName: string): SkillsPassportMePageAssertions {
        this.assertThat(this.page.skillDescription).isVisible(this.isVisibleOptions);
        return this;
    }

	public assertThatCounterShowsProperValue(counterValue: string): SkillsPassportMePageAssertions {
        this.assertThat(this.page.skillCounter(counterValue)).isVisible(this.isVisibleOptions);
        return this;
    }

	public assertThatWorkHistoryHeaderHasText(description: string): SkillsPassportMePageAssertions {
        this.assertThat(this.page.workHistoryHeader).containsText(description, this.containsTextOptions);
        return this;
    }

	public assertThatWorkHistoryTitleIsEqualTo(position: string): SkillsPassportMePageAssertions {
        this.assertThat(this.page.workHistoryTitle).containsText(position, this.containsTextOptions);
        return this;
    }

	public assertThatWorkHistoryPeriodIsEqualTo(position: string, period: string): SkillsPassportMePageAssertions {
        this.assertThat(this.page.workHistoryPeriod(position)).containsText(period, this.containsTextOptions);
        return this;
    }

	public assertThatWorkHistoryCompanyIsEqualTo(position: string, company: string): SkillsPassportMePageAssertions {
        this.assertThat(this.page.workHistoryCompany(position)).containsText(company, this.containsTextOptions);
        return this;
    }

	public assertThatProfileLabelIsEqualTo(label: string): SkillsPassportMePageAssertions {
        this.assertThat(this.page.profileLabel).containsText(label, this.containsTextOptions);
        return this;
    }

	public assertThatProfileIsDisplayedAsPrivate(): SkillsPassportMePageAssertions {
        this.assertThat(this.page.privateIcon).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertSkillHasGotAdvancedLevelIcon(skillLabel: string): SkillsPassportMePageAssertions {
        this.assertThat(this.page.skillLevelIcon(skillLabel)).hasAttribute("class", "icon-skill-advanced");
        return this;
    }
    public assertSkillHasGotBeginnerLevelIcon(skillLabel: string): SkillsPassportMePageAssertions {
        this.assertThat(this.page.skillLevelIcon(skillLabel)).hasAttribute("class", "icon-skill-beginner");
        return this;
    }
    public assertSkillHasGotIntermediateLevelIcon(skillLabel: string): SkillsPassportMePageAssertions {
        this.assertThat(this.page.skillLevelIcon(skillLabel)).hasAttribute("class", "icon-skill-intermediate");
        return this;
    }
}
