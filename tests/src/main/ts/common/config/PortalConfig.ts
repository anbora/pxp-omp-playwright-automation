// @ts-nocheck
import { BaseTest } from "common/BaseTest";
import { LoginSettings } from "common/LoginSettings";
import { Portal } from "common/config/Portal";

export class PortalConfig {
  constructor(private portalIndex: number) {}

  private getPortal(): Portal {
    return BaseTest.getConfig().getPortal()[this.portalIndex] ?? new Portal();
  }

  getUrl() { return this.getPortal().getUrl(); }
  getAccountId() { return this.getPortal().getAccountId(); }
  getAdminRoles() { return this.getPortal().getAdminRoles(); }
  getGardenerRoleId() { return this.getPortal().getGardenerRoleId(); }
  getLocationId() { return this.getPortal().getLocationId(); }
  getName() { return this.getPortal().getName(); }
  getRoleFamilyId() { return this.getPortal().getRoleFamilyId(); }
  getSkilledGardenerRoleId() { return this.getPortal().getSkilledGardenerRoleId(); }
  getV5apiKey() { return this.getPortal().getV5apiKey(); }
  getV5token() { return this.getPortal().getV5token(); }
  getV6CurrentUser() { return this.getPortal().getV6CurrentUser(); }
  getV6token() { return this.getPortal().getV6token(); }
  getUserId() { return this.getPortal().getUserId(); }
  getLoginSettings(): LoginSettings { return this.getPortal().getLoginSettings(); }
}
