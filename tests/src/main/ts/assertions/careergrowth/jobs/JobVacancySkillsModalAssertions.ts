// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { JobVacancySkillModalPage } from "pages/careergrowth/jobs/JobVacancySkillModalPage";
import { expect } from "common/testing/playwright";

export class JobVacancySkillsModalAssertions extends BaseAssertion<JobVacancySkillModalPage> {

    public assertThatVacancyHasProperNumberOfSkillsInSkillsPassport(userSkills: string): JobVacancySkillsModalAssertions {
        expect(this.page.skillsPassportNumberOfSkills(userSkills)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatVacancyHasProperNumberOfSkillsInSkillsPassport_SkillLevel(userSkills: string): JobVacancySkillsModalAssertions {
        expect(this.page.skillsPassportNumberOfSkills_SkillLevel(userSkills)).toBeVisible(this.isVisibleOptions);
        return this;
    }
}
