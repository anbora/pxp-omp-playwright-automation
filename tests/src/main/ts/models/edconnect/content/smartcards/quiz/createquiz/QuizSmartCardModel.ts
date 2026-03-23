import { Expose, JsonProperty, SerializedName } from "common/testing/json";
import { Language } from "models/edconnect/content/smartcards/quiz/createquiz/Language";
import { Quiz } from "models/edconnect/content/smartcards/quiz/createquiz/Quiz";

export class QuizSmartCardModel {

    private languages: Array<Language>;
    private contentType: string;
    private isPublic: boolean;
    private quiz: Quiz;
    private userTaxonomyTopics: Array<string>;

    public getLanguages(): Array<Language> {

      return languages;
    }

    public setLanguages(languages: Array<Language>): void {

      this.languages = languages;

    }

    public getContentType(): string {

      return contentType;
    }

    public setContentType(contentType: string): void {

      this.contentType = contentType;

    }

    public isPublic(): boolean {

      return isPublic;
    }

    public setPublic(isPublic: boolean): void {

      this.isPublic = isPublic;

    }

    public getQuiz(): Quiz {

      return quiz;
    }

    public setQuiz(quiz: Quiz): void {

      this.quiz = quiz;

    }
    public getUserTaxonomyTopics(): Array<string> {
      return userTaxonomyTopics;
    }

    public setUserTaxonomyTopics(userTaxonomyTopics: Array<string>): void {

      this.userTaxonomyTopics = userTaxonomyTopics;

    }

}
