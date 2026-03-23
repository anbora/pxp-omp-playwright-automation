import { VacanciesListAssertions } from "assertions/careergrowth/careergrowth/VacanciesListAssertions";
import { MatchingAnalysisModalAssertions } from "assertions/careergrowth/MatchingAnalysisModalAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddSkillToCareerProfileScenario } from "scenarios/profile/AddSkillToCareerProfileScenario";

export class JobVacancyMatchDetailsTest extends BaseRestTest {

    private readonly skills: string = "Skills";
    private readonly experience: string = "Experience";
    private readonly jobType: string = "Job Type";
    private readonly matching: string = "Matching";
    private readonly workplaceModel: string = "Workplace Model";
    private readonly level: string = "Level";
    private readonly permanent: string = "Permanent";
    private readonly goodMatch: string = "Good match";
    private readonly director: string = "Director";
    private readonly agriculturalMachineryMechanicFullTitle: string = "First Job Family -  Agricultural Machinery Mechanic";
    private readonly agriculturalMachineryMechanic: string = "Agricultural Machinery Mechanic";
    private readonly agriculturalMachineryMechanicsDirector: string = "Agricultural Machinery Mechanics this.director";
    private readonly mechanics: string = "Mechanics";
    private readonly agriculture: string = "Agriculture";
    private readonly agricultureLC: string = "this.agriculture";
    private readonly electricians: string = "Electricians";
    private readonly advanced: string = "Advanced";
    private readonly intermediate: string = "Intermediate";
    private readonly beginner: string = "Beginner";
    private readonly careerGoal: string = "Career Goal";
    private readonly schedule: string = "Schedule";
    private readonly forward: string = "I want to progress my career and take on more responsibility";
    private readonly fullTime: string = "Full time";
    private readonly individualContributor: string = "Individual contributor";
    private readonly careerTrack: string = "Career Track";
    private readonly remote: string = "Remote";
    private readonly matchDetails: string = "Match details";
    private readonly notMatchSkills: string = "1 of 11 this.skills match your profile";
    private readonly matchPreferences: string = "Job Vacancy matches your preferences";
    private readonly careerPreferences: string = "Career Preferences";
    private readonly matchExperience: string = "Job Vacancy matches your this.experience";
    private readonly matchCareerPath: string = "Job Vacancy is a good fit for your career path";
    private readonly careerPath: string = "Career Path";
    private readonly agriculturalEngineeringLC: string = "agricultural engineering";
    private readonly emptyLevel: string = "-";
    private readonly closeRelationship: string = "Close relationship between this Job Vacancy and your recent this.experience";
    private readonly yes: string = "Yes";
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser();

    }

    public shouldCheckMatchDetailsVisibilityForJobVacancy(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .goToCareerGrowthPage()
                .editProfile()
                .clickEditProfileButton()
                .clickAddJobFamilyAndRoleButton()
                .selectFirstJobRoleFromInput(this.agriculturalMachineryMechanic, this.agriculturalMachineryMechanicFullTitle)
                .clickSelectButton()
                .clickSaveButton()
                .goToCareerGrowthPage()
                .refreshPage()
                .goToRolesPageViaTab()
                .typeSearchValue(this.agriculturalMachineryMechanicsDirector)
                .markFirstRoleAsAspirational()
                .clickUpdateCareerProfileLink()
                .clickSkipForNowButton()
                .run(new AddSkillToCareerProfileScenario(this.mechanics, this.intermediate))
                .run(new AddSkillToCareerProfileScenario(this.agriculture, this.advanced))
                .run(new AddSkillToCareerProfileScenario(this.electricians, this.beginner))
                .clickSaveAndContinueButton()
                .clickSkipForNowButton()
                .selectCareerPreferenceCheckbox(this.careerGoal, this.forward)
                .addCareerPreference(this.level, this.director)
                .selectCareerPreferenceCheckbox(this.workplaceModel, this.remote)
                .addCareerPreference(this.jobType, this.permanent)
                .selectCareerPreferenceCheckbox(this.schedule, this.fullTime)
                .selectCareerPreferenceCheckbox(this.careerTrack, this.individualContributor)
                .clickSaveAndContinueButton()
                .clickSaveButton()
                .goToVacanciesPageViaTab()
                .waitForGoodOrExcellentMatchForSuggestedJobVacancy()
                .check(VacanciesListAssertions)
                    .assertThatJobVacancyOnAllJobVacanciesListHasMatchEqualTo(this.agriculturalMachineryMechanicsDirector, this.goodMatch)
                .endAssertion()
                .goToFirstSuggestedJobVacancyDetailsPage()
                .showMatchDetails()
                .check(MatchingAnalysisModalAssertions)
                    .assertThatHeaderIsEqualTo(this.matchDetails)
                    .assertThatTabIsActive(this.skills)
                    .assertThatOverallMatchIsEqualTo(this.goodMatch)
                    .assertThatTabDescriptionIsEqualTo(this.skills, this.notMatchSkills)
                    .assertThatCrossIconIsDisplayedForTab(this.skills)
                    .assertThatTabDescriptionIsEqualTo(this.careerPreferences, this.matchPreferences)
                    .assertThatTickIconIsDisplayedForTab(this.careerPreferences)
                    .assertThatTabDescriptionIsEqualTo(this.experience, this.matchExperience)
                    .assertThatTickIconIsDisplayedForTab(this.experience)
                    .assertThatTabDescriptionIsEqualTo(this.careerPath, this.matchCareerPath)
                    .assertThatTickIconIsDisplayedForTab(this.careerPath)
                    .assertThatTickStatusIconIsDisplayedForSkill(this.agricultureLC)
                    .assertThatCrossStatusIconIsDisplayedForSkill(this.agriculturalEngineeringLC)
                    .assertThatOnTargetStatusIsDisplayedForSkill(this.agricultureLC)
                    .assertThatOffTargetStatusIsDisplayedForSkill(this.agriculturalEngineeringLC)
                    .assertThatYourLevelForSkillIsEqualTo(this.agricultureLC, this.advanced)
                    .assertThatYourLevelForSkillIsEqualTo(this.agriculturalEngineeringLC, this.emptyLevel)
                    .assertThatTargetLevelForSkillIsEqualTo(this.agricultureLC, this.advanced)
                .endAssertion()
                .selectTab(this.careerPreferences)
                .check(MatchingAnalysisModalAssertions)
                    .assertThatTabIsActive(this.careerPreferences)
                    .assertThatPreferenceTypeIsEqualTo(this.schedule, this.fullTime)
                    .assertThatPreferenceTypeStatusIsEqualTo(this.schedule, this.matching)
                    .assertThatPreferenceTypeIsEqualTo(this.workplaceModel, this.remote)
                    .assertThatPreferenceTypeStatusIsEqualTo(this.workplaceModel, this.matching)
                    .assertThatPreferenceTypeIsEqualTo(this.jobType, this.permanent)
                    .assertThatPreferenceTypeStatusIsEqualTo(this.jobType, this.matching)
                    .assertThatPreferenceTypeIsEqualTo(this.level, this.director)
                    .assertThatPreferenceTypeStatusIsEqualTo(this.level, this.matching)
                    .assertThatPreferenceTypeIsEqualTo(this.careerTrack, this.individualContributor)
                    .assertThatPreferenceTypeStatusIsEqualTo(this.careerTrack, this.matching)
                    .assertThatPreferenceTypeStatusIsEqualTo(this.careerGoal, this.matching)
                .endAssertion()
                .selectTab(this.experience)
                .check(MatchingAnalysisModalAssertions)
                    .assertThatTabIsActive(this.experience)
                    .assertThatExperienceDescriptionIsEqualTo(this.closeRelationship)
                    .assertThatExperienceStatusIsEqualTo(this.yes)
                    .assertThatTickStatusIconIsDisplayedForExperience()
                .endAssertion();
    }

    public afterTests(): void {

      this.deleteUser(this.user);

    }
}
