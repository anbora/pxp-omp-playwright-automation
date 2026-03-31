// @ts-nocheck
import { Expose } from "common/testing/json";

export class GroupModel {

    private name: string;
    private description: string;
    private is_private: boolean;
    private id: string;

    public getName(): string {

      return name;
    }

    public setName(name: string): void {

      this.name = name;

    }

    public getDescription(): string {

      return description;
    }

    public setDescription(description: string): void {

      this.description = description;

    }

    public getIs_private(): boolean {

      return is_private;
    }

    public setIs_private(is_private: boolean): void {

      this.is_private = is_private;

    }

    public getId(): string {

      return id;
    }

    public setId(id: string): void {

      this.id = id;

    }
}
