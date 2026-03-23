import { Expose } from "common/testing/json";

export class UpdateJourneyMetadata {
    private extra: string;

    public getExtra(): string {

      return extra;
    }

    public setExtra(extra: string): void {

      this.extra = extra;

    }
}
