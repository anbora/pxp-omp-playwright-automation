import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { EditJobRolePage } from "pages/admin/users/EditJobRolePage";

export class HrDataEditJobRoleAssertion extends BaseAssertion <EditJobRolePage>{

    private value1: string = "1";
    private value2: string = "2";
    private value3: string = "3";
    private value4: string = "4";

    public assertThatLocationIsDisplayed(): HrDataEditJobRoleAssertion {
        this.assertThat(this.page.selectedLocationFieldValue).hasCount(1);
        this.page.logger.info("Successfully verified data location field found");
        return this;
    }

    public assertThatRoleSummaryIsDisplayed(roleSummary: string): HrDataEditJobRoleAssertion {
        this.assertThat(this.page.enterRoleSummary).containsText(roleSummary);
        this.page.logger.info("Successfully verified data Role Summary is displayed");
        return this;
    }

    public assertThatAdditionalDescriptionIsDisplayed(additionalDescription: string): HrDataEditJobRoleAssertion {
        this.assertThat(this.page.enterAdditionalDescription).containsText(additionalDescription);
        this.page.logger.info("Successfully verified data Additional Description is displayed");
        return this;
    }

    public assertThatDescriptionIsDisplayed(description: string): HrDataEditJobRoleAssertion {
        this.assertThat(this.page.enterRoleDescription).containsText(description);
        this.page.logger.info("Successfully verified data Description is displayed");
        return this;
    }

    public assertThatLocationsAreDisplayed(): HrDataEditJobRoleAssertion {
        this.assertThat(this.page.locationValue(value1)).isVisible(this.isVisibleOptions);
        this.assertThat(this.page.locationValue(value2)).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data locations are displayed");
        return this;
    }

    public assertThatAdditionalLocationsAreDisplayed(): HrDataEditJobRoleAssertion {
        this.assertThat(this.page.locationValue(value3)).isVisible(this.isVisibleOptions);
        this.assertThat(this.page.locationValue(value4)).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data  additional locations are displayed");
        return this;
    }

    public assertThatMaxNumberOfSkillsReachedMessageIsDisplayed(): HrDataEditJobRoleAssertion {
        this.assertThat(this.page.maximumNumberOfSkillsMessage).containsText("You have already added max allowed skill.", this.containsTextOptions);
        this.page.logger.info("Successfully verified data. Warning message is showing");
        return this;
    }
}
