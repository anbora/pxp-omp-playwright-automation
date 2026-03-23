import { Portal } from "common/config/Portal";

export class Config {
  [key: string]: any;

  edCastURL = "";
  edcastQAURL = "";
  organizationIDs: string[] = [];
  portal: Portal[] = [];
  proficiencyURL = "";
  sbxurl = "";
  skillStudioURL = "";
  talentMarketplaceServiceApiURL = "";
  thinkContentURL = "";

  getEdCastURL() { return this.edCastURL; }
  setEdCastURL(value: string) { this.edCastURL = value; }
  getEdcastQAURL() { return this.edcastQAURL; }
  setEdcastQAURL(value: string) { this.edcastQAURL = value; }
  getOrganizationIDs() { return this.organizationIDs; }
  setOrganizationIDs(value: string[]) { this.organizationIDs = value; }
  getPortal() { return this.portal; }
  setPortal(value: Portal[]) { this.portal = value; }
  getProficiencyURL() { return this.proficiencyURL; }
  setProficiencyURL(value: string) { this.proficiencyURL = value; }
  getSbxurl() { return this.sbxurl; }
  setSbxurl(value: string) { this.sbxurl = value; }
  getSkillStudioURL() { return this.skillStudioURL; }
  setSkillStudioURL(value: string) { this.skillStudioURL = value; }
  getTalentMarketplaceServiceApiURL() { return this.talentMarketplaceServiceApiURL; }
  setTalentMarketplaceServiceApiURL(value: string) { this.talentMarketplaceServiceApiURL = value; }
  getThinkContentURL() { return this.thinkContentURL; }
  setThinkContentURL(value: string) { this.thinkContentURL = value; }
}
