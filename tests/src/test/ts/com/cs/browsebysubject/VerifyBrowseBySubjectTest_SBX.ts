import { BaseTest } from "common/BaseTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { BrowseBySubjectAssertions } from "cs/assertions/BrowseBySubjectAssertions";
import { CourseDetailsAssertions } from "cs/assertions/CourseDetailsAssertions";
import { BrowseBySubjectPage } from "cs/pages/BrowseBySubjectPage";
import { CourseDetailsPage } from "cs/pages/CourseDetailsPage";
import { ResultContainer } from "models/ResultContainer";

export class VerifyBrowseBySubjectTest_SBX extends BaseTest {

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
	private readonly SORING_BY_RELEVANCE: string = "By relevance";
	private readonly LABEL_SUBSCRIBE: string = "Subscribed";
	private readonly LABEL_NEW: string = "New";
	private readonly LABEL_RETIRING: string = "Retiring";
	private readonly LABEL_SEARCHCOURSE: string = "Recognize Loneliness at Work";
	private LABEL_SEARCHCOURSE_RETIRE: string="Returning To Work: Protocols and Guidelines"; //Duty of Care for Workers
	private NEW_BADGE_COURSE: ResultContainer = new ResultContainer();

	//Fully implemented
	public verifyBrowseAndClearAllOption(): void {

		this.getCsLoginPage(this.getConfig().getSbxurl())
		.logintoSBX("CSUSERTWO", "welcome")
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
		.endAssertion()
		.clickDownArrow()
		.check(BrowseBySubjectAssertions)
		.assertThatHelpLinkIsVisible("Help")
		.endAssertion()
		.clickHelpLink(BrowseBySubjectPage);
	}

	//Fully implemented
	public searchCourseAndValidateAction(): void {

		let searchCourse: string = "8 Keys to a More Respectful Workplace";

		this.getCsLoginPage(this.getConfig().getSbxurl())
		.logintoSBX("CSUSERTWO", "welcome")
		.getPageClass(BrowseBySubjectPage)
		.fillGlobalSearchBox(searchCourse)
		.clickSearch()
		.actionsOnSubscriptionDetailsPage("Quick View", searchCourse)
		.check(BrowseBySubjectAssertions)
		.assertThatCoursePresentationVisible()
		.assertThatTitleDisplayed(searchCourse)
		.endAssertion()
		.clickCloseQuickViewDialog(searchCourse,BrowseBySubjectPage);
		//.logoutFromContentStudio(BrowseBySubjectPage);
	}

	// Fully Implemented
	public verifyBrowseBySubject(): void {

		this.getCsLoginPage(this.getConfig().getSbxurl())
		.logintoSBX("CSUSERTWO", "welcome")
		.getPageClass(BrowseBySubjectPage)
		.clickDownArrow()
		.selectSubject(this.SALES_AND_MARKETING_SUBJECT)
		.selectTopic(this.MARKETING_TOPIC)
		.clickBrowse()
		.check(BrowseBySubjectAssertions)
		.assertThatAppliedFilterIsVisible(this.FILTERLABEL_SUBJECTS, this.MARKETING_TOPIC)
		.endAssertion();
		//.logoutFromContentStudio(BrowseBySubjectPage);

	}

	// Fully Implemented
	public verifySubjectFilter(): void {
		this.getCsLoginPage(this.getConfig().getSbxurl())
		.logintoSBX("CSUSERTWO", "welcome")
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
		.endAssertion();
		//.logoutFromContentStudio(BrowseBySubjectPage);
	}

	// Fully Implemented
	public verifySubjectUnFilter(): void {
		this.getCsLoginPage(this.getConfig().getSbxurl())
		.logintoSBX("CSUSERTWO", "welcome")
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
		.endAssertion();
		//.logoutFromContentStudio(BrowseBySubjectPage);
	}

