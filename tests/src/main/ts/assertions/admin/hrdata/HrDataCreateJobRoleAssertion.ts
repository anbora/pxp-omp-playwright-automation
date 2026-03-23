import { BaseAssertion } from "common/BaseAssertion";
import { CreateJobRolePage } from "pages/admin/CreateJobRolePage";

export class HrDataCreateJobRoleAssertion extends BaseAssertion<CreateJobRolePage> {

    public assertThatLocationFieldIsDisplayed(): HrDataCreateJobRoleAssertion {
        this.assertThat(this.page.locationField).hasCount(1);
        this.page.logger.info("Successfully verified location field is displayed");
        return this;
    }

    public assertThatMaxNumberOfSkillsReachedMessageIsDisplayed(): HrDataCreateJobRoleAssertion {
        this.assertThat(this.page.maximumNumberOfSkillsMessage).containsText("You have already added max allowed skill.", this.containsTextOptions);
        this.page.logger.info("Successfully verified data. Warning message is showing");
        return this;
    }

    public assertThatExternalIdTextIsDisplayed(): HrDataCreateJobRoleAssertion {
        this.assertThat(this.page.externalIdText).containsText("System will auto generate and assign an id if left blank", this.containsTextOptions);
        this.page.logger.info("Successfully verified data. Warning message is showing");
        return this;
    }
}
