import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";
import { GlobalNavigationPage } from "cs/pages/GlobalNavigationPage";

export class OrganizationInsightsPage extends GlobalNavigationPage{

	public Locator contentSourceDropdown= this.page.locator("//div[@id='content-source']/span[text()='All content']/following-sibling::*[@data-testid='KeyboardArrowDownIcon']");

	constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {
		super(this.browser, this.pageHandler, this.logger, this.portalIndex);
		// TODO Auto-generated constructor stub
	}

	public clickLearningCultureTab(): OrganizationInsightsPage {
		this.pause(3000);
		this.locateButtonText("Learning culture").click();
		this.pause(2000);
		return this;
	}

	public clickObjectivesTab(): OrganizationInsightsPage {
		this.pause(3000);
		this.locateButtonText("Objectives").click();
		this.pause(2000);
		return this;
	}

	public clickContentSourceDownArrow(): OrganizationInsightsPage {
		contentSourceDropdown.click();
		this.pause(1000);
		return this;
	}
}
