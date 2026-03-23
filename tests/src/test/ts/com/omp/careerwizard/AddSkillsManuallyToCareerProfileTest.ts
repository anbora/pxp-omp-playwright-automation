import { SkillsPassportMePageAssertions } from "assertions/careergrowth/jobs/SkillsPassportMePageAssertions";
import { SkillsCareerProfileModalAssertions } from "assertions/careergrowth/profiles/SkillsCareerProfileModalAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddSkillToCareerProfileScenario } from "scenarios/profile/AddSkillToCareerProfileScenario";

export class AddSkillsManuallyToCareerProfileTest extends BaseRestTest {

    private static readonly GARDENER: string = "Gardener";
    public static readonly HORTICULTURE: string = "horticulture";
    public static readonly GARDENING: string = "gardening";
    public static readonly SHRUB: string = "shrub";
    public static readonly ADVANCED: string = "Advanced";
    public static readonly INTERMEDIATE: string = "Intermediate";
    public static readonly BEGINNER: string = "Beginner";
    public static readonly MULCH: string = "mulch";
    public static readonly EXPERT: string = "Expert";
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser();

    }

    public shouldAddSkillsManuallyToCareerProfile(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .goToCareerGrowthPage()
                .editProfile()
                .clickEditProfileButton()
                .clickAddJobFamilyAndRoleButton()
                .selectFirstJobRoleFromInput(AddSkillsManuallyToCareerProfileTest.GARDENER, AddSkillsManuallyToCareerProfileTest.GARDENER)
                .clickSelectButton()
                .clickSaveButton()
                .goToCareerGrowthPage()
                .refreshPage()
                .clickUpdateCareerProfileLink()
                .clickSkipForNowButton()
                .run(new AddSkillToCareerProfileScenario(AddSkillsManuallyToCareerProfileTest.SHRUB, AddSkillsManuallyToCareerProfileTest.BEGINNER))
                .run(new AddSkillToCareerProfileScenario(AddSkillsManuallyToCareerProfileTest.GARDENING, AddSkillsManuallyToCareerProfileTest.INTERMEDIATE))
                .run(new AddSkillToCareerProfileScenario(AddSkillsManuallyToCareerProfileTest.HORTICULTURE, AddSkillsManuallyToCareerProfileTest.ADVANCED))
                .run(new AddSkillToCareerProfileScenario(AddSkillsManuallyToCareerProfileTest.MULCH, AddSkillsManuallyToCareerProfileTest.EXPERT))
                .check(SkillsCareerProfileModalAssertions)
                    .assertThatSkillIsDisplayed(AddSkillsManuallyToCareerProfileTest.BEGINNER, AddSkillsManuallyToCareerProfileTest.SHRUB)
                    .assertThatSkillIsDisplayed(AddSkillsManuallyToCareerProfileTest.INTERMEDIATE, AddSkillsManuallyToCareerProfileTest.GARDENING)
                    .assertThatSkillIsDisplayed(AddSkillsManuallyToCareerProfileTest.ADVANCED, AddSkillsManuallyToCareerProfileTest.HORTICULTURE)
                    .assertThatSkillIsDisplayed(AddSkillsManuallyToCareerProfileTest.EXPERT, AddSkillsManuallyToCareerProfileTest.MULCH)
                .endAssertion()
                .clickSaveAndContinueButton()
                .clickXButton()
                .goToMePageProfile()
                .goToSkillPassportTab()
                .check(SkillsPassportMePageAssertions)
                    .assertThatSkillIsAdded(AddSkillsManuallyToCareerProfileTest.SHRUB)
//                    .assertSkillHasGotBeginnerLevelIcon(SHRUB)
                    .assertThatSkillIsAdded(AddSkillsManuallyToCareerProfileTest.GARDENING.toLowerCase())
//                    .assertSkillHasGotIntermediateLevelIcon(GARDENING.toLowerCase())
                    .assertThatSkillIsAdded(AddSkillsManuallyToCareerProfileTest.HORTICULTURE.toLowerCase())
//                    .assertSkillHasGotAdvancedLevelIcon(HORTICULTURE.toLowerCase());
                    .assertThatSkillIsAdded(AddSkillsManuallyToCareerProfileTest.MULCH.toLowerCase());
    }

    public afterTests(): void {

      this.deleteUser(this.user);

    }
}
