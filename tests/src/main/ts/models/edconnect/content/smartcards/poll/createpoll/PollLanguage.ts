// @ts-nocheck
import { Expose, JsonProperty, SerializedName } from "common/testing/json";
import { Resource } from "models/edconnect/content/smartcards/poll/createpoll/Resource";

export class PollLanguage {

    private description: string;
    private languageCode: string;
    private option: string;
    private question: string;
    private resource: Resource;
    private title: string;

    public getDescription(): string {

      return description;
    }

    public setDescription(description: string): void {

      this.description = description;

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

    public getResource(): Resource {

      return resource;
    }

    public setResource(resource: Resource): void {

      this.resource = resource;

    }

    public getTitle(): string {

      return title;
    }

    public setTitle(title: string): void {

      this.title = title;

    }

}
