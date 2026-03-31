// @ts-nocheck
import { AbstractBasePage, PageClass } from "common/AbstractBasePage";
import { BaseTest } from "common/BaseTest";
import { FileUploader } from "common/FileUploader";
import { getPageModel } from "common/annotations/PageModel";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { AriaRole, Browser, FileChooser, LoadState, Locator, Page } from "common/testing/playwright";
import { TranslationChecker } from "common/utilities/TranslationChecker";
import { AdminPanelPage } from "pages/admin/AdminPanelPage";
import { WelcomePage_New } from "pages/careergrowth/careergrowth/WelcomePage_New";
import { ProfileDetailsPage } from "pages/careergrowth/profiles/ProfileDetailsPage";
import { CreateProjectPage } from "pages/careergrowth/project/CreateProjectPage";
import { ProjectDiscoveryPage } from "pages/careergrowth/project/ProjectDiscoveryPage";
import { TalentSourcingPage } from "pages/careergrowth/talentsourcing/TalentSourcingPage";
import { LandingPage } from "pages/landing/LandingPage";
import { MePageProfile } from "pages/me/MePageProfile";
import { HomePage } from "pages/other/HomePage";
import { ManagerDashboardPage } from "pages/other/ManagerDashboardPage";
import { SmartSearchPage } from "pages/other/SmartSearchPage";
import { WebURLSmartCardModal } from "pages/smartcard/WebURLSmartCardModal";

type PageModelClass<T extends BasePage> = PageClass<T> & { pageModel?: { url?: string } };

export class BasePage extends AbstractBasePage {
  [key: string]: any;
  public static readonly DEFAULT_TIMEOUT = 1000;
  public static readonly TIMEOUT = 3000;

  public editProfileOption: Locator = this.page.locator("//a[text()='Edit Profile'] | //button[text()='Edit Profile']");

