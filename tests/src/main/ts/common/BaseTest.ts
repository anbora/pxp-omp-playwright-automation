import fs from "node:fs";
import path from "node:path";
import { Config } from "common/config/Config";
import { PortalConfig } from "common/config/PortalConfig";
import { PageHandler } from "common/PageHandler";
import { ObjectMapper } from "common/testing/json";
import { FileAppender, Logger, PatternLayout } from "common/testing/logger";
import { Browser, BrowserContext, BrowserType, Page, Playwright, Proxy } from "common/testing/playwright";
import { ITestContext } from "common/testing/runtime";
import { UserModel } from "models/user/UserModel";
import { Users } from "models/user/Users";

export class BaseTest {
  private static config: Config = new Config();
  private static readonly withZap = Boolean.parseBoolean?.(System.getProperty("zap", "false")) ?? false;
  private static readonly zapHost = System.getProperty("http.proxyHost", "127.0.0.1");
  private static readonly zapPort = System.getProperty("http.proxyPort", "9999");

  public portalIndex = 0;
  private browser!: Browser;
  private page!: Page;
  public playwright: any;
  public playwrightForRestAPI: any;
  public pageHandler: PageHandler = new PageHandler();
  public logger: Logger = Logger.getLogger(BaseTest);
  private appender: FileAppender | null = null;

  public beforeSuite(): void {
    this.playwrightForRestAPI = Playwright.create();
    BaseTest.config = this.loadConfig();
  }

  public afterSuite(): void {
    this.playwrightForRestAPI?.close?.();
  }

  public loadData(_context: ITestContext): void {
    this.logger = Logger.getLogger(this.constructor);
    this.addLoggerAdapter(this.constructor.name, "fullLog");
  }

  public afterClass(): void {
    this.appender?.close();
    if (this.appender) {
      this.logger.removeAppender(this.appender);
    }
  }

  public setUpBrowser(method: { getName?: () => string } = {}): void {
    this.logger.info("###############################");
    this.logger.info("Test: " + (method.getName?.() ?? "unknown"));
    this.logger.info("###############################");

    this.playwright = Playwright.create();

    const options = new BrowserType.LaunchOptions()
      .setHeadless(Boolean.parseBoolean?.(System.getProperty("grid", "false")) || BaseTest.withZap);

    if (BaseTest.withZap) {
      options.setProxy(new Proxy(`http://${BaseTest.zapHost}:${BaseTest.zapPort}`));
    }

    this.browser = this.playwright.chromium().launch?.(options);

    const contextOptions = new Browser.NewContextOptions().setIgnoreHTTPSErrors(true);
    const context: BrowserContext = this.browser.newContext?.(contextOptions);
    this.page = context?.newPage?.() ?? this.browser.newPage?.();
    this.page?.setDefaultTimeout?.(30000);

    this.pageHandler = new PageHandler();
    this.pageHandler.setPageList([this.page]);
    this.pageHandler.setCurrentPageIndex(0);
  }

  public tearDownBrowser(): void {
    this.appender?.close();
    if (this.appender) {
      this.logger.removeAppender(this.appender);
    }

    this.browser?.close?.();
    this.playwright?.close?.();
  }

  public getBrowser(): Browser {
    return this.browser;
  }

  public getPageHandler(): PageHandler {
    return this.pageHandler;
  }

  public static getConfig(): Config {
    return BaseTest.config;
  }

  public getConfig(): Config {
    return BaseTest.getConfig();
  }

  public static getPortalConfig(portalIndex: number): PortalConfig {
    if (BaseTest.config.getPortal().length > portalIndex) {
      return new PortalConfig(portalIndex);
    }

    return new PortalConfig(0);
  }

  public getPortalConfig(portalIndex: number): PortalConfig {
    return BaseTest.getPortalConfig(portalIndex);
  }

  public getPlaywright() {
    return this.playwright;
  }

  public getCypressUser(): UserModel {
    return this.getUserByName("Cypress");
  }

  public getCypress2User(): UserModel {
    return this.getUserByName("Cypress2");
  }

  public getCypress3User(): UserModel {
    return this.getUserByName("Cypress3");
  }

  public getUserByName(userName: string): UserModel {
    const configName = System.getProperty("config", "qaAws");
    const usersPath = path.join(
      process.cwd(),
      "tests",
      "src",
      "main",
      "resources",
      "configuration",
      configName,
      "users.json"
    );

    try {
      const users = new ObjectMapper().readerFor(Users).readValue(fs.readFileSync(usersPath, "utf8"));
      return users.users.find((user) => user.name === userName) ?? new UserModel();
    } catch {
      return new UserModel();
    }
  }

  public waitForResponse(milliseconds: number): void {
    void milliseconds;
  }

  public static getResourceAsString(resourcePath: string): string {
    const resourceFile = path.join(process.cwd(), "tests", "src", "main", "resources", resourcePath);
    return fs.readFileSync(resourceFile, "utf8");
  }

