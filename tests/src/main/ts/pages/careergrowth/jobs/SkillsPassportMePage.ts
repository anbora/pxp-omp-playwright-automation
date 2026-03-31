// @ts-nocheck
import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { AriaRole, Browser, Locator } from "common/testing/playwright";
import { AddSkillModalPage } from "pages/careergrowth/jobs/AddSkillModalPage";
import { MyOpportunitiesPage } from "pages/careergrowth/jobs/MyOpportunitiesPage";
import { VisibilityModalPage } from "pages/careergrowth/jobs/VisibilityModalPage";
import { MyMentorshipPage } from "pages/careergrowth/mentorship/MyMentorshipPage";
import { ConfirmDeleteModalPage } from "pages/careergrowth/profiles/ConfirmDeleteModalPage";
import { ProfileDetailsPage } from "pages/careergrowth/profiles/ProfileDetailsPage";
import { ProjectsMePage } from "pages/careergrowth/project/ProjectsMePage";
import { ManageRolePage } from "pages/careergrowth/roles/ManageRolePage";
import { MePageProfile } from "pages/me/MePageProfile";
import { AddCertificateModalPage } from "pages/skillspassport/AddCertificateModalPage";
import { AddEditBadgeModalPage } from "pages/skillspassport/AddEditBadgeModalPage";
import { AddPatentModalPage } from "pages/skillspassport/AddPatentModalPage";

export class SkillsPassportMePage extends BasePage {
  [key: string]: any;
  constructor(...args: any[]) {
    super(...args as any);
  }
}
