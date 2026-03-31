// @ts-nocheck
import { BaseTest } from "common/BaseTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { BrowseBySubjectPage } from "cs/pages/BrowseBySubjectPage";
import { CourseDetailsPage } from "cs/pages/CourseDetailsPage";
import { SubscriptionPage } from "cs/pages/SubscriptionPage";
import { ResultContainer } from "models/ResultContainer";
import { expect } from "common/testing/playwright";

export class VerifySubscriptionTest_CSX extends BaseTest{

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
	//private HashMap<String,List<String>> filter= new HashMap();
	private readonly SORING_BY_NEWEST: string = "By newest";
	private readonly SORING_BY_TOTALLEARNER: string = "By total learners";
	private readonly LABEL_SUBSCRIBE: string = "Subscribed";
	private readonly LABEL_NEW: string = "New";
	private readonly LABEL_RETIRING: string = "Retiring";
	private readonly SEARCHCOURSE_NEW_BADGE: string = "Building Smart Chatbots with LangChain";//"Intro to AV/EDR Evasion";
	private SEARCHCOURSE_RETIRE_BADGE: string="Agile Project Management Overview"; //Learning Python,Azure – Introduction to Azure
	private readonly CC_TAB: string = "Cornerstone Curated";
	private readonly CP_TAB: string = "Content Partners";
	private readonly SUBSCRIPTION_Filter: string = "Cornerstone Professional Skills";
	private readonly ACCREDITATION_FILTER_NAME: string = "Accreditation Body";
	private readonly PROFICIENCY_FILTER_NAME: string = "Proficiency";
	private readonly LANGUAGE_TYPE_FILTER_NAME: string = "languageType";
	private readonly ACCREDITATION_FILTERVALUE: string[] = ["Hrci"];
	private readonly PROFICIENCY_FILTERVALUE: string[] = ["Beginner","Expert"];
	private readonly LANGUAGE_TYPE_FILTERVALUE: string[] = ["Dubbed","Original","Subtitled"];
	private resultcount: ResultContainer = new ResultContainer();
	private readonly CONTENTPARTNER_TO_SEARCH_BOOKBOON: string = "Bookboon";


	//Fully Implemented
	public verifySubscriptionOrder(): void {

		  let __page1: any = this;
  __page1 = __page1.getCsLoginPage(this.getConfig().getThinkContentURL());
  __page1 = __page1.loginToThinkContent(this.getPlayFiveUser().email, this.getPlayOneUser().password);
  __page1 = __page1.navigateToPageByPath(this.EXPLORESUBSCRIPTIONPATH, SubscriptionPage);
  expect(__page1.availableSubscritpion).toContainText(this.expectedSubscriptionOrder);
  expect(__page1.availableSubscritpion).not.toContainText(this.expectedSubscriptionNotPresent);
  expect(__page1.locateButtonText(this.CC_TAB)).toBeVisible({ timeout: 60000 });
  expect(__page1.locateButtonText(this.CP_TAB)).toBeVisible({ timeout: 60000 });
	}

	//Fully Implemented
	public verifyHTMLLinkCornerstoneCurated(): void {

		  let __page2: any = this;
  __page2 = __page2.getCsLoginPage(this.getConfig().getThinkContentURL());
  __page2 = __page2.loginToThinkContent(this.getPlayFiveUser().email, this.getPlayOneUser().password);
  __page2 = __page2.navigateToPageByPath(this.EXPLORESUBSCRIPTIONPATH, SubscriptionPage);
  __page2 = __page2.searchSubscription(this.SUBSCRIPTION_TO_SEARCH);
  __page2 = __page2.selectSubscription(this.SUBSCRIPTION_TO_SEARCH);
  __page2 = __page2.searchCourse(this.COURSE_TO_SEARCH);
  __page2 = __page2.clickQuickView(this.COURSE_TO_SEARCH);
  expect(__page2.locateButtonText("All-time")).toBeVisible({ timeout: 60000 });
  expect(__page2.locateButtonText("Last Quarter")).toBeVisible({ timeout: 60000 });
  expect(__page2.metricYourLearner(this.YOURLEARNERCOUNT_CC)).toBeVisible({ timeout: 60000 });
  expect(__page2.metricTotalLearner(this.TOTALLEARNERCOUNT_CC)).toBeVisible({ timeout: 60000 });
  expect(__page2.qv_duration_check(this.COURSE_TO_SEARCH)).toHaveText(Pattern.compile("(\\d.\\d|\\d) (hr|min)"));
  __page2 = __page2.clickGoToDetails();
  expect(__page2.readMore).toBeVisible({ timeout: 60000 });
  __page2 = __page2.clickReadMore();
  expect(__page2.locateSpanText("ABOUT THE COURSE")).toBeVisible({ timeout: 60000 });
	}

