// @ts-nocheck
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";
import { GlobalNavigationPage } from "cs/pages/GlobalNavigationPage";

export class LMSPage extends GlobalNavigationPage{

	public verifyPlaylistName(name: string): Locator {

	  return this.getLocatorWithParam("xpath=//h1[text()='%s']", name);

	}

	constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

	  super(browser, pageHandler, logger, portalIndex);

	}

	public waitForTime(i: number): LMSPage {
		// TODO Auto-generated method stub
		this.pause(i);
		return this;
	}

}