	public verifySortByTotalLearnerOption(): void {

		this.getCsLoginPage(this.getConfig().getSbxurl())
		.logintoSBX("CSUSERTWO", "welcome")
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

	//@Test
	public verifyBadgesNew(): void {


		this.getCsLoginPage(this.getConfig().getSbxurl())
		.logintoSBX("CSUSERTWO", "welcome")
		.getPageClass(BrowseBySubjectPage)
		.fillGlobalSearchBox("")
		.clickSearch()
		.waitForCard()
		.clickSortingDownArrowGlobalSearch(this.SORING_BY_TOTAL_LEARNER,BrowseBySubjectPage)
		.selectSortingOption(this.SORING_BY_NEWEST, BrowseBySubjectPage)
		.getNewBadgeCourse(this.NEW_BADGE_COURSE)
		.check(BrowseBySubjectAssertions)
		//.assertThatBadgeIsVisible(NEW_BADGE_COURSE.getValue(), LABEL_SUBSCRIBE)
		.assertThatBadgeIsVisible(this.NEW_BADGE_COURSE.getValue(), this.LABEL_NEW)
		.endAssertion()
		.actionsOnSubscriptionDetailsPage("Quick View", this.NEW_BADGE_COURSE.getValue())
		.check(BrowseBySubjectAssertions)
		.assertThatCoursePresentationVisible()
		.assertThatTitleDisplayed(this.NEW_BADGE_COURSE.getValue())
		//.assertThatBadgeIsVisible(NEW_BADGE_COURSE.getValue(), LABEL_SUBSCRIBE)
		.assertThatBadgeIsVisible(this.NEW_BADGE_COURSE.getValue(), this.LABEL_NEW)
		.endAssertion()
		.clickGoToDetails(CourseDetailsPage)
		.check(CourseDetailsAssertions)
		//.assertThatBadgeIsVisible(LABEL_SUBSCRIBE)
		.assertThatBadgeIsVisible(this.LABEL_NEW)
		.endAssertion()
		.goToLastPage()
		.clickCloseQuickViewDialog(this.NEW_BADGE_COURSE.getValue(), BrowseBySubjectPage);
		//.logoutFromContentStudio(BrowseBySubjectPage);
	}

	public verifyBadgesRetiring(): void {

		this.getCsLoginPage(this.getConfig().getSbxurl())
		.logintoSBX("CSUSERTWO", "welcome")
		.getPageClass(BrowseBySubjectPage)
		.fillGlobalSearchBox(this.LABEL_SEARCHCOURSE_RETIRE)
		.clickSearch()
		.waitForCard()
		.check(BrowseBySubjectAssertions)
		//.assertThatBadgeIsVisible(LABEL_SEARCHCOURSE_RETIRE, LABEL_SUBSCRIBE)
		.assertThatBadgeIsVisible(this.LABEL_SEARCHCOURSE_RETIRE, this.LABEL_RETIRING)
		.endAssertion()
		.actionsOnSubscriptionDetailsPage("Quick View", this.LABEL_SEARCHCOURSE_RETIRE)
		.check(BrowseBySubjectAssertions)
		.assertThatCoursePresentationVisible()
		.assertThatTitleDisplayed(this.LABEL_SEARCHCOURSE_RETIRE)
		//.assertThatBadgeIsVisible(LABEL_SEARCHCOURSE_RETIRE, LABEL_SUBSCRIBE)
		.assertThatBadgeIsVisible(this.LABEL_SEARCHCOURSE_RETIRE, this.LABEL_RETIRING)
		.endAssertion()
		.clickGoToDetails(CourseDetailsPage)
		.check(CourseDetailsAssertions)
		//.assertThatBadgeIsVisible(LABEL_SUBSCRIBE)
		.assertThatBadgeIsVisible(this.LABEL_RETIRING)
		.endAssertion()
		.goToLastPage()
		.clickCloseQuickViewDialog(this.LABEL_SEARCHCOURSE_RETIRE, BrowseBySubjectPage);
		//.logoutFromContentStudio(BrowseBySubjectPage);
	}
}
