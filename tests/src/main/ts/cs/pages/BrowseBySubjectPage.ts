import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator, Page } from "common/testing/playwright";
import { GlobalNavigationPage } from "cs/pages/GlobalNavigationPage";
import { ResultContainer } from "models/ResultContainer";

export class BrowseBySubjectPage extends GlobalNavigationPage {

	public complianceEmploymentLaw: Locator = this.page.locator("span:has-text('Compliance employment law')");
	public globalSearchBox: Locator = this.page.locator("css=input#global-search-box");
	public searchIcon: Locator = this.page.locator("css=input#global-search-box+svg");
	public quick_Course_Presentation_Opened: Locator = this.page.locator("//div[contains(@class,'MuiPaper-root MuiPaper-elevation MuiPaper-elevation')]");
	public qv_Course_button_LOC(courseName: string): Locator {
	  return this.getLocatorWithParam("//p[text()='%s']//ancestor::div[3]/div|//span[text()='%s']//ancestor::div[3]/div[@class='relative']", courseName,courseName,courseName);
	}
	public QV_COURSE_TITLE_VERIFICATION(courseName: string): Locator {
	  return this.getLocatorWithParam("//span[text()='%s']|//div[text()='%s']", courseName,courseName);
	}
	public browseSubjectDownArrow: Locator = this.page.locator("css=svg[data-testid='KeyboardArrowDownIcon']");
	public select_Subject(subject: string): Locator {
	  return this.getLocatorWithParam("//span[text()='%s']/parent:: span/following-sibling:: span", subject);
	}
	public Locator select_Topic (String topic) { return this.getLocatorWithParam("//span[text()='%s']/parent ::span//input", topic); }
	public select_Topic_Checked(topic: string): Locator {
	  return this.getLocatorWithParam("//*[text()='%s']/parent :: span/span[contains(@class,'checked')]", topic);
	}
	public ExpandTopic(topic: string): Locator {
	  return this.getLocatorWithParam("//span[text()='%s']", topic);
	}
	public gsFilterCount(topic: string, topicCount: string): Locator {
	  return this.getLocatorWithParam("//span[text()='%s']//ancestor::div[1]//span[text()='%s']", topic,topicCount);
	}
	public browseSubjectButton(buttonText: string): Locator {
	  return this.getLocatorWithParam("//button[text()='%s']", buttonText);
	}
	public selectTopic_Unchecked(topic: string): Locator {
	  return this.getLocatorWithParam("//*[text()='%s']/parent :: span/span[not(contains(@class,'checked'))][1]", topic);
	}
	public verifyAppliedFilter(filterName: string, filterValue: string): Locator {
	  return this.getLocatorWithParam("//span[text()='%s']/following-sibling::span//span[text()='%s']", filterName,filterValue);
	}
	//public Locator yourLearnerText= this.page.locator("(//p[text()='Your Learners']/following-sibling::p//span | //p[text()='Your Learners']/following-sibling:: p)[1]");
    //public Locator totalLernerText= this.page.locator("(//p[text()='Total Learners']/following-sibling::p//span | //p[text()='Total Learners']/following-sibling:: p)[1]");

	constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

