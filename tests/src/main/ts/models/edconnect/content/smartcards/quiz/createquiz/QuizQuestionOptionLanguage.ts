// @ts-nocheck
import { Expose, JsonProperty, SerializedName } from "common/testing/json";

export class QuizQuestionOptionLanguage {
    private option: string;
    private languageCode: string;

    public getOption(): string {

      return option;
    }

    public setOption(option: string): void {

      this.option = option;

    }

    public getLanguageCode(): string {

      return languageCode;
    }

    public setLanguageCode(languageCode: string): void {

      this.languageCode = languageCode;

    }
}
