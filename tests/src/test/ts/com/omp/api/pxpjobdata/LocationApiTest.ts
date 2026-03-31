// @ts-nocheck
import { CommonOperationsForApiTest } from "com/omp/talentsourcing/CommonOperationsForApiTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { MicroserviceEnum } from "common/enums/MicroserviceEnum";
import { APIResponse } from "common/testing/playwright";

export class LocationApiTest extends CommonOperationsForApiTest {

    private endpoint: string = "pxp-job-data/v1/import/LOCATION";
    private token: string;
    private csvFile: Path;

    public initialize(): void {
      this.token = this.getTokenForTalentDataApi(MicroserviceEnum.PXP_JOB_DATA);
      this.csvFile = Paths.get("src/main/resources/fixtures/csv/hrdata/" + System.getProperty("config", "qaAws") + "/LOCATION_SAMPLE.csv");
    }

    public shouldCreateJobFamilyWithoutJobFunction(): void {
        let response: APIResponse = postRequestWithCSV(this.endpoint, this.token, this.csvFile);

        this.apiAssertions.assertStatus(response, 200);
    }
}
