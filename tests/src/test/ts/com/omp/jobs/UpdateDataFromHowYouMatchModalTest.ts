import { MatchingAnalysisModalAssertions } from "assertions/careergrowth/MatchingAnalysisModalAssertions";
import { CareerPathAssertions } from "assertions/careergrowth/roles/CareerPathAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { JobModel } from "models/job/JobModel";
import { LinkedRole } from "models/job/LinkedRole";
import { UserModel } from "models/user/UserModel";
import { AddMoreExperienceToCareerProfileScenario } from "scenarios/jobs/AddMoreExperienceToCareerProfileScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddSkillToCareerProfileScenario } from "scenarios/profile/AddSkillToCareerProfileScenario";

export class UpdateDataFromHowYouMatchModalTest extends BaseRestTest {

    private readonly jobTitle: string = "restassureJob" + UUID.randomUUID();
    private readonly jobVacancy: string = "Job Vacancy";
    private readonly low: string = "low";
    private readonly missingData: string = "Missing data";
    private readonly skills: string = "Skills";
    private readonly careerPreferences: string = "Career Preferences";
    private readonly experience: string = "Experience";
    private readonly careerPath: string = "Career Path";
    private readonly noDataSkills: string = "Add this.skills to your profile to see how well you match";
    private readonly anxiety: string = "anxiety";
    private readonly beginner: string = "Beginner";
    private readonly updateSkills: string = "Update your this.skills";
    private readonly noDataPreferences: string = "Add career preferences to your profile to see how well you match";
    private readonly level: string = "Level";
    private readonly internship: string = "Internship";
    private readonly updatePreferences: string = "Update your preferences";
    private readonly noDataExperience: string = "Update your this.experience to see how well you match";
    private readonly bountyHunter: string = "Bounty hunter";
    private readonly lumesse: string = "Lumesse";
    private readonly hunting: string = "hunting";
    private readonly october: string = "Oct";
    private readonly june: string = "Jun";
    private readonly year_2018: string = "2018";
    private readonly year_2023: string = "2023";
    private readonly updateExperience: string = "Update your this.experience";
    private readonly noDataCareerPath: string = "Update your aspirational Job Role to see how well you match";
    jobModel: JobModel;
    private user: UserModel;

    public initialize(): void {
      let jobModel: any = this.getObjectFromJson("fixtures/job/PublicOpportunityWithDeclaredLinkedRoleDto.json", JobModel);
        let linkedRolesList: Array<LinkedRole> = this.jobModel.getLinkedRoles();
        linkedRolesList.get(0).setInternalId("");
        linkedRolesList.get(0).setExternalId("careerpathsmoketest4");
        this.jobModel.setLinkedRoles(linkedRolesList);
        this.createJob(this.jobTitle, this.jobModel);
      this.user = this.createUser();
    }

    public shouldCheckMatchDetailsVisibilityForJobVacancy(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .goToCareerGrowthPage()
                .goToVacanciesPageViaTab()
                .typeSearchValue(this.jobTitle)
                .goToFirstJobVacancyOnAllJobsList()
                .showMatchDetails()
                .check(MatchingAnalysisModalAssertions)
                    .assertThatOverallMatchLabelForFairAndLowMatchIsEqualTo(this.jobVacancy, this.low)
                    .assertThatTabDescriptionIsEqualTo(this.skills, this.missingData)
                //    .assertThatTabDescriptionIsEqualTo(careerPreferences, missingData) //issue: https://jira.csod.com/browse/TM-8509
                    .assertThatTabDescriptionIsEqualTo(this.experience, this.missingData)
                    .assertThatTabDescriptionIsEqualTo(this.careerPath, this.missingData)
                    .assertThatQuestionMarkIconIsDisplayedForTab(this.skills)
                //    .assertThatQuestionMarkIconIsDisplayedForTab(careerPreferences)
                    .assertThatQuestionMarkIconIsDisplayedForTab(this.experience)
                    .assertThatQuestionMarkIconIsDisplayedForTab(this.careerPath)
                    .assertThatNoDataDescriptionIsEqualTo(this.noDataSkills)
                .endAssertion()
                .updateSkills()
                .run(new AddSkillToCareerProfileScenario(this.anxiety, this.beginner))
                .clickSaveAndContinueButton()
                .clickSkipForNowButton()
                .clickSkipForNowButton()
                .clickSaveButtonAndGoBackToJobVacancyDetails()
                .showMatchDetails()
                .check(MatchingAnalysisModalAssertions)
                    .assertThatUpdateButtonLabelIsEqualTo(this.updateSkills)
                    .assertThatNoDataLabelIsNotDisplayed()
                .endAssertion()
                //.selectTab(careerPreferences) //https://jira.csod.com/browse/TM-8509
                //.check(MatchingAnalysisModalAssertions)
                //    .assertThatNoDataDescriptionIsEqualTo(noDataPreferences)
                //.endAssertion()
                //.addPreferences()
                //.addCareerPreference(level, internship)
                //.clickSaveAndContinueButton()
                //.clickSaveButtonAndGoBackToJobVacancyDetails()
                //.showMatchDetails()
                //.selectTab(careerPreferences)
                //.check(MatchingAnalysisModalAssertions)
                //    .assertThatUpdateButtonLabelIsEqualTo(updatePreferences)
                //    .assertThatNoDataLabelIsNotDisplayed()
                //.endAssertion()
                .selectTab(this.experience)
                .check(MatchingAnalysisModalAssertions)
                    .assertThatNoDataDescriptionIsEqualTo(this.noDataExperience)
                .endAssertion()
                .addExperience()
                .run(new AddMoreExperienceToCareerProfileScenario(this.bountyHunter, this.lumesse, this.hunting, this.october, this.year_2018, this.june, this.year_2023))
                .clickSaveAndContinueButton()
                .clickSkipForNowButton()
                .clickSkipForNowButton()
                .clickSkipForNowButton()
                .clickSkipForNowButton()
                .clickSkipForNowButton()
                .clickSaveButtonAndGoBackToJobVacancyDetails()
                .showMatchDetails()
                .selectTab(this.experience)
                .check(MatchingAnalysisModalAssertions)
                    .assertThatUpdateButtonLabelIsEqualTo(this.updateExperience)
                    .assertThatNoDataLabelIsNotDisplayed()
                .endAssertion()
                .selectTab(this.careerPath)
                .check(MatchingAnalysisModalAssertions)
                    .assertThatNoDataDescriptionIsEqualTo(this.noDataCareerPath)
                .endAssertion()
                .searchAspirationalJobRole()
                .check(CareerPathAssertions)
                    .assertThatGalaxyViewIsDisplayed();
    }
}
