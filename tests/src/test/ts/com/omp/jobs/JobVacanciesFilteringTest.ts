import { VacanciesListAssertions } from "assertions/careergrowth/careergrowth/VacanciesListAssertions";
import { AllFiltersModalAssertions } from "assertions/careergrowth/jobs/AllFiltersModalAssertions";
import { EditJobVacancyAssertions } from "assertions/careergrowth/jobs/EditJobVacancyAssertions";
import { JobVacancyDetailsAssertions } from "assertions/careergrowth/jobs/JobVacancyDetailsAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { WelcomePage_New } from "pages/careergrowth/careergrowth/WelcomePage_New";
import { AllFiltersModalPage } from "pages/careergrowth/jobs/AllFiltersModalPage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddSkillToCareerProfileScenario } from "scenarios/profile/AddSkillToCareerProfileScenario";

export class JobVacanciesFilteringTest extends BaseRestTest {

    private readonly newestFirst: string = "Newest First";
    private readonly jobType: string = "Job Type";
    private readonly jobTypeAndSchedule: string = "Job Type & Schedule";
    private readonly match: string = "Match";
    private readonly workplaceModel: string = "Workplace Model";
    private readonly level: string = "Level";
    private readonly permanent: string = "Permanent";
    private readonly low: string = "Low";
    private readonly fair: string = "Fair";
    private readonly good: string = "Good";
    private readonly excellent: string = "Excellent";
    private readonly director: string = "Director";
    private readonly agriculturalMachineryMechanicFullTitle: string = "First Job Family -  Agricultural Machinery Mechanic";
    private readonly agriculturalMachineryMechanic: string = "Agricultural Machinery Mechanic";
    private readonly mechanics: string = "Mechanics";
    private readonly agriculture: string = "Agriculture";
    private readonly electricians: string = "Electricians";
    private readonly advanced: string = "Advanced";
    private readonly intermediate: string = "Intermediate";
    private readonly beginner: string = "Beginner";
    private readonly careerGoal: string = "Career Goal";
    private readonly schedule: string = "Schedule";
    private readonly careerTrack: string = "Career Track";
    private readonly forward: string = "I want to progress my career and take on more responsibility";
    private readonly fullTime: string = "Full time";
    private readonly partTime: string = "Part time";
    private readonly individualContributor: string = "Individual contributor";
    private readonly internship: string = "Internship";
    private readonly emptyCustomLevel: string = "Empty Custom Level";
    private readonly customSeniorLevel: string = "Custom Senior Level";
    private readonly emptyCustomModel: string = "Empty Custom Model";
    private readonly emptyCustomJobType: string = "Other";
    private readonly customSchedule: string = "Custom Schedule";
    private readonly emptyCustomSchedule: string = "Empty Custom Schedule";
    private readonly customModel: string = "Custom Model";
    private readonly hybrid: string = "Hybrid";
    private readonly remote: string = "Remote";
    private readonly locations: string = "Locations";
    private readonly locationValue: string = "TestingQA";
    private readonly management: string = "Management";
    private readonly customJobType: string = "Internship";
    private readonly noResultsInfo: string = "Sorry, nothing matches your criteria! Try different keywords or adjust your filters";
    private readonly skills: string = "Skills";
    private readonly testAutomation: string = "test automation";
    private user: UserModel;
    private readonly locationName: string = "Pune";
    private readonly specialCharLocation: string = "Köl, Kalmar County, Sweden";
    private readonly specialCharLocationFilterToRemove: string = "Köl, 382 92 Nybro kommun, Sweden";
    private readonly locationWithDistance: string = "Pune (~56km)";

    public initialize(): void {

    this.user = this.createUser();

    }

    public shouldSetUserProfileAndFilterJobVacanciesByLevel(): void {
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
                .refreshCurrentPage(WelcomePage_New)
                .clickUpdateCareerProfileLink()
                .clickSkipForNowButton()
                .run(new AddSkillToCareerProfileScenario(this.mechanics, this.advanced))
                .run(new AddSkillToCareerProfileScenario(this.agriculture, this.intermediate))
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
                .openFiltersModal(AllFiltersModalPage)
                .showMore(this.level)
                .selectFilterValue(this.level, this.internship)
                .applyFilters()
                .goToFirstJobVacancyOnAllJobsList()
                .check(JobVacancyDetailsAssertions)
                    .assertThatMatchingDetailFieldIsEqualTo(this.level, this.internship)
                .endAssertion()
                .clickBackButton()
                .check(VacanciesListAssertions)
                    .assertThatFilterIsApplied(this.internship)
                .endAssertion()
                .removeFilter(this.internship)
                .openFiltersModal(AllFiltersModalPage)
                .showMore(this.level)
                .selectFilterValue(this.level, this.director)
                .applyFilters()
                .goToFirstJobVacancyOnAllJobsList()
                .check(JobVacancyDetailsAssertions)
                    .assertThatMatchingDetailFieldIsEqualTo(this.level, this.director)
                .endAssertion()
                .clickBackButton()
                .check(VacanciesListAssertions)
                    .assertThatFilterIsApplied(this.director)
                .endAssertion()
                .removeAllFilter();
    }

    public shouldFilterJobVacanciesByWorkplaceModel(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToCareerGrowthPage()
                .goToVacanciesPageViaTab()
                .openFiltersModal(AllFiltersModalPage)
                .searchForLocationV2WithWait(this.locationValue, 1000)
                .applyFilters()
                .typeSearchValue("Job with TestingQA location")
                .goToFirstJobVacancyWithSpecifiedLocation(this.locationValue)
                .check(JobVacancyDetailsAssertions)
                    .assertThatVacancyDetailsContainsLocationWithInformationAboutWorkplaceModel(this.locationValue)
                .endAssertion()
                .clickBackButton()
                .check(VacanciesListAssertions)
                    .assertThatFilterIsApplied(this.locationValue)
                .endAssertion()
                .removeFilter(this.locationValue);
    }

