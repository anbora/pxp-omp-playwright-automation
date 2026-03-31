// @ts-nocheck
import { EdConnectRestService } from "common/api/EdConnectRestService";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { APIResponse } from "common/testing/playwright";

export class EdConnectOpportunitiesAPI_RecommendedOpportunitiesTest extends EdConnectRestService {

    private recommendedJobRolesEndpoint: string = "/api/developer/v6/opportunities/recommended";
    private recommendedJobVacanciesEndpoint: string = "/api/developer/v6/opportunities/recommended?opportunity_type=job_vacancy";

    public getRecommendedJobRoles(): void {
        let response: APIResponse = this.getRequest(this.recommendedJobRolesEndpoint);

        this.apiAssertions.assertStatus(response, 200);
        this.apiAssertions.assertEqual(response, "[0]/opportunity_type", "job_role");
        this.apiAssertions.assertNotEqual(response, "[0]/job_family_external_id", null);
        this.apiAssertions.assertNotEqual(response, "[0]/job_function_external_id", null);
    }

    public getRecommendedJobVacancies(): void {
        let response: APIResponse = this.getRequest(this.recommendedJobVacanciesEndpoint);

        this.apiAssertions.assertStatus(response, 200);
        this.apiAssertions.assertEqual(response, "[0]/opportunity_type", "job_vacancy");
    }
}
