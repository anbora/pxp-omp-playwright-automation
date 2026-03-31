// @ts-nocheck
import { BaseTest } from "common/BaseTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { BrowseBySubjectPage } from "cs/pages/BrowseBySubjectPage";
import { CourseDetailsPage } from "cs/pages/CourseDetailsPage";
import { ResultContainer } from "models/ResultContainer";
import { expect } from "common/testing/playwright";

export class VerifyBrowseBySubjectTest_CSX extends BaseTest {

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

		  let __page1: any = this;
  __page1 = __page1.getCsLoginPage(this.getConfig().getThinkContentURL());
  __page1 = __page1.loginToThinkContent(this.getPlayOneUser().email, this.getPlayOneUser().password);
  __page1 = __page1.getPageClass(BrowseBySubjectPage);
  __page1 = __page1.clickDownArrow();
  __page1 = __page1.selectSubject(this.COMPLIANCE_SUBJECT);
  __page1 = __page1.selectTopic(this.COMPLIANCE_EMPLOYMENT_LAW_TOPIC);
  expect(__page1.select_Topic(this.COMPLIANCE_EMPLOYMENT_LAW_TOPIC)).toBeChecked();
  expect(__page1.browseSubjectButton("Clear all")).toBeVisible({ timeout: 30000 });
  __page1 = __page1.clickClearall();
  expect(__page1.selectTopic_Unchecked(this.COMPLIANCE_EMPLOYMENT_LAW_TOPIC)).toBeVisible({ timeout: 30000 });
  expect(__page1.browseSubjectButton("Browse")).toBeDisabled();
  __page1 = __page1.clickDownArrow();
  expect(__page1.badge_check("Help")).toBeVisible({ timeout: 60000 });
  __page1 = __page1.clickHelpLink(BrowseBySubjectPage);
	}

	//Fully implemented
	public searchCourseAndValidateAction(): void {

		let searchCourse: string = "8 Keys to a More Respectful Workplace";
		  let __page2: any = this;
  __page2 = __page2.getCsLoginPage(this.getConfig().getThinkContentURL());
  __page2 = __page2.loginToThinkContent(this.getPlayOneUser().email, this.getPlayOneUser().password);
  __page2 = __page2.getPageClass(BrowseBySubjectPage);
  __page2 = __page2.fillGlobalSearchBox(searchCourse);
  __page2 = __page2.clickSearch();
  __page2 = __page2.waitForCard();
  __page2 = __page2.actionsOnSubscriptionDetailsPage("Quick View", searchCourse);
  expect(__page2.quick_Course_Presentation_Opened).toBeVisible({ timeout: 30000 });
  expect(__page2.QV_COURSE_TITLE_VERIFICATION(searchCourse)).toBeVisible({ timeout: 30000 });
  __page2 = __page2.clickCloseQuickViewDialog(searchCourse, BrowseBySubjectPage);
		//.logoutFromContentStudio(BrowseBySubjectPage);
	}

	// Fully Implemented
	public verifyBrowseBySubject(): void {
		  let __page3: any = this;
  __page3 = __page3.getCsLoginPage(this.getConfig().getThinkContentURL());
  __page3 = __page3.loginToThinkContent(this.getPlayOneUser().email, this.getPlayOneUser().password);
  __page3 = __page3.getPageClass(BrowseBySubjectPage);
  __page3 = __page3.clickDownArrow();
  __page3 = __page3.selectSubject(this.SALES_AND_MARKETING_SUBJECT);
  __page3 = __page3.selectTopic(this.MARKETING_TOPIC);
  __page3 = __page3.clickBrowse();
  expect(__page3.verifyAppliedFilter(this.FILTERLABEL_SUBJECTS,this.MARKETING_TOPIC)).toBeVisible({ timeout: 30000 });
		//.logoutFromContentStudio(BrowseBySubjectPage);

	}

	// Fully Implemented
	public verifySubjectFilter(): void {
		  let __page4: any = this;
  __page4 = __page4.getCsLoginPage(this.getConfig().getThinkContentURL());
  __page4 = __page4.loginToThinkContent(this.getPlayOneUser().email, this.getPlayOneUser().password);
  __page4 = __page4.getPageClass(BrowseBySubjectPage);
  __page4 = __page4.clickDownArrow();
  __page4 = __page4.selectSubject(this.COMPLIANCE_SUBJECT);
  __page4 = __page4.clickTopicArrow(this.WORKPLACE_SAFETY_TOPIC);
  __page4 = __page4.selectTopic(this.OSHA_TOPIC);
  __page4 = __page4.selectTopic(this.FIRE_PROTECTION);
  __page4 = __page4.selectSubject(this.COMPLIANCE_SUBJECT);
  __page4 = __page4.selectTopic(this.LAW_TOPIC);
  expect(__page4.gsFilterCount(this.COMPLIANCE_SUBJECT,"6")).toBeVisible({ timeout: 30000 });
  expect(__page4.gsFilterCount(this.WORKPLACE_SAFETY_TOPIC,"2")).toBeVisible({ timeout: 30000 });
  __page4 = __page4.clickBrowse();
  expect(__page4.verifyAppliedFilter(this.FILTERLABEL_TOPICS,this.OSHA_TOPIC)).toBeVisible({ timeout: 30000 });
  expect(__page4.verifyAppliedFilter(this.FILTERLABEL_TOPICS,this.FIRE_PROTECTION)).toBeVisible({ timeout: 30000 });
  expect(__page4.verifyAppliedFilter(this.FILTERLABEL_SUBJECTS,this.LAW_TOPIC)).toBeVisible({ timeout: 30000 });
		//.logoutFromContentStudio(BrowseBySubjectPage);
	}

	// Fully Implemented
	public verifySubjectUnFilter(): void {
		  let __page5: any = this;
  __page5 = __page5.getCsLoginPage(this.getConfig().getThinkContentURL());
  __page5 = __page5.loginToThinkContent(this.getPlayOneUser().email, this.getPlayOneUser().password);
  __page5 = __page5.getPageClass(BrowseBySubjectPage);
  __page5 = __page5.clickDownArrow();
  __page5 = __page5.selectSubject(this.COMPLIANCE_SUBJECT);
  __page5 = __page5.clickTopicArrow(this.WORKPLACE_SAFETY_TOPIC);
  __page5 = __page5.selectTopic(this.OSHA_TOPIC);
  __page5 = __page5.selectTopic(this.FIRE_PROTECTION);
  __page5 = __page5.selectSubject(this.COMPLIANCE_SUBJECT);
  __page5 = __page5.selectTopic(this.LAW_TOPIC);
  expect(__page5.gsFilterCount(this.COMPLIANCE_SUBJECT,"6")).toBeVisible({ timeout: 30000 });
  expect(__page5.gsFilterCount(this.WORKPLACE_SAFETY_TOPIC,"2")).toBeVisible({ timeout: 30000 });
  __page5 = __page5.clickTopicArrow(this.WORKPLACE_SAFETY_TOPIC);
  __page5 = __page5.UnselectTopic(this.OSHA_TOPIC);
  __page5 = __page5.UnselectTopic(this.FIRE_PROTECTION);
  __page5 = __page5.clickBrowse();
  expect(__page5.verifyAppliedFilter(this.FILTERLABEL_SUBJECTS,this.LAW_TOPIC)).toBeVisible({ timeout: 30000 });
		//.logoutFromContentStudio(BrowseBySubjectPage);
	}

	public verifySortByTotalLearnerOption(): void {

		  let __page6: any = this;
  __page6 = __page6.getCsLoginPage(this.getConfig().getThinkContentURL());
  __page6 = __page6.loginToThinkContent(this.getPlayOneUser().email, this.getPlayOneUser().password);
  __page6 = __page6.getPageClass(BrowseBySubjectPage);
  __page6 = __page6.clickDownArrow();
  __page6 = __page6.selectSubject(this.COMPLIANCE_SUBJECT);
  __page6 = __page6.clickTopicArrow(this.WORKPLACE_SAFETY_TOPIC);
  __page6 = __page6.selectTopic(this.OSHA_TOPIC);
  __page6 = __page6.clickBrowse();
  __page6 = __page6.clickSortingDownArrow(BrowseBySubjectPage);
  expect(__page6.sortingOption(this.SORING_BY_NEWEST)).toBeVisible({ timeout: 60000 });
  expect(__page6.sortingOption(this.SORING_BY_TOTAL_LEARNER)).toBeVisible({ timeout: 60000 });
  expect(__page6.sortingOption(this.SORING_BY_YOUR_LEARNER)).not.toBeVisible({ timeout: 60000 });
  __page6 = __page6.selectSortingOption(this.SORING_BY_NEWEST, BrowseBySubjectPage);
		//.logoutFromContentStudio(BrowseBySubjectPage);
	}

	//@Test
	public verifyBadgesNew(): void {


		  let __page7: any = this;
  __page7 = __page7.getCsLoginPage(this.getConfig().getThinkContentURL());
  __page7 = __page7.loginToThinkContent(this.getPlayOneUser().email, this.getPlayOneUser().password);
  __page7 = __page7.getPageClass(BrowseBySubjectPage);
  __page7 = __page7.fillGlobalSearchBox("");
  __page7 = __page7.clickSearch();
  __page7 = __page7.waitForCard();
  __page7 = __page7.clickSortingDownArrowGlobalSearch(this.SORING_BY_TOTAL_LEARNER, BrowseBySubjectPage);
  __page7 = __page7.selectSortingOption(this.SORING_BY_NEWEST, BrowseBySubjectPage);
  __page7 = __page7.getNewBadgeCourse(this.NEW_BADGE_COURSE);
  expect(__page7.card_label(this.NEW_BADGE_COURSE.getValue(),this.LABEL_SUBSCRIBE)).toBeVisible({ timeout: 60000 });
  expect(__page7.card_label(this.NEW_BADGE_COURSE.getValue(),this.LABEL_NEW)).toBeVisible({ timeout: 60000 });
  __page7 = __page7.actionsOnSubscriptionDetailsPage("Quick View", this.NEW_BADGE_COURSE.getValue());
  expect(__page7.quick_Course_Presentation_Opened).toBeVisible({ timeout: 30000 });
  expect(__page7.QV_COURSE_TITLE_VERIFICATION(this.NEW_BADGE_COURSE.getValue())).toBeVisible({ timeout: 30000 });
  expect(__page7.card_label(this.NEW_BADGE_COURSE.getValue(),this.LABEL_SUBSCRIBE)).toBeVisible({ timeout: 60000 });
  expect(__page7.card_label(this.NEW_BADGE_COURSE.getValue(),this.LABEL_NEW)).toBeVisible({ timeout: 60000 });
  __page7 = __page7.clickGoToDetails(CourseDetailsPage);
  expect(__page7.badge_check(this.LABEL_SUBSCRIBE)).toBeVisible({ timeout: 60000 });
  expect(__page7.badge_check(this.LABEL_NEW)).toBeVisible({ timeout: 60000 });
  __page7 = __page7.goToLastPage();
  __page7 = __page7.clickCloseQuickViewDialog(this.NEW_BADGE_COURSE.getValue(), BrowseBySubjectPage);
		//.logoutFromContentStudio(BrowseBySubjectPage);
	}

	public verifyBadgesRetiring(): void {

		  let __page8: any = this;
  __page8 = __page8.getCsLoginPage(this.getConfig().getThinkContentURL());
  __page8 = __page8.loginToThinkContent(this.getPlayOneUser().email, this.getPlayOneUser().password);
  __page8 = __page8.getPageClass(BrowseBySubjectPage);
  __page8 = __page8.fillGlobalSearchBox(this.LABEL_SEARCHCOURSE_RETIRE);
  __page8 = __page8.clickSearch();
  __page8 = __page8.waitForCard();
  expect(__page8.card_label(this.LABEL_SEARCHCOURSE_RETIRE,this.LABEL_SUBSCRIBE)).toBeVisible({ timeout: 60000 });
  expect(__page8.card_label(this.LABEL_SEARCHCOURSE_RETIRE,this.LABEL_RETIRING)).toBeVisible({ timeout: 60000 });
  __page8 = __page8.actionsOnSubscriptionDetailsPage("Quick View", this.LABEL_SEARCHCOURSE_RETIRE);
  expect(__page8.quick_Course_Presentation_Opened).toBeVisible({ timeout: 30000 });
  expect(__page8.QV_COURSE_TITLE_VERIFICATION(this.LABEL_SEARCHCOURSE_RETIRE)).toBeVisible({ timeout: 30000 });
  expect(__page8.card_label(this.LABEL_SEARCHCOURSE_RETIRE,this.LABEL_SUBSCRIBE)).toBeVisible({ timeout: 60000 });
  expect(__page8.card_label(this.LABEL_SEARCHCOURSE_RETIRE,this.LABEL_RETIRING)).toBeVisible({ timeout: 60000 });
  __page8 = __page8.clickGoToDetails(CourseDetailsPage);
  expect(__page8.badge_check(this.LABEL_RETIRING)).toBeVisible({ timeout: 60000 });
  __page8 = __page8.goToLastPage();
  __page8 = __page8.clickCloseQuickViewDialog(this.LABEL_SEARCHCOURSE_RETIRE, BrowseBySubjectPage);
		//.logoutFromContentStudio(BrowseBySubjectPage);
	}
}