    public shouldFilterJobVacanciesByJobType(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToCareerGrowthPage()
                .goToVacanciesPageViaTab()
                .openFiltersModal(AllFiltersModalPage)
                .showMore(this.jobType)
                .selectFilterValue(this.jobType, this.permanent)
                .applyFilters()
                .goToFirstJobVacancyOnAllJobsList()
                .check(JobVacancyDetailsAssertions)
                    .assertThatMatchingDetailFieldIsEqualTo(this.jobTypeAndSchedule, this.permanent)
                .endAssertion()
                .clickBackButton()
                .check(VacanciesListAssertions)
                    .assertThatFilterIsApplied(this.permanent)
                .endAssertion()
                .removeFilter(this.permanent)
                .openFiltersModal(AllFiltersModalPage)
                .selectFilterValue(this.jobType, this.internship)
                .applyFilters()
                .typeSearchValue("Road Mime")
                .goToFirstJobVacancyOnAllJobsList()
                .check(JobVacancyDetailsAssertions)
                    .assertThatMatchingDetailFieldIsEqualTo(this.jobTypeAndSchedule, this.internship)
                .endAssertion()
                .clickBackButton()
                .check(VacanciesListAssertions)
                    .assertThatFilterIsApplied(this.internship);
    }

    public shouldFilterJobVacanciesBySchedule(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToCareerGrowthPage()
                .goToVacanciesPageViaTab()
                .openFiltersModal(AllFiltersModalPage)
                .selectFilterValue(this.schedule, this.fullTime)
                .applyFilters()
                .sortListBy(this.newestFirst)
                .goToFirstJobVacancyOnAllJobsList()
                .check(JobVacancyDetailsAssertions)
                    .assertThatMatchingDetailFieldIsEqualTo(this.jobTypeAndSchedule, this.fullTime)
                .endAssertion()
                .clickBackButton()
                .check(VacanciesListAssertions)
                    .assertThatFilterIsApplied(this.fullTime)
                .endAssertion()
                .removeFilter(this.fullTime)
                .openFiltersModal(AllFiltersModalPage)
                .selectFilterValue(this.schedule, this.partTime)
                .applyFilters()
                .goToFirstJobVacancyOnAllJobsList()
                .check(JobVacancyDetailsAssertions)
                    .assertThatMatchingDetailFieldIsEqualTo(this.jobTypeAndSchedule, this.partTime)
                .endAssertion()
                .clickBackButton()
                .check(VacanciesListAssertions)
                    .assertThatFilterIsApplied(this.partTime)
                .endAssertion();
    }

    public shouldFilterJobVacanciesByCareerTrack(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToCareerGrowthPage()
                .goToVacanciesPageViaTab()
                .openFiltersModal(AllFiltersModalPage)
                .selectFilterValue(this.careerTrack, this.individualContributor)
                .applyFilters()
                .sortListBy(this.newestFirst)
                .goToFirstJobVacancyOnAllJobsList()
                .check(JobVacancyDetailsAssertions)
                    .assertThatMatchingDetailFieldIsEqualTo(this.careerTrack, this.individualContributor)
                .endAssertion()
                .clickBackButton()
                .check(VacanciesListAssertions)
                    .assertThatFilterIsApplied(this.individualContributor)
                .endAssertion()
                .removeFilter(this.individualContributor)
                .openFiltersModal(AllFiltersModalPage)
                .selectFilterValue(this.careerTrack, this.management)
                .applyFilters()
                .goToFirstJobVacancyOnAllJobsList()
                .check(JobVacancyDetailsAssertions)
                    .assertThatMatchingDetailFieldIsEqualTo(this.careerTrack, this.management)
                .endAssertion()
                .clickBackButton()
                .check(VacanciesListAssertions)
                    .assertThatFilterIsApplied(this.management);
    }

    public shouldFilterJobVacanciesBySkill(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToCareerGrowthPage()
                .goToVacanciesPageViaTab()
                .openFiltersModal(AllFiltersModalPage)
                .searchForFilterValueWithWait(this.skills, this.testAutomation, 4000)
                .applyFilters()
                .goToFirstJobVacancyOnAllJobsList()
                .clickEditVacancyButton()
                .check(EditJobVacancyAssertions)
                    .assertThatSkillIsAdded(this.testAutomation);
    }

    public shouldFilterJobVacanciesByGeoLocationAndDistanceTest(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToCareerGrowthPage()
                .goToVacanciesPageViaTab()
                .openFiltersModal(AllFiltersModalPage)
                .searchForGeoLocation(this.locationName,5000)
                .applyFilters()
                .check(VacanciesListAssertions)
                    .assertThatFilterIsApplied(this.locationName)
                .endAssertion()
                .removeFilter(this.locationName)
                .openFiltersModal(AllFiltersModalPage)
                .searchForGeoLocation(this.specialCharLocation,5000)
                .applyFilters()
                .check(VacanciesListAssertions)
                    .assertThatFilterIsApplied(this.specialCharLocationFilterToRemove)
                .endAssertion()
                .removeFilter(this.specialCharLocationFilterToRemove)
                .openFiltersModal(AllFiltersModalPage)
                .searchForGeoLocation(this.locationName,5000)
                .changeDistane("56",5000)
                .applyFilters()
                .check(VacanciesListAssertions)
                    .assertThatFilterIsApplied(this.locationWithDistance)
                .endAssertion()
                .openFiltersModal(AllFiltersModalPage)
                .check(AllFiltersModalAssertions)
                    .assertThatFilterModalIsOpened()
                .endAssertion()
                .closeModal();
    }
}
