// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { CreateJobRolePage } from "pages/admin/CreateJobRolePage";
import { expect } from "common/testing/playwright";

export class HrDataCreateJobRoleAssertion extends BaseAssertion<CreateJobRolePage> {

    public assertThatLocationFieldIsDisplayed(): HrDataCreateJobRoleAssertion {
        expect(this.page.locationField).toHaveCount(1);
        this.page.logger.info("Successfully verified location field is displayed");
        return this;
    }

    public assertThatMaxNumberOfSkillsReachedMessageIsDisplayed(): HrDataCreateJobRoleAssertion {
        expect(this.page.maximumNumberOfSkillsMessage).toContainText("You have already added max allowed skill.", this.containsTextOptions);
        this.page.logger.info("Successfully verified data. Warning message is showing");
        return this;
    }

    public assertThatExternalIdTextIsDisplayed(): HrDataCreateJobRoleAssertion {
        expect(this.page.externalIdText).toContainText("System will auto generate and assign an id if left blank", this.containsTextOptions);
        this.page.logger.info("Successfully verified data. Warning message is showing");
        return this;
    }
}
