import { Expose, JsonProperty, SerializedName } from "common/testing/json";
import { UpdatePollResource } from "models/edconnect/content/smartcards/poll/updatepoll/UpdatePollResource";

export class UpdatePollLanguage {

    private description: string;
    private languageCode: string;
    private option: string;
    private question: string;
    private resource: UpdatePollResource;
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

    public getResource(): UpdatePollResource {

      return resource;
    }

    public setResource(resource: UpdatePollResource): void {

      this.resource = resource;

    }

    public getTitle(): string {

      return title;
    }

    public setTitle(title: string): void {

      this.title = title;

    }

}
