import { Expose, JsonProperty, SerializedName } from "common/testing/json";
import { UpdateLanguage } from "models/edconnect/content/smartcards/quiz/updatequiz/UpdateLanguage";

export class UpdateQuizQuestionOptionsAttribute {

    private id: number;
    private languages: Array<UpdateLanguage>;
    private destroy: boolean;

    public getId(): number {

      return id;
    }

    public setId(id: number): void {

      this.id = id;

    }

    public getLanguages(): Array<UpdateLanguage> {

      return languages;
    }

    public setLanguages(languages: Array<UpdateLanguage>): void {

      this.languages = languages;

    }
    public getDestroy(): boolean {
      return destroy;
    }
    public setDestroy(destroy: boolean): void {
        this.destroy = destroy;
    };

}
