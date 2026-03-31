// @ts-nocheck
import { BaseTest } from "common/BaseTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { CuratorInsightsPage } from "cs/pages/CuratorInsightsPage";
import { OrganizationInsightsPage } from "cs/pages/OrganizationInsightsPage";
import { expect } from "common/testing/playwright";

export class VerifyCuratorInsights_CSX extends BaseTest{

	private readonly CURATORINSIGHT: string[] = [ "Insights", "Curator insights" ];
	private readonly HEADING_EXPECTEDSKILLS: string = "Expected skills for your learners";
	private readonly HEADING_CONTENTENGAGEMENT_SKILL: string = "Content engagement by skill";
	private readonly HEADING_CONTENTDISTRIBUTION: string = "Content distribution";
	private readonly HEADING_CONTENTDISTRIBUTION_LANGUAGE: string = "Content distribution by language";
	private readonly HEADING_CONTENTDISTRIBUTION_SKILL_MODALITY: string = "Content distribution by skills and modality";
	private readonly HEADING_CONTENTDISTRIBUTION_TOPIC_MODALITY: string = "Content distribution by topics and modalities";
	private readonly HEADING_CONTENTENGAGEMENT_TOPIC: string = "Content engagement by topic";
	private readonly LAST_SYNC_MESSAGE: string = "LAST SYNCED: JUN 26, 2024 (UPDATES WEEKLY)";
	private readonly COMPANION_INSIGHT_SUMMARY: string = "Companion insight summary";

	public verifyContentCoverageSkill(): void {

		  let __page1: any = this;
  __page1 = __page1.getCsLoginPage(this.getConfig().getThinkContentURL());
  __page1 = __page1.loginToThinkContent(this.getPlaySixUser().email, this.getPlaySixUser().password);
  __page1 = __page1.navigateToPageByPath(this.CURATORINSIGHT, CuratorInsightsPage);
  expect(__page1.navigation_betaText).toBeVisible({ timeout: 60000 });
  expect(__page1.header_betaText(this.CURATORINSIGHT[1])).toBeVisible({ timeout: 60000 });
  expect(__page1.locateButtonText("Subscriptions")).toBeVisible({ timeout: 60000 });
  expect(__page1.locateButtonText("Content Coverage")).toBeVisible({ timeout: 60000 });
  expect(__page1.locatePTagByText(this.COMPANION_INSIGHT_SUMMARY)).toBeVisible({ timeout: 60000 });
  __page1 = __page1.clickInternalSegment(OrganizationInsightsPage);
  expect(__page1.ouLable("Client Account")).toBeVisible({ timeout: 60000 });
  expect(__page1.ouLable("Cohort Roster")).toBeVisible({ timeout: 60000 });
  expect(__page1.ouLable("Cost Center")).toBeVisible({ timeout: 60000 });
  expect(__page1.ouLable("Division")).toBeVisible({ timeout: 60000 });
  expect(__page1.ouLable("Grade")).toBeVisible({ timeout: 60000 });
  expect(__page1.ouLable("Group")).toBeVisible({ timeout: 60000 });
  expect(__page1.ouLable("Location")).toBeVisible({ timeout: 60000 });
  expect(__page1.ouLable("Position")).toBeVisible({ timeout: 60000 });
  expect(__page1.ouLable("Self Registration Group")).toBeVisible({ timeout: 60000 });
  expect(__page1.ouLable("Social Team")).toBeVisible({ timeout: 60000 });
  __page1 = __page1.clickOU("Group", OrganizationInsightsPage);
  __page1 = __page1.searchOU("Costain", OrganizationInsightsPage);
  __page1 = __page1.selectOU("Costain", OrganizationInsightsPage);
  __page1 = __page1.clickApplyButton(OrganizationInsightsPage);
  expect(__page1.verifyAppliedFilter("Group","Costain")).toBeVisible({ timeout: 30000 });
  __page1 = __page1.getPageClass(CuratorInsightsPage);
  __page1 = __page1.clickContentCoverageTab();
  expect(__page1.locateButtonText("Skills")).toBeVisible({ timeout: 60000 });
  expect(__page1.locateButtonText("Topics")).toBeVisible({ timeout: 60000 });
  expect(__page1.locatePTagByText(this.HEADING_EXPECTEDSKILLS)).toBeVisible({ timeout: 60000 });
  expect(__page1.locatePTagByText(this.HEADING_CONTENTENGAGEMENT_SKILL)).toBeVisible({ timeout: 60000 });
  expect(__page1.locatePTagByText(this.HEADING_CONTENTDISTRIBUTION)).toBeVisible({ timeout: 60000 });
  expect(__page1.locatePTagByText(this.HEADING_CONTENTDISTRIBUTION_LANGUAGE)).toBeVisible({ timeout: 60000 });
  expect(__page1.locatePTagByText(this.HEADING_CONTENTDISTRIBUTION_SKILL_MODALITY)).toBeVisible({ timeout: 60000 });
  __page1 = __page1.clickInternalSegment(OrganizationInsightsPage);
  expect(__page1.ouLable("Client Account")).toBeVisible({ timeout: 60000 });
  expect(__page1.ouLable("Cohort Roster")).toBeVisible({ timeout: 60000 });
  expect(__page1.ouLable("Cost Center")).toBeVisible({ timeout: 60000 });
  expect(__page1.ouLable("Division")).toBeVisible({ timeout: 60000 });
  expect(__page1.ouLable("Grade")).toBeVisible({ timeout: 60000 });
  expect(__page1.ouLable("Group")).toBeVisible({ timeout: 60000 });
  expect(__page1.ouLable("Location")).toBeVisible({ timeout: 60000 });
  expect(__page1.ouLable("Position")).toBeVisible({ timeout: 60000 });
  expect(__page1.ouLable("Self Registration Group")).toBeVisible({ timeout: 60000 });
  expect(__page1.ouLable("Social Team")).toBeVisible({ timeout: 60000 });
  __page1 = __page1.clickOU("Group", OrganizationInsightsPage);
  __page1 = __page1.searchOU("Costain", OrganizationInsightsPage);
  __page1 = __page1.selectOU("Costain", OrganizationInsightsPage);
  __page1 = __page1.clickApplyButton(OrganizationInsightsPage);
  expect(__page1.verifyAppliedFilter("Group","Costain")).toBeVisible({ timeout: 30000 });
		//.logoutFromContentStudio(BrowseBySubjectPage);
	}

