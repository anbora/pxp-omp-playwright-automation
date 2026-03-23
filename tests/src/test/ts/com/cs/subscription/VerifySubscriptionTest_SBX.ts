import { BaseTest } from "common/BaseTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { CourseDetailsAssertions } from "cs/assertions/CourseDetailsAssertions";
import { SubscriptionAssertions } from "cs/assertions/SubscriptionAssertions";
import { BrowseBySubjectPage } from "cs/pages/BrowseBySubjectPage";
import { CourseDetailsPage } from "cs/pages/CourseDetailsPage";
import { SubscriptionPage } from "cs/pages/SubscriptionPage";

export class VerifySubscriptionTest_SBX extends BaseTest{

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
	private readonly SEARCHCOURSE_NEW_BADGE: string = "SQL for Non-Technical Users";
	private SEARCHCOURSE_RETIRE_BADGE: string="Agile Project Management Overview"; //Learning Python,Azure – Introduction to Azure
	private readonly CC_TAB: string = "Cornerstone Curated";
	private readonly CP_TAB: string = "Content Partners";
	private readonly SUBSCRIPTION_Filter: string = "Cornerstone Professional Skills";
	private readonly ACCREDITATION_FILTER_NAME: string = "Accreditation Body";
	private readonly PROFICIENCY_FILTER_NAME: string = "Proficiency";
	private readonly LANGUAGE_TYPE_FILTER_NAME: string = "languageType";
	private readonly ACCREDITATION_FILTERVALUE: string[] = ["Hrci"];
	private readonly PROFICIENCY_FILTERVALUE: string[] = ["Beginner","Expert"];
	private LANGUAGE_TYPE_FILTERVALUE: string[] = ["Dubbed","Original","Subtitled"];


	//Fully Implemented
	public verifySubscriptionOrder(): void {

		this.getCsLoginPage(this.getConfig().getSbxurl())
		.logintoSBX("CSUSERFOUR", "welcome")
		.navigateToPageByPath(this.EXPLORESUBSCRIPTIONPATH, SubscriptionPage)
		.check(SubscriptionAssertions)
		.assertThatSubcriptionPresent(this.expectedSubscriptionOrder)
		.assertThatSubcriptionNotPresent(this.expectedSubscriptionNotPresent)
		.assertThatButtonWithOptionVisible(this.CC_TAB)
		.assertThatButtonWithOptionVisible(this.CP_TAB)
		.endAssertion();
	}

	//@Test
	//Fully Implemented
	public verifyHTMLLinkCornerstoneCurated(): void {

		this.getCsLoginPage(this.getConfig().getThinkContentURL())
		.loginToThinkContent(this.getPlayFiveUser().email, this.getPlayOneUser().password)
		.navigateToPageByPath(this.EXPLORESUBSCRIPTIONPATH, SubscriptionPage)
		.searchSubscription(this.SUBSCRIPTION_TO_SEARCH)
		.selectSubscription(this.SUBSCRIPTION_TO_SEARCH)
		.searchCourse(this.COURSE_TO_SEARCH)
		.clickQuickView(this.COURSE_TO_SEARCH)
		.check(SubscriptionAssertions)
		.assertThatButtonWithOptionVisible("All-time")
		.assertThatButtonWithOptionVisible("Last Quarter")
		.assertThatYourLearnerMetricVisible(this.YOURLEARNERCOUNT_CC)
		.assertThatTotalLearnerMetricVisible(this.TOTALLEARNERCOUNT_CC)
		.assertThatQuickViewDurationIsVisible(this.COURSE_TO_SEARCH)
		.endAssertion()
		.clickGoToDetails()
		.check(SubscriptionAssertions)
		.assertThatReadMoreIsVisible()
		.endAssertion()
		.clickReadMore()
		.check(SubscriptionAssertions)
		.assertThatAboutCourseVisible("ABOUT THE COURSE")
		.endAssertion();
	}

