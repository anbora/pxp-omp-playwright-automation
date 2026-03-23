import { Expose } from "common/testing/json";

export class FunctionModel {

    private description: string;
    private title: string;

    public getDescription(): string {

      return description;
    }

    public setDescription(description: string): void {

      this.description = description;

    }

    public getTitle(): string {

      return title;
    }

    public setTitle(title: string): void {

      this.title = title;

    }
}
