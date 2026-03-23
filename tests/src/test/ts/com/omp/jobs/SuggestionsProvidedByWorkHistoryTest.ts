import { VacanciesListAssertions } from "assertions/careergrowth/careergrowth/VacanciesListAssertions";
import { ExperienceCareerProfileModalAssertions } from "assertions/careergrowth/profiles/ExperienceCareerProfileModalAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { WelcomePage_New } from "pages/careergrowth/careergrowth/WelcomePage_New";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddBasicCareerPreferencesForUser } from "scenarios/profile/AddBasicCareerPreferencesForUser";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";

export class SuggestionsProvidedByWorkHistoryTest extends BaseRestTest {

    private TITLE: string = "Surgeon " + UUID.randomUUID();
    private TITLE_TEXT: string = "Surgeon";
    private workHistoryCompany01: string = "Hospital";
    private workHistoryDescription01: string = "surgery, medical, hospital";
    private startDateMonth01: string = "Oct";
    private startDateYear01: string = "2017";
    private endDateMonth01: string = "Jun";
    private endDateYear01: string = "2023";

    private workHistoryPosition02: string = "DOCTOR";
    private workHistoryCompany02: string = "Hospital2";
    private workHistoryDescription02: string = "medical, hospital";
    private startDateMonth02: string = "Oct";
    private startDateYear02: string = "2013";
    private endDateMonth02: string = "Jun";
    private endDateYear02: string = "2017";

    private careerGoal: string = "Career Goal";
    private level: string = "Level";
    private workplaceModel: string = "Workplace Model";
    private jobType: string = "Job Type";
    private schedule: string = "Schedule";
    private careerTrack: string = "Career Track";
    private backward: string = "I am open to roles with lower levels of responsibility";
    private internship: string = "Professional";
    private remote: string = "Hybrid";
    private temporary: string = "Internship";
    private partTime: string = "Full time";
    private individualContributor: string = "Management";

    private jobId: string;
    private user: UserModel;

    public initialize(): void {
      this.user = this.createUser();
      this.jobId = this.createJob(this.TITLE);
    }

    public shouldUpdateProfileByAddingWorkHistory(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .run(new AddRoleAndFamilyToNewUserScenario(this.user.name))
                .run(new AddBasicCareerPreferencesForUser())
                .goDirectlyTo(WelcomePage_New)
                .refreshPage()
                .clickUpdateCareerProfileLink()
                .goToCareerPreferenceTab()
                .selectCareerPreferenceCheckbox(this.careerGoal, this.backward)
//                .addCareerPreference(level, internship)
                .selectCareerPreferenceCheckbox(this.workplaceModel, this.remote)
//                .addCareerPreference(jobType, temporary)
                .selectCareerPreferenceCheckbox(this.schedule, this.partTime)
                .selectCareerPreferenceCheckbox(this.careerTrack, this.individualContributor)
                .clickSaveAndContinueButton()
                .clickSaveButton()
                .goToCareerGrowthPage()
                .clickUpdateCareerProfileLink()
                .clickAddMoreExperience()
                .selectStartDateMonth(this.startDateMonth01)
                .selectStartDateYear(this.startDateYear01)
                .selectEndDateMonth(this.endDateMonth01)
                .selectEndDateYear(this.endDateYear01)
                .fillPositionTitle(this.TITLE_TEXT)
                .fillCompanyName(this.workHistoryCompany01)
                .fillDescription(this.workHistoryDescription01)
                .clickDoneButton()
                .clickAddMoreExperience()
                .selectStartDateMonth(this.startDateMonth02)
                .selectStartDateYear(this.startDateYear02)
                .selectEndDateMonth(this.endDateMonth02)
                .selectEndDateYear(this.endDateYear02)
                .fillPositionTitle(this.workHistoryPosition02)
                .fillCompanyName(this.workHistoryCompany02)
                .fillDescription(this.workHistoryDescription02)
                .clickDoneButton()
                .check(ExperienceCareerProfileModalAssertions)
                    .assertThatTextInWorkHistoryLineIsAdded(this.startDateMonth01 + " " + this.startDateYear01 + " - " + this.endDateMonth01 + " " + this.endDateYear01)
                    .assertThatTextInWorkHistoryLineIsAdded(this.TITLE_TEXT)
                    .assertThatTextInWorkHistoryLineIsAdded(this.workHistoryCompany01)
                    .assertThatTextInWorkHistoryLineIsAdded(this.startDateMonth02 + " " + this.startDateYear02 + " - " + this.endDateMonth02 + " " + this.endDateYear02)
                    .assertThatTextInWorkHistoryLineIsAdded(this.workHistoryPosition02)
                    .assertThatTextInWorkHistoryLineIsAdded(this.workHistoryCompany02)
                .endAssertion()
                .clickSaveAndContinueButton()
                .clickXButton();
    }

    public shouldCheckSuggestionsProvidedByWorkHistory(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToCareerGrowthPage()
                .goToVacanciesPageViaCard()
                .typeSearchValue(this.TITLE)
                .clearSearchKeywordCriteria()
                .waitForGoodOrExcellentMatchForSuggestedJobVacancy()
                .check(VacanciesListAssertions)
                    .assertThatJobVacancyTitleSuggestionIsPresentOnTheList(this.TITLE_TEXT);
    }

    public shouldUpdateCareerProfileByDeletingWorkHistory(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToCareerGrowthPage()
                .clickUpdateCareerProfileLink()
                .deleteFirstWorkHistoryLine()
                .check(ExperienceCareerProfileModalAssertions)
                    .assertThatTextInWorkHistoryNotExists(this.startDateMonth01 + " " + this.startDateYear01 + " - " + this.endDateMonth01 + " " + this.endDateYear01)
                    .assertThatTextInWorkHistoryNotExists(this.TITLE_TEXT)
                    .assertThatTextInWorkHistoryNotExists(this.workHistoryCompany01)
                .endAssertion()
                .deleteFirstWorkHistoryLine()
                .check(ExperienceCareerProfileModalAssertions)
                    .assertThatTextInWorkHistoryNotExists(this.startDateMonth02 + " " + this.startDateYear02 + " - " + this.endDateMonth02 + " " + this.endDateYear02)
                    .assertThatTextInWorkHistoryNotExists(this.workHistoryPosition02)
                    .assertThatTextInWorkHistoryNotExists(this.workHistoryCompany02)
                .endAssertion()
                .clickSaveAndContinueButton()
                .clickXButton();
    }

    public shouldCheckSuggestionsAfterWorkHistoryBeingRemoved(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToCareerGrowthPage()
                .goToVacanciesPageViaCard()
                .waitUntilJobVacancyTitleDisappearsFromRecommendations(this.TITLE_TEXT)
                .check(VacanciesListAssertions)
                    .assertThatJobVacancySuggestionIsNotPresentOnTheList(this.TITLE_TEXT);
    }

    public afterTests(): void {
        this.deleteUser(this.user);
        this.deleteJob(this.jobId);
    }
}
