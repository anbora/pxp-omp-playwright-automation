// @ts-nocheck
import { BaseTest } from "common/BaseTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { SubscriptionPage } from "cs/pages/SubscriptionPage";
import { ResultContainer } from "models/ResultContainer";
import { expect } from "common/testing/playwright";

export class VerifySubscriptionTest_EdCast extends BaseTest{

	private readonly EXPLORESUBSCRIPTIONPATH: string[] = ["Subscriptions","Explore subscriptions"];
	private readonly YOURSUBSCRIPTIONPATH: string[] = ["Subscriptions","Your subscriptions"];
	private expectedSubscriptionOrder: string[] = ["Cornerstone Professional Skills","Cornerstone Leadership and Management",
		          "Cornerstone Modern Compliance","Cornerstone Technology",
		          "Cornerstone Sustainability","Cornerstone Diversity, Equity, and Inclusion","Cornerstone Public Sector",
		          "Cornerstone Public Sector (Technology) ","Cornerstone ANZ Fundamentals","Cornerstone SMB Essentials"]; //"Cornerstone Remote Work Essentials","Cornerstone Public Sector","Cornerstone Fundamentals",
	private readonly expectedSubscriptionNotPresent: string[] = ["Cornerstone SMB Basics"];
	private readonly SUBSCRIPTION_TO_SEARCH: string = "Cornerstone Public Sector (Technology) ";
	private readonly COURSE_TO_SEARCH: string = "DevOps Support Administrator: Cloud Computing Essentials for Support Engineers (1 of 2)";
	private readonly CONTENTPARTNER_TO_SEARCH: string = "Cegos";
	private readonly CONTENTPARTNERCOURSE_SEARCH: string = "Managing transformations with Test and Learn approach";
	private readonly YOURLEARNERCOUNT_CPC: string = "0";
	private readonly TOTALLEARNERCOUNT_CPC: string = "208";
	private readonly YOURLEARNERCOUNT_CC: string = "0";
	private readonly TOTALLEARNERCOUNT_CC: string = "4";
	private readonly CATEGORIES_FILTERVALUE: string[] = ["Business", "Technology", "Leadership"];
	private readonly TOPIC_FILTERVALUE: string[] = ["Change management","Java"];
	private readonly MODALITIES_FILTERVALUE: string[] = ["Read"];
	private readonly SKILLS_FILTERVALUE: string[] = ["Adobe","Finance"];
	private readonly CATEGORIES_FILTER_NAME: string = "Categories";
	private readonly TOPIC_FILTER_NAME: string = "Topics";
	private readonly MODALITIES_FILTER_NAME: string = "Modalities";
	private readonly SKILLS_FILTER_NAME: string = "Skills";
	private readonly filter: HashMap<string,Array<string>> = new HashMap();
	private readonly SORING_BY_NEWEST: string = "By newest";
	private readonly SORING_BY_TOTALLEARNER: string = "By total learners";
	private readonly TEXT_CONTENT_PARTNERS: string = "Content Partners";
	private readonly TEXT_CORNERSTONE_CURATED: string = "Cornerstone Curated";
	private duration: ResultContainer = new ResultContainer();
	private language: ResultContainer = new ResultContainer();
	private subscription: ResultContainer = new ResultContainer();

	public verifySubscriptionOrder(): void {

			       let __page1: any = this;
     __page1 = __page1.getCsLoginPage(this.getConfig().getEdCastURL());
     __page1 = __page1.navigateToLogin();
     __page1 = __page1.loginToApplication(this.getPlayEdCastUserThree().email, this.getPlayEdCastUserThree().password);
     __page1 = __page1.launchEdCastContentStudio();
     __page1 = __page1.navigateToPageByPath(this.EXPLORESUBSCRIPTIONPATH, SubscriptionPage);
     expect(__page1.availableSubscritpion).toContainText(this.expectedSubscriptionOrder);
     expect(__page1.availableSubscritpion).not.toContainText(this.expectedSubscriptionNotPresent);
     expect(__page1.locateButtonText(this.TEXT_CONTENT_PARTNERS)).not.toBeVisible({ timeout: 60000 });
     __page1 = __page1.logoutFromContentStudio(SubscriptionPage);

	}

