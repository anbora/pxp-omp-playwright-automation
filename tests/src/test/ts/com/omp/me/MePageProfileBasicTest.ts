import { MePageAssertions } from "assertions/me/MePageAssertions";
import { MePageProfileTabAssertions } from "assertions/me/MePageProfileTabAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

export class MePageProfileBasicTest extends BaseRestTest {

    private user: UserModel;
    private skillName: string = "microsoft excel";

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public jobRoleConfigurationPage(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .goToMePageProfile()
                .check(MePageAssertions)
                    .assertThatViewDetailsButtonIsDisplayed()
                    .assertThatSkillsAssessmentButtonIsDisplayed()
                    .assertThatViewPublicProfileIconIsDisplayed()
                    .assertThatEditProfileButtonIsDisplayed()
                    .assertThatPointsLabelIsDisplayed()
                .endAssertion()
                .clickProfileTab()
                .check(MePageProfileTabAssertions)
                    .assertThatInterestsLabelIsDisplayed()
                .endAssertion()
                .clickAddLearningGoals()
                .typeEnterSkill(this.skillName)
                .clickSelectLevelDropdown()
                .clickAddSkillButton()
                .clickSaveButton()
                .check(MePageProfileTabAssertions)
                    .assertThatAddedSkillsValueIsDisplayedOnTheList(this.skillName)
                    .assertThatTotalLearningHoursIsDisplayed()
                    .assertThatInProgressLabelIsDisplayed()
                    .assertThatOpenLearningPlanDisplayed()
                    .assertThatMySkillsAssessmentIsDisplayed()
                    .assertThatOpenSkillsAssessmentIsDisplayed()
                    .assertThatMyGroupsIsDisplayed()
                    .assertThatViewAllGroupsButtonIsDisplayed()
                    .assertThatMyChannelsIsDisplayed()
                    .assertThatViewAllChannelsButtonIsDisplayed()
                .endAssertion();
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
