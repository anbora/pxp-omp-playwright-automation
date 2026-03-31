// @ts-nocheck
import { BaseTest } from "common/BaseTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { BrowseBySubjectPage } from "cs/pages/BrowseBySubjectPage";
import { CourseDetailsPage } from "cs/pages/CourseDetailsPage";
import { ResultContainer } from "models/ResultContainer";
import { expect } from "common/testing/playwright";

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

		  let __page1: any = this;
  __page1 = __page1.getCsLoginPage(this.getConfig().getEdCastURL());
  __page1 = __page1.navigateToLogin();
  __page1 = __page1.loginToApplication(this.getPlayEdCastUserOne().email, this.getPlayEdCastUserOne().password);
  __page1 = __page1.launchEdCastContentStudio();
  __page1 = __page1.getPageClass(BrowseBySubjectPage);
  __page1 = __page1.clickDownArrow();
  __page1 = __page1.selectSubject(this.COMPLIANCE_SUBJECT);
  __page1 = __page1.selectTopic(this.COMPLIANCE_EMPLOYMENT_LAW_TOPIC);
  expect(__page1.select_Topic(this.COMPLIANCE_EMPLOYMENT_LAW_TOPIC)).toBeChecked();
  expect(__page1.browseSubjectButton("Clear all")).toBeVisible({ timeout: 30000 });
  __page1 = __page1.clickClearall();
  expect(__page1.selectTopic_Unchecked(this.COMPLIANCE_EMPLOYMENT_LAW_TOPIC)).toBeVisible({ timeout: 30000 });
  expect(__page1.browseSubjectButton("Browse")).toBeDisabled();
	}

	//Fully implemented
	public searchCourseAndValidateAction(): void {

		let searchCourse: string = "8 Keys to a More Respectful Workplace";
		  let __page2: any = this;
  __page2 = __page2.getCsLoginPage(this.getConfig().getEdCastURL());
  __page2 = __page2.navigateToLogin();
  __page2 = __page2.loginToApplication(this.getPlayEdCastUserOne().email, this.getPlayEdCastUserOne().password);
  __page2 = __page2.launchEdCastContentStudio();
  __page2 = __page2.getPageClass(BrowseBySubjectPage);
  __page2 = __page2.fillGlobalSearchBox(searchCourse);
  __page2 = __page2.clickSearch();
  __page2 = __page2.actionsOnSubscriptionDetailsPage("Quick View", searchCourse);
  expect(__page2.quick_Course_Presentation_Opened).toBeVisible({ timeout: 30000 });
  expect(__page2.QV_COURSE_TITLE_VERIFICATION(searchCourse)).toBeVisible({ timeout: 30000 });
  __page2 = __page2.clickCloseQuickViewDialog(searchCourse, BrowseBySubjectPage);
  __page2 = __page2.logoutFromContentStudio(BrowseBySubjectPage);
	}

	// Fully Implemented
	public verifyBrowseBySubject(): void {

		  let __page3: any = this;
  __page3 = __page3.getCsLoginPage(this.getConfig().getEdCastURL());
  __page3 = __page3.navigateToLogin();
  __page3 = __page3.loginToApplication(this.getPlayEdCastUserOne().email, this.getPlayEdCastUserOne().password);
  __page3 = __page3.launchEdCastContentStudio();
  __page3 = __page3.getPageClass(BrowseBySubjectPage);
  __page3 = __page3.clickDownArrow();
  __page3 = __page3.selectSubject(this.SALES_AND_MARKETING_SUBJECT);
  __page3 = __page3.selectTopic(this.MARKETING_TOPIC);
  __page3 = __page3.clickBrowse();
  expect(__page3.verifyAppliedFilter(this.FILTERLABEL_SUBJECTS,this.MARKETING_TOPIC)).toBeVisible({ timeout: 30000 });
  expect(__page3.badge_check("Help")).toBeVisible({ timeout: 60000 });
  __page3 = __page3.clickHelpLink(BrowseBySubjectPage);
  __page3 = __page3.goToLastPageGlobal(BrowseBySubjectPage);
		//.logoutFromContentStudio(BrowseBySubjectPage);

	}

	// Fully Implemented
	public verifySubjectFilter(): void {

		  let __page4: any = this;
  __page4 = __page4.getCsLoginPage(this.getConfig().getEdCastURL());
  __page4 = __page4.navigateToLogin();
  __page4 = __page4.loginToApplication(this.getPlayEdCastUserOne().email, this.getPlayEdCastUserOne().password);
  __page4 = __page4.launchEdCastContentStudio();
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
  __page4 = __page4.logoutFromContentStudio(BrowseBySubjectPage);
	}

	// Fully Implemented
	public verifySubjectUnFilter(): void {

		  let __page5: any = this;
  __page5 = __page5.getCsLoginPage(this.getConfig().getEdCastURL());
  __page5 = __page5.navigateToLogin();
  __page5 = __page5.loginToApplication(this.getPlayEdCastUserOne().email, this.getPlayEdCastUserOne().password);
  __page5 = __page5.launchEdCastContentStudio();
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
  __page5 = __page5.logoutFromContentStudio(BrowseBySubjectPage);
	}

	public verifySortByTotalLearnerOption(): void {
		  let __page6: any = this;
  __page6 = __page6.getCsLoginPage(this.getConfig().getEdCastURL());
  __page6 = __page6.navigateToLogin();
  __page6 = __page6.loginToApplication(this.getPlayEdCastUserOne().email, this.getPlayEdCastUserOne().password);
  __page6 = __page6.launchEdCastContentStudio();
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

	public verifyQuickViewAndDetailsPageValues(): void {
		let searchCourse: string = "8 Keys to a More Respectful Workplace";

		  let __page7: any = this;
  __page7 = __page7.getCsLoginPage(this.getConfig().getEdCastURL());
  __page7 = __page7.navigateToLogin();
  __page7 = __page7.loginToApplication(this.getPlayEdCastUserOne().email, this.getPlayEdCastUserOne().password);
  __page7 = __page7.launchEdCastContentStudio();
  __page7 = __page7.navigateToPageByPath(this.EXPLORESUBSCRIPTIONPATH, BrowseBySubjectPage);
  __page7 = __page7.fillGlobalSearchBox(searchCourse);
  __page7 = __page7.clickSearch();
  __page7 = __page7.actionsOnSubscriptionDetailsPage("Quick View", searchCourse);
  expect(__page7.quick_Course_Presentation_Opened).toBeVisible({ timeout: 30000 });
  expect(__page7.browseSubjectButton("All-time")).toBeVisible({ timeout: 30000 });
  expect(__page7.browseSubjectButton("Last Quarter")).toBeVisible({ timeout: 30000 });
  expect(__page7.yourLearnerText).toHaveText(Pattern.compile("Not subscribed yet"));
  expect(__page7.totalLernerText).toHaveText(Pattern.compile("(^\\d{1,2}.\\dk$)"));
  expect(__page7.QV_COURSE_TITLE_VERIFICATION(searchCourse)).toBeVisible({ timeout: 30000 });
  __page7 = __page7.getQuickViewDuration(this.duration, CourseDetailsPage);
  __page7 = __page7.getQuickViewLanguage(this.language, CourseDetailsPage);
  __page7 = __page7.getQuickViewSubscription(this.subscription, CourseDetailsPage);
  __page7 = __page7.clickGoToDetails(CourseDetailsPage);
  expect(__page7.this.duration.getValue()(this.duration.getValue())).toBeVisible({ timeout: 30000 });
  expect(__page7.this.language.getValue()(this.language.getValue())).toBeVisible({ timeout: 30000 });
  let subscriptionlistArray: string[] = this.subscription.getValue().split(",");
  for (const subscription of subscriptionlistArray) {
  			if(subscription.equals("N/A"))
  			{
  				expect(__page7.getPage().locator("//span[text()='SUBSCRIPTIONS']/following-sibling:: span[not(text()='')]")).not.toBeVisible();
  			}
  			else
  			{
  				expect(__page7.subscriptions(subscription.trim())).toBeVisible({ timeout: 30000 });
  			}
  		}
  __page7 = __page7.goToLastPage();
  __page7 = __page7.clickCloseQuickViewDialog(searchCourse, BrowseBySubjectPage);
		//.logoutFromContentStudio(BrowseBySubjectPage);

	}
}
