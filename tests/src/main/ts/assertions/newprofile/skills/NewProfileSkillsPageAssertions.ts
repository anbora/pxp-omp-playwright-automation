// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { NewProfileSkillPage } from "pages/newprofile/skills/NewProfileSkillPage";
import { expect } from "common/testing/playwright";

export class NewProfileSkillsPageAssertions extends BaseAssertion<NewProfileSkillPage> {

    public assertThatSectionIsVisible(sectionName: string): NewProfileSkillsPageAssertions {
        expect(this.page.headerOfSection(sectionName)).toBeVisible();
        this.page.logger.info("Successfully verified that section " + sectionName + " is visible");
        return this;
    }
}
