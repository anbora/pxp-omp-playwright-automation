import { EditJobVacancyAssertions } from "assertions/careergrowth/jobs/EditJobVacancyAssertions";
import { JobVacancyDetailsAssertions } from "assertions/careergrowth/jobs/JobVacancyDetailsAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { TeamsResponsibleEnum } from "common/enums/TeamsResponsibleEnum";
import { JobModel } from "models/job/JobModel";
import { LinkedRole } from "models/job/LinkedRole";
import { UserModel } from "models/user/UserModel";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

export class JobVacancyInheritSkillsFromLinkedRoleTest extends BaseRestTest {

    private static readonly RANDOM_SUFFIX: string = UUID.randomUUID().toString();
    private roleWithSkillsExternalId: string = "forlinkingwithskills";
    private taxiDriver: string = "Taxi Driver";
    private newest: string = "Newest First";
    private jobId: string;
    private user: UserModel;

    private novice: string = "Novice";
    private beginner: string = "Beginner";
    private intermediate: string = "Intermediate";
    private advanced: string = "Advanced";
    private expert: string = "Expert";

    //Skills that should be inherited from linked role:
    private kraft: string = "kraft";
    private denim: string = "denim";
    private beans: string = "beans";
    private piercing: string = "piercing";
    private feedback: string = "feedback";

    public initialize(): void {
        let jobModel: JobModel = this.getObjectFromJson("fixtures/job/PublicOpportunityWithDeclaredLinkedRoleDto.json", JobModel);
        jobModel.setId(JobVacancyInheritSkillsFromLinkedRoleTest.RANDOM_SUFFIX);
        let linkedRole: any = new LinkedRole();
        linkedRole.setExternalId(this.roleWithSkillsExternalId);
        linkedRole.setLinkedRoleStatus("DECLARED");
        jobModel.setLinkedRoles(Collections.singletonList(linkedRole));
      this.jobId = this.createJob(this.taxiDriver, jobModel);
      this.user = this.createUser();
    }

    public shouldCheckSkillsDetectedForJobVacancy(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .goToCareerGrowthPage()
                .goToVacanciesPageViaTab()
                .sortListBy(this.newest)
                .typeSearchValue(this.taxiDriver)
                .clickJobVacancyCardsDetails(this.taxiDriver)
                .waitForSkills()
                .check(JobVacancyDetailsAssertions)
                    .assertThatSkillIsAddedToLevel(this.kraft, this.novice)
                    .assertThatSkillIsAddedToLevel(this.denim, this.beginner)
                    .assertThatSkillIsAddedToLevel(this.beans, this.intermediate)
                    .assertThatSkillIsAddedToLevel(this.piercing, this.advanced)
                    .assertThatSkillIsAddedToLevel(this.feedback, this.expert)
                .endAssertion()
                .clickEditVacancyButton()
                .check(EditJobVacancyAssertions)
                    .assertThatSkillIsAddedToLevel(this.kraft, this.novice)
                    .assertThatSkillIsAddedToLevel(this.denim, this.beginner)
                    .assertThatSkillIsAddedToLevel(this.beans, this.intermediate)
                    .assertThatSkillIsAddedToLevel(this.piercing, this.advanced)
                    .assertThatSkillIsAddedToLevel(this.feedback, this.expert);
    }

    public afterTests(): void {

      this.deleteJob(this.jobId);

    }
}
