// @ts-nocheck
import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { AriaRole, Browser, Locator } from "common/testing/playwright";
import { UserModel } from "models/user/UserModel";
import { MyOpportunitiesPage } from "pages/careergrowth/jobs/MyOpportunitiesPage";
import { SkillsPassportMePage } from "pages/careergrowth/jobs/SkillsPassportMePage";
import { MyMentorshipPage } from "pages/careergrowth/mentorship/MyMentorshipPage";
import { ProfileDetailsPage } from "pages/careergrowth/profiles/ProfileDetailsPage";
import { ProjectsMePage } from "pages/careergrowth/project/ProjectsMePage";
import { ManageRolePage } from "pages/careergrowth/roles/ManageRolePage";
import { ContentMePage } from "pages/me/ContentMePage";
import { LearningQueuePage } from "pages/me/LearningQueuePage";
import { MePageProfile } from "pages/me/MePageProfile";

export abstract class AbstractMePage<T = any> extends BasePage {
  [key: string]: any;
  constructor(...args: any[]) {
    super(...args as any);
  }
}
