import { EditJobDiscardChangesModalAssertions } from "assertions/careergrowth/jobs/EditJobDiscardChangesModalAssertions";
import { EditJobVacancyAssertions } from "assertions/careergrowth/jobs/EditJobVacancyAssertions";
import { JobVacancyDetailsAssertions } from "assertions/careergrowth/jobs/JobVacancyDetailsAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { JobVacancyDetailsPage } from "pages/careergrowth/jobs/JobVacancyDetailsPage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";
import { AddSkillToNewUserScenario_SkillLevel } from "scenarios/profile/AddSkillToNewUserScenario_SkillLevel";

export class EditJobVacancyTest_ProficiencySkillLevel extends BaseRestTest {

    public static readonly INTERMEDIATE: string = "Intermediate";
    public static readonly BEGINNER: string = "Beginner";
    private readonly TITLE: string = UUID.randomUUID().toString();
    private readonly SKILL_AJAX: string = "AJAX";
    private readonly SKILL_AP_STYLE: string = "APIs";
    private jobId: string;
    private user: UserModel;

    public initialize(): void {
      this.jobId = this.createJob(this.TITLE);
      this.user = this.createUser();
    }

    public shouldEditJobByAddingSkills(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .run(new AddRoleAndFamilyToNewUserScenario(this.user.name))
                .run(new AddSkillToNewUserScenario_SkillLevel())
                .goToCareerGrowthPage()
                .goToVacanciesPageViaTab()
                .typeSearchValue(this.TITLE)
                .goToFirstJobVacancyOnAllJobsList()
                .clickEditVacancyButton()
                .addSkillToProficiencyLevel(this.SKILL_AJAX, EditJobVacancyTest_ProficiencySkillLevel.INTERMEDIATE)
                .check(EditJobVacancyAssertions)
                    .assertThatSkillIsAddedToLevel(this.SKILL_AJAX, EditJobVacancyTest_ProficiencySkillLevel.INTERMEDIATE)
                .endAssertion()
                .clickSaveButton()
                .waitForParticularSkill(this.SKILL_AJAX)
                .check(JobVacancyDetailsAssertions)
                    .assertThatSkillIsAdded(this.SKILL_AJAX)
                .endAssertion();
    }

    public shouldCheckIfDiscardModalAppears(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToCareerGrowthPage()
                .goToVacanciesPageViaTab()
                .typeSearchValue(this.TITLE)
                .goToFirstJobVacancyOnAllJobsList()
                .clickEditVacancyButton()
                .addSkillToProficiencyLevel(this.SKILL_AP_STYLE, EditJobVacancyTest_ProficiencySkillLevel.BEGINNER)
                .check(EditJobVacancyAssertions)
                    .assertThatSkillIsAddedToLevel(this.SKILL_AP_STYLE, EditJobVacancyTest_ProficiencySkillLevel.BEGINNER)
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
                .clickDiscardButton(JobVacancyDetailsPage)
                .check(JobVacancyDetailsAssertions)
                    .assertThatJobHasTextInContext(this.TITLE)
                .endAssertion();
    }

    public shouldCheckThatTheMemberUserDoesNotHaveAccessToEditJob(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToCareerGrowthPage()
                .goToVacanciesPageViaTab()
                .typeSearchValue(this.TITLE)
                .clickJobVacancyCardsDetails(this.TITLE)
                .check(JobVacancyDetailsAssertions)
                    .assertThatEditJobIsNotVisibleOnJobDetails()
                .endAssertion();
    }

    public afterTests(): void {
        this.deleteJob(this.jobId);
        this.deleteUser(this.user);
    }
}
