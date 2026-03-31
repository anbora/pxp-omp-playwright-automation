// @ts-nocheck
import { Expose, JsonProperty, SerializedName } from "common/testing/json";
import { QuizQuestionOptionLanguage } from "models/edconnect/content/smartcards/quiz/createquiz/QuizQuestionOptionLanguage";

export class QuizQuestionOption {
    private isCorrect: boolean;
    private languages: Array<QuizQuestionOptionLanguage>;

    public isCorrect(): boolean {

      return isCorrect;
    }
    public setCorrect(isCorrect: boolean): void {
      this.isCorrect = isCorrect;
    }

    public getLanguages(): Array<QuizQuestionOptionLanguage> {

      return languages;
    }

    public setLanguages(languages: Array<QuizQuestionOptionLanguage>): void {

      this.languages = languages;

    }
}
