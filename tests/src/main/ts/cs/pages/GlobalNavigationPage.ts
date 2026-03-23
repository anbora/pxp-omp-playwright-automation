import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator, Page } from "common/testing/playwright";
import { CreateCollectionPage } from "cs/pages/CreateCollectionPage";
import { ResultContainer } from "models/ResultContainer";

export abstract class GlobalNavigationPage extends BasePage {

    public csAdminNavigationLink(actionName: string): Locator {

      return this.getLocatorWithParam("//nav//span[text()='%s']|//nav//div[text()='%s']", actionName,actionName);

    }
    public metricYourLearner(count: string): Locator {
      return this.getLocatorWithParam("//p[text()='Your Learners']/following-sibling::p//span[text()='Not subscribed yet']|//p[text()='Your Learners']/following-sibling::p[text()='%s']", count);
    }
	public metricTotalLearner(lernerCount: string): Locator {
	  return this.getLocatorWithParam("//p[text()='Total Learners']/following-sibling::p//span[text()='Not available']|//p[text()='Total Learners']/following-sibling::p[text()='%s']", lernerCount);
	}
    public logOutButton: Locator = this.page.locator("xpath=//button[text()='Log out']");
    public yourLearnerText: Locator = this.page.locator("(//p[text()='Your Learners']/following-sibling::p//span | //p[text()='Your Learners']/following-sibling:: p)[1]");
    public totalLernerText: Locator = this.page.locator("(//p[text()='Total Learners']/following-sibling::p//span | //p[text()='Total Learners']/following-sibling:: p)[1]");
    public clearAllFilter: Locator = this.page.locator("//span[text()='Clear all filters']");
    public Locator sortByDownArrow= this.page.locator("//span[text()='Sort']/following-sibling:: span[text()='By total learners' or text()='By newest']/following-sibling:: span[contains(@class,'MuiButton')]"); // CP-1458 Changed to By total learners
    public sortByDownArrow_BBS(Option: string): Locator {
      return this.getLocatorWithParam("//span[text()='Sort']/following-sibling:: span[text()='%s']/following-sibling:: span[contains(@class,'MuiButton')]", Option);
    }
    public sortingOption(sortingOption: string): Locator {
      return this.getLocatorWithParam("//ul[@role='menu']/li[text()='%s']", sortingOption);
    }
	public qvCourseButton(courseName: string): Locator {
	  return this.getLocatorWithParam("//p[contains(text(),'%s')]//ancestor::div[3]/div[@class='relative']|//span[text()='%s']//ancestor::div[3]/div[@class='relative']|//p[contains(text(),'%s')]//ancestor::div[3]/div", courseName,courseName,courseName);
	}
	public locateButtonText(buttonText: string): Locator {
	  return this.getLocatorWithParam("//button[text()='%s']", buttonText);
	}
	public closeViewObjective: Locator = this.page.locator("button[aria-label='close']>svg>g");
	public Locator closeQuickViewDialog= this.page.locator("button[aria-label='close']>svg"); ////button[@aria-label='close']
	public closelink(course: string): Locator {
	  return this.getLocatorWithParam("//span[contains(text(),'%s')]/ancestor:: div//button[@aria-label='close']", course);
	}
	public modalities(modalities: string): Locator {
	  return this.getLocatorWithParam("//span[text()='MODALITIES']/../div//*[@id='%s']", modalities);
	}
	public duration(duration: string): Locator {
	  return this.getLocatorWithParam("//span[text()='DURATION']/following-sibling:: span[text()='%s']", duration);
	}
	public language(language: string): Locator {
	  return this.getLocatorWithParam("//span[text()='LANGUAGES']/following-sibling:: span[text()='%s']", language);
	}
	public contentPartner(contentPartner: string): Locator {
	  return this.getLocatorWithParam("//div[text()='CONTENT PARTNER']/following-sibling:: div//span[text()='%s']", contentPartner);
	}
	public subscriptions(subscriptions: string): Locator {
	  return this.getLocatorWithParam("//div[text()='SUBSCRIPTIONS']/following-sibling:: div//*[contains(text(),'%s')]", subscriptions);
	}
	public allfilters: Locator = this.page.locator("xpath=//span[text()='All filters']");
	public downarrowByCategory(categoryName: string): Locator {
	  return this.getLocatorWithParam("//span[text()='%s']/following-sibling::*[@data-testid='KeyboardArrowDownIcon']", categoryName);
	}
	public badge_check(badge: string): Locator {
	  return this.getLocatorWithParam("//span[text()='%s']", badge);
	}
	public contentCard: Locator = this.page.locator("div[data-cy='CourseCard']:nth-of-type(1)");
	public locatePTagByText(text: string): Locator {
	  return this.getLocatorWithParam("//p[text()='%s']", text);
	}
	public locate_LI_TagByText(text: string): Locator {
	  return this.getLocatorWithParam("//li[text()='%s']", text);
	}
	public qv_duration_check(course: string): Locator {
	  return this.getLocatorWithParam("//span[text()='%s']/following-sibling::div[@class='mt-2']//div[contains(@class,'ml-auto')]|//span[text()='%s']/parent::div/following-sibling::div[contains(@class,'ml-auto')]", course,course);
	}
	public qv_Get_Provider: Locator = this.page.locator("//div[text()='PROVIDER']/following-sibling:: div|//div[@data-testid='sentinelStart']/following-sibling:: div//*[@class='flex items-center']//span[contains(@class,'text-black')]");
	public qv_Get_Basis_Value(fieldName: string): Locator {
	  return this.getLocatorWithParam("//div[text()='%s']/following-sibling:: div//span", fieldName);
	}
	public qv_Get_PY_Value(fieldName: string): Locator {
	  return this.getLocatorWithParam("//div[text()='%s']/following-sibling:: div", fieldName);
	}
	public card_label(courseName: string, lable: string): Locator {
	  return this.getLocatorWithParam("//p[text()='%s']/ancestor:: div[@data-cy='CourseCard']//span[text()='%s']", courseName,lable);
	}
	public qv_badge_check(badge: string): Locator {
	  return this.getLocatorWithParam("//div[@data-testid='sentinelStart']/following-sibling::div//span[text()='%s']", badge);
	}
	public navigation_betaText: Locator = this.page.locator("xpath=//div[text()='Insights']/div/*[text()='Beta']");
	public header_betaText(headerName: string): Locator {
	  return this.getLocatorWithParam("//div[text()='%s']/following-sibling:: div//*[text()='Beta']", headerName);
	}
	public close_filter: Locator = this.page.locator("svg[data-testid='CloseIcon']");
	public loc_CollectionCreator(creatorName: string): Locator {
	  return this.getLocatorWithParam("//div[text()='CREATOR']/following-sibling:: div//span[text()='%s']", creatorName);
	}
	public loc_DIV_ByText(text: string): Locator {
	  return this.getLocatorWithParam("div:text('%s')", text);
	}
	public internalSegment_Arrow: Locator = this.page.locator("//span[text()='Internal segments']/following-sibling::*[name()='svg']");
	public ouLable(text: string): Locator {
	  return this.getLocatorWithParam("//span[@aria-label='%s']", text);
	}
	public ouSearchBox: Locator = this.page.locator("input#ou-search");
	public ouSearchIcon: Locator = this.page.locator("input#ou-search+svg");
	public ouCheckBox(ouName: string): Locator {
	  return this.getLocatorWithParam("//span[@aria-label='%s']//input[@type='checkbox']", ouName);
	}
	public verifyAppliedFilter(filterName: string, filterValue: string): Locator {
	  return this.getLocatorWithParam("//span[text()='%s']/following-sibling::span//span[text()='%s']", filterName,filterValue);
	}
	public locatelastSyncMessage(text: string): Locator {
	  return this.getLocatorWithParam("//p[text()='%s']|//p[text()='LAST SYNCED: SEP 6, 2024 (UPDATES MONTHLY)']", text);
	}

	constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

	  super(browser, pageHandler, logger, portalIndex);

	}

    public <T extends BasePage> navigateToPageByPath(path: string[], clazz: Class<T>): T {
        for (int i = 0; i < path.length; i++) {
            this.csAdminNavigationLink(path[i]).click();
        }
        this.pause(3000);
        return this.getPageClassInstance(clazz);
    }

    public <T extends BasePage> logoutFromContentStudio(clazz: Class<T>): T {
    	this.pause(3000);
    	logOutButton.scrollIntoViewIfNeeded();
    	logOutButton.hover();
    	this.pause(1000);
    	logOutButton.click(new Locator.ClickOptions().setTimeout(5000));
        return this.getPageClassInstance(clazz);
    }

	public <T extends BasePage> clickClearAllFilters(clazz: Class<T>): T {
		clearAllFilter.click();
		return this.getPageClassInstance(clazz);
	}

	public <T extends BasePage> clickSortingDownArrow(clazz: Class<T>): T {
		sortByDownArrow.first().click();
		return this.getPageClassInstance(clazz);
	}

	public <T extends BasePage> selectSortingOption(option: string, clazz: Class<T>): T {
		this.sortingOption(option).click();
		return this.getPageClassInstance(clazz);
	}

	public <T extends BasePage> clickQuickView(courseName: string, clazz: Class<T>): T {
		this.qvCourseButton(courseName).first().hover();
		//qvCourseButton(courseName).first().click();
		this.page.locator("//button[text()='Quick view']").first().click();
		this.pause(3000);
		return this.getPageClassInstance(clazz);
	}

	public <T extends BasePage> clickGoToDetails(clazz: Class<T>): T {
		this.locateButtonText("Go to detail this.page").scrollIntoViewIfNeeded();
		return this.openPageInNewTab(locateButtonText("Go to detail this.page"),clazz);

	}

	public <T extends BasePage> clickCloseViewObjective(clazz: Class<T>): T {
		this.pause(1000);
		closeViewObjective.first().click();
		return this.getPageClassInstance(clazz);
	}

	public <T extends BasePage> clickCloseQuickViewDialog(courseName: string, clazz: Class<T>): T {
		this.pause(1000);
		//closeViewObjective.first().click();
		//closeQuickViewDialog.click();
		this.page.bringToFront();
		this.closelink(courseName).click();
		this.pause(3000);
		return this.getPageClassInstance(clazz);
	}

	public <T extends BasePage> getQuickViewDuration(duration: ResultContainer, clazz: Class<T>): T {
		let duration_local: string = this.page.locator("//div[@class='pr-1']/following-sibling:: div|//div[@class='mt-2']/div/div[contains(@class,'right')]").innerText();
		if(duration_local.contains("min")) {
			duration_local=duration_local.replace("min", "minutes");
			duration.setValue(duration_local);
		}
		if(duration_local.contains("hr"): ): else {
			duration_local=duration_local.replace("hr", "hours");
			duration.setValue(duration_local);
		}

		//pause(1000);
		return this.getPageClassInstance(clazz);
	}

	public <T extends BasePage> getQuickViewLanguage(qvlanguage: ResultContainer, clazz: Class<T>): T {
		qvlanguage.setValue(this.page.locator("//div[@data-testid=\"sentinelStart\"]/following-sibling :: div//div[text()='LANGUAGES']/following-sibling:: div").innerText());
		return this.getPageClassInstance(clazz);
	}

	public <T extends BasePage> getQuickViewSubscription(subscription: ResultContainer, clazz: Class<T>): T {
		let allSubscription: Array<string> = this.page.locator("//div[@data-testid='sentinelStart']/following-sibling :: div//div[@class='p-0.5']|//div[@data-testid='sentinelStart']/following-sibling :: div//div[text()='SUBSCRIPTION']/following-sibling::div/ul/li").allInnerTexts();
		let oneLineSubscription: string = "";
		for(int i=0;i<allSubscription.length;i++) {
			oneLineSubscription+=allSubscription.get(i);
			if(allSubscription.get(i).equals("Content Anytime Public Sector (Technology)")) {
				oneLineSubscription+=" ";
			}
			if(i!=allSubscription.length-1) {
				oneLineSubscription+=", ";
			}
		}
		subscription.setValue(oneLineSubscription+" ");
		this.pause(1000);
		return this.getPageClassInstance(clazz);
	}

	public <T extends BasePage> getPageClass(clazz: Class<T>): T {

	  return this.getPageClassInstance(clazz);

	}

	public <T extends BasePage> getQuickViewSkill(qvSkill: ResultContainer, clazz: Class<T>): T {
		qvSkill.setValue(qv_Get_Basis_Value("SKILLS").first().innerText());
		System.out.println(qvSkill.getValue());
		return this.getPageClassInstance(clazz);
	}

	public <T extends BasePage> getQuickViewCategory(qvCategory: ResultContainer, clazz: Class<T>): T {
		qvCategory.setValue(qv_Get_Basis_Value("CATEGORIES").innerText());
		return this.getPageClassInstance(clazz);
	}

	public <T extends BasePage> getQuickViewTopic(qvTopic: ResultContainer, clazz: Class<T>): T {
		qvTopic.setValue(qv_Get_Basis_Value("TOPICS").first().innerText());
		return this.getPageClassInstance(clazz);
	}

	public <T extends BasePage> getQuickViewSubject(qvSubject: ResultContainer, clazz: Class<T>): T {
		qvSubject.setValue(qv_Get_Basis_Value("SUBJECTS").first().innerText());
		return this.getPageClassInstance(clazz);
	}

	public <T extends BasePage> getQuickViewProvider(qvProvider: ResultContainer, clazz: Class<T>): T {
		qvProvider.setValue(qv_Get_Provider.innerText());
		return this.getPageClassInstance(clazz);
	}

	public <T extends BasePage> clickAllFilters(clazz: Class<T>): T {
		allfilters.click();
		return this.getPageClassInstance(clazz);
	}

	public <T extends BasePage> expandCategory(category: string, clazz: Class<T>): T {
		this.downarrowByCategory(category).click();
		return this.getPageClassInstance(clazz);
	}

	public <T extends BasePage> goToLastPageGlobal(clazz: Class<T>): T {
		/*
		 this.goBackToParentPage(CreateCollectionPage);
		 System.out.println(this.pageHandler.getCurrentPageIndex());
		 System.out.println(this.pageHandler);
		 this.pause(1000);
		 */

		let testdemo: Array<Page> = this.page.context().pages();
		System.out.println(testdemo.length);
		this.page=this.page.context().pages().get(testdemo.length-2);
		this.page.bringToFront();
		this.pageHandler.setCurrentPageIndex(testdemo.length-2);
		return this.getPageClassInstance(clazz);
	}

	public <T extends BasePage> waitForCard(clazz: Class<T>): T {
		this.pause(1000);
		contentCard.isVisible();
		this.page.waitForSelector("div[data-cy='CourseCard']:nth-of-type(1),div[data-cy='subscription-card']:nth-of-type(1)");
		return this.getPageClassInstance(clazz);
	}

	public <T extends BasePage> clickCloseIcon(clazz: Class<T>): T {
        close_filter.click();
        this.pause(3000);
        return this.getPageClassInstance(clazz);
    }

	public <T extends BasePage> clickSortingDownArrowGlobalSearch(option: string, clazz: Class<T>): T {
		this.sortByDownArrow_BBS(option).first().click();
		return this.getPageClassInstance(clazz);
	}

	public <T extends BasePage> clickHelpLink(clazz: Class<T>): T {

	  return openPageInNewTab(this.page.locator("//span[text()='Help']/parent:: button"),clazz);

	}

	public <T extends BasePage> clickViewInPlatForm(clazz: Class<T>): T {
		this.pause(3000);
		return this.openPageInNewTab(locateButtonText("View in platform"),clazz);

	}

	public <T extends BasePage> scrolltoBottom(scrollValue: string, clazz: Class<T>): T {
		this.pause(1000);
		if(scrollValue.equalsIgnoreCase("Downmost")) {
			this.page.evaluate("window.scrollBy(0, document.body.scrollHeight)");
		}
		else {
			let scriptvalue: string = String.format("window.scrollBy(0, %s)", scrollValue);
			this.page.evaluate(scriptvalue);
		}
		this.pause(5000);
		return this.getPageClassInstance(clazz);
	}

	public <T extends BasePage> clickInternalSegment(clazz: Class<T>): T {
		this.pause(1000);
		internalSegment_Arrow.scrollIntoViewIfNeeded();
		internalSegment_Arrow.click();
		return this.getPageClassInstance(clazz);

	}

	public <T extends BasePage> clickOU(ou: string, clazz: Class<T>): T {
		this.pause(1000);
		this.ouLable(ou).scrollIntoViewIfNeeded();
		this.ouLable(ou).click();
		return this.getPageClassInstance(clazz);

	}

	public <T extends BasePage> searchOU(ou: string, clazz: Class<T>): T {
		this.pause(1000);
		ouSearchBox.click();
		ouSearchBox.fill(ou);
		ouSearchIcon.click();
		return this.getPageClassInstance(clazz);
	}

	public <T extends BasePage> selectOU(ouName: string, clazz: Class<T>): T {
		this.pause(1000);
		this.ouCheckBox(ouName).check();
		return this.getPageClassInstance(clazz);
	}

	public <T extends BasePage> clickApplyButton(clazz: Class<T>): T {
		this.pause(1000);
		this.locateButtonText("Apply").scrollIntoViewIfNeeded();
		this.locateButtonText("Apply").click();
		return this.getPageClassInstance(clazz);
	}

}
