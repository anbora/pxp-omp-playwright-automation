import { AddToSkillsPassportAssertions } from "assertions/careergrowth/AddToSkillsPassportAssertions";
import { SkillsPassportMePageAssertions } from "assertions/careergrowth/jobs/SkillsPassportMePageAssertions";
import { MatchingSkillsModalAssertions } from "assertions/careergrowth/MatchingSkillsModalAssertions";
import { SetYourLearningGoalsAssertions } from "assertions/careergrowth/SetYourLearningGoalsAssertions";
import { MePageAssertions } from "assertions/me/MePageAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { JobModel } from "models/job/JobModel";
import { LinkedRole } from "models/job/LinkedRole";
import { ResultContainer } from "models/ResultContainer";
import { UserModel } from "models/user/UserModel";
import { AddSkillIfMissingScenario } from "scenarios/jobs/AddSkillIfMissingScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

export class SkillsOperationsInContextOfJobVavancyTest extends BaseRestTest {
    public static readonly GARDENING: string = "gardening";
    public static readonly CUSTOMER_SERVICE: string = "customer service";
    public static readonly LANDSCAPE_ARCHITECTURE: string = "landscape architecture";
    public static readonly LANDSCAPING: string = "landscaping";
    public static readonly TREE_PLANTING: string = "tree planting";
    public static readonly ADVANCED: string = "Advanced";
    public static readonly BEGINNER: string = "Beginner";
    public static readonly INTERMEDIATE: string = "Intermediate";
    private static readonly RANDOM_SUFFIX: string = UUID.randomUUID().toString();
    private static readonly JOB_TITLE: string = "Gardener_" + SkillsOperationsInContextOfJobVavancyTest.RANDOM_SUFFIX;
    public static readonly PLANTING: string = "planting";
    private jobId: string;
    private user: UserModel;
    private resultContainer: ResultContainer = new ResultContainer();
    private expectedLearningGoals: Set<string> = new Set();
    private beginnerRoleSkills: Set<string> = new Set();
    private advancedRoleSkills: Set<string> = new Set();

