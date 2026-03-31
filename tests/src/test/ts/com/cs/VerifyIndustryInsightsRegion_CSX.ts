// @ts-nocheck
import { BaseTest } from "common/BaseTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { CourseDetailsPage } from "cs/pages/CourseDetailsPage";
import { IndustryInsightsPage } from "cs/pages/IndustryInsightsPage";
import { SubscriptionPage } from "cs/pages/SubscriptionPage";
import { ResultContainer } from "models/ResultContainer";
import { expect } from "common/testing/playwright";

export class VerifyIndustryInsightsRegion_CSX extends BaseTest{

	private readonly INDUSTRYINSIGHT: string[] = [ "Insights", "Industry insights" ];
	private readonly LAST_SYNC_MESSAGE: string = "LAST SYNCED: SEP 7, 2024 (UPDATES MONTHLY)";
	private readonly LEARNING_CULTURE_ALL: string = "All";
	private readonly LEARNING_CULTURE_ASSIGNED: string = "Assigned";
	private readonly LEARNING_CULTURE_SELF: string = "Self-directed";
	private readonly HEADER_NAME: string = "Industry insights";
	private readonly COMPANION_INSIGHT_SUMMARY: string = "Companion insight summary";

	public verifyIndustryInsightPage(): void {

		  let __page1: any = this;
  __page1 = __page1.getCsLoginPage(this.getConfig().getThinkContentURL());
  __page1 = __page1.loginToThinkContent(this.getPlayEightUser().email, this.getPlayEightUser().password);
  __page1 = __page1.navigateToPageByPath(this.INDUSTRYINSIGHT, IndustryInsightsPage);
  expect(__page1.header_betaText(this.INDUSTRYINSIGHT[1])).toBeVisible({ timeout: 60000 });
  expect(__page1.locatePTagByText(this.COMPANION_INSIGHT_SUMMARY)).toBeVisible({ timeout: 60000 });
  __page1 = __page1.scrolltoBottom("1500", IndustryInsightsPage);
  expect(__page1.loc_DIV_ByText(this.HEADER_NAME)).toBeVisible({ timeout: 60000 });
  __page1 = __page1.scrolltoBottom("Downmost", IndustryInsightsPage);
  expect(__page1.loc_DIV_ByText(this.HEADER_NAME)).toBeVisible({ timeout: 60000 });
	 }

	public verifyIndustryInsightSections(): void {

		  let __page2: any = this;
  __page2 = __page2.getCsLoginPage(this.getConfig().getThinkContentURL());
  __page2 = __page2.loginToThinkContent(this.getPlayEightUser().email, this.getPlayEightUser().password);
  __page2 = __page2.navigateToPageByPath(this.INDUSTRYINSIGHT, IndustryInsightsPage);
  expect(__page2.header_betaText(this.INDUSTRYINSIGHT[1])).toBeVisible({ timeout: 60000 });
  expect(__page2.locatePTagByText("Active Learners")).toBeVisible({ timeout: 60000 });
  expect(__page2.locatePTagByText("Time Spent")).toBeVisible({ timeout: 60000 });
  expect(__page2.locatePTagByText("Top 10 skills in your region")).toBeVisible({ timeout: 60000 });
  expect(__page2.locatePTagByText("Top 10 courses in your region")).toBeVisible({ timeout: 60000 });
  expect(__page2.locatePTagByText("Skills learned")).toBeVisible({ timeout: 60000 });
  expect(__page2.locatePTagByText("Content consumption")).toBeVisible({ timeout: 60000 });
	 }

