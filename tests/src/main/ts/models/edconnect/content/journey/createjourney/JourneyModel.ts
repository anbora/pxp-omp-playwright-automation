// @ts-nocheck
import { Expose } from "common/testing/json";
import { JourneyContent } from "models/edconnect/content/journey/createjourney/JourneyContent";

export class JourneyModel {
    private content: JourneyContent;

    public getContent(): JourneyContent {

      return content;
    }

    public setContent(content: JourneyContent): void {

      this.content = content;

    }
}
