// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { RemainingSkillsModalPage } from "pages/careergrowth/jobs/RemainingSkillsModalPage";
import { expect } from "common/testing/playwright";

export class RemainingSkillsModalAssertions extends BaseAssertion<RemainingSkillsModalPage> {

    public assertThatHeaderIsEqualTo(header: string): RemainingSkillsModalAssertions {
        expect(this.page.header).toContainText(header, this.containsTextOptions);
//        this.page.header().should('contain.text', header)
        return this;
    }

    public assertThatTitleIsEqualTo(title: string): RemainingSkillsModalAssertions {
        expect(this.page.title).toContainText(title, this.containsTextOptions);
//        this.page.title().should('contain.text', title)
        return this;
    }

    public assertThatSkillIsDisplayed(skill: string): RemainingSkillsModalAssertions {
        expect(this.page.skill(skill)).toBeVisible(this.isVisibleOptions);
//        this.page.skill(skill).should('exist')
        return this;
    }

    public assertThatSkillIsNotDisplayed(skill: string): RemainingSkillsModalAssertions {
        expect(this.page.skill(skill)).toBeHidden();
//        this.page.skill(skill).should('not.exist')
        return this;
    }

    public assertThatIconIsDisplayed(skill: string): RemainingSkillsModalAssertions {
        expect(this.page.checkIcon(skill)).toBeVisible(this.isVisibleOptions);
//        this.page.checkIcon().should('exist')
        return this;
    }
}