	//@Test
	//Fully Implemented
	public verifyHTMLLinkCornerstonePartner(): void {

		this.getCsLoginPage(this.getConfig().getThinkContentURL())
		.loginToThinkContent(this.getPlayFiveUser().email, this.getPlayOneUser().password)
		.navigateToPageByPath(this.EXPLORESUBSCRIPTIONPATH, SubscriptionPage)
		.clickContentPartnersTab()
		.searchContentPartners(this.CONTENTPARTNER_TO_SEARCH)
		.clickContentPartnersCard(this.CONTENTPARTNER_TO_SEARCH)
		.searchCourse(this.CONTENTPARTNERCOURSE_SEARCH)
		.clickQuickView(this.CONTENTPARTNERCOURSE_SEARCH)
		.check(SubscriptionAssertions)
		.assertThatButtonWithOptionVisible("All-time")
		.assertThatButtonWithOptionVisible("Last Quarter")
		.assertThatYourLearnerTextVisible()
		.assertThatTotalLearnerMetricTextVisible()
		.assertThatQuickViewDurationIsVisible(this.CONTENTPARTNER_TO_SEARCH)
		.endAssertion()
		.clickGoToDetails()
		//.check(SubscriptionAssertions)
		//.assertThatReadMoreIsVisible()
		//.endAssertion()
		//.clickReadMore()
		.check(SubscriptionAssertions)
		.assertThatAboutCourseVisible("ABOUT THE COURSE")
		.endAssertion();
		//.logoutFromContentStudio(SubscriptionPage);
	}

	//@Test
	//Fully Implemented
	public verifySubscriptionsApplyRemoveFilters(): void {

		let filter: HashMap<string, Array<string>> = new HashMap();

		filter.put(this.CATEGORIES_FILTER_NAME, Arrays.asList(this.CATEGORIES_FILTERVALUE));
		filter.put(this.TOPIC_FILTER_NAME, Arrays.asList(this.TOPIC_FILTERVALUE));
		filter.put(this.MODALITIES_FILTER_NAME, Arrays.asList(this.MODALITIES_FILTERVALUE));
		filter.put(this.SKILLS_FILTER_NAME, Arrays.asList(this.SKILLS_FILTERVALUE));

		this.getCsLoginPage(this.getConfig().getThinkContentURL())
		.loginToThinkContent(this.getPlayFiveUser().email, this.getPlayOneUser().password)
		.navigateToPageByPath(this.EXPLORESUBSCRIPTIONPATH, SubscriptionPage)
		.searchSubscription(this.SUBSCRIPTION_TO_SEARCH)
		.selectSubscription(this.SUBSCRIPTION_TO_SEARCH)
		.applySubscriptionFilter(filter)
		.clickApplyFilterButton()
		.check(SubscriptionAssertions)
		.assertThatAppliedFilterVisible(this.CATEGORIES_FILTER_NAME, this.CATEGORIES_FILTERVALUE[0])
		.assertThatAppliedFilterVisible(this.TOPIC_FILTER_NAME, this.TOPIC_FILTERVALUE[1])
		.assertThatAppliedFilterVisible(this.MODALITIES_FILTER_NAME, this.MODALITIES_FILTERVALUE[0])
		.assertThatAppliedFilterVisible(this.SKILLS_FILTER_NAME, this.SKILLS_FILTERVALUE[1])
		.endAssertion()
		.clickclearFilterIcon(this.CATEGORIES_FILTERVALUE[0])
		.check(SubscriptionAssertions)
		.assertThatAppliedFilterNotVisible("Categories", this.CATEGORIES_FILTERVALUE[0])
		.endAssertion()
		.clickClearAllFilters(SubscriptionPage)
		.check(SubscriptionAssertions)
		.assertThatAppliedFilterNotVisible(this.CATEGORIES_FILTER_NAME, this.CATEGORIES_FILTERVALUE[0])
		.assertThatAppliedFilterNotVisible(this.TOPIC_FILTER_NAME, this.TOPIC_FILTERVALUE[1])
		.assertThatAppliedFilterNotVisible(this.MODALITIES_FILTER_NAME, this.MODALITIES_FILTERVALUE[0])
		.assertThatAppliedFilterNotVisible(this.SKILLS_FILTER_NAME, this.SKILLS_FILTERVALUE[0])
		.endAssertion();
		//.logoutFromContentStudio(SubscriptionPage);
	}