  public getResourceAsString(resourcePath: string): string {
    return BaseTest.getResourceAsString(resourcePath);
  }

  public getOmpLoginPage() {
    const { LoginPage } = require("pages/other/LoginPage");
    return new LoginPage(this.getBrowser(), this.getPageHandler(), this.logger, this.portalIndex);
  }

  public getCsLoginPage(appurl: string) {
    const { LoginPage } = require("cs/pages/LoginPage");
    return new LoginPage(this.getBrowser(), this.getPageHandler(), appurl, this.logger, this.portalIndex);
  }

  public getPlayOneUser(): UserModel { return this.getUserByName("play_AutoOneF"); }
  public getPlayTwoUser(): UserModel { return this.getUserByName("play_AutoTwoF"); }
  public getPlayThreeUser(): UserModel { return this.getUserByName("play_AutoThreeF"); }
  public getPlayFourUser(): UserModel { return this.getUserByName("play_AutoFourF"); }
  public getPlayFiveUser(): UserModel { return this.getUserByName("play_AutoFiveF"); }
  public getPlaySixUser(): UserModel { return this.getUserByName("play_AutoSixF"); }
  public getPlaySevenUser(): UserModel { return this.getUserByName("play_AutoSevenF"); }
  public getPlayEightUser(): UserModel { return this.getUserByName("play_AutoEightF"); }
  public getPlayNineUser(): UserModel { return this.getUserByName("Testnine"); }
  public getPlayTenUser(): UserModel { return this.getUserByName("Testten"); }
  public getPlayElevenUser(): UserModel { return this.getUserByName("TestEleven"); }
  public getPlayTwelveUser(): UserModel { return this.getUserByName("TestTwelve"); }
  public getPlayThirteenUser(): UserModel { return this.getUserByName("TestTherteen"); }
  public getPlayFourteenUser(): UserModel { return this.getUserByName("TestFourteen"); }
  public getPlayFifteenUser(): UserModel { return this.getUserByName("TestFifteen"); }
  public getPlayEdCastUserOne(): UserModel { return this.getUserByName("EDTRYONEF"); }
  public getPlayEdCastUserTwo(): UserModel { return this.getUserByName("EDTRYTWOF"); }
  public getPlayEdCastUserThree(): UserModel { return this.getUserByName("EDTRYTHREEF"); }
  public getPlayEdCastUserFour(): UserModel { return this.getUserByName("EDTRYFOURF"); }
  public getPlayEdCastUserFive(): UserModel { return this.getUserByName("EDTRYFIVEF"); }
  public getPlayEdCastUserSix(): UserModel { return this.getUserByName("EDTRYSIXF"); }
  public getEdcastQAAdminUser(): UserModel { return this.getUserByName("edcastQAAdminUser"); }
  public getSkillStudioSuperAdminUser1(): UserModel { return this.getUserByName("pwSuperadminUser1"); }
  public getSkillStudioAdminUser1(): UserModel { return this.getUserByName("pwAdminUser1"); }
  public getSkillStudioAdminUser2(): UserModel { return this.getUserByName("pwAdminUser2"); }
  public getSBXUserOne(): UserModel { return this.getUserByName("CSUSERONE"); }
  public getSBXUserTwo(): UserModel { return this.getUserByName("CSUSERTWO"); }
  public getSBXUserThree(): UserModel { return this.getUserByName("CSUSERTHREE"); }
  public getSBXUserFour(): UserModel { return this.getUserByName("CSUSERFOUR"); }
  public getSBXUserFive(): UserModel { return this.getUserByName("CSUSERFIVE"); }

  public getSSLogin(appUrl: string) {
    const { SkillsStudioLoginPage } = require("skillstudio/pages/SkillsStudioLoginPage");
    return new SkillsStudioLoginPage(this.getBrowser(), this.getPageHandler(), appUrl, this.logger, this.portalIndex);
  }

  public getEdcastQALogin(appUrl: string) {
    const { SkillsStudioLoginPage } = require("skillstudio/pages/SkillsStudioLoginPage");
    return new SkillsStudioLoginPage(this.getBrowser(), this.getPageHandler(), appUrl, this.logger, this.portalIndex);
  }

  private addLoggerAdapter(clazzName: string, methodName: string): void {
    const pattern = "[%p] [%d{yyyy-MM-dd HH:mm:ss}] [%l] - %m%n";
    const layout = new PatternLayout(pattern);
    const fileName = `logger/${clazzName}_${methodName}_1.log`;
    this.appender = new FileAppender(layout, fileName);
    this.logger.addAppender(this.appender);
  }

  private loadConfig(): Config {
    const configName = System.getProperty("config", "qaAws");
    const configPath = path.join(
      process.cwd(),
      "tests",
      "src",
      "main",
      "resources",
      "configuration",
      configName,
      "config.json"
    );

    try {
      return new ObjectMapper().readerFor(Config).readValue(fs.readFileSync(configPath, "utf8"));
    } catch {
      return new Config();
    }
  }
}
