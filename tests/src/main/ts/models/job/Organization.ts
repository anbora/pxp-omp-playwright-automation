import { Expose } from "common/testing/json";

export class Organization {
    private organizationTypeId: string;
    private externalId: string;

    public getOrganizationTypeId(): string {

      return organizationTypeId;
    }

    public setOrganizationTypeId(organizationTypeId: string): void {

      this.organizationTypeId = organizationTypeId;

    }

    public getExternalId(): string {

      return externalId;
    }

    public setExternalId(externalId: string): void {

      this.externalId = externalId;

    }
}