	//@Test
	public verifySubscriptionsPageSortByTotalLearner(): void {

		this.getCsLoginPage(this.getConfig().getThinkContentURL())
		.loginToThinkContent(this.getPlayFiveUser().email, this.getPlayOneUser().password)
		.navigateToPageByPath(this.EXPLORESUBSCRIPTIONPATH, SubscriptionPage)
		.searchSubscription(this.SUBSCRIPTION_TO_SEARCH)
		.selectSubscription(this.SUBSCRIPTION_TO_SEARCH)
		.clickSortingDownArrow()
		.check(SubscriptionAssertions)
		.assertThatSortingOptionVisible(this.SORING_BY_TOTALLEARNER)
		.endAssertion()
		.selectSortingOption(this.SORING_BY_TOTALLEARNER);
		//.logoutFromContentStudio(SubscriptionPage);
	}

	//@Test
	 public verifyNewBadge(): void {

		 this.getCsLoginPage(this.getConfig().getThinkContentURL())
		 .loginToThinkContent(this.getPlayFiveUser().email, this.getPlayOneUser().password)
		 .navigateToPageByPath(this.EXPLORESUBSCRIPTIONPATH, SubscriptionPage)
		 .searchSubscription(this.SUBSCRIPTION_TO_SEARCH)
		 .selectSubscription(this.SUBSCRIPTION_TO_SEARCH)
		 .searchCourse(this.SEARCHCOURSE_NEW_BADGE)
		 .waitForCard(SubscriptionPage)
		 .check(SubscriptionAssertions)
		 .assertThatBadgeIsVisible(this.SEARCHCOURSE_NEW_BADGE, this.LABEL_SUBSCRIBE)
		 .assertThatBadgeIsVisible(this.SEARCHCOURSE_NEW_BADGE, this.LABEL_NEW)
		 .endAssertion()
		 .clickQuickView(this.SEARCHCOURSE_NEW_BADGE,SubscriptionPage)
		 .check(SubscriptionAssertions)
		 .assertThatBadgeIsVisible(this.SEARCHCOURSE_NEW_BADGE, this.LABEL_SUBSCRIBE)
		 .assertThatBadgeIsVisible(this.SEARCHCOURSE_NEW_BADGE, this.LABEL_NEW)
		 .assertThatQuickViewDurationIsVisible(this.SEARCHCOURSE_NEW_BADGE)
		 .endAssertion()
		 .clickGoToDetails(CourseDetailsPage)
		 .check(CourseDetailsAssertions)
		 .assertThatBadgeIsVisible(this.LABEL_SUBSCRIBE)
		 .assertThatBadgeIsVisible(this.LABEL_NEW)
		 .endAssertion()
		 .goToLastPage()
		 .clickCloseQuickViewDialog(this.SEARCHCOURSE_NEW_BADGE, BrowseBySubjectPage);
	  }

