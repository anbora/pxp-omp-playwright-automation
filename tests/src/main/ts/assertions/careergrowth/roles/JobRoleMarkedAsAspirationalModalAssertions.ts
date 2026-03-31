// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { Assert } from "common/testing/runtime";
import { JobRoleMarkedAsAspirationalModal } from "pages/careergrowth/roles/JobRoleMarkedAsAspirationalModal";
import { expect } from "common/testing/playwright";

export class JobRoleMarkedAsAspirationalModalAssertions  extends BaseAssertion<JobRoleMarkedAsAspirationalModal> {
    private static readonly HEADER_TEXT_TEMPLATE =
            "All set! Optionally, add skills related to the %s Job Role that you want to develop.";

    public assertModalHeaderText(jobRoleTitle: string): JobRoleMarkedAsAspirationalModalAssertions {
        Assert.assertEquals(this.page.getHeader().textContent(), String.format(JobRoleMarkedAsAspirationalModalAssertions.HEADER_TEXT_TEMPLATE, jobRoleTitle));
        return this;
    }

    public assertSkillIsInactive(skillName: string): JobRoleMarkedAsAspirationalModalAssertions {
        expect(this.page.skillCheckbox(skillName)).toBeDisabled();
        return this;
    }

    public assertWarningText(warningText: string): JobRoleMarkedAsAspirationalModalAssertions {
        expect(this.page.warning).toHaveText(warningText);
        return this;
    }
}