	//Fully Implemented
	public verifyHTMLLinkCornerstonePartner(): void {

		  let __page3: any = this;
  __page3 = __page3.getCsLoginPage(this.getConfig().getThinkContentURL());
  __page3 = __page3.loginToThinkContent(this.getPlayFiveUser().email, this.getPlayOneUser().password);
  __page3 = __page3.navigateToPageByPath(this.EXPLORESUBSCRIPTIONPATH, SubscriptionPage);
  __page3 = __page3.clickContentPartnersTab();
  __page3 = __page3.searchContentPartners(this.CONTENTPARTNER_TO_SEARCH);
  __page3 = __page3.clickContentPartnersCard(this.CONTENTPARTNER_TO_SEARCH);
  __page3 = __page3.searchCourse(this.CONTENTPARTNERCOURSE_SEARCH);
  __page3 = __page3.clickQuickView(this.CONTENTPARTNERCOURSE_SEARCH);
  expect(__page3.locateButtonText("All-time")).toBeVisible({ timeout: 60000 });
  expect(__page3.locateButtonText("Last Quarter")).toBeVisible({ timeout: 60000 });
  expect(__page3.yourLearnerText).toHaveText(Pattern.compile("(^\\d$)"));
  expect(__page3.totalLernerText).toHaveText(Pattern.compile("(^\\d{1,3}|\\d{1,3}.\\d$)"));
  expect(__page3.qv_duration_check(this.CONTENTPARTNER_TO_SEARCH)).toHaveText(Pattern.compile("(\\d.\\d|\\d) (hr|min)"));
  __page3 = __page3.clickGoToDetails();
  expect(__page3.locateSpanText("ABOUT THE COURSE")).toBeVisible({ timeout: 60000 });
		//.logoutFromContentStudio(SubscriptionPage);
	}

