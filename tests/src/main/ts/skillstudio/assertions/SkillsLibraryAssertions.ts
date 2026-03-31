// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { SkillsLibraryPage } from "skillstudio/pages/SkillsLibraryPage";
import { expect } from "common/testing/playwright";

export class SkillsLibraryAssertions extends BaseAssertion<SkillsLibraryPage> {
    public VerifySkillIsPresent(skill_name: string): SkillsLibraryAssertions {
        expect(this.page.Skill_Label_Loc(skill_name)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public VerifySkillStatus(skill_name: string, status: string): SkillsLibraryAssertions {
        expect(this.page.Verify_Skill_Status_Loc(skill_name, status)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public VerifySourceName(source_name: string): SkillsLibraryAssertions {
        expect(this.page.Verify_Source_Name_Loc(source_name)).toBeVisible(this.isVisibleOptions);
        return this;
    }
    public verifyUpdateSkillName(skill_name: string): SkillsLibraryAssertions {
        expect(this.page.Skill_Update_Label_Loc(skill_name)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public verifySkillNameNotSearchable(skill_name: string): SkillsLibraryAssertions {
        expect(this.page.Skill_Update_Label_Loc(skill_name)).toBeHidden();
        return this;
    }
    public skillDescPositiveVerification(desc: string): SkillsLibraryAssertions {
        expect(this.page.Skills_Description_Verification_Loc(desc)).toBeVisible();
        return this;
    }
    public skillDescNegativeVerification(desc: string): SkillsLibraryAssertions {
        expect(this.page.Skills_Description_Verification_Loc(desc)).toBeHidden();
        return this;
    }

    public verifyLinkedSkillGraphSkill(desc: string, mappingConfiguration: string): SkillsLibraryAssertions {

        if (mappingConfiguration == "ON")
        {
            expect(this.page.Linked_Skills_Graph_Equivalent_Loc(desc)).toBeVisible(this.isVisibleOptions);
        }
        else
        {
            expect(this.page.Linked_Skills_Graph_Equivalent_Loc(desc)).not.toBeVisible();
        }

        return this;
    }

}