	 // @Test
	  public verifyRetireBadge(): void {

		  this.getCsLoginPage(this.getConfig().getThinkContentURL())
		  .loginToThinkContent(this.getPlayFiveUser().email, this.getPlayOneUser().password)
		  .navigateToPageByPath(this.EXPLORESUBSCRIPTIONPATH, SubscriptionPage)
			.searchSubscription(this.SUBSCRIPTION_TO_SEARCH)
			.selectSubscription(this.SUBSCRIPTION_TO_SEARCH)
			.searchCourse(this.SEARCHCOURSE_RETIRE_BADGE)
			.waitForCard(SubscriptionPage)
			.check(SubscriptionAssertions)
			.assertThatBadgeIsVisible(this.SEARCHCOURSE_RETIRE_BADGE, this.LABEL_SUBSCRIBE)
			.assertThatBadgeIsVisible(this.SEARCHCOURSE_RETIRE_BADGE, this.LABEL_RETIRING)
			.endAssertion()
			.clickQuickView(this.SEARCHCOURSE_RETIRE_BADGE,SubscriptionPage)
			.check(SubscriptionAssertions)
			.assertThatBadgeIsVisible(this.SEARCHCOURSE_RETIRE_BADGE, this.LABEL_SUBSCRIBE)
			.assertThatBadgeIsVisible(this.SEARCHCOURSE_RETIRE_BADGE, this.LABEL_RETIRING)
			.assertThatQuickViewDurationIsVisible(this.SEARCHCOURSE_RETIRE_BADGE)
			.endAssertion()
			.clickGoToDetails(CourseDetailsPage)
			.check(CourseDetailsAssertions)
			.assertThatBadgeIsVisible(this.LABEL_SUBSCRIBE)
			.assertThatBadgeIsVisible(this.LABEL_RETIRING)
			.endAssertion()
			.goToLastPage()
			.clickCloseQuickViewDialog(this.SEARCHCOURSE_RETIRE_BADGE, BrowseBySubjectPage);
	  }

	  //@Test(description = "CP-1575,CP-1904")
	  public verifyNewFiltersCornerstoneCurated(): void {

		  let filter: HashMap<string, Array<string>> = new HashMap();

		  filter.put("Accreditation Body",Arrays.asList(this.ACCREDITATION_FILTERVALUE));
		  filter.put("Proficiency",Arrays.asList(this.PROFICIENCY_FILTERVALUE));
		  filter.put("languageType",Arrays.asList(this.LANGUAGE_TYPE_FILTERVALUE));

		  this.getCsLoginPage(this.getConfig().getThinkContentURL())
		  .loginToThinkContent(this.getPlayFiveUser().email, this.getPlayOneUser().password)
		  .navigateToPageByPath(this.EXPLORESUBSCRIPTIONPATH, SubscriptionPage)
		  .searchSubscription(this.SUBSCRIPTION_Filter)
		  .selectSubscription(this.SUBSCRIPTION_Filter)
		  .clickAllFilters(SubscriptionPage)
		  .check(SubscriptionAssertions)
		  .assertThatFilterIsVisible("Accreditation Body")
		  .assertThatFilterIsVisible("Proficiency")
		  .assertThatFilterIsVisible("languageType")
		  .endAssertion()
		  .clickCloseIcon(SubscriptionPage)
		  .applySubscriptionFilter(filter)
		  .clickApplyFilterButton()
		  .check(SubscriptionAssertions)
		  .assertThatAppliedFilterVisible(this.ACCREDITATION_FILTER_NAME,this.ACCREDITATION_FILTERVALUE[0])
		  .assertThatAppliedFilterVisible(this.PROFICIENCY_FILTER_NAME,this.PROFICIENCY_FILTERVALUE[0])
		  .assertThatAppliedFilterVisible(this.PROFICIENCY_FILTER_NAME,this.PROFICIENCY_FILTERVALUE[1])
		  .assertThatAppliedFilterVisible(this.LANGUAGE_TYPE_FILTER_NAME,this.LANGUAGE_TYPE_FILTERVALUE[0])
		  .assertThatAppliedFilterVisible(this.LANGUAGE_TYPE_FILTER_NAME,this.LANGUAGE_TYPE_FILTERVALUE[1])
		  .assertThatAppliedFilterVisible(this.LANGUAGE_TYPE_FILTER_NAME,this.LANGUAGE_TYPE_FILTERVALUE[2])
		  .endAssertion();
		}

		//@Test(description = "CP-1575,CP-1904")

