import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { MeSkillsPassportPage } from "pages/me/MeSkillsPassportPage";

export class SkillsPassportMePageAssertions extends BaseAssertion<MeSkillsPassportPage> {

    public static readonly BEGINNER_LEVEL: number = 1;
    public static readonly ADVANCED_LEVEL: number = 3;

    public assertThatSkillIsAdded(skillName: string): SkillsPassportMePageAssertions {
        this.assertThat(this.page.addedSkill(skillName)).isVisible(this.isVisibleOptions);
//        this.page.addedSkill(skillName).should('exist')
        return this;
    }

    public assertThatSkillIsNotVisible(skillName: string): SkillsPassportMePageAssertions {
        this.assertThat(this.page.addedSkill(skillName)).isHidden();
//        this.page.addedSkill(skillName).should('not.exist')
        return this;
    }

    public assertThatSkillDetailsShowsDescription(skillName: string): SkillsPassportMePageAssertions {
        this.page.addedSkill(skillName).click();
        this.assertThat(this.page.skillDescription).isVisible(this.isVisibleOptions);
//        this.page.skillDescription().should('exist')
        return this;
    }

    public assertThatCounterShowsProperValue(counterValue: string): SkillsPassportMePageAssertions {
        this.assertThat(this.page.skillCounter(counterValue)).isVisible(this.isVisibleOptions);
//        this.page.skillCounter(counterValue).should('exist')
        return this;
    }
}
