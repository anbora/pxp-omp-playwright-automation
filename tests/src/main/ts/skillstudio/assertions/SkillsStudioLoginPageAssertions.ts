import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { SkillsStudioLoginPage } from "skillstudio/pages/SkillsStudioLoginPage";

export class SkillsStudioLoginPageAssertions extends BaseAssertion<SkillsStudioLoginPage> {

    public assertThatUserHaveAdminAccess(): SkillsStudioLoginPageAssertions {
        this.assertThat(this.page.verification_admin_role).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatChangeSpaceButtonIsNotVisible(): SkillsStudioLoginPageAssertions {
        this.assertThat(this.page.Change_Organization_Button_Loc).not().isVisible(this.isVisibleOptions);
        return this;
    }
}
