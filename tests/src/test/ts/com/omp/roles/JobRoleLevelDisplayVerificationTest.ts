import { RoleDetailsAssertions } from "assertions/careergrowth/roles/RoleDetailsAssertions";
import { LandingPageAssertions } from "assertions/landing/LandingPageAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { AddWorkHistoryToCareerProfileScenario } from "scenarios/jobs/AddWorkHistoryToCareerProfileScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddBasicCareerPreferencesForUser } from "scenarios/profile/AddBasicCareerPreferencesForUser";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";
import { AddSkillToNewUserScenario_SkillLevel } from "scenarios/profile/AddSkillToNewUserScenario_SkillLevel";

export class JobRoleLevelDisplayVerificationTest extends BaseRestTest {

    private hrData: string = "HR Data";
    private javaDeveloper: string = "Java developer";
    private lumesse: string = "Lumesse";
    private coding: string = "coding";
    private october: string = "Oct";
    private year_2017: string = "2017";
    private june: string = "Jun";
    private year_2022: string = "2022";
    private user1: UserModel;
    private user2: UserModel;
    private user3: UserModel;

    public initialize(): void {
      this.user1 = this.createUser(true);
        this.wait(10000);
      this.user2 = this.createUser(true);
        this.wait(10000);
      this.user3 = this.createUser(true);
    }

    public jobRoleLevelEngagementOff(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user1))
                .goToAdminPanel()
                .selectMainTab(this.hrData)
                .openMenuForHrConfiguration()
                .gotoStandardFieldPage()
                .clickInLevelFieldEditIcon()
                .clickDeleteJobRoleEngagement()
                .clickSaveButtonEditLevelModal()
                .clickSaveButtonStandardFieldsTab();
    }

    public jobRoleLevelShouldNotBeDisplayed(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user2))
                .run(new AddRoleAndFamilyToNewUserScenario(this.user2.name))
                .run(new AddSkillToNewUserScenario_SkillLevel())
                .run(new AddBasicCareerPreferencesForUser())
                .clickUpdateCareerProfileLink()
                .run(new AddWorkHistoryToCareerProfileScenario(this.javaDeveloper, this.lumesse, this.coding, this.october, this.year_2017, this.june, this.year_2022))
                .clickSaveAndContinueButton()
                .clickXButton()
                .goToRolesPageViaCard()
                .markFirstSuggestedRoleAsAspirational()
                .goToLandingPage()
                .check(LandingPageAssertions)
                    .assertThatLevelEngagementIsNotDisplayedOnLandingPage()
                .endAssertion()
                .openNextCareerMilestoneRole()
                .check(RoleDetailsAssertions)
                    .assertThatLevelEngagementIsNotDisplayedInDetailsPage()
                .endAssertion()
                .goToAdminPanel()
                .selectMainTab(this.hrData)
                .openMenuForHrConfiguration()
                .gotoStandardFieldPage()
                .clickInLevelFieldEditIcon()
                .clickAddJobRoleEngagement()
                .clickSaveButtonEditLevelModal()
                .clickSaveButtonStandardFieldsTab();
    }

    public jobRoleLevelShouldBeDisplayed(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user3))
                .run(new AddRoleAndFamilyToNewUserScenario(this.user3.name))
                .run(new AddSkillToNewUserScenario_SkillLevel())
                .run(new AddBasicCareerPreferencesForUser())
                .clickUpdateCareerProfileLink()
                .run(new AddWorkHistoryToCareerProfileScenario(this.javaDeveloper, this.lumesse, this.coding, this.october, this.year_2017, this.june, this.year_2022))
                .clickSaveAndContinueButton()
                .clickXButton()
                .goToRolesPageViaCard()
                .markFirstSuggestedRoleAsAspirational()
                .goToLandingPage()
                .check(LandingPageAssertions)
                    .assertThatLevelEngagementIsDisplayedOnLandingPage()
                .endAssertion()
                .openNextCareerMilestoneRole()
                .check(RoleDetailsAssertions)
                    .assertThatLevelEngagementIsDisplayedInDetailsPage()
                .endAssertion();
    }

    public afterClass(): void {
        this.deleteUser(this.user1);
        this.deleteUser(this.user2);
        this.deleteUser(this.user3);
    }
}
