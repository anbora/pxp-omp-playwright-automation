import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";
import { GlobalNavigationPage } from "cs/pages/GlobalNavigationPage";

export class CuratorInsightsPage extends GlobalNavigationPage{

	public navigation_betaText: Locator = this.page.locator("xpath=//div[text()='Insights']/div/*[text()='Beta']");
	public header_betaText(headerName: string): Locator {
	  return this.getLocatorWithParam("//div[text()='%s']/following-sibling:: div//*[text()='Beta']", headerName);
	}



	constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {



	  super(browser, pageHandler, logger, portalIndex);



	}

	public clickContentCoverageTab(): CuratorInsightsPage {
		this.locateButtonText("Content Coverage").click();
		this.pause(3000);
		return this;
	}

	public clickSubscriptionsTab(): CuratorInsightsPage {
		this.locateButtonText("Subscriptions").click();
		return this;
	}

	public clickSkillTab(): CuratorInsightsPage {
		this.locateButtonText("Skills").click();
		return this;
	}

	public clickTopicTab(): CuratorInsightsPage {
		this.locateButtonText("Topics").click();
		return this;
	}
}
