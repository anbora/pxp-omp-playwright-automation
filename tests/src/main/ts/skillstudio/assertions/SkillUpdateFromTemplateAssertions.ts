import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { SkillUploadFromTemplatePage } from "skillstudio/pages/SkillUploadFromTemplatePage";

export class SkillUpdateFromTemplateAssertions extends BaseAssertion<SkillUploadFromTemplatePage> {
    public assertThatSourceFileNameIsPresentInRecentUploadsSuccessfully(source_name: string, uploadstatus: string): SkillUpdateFromTemplateAssertions {

        this.assertThat(this.page.Verify_Recent_Uploaded_Skill_Import_Loc(source_name, uploadstatus)).isVisible(this.isVisibleOptions);
        return this;
    }
}
