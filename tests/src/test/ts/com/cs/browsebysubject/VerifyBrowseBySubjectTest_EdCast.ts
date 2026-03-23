import { BaseTest } from "common/BaseTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { BrowseBySubjectAssertions } from "cs/assertions/BrowseBySubjectAssertions";
import { CourseDetailsAssertions } from "cs/assertions/CourseDetailsAssertions";
import { BrowseBySubjectPage } from "cs/pages/BrowseBySubjectPage";
import { CourseDetailsPage } from "cs/pages/CourseDetailsPage";
import { ResultContainer } from "models/ResultContainer";

export class VerifyBrowseBySubjectTest_EdCast extends BaseTest {

	private readonly EXPLORESUBSCRIPTIONPATH: string[] = ["Subscriptions","Explore subscriptions"];
	private readonly COMPLIANCE_SUBJECT: string = "Compliance";
	private readonly SALES_AND_MARKETING_SUBJECT: string = "Sales and marketing";
	private readonly COMPLIANCE_EMPLOYMENT_LAW_TOPIC: string = "Compliance employment law";
	private readonly MARKETING_TOPIC: string = "Marketing";
	private readonly WORKPLACE_SAFETY_TOPIC: string = "Workplace safety";
	private readonly OSHA_TOPIC: string = "Osha";
	private readonly FIRE_PROTECTION: string = "Fire protection";
	private readonly LAW_TOPIC: string = "Law";
	private readonly FILTERLABEL_SUBJECTS: string = "Subjects";
	private readonly FILTERLABEL_TOPICS: string = "Topics";
	private readonly SORING_BY_NEWEST: string = "By newest";
	private readonly SORING_BY_TOTAL_LEARNER: string = "By total learners";
	private readonly SORING_BY_YOUR_LEARNER: string = "By your learners";
	private duration: ResultContainer = new ResultContainer();
	private language: ResultContainer = new ResultContainer();
	private subscription: ResultContainer = new ResultContainer();


	//Fully implemented
	public verifyBrowseAndClearAllOption(): void {

		this.getCsLoginPage(this.getConfig().getEdCastURL())
	    .navigateToLogin()
    	.loginToApplication(this.getPlayEdCastUserOne().email, this.getPlayEdCastUserOne().password)
    	.launchEdCastContentStudio()
		.getPageClass(BrowseBySubjectPage)
		.clickDownArrow()
		.selectSubject(this.COMPLIANCE_SUBJECT)
		.selectTopic(this.COMPLIANCE_EMPLOYMENT_LAW_TOPIC)
		.check(BrowseBySubjectAssertions)
		.assertThatTopicIsChecked(this.COMPLIANCE_EMPLOYMENT_LAW_TOPIC)
		.assertThatButtonIsVisible("Clear all")
		.endAssertion()
		.clickClearall()
		.check(BrowseBySubjectAssertions)
		.assertThatTopicIsNotChecked(this.COMPLIANCE_EMPLOYMENT_LAW_TOPIC)
		.assertThatButtonIsDisabled("Browse")
		.endAssertion();
	}

	//Fully implemented
	public searchCourseAndValidateAction(): void {

		let searchCourse: string = "8 Keys to a More Respectful Workplace";
		this.getCsLoginPage(this.getConfig().getEdCastURL())
	    .navigateToLogin()
    	.loginToApplication(this.getPlayEdCastUserOne().email, this.getPlayEdCastUserOne().password)
    	.launchEdCastContentStudio()
		.getPageClass(BrowseBySubjectPage)
		.fillGlobalSearchBox(searchCourse)
		.clickSearch()
		.actionsOnSubscriptionDetailsPage("Quick View", searchCourse)
		.check(BrowseBySubjectAssertions)
		.assertThatCoursePresentationVisible()
		.assertThatTitleDisplayed(searchCourse)
		.endAssertion()
		.clickCloseQuickViewDialog(searchCourse,BrowseBySubjectPage)
		.logoutFromContentStudio(BrowseBySubjectPage);
	}

	// Fully Implemented
	public verifyBrowseBySubject(): void {

		this.getCsLoginPage(this.getConfig().getEdCastURL())
	    .navigateToLogin()
    	.loginToApplication(this.getPlayEdCastUserOne().email, this.getPlayEdCastUserOne().password)
    	.launchEdCastContentStudio()
		.getPageClass(BrowseBySubjectPage)
		.clickDownArrow()
		.selectSubject(this.SALES_AND_MARKETING_SUBJECT)
		.selectTopic(this.MARKETING_TOPIC)
		.clickBrowse()
		.check(BrowseBySubjectAssertions)
		.assertThatAppliedFilterIsVisible(this.FILTERLABEL_SUBJECTS, this.MARKETING_TOPIC)
		.endAssertion()
		.check(BrowseBySubjectAssertions)
		.assertThatHelpLinkIsVisible("Help")
		.endAssertion()
		.clickHelpLink(BrowseBySubjectPage)
		.goToLastPageGlobal(BrowseBySubjectPage);
		//.logoutFromContentStudio(BrowseBySubjectPage);

	}

