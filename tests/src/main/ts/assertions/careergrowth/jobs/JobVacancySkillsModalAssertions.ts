import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { JobVacancySkillModalPage } from "pages/careergrowth/jobs/JobVacancySkillModalPage";

export class JobVacancySkillsModalAssertions extends BaseAssertion<JobVacancySkillModalPage> {

    public assertThatVacancyHasProperNumberOfSkillsInSkillsPassport(userSkills: string): JobVacancySkillsModalAssertions {
        this.assertThat(this.page.skillsPassportNumberOfSkills(userSkills)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatVacancyHasProperNumberOfSkillsInSkillsPassport_SkillLevel(userSkills: string): JobVacancySkillsModalAssertions {
        this.assertThat(this.page.skillsPassportNumberOfSkills_SkillLevel(userSkills)).isVisible(this.isVisibleOptions);
        return this;
    }
}
