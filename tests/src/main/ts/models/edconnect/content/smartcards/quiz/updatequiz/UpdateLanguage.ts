// @ts-nocheck
import { Expose, JsonProperty, SerializedName } from "common/testing/json";
import { UpdateQuizResource } from "models/edconnect/content/smartcards/quiz/updatequiz/UpdateQuizResource";

export class UpdateLanguage {

    private id: number;
    private languageCode: string;
    private option: string;
    private question: string;
    private resource: UpdateQuizResource;
    private title: string;

    public getId(): number {

      return id;
    }

    public setId(id: number): void {

      this.id = id;

    }

    public getLanguageCode(): string {

      return languageCode;
    }

    public setLanguageCode(languageCode: string): void {

      this.languageCode = languageCode;

    }

    public getOption(): string {

      return option;
    }

    public setOption(option: string): void {

      this.option = option;

    }

    public getQuestion(): string {

      return question;
    }

    public setQuestion(question: string): void {

      this.question = question;

    }

    public getResource(): UpdateQuizResource {

      return resource;
    }

    public setResource(resource: UpdateQuizResource): void {

      this.resource = resource;

    }

    public getTitle(): string {

      return title;
    }

    public setTitle(title: string): void {

      this.title = title;

    }

}