	//Fully Implemented
	public verifySubscriptionsApplyRemoveFilters(): void {

		let filter: HashMap<string, Array<string>> = new HashMap();

		filter.put(this.CATEGORIES_FILTER_NAME, Arrays.asList(this.CATEGORIES_FILTERVALUE));
		filter.put(this.TOPIC_FILTER_NAME, Arrays.asList(this.TOPIC_FILTERVALUE));
		filter.put(this.MODALITIES_FILTER_NAME, Arrays.asList(this.MODALITIES_FILTERVALUE));
		filter.put(this.SKILLS_FILTER_NAME, Arrays.asList(this.SKILLS_FILTERVALUE));

		  let __page4: any = this;
  __page4 = __page4.getCsLoginPage(this.getConfig().getThinkContentURL());
  __page4 = __page4.loginToThinkContent(this.getPlayFiveUser().email, this.getPlayOneUser().password);
  __page4 = __page4.navigateToPageByPath(this.EXPLORESUBSCRIPTIONPATH, SubscriptionPage);
  __page4 = __page4.searchSubscription(this.SUBSCRIPTION_TO_SEARCH);
  __page4 = __page4.selectSubscription(this.SUBSCRIPTION_TO_SEARCH);
  __page4 = __page4.applySubscriptionFilter(filter);
  __page4 = __page4.clickApplyFilterButton();
  if(this.CATEGORIES_FILTER_NAME.equals("Modalities"))
  		{
  			this.CATEGORIES_FILTERVALUE[0]=this.CATEGORIES_FILTERVALUE[0].substring(0,1).toUpperCase()+this.CATEGORIES_FILTERVALUE[0].substring(1);
  		}
  expect(__page4.verifyAppliedFilter(this.CATEGORIES_FILTER_NAME,this.CATEGORIES_FILTERVALUE[0])).toBeVisible({ timeout: 60000 });
  if(this.TOPIC_FILTER_NAME.equals("Modalities"))
  		{
  			this.TOPIC_FILTERVALUE[1]=this.TOPIC_FILTERVALUE[1].substring(0,1).toUpperCase()+this.TOPIC_FILTERVALUE[1].substring(1);
  		}
  expect(__page4.verifyAppliedFilter(this.TOPIC_FILTER_NAME,this.TOPIC_FILTERVALUE[1])).toBeVisible({ timeout: 60000 });
  if(this.MODALITIES_FILTER_NAME.equals("Modalities"))
  		{
  			this.MODALITIES_FILTERVALUE[0]=this.MODALITIES_FILTERVALUE[0].substring(0,1).toUpperCase()+this.MODALITIES_FILTERVALUE[0].substring(1);
  		}
  expect(__page4.verifyAppliedFilter(this.MODALITIES_FILTER_NAME,this.MODALITIES_FILTERVALUE[0])).toBeVisible({ timeout: 60000 });
  if(this.SKILLS_FILTER_NAME.equals("Modalities"))
  		{
  			this.SKILLS_FILTERVALUE[1]=this.SKILLS_FILTERVALUE[1].substring(0,1).toUpperCase()+this.SKILLS_FILTERVALUE[1].substring(1);
  		}
  expect(__page4.verifyAppliedFilter(this.SKILLS_FILTER_NAME,this.SKILLS_FILTERVALUE[1])).toBeVisible({ timeout: 60000 });
  __page4 = __page4.clickclearFilterIcon(this.CATEGORIES_FILTERVALUE[0]);
  if("Categories".equals("Modalities"))
  		{
  			this.CATEGORIES_FILTERVALUE[0]=this.CATEGORIES_FILTERVALUE[0].substring(0,1).toUpperCase()+this.CATEGORIES_FILTERVALUE[0].substring(1);
  		}
  expect(__page4.verifyAppliedFilter("Categories",this.CATEGORIES_FILTERVALUE[0])).not.toBeVisible({ timeout: 60000 });
  __page4 = __page4.clickClearAllFilters(SubscriptionPage);
  if(this.CATEGORIES_FILTER_NAME.equals("Modalities"))
  		{
  			this.CATEGORIES_FILTERVALUE[0]=this.CATEGORIES_FILTERVALUE[0].substring(0,1).toUpperCase()+this.CATEGORIES_FILTERVALUE[0].substring(1);
  		}
  expect(__page4.verifyAppliedFilter(this.CATEGORIES_FILTER_NAME,this.CATEGORIES_FILTERVALUE[0])).not.toBeVisible({ timeout: 60000 });
  if(this.TOPIC_FILTER_NAME.equals("Modalities"))
  		{
  			this.TOPIC_FILTERVALUE[1]=this.TOPIC_FILTERVALUE[1].substring(0,1).toUpperCase()+this.TOPIC_FILTERVALUE[1].substring(1);
  		}
  expect(__page4.verifyAppliedFilter(this.TOPIC_FILTER_NAME,this.TOPIC_FILTERVALUE[1])).not.toBeVisible({ timeout: 60000 });
  if(this.MODALITIES_FILTER_NAME.equals("Modalities"))
  		{
  			this.MODALITIES_FILTERVALUE[0]=this.MODALITIES_FILTERVALUE[0].substring(0,1).toUpperCase()+this.MODALITIES_FILTERVALUE[0].substring(1);
  		}
  expect(__page4.verifyAppliedFilter(this.MODALITIES_FILTER_NAME,this.MODALITIES_FILTERVALUE[0])).not.toBeVisible({ timeout: 60000 });
  if(this.SKILLS_FILTER_NAME.equals("Modalities"))
  		{
  			this.SKILLS_FILTERVALUE[0]=this.SKILLS_FILTERVALUE[0].substring(0,1).toUpperCase()+this.SKILLS_FILTERVALUE[0].substring(1);
  		}
  expect(__page4.verifyAppliedFilter(this.SKILLS_FILTER_NAME,this.SKILLS_FILTERVALUE[0])).not.toBeVisible({ timeout: 60000 });
		//.logoutFromContentStudio(SubscriptionPage);
	}

