import { HrDataConfigurationAssertion } from "assertions/admin/hrdata/configuration/HrDataConfigurationAssertion";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

export class HrDataConfigurationAssociationAndVisibilityTest extends BaseRestTest {

    private hrData: string = "HR Data";
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public configurationAssociation(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .goToAdminPanel()
                .selectMainTab(this.hrData)
                .openMenuForHrConfiguration()
                .clickOrganizationConfiguration()
                .check(HrDataConfigurationAssertion)
                    .assertThatAssociationLabelIsDisplayed("Association")
                    .assertThatSpecifyAssociationLabelIsDisplayed()
                .endAssertion()
                .clickAssociationType()
                .check(HrDataConfigurationAssertion)
                    .assertThatAssociationTypesLabelIsDisplayed("Job Vacancy")
                    .assertThatAssociationTypesLabelIsDisplayed("Job Role")
                    .assertThatAssociationTypesLabelIsDisplayed("Project")
                    .assertThatAssociationTypesLabelIsDisplayed("Career preference")
                    .assertThatAssociationTypesLabelIsDisplayed("User")
                .endAssertion();
    }

    public configurationVisibility(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToAdminPanel()
                .selectMainTab(this.hrData)
                .openMenuForHrConfiguration()
                .clickOrganizationConfiguration()
                .check(HrDataConfigurationAssertion)
                    .assertThatVisibilityLabelIsDisplayed()
                    .assertThatSpecifyVisibilityLabelIsDisplayed()
                .endAssertion()
                .clickVisibilityType()
                .check(HrDataConfigurationAssertion)
                    .assertThatVisibilityTypesLabelLoopIsDisplayed("Job vacancy filter","Job Vacancy filter")
                    .assertThatVisibilityTypesLabelLoopIsDisplayed("Job vacancy details","Job Vacancy details")
                    .assertThatVisibilityTypesLabelLoopIsDisplayed("Job role filter","Job Role details")
                    .assertThatVisibilityTypesLabelIsDisplayed("Project filter")
                    .assertThatVisibilityTypesLabelIsDisplayed("Project details")
                    .assertThatVisibilityTypesLabelIsDisplayed("Mentor profile")
                    .assertThatVisibilityTypesLabelIsDisplayed("Mentorship filter")
                    .assertThatVisibilityTypesLabelIsDisplayed("Profile details")
                    .assertThatVisibilityTypesLabelIsDisplayed("User management")
                .endAssertion();
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
