// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { AddEditBadgeModalPage } from "pages/skillspassport/AddEditBadgeModalPage";
import { expect } from "common/testing/playwright";

export class BadgeModalPageAssertions extends BaseAssertion<AddEditBadgeModalPage> {

    public assertThatBadgeIsAdded(badgeName: string): BadgeModalPageAssertions {
        expect(this.page.getBadgeCard()).toContainText(badgeName);
        this.page.logger.info("Successfully verified that badge is added");
        return this;
    }

    public assertThatBadgeIsDeleted(): BadgeModalPageAssertions {
        expect(this.page.getBadgeCard()).toBeHidden();
        this.page.logger.info("Successfully verified that badge is deleted");
        return this;
    }

    public assertThatBadgeContainsIDNumber(idNumber: string): BadgeModalPageAssertions {
        expect(this.page.getBadgeID()).toHaveValue(idNumber);
        this.page.logger.info("Successfully verified that badge contains badge ID");
        return this;
    }

    public assertThatBadgeContainsURLNumber(urlName: string): BadgeModalPageAssertions {
        expect(this.page.getBadgeURL()).toHaveValue(urlName);
        this.page.logger.info("Successfully verified that badge contains URL Name");
        return this;
    }
}
