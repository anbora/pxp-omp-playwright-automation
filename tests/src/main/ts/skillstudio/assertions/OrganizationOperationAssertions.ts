import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { OrganizationOperationPage } from "skillstudio/pages/OrganizationOperationPage";

export class OrganizationOperationAssertions extends BaseAssertion<OrganizationOperationPage> {

    public assertThatSelectedSpaceIsVisible(org_name: string): OrganizationOperationAssertions {
        this.assertThat(this.page.verification_organization_name_loc(org_name)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatUserHaveSuperAdminAccess(): OrganizationOperationAssertions {
        this.assertThat(this.page.verification_super_admin_role).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatChangeSpaceButtonIsVisible(): OrganizationOperationAssertions {
        this.assertThat(this.page.Change_Organization_Button_Loc).isVisible(this.isVisibleOptions);
        return this;
    }
}
