// @ts-nocheck
import { Expose } from "common/testing/json";
import { TextCardContent } from "models/edconnect/content/smartcards/textcard/createtextcard/TextCardContent";

export class TextCardModel {

    private content: TextCardContent;

    public getContent(): TextCardContent {

      return content;
    }

    public setContent(content: TextCardContent): void {

      this.content = content;

    }

}
