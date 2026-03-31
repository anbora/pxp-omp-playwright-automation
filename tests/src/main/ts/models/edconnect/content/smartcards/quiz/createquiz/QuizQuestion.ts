// @ts-nocheck
import { Expose, JsonProperty, SerializedName } from "common/testing/json";
import { QuizLanguage } from "models/edconnect/content/smartcards/quiz/createquiz/QuizLanguage";
import { QuizQuestionOption } from "models/edconnect/content/smartcards/quiz/createquiz/QuizQuestionOption";

export class QuizQuestion {

    private languages: Array<QuizLanguage>;
    private questionOptionsAttributes: Array<QuizQuestionOption>;

    public getLanguages(): Array<QuizLanguage> {

      return languages;
    }

    public setLanguages(languages: Array<QuizLanguage>): void {

      this.languages = languages;

    }

    public getQuestionOptionsAttributes(): Array<QuizQuestionOption> {

      return questionOptionsAttributes;
    }

    public setQuestionOptionsAttributes(questionOptionsAttributes: Array<QuizQuestionOption>): void {

      this.questionOptionsAttributes = questionOptionsAttributes;

    }
}
