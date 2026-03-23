import { HrDataEditOrganizationAssertion } from "assertions/admin/hrdata/HrDataEditOrganizationAssertion";
import { HrDataOrganizationAssertions } from "assertions/admin/hrdata/HrDataOrganizationAssertions";
import { HrDataOrganizationTranslationAssertion } from "assertions/admin/hrdata/HrDataOrganizationTranslationAssertion";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

export class HrDataOrganizationTest extends BaseRestTest {

    private user: UserModel;
    private hrData: string = "HR Data";
    private organizationName: string = UUID.randomUUID().toString();
    private organizationNameAfterEdit: string = UUID.randomUUID().toString();
    private organizationNameTranslation: string = UUID.randomUUID().toString();
    private externalSystemId: string = UUID.randomUUID().toString();
    private organizationType: string = "Department";

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public createAndEditOrganizationAndTranslationViaAdminPage(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .goToAdminPanel()
                .selectMainTab(this.hrData)
                .openMenuForOrganizationHRData()
                .clickAddOrganizationButton()
                .enterOrganizationName(this.organizationName)
                .selectOrganizationType(this.organizationType)
                .typeExternalSystemId(this.externalSystemId)
                .clickSaveButton()
                .clickSearchOrganization(this.organizationName)
                .check(HrDataOrganizationAssertions)
                    .assertThatOrganizationIsDisplayedOnTheList(this.organizationName)
                .endAssertion()
                .clickEditOrganizationButton()
                .enterOrganizationName(this.organizationNameAfterEdit)
                .clickSaveButton()
                .clickSearchOrganization(this.organizationNameAfterEdit)
                .check(HrDataEditOrganizationAssertion)
                    .assertThatOrganizationIsDisplayedOnTheList(this.organizationNameAfterEdit)
                .endAssertion()
                .clickTranslationButton()
                .clickTranslationDropdown()
                .typeEnterOrganizationName(this.organizationNameTranslation)
                .clickSaveButton()
                .clickSearchOrganization(this.organizationNameAfterEdit)
                .clickTranslationButton()
                .clickTranslationDropdown()
                .check(HrDataOrganizationTranslationAssertion)
                    .assertThatOrganizationTranslationIsDisplayed(this.organizationNameTranslation)
                .endAssertion()
                .clickSaveButton();
    }
}
