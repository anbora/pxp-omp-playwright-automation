import { Expose } from "common/testing/json";
import { UpdateTextCardContent } from "models/edconnect/content/smartcards/textcard/updatetextcard/UpdateTextCardContent";

;
export class UpdateTextCardModel {

    private content: UpdateTextCardContent;

    public getContent(): UpdateTextCardContent {

      return content;
    }

    public setContent(content: UpdateTextCardContent): void {

      this.content = content;

    }

}
