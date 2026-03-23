import { EditJobVacancyAssertions } from "assertions/careergrowth/jobs/EditJobVacancyAssertions";
import { JobVacancyDetailsAssertions } from "assertions/careergrowth/jobs/JobVacancyDetailsAssertions";
import { OpportunityMarketplaceConfigurationAssertions } from "assertions/careergrowth/jobs/OpportunityMarketplaceConfigurationAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { JobModel } from "models/job/JobModel";
import { LinkedRole } from "models/job/LinkedRole";
import { ResultContainer } from "models/ResultContainer";
import { UserModel } from "models/user/UserModel";
import { JobVacancyDetailsPage } from "pages/careergrowth/jobs/JobVacancyDetailsPage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";

export class DefaultLevelForJobVacancyTest extends BaseRestTest {

    private static readonly RANDOM_SUFFIX: string = UUID.randomUUID().toString();
    private static readonly JOB_TITLE: string = "Gardener_" + DefaultLevelForJobVacancyTest.RANDOM_SUFFIX;
    private jobId: string;
    private user: UserModel;
    private resultContainer: ResultContainer = new ResultContainer();

    public initialize(): void {
      this.user = this.createUser(true);
        let jobModel: JobModel = this.getObjectFromJson("fixtures/job/GardenerJobVacancy.json", JobModel);
        jobModel.setId(DefaultLevelForJobVacancyTest.RANDOM_SUFFIX);
        let linkedRole: any = new LinkedRole();
        linkedRole.setInternalId(this.getPortalConfig(this.portalIndex).getGardenerRoleId());
        linkedRole.setLinkedRoleStatus("DECLARED");
        jobModel.setLinkedRoles(Collections.singletonList(linkedRole));
      this.jobId = this.createJob(DefaultLevelForJobVacancyTest.JOB_TITLE, jobModel);
    }

    public shouldBeIntermediateSetAsDefaultSkillLevel(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .goToAdminPanel()
                .selectOpportunityMarketplace()
                .openMenuForOpportunityMarketplace("Job Vacancy")
                .openSkillsTab()
                .check(OpportunityMarketplaceConfigurationAssertions)
                    .assertDefaultLevelForJobVacancySkillsDetection("Intermediate")
                .endAssertion();
    }

    public shouldBeParsedSkillGroupedAsIntermediateLevel(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToCareerGrowthPage()
                .goToVacanciesPageViaCard()
                .typeSearchValue(DefaultLevelForJobVacancyTest.JOB_TITLE)
                .goToFirstJobVacancyOnAllJobsList()
                .waitForSkills()
                .getNumberOfSkillsInCategory(null, this.resultContainer)
                .check(JobVacancyDetailsAssertions)
                    .assertThereAreNoLevels()
                    .assertPresenceOfSkills(this.resultContainer)
                .endAssertion()
                .clickEditVacancyButton()
                .check(EditJobVacancyAssertions)
                    .assertNumberOfProficiencyLevels(1)
                    .assertPresenceOfProficiencyLevel("Intermediate")
                    .assertNumberOfIntermediateSkillsIsAtLeast(Integer.parseInt(this.resultContainer.getValue()));
    }

    public afterTests(): void {
        this.deleteUser(this.user);
        this.deleteJob(this.jobId);
    }
}
