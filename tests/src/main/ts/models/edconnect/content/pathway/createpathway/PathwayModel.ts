// @ts-nocheck
import { Expose } from "common/testing/json";
import { PathwayContent } from "models/edconnect/content/pathway/createpathway/PathwayContent";

export class PathwayModel {

    private content: PathwayContent;

    public getContent(): PathwayContent {

      return content;
    }

    public setContent(content: PathwayContent): void {

      this.content = content;

    }

}
