import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { SkillDetailsModalPage } from "pages/careergrowth/jobs/SkillDetailsModalPage";

export class SkillDetailsModalAssertions extends BaseAssertion<SkillDetailsModalPage> {

    public assertThatHeaderIsEqualTo(modalTitle: string): SkillDetailsModalAssertions {
        this.assertThat(this.page.modalTitle(modalTitle)).isVisible(this.isVisibleOptions);
//        this.page.modalTitle(modalTitle).should('exist')
        return this;
    }
}