	// Fully Implemented
	public verifySubjectFilter(): void {

		this.getCsLoginPage(this.getConfig().getEdCastURL())
	    .navigateToLogin()
    	.loginToApplication(this.getPlayEdCastUserOne().email, this.getPlayEdCastUserOne().password)
    	.launchEdCastContentStudio()
		.getPageClass(BrowseBySubjectPage)
		.clickDownArrow()
		.selectSubject(this.COMPLIANCE_SUBJECT)
		.clickTopicArrow(this.WORKPLACE_SAFETY_TOPIC)
		.selectTopic(this.OSHA_TOPIC)
		.selectTopic(this.FIRE_PROTECTION)
		.selectSubject(this.COMPLIANCE_SUBJECT)
		.selectTopic(this.LAW_TOPIC)
		.check(BrowseBySubjectAssertions)
		.assertThatAppliedFilterCountIsVisible(this.COMPLIANCE_SUBJECT, "6")
		.assertThatAppliedFilterCountIsVisible(this.WORKPLACE_SAFETY_TOPIC, "2")
		.endAssertion()
		.clickBrowse()
		.check(BrowseBySubjectAssertions)
		.assertThatAppliedFilterIsVisible(this.FILTERLABEL_TOPICS, this.OSHA_TOPIC)
		.assertThatAppliedFilterIsVisible(this.FILTERLABEL_TOPICS, this.FIRE_PROTECTION)
		.assertThatAppliedFilterIsVisible(this.FILTERLABEL_SUBJECTS, this.LAW_TOPIC)
		.endAssertion()
		.logoutFromContentStudio(BrowseBySubjectPage);
	}

	// Fully Implemented
	public verifySubjectUnFilter(): void {

		this.getCsLoginPage(this.getConfig().getEdCastURL())
	    .navigateToLogin()
    	.loginToApplication(this.getPlayEdCastUserOne().email, this.getPlayEdCastUserOne().password)
    	.launchEdCastContentStudio()
		.getPageClass(BrowseBySubjectPage)
		.clickDownArrow()
		.selectSubject(this.COMPLIANCE_SUBJECT)
		.clickTopicArrow(this.WORKPLACE_SAFETY_TOPIC)
		.selectTopic(this.OSHA_TOPIC)
		.selectTopic(this.FIRE_PROTECTION)
		.selectSubject(this.COMPLIANCE_SUBJECT)
		.selectTopic(this.LAW_TOPIC)
		.check(BrowseBySubjectAssertions)
		.assertThatAppliedFilterCountIsVisible(this.COMPLIANCE_SUBJECT, "6")
		.assertThatAppliedFilterCountIsVisible(this.WORKPLACE_SAFETY_TOPIC, "2")
		.endAssertion()
		.clickTopicArrow(this.WORKPLACE_SAFETY_TOPIC)
		.UnselectTopic(this.OSHA_TOPIC)
		.UnselectTopic(this.FIRE_PROTECTION)
		.clickBrowse()
		.check(BrowseBySubjectAssertions)
		.assertThatAppliedFilterIsVisible(this.FILTERLABEL_SUBJECTS, this.LAW_TOPIC)
		.endAssertion()
		.logoutFromContentStudio(BrowseBySubjectPage);
	}

	public verifySortByTotalLearnerOption(): void {
		this.getCsLoginPage(this.getConfig().getEdCastURL())
	    .navigateToLogin()
    	.loginToApplication(this.getPlayEdCastUserOne().email, this.getPlayEdCastUserOne().password)
    	.launchEdCastContentStudio()
		.getPageClass(BrowseBySubjectPage)
		.clickDownArrow()
		.selectSubject(this.COMPLIANCE_SUBJECT)
		.clickTopicArrow(this.WORKPLACE_SAFETY_TOPIC)
		.selectTopic(this.OSHA_TOPIC)
		.clickBrowse()
		.clickSortingDownArrow(BrowseBySubjectPage)
		.check(BrowseBySubjectAssertions)
		.assertThatSortingOptionVisible(this.SORING_BY_NEWEST)
		.assertThatSortingOptionVisible(this.SORING_BY_TOTAL_LEARNER)
		.assertThatSortingOptionNotVisible(this.SORING_BY_YOUR_LEARNER)
		.endAssertion()
		.selectSortingOption(this.SORING_BY_NEWEST,BrowseBySubjectPage);
		//.logoutFromContentStudio(BrowseBySubjectPage);
	}

	public verifyQuickViewAndDetailsPageValues(): void {
		let searchCourse: string = "8 Keys to a More Respectful Workplace";

		this.getCsLoginPage(this.getConfig().getEdCastURL())
	    .navigateToLogin()
    	.loginToApplication(this.getPlayEdCastUserOne().email, this.getPlayEdCastUserOne().password)
    	.launchEdCastContentStudio()
    	.navigateToPageByPath(this.EXPLORESUBSCRIPTIONPATH, BrowseBySubjectPage)
		.fillGlobalSearchBox(searchCourse)
		.clickSearch()
		.actionsOnSubscriptionDetailsPage("Quick View", searchCourse)
		.check(BrowseBySubjectAssertions)
		.assertThatCoursePresentationVisible()
		.assertThatButtonIsVisible("All-time")
		.assertThatButtonIsVisible("Last Quarter")
		.assertThatYourLearnerTextVisible("Not subscribed yet")
		.assertThatTotalLearnerMetricTextVisible("(^\\d{1,2}.\\dk$)")
		.assertThatTitleDisplayed(searchCourse)
		.endAssertion()
		.getQuickViewDuration(this.duration,CourseDetailsPage)
		.getQuickViewLanguage(this.language,CourseDetailsPage)
		.getQuickViewSubscription(this.subscription,CourseDetailsPage)
		.clickGoToDetails(CourseDetailsPage)
		.check(CourseDetailsAssertions)
		.assertThatDurationIsVisible(this.duration.getValue())
		.assertThatLanguageIsVisible(this.language.getValue())
		.assertThatSubscriptionIsVisible(this.subscription.getValue())
		.endAssertion()
		.goToLastPage()
		.clickCloseQuickViewDialog(searchCourse,BrowseBySubjectPage);
		//.logoutFromContentStudio(BrowseBySubjectPage);

	}
}
