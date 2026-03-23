import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { JobModel } from "models/job/JobModel";
import { LinkedRole } from "models/job/LinkedRole";
import { UserModel } from "models/user/UserModel";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

export class CreateJobVacanciesRecommendationLevelRestrictionTest extends BaseRestTest {

    private user: UserModel;
    private TITLE_TIER1: string = "Anime Watcher - Tier 1";
    private TITLE_TIER2: string = "Anime Watcher - Tier 2";
    private TITLE_TIER6: string = "Anime Watcher - Tier 6";
    private TITLE_TIER7: string = "Anime Watcher - Tier 7";
    private TITLE_TIER8: string = "Anime Watcher - Tier 8";
    private TITLE_TIER12: string = "Anime Watcher - Tier 12";
    private TITLE_TIER13: string = "Anime Watcher - Tier 13";

    private roleTier1: string = "366bc588-6a3e-4571-840b-9d341fab8bb2";
    private roleTier2: string = "e3153669-a861-4316-9e2a-3469b9cd1b78";
    private roleTier6: string = "40eaa540-da6c-474d-8f2c-2b3154c78cc1";
    private roleTier7: string = "60ad7558-f5ca-49db-b73c-956b33691405";
    private roleTier8: string = "90868210-64b6-4de4-bff8-15923e5173e3";
    private roleTier12: string = "29816e57-16e3-4d7d-a8d9-89eeda67a0dc";
    private roleTier13: string = "afcb9ff6-d576-409d-94a4-978f55e753ba";

    private readonly jobIdRecommendationLevelRestrictTier1: string = "constantRestassureJobLevelRestrictTier1";
    private readonly jobIdRecommendationLevelRestrictTier2: string = "constantRestassureJobLevelRestrictTier2";
    private readonly jobIdRecommendationLevelRestrictTier6: string = "constantRestassureJobLevelRestrictTier6";
    private readonly jobIdRecommendationLevelRestrictTier7: string = "constantRestassureJobLevelRestrictTier7";
    private readonly jobIdRecommendationLevelRestrictTier8: string = "constantRestassureJobLevelRestrictTier8";
    private readonly jobIdRecommendationLevelRestrictTier12: string = "constantRestassureJobLevelRestrictTier12";
    private readonly jobIdRecommendationLevelRestrictTier13: string = "constantRestassureJobLevelRestrictTier13";

    public initialize(): void {
        this.deleteJob(this.jobIdRecommendationLevelRestrictTier1);
        this.deleteJob(this.jobIdRecommendationLevelRestrictTier2);
        this.deleteJob(this.jobIdRecommendationLevelRestrictTier6);
        this.deleteJob(this.jobIdRecommendationLevelRestrictTier7);
        this.deleteJob(this.jobIdRecommendationLevelRestrictTier8);
        this.deleteJob(this.jobIdRecommendationLevelRestrictTier12);
        this.deleteJob(this.jobIdRecommendationLevelRestrictTier13);
      this.user = this.createUser();
    }

    public addJobsToPortal(): void {
        this.waitForResponse(120000);
        let jobModel: JobModel = this.getObjectFromJson("fixtures/job/PublicOpportunityDto.json", JobModel);
        let linkedRole: any = new LinkedRole();
        linkedRole.setExternalId(this.roleTier1);
        linkedRole.setLinkedRoleStatus("DECLARED");
        jobModel.setLinkedRoles(Collections.singletonList(linkedRole));
        jobModel.setId(this.jobIdRecommendationLevelRestrictTier1);
        this.createJob(this.TITLE_TIER1, jobModel, false);

        linkedRole.setExternalId(this.roleTier2);
        jobModel.setLinkedRoles(Collections.singletonList(linkedRole));
        jobModel.setId(this.jobIdRecommendationLevelRestrictTier2);
        this.createJob(this.TITLE_TIER2, jobModel, false);

        linkedRole.setExternalId(this.roleTier6);
        jobModel.setLinkedRoles(Collections.singletonList(linkedRole));
        jobModel.setId(this.jobIdRecommendationLevelRestrictTier6);
        this.createJob(this.TITLE_TIER6, jobModel, false);

        linkedRole.setExternalId(this.roleTier7);
        jobModel.setLinkedRoles(Collections.singletonList(linkedRole));
        jobModel.setId(this.jobIdRecommendationLevelRestrictTier7);
        this.createJob(this.TITLE_TIER7, jobModel, false);

        linkedRole.setExternalId(this.roleTier8);
        jobModel.setLinkedRoles(Collections.singletonList(linkedRole));
        jobModel.setId(this.jobIdRecommendationLevelRestrictTier8);
        this.createJob(this.TITLE_TIER8, jobModel, false);

        linkedRole.setExternalId(this.roleTier12);
        jobModel.setLinkedRoles(Collections.singletonList(linkedRole));
        jobModel.setId(this.jobIdRecommendationLevelRestrictTier12);
        this.createJob(this.TITLE_TIER12, jobModel, false);

        linkedRole.setExternalId(this.roleTier13);
        jobModel.setLinkedRoles(Collections.singletonList(linkedRole));
        jobModel.setId(this.jobIdRecommendationLevelRestrictTier13);
        this.createJob(this.TITLE_TIER13, jobModel, false);
    }

    public dataProvider(): any[][] {
        return [
                [this.TITLE_TIER2],
                [this.TITLE_TIER6],
                [this.TITLE_TIER7],
                [this.TITLE_TIER8],
                [this.TITLE_TIER12],
                [this.TITLE_TIER13]
        ];
    }

    public shouldWaitForJobsToAppearAndAddSkill1(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .goToCareerGrowthPage()
                .goToVacanciesPageViaCard()
                .typeSearchValue(this.TITLE_TIER1)
                .goToFirstJobVacancyOnAllJobsList()
                .waitForParticularSkill("multimedia")
                .clickEditVacancyButton()
                .removeAllSkills()
                .addSkillToProficiencyLevel("japanese art", "Beginner")
                .addSkillToProficiencyLevel("MTV", "Intermediate")
                .addSkillToProficiencyLevel("anime", "Advanced")
                .clickSaveButton();
    }

    public shouldWaitForJobsToAppearAndAddSkill(jobName: string): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToCareerGrowthPage()
                .goToVacanciesPageViaCard()
                .typeSearchValue(jobName)
                .goToFirstJobVacancyOnAllJobsList()
                .waitForParticularSkill("multimedia")
                .waitForSkills()
                .clickEditVacancyButton()
                .removeAllSkills()
                .addSkillToProficiencyLevel("japanese art", "Beginner")
                .addSkillToProficiencyLevel("MTV", "Intermediate")
                .addSkillToProficiencyLevel("anime", "Advanced")
                .clickSaveButton();
    }

    public deleteUser(): void {

      this.deleteUser(this.user);

    }
}
