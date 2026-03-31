// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { BaseTest } from "common/BaseTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { JobDescription } from "models/job/JobDescription";
import { JobModel } from "models/job/JobModel";
import { LinkedRole } from "models/job/LinkedRole";
import { ResultContainer } from "models/ResultContainer";
import { UserModel } from "models/user/UserModel";
import { JobVacancyDetailsPage } from "pages/careergrowth/jobs/JobVacancyDetailsPage";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddBasicCareerPreferencesForUser } from "scenarios/profile/AddBasicCareerPreferencesForUser";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";
import { AddSkillToNewUserScenario_SkillLevel } from "scenarios/profile/AddSkillToNewUserScenario_SkillLevel";
import { expect } from "common/testing/playwright";

export class DetectSkillsFromJobDescriptionTest extends BaseRestTest {

    private static readonly RANDOM_SUFFIX: string = UUID.randomUUID().toString();
    private productionLogisticsSpecialist: string = "PL Specialist";
    private newest: string = "Newest First";
    private jobId: string;
    private user: UserModel;
    private urlContainer: ResultContainer = new ResultContainer();

    //Skills that should be detected each time:
    private businessDevelopment: string = "business development";
    private projectManagement: string = "project this.management";
    private teamLeadership: string = "team this.leadership";
    private management: string = "management";
    private customerService: string = "customer service";
    private microsoftExcel: string = "microsoft excel";
    private microsoftWord: string = "microsoft word";
    private warehousing: string = "warehousing";
    private marketing: string = "marketing";
    private leadership: string = "leadership";
    private operations: string = "operations";
    private sales: string = "sales";
    private export: string = "export";
    private planning: string = "planning";
    private logistics: string = "logistics";
    private negotiation: string = "negotiation";
    private roleWithoutSkillsExternalId: string = "d5a06755-a8ef-4a1b-a221-c7d757bc3bd9";

    private logisticJobDescription: string = "We are looking for a Production Logistics Specialist to join our team and manage the this.logistics of our product’s lifecycle, from design to disposal. You will be responsible for this.planning, coordinating, and overseeing the production, storage, and delivery of our goods and services to our customers. You will also develop and maintain relationships with suppliers and clients, and ensure the accuracy and efficiency of our this.logistics this.operations. \n" +
            "To be successful as a Production Logistics Specialist, you should have excellent analytical, organizational, and communication skills. You should also have a solid knowledge of logistics systems and processes, as well as relevant software and technology. You should be able to work independently and as part of a team, and handle multiple tasks and deadlines. \n" +
            "Responsibilities: \n" +
            "• Collaborate with the internal sales team and other departments to ensure timely and accurate processing of customer orders \n" +
            "• Supervise and manage the logistics team and the warehouse staff \n" +
            "• Plan and monitor the production, storage, and transportation of goods and services \n" +
            "• Ensure the availability and allocation of supplies and resources based on orders and demand \n" +
            "• Negotiate and optimize the costs and quality of logistics services with suppliers and clients \n" +
            " • Prepare and maintain the necessary shipping and export documents and records \n" +
            " • Resolve any logistics issues or discrepancies that may arise \n" +
            " • Evaluate and improve the performance and efficiency of our logistics operations \n" +
            " • Stay updated on the latest trends and developments in the logistics field \n \n";

    public initialize(): void {
        let jobModel: JobModel = this.getObjectFromJson("fixtures/job/PublicOpportunityWithDeclaredLinkedRoleDto.json", JobModel);
        jobModel.setId(DetectSkillsFromJobDescriptionTest.RANDOM_SUFFIX);
        let jobDescriptions: Array<JobDescription> = jobModel.getJobDescriptions();
        jobDescriptions.get(0).setDescription(this.logisticJobDescription);
        jobModel.setJobDescriptions(jobDescriptions);
        let linkedRole: any = new LinkedRole();
        linkedRole.setExternalId(this.roleWithoutSkillsExternalId);
        linkedRole.setLinkedRoleStatus("DECLARED");
        jobModel.setLinkedRoles(Collections.singletonList(linkedRole));
      this.jobId = this.createJob(this.productionLogisticsSpecialist, jobModel);
      this.user = this.createUser();
    }

    public shouldCheckSkillsDetectedForJobVacancy(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.run(new AddRoleAndFamilyToNewUserScenario(this.user.name));
        __page1 = __page1.run(new AddSkillToNewUserScenario_SkillLevel());
        __page1 = __page1.run(new AddBasicCareerPreferencesForUser());
        __page1 = __page1.goToCareerGrowthPage();
        __page1 = __page1.goToVacanciesPageViaTab();
        __page1 = __page1.typeSearchValue(this.productionLogisticsSpecialist);
        __page1 = __page1.sortListBy(this.newest);
        __page1 = __page1.goToFirstJobVacancyOnAllJobsList();
        __page1 = __page1.waitForSkills();
        __page1 = __page1.clickShowMoreSkills();
        expect(__page1.skillChips(this.businessDevelopment).first()).toBeVisible({ timeout: 30000 });
        expect(__page1.skillChips(this.projectManagement).first()).toBeVisible({ timeout: 30000 });
        expect(__page1.skillChips(this.management).first()).toBeVisible({ timeout: 30000 });
        expect(__page1.skillChips(this.customerService).first()).toBeVisible({ timeout: 30000 });
        expect(__page1.skillChips(this.microsoftExcel).first()).toBeVisible({ timeout: 30000 });
        expect(__page1.skillChips(this.warehousing).first()).toBeVisible({ timeout: 30000 });
        expect(__page1.skillChips(this.leadership).first()).toBeVisible({ timeout: 30000 });
        expect(__page1.skillChips(this.operations).first()).toBeVisible({ timeout: 30000 });
        expect(__page1.skillChips(this.sales).first()).toBeVisible({ timeout: 30000 });
        expect(__page1.skillChips(this.export).first()).toBeVisible({ timeout: 30000 });
        expect(__page1.skillChips(this.planning).first()).toBeVisible({ timeout: 30000 });
        expect(__page1.skillChips(this.logistics).first()).toBeVisible({ timeout: 30000 });
        expect(__page1.skillChips(this.negotiation).first()).toBeVisible({ timeout: 30000 });
    }

    public afterTests(): void {

      this.deleteJob(this.jobId);

    }
}
