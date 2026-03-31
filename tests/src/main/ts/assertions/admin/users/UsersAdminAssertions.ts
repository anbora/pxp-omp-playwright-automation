// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { UsersAdminPage } from "pages/admin/users/UsersAdminPage";
import { expect } from "common/testing/playwright";

export class UsersAdminAssertions extends BaseAssertion<UsersAdminPage> {

    public assertThatUserEmailIsOnTheList(userEmail: string): UsersAdminAssertions {
        expect(this.page.userEmailInTable(userEmail)).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified that user email in visible on the list.");
        return this;
    }

    public assertThatUserListIsEmpty(): UsersAdminAssertions {
        expect(this.page.emptyListLabel).toContainText("No data available.", this.containsTextOptions);
        this.page.logger.info("Successfully verified that user list is empty.");
        return this;
    }

    public assertThatUserHasAdminRoleAssigned(): UsersAdminAssertions {
        expect(this.page.currentRolesField()).toContainText("admin", this.containsTextOptions);
        this.page.logger.info("Successfully verified that admin role is assigned to user");
        return this;
    }

    public assertThatUserHasMemberRoleAssigned(): UsersAdminAssertions {
        expect(this.page.currentRolesField()).toContainText("member", this.containsTextOptions);
        this.page.logger.info("Successfully verified that admin role is assigned to user");
        return this;
    }

    public assertThatLocationIsVisibleForUserManagement(): UsersAdminAssertions {
        expect(this.page.userManagementLocation()).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatLocationIsNotVisibleForUserManagement(): UsersAdminAssertions {
        expect(this.page.userManagementLocation()).toBeHidden();
        return this;
    }
}
