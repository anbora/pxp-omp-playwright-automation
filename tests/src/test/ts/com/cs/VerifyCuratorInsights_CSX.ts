import { BaseTest } from "common/BaseTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { CuratorInsightsAssertions } from "cs/assertions/CuratorInsightsAssertions";
import { OrganizationInsightsAssertions } from "cs/assertions/OrganizationInsightsAssertions";
import { CuratorInsightsPage } from "cs/pages/CuratorInsightsPage";
import { OrganizationInsightsPage } from "cs/pages/OrganizationInsightsPage";

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

		this.getCsLoginPage(this.getConfig().getThinkContentURL())
		.loginToThinkContent(this.getPlaySixUser().email, this.getPlaySixUser().password)
		.navigateToPageByPath(this.CURATORINSIGHT, CuratorInsightsPage)
		.check(CuratorInsightsAssertions)
		.assertThatNagigationBetaTagVisible()
		.assertThatHeaderBetaTagVisible(this.CURATORINSIGHT[1])
		.assertThatTabIsVisible("Subscriptions")
		.assertThatTabIsVisible("Content Coverage")
		.assertThatHeadingIsVisible(this.COMPANION_INSIGHT_SUMMARY)
		.endAssertion()
		.clickInternalSegment(OrganizationInsightsPage)
		.check(OrganizationInsightsAssertions)
		.assertThatOUVisible("Client Account")
		.assertThatOUVisible("Cohort Roster")
		.assertThatOUVisible("Cost Center")
		.assertThatOUVisible("Division")
		.assertThatOUVisible("Grade")
		.assertThatOUVisible("Group")
		.assertThatOUVisible("Location")
		.assertThatOUVisible("Position")
		.assertThatOUVisible("Self Registration Group")
		.assertThatOUVisible("Social Team")
		.endAssertion()
		.clickOU("Group", OrganizationInsightsPage)
		.searchOU("Costain", OrganizationInsightsPage)
		.selectOU("Costain", OrganizationInsightsPage)
		.clickApplyButton(OrganizationInsightsPage)
		.check(OrganizationInsightsAssertions)
		.assertThatAppliedFilterIsVisible("Group", "Costain")
		.endAssertion()
		.getPageClass(CuratorInsightsPage)
		.clickContentCoverageTab()
		.check(CuratorInsightsAssertions)
		.assertThatTabIsVisible("Skills")
		.assertThatTabIsVisible("Topics")
		.assertThatHeadingIsVisible(this.HEADING_EXPECTEDSKILLS)
		.assertThatHeadingIsVisible(this.HEADING_CONTENTENGAGEMENT_SKILL)
		.assertThatHeadingIsVisible(this.HEADING_CONTENTDISTRIBUTION)
		.assertThatHeadingIsVisible(this.HEADING_CONTENTDISTRIBUTION_LANGUAGE)
		.assertThatHeadingIsVisible(this.HEADING_CONTENTDISTRIBUTION_SKILL_MODALITY)
		.endAssertion()
		.clickInternalSegment(OrganizationInsightsPage)
		.check(OrganizationInsightsAssertions)
		.assertThatOUVisible("Client Account")
		.assertThatOUVisible("Cohort Roster")
		.assertThatOUVisible("Cost Center")
		.assertThatOUVisible("Division")
		.assertThatOUVisible("Grade")
		.assertThatOUVisible("Group")
		.assertThatOUVisible("Location")
		.assertThatOUVisible("Position")
		.assertThatOUVisible("Self Registration Group")
		.assertThatOUVisible("Social Team")
		.endAssertion()
		.clickOU("Group", OrganizationInsightsPage)
		.searchOU("Costain", OrganizationInsightsPage)
		.selectOU("Costain", OrganizationInsightsPage)
		.clickApplyButton(OrganizationInsightsPage)
		.check(OrganizationInsightsAssertions)
		.assertThatAppliedFilterIsVisible("Group", "Costain")
		.endAssertion();
		//.logoutFromContentStudio(BrowseBySubjectPage);
	}

	public verifyContentCoverageTopic(): void {

		this.getCsLoginPage(this.getConfig().getThinkContentURL())
		.loginToThinkContent(this.getPlaySixUser().email, this.getPlaySixUser().password)
		.navigateToPageByPath(this.CURATORINSIGHT, CuratorInsightsPage)
		.check(CuratorInsightsAssertions)
		.assertThatTabIsVisible("Subscriptions")
		.assertThatTabIsVisible("Content Coverage")
		.endAssertion()
		.clickContentCoverageTab()
		.clickTopicTab()
		.check(CuratorInsightsAssertions)
		.assertThatHeadingIsVisible(this.HEADING_CONTENTENGAGEMENT_TOPIC)
		.assertThatHeadingIsVisible(this.HEADING_CONTENTDISTRIBUTION)
		.assertThatHeadingIsVisible(this.HEADING_CONTENTDISTRIBUTION_LANGUAGE)
		.assertThatHeadingIsVisible(this.HEADING_CONTENTDISTRIBUTION_TOPIC_MODALITY)
		.assertThatHeadingIsNotVisible(this.HEADING_EXPECTEDSKILLS)
		.assertThatHeadingIsVisible(this.COMPANION_INSIGHT_SUMMARY)
		.endAssertion()
		.clickInternalSegment(OrganizationInsightsPage)
		.check(OrganizationInsightsAssertions)
		.assertThatOUVisible("Client Account")
		.assertThatOUVisible("Cohort Roster")
		.assertThatOUVisible("Cost Center")
		.assertThatOUVisible("Division")
		.assertThatOUVisible("Grade")
		.assertThatOUVisible("Group")
		.assertThatOUVisible("Location")
		.assertThatOUVisible("Position")
		.assertThatOUVisible("Self Registration Group")
		.assertThatOUVisible("Social Team")
		.endAssertion()
		.clickOU("Group", OrganizationInsightsPage)
		.searchOU("Costain", OrganizationInsightsPage)
		.selectOU("Costain", OrganizationInsightsPage)
		.clickApplyButton(OrganizationInsightsPage)
		.check(OrganizationInsightsAssertions)
		.assertThatAppliedFilterIsVisible("Group", "Costain")
		.endAssertion();
		//.logoutFromContentStudio(BrowseBySubjectPage);
	}

	public verifyLastSyncDate(): void {

		let headerName: string = "Curator insights";

		this.getCsLoginPage(this.getConfig().getThinkContentURL())
		.loginToThinkContent(this.getPlaySixUser().email, this.getPlaySixUser().password)
		.navigateToPageByPath(this.CURATORINSIGHT, CuratorInsightsPage)
		.check(CuratorInsightsAssertions)
		.assertThatHeadingIsVisible(this.LAST_SYNC_MESSAGE)
		.endAssertion()
		.scrolltoBottom("1500",CuratorInsightsPage)
		.check(CuratorInsightsAssertions)
		.assertThatStickyHeaderVisible(headerName)
		.endAssertion()
		.scrolltoBottom("Downmost",CuratorInsightsPage)
		.check(CuratorInsightsAssertions)
		.assertThatStickyHeaderVisible(headerName)
		.endAssertion()
		.clickContentCoverageTab()
		.check(CuratorInsightsAssertions)
		.assertThatHeadingIsVisible(this.LAST_SYNC_MESSAGE)
		.endAssertion()
		.scrolltoBottom("1500",CuratorInsightsPage)
		.check(CuratorInsightsAssertions)
		.assertThatStickyHeaderVisible(headerName)
		.endAssertion()
		.scrolltoBottom("Downmost",CuratorInsightsPage)
		.check(CuratorInsightsAssertions)
		.assertThatStickyHeaderVisible(headerName)
		.endAssertion();

	}


}
