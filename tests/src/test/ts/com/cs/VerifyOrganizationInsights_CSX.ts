// @ts-nocheck
import { BaseTest } from "common/BaseTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { OrganizationInsightsPage } from "cs/pages/OrganizationInsightsPage";
import { expect } from "common/testing/playwright";

export class VerifyOrganizationInsights_CSX extends BaseTest{

	private readonly ORGINSIGHT: string[] = [ "Insights", "Organization insights" ];
	private readonly HEADING_LEARNER_OVERVIEW: string = "Learners overview";
	private readonly HEADING_CONTENT_OVERVIEW: string = "Content overview";
	private readonly HEADING_CONSUMPTION_OBJECTIVE: string = "Consumption by objective";
	private readonly HEADING_TRENDS: string = "Trends";
	private readonly HEADING_LEARNER_BEHAVIOR: string = "Learner Behavior";
	private readonly HEADING_TOTAL_TIME_SPENT: string = "Total time spent learning";
	private readonly HEADING_CONTENT_CONSUMED: string = "Content consumed";
	private readonly HEADING_VIEW_VS_COMPLETION: string = "Learner Engagement (views vs completions)";
	private readonly HEADING_MODALITIES_CONSUMED: string = "Modalities consumed";
	private readonly HEADING_TOP_10_SKILLS: string = "Top 10 skills";
	private readonly HEADING_LEARNER_DISTRIBUTION: string = "Learner distribution";
	private readonly HEADING_LEARNER_ENGAGEMENT: string = "Learner engagement";
	private readonly LAST_SYNC_MESSAGE: string = "LAST SYNCED: JUN 26, 2024 (UPDATES WEEKLY)";
	private readonly CONTENT_SOURCE_ALL: string = "All content";
	private readonly CONTENT_SOURCE_SUBSCRIBED: string = "Subscriptions only";
	private readonly CONTENT_SOURCE_LEARNING: string = "Learning platform only";
	private readonly HEADER_NAME: string = "Organization insights";
	private readonly COMPANION_INSIGHT_SUMMARY: string = "Companion insight summary";

	//@Test(description = "CP-1911")
	public verifyAllHeadingTab(): void {


		  let __page1: any = this;
  __page1 = __page1.getCsLoginPage(this.getConfig().getThinkContentURL());
  __page1 = __page1.loginToThinkContent(this.getPlaySevenUser().email, this.getPlaySevenUser().password);
  __page1 = __page1.navigateToPageByPath(this.ORGINSIGHT, OrganizationInsightsPage);
  expect(__page1.navigation_betaText).toBeVisible({ timeout: 60000 });
  expect(__page1.header_betaText(this.ORGINSIGHT[1])).toBeVisible({ timeout: 60000 });
  expect(__page1.locateButtonText("Overview")).toBeVisible({ timeout: 60000 });
  expect(__page1.locateButtonText("Learning culture")).toBeVisible({ timeout: 60000 });
  expect(__page1.locateButtonText("Objectives")).toBeVisible({ timeout: 60000 });
  expect(__page1.contentSourceDropdown).toBeVisible({ timeout: 60000 });
  expect(__page1.locatePTagByText(this.COMPANION_INSIGHT_SUMMARY)).toBeVisible({ timeout: 30000 });
  expect(__page1.locatePTagByText(this.LAST_SYNC_MESSAGE)).toBeVisible({ timeout: 60000 });
  __page1 = __page1.clickContentSourceDownArrow();
  expect(__page1.locate_LI_TagByText(this.CONTENT_SOURCE_ALL)).toBeVisible({ timeout: 60000 });
  expect(__page1.locate_LI_TagByText(this.CONTENT_SOURCE_SUBSCRIBED)).toBeVisible({ timeout: 60000 });
  expect(__page1.locate_LI_TagByText(this.CONTENT_SOURCE_LEARNING)).toBeVisible({ timeout: 60000 });
	}

