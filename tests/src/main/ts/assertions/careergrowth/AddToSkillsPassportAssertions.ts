import { JobVacancyDetailsAssertions } from "assertions/careergrowth/jobs/JobVacancyDetailsAssertions";
import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { AddToSkillsPassportModalPage } from "pages/careergrowth/AddToSkillsPassportModalPage";

export class AddToSkillsPassportAssertions extends BaseAssertion<AddToSkillsPassportModalPage> {
    public assertSkillIsAlreadyCheckedOnTheList(skillLabel: string): AddToSkillsPassportAssertions {
        this.assertThat(this.page.passportSkillsColumn(skillLabel, 1).locator("//input[@type='checkbox']")).isChecked();
        return this;
    }

    public assertYourSkillLevelIs(skillLabel: string, expectedLevel: string): AddToSkillsPassportAssertions {
        this.assertThat(this.page.passportSkillsColumn(skillLabel, 3).locator("//select/option[@selected]")).hasText(expectedLevel);
        return this;
    }
    public assertJobVacancySkillLevelIs(skillLabel: string, expectedLevel: string): AddToSkillsPassportAssertions {
        this.assertThat(this.page.passportSkillsColumn(skillLabel, 2).locator("//p")).hasText(expectedLevel);
        return this;
    }
}
