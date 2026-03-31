// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { MeSkillsPassportPage } from "pages/me/MeSkillsPassportPage";
import { expect } from "common/testing/playwright";

export class SkillsPassportMePageAssertions extends BaseAssertion<MeSkillsPassportPage> {

    public static readonly BEGINNER_LEVEL: number = 1;
    public static readonly ADVANCED_LEVEL: number = 3;

    public assertThatSkillIsAdded(skillName: string): SkillsPassportMePageAssertions {
        expect(this.page.addedSkill(skillName)).toBeVisible(this.isVisibleOptions);
//        this.page.addedSkill(skillName).should('exist')
        return this;
    }

    public assertThatSkillIsNotVisible(skillName: string): SkillsPassportMePageAssertions {
        expect(this.page.addedSkill(skillName)).toBeHidden();
//        this.page.addedSkill(skillName).should('not.exist')
        return this;
    }

    public assertThatSkillDetailsShowsDescription(skillName: string): SkillsPassportMePageAssertions {
        this.page.addedSkill(skillName).click();
        expect(this.page.skillDescription).toBeVisible(this.isVisibleOptions);
//        this.page.skillDescription().should('exist')
        return this;
    }

    public assertThatCounterShowsProperValue(counterValue: string): SkillsPassportMePageAssertions {
        expect(this.page.skillCounter(counterValue)).toBeVisible(this.isVisibleOptions);
//        this.page.skillCounter(counterValue).should('exist')
        return this;
    }
}
