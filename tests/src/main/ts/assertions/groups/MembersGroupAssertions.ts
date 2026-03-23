import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { assertEquals, assertTrue } from "common/testing/runtime";
import { MembersGroupPage } from "pages/groups/MembersGroupPage";

export class MembersGroupAssertions extends BaseAssertion<MembersGroupPage> {

    public assertThatBulkRemovalTabIsPresent(): MembersGroupAssertions {
        this.assertThat(this.page.bulkRemovalTab).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified that bulk removal tab is present");
        return this;
    }

    public assertThatTotalNumberOfGroupMembersIs(numberOfUsers: string): MembersGroupAssertions {
        this.assertThat(this.page.getTotalNumberOfGroupMembers()).containsText(numberOfUsers);
        this.page.logger.info("Successfully verified that total number of group members is: " + numberOfUsers);
        return this;
    }

    public assertThatRemoveGroupMembersButtonIsNotVisible(): MembersGroupAssertions {
        this.assertThat(this.page.getRemoveGroupMembersButton()).not().isVisible();
        this.page.logger.info("Successfully verified that remove group members button is not present");
        return this;
    }

    public assertThatRemoveGroupMembersButtonIsVisible(): MembersGroupAssertions {
        this.assertThat(this.page.getRemoveGroupMembersButton()).isVisible();
        this.page.logger.info("Successfully verified that remove group members button is present");
        return this;
    }

    public assertThatNumberOfSelectedUsersIs(numberOfSelectedMembers: string, totalNumberOfMembers: string): MembersGroupAssertions {
        this.assertThat(this.page.getSelectedUsersText()).hasText(numberOfSelectedMembers + " out of " + totalNumberOfMembers + "  members selected");
        this.page.logger.info("Successfully verified that number of selected users is: " + numberOfSelectedMembers);
        return this;
    }

    public assertThatNumberOfUsersToBeRemovedInConfirmationModalIs(numberOfSelectedMembers: string, groupName: string): MembersGroupAssertions {
        this.assertThat(this.page.getConfirmationModalText()).hasText("You are about to remove " + numberOfSelectedMembers + " members(s) from " + groupName + " group");
        this.page.logger.info("Successfully verified that number of users to be removed is: " + numberOfSelectedMembers);
        return this;
    }

    public assertThatCheckboxIsDisabledNextToLoggedInUser(groupMemberName: string): MembersGroupAssertions {
        this.assertTrue(this.page.optionToSelect(groupMemberName).isDisabled());
        this.page.logger.info("Successfully verified that checkbox is disabled");
        return this;
    }

}
