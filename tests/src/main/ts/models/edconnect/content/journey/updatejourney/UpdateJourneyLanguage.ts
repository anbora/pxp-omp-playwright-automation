import { Expose, JsonProperty, SerializedName } from "common/testing/json";
import { UpdateJourneyResource } from "models/edconnect/content/journey/updatejourney/UpdateJourneyResource";

export class UpdateJourneyLanguage {
    private languageCode: string;
    private resource: UpdateJourneyResource;
    private title: string;

    public getLanguageCode(): string {

      return languageCode;
    }

    public setLanguageCode(languageCode: string): void {

      this.languageCode = languageCode;

    }

    public getResource(): UpdateJourneyResource {

      return resource;
    }

    public setResource(resource: UpdateJourneyResource): void {

      this.resource = resource;

    }

    public getTitle(): string {

      return title;
    }

    public setTitle(title: string): void {

      this.title = title;

    }
}