	public verifyHTMLLinkCornerstoneCuratedAndQuickViewDetailsView(): void {

			       let __page2: any = this;
     __page2 = __page2.getCsLoginPage(this.getConfig().getEdCastURL());
     __page2 = __page2.navigateToLogin();
     __page2 = __page2.loginToApplication(this.getPlayEdCastUserThree().email, this.getPlayEdCastUserThree().password);
     __page2 = __page2.launchEdCastContentStudio();
     __page2 = __page2.navigateToPageByPath(this.EXPLORESUBSCRIPTIONPATH, SubscriptionPage);
     __page2 = __page2.searchSubscription(this.SUBSCRIPTION_TO_SEARCH);
     __page2 = __page2.selectSubscription(this.SUBSCRIPTION_TO_SEARCH);
     __page2 = __page2.searchCourse(this.COURSE_TO_SEARCH);
     __page2 = __page2.clickQuickView(this.COURSE_TO_SEARCH);
     expect(__page2.locateButtonText("All-time")).toBeVisible({ timeout: 60000 });
     expect(__page2.locateButtonText("Last Quarter")).toBeVisible({ timeout: 60000 });
     expect(__page2.metricYourLearner(this.YOURLEARNERCOUNT_CC)).toBeVisible({ timeout: 60000 });
     expect(__page2.metricTotalLearner(this.TOTALLEARNERCOUNT_CC)).toBeVisible({ timeout: 60000 });
     __page2 = __page2.getQuickViewDuration(this.duration, SubscriptionPage);
     __page2 = __page2.getQuickViewLanguage(this.language, SubscriptionPage);
     __page2 = __page2.getQuickViewSubscription(this.subscription, SubscriptionPage);
     __page2 = __page2.clickGoToDetails();
     expect(__page2.readMore).toBeVisible({ timeout: 60000 });
     __page2 = __page2.clickReadMore();
     expect(__page2.locateSpanText("ABOUT THE COURSE")).toBeVisible({ timeout: 60000 });
     expect(__page2.this.duration.getValue()(this.duration.getValue())).toBeVisible({ timeout: 30000 });
     expect(__page2.this.language.getValue()(this.language.getValue())).toBeVisible({ timeout: 30000 });
     let subscriptionlistArray: string[] = this.subscription.getValue().split(",");
     for (const subscription of subscriptionlistArray) {
     			if(subscription.equals("N/A")) {
     
     				expect(__page2.getPage().locator("//span[text()='SUBSCRIPTIONS']/following-sibling:: span[not(text()='')]")).not.toBeVisible();
     			}
     			else {
     				expect(__page2.subscriptions(subscription.trim())).toBeVisible({ timeout: 30000 });
     				//System.out.println("Verified "+subscription);
     			}
     		}
     __page2 = __page2.logoutFromContentStudio(SubscriptionPage);

	}

