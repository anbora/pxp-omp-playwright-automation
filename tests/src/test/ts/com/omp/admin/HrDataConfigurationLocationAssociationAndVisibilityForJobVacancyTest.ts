// @ts-nocheck

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
import { expect } from "common/testing/playwright";

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
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.run(new AddRoleAndFamilyToNewUserScenario(this.user.name));
        __page1 = __page1.run(new AddSkillToNewUserScenario_SkillLevel());
        __page1 = __page1.goToVacanciesPageViaTab();
        __page1 = __page1.typeSearchValue(this.TITLE);
        expect(__page1.jobCardLocation).toBeVisible({ timeout: 30000 });
        __page1 = __page1.goToJobVacancyCardsDetails(this.TITLE);
        expect(__page1.jobDetailsLocation).toBeVisible({ timeout: 30000 });
        __page1 = __page1.goBackToJobVacanciesFromDetailPage();
        __page1 = __page1.openFiltersModal(AllFiltersModalPage);
        expect(__page1.jobFilterLocation).toBeVisible({ timeout: 30000 });
        __page1 = __page1.closeFiltersModal();
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
                let __page2: any = this;
        __page2 = __page2.getOmpLoginPage();
        __page2 = __page2.run(new LoginScenario(this.user));
        __page2 = __page2.goToCareerGrowthPage();
        __page2 = __page2.goToVacanciesPageViaCard();
        __page2 = __page2.typeSearchValue(this.TITLE);
        expect(__page2.jobCardLocation).toBeHidden();
        __page2 = __page2.goToJobVacancyCardsDetails(this.TITLE);
        expect(__page2.jobDetailsLocation).toBeHidden();
        __page2 = __page2.goBackToJobVacanciesFromDetailPage();
        __page2 = __page2.openFiltersModal(AllFiltersModalPage);
        expect(__page2.jobFilterLocation).toBeHidden();
        __page2 = __page2.closeFiltersModal();
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
