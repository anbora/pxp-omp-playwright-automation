import { CommonOperationsForApiTest } from "com/omp/talentsourcing/CommonOperationsForApiTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { MicroserviceEnum } from "common/enums/MicroserviceEnum";
import { APIResponse } from "common/testing/playwright";

export class LocationAssociationWithJobRoleApiTest extends CommonOperationsForApiTest {

    private createJobRoleEndpoint: string = "pxp-job-data/v1/import/ROLE";
    private endpointWithParameter: string = "pxp-job-data/v1/job/role/all?this.title=";
    private getJobRoleEndpoint: string = "pxp-job-data/v1/job/role/";
    private getLocationEndpoint: string = "pxp-job-data/v1/location/";
    private title: string = "CSV Import Role With Location";
    private locationExternalId: string = "100077";
    private token: string;
    private jobRoleId: string;
    private locationId: string;
    private csvFile: Path;

    public initialize(): void {
      this.token = this.getTokenForTalentDataApi(MicroserviceEnum.PXP_JOB_DATA);
      this.csvFile = Paths.get("src/main/resources/fixtures/csv/hrdata/" + System.getProperty("config", "qaAws") + "/ROLE_SAMPLE_LOCATION.csv");
    }

    public associateLocationWithJobRole(): void {
        let response: APIResponse = postRequestWithCSV(this.createJobRoleEndpoint, this.token, this.csvFile);

        this.apiAssertions.assertStatus(response, 200);
    }

    public getJobRoleAll(): void {
        let response: APIResponse = this.getRequest(this.endpointWithParameter, this.token, this.title);
      this.jobRoleId = this.apiAssertions.getStringValueFromResponse(response, "data/result[0]/id");

        this.apiAssertions.assertStatus(response, 200);

    }

    public getJobRole(): void {
        let response: APIResponse = this.getRequest(this.getJobRoleEndpoint + this.jobRoleId, this.token);
      this.locationId = this.apiAssertions.getStringValueFromResponse(response, "data/locations[0]");

        this.apiAssertions.assertStatus(response, 200);
    }

    public confirm(): void {
        let response: APIResponse = this.getRequest(this.getLocationEndpoint + this.locationId, this.token);

        this.apiAssertions.assertStatus(response, 200);
        this.apiAssertions.assertEqual(response, "data/externalId", this.locationExternalId);
    }
}
