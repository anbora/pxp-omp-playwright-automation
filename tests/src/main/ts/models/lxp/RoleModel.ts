// @ts-nocheck
import { Expose } from "common/testing/json";

export class RoleModel {

    private id: string;
    private name: string;

    public getId(): string {

      return id;
    }

    public setId(id: string): void {

      this.id = id;

    }

    public getName(): string {

      return name;
    }

    public setName(name: string): void {

      this.name = name;

    }
}
