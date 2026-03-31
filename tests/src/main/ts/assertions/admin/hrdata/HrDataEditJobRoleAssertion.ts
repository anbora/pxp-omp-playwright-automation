// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { EditJobRolePage } from "pages/admin/users/EditJobRolePage";
import { expect } from "common/testing/playwright";

export class HrDataEditJobRoleAssertion extends BaseAssertion <EditJobRolePage>{

    private value1: string = "1";
    private value2: string = "2";
    private value3: string = "3";
    private value4: string = "4";

    public assertThatLocationIsDisplayed(): HrDataEditJobRoleAssertion {
        expect(this.page.selectedLocationFieldValue).toHaveCount(1);
        this.page.logger.info("Successfully verified data location field found");
        return this;
    }

    public assertThatRoleSummaryIsDisplayed(roleSummary: string): HrDataEditJobRoleAssertion {
        expect(this.page.enterRoleSummary).toContainText(roleSummary);
        this.page.logger.info("Successfully verified data Role Summary is displayed");
        return this;
    }

    public assertThatAdditionalDescriptionIsDisplayed(additionalDescription: string): HrDataEditJobRoleAssertion {
        expect(this.page.enterAdditionalDescription).toContainText(additionalDescription);
        this.page.logger.info("Successfully verified data Additional Description is displayed");
        return this;
    }

    public assertThatDescriptionIsDisplayed(description: string): HrDataEditJobRoleAssertion {
        expect(this.page.enterRoleDescription).toContainText(description);
        this.page.logger.info("Successfully verified data Description is displayed");
        return this;
    }

    public assertThatLocationsAreDisplayed(): HrDataEditJobRoleAssertion {
        expect(this.page.locationValue(value1)).toBeVisible(this.isVisibleOptions);
        expect(this.page.locationValue(value2)).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data locations are displayed");
        return this;
    }

    public assertThatAdditionalLocationsAreDisplayed(): HrDataEditJobRoleAssertion {
        expect(this.page.locationValue(value3)).toBeVisible(this.isVisibleOptions);
        expect(this.page.locationValue(value4)).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data  additional locations are displayed");
        return this;
    }

    public assertThatMaxNumberOfSkillsReachedMessageIsDisplayed(): HrDataEditJobRoleAssertion {
        expect(this.page.maximumNumberOfSkillsMessage).toContainText("You have already added max allowed skill.", this.containsTextOptions);
        this.page.logger.info("Successfully verified data. Warning message is showing");
        return this;
    }
}
