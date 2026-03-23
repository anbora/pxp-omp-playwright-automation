import { BaseTest } from "common/BaseTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { SubscriptionAssertions } from "cs/assertions/SubscriptionAssertions";
import { SubscriptionPage } from "cs/pages/SubscriptionPage";
import { ResultContainer } from "models/ResultContainer";

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

			  this.getCsLoginPage(this.getConfig().getEdCastURL())
			    .navigateToLogin()
		    	.loginToApplication(this.getPlayEdCastUserThree().email, this.getPlayEdCastUserThree().password)	//"cstester@csod.com", "Csod123"
		    	.launchEdCastContentStudio()
				.navigateToPageByPath(this.EXPLORESUBSCRIPTIONPATH, SubscriptionPage)
				.check(SubscriptionAssertions)
				.assertThatSubcriptionPresent(this.expectedSubscriptionOrder)
				.assertThatSubcriptionNotPresent(this.expectedSubscriptionNotPresent)
				.assertThatButtonWithOptionNotVisible(this.TEXT_CONTENT_PARTNERS)
				.endAssertion()
				.logoutFromContentStudio(SubscriptionPage);

	}

	public verifyHTMLLinkCornerstoneCuratedAndQuickViewDetailsView(): void {

			  this.getCsLoginPage(this.getConfig().getEdCastURL())
			    .navigateToLogin()
		    	.loginToApplication(this.getPlayEdCastUserThree().email, this.getPlayEdCastUserThree().password)	//"cstester@csod.com", "Csod123"
		    	.launchEdCastContentStudio()
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
				.endAssertion()
				.getQuickViewDuration(this.duration,SubscriptionPage)
				.getQuickViewLanguage(this.language,SubscriptionPage)
				.getQuickViewSubscription(this.subscription,SubscriptionPage)
				.clickGoToDetails()
				.check(SubscriptionAssertions)
				.assertThatReadMoreIsVisible()
				.endAssertion()
				.clickReadMore()
				.check(SubscriptionAssertions)
				.assertThatAboutCourseVisible("ABOUT THE COURSE")
				.assertThatDurationIsVisible(this.duration.getValue())
				.assertThatLanguageIsVisible(this.language.getValue())
				.assertThatSubscriptionIsVisible(this.subscription.getValue())
				.endAssertion()
				.logoutFromContentStudio(SubscriptionPage);

	}

	public verifySubscriptionsApplyRemoveFilters(): void {

			this.filter.put(this.CATEGORIES_FILTER_NAME, Arrays.asList(this.CATEGORIES_FILTERVALUE));
			this.filter.put(this.TOPIC_FILTER_NAME, Arrays.asList(this.TOPIC_FILTERVALUE));
			this.filter.put(this.MODALITIES_FILTER_NAME, Arrays.asList(this.MODALITIES_FILTERVALUE));
			this.filter.put(this.SKILLS_FILTER_NAME, Arrays.asList(this.SKILLS_FILTERVALUE));

			this.getCsLoginPage(this.getConfig().getEdCastURL())
		    .navigateToLogin()
	    	.loginToApplication(this.getPlayEdCastUserThree().email, this.getPlayEdCastUserThree().password)	//"cstester@csod.com", "Csod123"
	    	.launchEdCastContentStudio()
			.navigateToPageByPath(this.EXPLORESUBSCRIPTIONPATH, SubscriptionPage)
			.searchSubscription(this.SUBSCRIPTION_TO_SEARCH)
			.selectSubscription(this.SUBSCRIPTION_TO_SEARCH)
			.applySubscriptionFilter(this.filter)
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

	public verifySubscriptionsPageSortByTotalLearner(): void {

				this.getCsLoginPage(this.getConfig().getEdCastURL())
			    .navigateToLogin()
		    	.loginToApplication(this.getPlayEdCastUserThree().email, this.getPlayEdCastUserThree().password)	//"cstester@csod.com", "Csod123"
		    	.launchEdCastContentStudio()
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

}
