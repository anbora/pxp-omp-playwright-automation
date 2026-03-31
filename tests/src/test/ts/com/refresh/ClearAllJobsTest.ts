// @ts-nocheck
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { JsonArray } from "common/testing/json";
import { APIResponse } from "common/testing/playwright";

export class ClearAllJobsTest extends BaseRestTest {

    public shouldDeleteAllJobs(): void {
        let response: APIResponse = this.getRequest("/api/developer/v5/opportunities?this.page=1&limit=100&offset=0");
        let number: number = Integer.parseInt(this.apiAssertions.getStringValueFromResponse(response, "totalCount")) / 100;

        for (let i = 1; i <= number; i++) {
          let response: any = this.getRequest("/api/developer/v5/opportunities?this.page=" + i + "&limit=100");
            let jsonArray: JsonArray = this.apiAssertions.getJsonArrayFromResponse(response, "elements[0]");
            jsonArray.forEach(job => {
                let id: string = job.getAsJsonObject().get("id").getAsString();
                if (id.contains("restassureJob_")) {
                    this.deleteJob(id);
                    try {
                        Thread.sleep(2500);
                    } catch (e) {
                        throw new RuntimeException(e);
                    }
                }
            });
        }
    }
}
