import { Expose, JsonProperty, SerializedName } from "common/testing/json";
import { UpdatePathwayResource } from "models/edconnect/content/pathway/updatepathway/UpdatePathwayResource";

export class UpdatePathwayLanguage {

    private languageCode: string;
    private resource: UpdatePathwayResource;
    private title: string;

    public getLanguageCode(): string {

      return languageCode;
    }

    public setLanguageCode(languageCode: string): void {

      this.languageCode = languageCode;

    }

    public getResource(): UpdatePathwayResource {

      return resource;
    }

    public setResource(resource: UpdatePathwayResource): void {

      this.resource = resource;

    }

    public getTitle(): string {

      return title;
    }

    public setTitle(title: string): void {

      this.title = title;

    }

}