	public verifySubscriptionsApplyRemoveFilters(): void {

			this.filter.put(this.CATEGORIES_FILTER_NAME, Arrays.asList(this.CATEGORIES_FILTERVALUE));
			this.filter.put(this.TOPIC_FILTER_NAME, Arrays.asList(this.TOPIC_FILTERVALUE));
			this.filter.put(this.MODALITIES_FILTER_NAME, Arrays.asList(this.MODALITIES_FILTERVALUE));
			this.filter.put(this.SKILLS_FILTER_NAME, Arrays.asList(this.SKILLS_FILTERVALUE));

			   let __page3: any = this;
   __page3 = __page3.getCsLoginPage(this.getConfig().getEdCastURL());
   __page3 = __page3.navigateToLogin();
   __page3 = __page3.loginToApplication(this.getPlayEdCastUserThree().email, this.getPlayEdCastUserThree().password);
   __page3 = __page3.launchEdCastContentStudio();
   __page3 = __page3.navigateToPageByPath(this.EXPLORESUBSCRIPTIONPATH, SubscriptionPage);
   __page3 = __page3.searchSubscription(this.SUBSCRIPTION_TO_SEARCH);
   __page3 = __page3.selectSubscription(this.SUBSCRIPTION_TO_SEARCH);
   __page3 = __page3.applySubscriptionFilter(this.filter);
   __page3 = __page3.clickApplyFilterButton();
   if(this.CATEGORIES_FILTER_NAME.equals("Modalities"))
   		{
   			this.CATEGORIES_FILTERVALUE[0]=this.CATEGORIES_FILTERVALUE[0].substring(0,1).toUpperCase()+this.CATEGORIES_FILTERVALUE[0].substring(1);
   		}
   expect(__page3.verifyAppliedFilter(this.CATEGORIES_FILTER_NAME,this.CATEGORIES_FILTERVALUE[0])).toBeVisible({ timeout: 60000 });
   if(this.TOPIC_FILTER_NAME.equals("Modalities"))
   		{
   			this.TOPIC_FILTERVALUE[1]=this.TOPIC_FILTERVALUE[1].substring(0,1).toUpperCase()+this.TOPIC_FILTERVALUE[1].substring(1);
   		}
   expect(__page3.verifyAppliedFilter(this.TOPIC_FILTER_NAME,this.TOPIC_FILTERVALUE[1])).toBeVisible({ timeout: 60000 });
   if(this.MODALITIES_FILTER_NAME.equals("Modalities"))
   		{
   			this.MODALITIES_FILTERVALUE[0]=this.MODALITIES_FILTERVALUE[0].substring(0,1).toUpperCase()+this.MODALITIES_FILTERVALUE[0].substring(1);
   		}
   expect(__page3.verifyAppliedFilter(this.MODALITIES_FILTER_NAME,this.MODALITIES_FILTERVALUE[0])).toBeVisible({ timeout: 60000 });
   if(this.SKILLS_FILTER_NAME.equals("Modalities"))
   		{
   			this.SKILLS_FILTERVALUE[1]=this.SKILLS_FILTERVALUE[1].substring(0,1).toUpperCase()+this.SKILLS_FILTERVALUE[1].substring(1);
   		}
   expect(__page3.verifyAppliedFilter(this.SKILLS_FILTER_NAME,this.SKILLS_FILTERVALUE[1])).toBeVisible({ timeout: 60000 });
   __page3 = __page3.clickclearFilterIcon(this.CATEGORIES_FILTERVALUE[0]);
   if("Categories".equals("Modalities"))
   		{
   			this.CATEGORIES_FILTERVALUE[0]=this.CATEGORIES_FILTERVALUE[0].substring(0,1).toUpperCase()+this.CATEGORIES_FILTERVALUE[0].substring(1);
   		}
   expect(__page3.verifyAppliedFilter("Categories",this.CATEGORIES_FILTERVALUE[0])).not.toBeVisible({ timeout: 60000 });
   __page3 = __page3.clickClearAllFilters(SubscriptionPage);
   if(this.CATEGORIES_FILTER_NAME.equals("Modalities"))
   		{
   			this.CATEGORIES_FILTERVALUE[0]=this.CATEGORIES_FILTERVALUE[0].substring(0,1).toUpperCase()+this.CATEGORIES_FILTERVALUE[0].substring(1);
   		}
   expect(__page3.verifyAppliedFilter(this.CATEGORIES_FILTER_NAME,this.CATEGORIES_FILTERVALUE[0])).not.toBeVisible({ timeout: 60000 });
   if(this.TOPIC_FILTER_NAME.equals("Modalities"))
   		{
   			this.TOPIC_FILTERVALUE[1]=this.TOPIC_FILTERVALUE[1].substring(0,1).toUpperCase()+this.TOPIC_FILTERVALUE[1].substring(1);
   		}
   expect(__page3.verifyAppliedFilter(this.TOPIC_FILTER_NAME,this.TOPIC_FILTERVALUE[1])).not.toBeVisible({ timeout: 60000 });
   if(this.MODALITIES_FILTER_NAME.equals("Modalities"))
   		{
   			this.MODALITIES_FILTERVALUE[0]=this.MODALITIES_FILTERVALUE[0].substring(0,1).toUpperCase()+this.MODALITIES_FILTERVALUE[0].substring(1);
   		}
   expect(__page3.verifyAppliedFilter(this.MODALITIES_FILTER_NAME,this.MODALITIES_FILTERVALUE[0])).not.toBeVisible({ timeout: 60000 });
   if(this.SKILLS_FILTER_NAME.equals("Modalities"))
   		{
   			this.SKILLS_FILTERVALUE[0]=this.SKILLS_FILTERVALUE[0].substring(0,1).toUpperCase()+this.SKILLS_FILTERVALUE[0].substring(1);
   		}
   expect(__page3.verifyAppliedFilter(this.SKILLS_FILTER_NAME,this.SKILLS_FILTERVALUE[0])).not.toBeVisible({ timeout: 60000 });
			//.logoutFromContentStudio(SubscriptionPage);

	}

	public verifySubscriptionsPageSortByTotalLearner(): void {

				    let __page4: any = this;
    __page4 = __page4.getCsLoginPage(this.getConfig().getEdCastURL());
    __page4 = __page4.navigateToLogin();
    __page4 = __page4.loginToApplication(this.getPlayEdCastUserThree().email, this.getPlayEdCastUserThree().password);
    __page4 = __page4.launchEdCastContentStudio();
    __page4 = __page4.navigateToPageByPath(this.EXPLORESUBSCRIPTIONPATH, SubscriptionPage);
    __page4 = __page4.searchSubscription(this.SUBSCRIPTION_TO_SEARCH);
    __page4 = __page4.selectSubscription(this.SUBSCRIPTION_TO_SEARCH);
    __page4 = __page4.clickSortingDownArrow();
    expect(__page4.sortingOption(this.SORING_BY_TOTALLEARNER)).toBeVisible({ timeout: 60000 });
    __page4 = __page4.selectSortingOption(this.SORING_BY_TOTALLEARNER);
				//.logoutFromContentStudio(SubscriptionPage);
	}

}
