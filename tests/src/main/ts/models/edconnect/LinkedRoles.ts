// @ts-nocheck
import { Expose } from "common/testing/json";

export class LinkedRoles {

    private external_id: string;
    private internal_id: string;
    private linked_role_status: string;

    public getExternal_id(): string {

      return external_id;
    }

    public setExternal_id(external_id: string): void {

      this.external_id = external_id;

    }

    public getInternal_id(): string {

      return internal_id;
    }

    public setInternal_id(internal_id: string): void {

      this.internal_id = internal_id;

    }

    public getLinked_role_status(): string {

      return linked_role_status;
    }

    public setLinked_role_status(linked_role_status: string): void {

      this.linked_role_status = linked_role_status;

    }
}
