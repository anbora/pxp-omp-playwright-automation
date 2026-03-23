import { JobVacancyDetailsAssertions } from "assertions/careergrowth/jobs/JobVacancyDetailsAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { JobModel } from "models/job/JobModel";
import { LinkedRole } from "models/job/LinkedRole";
import { ResultContainer } from "models/ResultContainer";
import { UserModel } from "models/user/UserModel";
import { JobVacancyDetailsPage } from "pages/careergrowth/jobs/JobVacancyDetailsPage";
import { AddSkillIfMissingScenario } from "scenarios/jobs/AddSkillIfMissingScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

export class EditSkillsInJobVacancyTest  extends BaseRestTest {

    private static readonly RANDOM_SUFFIX: string = UUID.randomUUID().toString();
    private static readonly JOB_TITLE: string = "Gardener_" + EditSkillsInJobVacancyTest.RANDOM_SUFFIX;
    public static readonly INTERMEDIATE: string = "Intermediate";
    public static readonly ALREADY_REMOVED: number = 3;
    public static readonly GARDENING: string = "gardening";
    public static readonly HORTICULTURE: string = "horticulture";
    public static readonly AGRICULTURE: string = "agriculture";
    public static readonly ADVANCED: string = "Advanced";
    public static readonly BEGINNER: string = "Beginner";
    public static readonly EXPERT: string = "Expert";
    private jobId: string;
    private user: UserModel;
    private skillsNumberContainer: ResultContainer = new ResultContainer();

    public initialize(): void {
        let jobModel: JobModel = this.getObjectFromJson("fixtures/job/GardenerJobVacancy.json", JobModel);
        jobModel.setId(EditSkillsInJobVacancyTest.RANDOM_SUFFIX);
        let linkedRole: any = new LinkedRole();
        linkedRole.setInternalId(this.getPortalConfig(this.portalIndex).getGardenerRoleId());
        linkedRole.setLinkedRoleStatus("DECLARED");
        jobModel.setLinkedRoles(Collections.singletonList(linkedRole));
      this.jobId = this.createJob(EditSkillsInJobVacancyTest.JOB_TITLE, jobModel);
      this.user = this.createUser();
    }

    public shouldEditSkillsInJobVacancy(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .goToCareerGrowthPage()
                .goToVacanciesPageViaTab()
                .typeSearchValue(EditSkillsInJobVacancyTest.JOB_TITLE)
                .goToFirstJobVacancyOnAllJobsList()
                .waitForSkills()
                .getNumberOfSkillsInCategory(null, this.skillsNumberContainer)
                .run(new AddSkillIfMissingScenario(EditSkillsInJobVacancyTest.HORTICULTURE, this.skillsNumberContainer))
                .run(new AddSkillIfMissingScenario(EditSkillsInJobVacancyTest.GARDENING, this.skillsNumberContainer))
                .run(new AddSkillIfMissingScenario(EditSkillsInJobVacancyTest.AGRICULTURE, this.skillsNumberContainer))
                .clickEditVacancyButton()
                .removeSkillFromLevel(EditSkillsInJobVacancyTest.GARDENING, EditSkillsInJobVacancyTest.INTERMEDIATE)
                .addSkillToProficiencyLevel(EditSkillsInJobVacancyTest.GARDENING, EditSkillsInJobVacancyTest.ADVANCED)
                .removeSkillFromLevel(EditSkillsInJobVacancyTest.HORTICULTURE, EditSkillsInJobVacancyTest.INTERMEDIATE)
                .addSkillToProficiencyLevel(EditSkillsInJobVacancyTest.HORTICULTURE, EditSkillsInJobVacancyTest.BEGINNER)
                .removeSkillFromLevel(EditSkillsInJobVacancyTest.AGRICULTURE, EditSkillsInJobVacancyTest.INTERMEDIATE)
                .addSkillToProficiencyLevel(EditSkillsInJobVacancyTest.AGRICULTURE, EditSkillsInJobVacancyTest.EXPERT)
                .clickSaveButton()
                .refreshPage()
                .check(JobVacancyDetailsAssertions)
                    .assertThatSkillIsAddedToLevel(EditSkillsInJobVacancyTest.GARDENING, EditSkillsInJobVacancyTest.ADVANCED)
                    .assertThatSkillIsAddedToLevel(EditSkillsInJobVacancyTest.HORTICULTURE, EditSkillsInJobVacancyTest.BEGINNER)
                    .assertThatSkillIsAddedToLevel(EditSkillsInJobVacancyTest.AGRICULTURE, EditSkillsInJobVacancyTest.EXPERT)
                    .assertSkillsOfIndicatedLevelHavePrecisely(EditSkillsInJobVacancyTest.INTERMEDIATE, Integer.parseInt(this.skillsNumberContainer.getValue()) - EditSkillsInJobVacancyTest.ALREADY_REMOVED);

    }

    public afterTests(): void {
        this.deleteUser(this.user);
        this.deleteJob(this.jobId);
    }

}
