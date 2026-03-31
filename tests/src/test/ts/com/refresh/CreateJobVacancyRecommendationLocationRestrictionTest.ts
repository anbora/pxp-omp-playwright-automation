// @ts-nocheck
import { BaseRestTest } from "common/BaseRestTest";
import { JobModel } from "models/job/JobModel";
import { LinkedRole } from "models/job/LinkedRole";
import { Location } from "models/job/Location";
import { UserModel } from "models/user/UserModel";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

export class CreateJobVacancyRecommendationLocationRestrictionTest extends BaseRestTest {

    private user: UserModel;
    private TITLE_1: string = "Restaurant Manager - Bialka";
    private TITLE_2: string = "Restaurant Manager - Makow";
    private TITLE_3: string = "Restaurant Manager - Sucha";
    private TITLE_4: string = "Restaurant Manager - empty location";
    private TITLE_5: string = "Restaurant Manager - Bialka and Sucha";

    private roleId: string = "restaurant";
    private locationId1: string = "restaurant_bialka";
    private locationId2: string = "restaurant_makow";
    private locationId3: string = "restaurant_sucha";

    private readonly jobId1: string = "constantRestassureJobLocationRestrict1";
    private readonly jobId2: string = "constantRestassureJobLocationRestrict2";
    private readonly jobId3: string = "constantRestassureJobLocationRestrict3";
    private readonly jobId4: string = "constantRestassureJobLocationRestrict4";
    private readonly jobId5: string = "constantRestassureJobLocationRestrict5";

    public initialize(): void {
        this.deleteJob(this.jobId1);
        this.deleteJob(this.jobId2);
        this.deleteJob(this.jobId3);
        this.deleteJob(this.jobId4);
        this.deleteJob(this.jobId5);
      this.user = this.createUser();
    }

    public addJobsToPortal(): void {
        this.waitForResponse(120000);
        let jobModel: JobModel = this.getObjectFromJson("fixtures/job/PublicOpportunityDto.json", JobModel);
        let linkedRole: any = new LinkedRole();
        linkedRole.setExternalId(this.roleId);
        linkedRole.setLinkedRoleStatus("DECLARED");
        jobModel.setLinkedRoles(Collections.singletonList(linkedRole));

        let location: any = new Location();
        location.setPrimary(true);

        location.setLocationId(this.locationId1);
        jobModel.setLocation(Collections.singletonList(location));
        jobModel.setId(this.jobId1);
        this.createJob(createJobWithEmptyLocation(this.TITLE_1, jobModel));

        location.setLocationId(this.locationId2);
        jobModel.setLocation(Collections.singletonList(location));
        jobModel.setId(this.jobId2);
        this.createJobWithEmptyLocation(this.TITLE_2, jobModel);

        location.setLocationId(this.locationId3);
        jobModel.setLocation(Collections.singletonList(location));
        jobModel.setId(this.jobId3);
        this.createJobWithEmptyLocation(this.TITLE_3, jobModel);

        jobModel.setLocation(List.of());
        jobModel.setId(this.jobId4);
        this.createJobWithEmptyLocation(this.TITLE_4, jobModel);

        let location2: any = new Location();
        location2.setPrimary(true);
        location.setLocationId(this.locationId1);
        location2.setLocationId(this.locationId3);

        jobModel.setLocation(Arrays.asList(location, location2));
        jobModel.setId(this.jobId5);
        this.createJob(createJobWithEmptyLocation(this.TITLE_5, jobModel));
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
                .waitForParticularSkill("hospitality")
                .clickEditVacancyButton()
                .removeAllSkills()
                .addSkillToProficiencyLevel("restaurant management", "Intermediate")
                .addSkillToProficiencyLevel("restaurant menus", "Intermediate")
                .addSkillToProficiencyLevel("food safety", "Intermediate")
                .clickSaveButton();
    }

    public shouldWaitForJobsToAppearAndAddSkill(jobName: string): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToCareerGrowthPage()
                .goToVacanciesPageViaCard()
                .typeSearchValue(jobName)
                .goToFirstJobVacancyOnAllJobsList()
                .waitForParticularSkill("hospitality")
                .waitForSkills()
                .clickEditVacancyButton()
                .removeAllSkills()
                .addSkillToProficiencyLevel("restaurant management", "Intermediate")
                .addSkillToProficiencyLevel("restaurant menus", "Intermediate")
                .addSkillToProficiencyLevel("food safety", "Intermediate")
                .clickSaveButton();
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
