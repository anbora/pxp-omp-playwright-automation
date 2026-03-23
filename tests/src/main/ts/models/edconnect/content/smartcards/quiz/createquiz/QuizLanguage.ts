import { Expose, JsonProperty, SerializedName } from "common/testing/json";

export class QuizLanguage {
    private question: string;
    private languageCode: string;

    public getQuestion(): string {

      return question;
    }

    public setQuestion(question: string): void {

      this.question = question;

    }

    public getLanguageCode(): string {

      return languageCode;
    }

    public setLanguageCode(languageCode: string): void {

      this.languageCode = languageCode;

    }
}
