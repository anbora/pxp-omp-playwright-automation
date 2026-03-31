// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { OrganizationOperationPage } from "skillstudio/pages/OrganizationOperationPage";
import { expect } from "common/testing/playwright";

export class OrganizationOperationAssertions extends BaseAssertion<OrganizationOperationPage> {

    public assertThatSelectedSpaceIsVisible(org_name: string): OrganizationOperationAssertions {
        expect(this.page.verification_organization_name_loc(org_name)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatUserHaveSuperAdminAccess(): OrganizationOperationAssertions {
        expect(this.page.verification_super_admin_role).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatChangeSpaceButtonIsVisible(): OrganizationOperationAssertions {
        expect(this.page.Change_Organization_Button_Loc).toBeVisible(this.isVisibleOptions);
        return this;
    }
}