	public verifyOverview(): void {


		  let __page2: any = this;
  __page2 = __page2.getCsLoginPage(this.getConfig().getThinkContentURL());
  __page2 = __page2.loginToThinkContent(this.getPlaySevenUser().email, this.getPlaySevenUser().password);
  __page2 = __page2.navigateToPageByPath(this.ORGINSIGHT, OrganizationInsightsPage);
  expect(__page2.locatePTagByText(this.HEADING_LEARNER_OVERVIEW)).toBeVisible({ timeout: 60000 });
  expect(__page2.locatePTagByText(this.HEADING_CONTENT_OVERVIEW)).toBeVisible({ timeout: 60000 });
  expect(__page2.locatePTagByText(this.HEADING_CONSUMPTION_OBJECTIVE)).toBeVisible({ timeout: 60000 });
  expect(__page2.locatePTagByText(this.HEADING_TRENDS)).toBeVisible({ timeout: 60000 });
  expect(__page2.contentSourceDropdown).toBeVisible({ timeout: 60000 });
  expect(__page2.locatePTagByText(this.COMPANION_INSIGHT_SUMMARY)).toBeVisible({ timeout: 30000 });
  expect(__page2.locatePTagByText(this.LAST_SYNC_MESSAGE)).toBeVisible({ timeout: 60000 });
  __page2 = __page2.scrolltoBottom("1500", OrganizationInsightsPage);
  expect(__page2.loc_DIV_ByText(this.HEADER_NAME)).toBeVisible({ timeout: 60000 });
  __page2 = __page2.scrolltoBottom("Downmost", OrganizationInsightsPage);
  expect(__page2.loc_DIV_ByText(this.HEADER_NAME)).toBeVisible({ timeout: 60000 });
  __page2 = __page2.navigateToPageByPath(this.ORGINSIGHT, OrganizationInsightsPage);
  __page2 = __page2.clickInternalSegment(OrganizationInsightsPage);
  expect(__page2.ouLable("Client Account")).toBeVisible({ timeout: 60000 });
  expect(__page2.ouLable("Cohort Roster")).toBeVisible({ timeout: 60000 });
  expect(__page2.ouLable("Cost Center")).toBeVisible({ timeout: 60000 });
  expect(__page2.ouLable("Division")).toBeVisible({ timeout: 60000 });
  expect(__page2.ouLable("Grade")).toBeVisible({ timeout: 60000 });
  expect(__page2.ouLable("Group")).toBeVisible({ timeout: 60000 });
  expect(__page2.ouLable("Location")).toBeVisible({ timeout: 60000 });
  expect(__page2.ouLable("Position")).toBeVisible({ timeout: 60000 });
  expect(__page2.ouLable("Self Registration Group")).toBeVisible({ timeout: 60000 });
  expect(__page2.ouLable("Social Team")).toBeVisible({ timeout: 60000 });
  __page2 = __page2.clickOU("Group", OrganizationInsightsPage);
  __page2 = __page2.searchOU("Costain", OrganizationInsightsPage);
  __page2 = __page2.selectOU("Costain", OrganizationInsightsPage);
  __page2 = __page2.clickApplyButton(OrganizationInsightsPage);
  expect(__page2.verifyAppliedFilter("Group","Costain")).toBeVisible({ timeout: 30000 });
	}

	public verifyLearningCulture(): void {

		  let __page3: any = this;
  __page3 = __page3.getCsLoginPage(this.getConfig().getThinkContentURL());
  __page3 = __page3.loginToThinkContent(this.getPlaySevenUser().email, this.getPlaySevenUser().password);
  __page3 = __page3.navigateToPageByPath(this.ORGINSIGHT, OrganizationInsightsPage);
  __page3 = __page3.clickLearningCultureTab();
  expect(__page3.locatePTagByText(this.HEADING_LEARNER_BEHAVIOR)).toBeVisible({ timeout: 60000 });
  expect(__page3.locatePTagByText(this.HEADING_TOTAL_TIME_SPENT)).toBeVisible({ timeout: 60000 });
  expect(__page3.locatePTagByText(this.HEADING_CONTENT_CONSUMED)).toBeVisible({ timeout: 60000 });
  expect(__page3.locatePTagByText(this.HEADING_VIEW_VS_COMPLETION)).toBeVisible({ timeout: 60000 });
  expect(__page3.locatePTagByText(this.HEADING_MODALITIES_CONSUMED)).toBeVisible({ timeout: 60000 });
  expect(__page3.locatePTagByText(this.HEADING_TOP_10_SKILLS)).toBeVisible({ timeout: 60000 });
  expect(__page3.contentSourceDropdown).toBeVisible({ timeout: 60000 });
  expect(__page3.locatePTagByText(this.COMPANION_INSIGHT_SUMMARY)).toBeVisible({ timeout: 30000 });
  expect(__page3.locatePTagByText(this.LAST_SYNC_MESSAGE)).toBeVisible({ timeout: 60000 });
  __page3 = __page3.scrolltoBottom("1500", OrganizationInsightsPage);
  expect(__page3.loc_DIV_ByText(this.HEADER_NAME)).toBeVisible({ timeout: 60000 });
  __page3 = __page3.scrolltoBottom("Downmost", OrganizationInsightsPage);
  expect(__page3.loc_DIV_ByText(this.HEADER_NAME)).toBeVisible({ timeout: 60000 });
  __page3 = __page3.clickInternalSegment(OrganizationInsightsPage);
  expect(__page3.ouLable("Client Account")).toBeVisible({ timeout: 60000 });
  expect(__page3.ouLable("Cohort Roster")).toBeVisible({ timeout: 60000 });
  expect(__page3.ouLable("Cost Center")).toBeVisible({ timeout: 60000 });
  expect(__page3.ouLable("Division")).toBeVisible({ timeout: 60000 });
  expect(__page3.ouLable("Grade")).toBeVisible({ timeout: 60000 });
  expect(__page3.ouLable("Group")).toBeVisible({ timeout: 60000 });
  expect(__page3.ouLable("Location")).toBeVisible({ timeout: 60000 });
  expect(__page3.ouLable("Position")).toBeVisible({ timeout: 60000 });
  expect(__page3.ouLable("Self Registration Group")).toBeVisible({ timeout: 60000 });
  expect(__page3.ouLable("Social Team")).toBeVisible({ timeout: 60000 });
  __page3 = __page3.clickOU("Group", OrganizationInsightsPage);
  __page3 = __page3.searchOU("Costain", OrganizationInsightsPage);
  __page3 = __page3.selectOU("Costain", OrganizationInsightsPage);
  __page3 = __page3.clickApplyButton(OrganizationInsightsPage);
  expect(__page3.verifyAppliedFilter("Group","Costain")).toBeVisible({ timeout: 30000 });
	}

