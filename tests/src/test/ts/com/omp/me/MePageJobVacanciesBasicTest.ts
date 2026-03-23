import { MyOpportunitiesAssertions } from "assertions/careergrowth/jobs/MyOpportunitiesAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddSkillToCareerProfileScenario } from "scenarios/profile/AddSkillToCareerProfileScenario";

export class MePageJobVacanciesBasicTest extends BaseRestTest {

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

    public MeJobVacanciesBasicTest(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .goToCareerGrowthPage()
                .editProfile()
                .clickEditProfileButton()
                .clickAddJobFamilyAndRoleButton()
                .selectFirstJobRoleFromInput(MePageJobVacanciesBasicTest.GARDENER, MePageJobVacanciesBasicTest.GARDENER)
                .clickSelectButton()
                .clickSaveButton()
                .goToCareerGrowthPage()
                .refreshPage()
                .clickUpdateCareerProfileLink()
                .clickSkipForNowButton()
                .run(new AddSkillToCareerProfileScenario(MePageJobVacanciesBasicTest.SHRUB, MePageJobVacanciesBasicTest.BEGINNER))
                .run(new AddSkillToCareerProfileScenario(MePageJobVacanciesBasicTest.GARDENING, MePageJobVacanciesBasicTest.INTERMEDIATE))
                .run(new AddSkillToCareerProfileScenario(MePageJobVacanciesBasicTest.HORTICULTURE, MePageJobVacanciesBasicTest.ADVANCED))
                .run(new AddSkillToCareerProfileScenario(MePageJobVacanciesBasicTest.MULCH, MePageJobVacanciesBasicTest.EXPERT))
                .clickSaveAndContinueButton()
                .clickXButton()
                .goToMePageProfile()
                .clickOpenJobsTab()
                .clickExploreOpenJobs()
                .firstSuggestedJobVacancyDismiss()
                .firstSuggestedJobVacancyBookmark()
                .goToMePageProfile()
                .clickOpenJobsTab()
                .selectLeftMenuTab("Bookmarked")
                .check(MyOpportunitiesAssertions)
                    .assertThatJobIsPresentOnTheList()
                .endAssertion()
                .selectLeftMenuTab("Dismissed")
                .check(MyOpportunitiesAssertions)
                    .assertThatJobIsPresentOnTheList()
                .endAssertion();
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
