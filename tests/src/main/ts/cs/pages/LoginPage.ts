// @ts-nocheck
import { BasePage } from "common/BasePage";
import { BaseTest } from "common/BaseTest";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, LoadState, Locator, WaitForSelectorOptions } from "common/testing/playwright";
import { ContentStudioPopup } from "cs/pages/ContentStudioPopup";

export class LoginPage extends BasePage {

	public emailInput: Locator = this.page.locator("input#userNameBox,input#userName");
	public passwordInput: Locator = this.page.getByPlaceholder("Password");
	public loginButton: Locator = this.page.locator("#LoginBtn,#submit");
	public showNavigation: Locator = this.page.locator("//a[@title='Show Navigation Menu']/i");
	public contentNavigationOption: Locator = this.page.getByTestId("nav-item-Content");
	public contentStudioNavigationOption: Locator = this.page.getByTestId("nav-item-Content Studio Stage");
	public contentStudioQANavigationOption: Locator = this.page.getByTestId("nav-item-Content Studio");
	public contentStudioStageText: Locator = this.page.locator("//div[@id = 'mainContainer']/descendant::span/b[contains(text(), 'Content Studio Stage')]|//a[@id='ctl00_ContentPlaceHolder1_contentStudioLink']");
	public corpId: Locator = this.page.locator("input#corpBox");
	public sbx_signInButtn: Locator = this.page.locator("//a[@title='Sign In']");
	public sbx_UserNameInput: Locator = this.page.locator("//label[contains(text(),'Username')]/parent:: div/following-sibling::div//input");
	public sbx_PasswordInput: Locator = this.page.locator("//label[contains(text(),'Password')]/parent:: div/following-sibling::div//input");
	public sbx_LoginButton: Locator = this.page.locator("//button[text()='Sign in']|//button[text()='Sign In']");
	public sbx_TearmAccept: Locator = this.page.locator("//button[text()='Accept']");
	public sbx_ATag(element: string): Locator {
	  return this.getLocatorWithParam("//a[contains(text(),'%s')]", element);
	}
	public sbx_SpanTag(element: string): Locator {
	  return this.getLocatorWithParam("//span[text()='%s']", element);
	}
	public sbx_CC: Locator = this.page.locator("//span[text()=' Go to Content Studio ']/ancestor::a");

	constructor(browser: Browser, page: PageHandler, url: string, logger: Logger, portalIndex: number) {

	  super(browser, page, url, logger, portalIndex);

	}

//	public Page loginThinkContent(String URL, String UserName, String Password) throws InterruptedException {
//		String option="Content";
//		String option2="Content Studio Stage";
//		this.page.navigate(URL);
//		this.page.getByPlaceholder("Email").fill(UserName);
//		this.page.getByPlaceholder("Password").fill(Password);
//		this.page.locator("#LoginBtn").click();
//		Thread.sleep(10000);
//		this.page.locator("xpath=//a[@title='Show Navigation Menu']/i").click();
//		this.page.getByTestId("nav-item-"+option).click();
//		this.page.getByTestId("nav-item-"+option2).click();
//
//		Thread.sleep(10000);
//		Page popuPage= this.page.waitForPopup(() =>{
//			this.page.getByText("Content Studio Stage").last().click();
//		});
//		popuPage.waitForLoadState(LoadState.DOMCONTENTLOADED);
//		popuPage.waitForURL("https://contentstudio.usw2.stg.ath.ext.us.csod.gcp/#/explore-subscriptions",new WaitForURLOptions().setWaitUntil(WaitUntilState.LOAD).setTimeout(60000));
//
//		popuPage.waitForLoadState(LoadState.LOAD);
//		popuPage.waitForSelector("xpath=//nav//span[text()='Curation']",new WaitForSelectorOptions().setTimeout(60000));
//		System.out.println(popuPage.title());
//		return popuPage;
//	}

	public loginToThinkContent(userName: string, password: string): ContentStudioPopup {
		emailInput.fill(userName);
		passwordInput.fill(password);
		loginButton.click();
		this.page.waitForLoadState(LoadState.DOMCONTENTLOADED);
		showNavigation.click();
		contentNavigationOption.click();
		contentStudioNavigationOption.click();
		this.page.waitForLoadState(LoadState.DOMCONTENTLOADED);
		return this.openPageInNewTab(contentStudioStageText, ContentStudioPopup);
	}

