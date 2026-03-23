import { Expose, JsonProperty, SerializedName } from "common/testing/json";
import { JourneyResource } from "models/edconnect/content/journey/createjourney/JourneyResource";

export class JourneyLanguage {
    private languageCode: string;
    private resource: JourneyResource;
    private title: string;

    public getLanguageCode(): string {

      return languageCode;
    }

    public setLanguageCode(languageCode: string): void {

      this.languageCode = languageCode;

    }

    public getResource(): JourneyResource {

      return resource;
    }

    public setResource(resource: JourneyResource): void {

      this.resource = resource;

    }

    public getTitle(): string {

      return title;
    }

    public setTitle(title: string): void {

      this.title = title;

    }
}
