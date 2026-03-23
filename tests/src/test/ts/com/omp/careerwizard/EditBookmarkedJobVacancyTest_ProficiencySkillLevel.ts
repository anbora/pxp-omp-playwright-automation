import { EditJobDiscardChangesModalAssertions } from "assertions/careergrowth/jobs/EditJobDiscardChangesModalAssertions";
import { EditJobVacancyAssertions } from "assertions/careergrowth/jobs/EditJobVacancyAssertions";
import { JobVacancyDetailsAssertions } from "assertions/careergrowth/jobs/JobVacancyDetailsAssertions";
import { MyOpportunitiesAssertions } from "assertions/careergrowth/jobs/MyOpportunitiesAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { JobVacancyDetailsPage } from "pages/careergrowth/jobs/JobVacancyDetailsPage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

export class EditBookmarkedJobVacancyTest_ProficiencySkillLevel extends BaseRestTest {

    public TITLE: string = UUID.randomUUID().toString();
    public SKILL_DEBUGGING: string = "debugging";
    public SKILL_CRYPTOGRAPHY: string = "cryptography";
    public applications: string = "Applications";
    public bookmarked: string = "Bookmarked";
    public jobId: string;
    private user: UserModel;

    public initialize(): void {
      this.user = this.createUser();
      this.jobId = this.createJob(this.TITLE, true);
    }

    public shouldAddSkillToBookmarkedJob(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .goToCareerGrowthPage()
                .goToVacanciesPageViaCard()
                .typeSearchValue(this.TITLE)
                .clickJobVacancyCardsDetails(this.TITLE)
                .clickBookmarkButton()
                .goToMePageProfile()
                .clickOpenJobsTab()
                .selectLeftMenuTab(this.bookmarked)
                .waitForJobToBeVisible()
                .editJob(this.TITLE)
                .addSkillToProficiencyLevel(this.SKILL_DEBUGGING, "Advanced")
                .check(EditJobVacancyAssertions)
                    .assertThatSkillIsAddedToLevel(this.SKILL_DEBUGGING, "Advanced")
                .endAssertion()
                .clickSaveButtonAndGoBackToMyOpportunitiesPage()
                .goToMePageProfile();
    }

    public unbookmarkJobVacancy(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToMePageProfile()
                .clickOpenJobsTab()
                .selectLeftMenuTab(this.applications)
                .selectLeftMenuTab(this.bookmarked)
                .waitForJobSkillToBeVisibleOnJobCard(this.TITLE, this.SKILL_DEBUGGING)
                .check(MyOpportunitiesAssertions)
                    .assertThatSkillChipIsDisplayedForTheJob(this.TITLE, this.SKILL_DEBUGGING)
                .endAssertion()
                .clickUnbookmarkJobVacancyByTitle(this.TITLE);
    }

    public shouldCheckIfDiscardChangesModalAppears(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToCareerGrowthPage()
                .goToVacanciesPageViaCard()
                .typeSearchValue(this.TITLE)
                .clickJobVacancyCardsDetails(this.TITLE)
                .clickEditVacancyButton()
                .addSkillToProficiencyLevel(this.SKILL_CRYPTOGRAPHY, "Beginner")
                .check(EditJobVacancyAssertions)
                    .assertThatSkillIsAddedToLevel(this.SKILL_CRYPTOGRAPHY, "Beginner")
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
                    .assertThatTitleEqualTo(this.TITLE)
                .endAssertion();
    }

    public afterTests(): void {
        this.deleteJob(this.jobId);
        this.deleteUser(this.user);
    }
}