  constructor(browser: Browser, pageHandler: PageHandler, url: string, logger: Logger, portalIndex: number);
  constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number);
  constructor(
    browser: Browser,
    pageHandler: PageHandler,
    urlOrLogger: string | Logger,
    loggerOrPortalIndex: Logger | number,
    maybePortalIndex?: number
  ) {
    if (typeof urlOrLogger === "string") {
      super(browser, pageHandler, urlOrLogger, loggerOrPortalIndex as Logger, maybePortalIndex ?? 0);
    } else {
      super(browser, pageHandler, urlOrLogger, loggerOrPortalIndex as number);
    }
  }

  protected bannerParentLocator(): Locator {
    return this.getByRole(AriaRole.BANNER);
  }

  public createProjectButton(): Locator {
    return this.bannerParentLocator().getByRole(AriaRole.BUTTON, { name: "Project" });
  }

  public createButton(): Locator {
    return this.bannerParentLocator().getByRole(AriaRole.BUTTON, { name: "Create" }).first();
  }

  public smartCardButton(): Locator {
    return this.bannerParentLocator().getByRole(AriaRole.BUTTON, { name: "SmartCard Create" });
  }

  public searchInput(): Locator {
    return this.bannerParentLocator().getByRole(AriaRole.TEXTBOX, { name: "Start typing" });
  }

  public bellIcon(): Locator {
    return this.bannerParentLocator().getByRole(AriaRole.BUTTON, { name: "Notifications" });
  }

  public notificationsCounter(): Locator {
    return this.bellIcon().locator(".counter");
  }

  public moreIcon(): Locator {
    return this.bannerParentLocator().getByRole(AriaRole.BUTTON, { name: "More" }).first();
  }

  public moreIconInSpanish(): Locator {
    return this.bannerParentLocator().getByRole(AriaRole.BUTTON, { name: "Mas" });
  }

  public moreIconInPolish(): Locator {
    return this.bannerParentLocator().getByRole(AriaRole.BUTTON, { name: "Wiecej opcji i funkcji" });
  }

  public homeTab(): Locator {
    return this.bannerParentLocator().getByRole(AriaRole.TAB, { name: "HOME" });
  }

  public meTab(): Locator {
    return this.bannerParentLocator().getByRole(AriaRole.TAB, {
      name: Pattern.compile("\\b(ME|PROFILE)\\b")
    });
  }

  public discoverTab(): Locator {
    return this.bannerParentLocator().getByRole(AriaRole.TAB, { name: "DISCOVER" });
  }

  public careerGrowthTab(): Locator {
    return this.bannerParentLocator().getByRole(AriaRole.TAB, { name: "CAREER GROWTH" });
  }

  public userDefinedLanguageSelect(): Locator {
    return this.bannerParentLocator().locator("#headerMenulang");
  }

  public selectFileButton(): Locator {
    return this.locator("//div[@class='fsp-select-labels']/descendant::div[1]");
  }

  public uploadButton(): Locator {
    return this.locator("//span[@title='Upload']");
  }

  public userProfileHeaderIcon(): Locator {
    return this.getByRole(AriaRole.BUTTON, "Picture of");
  }

  public configureHomePageButton(): Locator {
    return this.bannerParentLocator().getByRole(AriaRole.LINK, { name: "Configure Home Page" });
  }

  public notificationMessage(text: string): Locator {
    return this.bannerParentLocator().getByRole(AriaRole.LINK, { name: text });
  }

  public getBasePage(): BasePage {
    return this;
  }

  public goToCareerGrowthPage(): WelcomePage_New {
    this.careerGrowthTab().click();
    this.page.waitForLoadState?.();
    return this.getPageClassInstance(WelcomePage_New);
  }

  public goDirectlyTo<T extends BasePage>(clazz: PageModelClass<T>, ...params: string[]): T {
    const pageModel = getPageModel(clazz);
    const relativeUrl = pageModel?.url ?? "";
    const baseUrl = BaseTest.getPortalConfig(this.portalIndex).getUrl();
    this.page.navigate?.(String.format(baseUrl + relativeUrl, ...params));
    return this.getPageClassInstance(clazz);
  }

  public checkTranslationWithPageRefresh<T extends BasePage>(clazz: PageClass<T>, exclude: Array<string>, ...params: string[]): T {
    this.pause(5000);
    this.refreshCurrentPage(clazz);
    return this.checkTranslationWithoutPageRefresh(clazz, exclude, ...params);
  }

  public checkTranslationWithoutPageRefresh<T extends BasePage>(clazz: PageClass<T>, exclude: Array<string>, ..._params: string[]): T {
    this.pause(5000);
    new TranslationChecker(this.page).getListOfTranslatedElements(exclude);
    this.pause(2000);
    this.takeScreenshot(Thread.currentThread().getName() + "_translation_" + UUID.randomUUID());
    this.pause(2000);
    return this.getPageClassInstance(clazz);
  }

  public goToTalentSourcing(): TalentSourcingPage {
    this.page.reload?.();
    this.moreIcon().click(new Locator.ClickOptions().setForce(true));
    this.page.locator("a[href = '/sourcing']").click();
    this.page.reload?.();
    return this.getPageClassInstance(TalentSourcingPage);
  }

  public goToHomePage(): HomePage {
    this.homeTab().click();
    return this.getPageClassInstance(HomePage);
  }

  public goToLandingPage(): LandingPage {
    this.homeTab().click();
    return this.getPageClassInstance(LandingPage);
  }

  public goToDiscoveryPage(): ProjectDiscoveryPage {
    this.discoverTab().click();
    return this.getPageClassInstance(ProjectDiscoveryPage);
  }

  public goToMePageProfile(): MePageProfile {
    this.meTab().click();
    this.page.waitForLoadState?.(LoadState.DOMCONTENTLOADED);
    this.pause(5000);
    return this.getPageClassInstance(MePageProfile);
  }

  public goToAdminPanel(): AdminPanelPage {
    this.moreIcon().click();
    this.page.locator("//label[text()='Admin']/parent::a").click();
    this.pause(10000);
    return this.getPageClassInstance(AdminPanelPage);
  }

  public goToManagerDashboardPage(): ManagerDashboardPage {
    this.moreIcon().click();
    this.page.locator("//label[text()='Manager Dashboard']/parent::a").click();
    this.pause(10000);
    return this.getPageClassInstance(ManagerDashboardPage);
  }

  public editProfile(): ProfileDetailsPage {
    this.moreIcon().click();
    this.editProfileOption.click();
    return this.getPageClassInstance(ProfileDetailsPage);
  }

  public goToProfileFromUserDropDown(userName: string): MePageProfile {
    this.getLocatorWithParam("//span[@class = 'ed-dropdown-label'][text() = '%s']", userName).click();
    this.page.locator("//ul[@class = 'profile-links']/li/a[text() = 'Profile'] | //ul[@class = 'profile-links']/li/button[text() = 'Profile']").click();
    return this.getPageClassInstance(MePageProfile);
  }

  public goToEditProfileFromUserDropDown(userName: string): ProfileDetailsPage {
    this.getLocatorWithParam("//span[@class = 'ed-dropdown-label'][text() = '%s']", userName).click();
    this.page.locator("//ul[@class = 'profile-links']/li/button[text() = 'Edit Profile']|//ul[@class = 'profile-links']/li/a[text() = 'Edit Profile']").click();
    return this.getPageClassInstance(ProfileDetailsPage);
  }

  public dragAndDrop<T extends BasePage>(drag: Locator, drop: Locator, clazz: PageClass<T>): T {
    this.pause(3000);
    drag.hover?.();
    this.page.mouse?.().down?.();
    drop.hover?.();
    this.page.mouse?.().up?.();
    return this.getPageClassInstance(clazz);
  }

  public uploadFile(filePath: string, uploadCsvFile: Locator): BasePage {
    const fileChooser: FileChooser = this.page.waitForFileChooser?.(() => uploadCsvFile.click());
    fileChooser?.setFiles?.(filePath);
    uploadCsvFile.setInputFiles?.(filePath);
    return this;
  }

  public clickCreateButton(): BasePage {
    this.createButton().click();
    return this;
  }

  public clickCreateProjectButton(): CreateProjectPage {
    this.createProjectButton().first().click();
    this.pause(5000);
    return this.getPageClassInstance(CreateProjectPage);
  }

  public clickSmartCardButton(): WebURLSmartCardModal {
    this.smartCardButton().click();
    return this.getPageClassInstance(WebURLSmartCardModal);
  }

  public clickNotificationsBell(): BasePage {
    this.bellIcon().first().click();
    return this;
  }

  public visitAURL<T extends BasePage>(url: string, clazz: PageClass<T>): T {
    this.page.navigate?.(url);
    return this.getPageClassInstance(clazz);
  }

  public useKeywordSearch(keyword: string): SmartSearchPage {
    this.searchInput().first().click();
    this.searchInput().first().fill(keyword);
    this.page.keyboard?.().press?.("Enter");
    return this.getPageClassInstance(SmartSearchPage);
  }

  public isVisible(element: Locator): boolean {
    this.pause(BasePage.DEFAULT_TIMEOUT);
    const visible = typeof element?.isVisible === "function"
      ? element.isVisible()
      : this.page.isVisible?.(String(element).replace("Locator@", ""));
    this.pause(BasePage.DEFAULT_TIMEOUT);
    return Boolean(visible);
  }

  public changeUserDefinedLanguage(langCode: string): BasePage {
    this.moreIcon().click();
    this.userDefinedLanguageSelect().selectOption?.(langCode);
    this.pause(BasePage.TIMEOUT);
    return this;
  }

  public changeUserDefinedLanguageInSpanish(langCode: string): BasePage {
    this.moreIconInSpanish().click();
    this.userDefinedLanguageSelect().selectOption?.(langCode);
    this.pause(BasePage.TIMEOUT);
    return this;
  }

  public changeUserDefinedLanguageInPolish(langCode: string): BasePage {
    this.moreIconInPolish().click();
    this.userDefinedLanguageSelect().selectOption?.(langCode);
    this.pause(BasePage.TIMEOUT);
    return this;
  }

  public uploadBannerImage<T extends BasePage>(filePath: string, removeButton: Locator, clazz: PageClass<T>): T {
    this.uploadFile(filePath, this.selectFileButton());
    this.uploadButton().click();
    void this.isVisible(removeButton);
    return this.getPageClassInstance(clazz);
  }

  public clickProfileDropdown(): HomePage {
    this.userProfileHeaderIcon().click();
    return this.getPageClassInstance(HomePage);
  }

  public clickConfigureHomePageButton(): LandingPage {
    this.userProfileHeaderIcon().click();
    this.configureHomePageButton().click();
    this.pause(2000);
    return this.getPageClassInstance(LandingPage);
  }

  private takeScreenshot(fileName: string): void {
    try {
      const screenshotPath = `screenshot/${fileName}.jpg`;
      this.pageHandler.getCurrentPage().screenshot?.(
        new Page.ScreenshotOptions().setPath(screenshotPath).setFullPage(true)
      );

      if (System.getProperty("resultDashboard", "false") === "true") {
        const runName = System.getProperty("runName", "");
        const screenshotName = `${runName}_${fileName}.jpg`;
        new FileUploader().uploadFile(screenshotPath, screenshotName);
      }
    } catch (error) {
      console.error(error);
    }
  }
}
