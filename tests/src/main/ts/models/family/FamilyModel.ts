import { Expose } from "common/testing/json";

export class FamilyModel {

    private description: string;
    private externalId: string;
    private functionId: string;
    private title: string;

    public getDescription(): string {

      return description;
    }

    public setDescription(description: string): void {

      this.description = description;

    }

    public getExternalId(): string {

      return externalId;
    }

    public setExternalId(externalId: string): void {

      this.externalId = externalId;

    }

    public getFunctionId(): string {

      return functionId;
    }

    public setFunctionId(functionId: string): void {

      this.functionId = functionId;

    }

    public getTitle(): string {

      return title;
    }

    public setTitle(title: string): void {

      this.title = title;

    }
}
