import { JobVacancyDetailsAssertions } from "assertions/careergrowth/jobs/JobVacancyDetailsAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { JobModel } from "models/job/JobModel";
import { LinkedRole } from "models/job/LinkedRole";
import { UserModel } from "models/user/UserModel";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddBasicCareerPreferencesForUser } from "scenarios/profile/AddBasicCareerPreferencesForUser";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";
import { AddSkillToNewUserScenario_SkillLevel } from "scenarios/profile/AddSkillToNewUserScenario_SkillLevel";

export class DetectSkillsFromJobTitleTest extends BaseRestTest {

    private TITLE: string = "this.java developer " + UUID.randomUUID().toString().substring(0, 7);
    private java: string = "java";
    private roleWithoutSkillsExternalId: string = "d5a06755-a8ef-4a1b-a221-c7d757bc3bd9";
    private jobId: string;
    private user: UserModel;

    public initialize(): void {
      this.user = this.createUser();
        let jobModel: JobModel = this.getObjectFromJson("fixtures/job/PublicOpportunityWithDeclaredLinkedRoleDto.json", JobModel);
        let linkedRole: any = new LinkedRole();
        linkedRole.setExternalId(this.roleWithoutSkillsExternalId);
        linkedRole.setLinkedRoleStatus("DECLARED");
        jobModel.setLinkedRoles(Collections.singletonList(linkedRole));
      this.jobId = this.createJob(this.TITLE, jobModel);
    }

    public shouldCheckSkillsDetectedForJobVacancy(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .run(new AddRoleAndFamilyToNewUserScenario(this.user.name))
                .run(new AddSkillToNewUserScenario_SkillLevel())
                .run(new AddBasicCareerPreferencesForUser())
                .goToCareerGrowthPage()
                .goToVacanciesPageViaTab()
                .typeSearchValue(this.TITLE)
                .goToFirstJobVacancyOnAllJobsList()
                .waitForParticularSkill(this.java)
                .check(JobVacancyDetailsAssertions)
                    .assertThatSkillChipsIsVisibleOnJobVacancyDetails(this.java);
    }

    public afterTests(): void {
        this.deleteUser(this.user);
        this.deleteJob(this.jobId);
    }
}
