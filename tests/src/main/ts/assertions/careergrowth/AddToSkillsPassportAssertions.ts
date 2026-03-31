// @ts-nocheck
import { JobVacancyDetailsAssertions } from "assertions/careergrowth/jobs/JobVacancyDetailsAssertions";
import { BaseAssertion } from "common/BaseAssertion";
import { AddToSkillsPassportModalPage } from "pages/careergrowth/AddToSkillsPassportModalPage";
import { expect } from "common/testing/playwright";

export class AddToSkillsPassportAssertions extends BaseAssertion<AddToSkillsPassportModalPage> {
    public assertSkillIsAlreadyCheckedOnTheList(skillLabel: string): AddToSkillsPassportAssertions {
        expect(this.page.passportSkillsColumn(skillLabel, 1).locator("//input[@type='checkbox']")).toBeChecked();
        return this;
    }

    public assertYourSkillLevelIs(skillLabel: string, expectedLevel: string): AddToSkillsPassportAssertions {
        expect(this.page.passportSkillsColumn(skillLabel, 3).locator("//select/option[@selected]")).toHaveText(expectedLevel);
        return this;
    }
    public assertJobVacancySkillLevelIs(skillLabel: string, expectedLevel: string): AddToSkillsPassportAssertions {
        expect(this.page.passportSkillsColumn(skillLabel, 2).locator("//p")).toHaveText(expectedLevel);
        return this;
    }
}