	public verifySubscriptionsPageSortByTotalLearner(): void {

		  let __page5: any = this;
  __page5 = __page5.getCsLoginPage(this.getConfig().getThinkContentURL());
  __page5 = __page5.loginToThinkContent(this.getPlayFiveUser().email, this.getPlayOneUser().password);
  __page5 = __page5.navigateToPageByPath(this.EXPLORESUBSCRIPTIONPATH, SubscriptionPage);
  __page5 = __page5.searchSubscription(this.SUBSCRIPTION_TO_SEARCH);
  __page5 = __page5.selectSubscription(this.SUBSCRIPTION_TO_SEARCH);
  __page5 = __page5.clickSortingDownArrow();
  expect(__page5.sortingOption(this.SORING_BY_TOTALLEARNER)).toBeVisible({ timeout: 60000 });
  __page5 = __page5.selectSortingOption(this.SORING_BY_TOTALLEARNER);
		//.logoutFromContentStudio(SubscriptionPage);
	}

	//@Test
	 public verifyNewBadge(): void {

		    let __page6: any = this;
   __page6 = __page6.getCsLoginPage(this.getConfig().getThinkContentURL());
   __page6 = __page6.loginToThinkContent(this.getPlayFiveUser().email, this.getPlayOneUser().password);
   __page6 = __page6.navigateToPageByPath(this.EXPLORESUBSCRIPTIONPATH, SubscriptionPage);
   __page6 = __page6.searchSubscription(this.SUBSCRIPTION_TO_SEARCH);
   __page6 = __page6.selectSubscription(this.SUBSCRIPTION_TO_SEARCH);
   __page6 = __page6.searchCourse(this.SEARCHCOURSE_NEW_BADGE);
   __page6 = __page6.waitForCard(SubscriptionPage);
   expect(__page6.card_label(this.SEARCHCOURSE_NEW_BADGE,this.LABEL_SUBSCRIBE)).toBeVisible({ timeout: 60000 });
   expect(__page6.card_label(this.SEARCHCOURSE_NEW_BADGE,this.LABEL_NEW)).toBeVisible({ timeout: 60000 });
   __page6 = __page6.clickQuickView(this.SEARCHCOURSE_NEW_BADGE, SubscriptionPage);
   expect(__page6.card_label(this.SEARCHCOURSE_NEW_BADGE,this.LABEL_SUBSCRIBE)).toBeVisible({ timeout: 60000 });
   expect(__page6.card_label(this.SEARCHCOURSE_NEW_BADGE,this.LABEL_NEW)).toBeVisible({ timeout: 60000 });
   expect(__page6.qv_duration_check(this.SEARCHCOURSE_NEW_BADGE)).toHaveText(Pattern.compile("(\\d.\\d|\\d) (hr|min)"));
   __page6 = __page6.clickGoToDetails(CourseDetailsPage);
   expect(__page6.badge_check(this.LABEL_SUBSCRIBE)).toBeVisible({ timeout: 60000 });
   expect(__page6.badge_check(this.LABEL_NEW)).toBeVisible({ timeout: 60000 });
   __page6 = __page6.goToLastPage();
   __page6 = __page6.clickCloseQuickViewDialog(this.SEARCHCOURSE_NEW_BADGE, BrowseBySubjectPage);
	  }

