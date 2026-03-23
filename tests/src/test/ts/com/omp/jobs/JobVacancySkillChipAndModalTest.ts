import { VacanciesListAssertions } from "assertions/careergrowth/careergrowth/VacanciesListAssertions";
import { MatchingSkillsModalAssertions } from "assertions/careergrowth/MatchingSkillsModalAssertions";
import { SkillsCareerProfileModalAssertions } from "assertions/careergrowth/profiles/SkillsCareerProfileModalAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";
import { AddSkillToCareerProfileScenario } from "scenarios/profile/AddSkillToCareerProfileScenario";
import { AddSkillToNewUserScenario_SkillLevel } from "scenarios/profile/AddSkillToNewUserScenario_SkillLevel";

export class JobVacancySkillChipAndModalTest extends BaseRestTest {

    private TITLE: string = UUID.randomUUID().toString();
    private SKILL_MORE_LINK: string = "more";
    private jobVacancySkills: string = "Matching skills";
    private zeroMatchingSkillsOutOfFour: string = "0 out of 4 match your profile";
    private oneMatchingSkillsOutOfFive: string = "1 out of 5 match your profile";
    private commissioning: string = "commissioning";
    private cryptography: string = "cryptography";
    private lobbying: string = "lobbying";
    private recruiting: string = "recruiting";
    private regression: string = "regression";
    private beginner: string = "Beginner";
    private intermediate: string = "Intermediate";
    private advanced: string = "Advanced";
    private one: string = "2";
    private two: string = "3";
    private intermediateSkillMatching: string = "icon-skill-this.intermediate skill-matched";
    public jobId: string;

    private user: UserModel;

    public initialize(): void {
      this.jobId = this.createJob(this.TITLE);
      this.user = this.createUser();
    }

    public shouldCheckIfThereIsNoRemainingSkillsAndAddNewOne(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .run(new AddRoleAndFamilyToNewUserScenario(this.user.name))
                .run(new AddSkillToNewUserScenario_SkillLevel())
                .goToCareerGrowthPage()
                .goToVacanciesPageViaCard()
                .typeSearchValue(this.TITLE)
                .goToFirstJobVacancyOnAllJobsList()
                .goToCareerGrowthPage()
                .goToVacanciesPageViaTab()
                .typeSearchValue(this.TITLE)
                .waitForJobSkillToNotBeVisible(this.TITLE)
                .typeSearchValue(this.TITLE)
                .check(VacanciesListAssertions)
                    .assertThatThereIsNoSkillsForJob(this.TITLE)
                .endAssertion()
                .clickJobVacancyCardsDetails(this.TITLE)
                .clickEditVacancyButton()
                .addSkillToProficiencyLevel(this.commissioning, this.beginner)
                .clickSaveButton();
    }

    public shouldCheckIfNewSkillAppearsSkillsModalAndAddSkillToProfile(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToCareerGrowthPage()
                .goToVacanciesPageViaTab()
                .waitForJobSkillToBeVisible(this.TITLE, this.commissioning)
                .check(VacanciesListAssertions)
                    .assertThatSkillIsDisplayedForJob(this.TITLE, this.commissioning)
                .endAssertion()
                .clickUpdateCareerProfileLink()
                .clickSkipForNowButton()
                .run(new AddSkillToCareerProfileScenario(this.commissioning, this.beginner))
                .check(SkillsCareerProfileModalAssertions)
                    .assertThatSkillIsDisplayed(this.beginner, this.commissioning)
                .endAssertion()
                .clickSaveAndContinueButton()
                .clickXButton();
    }

    public shouldCheckMoreSkillsLinkAndItsModal(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToCareerGrowthPage()
                .goToVacanciesPageViaTab()
                .typeSearchValue(this.TITLE)
                .goToFirstJobVacancyOnAllJobsList()
                .clickEditVacancyButton()
                .addSkillToProficiencyLevel(this.cryptography, this.advanced)
                .addSkillToProficiencyLevel(this.lobbying, this.beginner)
                .addSkillToProficiencyLevel(this.recruiting, this.intermediate)
                .addSkillToProficiencyLevel(this.regression, this.advanced)
                .clickSaveButton()
                .clickBackButton()
                .waitForJobSkillToBeVisible(this.TITLE, this.recruiting)
                .check(VacanciesListAssertions)
                    .assertThatSkillIsDisplayedForJob(this.TITLE, this.recruiting)
                    .assertThatSkillsElementOnJobCardEqualTo(this.SKILL_MORE_LINK)
                    .assertThatNumberOfRemainingSkillsIsEqualTo(this.TITLE, this.two)
                .endAssertion()
                .clickMoreSkillsButton(this.TITLE)
                .check(MatchingSkillsModalAssertions)
                    .assertMatchingSkillExpectedLevelIs(this.commissioning, this.beginner)
                    .assertMatchingSkillExpectedLevelIs(this.lobbying, this.beginner)
                    .assertMatchingSkillExpectedLevelIs(this.recruiting, this.intermediate)
                    .assertMatchingSkillExpectedLevelIs(this.cryptography, this.advanced)
                    .assertMatchingSkillExpectedLevelIs(this.regression, this.advanced);
    }

    public afterTests(): void {
        this.deleteJob(this.jobId);
        this.deleteUser(this.user);
    }
}
