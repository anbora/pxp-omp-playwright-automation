// @ts-nocheck
import { Expose, JsonProperty, SerializedName } from "common/testing/json";
import { UpdateTextCardResource } from "models/edconnect/content/smartcards/textcard/updatetextcard/UpdateTextCardResource";

export class UpdateTextCardLanguage {

    private languageCode: string;
    private resource: UpdateTextCardResource;
    private title: string;

    public getLanguageCode(): string {

      return languageCode;
    }

    public setLanguageCode(languageCode: string): void {

      this.languageCode = languageCode;

    }

    public getResource(): UpdateTextCardResource {

      return resource;
    }

    public setResource(resource: UpdateTextCardResource): void {

      this.resource = resource;

    }

    public getTitle(): string {

      return title;
    }

    public setTitle(title: string): void {

      this.title = title;

    }

}
