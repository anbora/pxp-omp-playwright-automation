import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, ElementHandle, LoadState, Locator, MouseButton, Page } from "common/testing/playwright";
import { GlobalNavigationPage } from "cs/pages/GlobalNavigationPage";
import { ResultContainer } from "models/ResultContainer";

export class SubscriptionPage extends GlobalNavigationPage{

	public Locator availableSubscritpion= this.page.locator("div>p[class$=semibold]");
	public subscriptionCard(subscriptionName: string): Locator {
	  return this.getLocatorWithParam("//p[text()='%s']//ancestor::div[1]", subscriptionName);
	}
	public subscriptionSearchbox: Locator = this.page.locator("#search-box");
	public qvCourseButton(courseName: string): Locator {
	  return this.getLocatorWithParam("//p[text()='%s']//ancestor::div[3]/div[@class='relative']|//span[text()='%s']//ancestor::div[3]/div[@class='relative']|//p[text()='%s']//ancestor::div[@data-cy='CourseCard']/div/div[not(@class)]", courseName,courseName,courseName);
	}
	public locateButtonText(buttonText: string): Locator {
	  return this.getLocatorWithParam("//button[text()='%s']", buttonText);
	}
	public locateSpanText(spanText: string): Locator {
	  return this.getLocatorWithParam("//span[text()='%s']", spanText);
	}
	public readMore: Locator = this.page.locator("//div[text()='Read more']");
	public contentPartnerCard(contentPartner: string): Locator {
	  return this.getLocatorWithParam("//p[text()='%s']/ancestor:: div[@data-cy='content-partner-card']", contentPartner);
	}
	public filterCategory(category: string): Locator {
	  return this.getLocatorWithParam("//div[@class='relative h-screen overflow-hidden p-8']//span[text()='%s']", category);
	}
	public clearfilterValue(filtervalue: string): Locator {
	  return this.getLocatorWithParam("//span[text()='%s']/following-sibling:: *[@data-testid='ClearIcon']", filtervalue);
	}
	public applyFilterButton: Locator = this.page.locator("//button[text()='Apply filters']");
	public filterValueCheckBox(filterValue: string): Locator {
	  return this.getLocatorWithParam("//span[text()='%s']//ancestor::div[1]//input", filterValue);
	}
	public filterSearchBox: Locator = this.page.locator("//div//input[@placeholder='Search']");
	public verifyAppliedFilter(filterName: string, filterValue: string): Locator {
	  return this.getLocatorWithParam("//span[text()='%s']/following-sibling::span//span[text()='%s']", filterName,filterValue);
	}
	//public Locator sortByDownArrow= this.page.locator("//span[text()='Sort']/following-sibling:: span[text()='By newest']/following-sibling:: span");
	//public Locator sortingOption(String sortingOption) { return this.getLocatorWithParam("//ul[@role='menu']/li[text()='%s']", sortingOption); }


	constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {


	  super(browser, pageHandler, logger, portalIndex);


	}

	public selectSubscription(subscriptionName: string): SubscriptionPage {
		this.subscriptionCard(subscriptionName).click();
		return this;
	}

	public searchSubscription(subscriptionName: string): SubscriptionPage {
		subscriptionSearchbox.fill(subscriptionName);
		subscriptionSearchbox.press("Enter");
		return this;
	}

	public searchCourse(courseName: string): SubscriptionPage {
		subscriptionSearchbox.fill(courseName);
		subscriptionSearchbox.press("Enter");
		return this;
	}

	public clickQuickView(courseName: string): SubscriptionPage {
		this.qvCourseButton(courseName).hover();
		//qvCourseButton(courseName).click();
		this.page.locator("//button[text()='Quick view']").first().click();
		this.pause(3000);
		return this;
	}

	public clickGoToDetails(): SubscriptionPage {
		//locateButtonText("Go to detail this.page").click();
		//this.page.waitForLoadState(LoadState.DOMCONTENTLOADED);
		this.locateButtonText("Go to detail this.page").scrollIntoViewIfNeeded();
		return this.openPageInNewTab(locateButtonText("Go to detail this.page"),SubscriptionPage);

	}

	public clickLaunchCourse(): SubscriptionPage {
		this.locateButtonText("Launch course").click();
		return this;
	}

	public clickReadMore(): SubscriptionPage {
		readMore.click();
		return this;
	}

	public clickContentPartnersTab(): SubscriptionPage {
		this.locateButtonText("Content Partners").click();
		return this;
	}

	public clickCornerstoneCuratedTab(): SubscriptionPage {
		this.locateButtonText("Cornerstone Curated").click();
		return this;
	}

	public searchContentPartners(ContentPartners: string): SubscriptionPage {
		subscriptionSearchbox.fill(ContentPartners);
		subscriptionSearchbox.press("Enter");
		this.pause(2000);
		return this;
	}

	public clickContentPartnersCard(ContentPartners: string): SubscriptionPage {
		this.contentPartnerCard(ContentPartners).click();
		return this;
	}

	public applySubscriptionFilter(filters: HashMap<string, Array<string>>): SubscriptionPage {
		this.locateSpanText("All filters").click();

		for(Entry<String, List<String>> filterentry: filters.entrySet()) {

			this.filterCategory(filterentry.getKey().toString()).click();

			for (const filterValue of filterentry.getValue()) {
           if(Body|Proficiency|languageType"): filterentry.getKey().matches("Categories|Modalities|Accreditation):  {

           if(filterValueCheckBox(filterValue).isVisible(): ):  {
            			this.filterValueCheckBox(filterValue).scrollIntoViewIfNeeded();
                		this.filterValueCheckBox(filterValue).click();
            		}
            		else {
           if(filterentry.getKey().equals("Categories"): ):  {
                   			this.filterValueCheckBox("Business").hover();
                			this.page.mouse().wheel(0, 200);
            			}

            			filterValueCheckBox(filterValue).click();
            		}

            		}
            	else {

            		filterSearchBox.clear();
            		filterSearchBox.fill(filterValue);
            		filterValueCheckBox(filterValue).scrollIntoViewIfNeeded();
            		filterValueCheckBox(filterValue).click();

            	}

            	}
			filterCategory(filterentry.getKey().toString()).click();
			this.pause(2000);
            }
		this.pause(5000);
		return this;
	}

	public clickApplyFilterButton(): SubscriptionPage {
		applyFilterButton.click();
		return this;
	}

	public clickclearFilterIcon(filterValue: string): SubscriptionPage {
		this.clearfilterValue(filterValue).click();
		return this;
	}

	public clickSortingDownArrow(): SubscriptionPage {
		sortByDownArrow.first().click();
		return this;
	}

	public selectSortingOption(option: string): SubscriptionPage {
		this.sortingOption(option).click();
		return this;
	}

	public getCourseCount(option: ResultContainer): SubscriptionPage {
		this.page.waitForSelector("div[data-cy='CourseCard']",new Page.WaitForSelectorOptions().setTimeout(60000));
		option.setValue(this.page.locator("div[aria-label='subscription tabs']>button[aria-selected='true']").innerText());
		this.logger.info("Expected Course Count : "+option.getValue());
		return this;
	}

}