	public verifyIndustryInsightRegion(): void {

		const SECTIONNAME_TOPCOURSES: string = "Top 10 courses in your region";
		let coursetoClick: string = "Microsoft 365 OneDrive - Beginner";
		let qvSkill: any = new ResultContainer();
		let qvlanguage: any = new ResultContainer();
		let qvCategory: any = new ResultContainer();
		let qvTopic: any = new ResultContainer();
		let qvSubject: any = new ResultContainer();
		let qvProvider: any = new ResultContainer();

		  let __page3: any = this;
  __page3 = __page3.getCsLoginPage(this.getConfig().getThinkContentURL());
  __page3 = __page3.loginToThinkContent(this.getPlayEightUser().email, this.getPlayEightUser().password);
  __page3 = __page3.navigateToPageByPath(this.INDUSTRYINSIGHT, IndustryInsightsPage);
  expect(__page3.locatePTagByText(SECTIONNAME_TOPCOURSES)).toBeVisible({ timeout: 60000 });
  expect(__page3.locateTextAssignedLearningInSection(SECTIONNAME_TOPCOURSES)).toBeVisible({ timeout: 60000 });
  expect(__page3.locateTextSelfDirectedInSection(SECTIONNAME_TOPCOURSES)).toBeVisible({ timeout: 60000 });
  expect(__page3.countSelfDirectedData(SECTIONNAME_TOPCOURSES)).toHaveCount(10);
  expect(__page3.countAssignedLearningData(SECTIONNAME_TOPCOURSES)).toHaveCount(10);
  __page3 = __page3.clickAssignedLearningTopTenCourse(SECTIONNAME_TOPCOURSES, coursetoClick);
  __page3 = __page3.getQuickViewSkill(qvSkill, IndustryInsightsPage);
  __page3 = __page3.getQuickViewLanguage(qvlanguage, IndustryInsightsPage);
  __page3 = __page3.getQuickViewProvider(qvProvider, IndustryInsightsPage);
  __page3 = __page3.getQuickViewCategory(qvCategory, IndustryInsightsPage);
  __page3 = __page3.getQuickViewTopic(qvTopic, IndustryInsightsPage);
  __page3 = __page3.getQuickViewSubject(qvSubject, IndustryInsightsPage);
  __page3 = __page3.getPageClass(SubscriptionPage);
  expect(__page3.locateButtonText("All-time")).toBeVisible({ timeout: 60000 });
  expect(__page3.locateButtonText("Last Quarter")).toBeVisible({ timeout: 60000 });
  expect(__page3.metricYourLearner("Not subscribed yet")).toBeVisible({ timeout: 60000 });
  expect(__page3.totalLernerText).toHaveText(Pattern.compile("(^\\d{1,3}|\\d{1,3}.\\d$)"));
  expect(__page3.qv_duration_check(coursetoClick)).toHaveText(Pattern.compile("(\\d.\\d|\\d) (hr|min)"));
  __page3 = __page3.clickGoToDetails(IndustryInsightsPage);
  __page3 = __page3.getPageClass(CourseDetailsPage);
  expect(__page3.qvlanguage.getValue()(qvlanguage.getValue())).toBeVisible({ timeout: 30000 });
  expect(__page3.contentPartner(qvProvider.getValue())).toBeVisible({ timeout: 30000 });
  if(qvSkill.getValue().equals("N/A")){
  			expect(__page3.getPage().locator("//span[text()='SKILLS']/following-sibling::div/div")).not.toBeVisible({ timeout: 30000 });
  		}
  		else {
  			expect(__page3.getPage().locator("//span[text()='SKILLS']/following-sibling::div/div").first()).toHaveText(qvSkill.getValue());
  		}
  expect(__page3.verifydetails("CATEGORIES")).toHaveText(qvCategory.getValue());
  expect(__page3.verifydetails("TOPICS").first()).toHaveText(qvTopic.getValue());
  expect(__page3.verifydetails("SUBJECTS").first()).toHaveText(qvSubject.getValue());
	 }

	public verifyIndustryInsightRegionTopTenSkills(): void {

		const SECTIONNAME_TOPSKILL: string = "Top 10 skills in your region";

		  let __page4: any = this;
  __page4 = __page4.getCsLoginPage(this.getConfig().getThinkContentURL());
  __page4 = __page4.loginToThinkContent(this.getPlayEightUser().email, this.getPlayEightUser().password);
  __page4 = __page4.navigateToPageByPath(this.INDUSTRYINSIGHT, IndustryInsightsPage);
  expect(__page4.locatePTagByText(SECTIONNAME_TOPSKILL)).toBeVisible({ timeout: 60000 });
  expect(__page4.locateTextAssignedLearningInSection(SECTIONNAME_TOPSKILL)).toBeVisible({ timeout: 60000 });
  expect(__page4.locateTextSelfDirectedInSection(SECTIONNAME_TOPSKILL)).toBeVisible({ timeout: 60000 });
  expect(__page4.countSelfDirectedData(SECTIONNAME_TOPSKILL)).toHaveCount(10);
  expect(__page4.countAssignedLearningData(SECTIONNAME_TOPSKILL)).toHaveCount(10);
	 }

	public verifyIndustryInsightRegionFilters(): void {


		  let __page5: any = this;
  __page5 = __page5.getCsLoginPage(this.getConfig().getThinkContentURL());
  __page5 = __page5.loginToThinkContent(this.getPlayEightUser().email, this.getPlayEightUser().password);
  __page5 = __page5.navigateToPageByPath(this.INDUSTRYINSIGHT, IndustryInsightsPage);
  expect(__page5.learningCultureArrow).toBeVisible({ timeout: 60000 });
  __page5 = __page5.clickLearningCultureArrow();
  __page5 = __page5.selectLearningCulture(this.LEARNING_CULTURE_ASSIGNED);
	 }

	public verifyIndustryInsightRegionDateLastSync(): void {

		  let __page6: any = this;
  __page6 = __page6.getCsLoginPage(this.getConfig().getThinkContentURL());
  __page6 = __page6.loginToThinkContent(this.getPlayEightUser().email, this.getPlayEightUser().password);
  __page6 = __page6.navigateToPageByPath(this.INDUSTRYINSIGHT, IndustryInsightsPage);
  expect(__page6.locatelastSyncMessage(this.LAST_SYNC_MESSAGE)).toBeVisible({ timeout: 60000 });
	}

	public verifyIndustryInsightRegionTimeFrame(): void {

		  let __page7: any = this;
  __page7 = __page7.getCsLoginPage(this.getConfig().getThinkContentURL());
  __page7 = __page7.loginToThinkContent(this.getPlayEightUser().email, this.getPlayEightUser().password);
  __page7 = __page7.navigateToPageByPath(this.INDUSTRYINSIGHT, IndustryInsightsPage);
  expect(__page7.regionTimeFrameArrow(String.valueOf(3))).toBeVisible({ timeout: 60000 });
  __page7 = __page7.clickRegionTimeFramArrow(String.valueOf(3));
  __page7 = __page7.selectTimeFrame(String.valueOf(6));
	}
}
