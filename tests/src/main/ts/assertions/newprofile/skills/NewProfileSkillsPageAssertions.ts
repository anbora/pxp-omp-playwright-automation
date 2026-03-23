import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { NewProfileSkillPage } from "pages/newprofile/skills/NewProfileSkillPage";

export class NewProfileSkillsPageAssertions extends BaseAssertion<NewProfileSkillPage> {

    public assertThatSectionIsVisible(sectionName: string): NewProfileSkillsPageAssertions {
        this.assertThat(this.page.headerOfSection(sectionName)).isVisible();
        this.page.logger.info("Successfully verified that section " + sectionName + " is visible");
        return this;
    }
}
