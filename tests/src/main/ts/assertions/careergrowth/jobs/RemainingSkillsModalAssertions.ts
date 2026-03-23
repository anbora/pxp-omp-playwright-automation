import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { RemainingSkillsModalPage } from "pages/careergrowth/jobs/RemainingSkillsModalPage";

export class RemainingSkillsModalAssertions extends BaseAssertion<RemainingSkillsModalPage> {

    public assertThatHeaderIsEqualTo(header: string): RemainingSkillsModalAssertions {
        this.assertThat(this.page.header).containsText(header, this.containsTextOptions);
//        this.page.header().should('contain.text', header)
        return this;
    }

    public assertThatTitleIsEqualTo(title: string): RemainingSkillsModalAssertions {
        this.assertThat(this.page.title).containsText(title, this.containsTextOptions);
//        this.page.title().should('contain.text', title)
        return this;
    }

    public assertThatSkillIsDisplayed(skill: string): RemainingSkillsModalAssertions {
        this.assertThat(this.page.skill(skill)).isVisible(this.isVisibleOptions);
//        this.page.skill(skill).should('exist')
        return this;
    }

    public assertThatSkillIsNotDisplayed(skill: string): RemainingSkillsModalAssertions {
        this.assertThat(this.page.skill(skill)).isHidden();
//        this.page.skill(skill).should('not.exist')
        return this;
    }

    public assertThatIconIsDisplayed(skill: string): RemainingSkillsModalAssertions {
        this.assertThat(this.page.checkIcon(skill)).isVisible(this.isVisibleOptions);
//        this.page.checkIcon().should('exist')
        return this;
    }
}
