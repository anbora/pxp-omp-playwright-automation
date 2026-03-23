import { SkillsPassportMePageAssertions } from "assertions/careergrowth/jobs/SkillsPassportMePageAssertions";
import { RoleDetailsAssertions } from "assertions/careergrowth/roles/RoleDetailsAssertions";
import { MePageAssertions } from "assertions/me/MePageAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { TeamsResponsibleEnum } from "common/enums/TeamsResponsibleEnum";
import { UserModel } from "models/user/UserModel";
import { RoleDetailsPage } from "pages/careergrowth/roles/RoleDetailsPage";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

export class SkillsOperationsInContextOfRoleTest  extends BaseRestTest {
    public static readonly GARDENING: string = "gardening";
    public static readonly CUSTOMER_SERVICE: string = "customer service";
    public static readonly LANDSCAPE_ARCHITECTURE: string = "landscape architecture";
    public static readonly LANDSCAPING: string = "landscaping";
    public static readonly TREE_PLANTING: string = "tree planting";
    public static readonly ADVANCED: string = "Advanced";
    public static readonly BEGINNER: string = "Beginner";
    public static readonly INTERMEDIATE: string = "Intermediate";
    public static readonly EXPECTED_INTERMEDIATE_SKILLS_NUMBER: number = 10;
    private TITLE: string = "SkillsInRole" + UUID.randomUUID().toString();
    private jobId: string;
    private user: UserModel;
    private expectedLearningGoals: Set<string>;
    private beginnerRoleSkills: Set<string>;
    private advancedRoleSkills: Set<string>;

    public initialize(): void {
      this.user = this.createUser();
        this.expectedLearningGoals = new Set();
        this.expectedLearningGoals.add(SkillsOperationsInContextOfRoleTest.CUSTOMER_SERVICE);
        this.expectedLearningGoals.add(SkillsOperationsInContextOfRoleTest.LANDSCAPE_ARCHITECTURE);

        this.beginnerRoleSkills = new Set();
        this.beginnerRoleSkills.add(SkillsOperationsInContextOfRoleTest.CUSTOMER_SERVICE);

        this.advancedRoleSkills = new Set();
        this.advancedRoleSkills.add(SkillsOperationsInContextOfRoleTest.LANDSCAPING);
        this.advancedRoleSkills.add(SkillsOperationsInContextOfRoleTest.GARDENING);
        this.advancedRoleSkills.add(SkillsOperationsInContextOfRoleTest.TREE_PLANTING);
    }

    public shouldManageSkillsInRoleContext(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .goToCareerGrowthPage()
                .goDirectlyTo(RoleDetailsPage, this.getPortalConfig(this.portalIndex).getSkilledGardenerRoleId())
                .waitForSkills()
                .clickShowMoreSkills()
                .check(RoleDetailsAssertions)
                    .assertSkillsOfIndicatedLevelContains("Intermediate", this.beginnerRoleSkills)
                    .assertSkillsOfIndicatedLevelContains("Expert", this.advancedRoleSkills)
                    .assertSkillsOfIndicatedLevelHaveAtLeast("Advanced", SkillsOperationsInContextOfRoleTest.EXPECTED_INTERMEDIATE_SKILLS_NUMBER)
                .endAssertion()
                .clickAddSkillsToPassport()
                .markSkill(SkillsOperationsInContextOfRoleTest.GARDENING)
                .clickAddSkills()
                .clickSetLearningGoals()
                .markSkill(SkillsOperationsInContextOfRoleTest.CUSTOMER_SERVICE)
                .check(RoleDetailsAssertions)
                    .assertRoleTargetLevelForSkillIs(SkillsOperationsInContextOfRoleTest.CUSTOMER_SERVICE, SkillsOperationsInContextOfRoleTest.INTERMEDIATE)
                    .assertLearningTargetLevelForSkillIs(SkillsOperationsInContextOfRoleTest.CUSTOMER_SERVICE, SkillsOperationsInContextOfRoleTest.INTERMEDIATE)
                .endAssertion()
                .markSkill(SkillsOperationsInContextOfRoleTest.LANDSCAPE_ARCHITECTURE)
                .check(RoleDetailsAssertions)
                    .assertRoleTargetLevelForSkillIs(SkillsOperationsInContextOfRoleTest.LANDSCAPE_ARCHITECTURE, "Advanced")
                    .assertLearningTargetLevelForSkillIs(SkillsOperationsInContextOfRoleTest.LANDSCAPE_ARCHITECTURE, "Advanced")
                .endAssertion()
                .selectLearningTargetLevelForSkill(SkillsOperationsInContextOfRoleTest.LANDSCAPE_ARCHITECTURE, "Expert")
                .clickAdd()
                .goToMePageProfile()
                .check(MePageAssertions)
                    .assertLearningGoals(this.expectedLearningGoals)
                .endAssertion()
                .goToSkillPassportTab()
                .check(SkillsPassportMePageAssertions)
                    .assertThatSkillIsAdded(SkillsOperationsInContextOfRoleTest.GARDENING);
//                    .assertSkillHasGotAdvancedLevelIcon(GARDENING);
    }

    public afterTests(): void {

      this.deleteUser(this.user);

    }
}
