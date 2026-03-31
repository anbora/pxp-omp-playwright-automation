// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { SkillUploadFromTemplatePage } from "skillstudio/pages/SkillUploadFromTemplatePage";
import { expect } from "common/testing/playwright";

export class SkillUpdateFromTemplateAssertions extends BaseAssertion<SkillUploadFromTemplatePage> {
    public assertThatSourceFileNameIsPresentInRecentUploadsSuccessfully(source_name: string, uploadstatus: string): SkillUpdateFromTemplateAssertions {

        expect(this.page.Verify_Recent_Uploaded_Skill_Import_Loc(source_name, uploadstatus)).toBeVisible(this.isVisibleOptions);
        return this;
    }
}
