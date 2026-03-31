// @ts-nocheck
import { Expose } from "common/testing/json";

export class LinkedRole {

    private externalId: string;
    private internalId: string;
    private linkedRoleStatus: string;

    public getExternalId(): string {

      return externalId;
    }

    public setExternalId(externalId: string): void {

      this.externalId = externalId;

    }

    public getInternalId(): string {

      return internalId;
    }

    public setInternalId(internalId: string): void {

      this.internalId = internalId;

    }

    public getLinkedRoleStatus(): string {

      return linkedRoleStatus;
    }

    public setLinkedRoleStatus(linkedRoleStatus: string): void {

      this.linkedRoleStatus = linkedRoleStatus;

    }

}