	  public verifyRetireBadge(): void {

		      let __page7: any = this;
    __page7 = __page7.getCsLoginPage(this.getConfig().getThinkContentURL());
    __page7 = __page7.loginToThinkContent(this.getPlayFiveUser().email, this.getPlayOneUser().password);
    __page7 = __page7.navigateToPageByPath(this.EXPLORESUBSCRIPTIONPATH, SubscriptionPage);
    __page7 = __page7.searchSubscription(this.SUBSCRIPTION_TO_SEARCH);
    __page7 = __page7.selectSubscription(this.SUBSCRIPTION_TO_SEARCH);
    __page7 = __page7.searchCourse(this.SEARCHCOURSE_RETIRE_BADGE);
    __page7 = __page7.waitForCard(SubscriptionPage);
    expect(__page7.card_label(this.SEARCHCOURSE_RETIRE_BADGE,this.LABEL_SUBSCRIBE)).toBeVisible({ timeout: 60000 });
    expect(__page7.card_label(this.SEARCHCOURSE_RETIRE_BADGE,this.LABEL_RETIRING)).toBeVisible({ timeout: 60000 });
    __page7 = __page7.clickQuickView(this.SEARCHCOURSE_RETIRE_BADGE, SubscriptionPage);
    expect(__page7.card_label(this.SEARCHCOURSE_RETIRE_BADGE,this.LABEL_SUBSCRIBE)).toBeVisible({ timeout: 60000 });
    expect(__page7.card_label(this.SEARCHCOURSE_RETIRE_BADGE,this.LABEL_RETIRING)).toBeVisible({ timeout: 60000 });
    expect(__page7.qv_duration_check(this.SEARCHCOURSE_RETIRE_BADGE)).toHaveText(Pattern.compile("(\\d.\\d|\\d) (hr|min)"));
    __page7 = __page7.clickGoToDetails(CourseDetailsPage);
    expect(__page7.badge_check(this.LABEL_SUBSCRIBE)).toBeVisible({ timeout: 60000 });
    expect(__page7.badge_check(this.LABEL_RETIRING)).toBeVisible({ timeout: 60000 });
    __page7 = __page7.goToLastPage();
    __page7 = __page7.clickCloseQuickViewDialog(this.SEARCHCOURSE_RETIRE_BADGE, BrowseBySubjectPage);
	  }

