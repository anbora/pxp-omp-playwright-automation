import { Expose, JsonProperty, SerializedName } from "common/testing/json";
import { TextCardResource } from "models/edconnect/content/smartcards/textcard/createtextcard/TextCardResource";

export class TextCardLanguage {

    private languageCode: string;
    private resource: TextCardResource;
    private title: string;

    public getLanguageCode(): string {

      return languageCode;
    }

    public setLanguageCode(languageCode: string): void {

      this.languageCode = languageCode;

    }

    public getResource(): TextCardResource {

      return resource;
    }

    public setResource(resource: TextCardResource): void {

      this.resource = resource;

    }

    public getTitle(): string {

      return title;
    }

    public setTitle(title: string): void {

      this.title = title;

    }

}
