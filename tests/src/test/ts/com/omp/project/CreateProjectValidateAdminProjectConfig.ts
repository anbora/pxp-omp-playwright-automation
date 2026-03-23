import { OpportunityMarketplaceProjectAssertions } from "assertions/admin/OpportunityMarketplaceProjectAssertions";
import { CreateProjectAssertions, ManageProjectAssertions, ProjectDetailsAssertions, ProjectDiscoveryAssertions, ProjectMePageAssertions } from "assertions/careergrowth/project";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LandingPage } from "pages/landing/LandingPage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";

export class CreateProjectValidateAdminProjectConfig extends BaseRestTest {

    private projectTitle: string = "AdminConfig" + UUID.randomUUID();
	private projectDesc: string = "Description Random";
    private user2: UserModel;

    public initialize(): void {
      this.user2 = this.createUser(true);
        this.wait(10000);
    }

    public setDurationToBeRequiredAndTimezoneToBeHidden(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.getUserByName("Rajendran Sridhar")))
                .goToAdminPanel()
                .selectMainTab("Talent Marketplace")
                .openMenuForProjectOpportunityMarketplace()
                .clickStandardFieldsButton()
                .check(OpportunityMarketplaceProjectAssertions)
                    .assertThatAdminProjectConfigPageLoads()
                .endAssertion()
                .toggleTimezonesFieldShowHideToOff()
                .toggleTimeCommitmentRequiredToOn()
                .clickSaveButtonStandardFieldTab();
    }

    public createProjectValidateAdminProjectConfig(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user2))
                .run(new AddRoleAndFamilyToNewUserScenario(this.user2.name))
                .goDirectlyTo(LandingPage)
                .clickCreateButton()
                .clickCreateProjectButton()
                .fillInProjectTitle(this.projectTitle)
                .fillInProjectDescription(this.projectDesc)
                .selectAProjectThumbnail()
                .clickPublishButton()
                .check(CreateProjectAssertions)
                    .assertThatRequiredFieldPromptIsDisplayed("Must provide a time commitment")
                    .assertTimeZonesFieldIsNotDisplayed()
                .endAssertion();
    }

    public resetDurationAndTimezoneToDefaultAndSave(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.getUserByName("Rajendran Sridhar")))
                .goToAdminPanel()
                .selectMainTab("Talent Marketplace")
                .openMenuForProjectOpportunityMarketplace()
                .clickStandardFieldsButton()
                .check(OpportunityMarketplaceProjectAssertions)
                    .assertThatAdminProjectConfigPageLoads()
                .endAssertion()
                .toggleTimezonesFieldShowHideToOn()
                .toggleTimeCommitmentRequiredToOff()
                .clickSaveButtonStandardFieldTab();
    }

    public afterClass(): void {

      this.deleteUser(this.user2);

    }
}
