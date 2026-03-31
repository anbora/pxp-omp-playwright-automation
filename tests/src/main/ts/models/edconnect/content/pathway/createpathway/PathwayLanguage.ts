// @ts-nocheck
import { Expose, JsonProperty, SerializedName } from "common/testing/json";
import { PathwayResource } from "models/edconnect/content/pathway/createpathway/PathwayResource";

export class PathwayLanguage {

    private languageCode: string;
    private resource: PathwayResource;
    private title: string;

    public getLanguageCode(): string {

      return languageCode;
    }

    public setLanguageCode(languageCode: string): void {

      this.languageCode = languageCode;

    }

    public getResource(): PathwayResource {

      return resource;
    }

    public setResource(resource: PathwayResource): void {

      this.resource = resource;

    }

    public getTitle(): string {

      return title;
    }

    public setTitle(title: string): void {

      this.title = title;

    }

}
