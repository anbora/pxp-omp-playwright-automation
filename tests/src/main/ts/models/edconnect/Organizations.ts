// @ts-nocheck
import { Expose } from "common/testing/json";

export class Organizations {

    private organization_type_id: string;
    private external_id: string;

    public getOrganization_type_id(): string {

      return organization_type_id;
    }

    public setOrganization_type_id(organization_type_id: string): void {

      this.organization_type_id = organization_type_id;

    }

    public getExternal_id(): string {

      return external_id;
    }

    public setExternal_id(external_id: string): void {

      this.external_id = external_id;

    }
}
