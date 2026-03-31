// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { ProjectCardModal } from "pages/smartcard/ProjectCardModal";
import { expect } from "common/testing/playwright";

export class ProjectCardModalAssertions extends BaseAssertion<ProjectCardModal> {

    public assertThatShowPassingGradeToLearnersCheckboxIsDisabled(): ProjectCardModalAssertions {
        expect(this.page.showPassingGradeCheckbox).toBeDisabled();
        this.page.logger.info("Successfully verified that show passing grade to learners checkbox is disabled");
        return this;
    }

    public assertThatShowPassingGradeToLearnersCheckboxIsEnabled(): ProjectCardModalAssertions {
        expect(this.page.showPassingGradeCheckbox).toBeEnabled();
        this.page.logger.info("Successfully verified that show passing grade to learners checkbox is enabled");
        return this;
    }
    public assertThatArchiveContentCheckboxIsEnabled(): ProjectCardModalAssertions {
        expect(this.page.archiveContentCheckbox).toBeEnabled();
        this.page.logger.info("Successfully verified that archive this content checkbox is enabled");
        return this;
    }
    public assertThatArchiveContentDateIsAdded(date: string): ProjectCardModalAssertions {
        expect(this.page.getArchiveDate()).toContainText(date);
        this.page.logger.info("Successfully verified that automatically archive date is added");
        return this;
    }
}
