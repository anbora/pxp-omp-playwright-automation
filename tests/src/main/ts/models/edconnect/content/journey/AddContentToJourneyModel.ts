import { Expose, JsonProperty, SerializedName } from "common/testing/json";

export class AddContentToJourneyModel implements Serializable{

    private externalId: string;
    private id: string;
    private sourceId: string;

    public getExternalId(): string {

      return externalId;
    }

    public setExternalId(externalId: string): void {

      this.externalId = externalId;

    }

    public getId(): string {

      return id;
    }

    public setId(id: string): void {

      this.id = id;

    }

    public getSourceId(): string {

      return sourceId;
    }

    public setSourceId(sourceId: string): void {

      this.sourceId = sourceId;

    }

}
