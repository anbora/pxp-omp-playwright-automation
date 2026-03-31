// @ts-nocheck
import { Expose } from "common/testing/json";
import { UpdateQuizContent } from "models/edconnect/content/smartcards/quiz/updatequiz/UpdateQuizContent";

export class UpdateQuizSmartCardModel {

    private content: UpdateQuizContent;

    public getContent(): UpdateQuizContent {

      return content;
    }

    public setContent(content: UpdateQuizContent): void {

      this.content = content;

    }

}