	// Added For EdCast
	public loginToApplication(userName: string, password: string): LoginPage {
			emailInput.fill(userName);
			passwordInput.fill(password);
			loginButton.click();
			this.page.waitForLoadState(LoadState.DOMCONTENTLOADED);
			this.page.waitForSelector("h2[data-testid='base-card'],div.block-title,button[aria-label='More options and features']",new WaitForSelectorOptions().setTimeout(60000));
			return this;
	}

	public loginToApplication_LandingPage(userName: string, password: string): LoginPage {
		emailInput.fill(userName);
		passwordInput.fill(password);
		loginButton.click();
		this.pause(20000);
		//this.page.waitForLoadState(LoadState.DOMCONTENTLOADED);
		this.page.waitForSelector("//ul[@class='menu-items']");
		return this;
	}

	public navigateToLogin(): LoginPage {
			this.page.locator("//button[text()='Login with CSOD SSO']").click();
			return this;
	}

	public launchEdCastContentStudio(): ContentStudioPopup {
		this.pause(10000);
		this.page.waitForLoadState(LoadState.DOMCONTENTLOADED);
		//this.page.locator("//div[@class='ed-dropdown']//button[@aria-label='More options and features']/i")
		this.page.locator("//div[contains(@class,'--more')]//button//*[@class='icon-angle-down-arrow']").waitFor(new Locator.WaitForOptions().setTimeout(60000)); //More options and features
		//this.page.locator("//div[@class='ed-dropdown']//button[@aria-label='More options and features']/i")
		this.page.locator("//div[contains(@class,'--more')]//button//*[@class='icon-angle-down-arrow']").first().click();
		this.pause(3000);
		return this.openPageInNewTab(this.page.locator("//label[text()='Content Studio']/parent:: button"), ContentStudioPopup);
	}

	public loginToQA(userName: string, password: string): ContentStudioPopup {
		corpId.fill("QA01_KG");
		emailInput.fill(userName);
		passwordInput.fill(password);
		loginButton.click();
		this.pause(60000);
		this.page.waitForLoadState(LoadState.DOMCONTENTLOADED);
		showNavigation.click();
		contentNavigationOption.click();
		contentStudioQANavigationOption.click();
		this.page.waitForLoadState(LoadState.DOMCONTENTLOADED);
		return this.openPageInNewTab(contentStudioStageText, ContentStudioPopup);
	}

	public logintoSBX(userName: string, password: string): ContentStudioPopup {

		this.page.navigate("https://dq3qa002.sabacloud.com/Saba/Web_wdk/QA002/index/prelogin.rdf?signin=true#/login");
		this.pause(5000);
		//sbx_signInButtn.click();
		if(this.page.locator("//button[contains(text(),'Got it')]").isVisible()) {
			this.page.locator("//button[contains(text(),'Got it')]").click();
			this.pause(2000);
		}
		sbx_UserNameInput.fill(userName);
		sbx_PasswordInput.fill(password);
		sbx_LoginButton.click();
		this.pause(5000);
		if(this.page.locator("//span[text()='An error occurred. Please try again later. If the error continues, contact your System Administrator.']/ancestor:: div[contains(@class,'alert-items')]/following-sibling:: button//*[@shape='close']").isVisible()) {
			this.pause(2000);
			this.page.locator("//span[text()='An error occurred. Please try again later. If the error continues, contact your System Administrator.']/ancestor:: div[contains(@class,'alert-items')]/following-sibling:: button//*[@shape='close']").click();
			this.pause(2000);

		}
		if(sbx_TearmAccept.isVisible()) {
			sbx_TearmAccept.click();

		}

		this.page.waitForLoadState(LoadState.DOMCONTENTLOADED);
		this.pause(5000);
		this.sbx_SpanTag("Admin").click();
		this.sbx_ATag("Learning").click();
		this.page.locator("//div[text()='Manage Content']|//*[@id='framework-sidenav-manage-contents-group']//div[contains(text(),'Manage Content')]").scrollIntoViewIfNeeded();
		this.page.locator("//div[text()='Manage Content']|//*[@id='framework-sidenav-manage-contents-group']//div[contains(text(),'Manage Content')]").click();
		this.pause(5000);
		this.sbx_SpanTag("Content Studio").scrollIntoViewIfNeeded();
		this.sbx_SpanTag("Content Studio").click();
		this.page.waitForLoadState(LoadState.DOMCONTENTLOADED);
		return this.openPageInNewTab(this.page.locator("//span[text()=' Go to Content Studio ']/ancestor::button"), ContentStudioPopup);
	}

}
