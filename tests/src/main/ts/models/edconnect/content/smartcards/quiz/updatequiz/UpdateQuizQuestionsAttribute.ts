// @ts-nocheck
import { Expose, JsonProperty, SerializedName } from "common/testing/json";
import { UpdateLanguage } from "models/edconnect/content/smartcards/quiz/updatequiz/UpdateLanguage";
import { UpdateQuizQuestionOptionsAttribute } from "models/edconnect/content/smartcards/quiz/updatequiz/UpdateQuizQuestionOptionsAttribute";

export class UpdateQuizQuestionsAttribute {

    private id: number;
    private isSingleChoice: boolean;
    private languages: Array<UpdateLanguage>;
    private passed: any;
    private questionAttempts: any;
    private questionOptionsAttributes: Array<UpdateQuizQuestionOptionsAttribute>;
    private destroy: boolean;
    public setDestroy(destroy: boolean): void {
        this.destroy = destroy;
    };
    public getDestroy(): boolean {
      return destroy;
    }

    public getId(): number {

      return id;
    }

    public setId(id: number): void {

      this.id = id;

    }

    public getIsSingleChoice(): boolean {

      return isSingleChoice;
    }

    public setIsSingleChoice(isSingleChoice: boolean): void {

      this.isSingleChoice = isSingleChoice;

    }

    public getLanguages(): Array<UpdateLanguage> {

      return languages;
    }

    public setLanguages(languages: Array<UpdateLanguage>): void {

      this.languages = languages;

    }

    public getPassed(): any {

      return passed;
    }

    public setPassed(passed: any): void {

      this.passed = passed;

    }

    public getQuestionAttempts(): any {

      return questionAttempts;
    }

    public setQuestionAttempts(questionAttempts: any): void {

      this.questionAttempts = questionAttempts;

    }

    public getQuestionOptionsAttributes(): Array<UpdateQuizQuestionOptionsAttribute> {

      return questionOptionsAttributes;
    }

    public setQuestionOptionsAttributes(questionOptionsAttributes: Array<UpdateQuizQuestionOptionsAttribute>): void {

      this.questionOptionsAttributes = questionOptionsAttributes;

    }

}