	public verifyObjectives(): void {

		  let __page4: any = this;
  __page4 = __page4.getCsLoginPage(this.getConfig().getThinkContentURL());
  __page4 = __page4.loginToThinkContent(this.getPlaySevenUser().email, this.getPlaySevenUser().password);
  __page4 = __page4.navigateToPageByPath(this.ORGINSIGHT, OrganizationInsightsPage);
  __page4 = __page4.clickObjectivesTab();
  expect(__page4.locatePTagByText(this.HEADING_LEARNER_DISTRIBUTION)).toBeVisible({ timeout: 60000 });
  expect(__page4.locatePTagByText(this.HEADING_TOTAL_TIME_SPENT)).toBeVisible({ timeout: 60000 });
  expect(__page4.locatePTagByText(this.HEADING_CONTENT_CONSUMED)).toBeVisible({ timeout: 60000 });
  expect(__page4.locatePTagByText(this.HEADING_LEARNER_ENGAGEMENT)).toBeVisible({ timeout: 60000 });
  expect(__page4.locatePTagByText(this.HEADING_MODALITIES_CONSUMED)).toBeVisible({ timeout: 60000 });
  expect(__page4.contentSourceDropdown).toBeVisible({ timeout: 60000 });
  expect(__page4.locatePTagByText(this.COMPANION_INSIGHT_SUMMARY)).toBeVisible({ timeout: 30000 });
  expect(__page4.locatePTagByText(this.LAST_SYNC_MESSAGE)).toBeVisible({ timeout: 60000 });
  __page4 = __page4.scrolltoBottom("1500", OrganizationInsightsPage);
  expect(__page4.loc_DIV_ByText(this.HEADER_NAME)).toBeVisible({ timeout: 60000 });
  __page4 = __page4.scrolltoBottom("Downmost", OrganizationInsightsPage);
  expect(__page4.loc_DIV_ByText(this.HEADER_NAME)).toBeVisible({ timeout: 60000 });
  __page4 = __page4.clickInternalSegment(OrganizationInsightsPage);
  expect(__page4.ouLable("Client Account")).toBeVisible({ timeout: 60000 });
  expect(__page4.ouLable("Cohort Roster")).toBeVisible({ timeout: 60000 });
  expect(__page4.ouLable("Cost Center")).toBeVisible({ timeout: 60000 });
  expect(__page4.ouLable("Division")).toBeVisible({ timeout: 60000 });
  expect(__page4.ouLable("Grade")).toBeVisible({ timeout: 60000 });
  expect(__page4.ouLable("Group")).toBeVisible({ timeout: 60000 });
  expect(__page4.ouLable("Location")).toBeVisible({ timeout: 60000 });
  expect(__page4.ouLable("Position")).toBeVisible({ timeout: 60000 });
  expect(__page4.ouLable("Self Registration Group")).toBeVisible({ timeout: 60000 });
  expect(__page4.ouLable("Social Team")).toBeVisible({ timeout: 60000 });
  __page4 = __page4.clickOU("Group", OrganizationInsightsPage);
  __page4 = __page4.searchOU("Costain", OrganizationInsightsPage);
  __page4 = __page4.selectOU("Costain", OrganizationInsightsPage);
  __page4 = __page4.clickApplyButton(OrganizationInsightsPage);
  expect(__page4.verifyAppliedFilter("Group","Costain")).toBeVisible({ timeout: 30000 });
	}

	//@Test(description = "CP-1454")
	public verifyLastSyncDate(): void {

		  let __page5: any = this;
  __page5 = __page5.getCsLoginPage(this.getConfig().getThinkContentURL());
  __page5 = __page5.loginToThinkContent(this.getPlaySevenUser().email, this.getPlaySevenUser().password);
  __page5 = __page5.navigateToPageByPath(this.ORGINSIGHT, OrganizationInsightsPage);
  expect(__page5.locatePTagByText(this.LAST_SYNC_MESSAGE)).toBeVisible({ timeout: 60000 });
  __page5 = __page5.clickLearningCultureTab();
  expect(__page5.locatePTagByText(this.LAST_SYNC_MESSAGE)).toBeVisible({ timeout: 60000 });
  __page5 = __page5.clickObjectivesTab();
  expect(__page5.locatePTagByText(this.LAST_SYNC_MESSAGE)).toBeVisible({ timeout: 60000 });
	}

}
