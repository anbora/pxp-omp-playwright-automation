import { Expose } from "common/testing/json";
import { UpdateJourneyContent } from "models/edconnect/content/journey/updatejourney/UpdateJourneyContent";

export class UpdateJourneyModel {
    private content: UpdateJourneyContent;

    public getContent(): UpdateJourneyContent {

      return content;
    }

    public setContent(content: UpdateJourneyContent): void {

      this.content = content;

    }
}
