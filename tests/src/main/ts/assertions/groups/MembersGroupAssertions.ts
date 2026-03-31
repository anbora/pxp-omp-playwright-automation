// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { assertEquals, assertTrue } from "common/testing/runtime";
import { MembersGroupPage } from "pages/groups/MembersGroupPage";
import { expect } from "common/testing/playwright";

export class MembersGroupAssertions extends BaseAssertion<MembersGroupPage> {

    public assertThatBulkRemovalTabIsPresent(): MembersGroupAssertions {
        expect(this.page.bulkRemovalTab).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified that bulk removal tab is present");
        return this;
    }

    public assertThatTotalNumberOfGroupMembersIs(numberOfUsers: string): MembersGroupAssertions {
        expect(this.page.getTotalNumberOfGroupMembers()).toContainText(numberOfUsers);
        this.page.logger.info("Successfully verified that total number of group members is: " + numberOfUsers);
        return this;
    }

    public assertThatRemoveGroupMembersButtonIsNotVisible(): MembersGroupAssertions {
        expect(this.page.getRemoveGroupMembersButton()).not.toBeVisible();
        this.page.logger.info("Successfully verified that remove group members button is not present");
        return this;
    }

    public assertThatRemoveGroupMembersButtonIsVisible(): MembersGroupAssertions {
        expect(this.page.getRemoveGroupMembersButton()).toBeVisible();
        this.page.logger.info("Successfully verified that remove group members button is present");
        return this;
    }

    public assertThatNumberOfSelectedUsersIs(numberOfSelectedMembers: string, totalNumberOfMembers: string): MembersGroupAssertions {
        expect(this.page.getSelectedUsersText()).toHaveText(numberOfSelectedMembers + " out of " + totalNumberOfMembers + "  members selected");
        this.page.logger.info("Successfully verified that number of selected users is: " + numberOfSelectedMembers);
        return this;
    }

    public assertThatNumberOfUsersToBeRemovedInConfirmationModalIs(numberOfSelectedMembers: string, groupName: string): MembersGroupAssertions {
        expect(this.page.getConfirmationModalText()).toHaveText("You are about to remove " + numberOfSelectedMembers + " members(s) from " + groupName + " group");
        this.page.logger.info("Successfully verified that number of users to be removed is: " + numberOfSelectedMembers);
        return this;
    }

    public assertThatCheckboxIsDisabledNextToLoggedInUser(groupMemberName: string): MembersGroupAssertions {
        this.assertTrue(this.page.optionToSelect(groupMemberName).isDisabled());
        this.page.logger.info("Successfully verified that checkbox is disabled");
        return this;
    }

}
