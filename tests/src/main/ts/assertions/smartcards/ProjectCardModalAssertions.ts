import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { ProjectCardModal } from "pages/smartcard/ProjectCardModal";

export class ProjectCardModalAssertions extends BaseAssertion<ProjectCardModal> {

    public assertThatShowPassingGradeToLearnersCheckboxIsDisabled(): ProjectCardModalAssertions {
        this.assertThat(this.page.showPassingGradeCheckbox).isDisabled();
        this.page.logger.info("Successfully verified that show passing grade to learners checkbox is disabled");
        return this;
    }

    public assertThatShowPassingGradeToLearnersCheckboxIsEnabled(): ProjectCardModalAssertions {
        this.assertThat(this.page.showPassingGradeCheckbox).isEnabled();
        this.page.logger.info("Successfully verified that show passing grade to learners checkbox is enabled");
        return this;
    }
    public assertThatArchiveContentCheckboxIsEnabled(): ProjectCardModalAssertions {
        this.assertThat(this.page.archiveContentCheckbox).isEnabled();
        this.page.logger.info("Successfully verified that archive this content checkbox is enabled");
        return this;
    }
    public assertThatArchiveContentDateIsAdded(date: string): ProjectCardModalAssertions {
        this.assertThat(this.page.getArchiveDate()).containsText(date);
        this.page.logger.info("Successfully verified that automatically archive date is added");
        return this;
    }
}
