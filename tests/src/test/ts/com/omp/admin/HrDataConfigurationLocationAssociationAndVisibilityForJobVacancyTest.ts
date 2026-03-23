import { VacanciesListAssertions } from "assertions/careergrowth/careergrowth/VacanciesListAssertions";
import { AllFiltersModalAssertions } from "assertions/careergrowth/jobs/AllFiltersModalAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { JobDescription } from "models/job/JobDescription";
import { JobModel } from "models/job/JobModel";
import { UserModel } from "models/user/UserModel";
import { AllFiltersModalPage } from "pages/careergrowth/jobs/AllFiltersModalPage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";
import { AddSkillToNewUserScenario_SkillLevel } from "scenarios/profile/AddSkillToNewUserScenario_SkillLevel";

export class HrDataConfigurationLocationAssociationAndVisibilityForJobVacancyTest extends BaseRestTest {

    private hrData: string = "HR Data";
    private user: UserModel;
    public readonly TITLE: string = "restassureJob_" + UUID.randomUUID();
    private jobId: string;

    public initialize(): void {
      this.user = this.createUser(true);
        let jobModel: JobModel = this.getObjectFromJson("fixtures/job/JobVacancyLocation.json", JobModel);
        let jobDescriptions: Array<JobDescription> = jobModel.getJobDescriptions();
        jobDescriptions.get(0).setDescription(this.TITLE);
        jobModel.setJobDescriptions(jobDescriptions);
        jobModel.setId(this.TITLE);
      this.jobId = this.createJob(this.TITLE, jobModel);
    }

    public locationVisibilityForJobVacancyTest(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .run(new AddRoleAndFamilyToNewUserScenario(this.user.name))
                .run(new AddSkillToNewUserScenario_SkillLevel())
                .goToVacanciesPageViaTab()
                .typeSearchValue(this.TITLE)
                .check(VacanciesListAssertions)
                    .assertThatLocationIsVisibleOnJobVacancyCard()
                .endAssertion()
                .goToJobVacancyCardsDetails(this.TITLE)
                .check(VacanciesListAssertions)
                    .assertThatLocationIsVisibleOnJobVacancyDetails()
                .endAssertion()
                .goBackToJobVacanciesFromDetailPage()
                .openFiltersModal(AllFiltersModalPage)
                .check(AllFiltersModalAssertions)
                    .assertThatLocationIsVisibleOnJobVacancyFilter()
                .endAssertion()
                .closeFiltersModal();
    }

    public removeAssociationTest(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToAdminPanel()
                .selectMainTab(this.hrData)
                .openMenuForHrConfiguration()
                .clickLocations()
                .removeAssociation("Job Vacancy")
                .clickLocationConfigSaveButton();
    }

    public locationShouldNotVisibleForJobVacancyTest(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToCareerGrowthPage()
                .goToVacanciesPageViaCard()
                .typeSearchValue(this.TITLE)
                .check(VacanciesListAssertions)
                    .assertThatLocationIsNotVisibleOnJobVacancyCard()
                .endAssertion()
                .goToJobVacancyCardsDetails(this.TITLE)
                .check(VacanciesListAssertions)
                    .assertThatLocationIsNotVisibleOnJobVacancyDetails()
                .endAssertion()
                .goBackToJobVacanciesFromDetailPage()
                .openFiltersModal(AllFiltersModalPage)
                .check(AllFiltersModalAssertions)
                    .assertThatLocationIsNotVisibleOnJobVacancyFilter()
                .endAssertion()
                .closeFiltersModal()
        ;
    }

    public addAssociationAndVisibilityTest(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToAdminPanel()
                .selectMainTab(this.hrData)
                .openMenuForHrConfiguration()
                .clickLocations()
                .addAssociation("Job Vacancy")
                .addLocationVisibility("Job Vacancy details")
                .clickLocationConfigSaveButton()
                .addLocationVisibility("Job Vacancy filter")
                .clickLocationConfigSaveButton()
                .addLocationVisibility("Job Vacancy card")
                .clickLocationConfigSaveButton()
                .addGeoLocationVisibility("Job Vacancy filter")
                .clickLocationConfigSaveButton();
    }

    public afterClass(): void {
        this.deleteJob(this.jobId);
        this.deleteUser(this.user);
    }
}
