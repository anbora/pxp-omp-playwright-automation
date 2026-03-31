// @ts-nocheck
import { LoginSettings } from "common/LoginSettings";

export class Portal {
  [key: string]: any;

  accountId = "";
  adminRoles = "";
  gardenerRoleId = "";
  locationId = "";
  name = "";
  roleFamilyId = "";
  skilledGardenerRoleId = "";
  url = "";
  v5apiKey = "";
  v5token = "";
  v6CurrentUser = "";
  v6token = "";
  userId = "";
  loginSettings = new LoginSettings();

  getAccountId() { return this.accountId; }
  setAccountId(value: string) { this.accountId = value; }
  getAdminRoles() { return this.adminRoles; }
  setAdminRoles(value: string) { this.adminRoles = value; }
  getGardenerRoleId() { return this.gardenerRoleId; }
  setGardenerRoleId(value: string) { this.gardenerRoleId = value; }
  getLocationId() { return this.locationId; }
  setLocationId(value: string) { this.locationId = value; }
  getName() { return this.name; }
  setName(value: string) { this.name = value; }
  getRoleFamilyId() { return this.roleFamilyId; }
  setRoleFamilyId(value: string) { this.roleFamilyId = value; }
  getSkilledGardenerRoleId() { return this.skilledGardenerRoleId; }
  setSkilledGardenerRoleId(value: string) { this.skilledGardenerRoleId = value; }
  getUrl() { return this.url; }
  setUrl(value: string) { this.url = value; }
  getV5apiKey() { return this.v5apiKey; }
  setV5apiKey(value: string) { this.v5apiKey = value; }
  getV5token() { return this.v5token; }
  setV5token(value: string) { this.v5token = value; }
  getV6CurrentUser() { return this.v6CurrentUser; }
  setV6CurrentUser(value: string) { this.v6CurrentUser = value; }
  getV6token() { return this.v6token; }
  setV6token(value: string) { this.v6token = value; }
  getUserId() { return this.userId; }
  setUserId(value: string) { this.userId = value; }
  getLoginSettings() { return this.loginSettings; }
  setLoginSettings(value: LoginSettings) { this.loginSettings = value; }
}
