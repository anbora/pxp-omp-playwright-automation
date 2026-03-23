import { Expose } from "common/testing/json";

export class JourneyMetadata {

    private extra: string;

    public getExtra(): string {

      return extra;
    }

    public setExtra(extra: string): void {

      this.extra = extra;

    }
}
