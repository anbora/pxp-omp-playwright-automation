import { JobVacancyDetailsAssertions } from "assertions/careergrowth/jobs/JobVacancyDetailsAssertions";
import { SkillsPassportMePageAssertions } from "assertions/careergrowth/jobs/SkillsPassportMePageAssertions";
import { MatchingAnalysisModalAssertions } from "assertions/careergrowth/MatchingAnalysisModalAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { JobVacancyDetailsPage } from "pages/careergrowth/jobs/JobVacancyDetailsPage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";
import { AddSkillToCareerProfileScenario } from "scenarios/profile/AddSkillToCareerProfileScenario";

export class JobVacancySkillPassportTest_SkillLevel extends BaseRestTest {

    private TITLE: string = "Ruby developer " + UUID.randomUUID();
    private numberOfYourSkillsBeforeAddingSkill: number = 0;
    private numberOfYourSkillsAfterAddingSkill: number = 1;
    private contests: string = "contests";
    private ruby: string = "ruby";
    private beginner: string = "Beginner";
    private intermediate: string = "Intermediate";
    private jobId: string;
    private user: UserModel;

    public initialize(): void {
      this.jobId = this.createJob(this.TITLE);
      this.user = this.createUser();
    }

    public shouldAddSkillsToSkillPassport(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .run(new AddRoleAndFamilyToNewUserScenario(this.user.name))
                .goToCareerGrowthPage()
                .goToVacanciesPageViaTab()
                .typeSearchValue(this.TITLE)
                .goToFirstJobVacancyOnAllJobsList()
                .waitForSkills()
                .check(JobVacancyDetailsAssertions)
                    .assertThatTitleEqualTo(this.TITLE)
                    .assertThatAddSkillsToPassportButtonIsVisible()
                .endAssertion()
                .showMatchDetails()
                .updateSkills()
                .run(new AddSkillToCareerProfileScenario(this.contests, this.beginner))
                .clickSaveAndContinueButton()
                .clickXButton(JobVacancyDetailsPage)
                .openMatchDetailsWithWaitForData()
                .check(MatchingAnalysisModalAssertions)
                    .assertNumberOfPossessedSkills(this.numberOfYourSkillsBeforeAddingSkill)
                .endAssertion()
                .clickCLose()
                .addSkillsToPassport()
                .selectLevel(this.ruby, this.intermediate)
                .addSkill()
                .openMatchDetailsWithWaitForData()
                .check(MatchingAnalysisModalAssertions)
                    .assertNumberOfPossessedSkills(this.numberOfYourSkillsAfterAddingSkill)
                .endAssertion();
    }

    public shouldDeleteSkill(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToMePageProfile()
                .goToSkillPassportTab()
                .openSkillDetails(this.ruby)
                .deleteSkill()
                .clickConfirm()
                .check(SkillsPassportMePageAssertions)
                    .assertThatSkillIsNotVisible(this.ruby);
    }

    public afterTests(): void {
        this.deleteJob(this.jobId);
        this.deleteUser(this.user);
    }
}
