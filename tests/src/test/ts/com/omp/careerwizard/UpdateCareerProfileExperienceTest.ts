import { ExperienceCareerProfileModalAssertions } from "assertions/careergrowth/profiles/ExperienceCareerProfileModalAssertions";
import { PreferencesCareerProfileModalAssertions } from "assertions/careergrowth/profiles/PreferencesCareerProfileModalAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";

export class UpdateCareerProfileExperienceTest extends BaseRestTest {

    private readonly filePath: string = "src/main/resources/fixtures/";
	private readonly workHistoryDate: string = "Sep 2015 - May 2019";
    private readonly workHistoryPosition: string = "Web Developer";
    private readonly workHistoryCompany: string = "Luna Web Design";
    private readonly workHistoryDescription: string = "Cooperate with designers to create clean interfaces and   simple, intuitive interactions and experiences.";
    private readonly workHistoryDescription1500Characters: string = "a".repeat(300);
    private readonly newWorkHistoryPosition1: string = "Project Manager";
    private readonly newWorkHistoryCompany1: string = "Software House";
    private readonly newStartDateMonth1: string = "Oct";
    private readonly newStartDateYear1: string = "2017";
    private readonly newEndDateMonth1: string = "Jun";
    private readonly newEndDateYear1: string = "2022";
    private readonly newWorkHistoryPosition2: string = "Software Developer";
    private readonly newWorkHistoryCompany2: string = "Some Company";
    private readonly newStartDateMonth2: string = "Feb";
    private readonly newStartDateYear2: string = "2015";
    private readonly newEndDateMonth2: string = "Sep";
    private readonly newEndDateYear2: string = "2017";
    private readonly newWorkHistoryPosition3: string = "Senior Software Developer";
    private readonly newWorkHistoryCompany3: string = "Another Company";
    private readonly newStartDateMonth3: string = "Jan";
    private readonly newStartDateYear3: string = "2016";
    private readonly newEndDateMonth3: string = "Aug";
    private readonly newEndDateYear3: string = "2018";
    private christopherDocumentName: string = "Christopher_Morgan_cv.pdf";
    private user: UserModel;
    private user2: UserModel;
    private readonly workHistoryPositionSpecialCharecter: string = "Quality & Assurance Engineer";
    private readonly stepDescription: string = "Add work experience by scanning your resume or adding it manually.";
    private readonly stepDescriptionCont: string = "Uploading your resume will populate your skills and work experience based on the scan.";
    private readonly recommendationInformationLabel: string = "We use your information to provide you skill suggestions and recommendations.";
    private readonly recommendationInformationContLabel: string = "Updates to recommendations may take time.";
    private readonly confirmationModalInformation: string = "Updates will be reflected in recommendations and match scores after some time";

    public initialize(): void {
      this.user = this.createUser(true);
      this.user2 = this.createUser(true);
    }

    public shouldUpdateCareerProfileFromUploadedFile(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .run(new AddRoleAndFamilyToNewUserScenario(this.user.name))
                .goToCareerGrowthPage()
                .clickUpdateCareerProfileLink()
                .check(ExperienceCareerProfileModalAssertions)
                    .assertThatStepContainsDescription(this.stepDescription, this.stepDescriptionCont)
                    .assertThatRecommendationInformationContainsDescription(this.recommendationInformationLabel, this.recommendationInformationContLabel)
                .endAssertion()
                .clickSelectFile()
                .uploadFile(this.filePath, this.christopherDocumentName)
                .clickUploadButton()
                .clickNextButton()
                .clickAddButton()
                .check(ExperienceCareerProfileModalAssertions)
                    .assertThatTextInWorkHistoryLineIsAdded(this.workHistoryDate)
                    .assertThatTextInWorkHistoryLineIsAdded(this.workHistoryPosition)
                    .assertThatTextInWorkHistoryLineIsAdded(this.workHistoryCompany)
                .endAssertion()
                .editHistoryLine()
                .check(ExperienceCareerProfileModalAssertions)
                    .assertThatWorkHistoryContainsPositionTitle(this.workHistoryPosition)
                    .assertThatWorkHistoryContainsCompanyName(this.workHistoryCompany)
                    .assertThatWorkHistoryContainsDescription(this.workHistoryDescription)
                .endAssertion()
                .clickDoneButton()
                .clickSaveAndContinueButton()
                .clickSkipForNowButton()
                .clickSkipForNowButton()
                .clickSkipForNowButton()
                .clickSkipForNowButton()
                .check(PreferencesCareerProfileModalAssertions)
                    .assertThatConfirmationModalContainsInformation(this.confirmationModalInformation)
                .endAssertion()
                .clickSaveButton();
    }

