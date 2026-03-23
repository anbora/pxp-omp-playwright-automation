import { EditJobDiscardChangesModalAssertions } from "assertions/careergrowth/jobs/EditJobDiscardChangesModalAssertions";
import { EditJobVacancyAssertions } from "assertions/careergrowth/jobs/EditJobVacancyAssertions";
import { JobVacancyDetailsAssertions } from "assertions/careergrowth/jobs/JobVacancyDetailsAssertions";
import { MyOpportunitiesAssertions } from "assertions/careergrowth/jobs/MyOpportunitiesAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { ResultContainer } from "models/ResultContainer";
import { UserModel } from "models/user/UserModel";
import { WelcomePage_New } from "pages/careergrowth/careergrowth/WelcomePage_New";
import { JobVacancyDetailsPage } from "pages/careergrowth/jobs/JobVacancyDetailsPage";
import { MyOpportunitiesPage } from "pages/careergrowth/jobs/MyOpportunitiesPage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

export class EditAppliedJobVacancyTest extends BaseRestTest {

    public static readonly INTERMEDIATE: string = "Intermediate";
    public static readonly ADVANCED: string = "Advanced";
    private TITLE: string = UUID.randomUUID().toString();
    private SKILL_CONFLUENCE: string = "confluence";
    private SKILL_LEADERSHIP: string = "leadership";
    private SKILL_KAFKA: string = "kafka";
    private applications: string = "Applications";
    private jobId: string;
    private user: UserModel;
    private resultContainer: ResultContainer = new ResultContainer();

    public initialize(): void {
      this.jobId = this.createJob(this.TITLE);
      this.user = this.createUser();
    }

    public shouldAddSkillToAppliedJob(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .goToCareerGrowthPage()
                .goToVacanciesPageViaTab()
                .typeSearchValue(this.TITLE)
                .goToFirstJobVacancyOnAllJobsList()
                .clickApplyButton()
                .clickCloseButton()
                .clickEditVacancyButton()
                .removeAllAdvancedSkills()
                .addSkillToProficiencyLevel(this.SKILL_CONFLUENCE, EditAppliedJobVacancyTest.INTERMEDIATE)
                .check(EditJobVacancyAssertions)
                    .assertThatSkillIsAddedToLevel(this.SKILL_CONFLUENCE, EditAppliedJobVacancyTest.INTERMEDIATE)
                .endAssertion()
                .clickSaveButton()
                .waitForParticularSkill(this.SKILL_CONFLUENCE)
                .check(JobVacancyDetailsAssertions)
                    .assertThatSkillIsAdded(this.SKILL_CONFLUENCE)
                .endAssertion()
                .clickEditVacancyButton()
                .addSkillToProficiencyLevel(this.SKILL_KAFKA, EditAppliedJobVacancyTest.ADVANCED)
                .check(EditJobVacancyAssertions)
                    .assertThatSkillIsAddedToLevel(this.SKILL_KAFKA, EditAppliedJobVacancyTest.ADVANCED)
                .endAssertion()
                .clickSaveButton()
                .waitForParticularSkill(this.SKILL_KAFKA)
                .check(JobVacancyDetailsAssertions)
                    .assertThatSkillIsAddedToLevel(this.SKILL_CONFLUENCE, EditAppliedJobVacancyTest.INTERMEDIATE)
                    .assertThatSkillIsAddedToLevel(this.SKILL_KAFKA, EditAppliedJobVacancyTest.ADVANCED)
                .endAssertion();
    }

    public shouldCheckIfDiscardChangesModalAppears(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToMePageProfile()
                .clickOpenJobsTab()
                .selectLeftMenuTab(this.applications)
                .waitForJobToBeVisible()
                .editJob(this.TITLE)
                .addSkillToProficiencyLevel(this.SKILL_LEADERSHIP, EditAppliedJobVacancyTest.INTERMEDIATE)
                .check(EditJobVacancyAssertions)
                    .assertThatSkillIsAddedToLevel(this.SKILL_LEADERSHIP, EditAppliedJobVacancyTest.INTERMEDIATE)
                .endAssertion()
                .clickCancelButton()
                .check(EditJobDiscardChangesModalAssertions)
                    .assertThatDiscardChangesTitleIsDisplayed()
                .endAssertion()
                .clickCancelButton()
                .check(EditJobVacancyAssertions)
                    .assertThatEditJobVacancyPageTitleIsDisplayed()
                .endAssertion()
                .clickCancelButton()
                .check(EditJobDiscardChangesModalAssertions)
                    .assertThatDiscardChangesTitleIsDisplayed()
                .endAssertion()
                .clickDiscardButton(MyOpportunitiesPage)
                .check(MyOpportunitiesAssertions)
                    .assertThatJobTitleIsPresentOnTheList(this.TITLE)
                .endAssertion();
    }

    public afterTests(): void {
        this.deleteUser(this.user);
        this.deleteJob(this.jobId);
    }
}
