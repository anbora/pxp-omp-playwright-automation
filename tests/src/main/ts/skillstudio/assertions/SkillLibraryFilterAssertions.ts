import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { SkillLibraryFilterPage } from "skillstudio/pages/SkillLibraryFilterPage";

export class SkillLibraryFilterAssertions extends BaseAssertion<SkillLibraryFilterPage>{

    public VerificationOfSkillFilterFlyout(): SkillLibraryFilterAssertions {
        this.assertThat(this.page.VerifySkillFilterFlyoutTitle).isVisible(this.isVisibleOptions);
        return this;
    }

    public verificationAppliedFilteredParams(value: string): SkillLibraryFilterAssertions {
        this.assertThat(this.page.verifyAppliedFilterParamLoc(value));
        return this;
    }

}