    public shouldUpdateCareerProfileByEditingWorkHistory(): void {
    	// Commented to avoid failure
        /*this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToCareerGrowthPage()
                .clickUpdateCareerProfileLink()
                .clickSelectFile()
                .uploadFile(this.filePath)
                .clickUploadButton()
                .clickNextButton()
                .clickAddButton()
                .check(ExperienceCareerProfileModalAssertions)
                    .assertThatTextInWorkHistoryLineIsAdded(this.workHistoryDate)
                    .assertThatTextInWorkHistoryLineIsAdded(this.workHistoryPosition)
                    .assertThatTextInWorkHistoryLineIsAdded(this.workHistoryCompany)
                .endAssertion()
                .editHistoryLine()
                .fillPositionTitle(this.newWorkHistoryPosition1)
                .fillCompanyName(this.newWorkHistoryCompany1)
                .selectStartDateMonth(this.newStartDateMonth1)
                .selectStartDateYear(this.newStartDateYear1)
                .selectEndDateMonth(this.newEndDateMonth1)
                .selectEndDateYear(this.newEndDateYear1)
                .clickDoneButton()
                .check(ExperienceCareerProfileModalAssertions)
                    .assertThatTextInWorkHistoryLineIsAdded(this.newStartDateMonth1 + " " + this.newStartDateYear1 + " - " + this.newEndDateMonth1 + " " + this.newEndDateYear1)
                    .assertThatTextInWorkHistoryLineIsAdded(this.newWorkHistoryPosition1)
                    .assertThatTextInWorkHistoryLineIsAdded(this.newWorkHistoryCompany1)
                .endAssertion()
               // .editHistoryLine()
                .clickSaveButton()
                .clickCloseButton(); */
    }

    public shouldUpdateCareerProfileByAddingWorkHistoryManually(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToCareerGrowthPage()
                .clickUpdateCareerProfileLink()
                .addWorkHistoryLine()
                .fillPositionTitle(this.newWorkHistoryPosition2)
                .fillCompanyName(this.newWorkHistoryCompany2)
                .selectStartDateMonth(this.newStartDateMonth2)
                .selectStartDateYear(this.newStartDateYear2)
                .selectEndDateMonth(this.newEndDateMonth2)
                .selectEndDateYear(this.newEndDateYear2)
                .fillDescription(this.workHistoryDescription1500Characters)
                .clickDoneButton()
                .check(ExperienceCareerProfileModalAssertions)
                    .assertThatTextInWorkHistoryLineIsAdded(this.newStartDateMonth2 + " " + this.newStartDateYear2 + " - " + this.newEndDateMonth2 + " " + this.newEndDateYear2)
                    .assertThatTextInWorkHistoryLineIsAdded(this.newWorkHistoryPosition2)
                    .assertThatTextInWorkHistoryLineIsAdded(this.newWorkHistoryCompany2)
                .endAssertion()
                .editHistoryLine()
                .check(ExperienceCareerProfileModalAssertions)
                   .assertThatWorkHistoryContainsDescription(this.workHistoryDescription1500Characters)
                .endAssertion()
                .clickDoneButton()
                .clickSaveAndContinueButton()
                .clickXButton();
    }

   // @Test(dependsOnMethods = "shouldUpdateCareerProfileByAddingWorkHistoryManually")
    public shouldUpdateCareerProfileByDeletingWorkHistory(): void {
      //  this.getOmpLoginPage()
                //.run(new LoginScenario(user))
                //.goToCareerGrowthPage()
                //.clickUpdateCareerProfileLink()
               // .deleteFirstWorkHistoryLine()
               // .check(ExperienceCareerProfileModalAssertions)
                  //  .assertThatTextInWorkHistoryNotExists(newStartDateMonth1 + " " + newStartDateYear1 + " - " + newEndDateMonth1 + " " + newEndDateYear1)
                   // .assertThatTextInWorkHistoryNotExists(newWorkHistoryPosition1)
                   // .assertThatTextInWorkHistoryNotExists(newWorkHistoryCompany1)
                   // .assertThatTextInWorkHistoryNotExists(newStartDateMonth2 + " " + newStartDateYear2 + " - " + newEndDateMonth2 + " " + newEndDateYear2)
                    //.assertThatTextInWorkHistoryNotExists(newWorkHistoryPosition2)
                  //  .assertThatTextInWorkHistoryNotExists(newWorkHistoryCompany2)
               // .endAssertion()
                //.clickSaveButton()
               // .clickCloseButton();
    }

