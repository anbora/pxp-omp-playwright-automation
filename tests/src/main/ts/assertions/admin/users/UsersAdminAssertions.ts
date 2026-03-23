import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { UsersAdminPage } from "pages/admin/users/UsersAdminPage";

export class UsersAdminAssertions extends BaseAssertion<UsersAdminPage> {

    public assertThatUserEmailIsOnTheList(userEmail: string): UsersAdminAssertions {
        this.assertThat(this.page.userEmailInTable(userEmail)).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified that user email in visible on the list.");
        return this;
    }

    public assertThatUserListIsEmpty(): UsersAdminAssertions {
        this.assertThat(this.page.emptyListLabel).containsText("No data available.", this.containsTextOptions);
        this.page.logger.info("Successfully verified that user list is empty.");
        return this;
    }

    public assertThatUserHasAdminRoleAssigned(): UsersAdminAssertions {
        this.assertThat(this.page.currentRolesField()).containsText("admin", this.containsTextOptions);
        this.page.logger.info("Successfully verified that admin role is assigned to user");
        return this;
    }

    public assertThatUserHasMemberRoleAssigned(): UsersAdminAssertions {
        this.assertThat(this.page.currentRolesField()).containsText("member", this.containsTextOptions);
        this.page.logger.info("Successfully verified that admin role is assigned to user");
        return this;
    }

    public assertThatLocationIsVisibleForUserManagement(): UsersAdminAssertions {
        this.assertThat(this.page.userManagementLocation()).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatLocationIsNotVisibleForUserManagement(): UsersAdminAssertions {
        this.assertThat(this.page.userManagementLocation()).isHidden();
        return this;
    }
}