	  super(browser, pageHandler, logger, portalIndex);

	}

	public fillGlobalSearchBox(searchText: string): BrowseBySubjectPage {
		this.pause(5000);
		if(searchText.equals("")) {

			globalSearchBox.fill(searchText);
		}

		else {
			globalSearchBox.fill("\""+searchText+"\"");

		}
		this.logger.info("Typed in global searchBox");
		return this;
	}

	public clickSearch(): BrowseBySubjectPage {
		this.pause(3000);
		this.page.keyboard().press("Enter");
		this.pause(3000);
		return this;
	}

	public selectSubject(subject: string): BrowseBySubjectPage {
		this.select_Subject(subject).click();
		this.logger.info("Selected subject "+subject);
		return this;
	}

	public selectTopic(topic: string): BrowseBySubjectPage {
		this.select_Topic(topic).click();
		this.pause(3000);
		this.logger.info("Selected topic"+topic);
		return this;
	}


	public clickBrowse(): BrowseBySubjectPage {
		this.browseSubjectButton("Browse").click();
		this.pause(5000);
		this.logger.info("Clicked on browse button");
		return this;
	}

	public clickClearall(): BrowseBySubjectPage {
		this.browseSubjectButton("Clear all").click();
		return this;
	}

	public clickDownArrow(): BrowseBySubjectPage {
		browseSubjectDownArrow.click(new Locator.ClickOptions().setTimeout(60000));
		this.logger.info("Clicked on Global down arrow");
		return this;
	}

	public actionsOnSubscriptionDetailsPage(actionName: string, CourseTitle: string): BrowseBySubjectPage {
		if(actionName.equals("Quick View")) {
			this.qv_Course_button_LOC(CourseTitle).first().hover();
			this.page.locator("//button[text()='Quick view']").first().click();
			this.pause(5000);

		}
		return this;
	}

	public clickTopicArrow(topic: string): BrowseBySubjectPage {
		this.ExpandTopic(topic).click();
		this.pause(1000);
		this.logger.info("Clicked on Topic Arrow");
		return this;
	}

	public UnselectTopic(topic: string): BrowseBySubjectPage {
		this.select_Topic(topic).click();
		this.pause(3000);
		this.logger.info("Unselected topic "+topic);
		return this;
	}

	public getDuration(duration: ResultContainer): BrowseBySubjectPage {
		duration.setValue(this.page.locator("//div[@class='pr-1']/following-sibling:: div").innerText());
		//pause(1000);
		return this;
	}

	public getLanguage(language: ResultContainer): BrowseBySubjectPage {
		language.setValue(this.page.locator("//div[@data-testid=\"sentinelStart\"]/following-sibling :: div//div[text()='LANGUAGES']/following-sibling:: div").innerText());
		//pause(1000);
		return this;
	}

	public getSubscription(subscription: ResultContainer): BrowseBySubjectPage {
		let allSubscription: Array<string> = this.page.locator("//div[@data-testid='sentinelStart']/following-sibling :: div//div[@class='p-0.5']|//div[text()='SUBSCRIPTION']/following-sibling :: div//div").allInnerTexts();
		let oneLineSubscription: string = "";
		for(int i=0;i<allSubscription.length;i++) {
			oneLineSubscription+=allSubscription.get(i);
			if(i!=allSubscription.length-1) {
				oneLineSubscription+=", ";
			}
		}
		subscription.setValue(oneLineSubscription);
		this.pause(1000);
		return this;
	}

	public waitForCard(): BrowseBySubjectPage {
		this.pause(1000);
		this.page.locator("div[data-cy='CourseCard']");
		this.logger.info("Content Card loaded");
		return this;
	}

	public getNewBadgeCourse(course: ResultContainer): BrowseBySubjectPage {
		this.pause(1000);
		course.setValue(this.page.locator(" //span[text()='New'] /parent:: div/preceding:: div//span[text()='Subscribed']/ancestor:: div[@data-cy='CourseCard']//p|//span[text()='New']/ancestor:: div[@data-cy='CourseCard']//p").first().textContent());
		this.logger.info("Captured First Content Card name");
		return this;
	}

	public clickGlobalSearchIcon(): BrowseBySubjectPage {
		this.pause(2000);
		searchIcon.click();
		this.logger.info("Global Search Icon is Clicked");
		return this;
	}

	public fillGlobalSearchBoxWithOutQuote(searchText: string): BrowseBySubjectPage {
		this.pause(5000);
		if(searchText.equals("")) {

			globalSearchBox.fill(searchText);
		}

		else {
			globalSearchBox.hover();
			globalSearchBox.click();;
			globalSearchBox.fill(searchText);

		}
		this.logger.info("Typed in global searchBox");
		return this;
	}

}
