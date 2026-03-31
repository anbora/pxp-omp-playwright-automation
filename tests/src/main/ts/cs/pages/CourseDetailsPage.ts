// @ts-nocheck
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator, Page } from "common/testing/playwright";
import { CreateCollectionPage } from "cs/pages/CreateCollectionPage";
import { GlobalNavigationPage } from "cs/pages/GlobalNavigationPage";

export class CourseDetailsPage extends GlobalNavigationPage{

	public complianceEmploymentLaw: Locator = this.page.locator("span:has-text('Compliance employment law')");
	public qv_Course_button_LOC(courseName: string): Locator {
	  return this.getLocatorWithParam("", courseName);
	}
	public modalities(modalities: string): Locator {
	  return this.getLocatorWithParam("//span[text()='MODALITIES']/../div//*[@id='%s']", modalities);
	}

	//public Locator language (String language) { return this.getLocatorWithParam("//span[text()='LANGUAGES']/following-sibling:: span[text()='%s']", language); }
	public contentPartner(contentPartner: string): Locator {
	  return this.getLocatorWithParam("//div[text()='CONTENT PARTNER']/following-sibling:: div//span[text()='%s']", contentPartner);
	}
	//public Locator subscriptions (String subscriptions) { return this.getLocatorWithParam("//div[text()='SUBSCRIPTIONS']/following-sibling:: div//*[text()='%s']", subscriptions); }
	public verifydetails(name: string): Locator {
	  return this.getLocatorWithParam("//span[text()='%s']/following-sibling::div/div", name);
	}
	//this.locator("//span[text()='SKILLS']/following-sibling::div/div")

	constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

	  super(browser, pageHandler, logger, portalIndex);

	}

	public goToLastPage(): CourseDetailsPage {
		/*
		 this.goBackToParentPage(CreateCollectionPage);
		 System.out.println(this.pageHandler.getCurrentPageIndex());
		 System.out.println(this.pageHandler);
		 this.pause(1000);
		 */

		let testdemo: Array<Page> = this.page.context().pages();
		this.page=this.page.context().pages().get(testdemo.length-2);
		return this;
	}
}
