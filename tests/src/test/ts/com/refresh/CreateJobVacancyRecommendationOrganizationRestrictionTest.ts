import { BaseRestTest } from "common/BaseRestTest";
import { JobModel } from "models/job/JobModel";
import { LinkedRole } from "models/job/LinkedRole";
import { Location } from "models/job/Location";
import { Organization } from "models/job/Organization";
import { UserModel } from "models/user/UserModel";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

export class CreateJobVacancyRecommendationOrganizationRestrictionTest extends BaseRestTest {

    private user: UserModel;
    private TITLE_1: string = "Manga Reader - A1";
    private TITLE_2: string = "Manga Reader - A2";
    private TITLE_3: string = "Manga Reader - B";
    private TITLE_4: string = "Manga Reader - empty";
    private TITLE_5: string = "Manga Reader - A1 and A2";
    private TITLE_6: string = "Manga Reader - A1 and B";

    private roleId: string = "manga-reader_2";
    private organizationIdA1: string = "anime-watcher-a1";
    private organizationIdA2: string = "anime-watcher-a2";
    private organizationIdB: string = "anime-watcher-b";

    private readonly jobId1: string = "constantRestassureJobOrganisationRestrict1";
    private readonly jobId2: string = "constantRestassureJobOrganisationRestrict2";
    private readonly jobId3: string = "constantRestassureJobOrganisationRestrict3";
    private readonly jobId4: string = "constantRestassureJobOrganisationRestrict4";
    private readonly jobId5: string = "constantRestassureJobOrganisationRestrict5";
    private readonly jobId6: string = "constantRestassureJobOrganisationRestrict6";

    public initialize(): void {
        this.deleteJob(this.jobId1);
        this.deleteJob(this.jobId2);
        this.deleteJob(this.jobId3);
        this.deleteJob(this.jobId4);
        this.deleteJob(this.jobId5);
        this.deleteJob(this.jobId6);
      this.user = this.createUser();
    }

    public addJobsToPortal(): void {
//        this.waitForResponse(120000);
        let jobModel: JobModel = this.getObjectFromJson("fixtures/job/PublicOpportunityDto.json", JobModel);
        let linkedRole: any = new LinkedRole();
        linkedRole.setExternalId(this.roleId);
        linkedRole.setLinkedRoleStatus("DECLARED");
        jobModel.setLinkedRoles(Collections.singletonList(linkedRole));

        this.createJob(UUID.randomUUID().toString());

        let organization: any = new Organization();
        organization.setOrganizationTypeId("DEPARTMENT");
        organization.setExternalId(this.organizationIdA1);

        jobModel.setOrganization(Collections.singletonList(organization));
        jobModel.setId(this.jobId1);
        this.createJob(createJobWithEmptyLocation(this.TITLE_1, jobModel));

        organization.setOrganizationTypeId("DEPARTMENT");
        organization.setExternalId(this.organizationIdA2);

        jobModel.setOrganization(Collections.singletonList(organization));
        jobModel.setId(this.jobId2);
        this.createJobWithEmptyLocation(this.TITLE_2, jobModel);

        organization.setOrganizationTypeId("LEGAL_ENTITY");
        organization.setExternalId(this.organizationIdB);

        jobModel.setOrganization(Collections.singletonList(organization));
        jobModel.setId(this.jobId3);
        this.createJobWithEmptyLocation(this.TITLE_3, jobModel);

        jobModel.setId(this.jobId4);
        this.createJobWithEmptyLocation(this.TITLE_4, jobModel);

        let organization2: any = new Organization();
        organization.setOrganizationTypeId("DEPARTMENT"); //LEGAL_ENTITY
        organization.setExternalId(this.organizationIdA1);
        organization2.setOrganizationTypeId("DEPARTMENT"); //LEGAL_ENTITY
        organization2.setExternalId(this.organizationIdA2);

        jobModel.setOrganization(Arrays.asList(organization, organization2));
        jobModel.setId(this.jobId5);
        this.createJob(createJobWithEmptyLocation(this.TITLE_5, jobModel));

        organization.setOrganizationTypeId("DEPARTMENT"); //LEGAL_ENTITY
        organization.setExternalId(this.organizationIdA1);
        organization2.setOrganizationTypeId("LEGAL_ENTITY"); //LEGAL_ENTITY
        organization2.setExternalId(this.organizationIdB);

        jobModel.setOrganization(Arrays.asList(organization, organization2));
        jobModel.setId(this.jobId6);
        this.createJob(createJobWithEmptyLocation(this.TITLE_6, jobModel));
    }

    public dataProvider(): any[][] {
        return [
                [this.TITLE_2],
                [this.TITLE_3],
                [this.TITLE_4]
        ];
    }

    public shouldWaitForJobsToAppearAndAddSkill1(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .goToCareerGrowthPage()
                .goToVacanciesPageViaCard()
                .typeSearchValue(this.TITLE_1)
                .goToFirstJobVacancyOnAllJobsList()
                .waitForParticularSkill("drawing")
                .clickEditVacancyButton()
                .removeAllSkills()
                .addSkillToProficiencyLevel("manga", "Intermediate")
                .addSkillToProficiencyLevel("illustration", "Intermediate")
                .addSkillToProficiencyLevel("drawing", "Intermediate")
                .clickSaveButton();
    }

    public shouldWaitForJobsToAppearAndAddSkill(jobName: string): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToCareerGrowthPage()
                .goToVacanciesPageViaCard()
                .typeSearchValue(jobName)
                .goToFirstJobVacancyOnAllJobsList()
                .waitForParticularSkill("drawing")
                .clickEditVacancyButton()
                .removeAllSkills()
                .addSkillToProficiencyLevel("manga", "Intermediate")
                .addSkillToProficiencyLevel("illustration", "Intermediate")
                .addSkillToProficiencyLevel("drawing", "Intermediate")
                .clickSaveButton();
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
