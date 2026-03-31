// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { JobDescription } from "models/job/JobDescription";
import { JobModel } from "models/job/JobModel";
import { UserModel } from "models/user/UserModel";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";
import { AddSkillToNewUserScenario_SkillLevel } from "scenarios/profile/AddSkillToNewUserScenario_SkillLevel";
import { expect } from "common/testing/playwright";

export class JobVacancyClosedTest extends BaseRestTest {

    public readonly TITLE: string = "restassureJob_" + UUID.randomUUID();
    private jobId: string;
    private user: UserModel;

    public createJobViaRest(): void {
        let jobModel: JobModel = this.getObjectFromJson("fixtures/job/JobVacancyClosed.json", JobModel);
        let jobDescriptions: Array<JobDescription> = jobModel.getJobDescriptions();
        jobDescriptions.get(0).setDescription(this.TITLE);
        jobModel.setJobDescriptions(jobDescriptions);
        jobModel.setId(this.TITLE);
      this.jobId = this.createJob(this.TITLE, jobModel);
      this.user = this.createUser();
    }

    public shouldCheckClosedJobDetails(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.run(new AddRoleAndFamilyToNewUserScenario(this.user.name));
        __page1 = __page1.run(new AddSkillToNewUserScenario_SkillLevel());
        __page1 = __page1.goToVacanciesPageViaTab();
        __page1 = __page1.typeSearchValue(this.TITLE);
        expect(__page1.noResultsMessage).toBeVisible({ timeout: 30000 });
    }

    public deleteJobViaRest(): void {
        this.deleteJob(this.jobId);
        this.deleteUser(this.user);
    }
}
