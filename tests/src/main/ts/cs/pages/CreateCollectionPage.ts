import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { AriaRole, Browser, CheckOptions, ClickOptions, Locator, MouseButton, Page, WaitForSelectorOptions } from "common/testing/playwright";
import { GlobalNavigationPage } from "cs/pages/GlobalNavigationPage";
import { ResultContainer } from "models/ResultContainer";

export class CreateCollectionPage extends GlobalNavigationPage {

	public newCollectionButton: Locator = this.page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("New collection"));
	public nameElement: Locator = this.page.getByPlaceholder("Enter name");
	public descriptionElement: Locator = this.page.getByPlaceholder("Enter description");
	public languageDropdownElement: Locator = this.page.locator("label[for='language']+div div#mui-dropdown~svg");
	public languageOption: Locator = this.page.locator("//span[text()='suomi (Suomi)']");
	public submitButton: Locator = this.page.locator("css=form button[type='submit']");
	public messageElement(message: string): Locator {
	  return this.getLocatorWithParam("p:has-text('%s')", message);
	}
	public buttonText(message: string): Locator {
	  return this.getLocatorWithParam("button:has-text('%s')", message);
	}
	public addContent: Locator = this.page.getByText("Add content");
	public contentSourceArrow: Locator = this.page.locator("div#content-source>svg");
	public contentSearch: Locator = this.page.locator("input#collectionSearchBox,input#search-box");
	public contentSourceOption(message: string): Locator {
	  return this.getLocatorWithParam("li:has-text('%s')", message);
	}
	public contentSearchIcon: Locator = this.page.locator("input#collectionSearchBox+svg,input#search-box+svg");
	public courseSelection(message: string): Locator {
	  return this.getLocatorWithParam("(//p[text()='%s']/ancestor:: div[@class='group relative  cursor-pointer']//input[@type='checkbox'])[1]", message);
	}
	public collectionReviewerArrow: Locator = this.page.locator("p#alert-dialog-description div#mui-dropdown~svg");
	public collectionReviewerNameInput: Locator = this.page.locator("input#dropdownSearch");
	public selectReviewer(reviewerName: string): Locator {
	  return this.getLocatorWithParam("span:has-text('%s')", reviewerName);
	}
	public validateReviewer(reviewerName: string): Locator {
	  return this.getLocatorWithParam("//span[text()='Collection sent for review to']/span[text()='%s']", reviewerName);
	}
	public collectionVerticalDot: Locator = this.page.locator("div#banner button#customized-button");
	public collectionSearch: Locator = this.page.locator("css=input#collectionSearchBox");
	public addComment: Locator = this.page.getByPlaceholder("Add a comment");
	public collectionComment(message: string): Locator {
	  return this.getLocatorWithParam("//div[@id='COLLECTION_COMMENTS']//div[text()=('%s')]", message);
	}
	public contentCard: Locator = this.page.locator("css=div[class='group relative cursor-pointer'],div[class='group relative  cursor-pointer']");
	public collectionDuration: Locator = this.page.locator("xpath=//div[text()='DURATION']/following-sibling:: div/span");
	public buttonTextEquals(message: string): Locator {
	  return this.getLocatorWithParam("xpath=//button[text()=('%s')]", message);
	}
	public contentcard: Locator = this.page.locator("css=div#simple-tabpanel-0 div[data-cy='CollectionCard']");
	public objectiveDDNArrow: Locator = this.page.locator("css=[placeholder='Objectives']+svg");
	public objectCheckBox(objectiveName: string): Locator {
	  return this.getLocatorWithParam("//span[text()='%s']/ancestor:: li//input[@type='checkbox']", objectiveName);
	}
	public addCourseFilterDownArrow(filterName: string): Locator {
	  return this.getLocatorWithParam("[placeholder='%s']+svg", filterName);
	}
	public filterOptions: Locator = this.page.locator("li[role='option']>div>span");
	public contentCardlanguage: Locator = this.page.locator("div.flex.h-4.items-center.gap-1>span#metadata-info>span");
	public contentCardDuration: Locator = this.page.locator("div.flex.flex-col.gap-1>span#metadata-info>span,div.flex.flex-col.gap-1 span#metadata-info>span");
	public allfilterValue(skillName: string): Locator {
	  return this.getLocatorWithParam("xpath=//div[@data-testid='sentinelStart']/following-sibling::div//span[text()='%s']", skillName);
	}
	public bannerPublishedAsMessage(publishType: string, lmsName: string): Locator {
	  return this.getLocatorWithParam("xpath=//div[text()='Published as']/following-sibling::div//span[text()='%s']/parent::a/following-sibling:: *[text()='on %s']", publishType,lmsName);
	}
	public bannerPublisherName(publisherName: string): Locator {
	  return this.getLocatorWithParam("xpath=//div[text()='Publisher']/following-sibling::div[text()='%s']", publisherName);
	}
	public buttonAddContent_AI: Locator = this.page.locator("xpath=//button[text()=' Add content with AI']/div/span[text()='Beta']");
	public collectionName_AI: Locator = this.page.locator("//input[@id='name']/following-sibling::button");
	public collectionDescription_AI: Locator = this.page.locator("//textarea[@id='description']/following-sibling::button");
	public searchArrow_AI: Locator = this.page.locator("//input[@name='chat']/following-sibling::div/*");
	public searchInput_AI: Locator = this.page.getByPlaceholder("Tell me about your collection");
	public searchSuggestion_AI(index: string): Locator {
	  return this.getLocatorWithParam("(//span[contains(@class,'text-size-body-sm max-w-[20.5rem]')])[%s]", index);
	}
	public card_VertialDot: Locator = this.page.locator("button#customized-button");
	public Locator collectionfilter(String filterName) { return this.getLocatorWithParam("xpath=//span[text()='Status']", filterName); } //span[text()='%1$s']/ancestor:: label/following-sibling::div//*[@class='relative right-2']|
	public Locator collecionFilter_CheckBox(String filterValue) { return this.getLocatorWithParam("xpath=//li[@data-value='%s']//input", filterValue); }


	constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {


	  super(browser, pageHandler, logger, portalIndex);


	}

