// @ts-nocheck
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, CheckOptions, ClickOptions, Locator, MouseButton, Page, WaitForSelectorOptions } from "common/testing/playwright";
import { GlobalNavigationPage } from "cs/pages/GlobalNavigationPage";
import { ResultContainer } from "models/ResultContainer";

export class IndustryInsightsPage extends GlobalNavigationPage {

	public locateTextSelfDirectedInSection(sectionName: string): Locator {

	  return this.getLocatorWithParam("//p[text()='%s']/ancestor:: div[@class='flex gap-5']/../following-sibling::div//*[text()='For self-directed learning']", sectionName);

	}
	public locateTextAssignedLearningInSection(sectionName: string): Locator {
	  return this.getLocatorWithParam("//p[text()='%s']/ancestor:: div[@class='flex gap-5']/..//following-sibling::div//*[text()='For assigned learning']", sectionName);
	}
	//public Locator count= this.page.locator("xpath=//p[text()='Top 10 courses in your region']/ancestor:: div[@class='flex gap-5']/following-sibling::div//*[text()='For self-directed learning']/../following-sibling::div[@class='MuiTableContainer-root css-kge0eu']//tbody/tr");
	public countSelfDirectedData(sectionName: string): Locator {
	  return this.getLocatorWithParam("//p[text()='%s']/ancestor:: div[@class='flex gap-5']/../following-sibling::div//*[text()='For self-directed learning']/../following-sibling::div[@class='MuiTableContainer-root css-kge0eu']//tbody/tr", sectionName);
	}
	public countAssignedLearningData(sectionName: string): Locator {
	  return this.getLocatorWithParam("//p[text()='%s']/ancestor:: div[@class='flex gap-5']/../following-sibling::div//*[text()='For assigned learning']/../following-sibling::div[@class='MuiTableContainer-root css-kge0eu']//tbody/tr", sectionName);
	}
	public locateTopTenCourses(courseName: string): Locator {
	  return this.getLocatorWithParam("//p[text()='Top 10 courses in your market segment']/ancestor:: div[@class='flex gap-5']/../following-sibling::div//*[text()='For assigned learning']/../following-sibling::div[@class='MuiTableContainer-root css-kge0eu']//tbody/tr//span[@aria-label='%s']", courseName);
	}
	public regionTimeFrameArrow(time: string): Locator {
	  return this.getLocatorWithParam("//div[text()='Last %s months']/following-sibling:: *[@class='relative right-2']", time);
	}
	public locateTimeFrame(time: string): Locator {
	  return this.getLocatorWithParam("//span[text()='Last %s months']/ancestor:: li", time);
	}
	public learningCultureArrow: Locator = this.page.locator("//span[text()='Learning culture']/following-sibling:: span[text()='All']/following-sibling::*[@data-testid='KeyboardArrowDownIcon']");
	public locateAssignedLearningTopTenCourses(sectionName: string, courseName: string): Locator {
	  return this.getLocatorWithParam("//p[text()='%s']/ancestor:: div[@class='flex gap-5']/../following-sibling::div//*[text()='For assigned learning']/../following-sibling::div[@class='MuiTableContainer-root css-kge0eu']//tbody/tr//span[@aria-label='%s']", sectionName,courseName);
	}

	constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

	  super(browser, pageHandler, logger, portalIndex);

	}

	public clickMarketSegmentTab(): IndustryInsightsPage {
		this.pause(1000);
		this.locateButtonText("Market segment").click();
		this.pause(3000);
		return this;
	}

	public clickVerticalTab(): IndustryInsightsPage {
		this.pause(1000);
		this.locateButtonText("Vertical").click();
		this.pause(2000);
		return this;
	}

	public clickRegionTab(): IndustryInsightsPage {
		this.pause(1000);
		this.locateButtonText("Region").click();
		this.pause(2000);
		return this;
	}

	public clickRegionTimeFramArrow(time: string): IndustryInsightsPage {
		this.regionTimeFrameArrow(time).click();
		return this;
	}

	public selectTimeFrame(time: string): IndustryInsightsPage {
		this.locateTimeFrame(time).click();
		this.pause(1000);
		return this;
	}

	public clickLearningCultureArrow(): IndustryInsightsPage {
		learningCultureArrow.click();
		this.pause(1000);
		return this;
	}

	public selectLearningCulture(cultureName: string): IndustryInsightsPage {
		this.locate_LI_TagByText(cultureName).click();
		this.pause(5000);
		return this;
	}

	public clickTopTenCourse(courseName: string): IndustryInsightsPage {
		this.pause(5000);
		//this.page.locator("//p[text()='Top 10 courses in your market segment']/ancestor:: div[@class='flex gap-5']/../following-sibling::div//*[text()='For assigned learning']/../following-sibling::div[@class='MuiTableContainer-root css-kge0eu']//tbody/tr//span[@aria-label='Microsoft 365 OneDrive - Beginner']").scrollIntoViewIfNeeded();
		//this.page.locator("").click();
		this.locateTopTenCourses(courseName).click(); //Microsoft 365 OneDrive - Beginner
		this.pause(1000);
		return this;
	}

	public clickAssignedLearningTopTenCourse(sectionName: string, courseName: string): IndustryInsightsPage {
		this.pause(5000);
		//this.page.locator("//p[text()='Top 10 courses in your market segment']/ancestor:: div[@class='flex gap-5']/../following-sibling::div//*[text()='For assigned learning']/../following-sibling::div[@class='MuiTableContainer-root css-kge0eu']//tbody/tr//span[@aria-label='Microsoft 365 OneDrive - Beginner']").scrollIntoViewIfNeeded();
		//this.page.locator("").click();
		this.locateAssignedLearningTopTenCourses(sectionName,courseName).click(); //Microsoft 365 OneDrive - Beginner
		this.pause(1000);
		return this;
	}




}
