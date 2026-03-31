// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { SkillLibraryFilterPage } from "skillstudio/pages/SkillLibraryFilterPage";
import { expect } from "common/testing/playwright";

export class SkillLibraryFilterAssertions extends BaseAssertion<SkillLibraryFilterPage>{

    public VerificationOfSkillFilterFlyout(): SkillLibraryFilterAssertions {
        expect(this.page.VerifySkillFilterFlyoutTitle).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public verificationAppliedFilteredParams(value: string): SkillLibraryFilterAssertions {
        expect(this.page.verifyAppliedFilterParamLoc(value)).toBeVisible(this.isVisibleOptions);
        return this;
    }

}