	  public verifyNewFiltersCornerstoneCurated(): void {

		  let filter: HashMap<string, Array<string>> = new HashMap();

		  filter.put("Accreditation Body",Arrays.asList(this.ACCREDITATION_FILTERVALUE));
		  filter.put("Proficiency",Arrays.asList(this.PROFICIENCY_FILTERVALUE));
		  filter.put("languageType",Arrays.asList(this.LANGUAGE_TYPE_FILTERVALUE));

		      let __page8: any = this;
    __page8 = __page8.getCsLoginPage(this.getConfig().getThinkContentURL());
    __page8 = __page8.loginToThinkContent(this.getPlayFiveUser().email, this.getPlayOneUser().password);
    __page8 = __page8.navigateToPageByPath(this.EXPLORESUBSCRIPTIONPATH, SubscriptionPage);
    __page8 = __page8.searchSubscription(this.SUBSCRIPTION_Filter);
    __page8 = __page8.selectSubscription(this.SUBSCRIPTION_Filter);
    __page8 = __page8.clickAllFilters(SubscriptionPage);
    expect(__page8.badge_check("Accreditation Body")).toBeVisible();
    expect(__page8.badge_check("Proficiency")).toBeVisible();
    expect(__page8.badge_check("languageType")).toBeVisible();
    __page8 = __page8.clickCloseIcon(SubscriptionPage);
    __page8 = __page8.applySubscriptionFilter(filter);
    __page8 = __page8.clickApplyFilterButton();
    if(this.ACCREDITATION_FILTER_NAME.equals("Modalities"))
    		{
    			this.ACCREDITATION_FILTERVALUE[0]=this.ACCREDITATION_FILTERVALUE[0].substring(0,1).toUpperCase()+this.ACCREDITATION_FILTERVALUE[0].substring(1);
    		}
    expect(__page8.verifyAppliedFilter(this.ACCREDITATION_FILTER_NAME,this.ACCREDITATION_FILTERVALUE[0])).toBeVisible({ timeout: 60000 });
    if(this.PROFICIENCY_FILTER_NAME.equals("Modalities"))
    		{
    			this.PROFICIENCY_FILTERVALUE[0]=this.PROFICIENCY_FILTERVALUE[0].substring(0,1).toUpperCase()+this.PROFICIENCY_FILTERVALUE[0].substring(1);
    		}
    expect(__page8.verifyAppliedFilter(this.PROFICIENCY_FILTER_NAME,this.PROFICIENCY_FILTERVALUE[0])).toBeVisible({ timeout: 60000 });
    if(this.PROFICIENCY_FILTER_NAME.equals("Modalities"))
    		{
    			this.PROFICIENCY_FILTERVALUE[1]=this.PROFICIENCY_FILTERVALUE[1].substring(0,1).toUpperCase()+this.PROFICIENCY_FILTERVALUE[1].substring(1);
    		}
    expect(__page8.verifyAppliedFilter(this.PROFICIENCY_FILTER_NAME,this.PROFICIENCY_FILTERVALUE[1])).toBeVisible({ timeout: 60000 });
    if(this.LANGUAGE_TYPE_FILTER_NAME.equals("Modalities"))
    		{
    			this.LANGUAGE_TYPE_FILTERVALUE[0]=this.LANGUAGE_TYPE_FILTERVALUE[0].substring(0,1).toUpperCase()+this.LANGUAGE_TYPE_FILTERVALUE[0].substring(1);
    		}
    expect(__page8.verifyAppliedFilter(this.LANGUAGE_TYPE_FILTER_NAME,this.LANGUAGE_TYPE_FILTERVALUE[0])).toBeVisible({ timeout: 60000 });
    if(this.LANGUAGE_TYPE_FILTER_NAME.equals("Modalities"))
    		{
    			this.LANGUAGE_TYPE_FILTERVALUE[1]=this.LANGUAGE_TYPE_FILTERVALUE[1].substring(0,1).toUpperCase()+this.LANGUAGE_TYPE_FILTERVALUE[1].substring(1);
    		}
    expect(__page8.verifyAppliedFilter(this.LANGUAGE_TYPE_FILTER_NAME,this.LANGUAGE_TYPE_FILTERVALUE[1])).toBeVisible({ timeout: 60000 });
    if(this.LANGUAGE_TYPE_FILTER_NAME.equals("Modalities"))
    		{
    			this.LANGUAGE_TYPE_FILTERVALUE[2]=this.LANGUAGE_TYPE_FILTERVALUE[2].substring(0,1).toUpperCase()+this.LANGUAGE_TYPE_FILTERVALUE[2].substring(1);
    		}
    expect(__page8.verifyAppliedFilter(this.LANGUAGE_TYPE_FILTER_NAME,this.LANGUAGE_TYPE_FILTERVALUE[2])).toBeVisible({ timeout: 60000 });
		}


