import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { AddEditBadgeModalPage } from "pages/skillspassport/AddEditBadgeModalPage";

export class BadgeModalPageAssertions extends BaseAssertion<AddEditBadgeModalPage> {

    public assertThatBadgeIsAdded(badgeName: string): BadgeModalPageAssertions {
        this.assertThat(this.page.getBadgeCard()).containsText(badgeName);
        this.page.logger.info("Successfully verified that badge is added");
        return this;
    }

    public assertThatBadgeIsDeleted(): BadgeModalPageAssertions {
        this.assertThat(this.page.getBadgeCard()).isHidden();
        this.page.logger.info("Successfully verified that badge is deleted");
        return this;
    }

    public assertThatBadgeContainsIDNumber(idNumber: string): BadgeModalPageAssertions {
        this.assertThat(this.page.getBadgeID()).hasValue(idNumber);
        this.page.logger.info("Successfully verified that badge contains badge ID");
        return this;
    }

    public assertThatBadgeContainsURLNumber(urlName: string): BadgeModalPageAssertions {
        this.assertThat(this.page.getBadgeURL()).hasValue(urlName);
        this.page.logger.info("Successfully verified that badge contains URL Name");
        return this;
    }
}
