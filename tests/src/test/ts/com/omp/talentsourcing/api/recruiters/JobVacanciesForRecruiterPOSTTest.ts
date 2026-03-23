import { CommonOperationsForApiTest } from "com/omp/talentsourcing/CommonOperationsForApiTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { APIResponse } from "common/testing/playwright";
import { Assert } from "common/testing/runtime";
import { TokenParameter } from "common/TokenParameter";
import { JobVacancyForRecruiterModel } from "models/talentsourcing/JobVacancyForRecruiterModel";

export class JobVacanciesForRecruiterPOSTTest extends CommonOperationsForApiTest {

    private static readonly SOURCING_JOB_ENDPOINT: string = "/pxp-talent-marketplace-ecs/matching/tm-source/search";
    private tokenParameter: TokenParameter = new TokenParameter();
    private token: string;
    private jobVacancyForRecruiter: JobVacancyForRecruiterModel;

    public initialize(): void {
        this.tokenParameter.setAccountId(this.getPortalConfig(this.portalIndex).getAccountId());
        this.tokenParameter.setUserId(this.getCypressUser().id);
      this.token = this.getTokenForTalentMarketplaceApi(this.tokenParameter);
      this.jobVacancyForRecruiter = this.getObjectFromJson("fixtures/talentsourcing/JobVacanciesForRecruiter.json", JobVacancyForRecruiterModel);
    }

    shouldGetJobForRecruiter(): void {
        let response: APIResponse = postJobVacancyForRecruiter(JobVacanciesForRecruiterPOSTTest.SOURCING_JOB_ENDPOINT, this.token, this.jobVacancyForRecruiter);
        Assert.assertEquals(response.status(), 200);
    }

    shouldNotGetJobsForRecruiterIfTokenIsInvalid(): void {
        let invalidToken: string = "abc";
        let response: APIResponse = postJobVacancyForRecruiter(JobVacanciesForRecruiterPOSTTest.SOURCING_JOB_ENDPOINT, invalidToken, this.jobVacancyForRecruiter);
        Assert.assertEquals(response.status(), 403);
    }
}