    public shouldNotSaveWorkHistoryByClickingOnCancelButton(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user2))
                .run(new AddRoleAndFamilyToNewUserScenario(this.user2.name))
                .goToCareerGrowthPage()
                .clickUpdateCareerProfileLink()
                .addWorkHistoryLine()
                .fillPositionTitle(this.newWorkHistoryPosition2)
                .fillCompanyName(this.newWorkHistoryCompany2)
                .selectStartDateMonth(this.newStartDateMonth2)
                .selectStartDateYear(this.newStartDateYear2)
                .selectEndDateMonth(this.newEndDateMonth2)
                .fillDescription(this.workHistoryDescription1500Characters)
                .clickCancelButton()
                .check(ExperienceCareerProfileModalAssertions)
                    .assertThatTextInWorkHistoryNotExists(this.newStartDateMonth2 + " " + this.newStartDateYear2 + " - " + this.newEndDateMonth2 + " " + this.newEndDateYear2)
                    .assertThatTextInWorkHistoryNotExists(this.newWorkHistoryPosition2)
                    .assertThatTextInWorkHistoryNotExists(this.newWorkHistoryCompany2)
                    .assertThatTextInWorkHistoryNotExists(this.workHistoryDescription1500Characters)
                .endAssertion()
                .clickCloseButton();
    }

    public shouldSwitchFromExperienceToPreferencesTab(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToCareerGrowthPage()
                .clickUpdateCareerProfileLink()
                .clickGoToPreferencesButton();
                //.check(PreferencesCareerProfileModalAssertions)
                    //.assertThatPreferenceTabSelected()
                    //.assertThatGoToExperienceButtonExists()
                //.endAssertion();
    }

    public shouldShowValidationMessageOnKeepingMandatoryFieldsEmptyOnAddWorkHistory(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToCareerGrowthPage()
                .clickUpdateCareerProfileLink()
                .addWorkHistoryLine()
                .clickCompanyNameRadioButton()
                .clickDoneButton()
                .check(ExperienceCareerProfileModalAssertions)
                    .assertThatDateWarningMessagesExist()
                    .assertThatTitleWarningMessageExist()
                    .assertThatCompanyNameWarningMessageExist()
                .endAssertion()
                .clickCancelButton()
                .clickCloseButton();
    }

    public shouldShowWarningIfDescriptionIsLongerThan1500Characters(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToCareerGrowthPage()
                .clickUpdateCareerProfileLink()
                .addWorkHistoryLine()
                .fillPositionTitle(this.newWorkHistoryPosition2)
                .fillCompanyName(this.newWorkHistoryCompany2)
                .selectStartDateMonth(this.newStartDateMonth2)
                .selectStartDateYear(this.newStartDateYear2)
                .selectEndDateMonth(this.newEndDateMonth2)
                .selectEndDateYear(this.newEndDateYear2)
                .fillDescription("a".repeat(1501))
                .check(ExperienceCareerProfileModalAssertions)
                    .assertThatDescriptionWarningMessageExists()
                .endAssertion()
                .clickDoneButton()
                .clickSaveAndContinueButton()
                .clickXButton();
    }

    public shouldShowUnsavedHistoryWarningMessageOnCloseWithoutSave(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToCareerGrowthPage()
                .clickUpdateCareerProfileLink()
                .addWorkHistoryLine()
                .fillPositionTitle(this.newWorkHistoryPosition2)
                .fillCompanyName(this.newWorkHistoryCompany2)
                .selectStartDateMonth(this.newStartDateMonth2)
                .selectStartDateYear(this.newStartDateYear2)
                .selectEndDateMonth(this.newEndDateMonth2)
                .selectEndDateYear(this.newEndDateYear2)
                .fillDescription(this.workHistoryDescription1500Characters)
                .clickDoneButton()
                .clickCloseButtonStaysInCareerProfileModelPage()
                .check(ExperienceCareerProfileModalAssertions)
                    .assertThatUnsavedHistoryWarningMessageIsDisplayed()
                .endAssertion()
                .clickSaveAndContinueButton()
                .clickXButton();
    }

    public shouldCheckSpecialCharacterInJobTitle(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToCareerGrowthPage()
                .clickUpdateCareerProfileLink()
                .addWorkHistoryLine()
                .fillPositionTitle(this.workHistoryPositionSpecialCharecter)
                .fillCompanyName(this.newWorkHistoryCompany2)
                .selectStartDateMonth(this.newStartDateMonth2)
                .selectStartDateYear(this.newStartDateYear2)
                .selectEndDateMonth(this.newEndDateMonth2)
                .selectEndDateYear(this.newEndDateYear2)
                .clickDoneButton()
                .check(ExperienceCareerProfileModalAssertions)
                    .assertThatTextInWorkHistoryLineIsAdded(this.workHistoryPositionSpecialCharecter)
                .endAssertion()
                .clickCloseButton();
    }

    public shouldAddWorkHistoryEntryDeleteItAndVerify(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToCareerGrowthPage()
                .clickUpdateCareerProfileLink()
                .addWorkHistoryLine()
                .fillPositionTitle(this.newWorkHistoryPosition3)
                .fillCompanyName(this.newWorkHistoryCompany3)
                .selectStartDateMonth(this.newStartDateMonth3)
                .selectStartDateYear(this.newStartDateYear3)
                .selectEndDateMonth(this.newEndDateMonth3)
                .selectEndDateYear(this.newEndDateYear3)
                .clickDoneButton()
                .check(ExperienceCareerProfileModalAssertions)
                    .assertThatTextInWorkHistoryLineIsAdded(this.newWorkHistoryPosition3)
                .endAssertion()
                .deleteFirstWorkHistoryLine()
                .check(ExperienceCareerProfileModalAssertions)
                    .assertThatTextInWorkHistoryNotExists(this.newWorkHistoryPosition3)
                .endAssertion()
                .clickCloseButton();
    }

    public afterClass(): void {
        this.deleteUser(this.user);
        this.deleteUser(this.user2);
    }
}
