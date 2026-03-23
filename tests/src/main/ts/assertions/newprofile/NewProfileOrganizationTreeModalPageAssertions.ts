import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { NewProfileOrganizationTreeModalPage } from "pages/newprofile/NewProfileOrganizationTreeModalPage";

export class NewProfileOrganizationTreeModalPageAssertions extends BaseAssertion<NewProfileOrganizationTreeModalPage> {

    public assertThatShowOrganizationTreeContainsUsersName(userName: string): NewProfileOrganizationTreeModalPageAssertions {
        this.assertThat(this.page.organizationTree).containsText(userName);
        this.page.logger.info("Successfully verified, that User Name is displayed");
        return this;
    }
}