		public verifyNewFilterContentPartner(): void {

			const ACCREDITATION_FILTERVALUE_CP: string[] = ["Project management institute (pmi)"];
			const LANGUAGE_TYPE_FILTERVALUE_CP: string[] = ["Original"];
			let filterAccri: HashMap<string, Array<string>> = new HashMap();
			let filter: HashMap<string, Array<string>> = new HashMap();

			filterAccri.put("Accreditation Body",Arrays.asList(ACCREDITATION_FILTERVALUE_CP));
			filter.put("Proficiency",Arrays.asList(this.PROFICIENCY_FILTERVALUE));
			filter.put("languageType",Arrays.asList(LANGUAGE_TYPE_FILTERVALUE_CP));

			   let __page9: any = this;
   __page9 = __page9.getCsLoginPage(this.getConfig().getThinkContentURL());
   __page9 = __page9.loginToThinkContent(this.getPlayFiveUser().email, this.getPlayOneUser().password);
   __page9 = __page9.navigateToPageByPath(this.EXPLORESUBSCRIPTIONPATH, SubscriptionPage);
   __page9 = __page9.clickContentPartnersTab();
   __page9 = __page9.searchContentPartners("Cegos");
   __page9 = __page9.clickContentPartnersCard("Cegos");
   __page9 = __page9.clickAllFilters(SubscriptionPage);
   expect(__page9.badge_check("Accreditation Body")).toBeVisible();
   __page9 = __page9.clickCloseIcon(SubscriptionPage);
   __page9 = __page9.applySubscriptionFilter(filterAccri);
   __page9 = __page9.clickApplyFilterButton();
   if(this.ACCREDITATION_FILTER_NAME.equals("Modalities"))
   		{
   			ACCREDITATION_FILTERVALUE_CP[0]=ACCREDITATION_FILTERVALUE_CP[0].substring(0,1).toUpperCase()+ACCREDITATION_FILTERVALUE_CP[0].substring(1);
   		}
   expect(__page9.verifyAppliedFilter(this.ACCREDITATION_FILTER_NAME,ACCREDITATION_FILTERVALUE_CP[0])).toBeVisible({ timeout: 60000 });
   __page9 = __page9.clickClearAllFilters(SubscriptionPage);
   __page9 = __page9.navigateToPageByPath(this.EXPLORESUBSCRIPTIONPATH, SubscriptionPage);
   __page9 = __page9.clickContentPartnersTab();
   __page9 = __page9.searchContentPartners("CyberU");
   __page9 = __page9.clickContentPartnersCard("CyberU");
   __page9 = __page9.clickAllFilters(SubscriptionPage);
   expect(__page9.badge_check("Proficiency")).toBeVisible();
   expect(__page9.badge_check("languageType")).toBeVisible();
   __page9 = __page9.clickCloseIcon(SubscriptionPage);
   __page9 = __page9.applySubscriptionFilter(filter);
   __page9 = __page9.clickApplyFilterButton();
   if(this.PROFICIENCY_FILTER_NAME.equals("Modalities"))
   		{
   			this.PROFICIENCY_FILTERVALUE[0]=this.PROFICIENCY_FILTERVALUE[0].substring(0,1).toUpperCase()+this.PROFICIENCY_FILTERVALUE[0].substring(1);
   		}
   expect(__page9.verifyAppliedFilter(this.PROFICIENCY_FILTER_NAME,this.PROFICIENCY_FILTERVALUE[0])).toBeVisible({ timeout: 60000 });
   if(this.PROFICIENCY_FILTER_NAME.equals("Modalities"))
   		{
   			this.PROFICIENCY_FILTERVALUE[1]=this.PROFICIENCY_FILTERVALUE[1].substring(0,1).toUpperCase()+this.PROFICIENCY_FILTERVALUE[1].substring(1);
   		}
   expect(__page9.verifyAppliedFilter(this.PROFICIENCY_FILTER_NAME,this.PROFICIENCY_FILTERVALUE[1])).toBeVisible({ timeout: 60000 });
   if(this.LANGUAGE_TYPE_FILTER_NAME.equals("Modalities"))
   		{
   			LANGUAGE_TYPE_FILTERVALUE_CP[0]=LANGUAGE_TYPE_FILTERVALUE_CP[0].substring(0,1).toUpperCase()+LANGUAGE_TYPE_FILTERVALUE_CP[0].substring(1);
   		}
   expect(__page9.verifyAppliedFilter(this.LANGUAGE_TYPE_FILTER_NAME,LANGUAGE_TYPE_FILTERVALUE_CP[0])).toBeVisible({ timeout: 60000 });
		  }