		public verifyNewFilterContentPartner(): void {

			const ACCREDITATION_FILTERVALUE_CP: string[] = ["Project management institute (pmi)"];
			const LANGUAGE_TYPE_FILTERVALUE_CP: string[] = ["Original"];
			let filterAccri: HashMap<string, Array<string>> = new HashMap();
			let filter: HashMap<string, Array<string>> = new HashMap();

			filterAccri.put("Accreditation Body",Arrays.asList(ACCREDITATION_FILTERVALUE_CP));
			filter.put("Proficiency",Arrays.asList(this.PROFICIENCY_FILTERVALUE));
			filter.put("languageType",Arrays.asList(LANGUAGE_TYPE_FILTERVALUE_CP));

			this.getCsLoginPage(this.getConfig().getThinkContentURL())
			.loginToThinkContent(this.getPlayFiveUser().email, this.getPlayOneUser().password)
			.navigateToPageByPath(this.EXPLORESUBSCRIPTIONPATH, SubscriptionPage)
			.clickContentPartnersTab()
			.searchContentPartners("Cegos")
			.clickContentPartnersCard("Cegos")
			.clickAllFilters(SubscriptionPage)
			.check(SubscriptionAssertions)
			.assertThatFilterIsVisible("Accreditation Body")
			.endAssertion()
			.clickCloseIcon(SubscriptionPage)
			.applySubscriptionFilter(filterAccri)
			.clickApplyFilterButton()
			.check(SubscriptionAssertions)
			.assertThatAppliedFilterVisible(this.ACCREDITATION_FILTER_NAME,ACCREDITATION_FILTERVALUE_CP[0])
			.endAssertion()
			.clickClearAllFilters(SubscriptionPage)
			.navigateToPageByPath(this.EXPLORESUBSCRIPTIONPATH, SubscriptionPage)
			.clickContentPartnersTab()
			.searchContentPartners("CyberU")
			.clickContentPartnersCard("CyberU")
			.clickAllFilters(SubscriptionPage)
			.check(SubscriptionAssertions)
			.assertThatFilterIsVisible("Proficiency")
			.assertThatFilterIsVisible("languageType")
			.endAssertion()
			.clickCloseIcon(SubscriptionPage)
			.applySubscriptionFilter(filter)
			.clickApplyFilterButton()
			.check(SubscriptionAssertions)
			.assertThatAppliedFilterVisible(this.PROFICIENCY_FILTER_NAME,this.PROFICIENCY_FILTERVALUE[0])
			.assertThatAppliedFilterVisible(this.PROFICIENCY_FILTER_NAME,this.PROFICIENCY_FILTERVALUE[1])
			.assertThatAppliedFilterVisible(this.LANGUAGE_TYPE_FILTER_NAME,LANGUAGE_TYPE_FILTERVALUE_CP[0])
			.endAssertion();
		  }

		public verifyStickyHeadersExploreSubscription(): void {

			let headerName: string = "Explore subscriptions";
			this.getCsLoginPage(this.getConfig().getSbxurl())
			.logintoSBX("CSUSERFOUR", "welcome")
			.navigateToPageByPath(this.EXPLORESUBSCRIPTIONPATH, SubscriptionPage)
			.waitForCard(SubscriptionPage)
			.scrolltoBottom("1000",SubscriptionPage)
			.check(SubscriptionAssertions)
			.assertThatStickyHeaderVisible(headerName)
			.endAssertion()
			.scrolltoBottom("Downmost",SubscriptionPage)
			.check(SubscriptionAssertions)
			.assertThatStickyHeaderVisible(headerName)
			.endAssertion();
		}

		public verifyStickyHeadersYourSubscription(): void {

			let headerName: string = "Your subscriptions";
			this.getCsLoginPage(this.getConfig().getSbxurl())
			.logintoSBX("CSUSERFOUR", "welcome")
			.navigateToPageByPath(this.YOURSUBSCRIPTIONPATH, SubscriptionPage)
			.waitForCard(SubscriptionPage)
			.scrolltoBottom("1000",SubscriptionPage)
			.check(SubscriptionAssertions)
			.assertThatStickyHeaderVisible(headerName)
			.endAssertion()
			.scrolltoBottom("Downmost",SubscriptionPage)
			.check(SubscriptionAssertions)
			.assertThatStickyHeaderVisible(headerName)
			.endAssertion();
		}
}
