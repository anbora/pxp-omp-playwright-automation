import { ExperienceCareerProfileModalAssertions } from "assertions/careergrowth/profiles/ExperienceCareerProfileModalAssertions";
import { PreferencesCareerProfileModalAssertions } from "assertions/careergrowth/profiles/PreferencesCareerProfileModalAssertions";
import { SkillsCareerProfileModalAssertions } from "assertions/careergrowth/profiles/SkillsCareerProfileModalAssertions";
import { SkillToDevelopAssertions } from "assertions/careergrowth/profiles/SkillToDevelopAssertions";
import { LandingPageAssertions } from "assertions/landing/LandingPageAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { SkillsToDevelopPage } from "pages/careergrowth/profiles/SkillsToDevelopPage";
import { LandingPage } from "pages/landing/LandingPage";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

export class CompleteYourProfileWidgetWithResumeUploadTest extends BaseRestTest {

    private readonly filePath: string = "src/main/resources/fixtures/Christopher_Morgan_cv.pdf";;
    private readonly workHistoryDate: string = "Sep 2015 - May 2019";
    private readonly workHistoryPosition: string = "Web Developer";
    private readonly workHistoryCompany: string = "Luna Web Design";
    private readonly subheaderName1: string = "Current skills";
    private readonly subheaderName2: string = "Skills to develop";
    private readonly subheaderName3: string = "Career Preferences";
    private readonly percentageValueStep1: string = "20% profile completed";
    private readonly percentageValueStep2: string = "100% profile completed";
    private readonly NoviceSkillName: string = "management";
    private readonly NoviceSkillName2: string = "teamwork";
    private readonly progressCountStep1: string = "20";
    private readonly progressCountStep2: string = "40";
    private readonly progressCountStep3: string = "60";
    private readonly progressCountStep4: string = "80";
    private readonly careerGoal: string = "Career Goal";
    private readonly forward: string = "I want to progress my career and take on more responsibility";
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser();

    }

    public shouldCheckThatCompleteYourProfileWidgetIsWorking(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .check(LandingPageAssertions)
                    .assertThatYourCompleteYourProfileWidgetIsDisplayed()
                    .assertCompleteYourProfilePercentageCompleted(this.percentageValueStep1)
                    .assertCompleteYourProfileWidgetCompleteNowIsDisplayed()
                    .assertCompleteYourProfileWidgetAvatarIsDisplayed()
                .endAssertion()
                .clickCompleteNowButton()
                .check(ExperienceCareerProfileModalAssertions)
                    .assertCompleteYourProfileModalHeaderIsDisplayed()
                    .assertCompleteYourProfileProgressCount(this.progressCountStep1)
                .endAssertion()
                .clickSelectFile()
                .uploadFile(this.filePath)
                .clickUploadButton()
                .clickNextButton()
                .clickAddButton()
                .check(ExperienceCareerProfileModalAssertions)
                    .assertThatTextInWorkHistoryLineIsAdded(this.workHistoryDate)
                    .assertThatTextInWorkHistoryLineIsAdded(this.workHistoryPosition)
                    .assertThatTextInWorkHistoryLineIsAdded(this.workHistoryCompany)
                    .assertThatSaveAndContinueIsDisplayed()
                .endAssertion()
                .clickSaveAndContinueButton()
                .check(SkillsCareerProfileModalAssertions)
                    .assertCompleteYourProfileModalSubHeaderIsDisplayed(this.subheaderName1)
                    .assertCompleteYourProfileProgressCount(this.progressCountStep2)
                .endAssertion()
                .searchForSkill(this.NoviceSkillName, "Novice")
                .selectOptionFromSkillsDropdown(this.NoviceSkillName)
                .check(SkillsCareerProfileModalAssertions)
                    .assertThatSaveAndContinueIsDisplayed()
                .endAssertion()
                .clickSaveAndContinueButton()
                .check(SkillToDevelopAssertions)
                    .assertCompleteYourProfileModalSubHeaderIsDisplayed(this.subheaderName2)
                    .assertCompleteYourProfileProgressCount(this.progressCountStep3)
                .endAssertion()
                .searchForSkill(this.NoviceSkillName2, "Novice")
                .selectOptionFromSkillsDropdown(this.NoviceSkillName2)
                .check(SkillToDevelopAssertions)
                    .assertThatSaveAndContinueIsDisplayed()
                .endAssertion()
                .clickSaveAndContinueButton()
                .check(PreferencesCareerProfileModalAssertions)
                    .assertCompleteYourProfileModalSubHeaderIsDisplayed(this.subheaderName3)
                    .assertCompleteYourProfileProgressCount(this.progressCountStep4)
                .endAssertion()
                .select1stChkBoxCareerPrefs()
                .clickSaveAndContinueButton()
                .check(PreferencesCareerProfileModalAssertions)
                    .assertThatProfileCompletedHeaderIsDisplayed()
                    .assertThatProfileCompletedProgressCountIsDisplayed()
                .endAssertion()
                .clickSaveButton(LandingPage)
                .check(LandingPageAssertions)
                    .assertCompleteYourProfilePercentageCompleted(this.percentageValueStep2)
                    .assertCompleteYourProfileWidgetUpdateNowIsDisplayed();
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
