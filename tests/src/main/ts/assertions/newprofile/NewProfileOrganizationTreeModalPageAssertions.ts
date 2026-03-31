// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { NewProfileOrganizationTreeModalPage } from "pages/newprofile/NewProfileOrganizationTreeModalPage";
import { expect } from "common/testing/playwright";

export class NewProfileOrganizationTreeModalPageAssertions extends BaseAssertion<NewProfileOrganizationTreeModalPage> {

    public assertThatShowOrganizationTreeContainsUsersName(userName: string): NewProfileOrganizationTreeModalPageAssertions {
        expect(this.page.organizationTree).toContainText(userName);
        this.page.logger.info("Successfully verified, that User Name is displayed");
        return this;
    }
}