		public verifyStickyHeadersExploreSubscription(): void {

			let headerName: string = "Explore subscriptions";
			   let __page10: any = this;
   __page10 = __page10.getCsLoginPage(this.getConfig().getThinkContentURL());
   __page10 = __page10.loginToThinkContent(this.getPlayFiveUser().email, this.getPlayFiveUser().password);
   __page10 = __page10.navigateToPageByPath(this.EXPLORESUBSCRIPTIONPATH, SubscriptionPage);
   __page10 = __page10.waitForCard(SubscriptionPage);
   __page10 = __page10.scrolltoBottom("1000", SubscriptionPage);
   expect(__page10.loc_DIV_ByText(headerName)).toBeVisible({ timeout: 60000 });
   __page10 = __page10.scrolltoBottom("Downmost", SubscriptionPage);
   expect(__page10.loc_DIV_ByText(headerName)).toBeVisible({ timeout: 60000 });
		}

		public verifyStickyHeadersYourSubscription(): void {

			let headerName: string = "Your subscriptions";
			   let __page11: any = this;
   __page11 = __page11.getCsLoginPage(this.getConfig().getThinkContentURL());
   __page11 = __page11.loginToThinkContent(this.getPlayFiveUser().email, this.getPlayFiveUser().password);
   __page11 = __page11.navigateToPageByPath(this.YOURSUBSCRIPTIONPATH, SubscriptionPage);
   __page11 = __page11.waitForCard(SubscriptionPage);
   __page11 = __page11.scrolltoBottom("1000", SubscriptionPage);
   expect(__page11.loc_DIV_ByText(headerName)).toBeVisible({ timeout: 60000 });
   __page11 = __page11.scrolltoBottom("Downmost", SubscriptionPage);
   expect(__page11.loc_DIV_ByText(headerName)).toBeVisible({ timeout: 60000 });
		}

		public verifyGlobalSearchCountCP(): void {

			   let __page12: any = this;
   __page12 = __page12.getCsLoginPage(this.getConfig().getThinkContentURL());
   __page12 = __page12.loginToThinkContent(this.getPlayFiveUser().email, this.getPlayOneUser().password);
   __page12 = __page12.navigateToPageByPath(this.EXPLORESUBSCRIPTIONPATH, SubscriptionPage);
   __page12 = __page12.clickContentPartnersTab();
   __page12 = __page12.searchContentPartners(this.CONTENTPARTNER_TO_SEARCH_BOOKBOON);
   __page12 = __page12.clickContentPartnersCard(this.CONTENTPARTNER_TO_SEARCH_BOOKBOON);
   __page12 = __page12.getCourseCount(this.resultcount);
   __page12 = __page12.getPageClass(BrowseBySubjectPage);
   __page12 = __page12.fillGlobalSearchBoxWithOutQuote(this.CONTENTPARTNER_TO_SEARCH_BOOKBOON);
   __page12 = __page12.clickSearch();
   __page12 = __page12.waitForCard();
   __page12 = __page12.waitForCard(SubscriptionPage);
   expect(__page12.locateButtonText(this.resultcount.getValue())).toBeVisible({ timeout: 60000 });
		}

		public verifyGlobalSearchCountSubscription(): void {

			   let __page13: any = this;
   __page13 = __page13.getCsLoginPage(this.getConfig().getThinkContentURL());
   __page13 = __page13.loginToThinkContent(this.getPlayFiveUser().email, this.getPlayOneUser().password);
   __page13 = __page13.navigateToPageByPath(this.EXPLORESUBSCRIPTIONPATH, SubscriptionPage);
   __page13 = __page13.searchSubscription(this.SUBSCRIPTION_TO_SEARCH);
   __page13 = __page13.selectSubscription(this.SUBSCRIPTION_TO_SEARCH);
   __page13 = __page13.getCourseCount(this.resultcount);
   __page13 = __page13.getPageClass(BrowseBySubjectPage);
   __page13 = __page13.fillGlobalSearchBoxWithOutQuote(this.SUBSCRIPTION_TO_SEARCH);
   __page13 = __page13.clickSearch();
   __page13 = __page13.waitForCard();
   __page13 = __page13.waitForCard(SubscriptionPage);
   expect(__page13.locateButtonText(this.resultcount.getValue())).toBeVisible({ timeout: 60000 });
		}
}