//	public CreateCollectionPage createCollection() throws InterruptedException {
//		newCollectionbutton.click(new Locator.ClickOptions().setTimeout(60000));
//		this.page.getByPlaceholder("Enter name").fill("Demo_Play", new Locator.FillOptions().setTimeout(30000));
//		this.page.getByPlaceholder("Enter description").fill("Demo_Play_Des", new Locator.FillOptions().setTimeout(30000));
//		this.page.locator("css=label[for=\"language\"]+div div#mui-dropdown~svg").click();
//		this.page.locator("xpath=//span[text()='suomi (Suomi)']").click();
//		this.page.locator("css=form button[type='submit']").click();
//		this.page.locator("p:has-text(\"Add content to your collection\")").waitFor(new Locator.WaitForOptions().setTimeout(60000));
//		return this;
//	}

	public createCollection(name: string, description: string, language: string): CreateCollectionPage {
		this.pause(30000);
		language=language!=null?language:"US";
		this.clickNewCollectionButton().enterCollectionName(name).enterCollectionDescription(description)
		.submitCollection();
		this.pause(30000);
		return this;
	}

	public enterCollectionName(name: string): CreateCollectionPage {
		nameElement.clear();
		nameElement.fill(name);
		return this;
	}

	public enterCollectionDescription(description: string): CreateCollectionPage {
		descriptionElement.fill(description);
		return this;
	}

	public selectCollectionLanguage(language: string): CreateCollectionPage {
		languageDropdownElement.click();
		this.messageElement(language).click();
		return this;
	}

	public submitCollection(): CreateCollectionPage {
		submitButton.click();
		return this;
	}

	public ClickAddcontent(): CreateCollectionPage {
		this.locateButtonText("Add content").click();
		return this;
	}

	public clickNewCollectionButton(): CreateCollectionPage {
		newCollectionButton.click();
		return this;
	}

	public Addcontent(courseToAdd: string[][]): CreateCollectionPage {

		for (const course of courseToAdd) {
			contentSourceArrow.click();
			this.pause(2000);
			this.contentSourceOption(course[0]).first().click();
			this.pause(1000);
			contentSearch.clear();
			contentSearch.fill("\""+course[1] +"\"");
			contentSearchIcon.click();
			this.pause(1000);
			this.courseSelection(course[1]).click(new ClickOptions().setTimeout(40000));
		}
		return this;
	}

	public clickReviewCollection(): CreateCollectionPage {
		this.pause(5000);
		this.page.keyboard().press("PageDown");
		this.buttonText("Review selected content").scrollIntoViewIfNeeded();
		this.pause(2000);
		this.buttonText("Review selected content").hover();
		this.buttonText("Review selected content").click();
		return this;
	}

	public clickAddContentToCollection(): CreateCollectionPage {
		this.pause(5000);
		this.buttonText("Add content to collection").click();
		return this;
	}

	public clickSendCollectionForReview(): CreateCollectionPage {
		this.page.evaluate("window.scrollBy(0, 500)");
		this.page.evaluate("window.scrollBy(0, -1000)");
		this.buttonText("Send collection for review").click();
		this.pause(2000);
		return this;
	}

	public clickCollectionReviewDownArr(): CreateCollectionPage {
		collectionReviewerArrow.click();
		return this;
	}

	public inputReviewerName(name: string): CreateCollectionPage {
		collectionReviewerNameInput.fill(name);
		return this;
	}

	public selectCollectionReviewer(name: string): CreateCollectionPage {
		this.selectReviewer(name).click();
		return this;
	}

	public clickSendReview(): CreateCollectionPage {
		this.buttonText("Send").last().click();
		return this;
	}

	public clickCollectionOption(Option: string): CreateCollectionPage {
		this.contentSourceOption(Option).click();
		return this;
	}

	public clickCollectionOptionVerticalDot(): CreateCollectionPage {
		this.page.evaluate("window.scrollBy(0, 500)");
		this.page.evaluate("window.scrollBy(0, -1000)");
		collectionVerticalDot.click();
		return this;
	}

	public clickManageContent(): CreateCollectionPage {
		this.pause(2000);
		this.buttonText("Manage content").click();
		return this;
	}

	public clickMangeOption(Option: string): CreateCollectionPage {
		this.contentSourceOption(Option).click();
		return this;
	}

	public selectcourse(course: string): CreateCollectionPage {
		this.courseSelection(course).check(new CheckOptions().setTimeout(40000));
		this.pause(3000);
		return this;
	}

	public clickReveiw(): CreateCollectionPage {
		this.page.keyboard().press("Enter");
		return this;
	}


	public searchCollection(collection: string): CreateCollectionPage {
		contentSearch.clear();
		contentSearch.fill(collection);
		return this;
	  }


	public pressKey(Key: string): CreateCollectionPage {
		this.page.keyboard().press(Key);
		return this;
	}

	public fillCollectionSearch(collectionName: string): CreateCollectionPage {
		collectionSearch.fill(collectionName);
		return this;
	}

	public openCollection(collectionName: string): CreateCollectionPage {
		this.messageElement(collectionName).first().click();
		return this;
	}

	public clickDeleteSelected(): CreateCollectionPage {
		this.buttonText("Delete selected").click();
		return this;
	}

	public clickBackToList(): CreateCollectionPage {
		this.buttonText("Back to content listt").click();
		return this;
	}

	public clickYes(): CreateCollectionPage {
		this.buttonText("Yes, delete").click();
		return this;
	}

	public clickNo(): CreateCollectionPage {
		this.buttonText("No, cancel").click();
		return this;
	}

	public fillComment(comment: string): CreateCollectionPage {
		this.pause(3000);
		addComment.scrollIntoViewIfNeeded();
		addComment.click();
		addComment.fill(comment);
		return this;
	}

	public clickCommentAdd(): CreateCollectionPage {

		this.pause(2000);
		this.buttonText("ADD").click();
		this.pause(5000);
		return this;
	}

	public waitForContentCardLoad(): CreateCollectionPage {
		this.pause(5000);
		this.page.waitForSelector("div#simple-tabpanel-0 div[data-cy='CollectionCard'],div#simple-tabpanel-0 div[data-cy='CourseCard']",new Page.WaitForSelectorOptions().setTimeout(60000));
		return this;
	}

	public waitForTime(time: number): CreateCollectionPage {
		this.pause(time);
		return this;

	}

	public clickChangeCollectionReviewer(): CreateCollectionPage {
		this.buttonText("Change reviewer").click();
		return this;
	}

	public clickPendingReview(): CreateCollectionPage {
		this.buttonText("Pending reviews").click();
		return this;
	}

	public clickPublish(): CreateCollectionPage {
		this.buttonText("Publish").click();
		return this;
	}

	public clickPublishnow(): CreateCollectionPage {
		this.buttonText("Publish now").first().click();
		return this;
	}

	public clickContinueExploring(): CreateCollectionPage {
		this.buttonText("Continue exploring").click();
		return this;
	}

	public clickViewInPlatForm(): CreateCollectionPage {
		this.pause(3000);
		this.buttonText("View in platform").click();
		return this;
	}

	public dragAndDrop(): CreateCollectionPage {
		this.pause(3000);
		// Way2
		this.page.locator("tbody>tr:nth-child(3)>td:nth-child(2)").hover();
		this.page.mouse().down();
		this.page.locator("css=tbody").hover();
		this.page.mouse().up();
		return this;
	}

	public clickObjectiveArrow(): CreateCollectionPage {
		objectiveDDNArrow.click();
		this.pause(2000);
		return this;
	}

	public selectObjeciveByName(name: string): CreateCollectionPage {
		this.objectCheckBox(name).click();
		this.pause(2000);
		this.page.mouse().move(400, 225);
		this.page.mouse().click(600, 225);
		return this;
	}

	public closeDialog(): CreateCollectionPage {
		this.pause(2000);
		this.page.mouse().move(400, 225);
		this.page.mouse().click(600, 225);
		return this;
	}

	public clickContentSourceDownArrow(): CreateCollectionPage {
		contentSourceArrow.click();
		this.pause(2000);
		return this;
	}

	public selectContentSource(sourceName: string): CreateCollectionPage {
		this.contentSourceOption(sourceName).first().click();
		this.pause(2000);
		return this;
	}

	public searchContent(contentName: string): CreateCollectionPage {
		contentSearch.clear();
		contentSearch.fill("\""+contentName +"\"");
		contentSearchIcon.click();
		return this;
	}

	public getYourSubsciption(textCon: Array<string>): CreateCollectionPage {
		textCon.addAll(this.page.locator("div[data-cy='subscription-card']>div>p").allTextContents());
		return this;

	}

	public clickfilterArrow(filterName: string): CreateCollectionPage {
		this.addCourseFilterDownArrow(filterName).click();
		return this;

	}

	public goToLastPage(): CreateCollectionPage {
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

	public closeQuickViewDialog(name: string): CreateCollectionPage {
		this.page.bringToFront();
		this.clickCloseQuickViewDialog(name,CreateCollectionPage);
		return this;
	}

	public getConentCardLanguageValue(testvalue: Array<string>): CreateCollectionPage {
		this.pause(5000);
		testvalue = this.page.locator("div.flex.h-4.items-center.gap-1>span#metadata-info>span").allInnerTexts();
		return this;
	}

	public getConentCardDurationValue(testvalue: Array<string>): CreateCollectionPage {
		this.pause(5000);
		testvalue = this.page.locator("div.flex.flex-col.gap-1>span#metadata-info>span,div.flex.flex-col.gap-1 span#metadata-info>span").first().allInnerTexts();
		return this;
	}

	public clickCollection(): CreateCollectionPage {
		this.page.locator("//div[@data-cy='CollectionCard']").first().click(new ClickOptions().setTimeout(5000));
		return this;
	}

	public clickCollectionNameAI(): CreateCollectionPage {
		collectionName_AI.click();
		this.pause(2000);
		return this;
	}

	public clickCollectionDesAI(): CreateCollectionPage {
		collectionDescription_AI.click();
		this.pause(2000);
		return this;
	}

	public fillSearchTextAI(text: string): CreateCollectionPage {
		searchInput_AI.fill(text);
		this.pause(2000);
		return this;
	}

	public clickSearchArrowAI(): CreateCollectionPage {
		searchArrow_AI.click();
		this.pause(10000);
		return this;
	}

	public hoverandSelectFirst(text: ResultContainer, flag: boolean, index: string): CreateCollectionPage {
		this.searchSuggestion_AI(index).first().hover();
		this.pause(2000);
		if(flag) {
			System.out.println(searchSuggestion_AI(index).first().textContent());
			text.setValue(searchSuggestion_AI(index).first().textContent());
		}

		this.searchSuggestion_AI(index).first().click();
		this.pause(2000);
		return this;
	}

	public deleteCollection(path: string[]): CreateCollectionPage {
		for(int i=0;i<30;i++) {
			this.navigateToPageByPath(path, CreateCollectionPage)
			.clickCollection()
			.clickCollectionOptionVerticalDot()
			.clickCollectionOption("Delete collection")
			.clickYes()
			.waitForTime(2000);
			System.out.println("Deleted Collection"+i);
		}
		return this;
	}

	public clickCornerstoneCurationTab(): CreateCollectionPage {
		this.buttonText("Cornerstone Curated").click();
		this.pause(1000);
		return this;
	}

	public clickAllCollectionsTab(): CreateCollectionPage {
		this.buttonText("All Collections").click();
		this.pause(1000);
		return this;
	}

	public clickCardVertialDot(): CreateCollectionPage {
		this.pause(2000);
		card_VertialDot.first().click();
		this.pause(1000);
		return this;
	}

	/*public CreateCollectionPage clickCollectionOption(String option) {
		locate_LI_TagByText(option).click();
		return this;
	} */

	public clickContinue(): CreateCollectionPage {
		this.buttonText("Continue").click();
		this.pause(2000);
		return this;
	}

	public clickBack(): CreateCollectionPage {
		this.buttonText("Back").click();
		this.pause(2000);
		return this;
	}

	public clickCollectionFilterArrow(name: string): CreateCollectionPage {
		this.pause(2000);
		this.collectionfilter(name).click();
		return this;
	}

	public clickCollectionFilterValueCheckbox(name: string): CreateCollectionPage {
		this.collecionFilter_CheckBox(name).check();
		return this;
	}

	public clickSelectedContent(): CreateCollectionPage {
		this.pause(2000);
		this.page.locator("//button[contains(text(),'Selected content')]").click();
		return this;
	}

	public clickSearchContent(): CreateCollectionPage {
		this.pause(2000);
		this.page.locator("//button[contains(text(),'Search content')]").click();
		return this;
	}

	public openPublishedCollection(collectionName: string): CreateCollectionPage {
		let locatorString: string = String.format("//span[text()='PUBLISHED']/ancestor::div[@data-cy=\"CollectionCard\"]//p[text()='%s']",collectionName);
		this.page.locator(locatorString).first().click();
		return this;
	}
}
