// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { SkillsPassportMePage } from "pages/careergrowth/jobs/SkillsPassportMePage";
import { expect } from "common/testing/playwright";

export class SkillsPassportMePageAssertions extends BaseAssertion<SkillsPassportMePage> {

    public assertThatSkillIsAdded(skillName: string): SkillsPassportMePageAssertions {
        expect(this.page.addedSkill(skillName)).toBeVisible(this.isVisibleOptions);
        return this;
    }

	public assertThatSkillIsNotVisible(skillName: string): SkillsPassportMePageAssertions {
        expect(this.page.addedSkill(skillName)).not.toBeVisible(this.isNotVisibleOptions);
        return this;
    }

	public assertThatSkillDetailsShowsDescription(skillName: string): SkillsPassportMePageAssertions {
        expect(this.page.skillDescription).toBeVisible(this.isVisibleOptions);
        return this;
    }

	public assertThatCounterShowsProperValue(counterValue: string): SkillsPassportMePageAssertions {
        expect(this.page.skillCounter(counterValue)).toBeVisible(this.isVisibleOptions);
        return this;
    }

	public assertThatWorkHistoryHeaderHasText(description: string): SkillsPassportMePageAssertions {
        expect(this.page.workHistoryHeader).toContainText(description, this.containsTextOptions);
        return this;
    }

	public assertThatWorkHistoryTitleIsEqualTo(position: string): SkillsPassportMePageAssertions {
        expect(this.page.workHistoryTitle).toContainText(position, this.containsTextOptions);
        return this;
    }

	public assertThatWorkHistoryPeriodIsEqualTo(position: string, period: string): SkillsPassportMePageAssertions {
        expect(this.page.workHistoryPeriod(position)).toContainText(period, this.containsTextOptions);
        return this;
    }

	public assertThatWorkHistoryCompanyIsEqualTo(position: string, company: string): SkillsPassportMePageAssertions {
        expect(this.page.workHistoryCompany(position)).toContainText(company, this.containsTextOptions);
        return this;
    }

	public assertThatProfileLabelIsEqualTo(label: string): SkillsPassportMePageAssertions {
        expect(this.page.profileLabel).toContainText(label, this.containsTextOptions);
        return this;
    }

	public assertThatProfileIsDisplayedAsPrivate(): SkillsPassportMePageAssertions {
        expect(this.page.privateIcon).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertSkillHasGotAdvancedLevelIcon(skillLabel: string): SkillsPassportMePageAssertions {
        expect(this.page.skillLevelIcon(skillLabel)).toHaveAttribute("class", "icon-skill-advanced");
        return this;
    }
    public assertSkillHasGotBeginnerLevelIcon(skillLabel: string): SkillsPassportMePageAssertions {
        expect(this.page.skillLevelIcon(skillLabel)).toHaveAttribute("class", "icon-skill-beginner");
        return this;
    }
    public assertSkillHasGotIntermediateLevelIcon(skillLabel: string): SkillsPassportMePageAssertions {
        expect(this.page.skillLevelIcon(skillLabel)).toHaveAttribute("class", "icon-skill-intermediate");
        return this;
    }
}
