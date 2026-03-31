// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { SkillDetailsModalPage } from "pages/careergrowth/jobs/SkillDetailsModalPage";
import { expect } from "common/testing/playwright";

export class SkillDetailsModalAssertions extends BaseAssertion<SkillDetailsModalPage> {

    public assertThatHeaderIsEqualTo(modalTitle: string): SkillDetailsModalAssertions {
        expect(this.page.modalTitle(modalTitle)).toBeVisible(this.isVisibleOptions);
//        this.page.modalTitle(modalTitle).should('exist')
        return this;
    }
}
