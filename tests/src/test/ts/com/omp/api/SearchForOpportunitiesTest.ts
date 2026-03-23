import { BaseRestTest } from "common/BaseRestTest";
import { EndpointsEnum } from "common/enums/EndpointsEnum";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { APIResponse } from "common/testing/playwright";

export class SearchForOpportunitiesTest extends BaseRestTest {

    public searchForVacancies(): void {
        let searchForJobVacanciesJson: string = this.getResourceAsString("/fixtures/job/search/SearchForJobVacanciesDto.json");
        let response: APIResponse = this.postInternalRequest(EndpointsEnum.SEARCH.getEndpoint(), searchForJobVacanciesJson);
        this.apiAssertions.assertArrayContains(response, "values[0]", "\"id\"");
    }

    public searchForRoles(): void {
        let searchForJobRolesJson: string = this.getResourceAsString("/fixtures/job/search/SearchForJobRolesDto.json");
        let response: APIResponse = this.postInternalRequest(EndpointsEnum.SEARCH.getEndpoint(), searchForJobRolesJson);
        this.apiAssertions.assertArrayContains(response, "values[0]", "\"id\"");
    }
}
