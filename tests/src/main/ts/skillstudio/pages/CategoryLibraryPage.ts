// @ts-nocheck
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";
import { CreateCollectionPage } from "cs/pages/CreateCollectionPage";
import { CategoryLibraryAssertions } from "skillstudio/assertions/CategoryLibraryAssertions";
import { SkillsStudioCategoryNavigationPage } from "skillstudio/pages/SkillsStudioCategoryNavigationPage";

export class CategoryLibraryPage extends SkillsStudioCategoryNavigationPage {
  [key: string]: any;
  constructor(...args: any[]) {
    super(...args as any);
  }
}