	public verifyContentCoverageTopic(): void {

		  let __page2: any = this;
  __page2 = __page2.getCsLoginPage(this.getConfig().getThinkContentURL());
  __page2 = __page2.loginToThinkContent(this.getPlaySixUser().email, this.getPlaySixUser().password);
  __page2 = __page2.navigateToPageByPath(this.CURATORINSIGHT, CuratorInsightsPage);
  expect(__page2.locateButtonText("Subscriptions")).toBeVisible({ timeout: 60000 });
  expect(__page2.locateButtonText("Content Coverage")).toBeVisible({ timeout: 60000 });
  __page2 = __page2.clickContentCoverageTab();
  __page2 = __page2.clickTopicTab();
  expect(__page2.locatePTagByText(this.HEADING_CONTENTENGAGEMENT_TOPIC)).toBeVisible({ timeout: 60000 });
  expect(__page2.locatePTagByText(this.HEADING_CONTENTDISTRIBUTION)).toBeVisible({ timeout: 60000 });
  expect(__page2.locatePTagByText(this.HEADING_CONTENTDISTRIBUTION_LANGUAGE)).toBeVisible({ timeout: 60000 });
  expect(__page2.locatePTagByText(this.HEADING_CONTENTDISTRIBUTION_TOPIC_MODALITY)).toBeVisible({ timeout: 60000 });
  expect(__page2.locatePTagByText(this.HEADING_EXPECTEDSKILLS)).not.toBeVisible({ timeout: 60000 });
  expect(__page2.locatePTagByText(this.COMPANION_INSIGHT_SUMMARY)).toBeVisible({ timeout: 60000 });
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
		//.logoutFromContentStudio(BrowseBySubjectPage);
	}

	public verifyLastSyncDate(): void {

		let headerName: string = "Curator insights";

		  let __page3: any = this;
  __page3 = __page3.getCsLoginPage(this.getConfig().getThinkContentURL());
  __page3 = __page3.loginToThinkContent(this.getPlaySixUser().email, this.getPlaySixUser().password);
  __page3 = __page3.navigateToPageByPath(this.CURATORINSIGHT, CuratorInsightsPage);
  expect(__page3.locatePTagByText(this.LAST_SYNC_MESSAGE)).toBeVisible({ timeout: 60000 });
  __page3 = __page3.scrolltoBottom("1500", CuratorInsightsPage);
  expect(__page3.loc_DIV_ByText(headerName)).toBeVisible({ timeout: 60000 });
  __page3 = __page3.scrolltoBottom("Downmost", CuratorInsightsPage);
  expect(__page3.loc_DIV_ByText(headerName)).toBeVisible({ timeout: 60000 });
  __page3 = __page3.clickContentCoverageTab();
  expect(__page3.locatePTagByText(this.LAST_SYNC_MESSAGE)).toBeVisible({ timeout: 60000 });
  __page3 = __page3.scrolltoBottom("1500", CuratorInsightsPage);
  expect(__page3.loc_DIV_ByText(headerName)).toBeVisible({ timeout: 60000 });
  __page3 = __page3.scrolltoBottom("Downmost", CuratorInsightsPage);
  expect(__page3.loc_DIV_ByText(headerName)).toBeVisible({ timeout: 60000 });

	}


}
