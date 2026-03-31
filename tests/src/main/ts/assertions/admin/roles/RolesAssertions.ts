// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { assertFalse, assertTrue } from "common/testing/runtime";
import { RolesAdminPage } from "pages/admin/roles/RolesAdminPage";

export class RolesAssertions extends BaseAssertion<RolesAdminPage> {

    public assertThatPermissionIsSwitchOff(permissionName: string): RolesAssertions {
        this.assertFalse(this.page.checkboxPermission(permissionName).isChecked(), "Permission '" + permissionName + "' should be unchecked!");
        this.page.logger.info("Successfully verified that permission is switched off");
        return this;
    }

    public assertThatPermissionIsSwitchOn(permissionName: string): RolesAssertions {
        this.assertTrue(this.page.checkboxPermission(permissionName).isChecked(), "Permission '" + permissionName + "' should be checked!");
        this.page.logger.info("Successfully verified that permission is switched on");
        return this;
    }

    public assertThatHelpSectionIsVisibleInAdminPanel(): RolesAssertions {
        this.assertTrue(this.page.helpSection.isVisible(), "Help section should be visible!");
        this.page.logger.info("Successfully verified that help section is visible in admin panel");
        return this;
    }

    public assertThatHelpSectionIsInvisibleInAdminPanel(): RolesAssertions {
        this.assertFalse(this.page.helpSection.isVisible(), "Help section should be invisible!");
        this.page.logger.info("Successfully verified that help section is invisible in admin panel");
        return this;
    }
}