    public initialize(): void {
        let jobModel: JobModel = this.getObjectFromJson("fixtures/job/GardenerJobVacancy.json", JobModel);
        jobModel.setId(SkillsOperationsInContextOfJobVavancyTest.RANDOM_SUFFIX);
        let linkedRole: any = new LinkedRole();
        linkedRole.setInternalId(this.getPortalConfig(this.portalIndex).getGardenerRoleId());
        linkedRole.setLinkedRoleStatus("DECLARED");
        jobModel.setLinkedRoles(Collections.singletonList(linkedRole));
      this.jobId = this.createJob(SkillsOperationsInContextOfJobVavancyTest.JOB_TITLE, jobModel);
      this.user = this.createUser();

        this.expectedLearningGoals.add("planting");
        this.expectedLearningGoals.add("gardening");

        this.beginnerRoleSkills.add("planting");
        this.advancedRoleSkills.add("gardening");
    }
    public shouldManageSkillsInJobVacancyContext(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .goToCareerGrowthPage()
                .goToVacanciesPageViaCard()
                .typeSearchValue(SkillsOperationsInContextOfJobVavancyTest.JOB_TITLE)
                .goToFirstJobVacancyOnAllJobsList()
                .waitForSkills()
                .getNumberOfSkillsInCategory(null, this.resultContainer)
                .run(new AddSkillIfMissingScenario(SkillsOperationsInContextOfJobVavancyTest.PLANTING, this.resultContainer))
                .run(new AddSkillIfMissingScenario("horticulture", this.resultContainer))
                .run(new AddSkillIfMissingScenario("gardening", this.resultContainer))
                .waitForParticularSkill("horticulture")
                .clickAddSkillsToPassport()
                .markSkill("gardening")
                .markSkill("horticulture")
                .selectLevelForSkill("horticulture", SkillsOperationsInContextOfJobVavancyTest.ADVANCED)
                .markSkill(SkillsOperationsInContextOfJobVavancyTest.PLANTING)
                .selectLevelForSkill(SkillsOperationsInContextOfJobVavancyTest.PLANTING, SkillsOperationsInContextOfJobVavancyTest.BEGINNER)
                .clickAddSkills()
                .clickAddSkillsToPassport()
                .check(AddToSkillsPassportAssertions)
                    .assertSkillIsAlreadyCheckedOnTheList("gardening")
                    .assertSkillIsAlreadyCheckedOnTheList("horticulture")
                    .assertSkillIsAlreadyCheckedOnTheList(SkillsOperationsInContextOfJobVavancyTest.PLANTING)
                    .assertYourSkillLevelIs("gardening", "Intermediate")
                    .assertJobVacancySkillLevelIs("gardening", "Intermediate")
                    .assertYourSkillLevelIs("horticulture", "Advanced")
                    .assertJobVacancySkillLevelIs("horticulture", "Intermediate")
                    .assertYourSkillLevelIs(SkillsOperationsInContextOfJobVavancyTest.PLANTING, SkillsOperationsInContextOfJobVavancyTest.BEGINNER)
                    .assertJobVacancySkillLevelIs(SkillsOperationsInContextOfJobVavancyTest.PLANTING, "Intermediate")
                .endAssertion()
                .clickClose()
                .clickSetLearningGoals()
                .markSkill("gardening")
                .check(SetYourLearningGoalsAssertions)
                    .assertRoleTargetLevelForSkillIs("gardening", SkillsOperationsInContextOfJobVavancyTest.INTERMEDIATE)
                    .assertLearningTargetLevelForSkillIs("gardening", SkillsOperationsInContextOfJobVavancyTest.ADVANCED)
                .endAssertion()
                .markSkill(SkillsOperationsInContextOfJobVavancyTest.PLANTING)
                .check(SetYourLearningGoalsAssertions)
                    .assertRoleTargetLevelForSkillIs(SkillsOperationsInContextOfJobVavancyTest.PLANTING, SkillsOperationsInContextOfJobVavancyTest.INTERMEDIATE)
                    .assertLearningTargetLevelForSkillIs(SkillsOperationsInContextOfJobVavancyTest.PLANTING, SkillsOperationsInContextOfJobVavancyTest.INTERMEDIATE)
                .endAssertion()
                .selectLearningTargetLevelForSkill(SkillsOperationsInContextOfJobVavancyTest.PLANTING, SkillsOperationsInContextOfJobVavancyTest.BEGINNER)
                .clickAdd()
                .goToMePageProfile()
                .check(MePageAssertions)
                    .assertLearningGoals(this.expectedLearningGoals)
//                    .assertLearningGoalHasGotAdvancedLevel("gardening")
//                    .assertLearningGoalHasGotBeginnerLevel(PLANTING)
                .endAssertion()
                .goToSkillPassportTab()
                .check(SkillsPassportMePageAssertions)
                    .assertThatSkillIsAdded(SkillsOperationsInContextOfJobVavancyTest.GARDENING)
//                    .assertSkillHasGotIntermediateLevelIcon(GARDENING)
                    .assertThatSkillIsAdded("horticulture")
//                    .assertSkillHasGotAdvancedLevelIcon("horticulture")
                    .assertThatSkillIsAdded(SkillsOperationsInContextOfJobVavancyTest.PLANTING)
//                    .assertSkillHasGotBeginnerLevelIcon(PLANTING)
                .endAssertion()
                .goToCareerGrowthPage()
                .goToVacanciesPageViaCard()
                .typeSearchValue(SkillsOperationsInContextOfJobVavancyTest.JOB_TITLE)
                .clickMoreSkillsButton(SkillsOperationsInContextOfJobVavancyTest.JOB_TITLE)
                .check(MatchingSkillsModalAssertions)
                    .assertMatchingSkillUserLevelIs(SkillsOperationsInContextOfJobVavancyTest.GARDENING, SkillsOperationsInContextOfJobVavancyTest.INTERMEDIATE)
                    .assertMatchingSkillExpectedLevelIs(SkillsOperationsInContextOfJobVavancyTest.GARDENING, SkillsOperationsInContextOfJobVavancyTest.INTERMEDIATE)
                    .assertMatchingSkillStatusIs(SkillsOperationsInContextOfJobVavancyTest.GARDENING, "On target")
                    .assertMatchingSkillUserLevelIs("horticulture", SkillsOperationsInContextOfJobVavancyTest.ADVANCED)
                    .assertMatchingSkillExpectedLevelIs("horticulture", SkillsOperationsInContextOfJobVavancyTest.INTERMEDIATE)
                    .assertMatchingSkillStatusIs("horticulture", "On target")
                    .assertMatchingSkillUserLevelIs(SkillsOperationsInContextOfJobVavancyTest.PLANTING, SkillsOperationsInContextOfJobVavancyTest.BEGINNER)
                    .assertMatchingSkillExpectedLevelIs(SkillsOperationsInContextOfJobVavancyTest.PLANTING, SkillsOperationsInContextOfJobVavancyTest.INTERMEDIATE)
                    .assertMatchingSkillStatusIs(SkillsOperationsInContextOfJobVavancyTest.PLANTING, "Off target");
    }
    public afterTests(): void {
        this.deleteUser(this.user);
        this.deleteJob(this.jobId);
    }

}
