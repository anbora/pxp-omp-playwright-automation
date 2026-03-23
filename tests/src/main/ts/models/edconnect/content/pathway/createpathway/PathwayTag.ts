import { Expose } from "common/testing/json";

export class PathwayTag {

    private name: string;

    public getName(): string {

      return name;
    }

    public setName(name: string): void {

      this.name = name;

    }

}
