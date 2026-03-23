import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { SkillsLibraryPage } from "skillstudio/pages/SkillsLibraryPage";

export class SkillsLibraryAssertions extends BaseAssertion<SkillsLibraryPage> {
    public VerifySkillIsPresent(skill_name: string): SkillsLibraryAssertions {
        this.assertThat(this.page.Skill_Label_Loc(skill_name)).isVisible(this.isVisibleOptions);
        return this;
    }

    public VerifySkillStatus(skill_name: string, status: string): SkillsLibraryAssertions {
        this.assertThat(this.page.Verify_Skill_Status_Loc(skill_name, status)).isVisible(this.isVisibleOptions);
        return this;
    }

    public VerifySourceName(source_name: string): SkillsLibraryAssertions {
        this.assertThat(this.page.Verify_Source_Name_Loc(source_name)).isVisible(this.isVisibleOptions);
        return this;
    }
    public verifyUpdateSkillName(skill_name: string): SkillsLibraryAssertions {
        this.assertThat(this.page.Skill_Update_Label_Loc(skill_name)).isVisible(this.isVisibleOptions);
        return this;
    }

    public verifySkillNameNotSearchable(skill_name: string): SkillsLibraryAssertions {
        this.assertThat(this.page.Skill_Update_Label_Loc(skill_name)).isHidden();
        return this;
    }
    public skillDescPositiveVerification(desc: string): SkillsLibraryAssertions {
        this.assertThat(this.page.Skills_Description_Verification_Loc(desc)).isVisible();
        return this;
    }
    public skillDescNegativeVerification(desc: string): SkillsLibraryAssertions {
        this.assertThat(this.page.Skills_Description_Verification_Loc(desc)).isHidden();
        return this;
    }

    public verifyLinkedSkillGraphSkill(desc: string, mappingConfiguration: string): SkillsLibraryAssertions {

        if (mappingConfiguration == "ON")
        {
            this.assertThat(this.page.Linked_Skills_Graph_Equivalent_Loc(desc)).isVisible(this.isVisibleOptions);
        }
        else
        {
            this.assertThat(this.page.Linked_Skills_Graph_Equivalent_Loc(desc)).not().isVisible();
        }

        return this;
    }

}
