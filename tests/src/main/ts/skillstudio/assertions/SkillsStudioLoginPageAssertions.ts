// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { SkillsStudioLoginPage } from "skillstudio/pages/SkillsStudioLoginPage";
import { expect } from "common/testing/playwright";

export class SkillsStudioLoginPageAssertions extends BaseAssertion<SkillsStudioLoginPage> {

    public assertThatUserHaveAdminAccess(): SkillsStudioLoginPageAssertions {
        expect(this.page.verification_admin_role).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatChangeSpaceButtonIsNotVisible(): SkillsStudioLoginPageAssertions {
        expect(this.page.Change_Organization_Button_Loc).not.toBeVisible(this.isVisibleOptions);
        return this;
    }
}
