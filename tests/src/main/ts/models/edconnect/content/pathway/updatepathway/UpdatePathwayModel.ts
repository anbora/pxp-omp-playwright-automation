// @ts-nocheck
import { Expose } from "common/testing/json";
import { UpdatePathwayContent } from "models/edconnect/content/pathway/updatepathway/UpdatePathwayContent";

export class UpdatePathwayModel {

    private content: UpdatePathwayContent;

    public getContent(): UpdatePathwayContent {

      return content;
    }

    public setContent(content: UpdatePathwayContent): void {

      this.content = content;

    }

}
