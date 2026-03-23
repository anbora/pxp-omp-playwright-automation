import { JobRoleMarkedAsAspirationalModalAssertions } from "assertions/careergrowth/roles/JobRoleMarkedAsAspirationalModalAssertions";
import { SetYourLearningGoalsAssertions } from "assertions/careergrowth/SetYourLearningGoalsAssertions";
import { MePageAssertions } from "assertions/me/MePageAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddSkillToCareerProfileScenario } from "scenarios/profile/AddSkillToCareerProfileScenario";

export class SettingLearningGoalsAfterMarkingRoleAsAspirationalTest extends BaseRestTest {
    public static readonly ALL_SKILLS: string = "Skill";
    private firstUser: UserModel;
    private secondUser: UserModel;
    private nopolitan6: string = "Nopolitan6";
    private nopolitan5: string = "Nopolitan5";
    private nopolitan2FullName: string = "Subway -  Nopolitan2";
    private nopolitan2: string = "Nopolitan2";
    private pathA: string = "Path A";
    private noPath: string = "No path selection";

    public initialize(): void {
      this.firstUser = this.createUser();
      this.secondUser = this.createUser();
    }

    public shouldDefineSkillsAndInterestsForTestingUser(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.firstUser))
                .goToMePageProfile()
                .editProfile()
                .clickEditProfileButton()
                .clickAddJobFamilyAndRoleButton()
                .selectFirstJobRoleFromInput(this.nopolitan2, this.nopolitan2FullName)
                .clickSelectButton()
                .clickSaveButton()
                .goToCareerGrowthPage()
                .refreshPage()
                .clickUpdateCareerProfileLink()
                .clickSkipForNowButton()
                .run(new AddSkillToCareerProfileScenario("Java 8", "Expert"))
                .clickSaveAndContinueButton()
                .clickXButton()
                .goToRolesPageViaCard()
                .typeSearchValue(this.nopolitan6)
                .goToFirstRoleCard()
                .clickSetLearningGoals()
                .markSkill("leadership")
                .selectLearningTargetLevelForSkill("leadership","Advanced")
                .clickAdd();
    }

    public shouldBePossibleToDefineLearningGoalsWhenMarkingRoleAsAspirational(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.firstUser))
                .goToCareerGrowthPage()
                .goToRolesPageViaCard()
                .typeSearchValue(this.nopolitan6)
                .goToFirstRoleCard()
                .markRoleAspirational()
                .selectPathAndOpenInterestsModal(this.pathA)
                .optionallyAddSkillsSelectModal("customer service")
                .optionallyAddSkillsAddModal()
                .clickSetLearningGoals()
                .check(SetYourLearningGoalsAssertions)
                    .assertLearningTargetLevelForSkillIs("customer service","Advanced")
                .endAssertion()
                .closeLearningGoalModal()
                .check(JobRoleMarkedAsAspirationalModalAssertions)
                    .assertModalHeaderText(this.nopolitan6)
                    .assertSkillIsInactive("java 8")
                    .assertSkillIsInactive("leadership")
                .endAssertion()
                .markSkill(SettingLearningGoalsAfterMarkingRoleAsAspirationalTest.ALL_SKILLS)
                .check(JobRoleMarkedAsAspirationalModalAssertions)
                    .assertWarningText("You can select a maximum of only 3 topics.")
                .endAssertion()
                .markSkill(SettingLearningGoalsAfterMarkingRoleAsAspirationalTest.ALL_SKILLS)
                .markSkill("teaching")
                .selectLearningTargetLevelForSkill("teaching", "Expert")
                .clickAdd()
                .goToMePageProfile()
                .check(MePageAssertions)
                    .assertLearningGoals(Stream.of("leadership", "teaching").collect(Collectors.toSet()));
    }

    public shouldBeSkillsTakenFromTheDestinationRoleIfNoPathSelected(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.secondUser))
                .goToMePageProfile()
                .editProfile()
                .clickEditProfileButton()
                .clickAddJobFamilyAndRoleButton()
                .selectFirstJobRoleFromInput(this.nopolitan2, this.nopolitan2FullName)
                .clickSelectButton()
                .clickSaveButton()
                .goToCareerGrowthPage()
                .goToRolesPageViaCard()
                .typeSearchValue(this.nopolitan6)
                .goToFirstRoleCard()
                .markRoleAspirational()
                .selectPathAndOpenInterestsModal(this.noPath)
                .check(JobRoleMarkedAsAspirationalModalAssertions)
                    .assertModalHeaderText(this.nopolitan6);
    }

    public afterTests(): void {
        this.deleteUser(this.firstUser);
        this.deleteUser(this.secondUser);
    }
}
