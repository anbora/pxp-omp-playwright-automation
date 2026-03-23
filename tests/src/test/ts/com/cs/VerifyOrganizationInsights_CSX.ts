import { BaseTest } from "common/BaseTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { OrganizationInsightsAssertions } from "cs/assertions/OrganizationInsightsAssertions";
import { OrganizationInsightsPage } from "cs/pages/OrganizationInsightsPage";

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


		this.getCsLoginPage(this.getConfig().getThinkContentURL())
		.loginToThinkContent(this.getPlaySevenUser().email, this.getPlaySevenUser().password)
		.navigateToPageByPath(this.ORGINSIGHT, OrganizationInsightsPage)
		.check(OrganizationInsightsAssertions)
		.assertThatNagigationBetaTagVisible()
		.assertThatHeaderBetaTagVisible(this.ORGINSIGHT[1])
		.assertThatTabIsVisible("Overview")
		.assertThatTabIsVisible("Learning culture")
		.assertThatTabIsVisible("Objectives")
		.assertThatContentSourceVisible()
		.assertThatCompanionInsightSummaryHeader(this.COMPANION_INSIGHT_SUMMARY)
		.assertThatHeadingIsVisible(this.LAST_SYNC_MESSAGE)
		.endAssertion()
		.clickContentSourceDownArrow()
		.check(OrganizationInsightsAssertions)
		.assertThatContentSourceOptionVisible(this.CONTENT_SOURCE_ALL)
		.assertThatContentSourceOptionVisible(this.CONTENT_SOURCE_SUBSCRIBED)
		.assertThatContentSourceOptionVisible(this.CONTENT_SOURCE_LEARNING)
		.endAssertion();
	}

	public verifyOverview(): void {


		this.getCsLoginPage(this.getConfig().getThinkContentURL())
		.loginToThinkContent(this.getPlaySevenUser().email, this.getPlaySevenUser().password)
		.navigateToPageByPath(this.ORGINSIGHT, OrganizationInsightsPage)
		.check(OrganizationInsightsAssertions)
		.assertThatHeadingIsVisible(this.HEADING_LEARNER_OVERVIEW)
		.assertThatHeadingIsVisible(this.HEADING_CONTENT_OVERVIEW)
		.assertThatHeadingIsVisible(this.HEADING_CONSUMPTION_OBJECTIVE)
		.assertThatHeadingIsVisible(this.HEADING_TRENDS)
		.assertThatContentSourceVisible()
		.assertThatCompanionInsightSummaryHeader(this.COMPANION_INSIGHT_SUMMARY)
		.assertThatHeadingIsVisible(this.LAST_SYNC_MESSAGE)
		.endAssertion()
		.scrolltoBottom("1500",OrganizationInsightsPage)
		.check(OrganizationInsightsAssertions)
		.assertThatStickyHeaderVisible(this.HEADER_NAME)
		.endAssertion()
		.scrolltoBottom("Downmost",OrganizationInsightsPage)
		.check(OrganizationInsightsAssertions)
		.assertThatStickyHeaderVisible(this.HEADER_NAME)
		.endAssertion()
		.navigateToPageByPath(this.ORGINSIGHT, OrganizationInsightsPage)
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
	}

	public verifyLearningCulture(): void {

		this.getCsLoginPage(this.getConfig().getThinkContentURL())
		.loginToThinkContent(this.getPlaySevenUser().email, this.getPlaySevenUser().password)
		.navigateToPageByPath(this.ORGINSIGHT, OrganizationInsightsPage)
		.clickLearningCultureTab()
		.check(OrganizationInsightsAssertions)
		.assertThatHeadingIsVisible(this.HEADING_LEARNER_BEHAVIOR)
		.assertThatHeadingIsVisible(this.HEADING_TOTAL_TIME_SPENT)
		.assertThatHeadingIsVisible(this.HEADING_CONTENT_CONSUMED)
		.assertThatHeadingIsVisible(this.HEADING_VIEW_VS_COMPLETION)
		.assertThatHeadingIsVisible(this.HEADING_MODALITIES_CONSUMED)
		.assertThatHeadingIsVisible(this.HEADING_TOP_10_SKILLS)
		.assertThatContentSourceVisible()
		.assertThatCompanionInsightSummaryHeader(this.COMPANION_INSIGHT_SUMMARY)
		.assertThatHeadingIsVisible(this.LAST_SYNC_MESSAGE)
		.endAssertion()
		.scrolltoBottom("1500",OrganizationInsightsPage)
		.check(OrganizationInsightsAssertions)
		.assertThatStickyHeaderVisible(this.HEADER_NAME)
		.endAssertion()
		.scrolltoBottom("Downmost",OrganizationInsightsPage)
		.check(OrganizationInsightsAssertions)
		.assertThatStickyHeaderVisible(this.HEADER_NAME)
		.endAssertion()
		//.navigateToPageByPath(ORGINSIGHT, OrganizationInsightsPage)
		//.clickLearningCultureTab()
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
	}

	public verifyObjectives(): void {

		this.getCsLoginPage(this.getConfig().getThinkContentURL())
		.loginToThinkContent(this.getPlaySevenUser().email, this.getPlaySevenUser().password)
		.navigateToPageByPath(this.ORGINSIGHT, OrganizationInsightsPage)
		.clickObjectivesTab()
		.check(OrganizationInsightsAssertions)
		.assertThatHeadingIsVisible(this.HEADING_LEARNER_DISTRIBUTION)
		.assertThatHeadingIsVisible(this.HEADING_TOTAL_TIME_SPENT)
		.assertThatHeadingIsVisible(this.HEADING_CONTENT_CONSUMED)
		.assertThatHeadingIsVisible(this.HEADING_LEARNER_ENGAGEMENT)
		.assertThatHeadingIsVisible(this.HEADING_MODALITIES_CONSUMED)
		.assertThatContentSourceVisible()
		.assertThatCompanionInsightSummaryHeader(this.COMPANION_INSIGHT_SUMMARY)
		.assertThatHeadingIsVisible(this.LAST_SYNC_MESSAGE)
		.endAssertion()
		.scrolltoBottom("1500",OrganizationInsightsPage)
		.check(OrganizationInsightsAssertions)
		.assertThatStickyHeaderVisible(this.HEADER_NAME)
		.endAssertion()
		.scrolltoBottom("Downmost",OrganizationInsightsPage)
		.check(OrganizationInsightsAssertions)
		.assertThatStickyHeaderVisible(this.HEADER_NAME)
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
	}

	//@Test(description = "CP-1454")
	public verifyLastSyncDate(): void {

		this.getCsLoginPage(this.getConfig().getThinkContentURL())
		.loginToThinkContent(this.getPlaySevenUser().email, this.getPlaySevenUser().password)
		.navigateToPageByPath(this.ORGINSIGHT, OrganizationInsightsPage)
		.check(OrganizationInsightsAssertions)
		.assertThatHeadingIsVisible(this.LAST_SYNC_MESSAGE)
		.endAssertion()
		.clickLearningCultureTab()
		.check(OrganizationInsightsAssertions)
		.assertThatHeadingIsVisible(this.LAST_SYNC_MESSAGE)
		.endAssertion()
		.clickObjectivesTab()
		.check(OrganizationInsightsAssertions)
		.assertThatHeadingIsVisible(this.LAST_SYNC_MESSAGE)
		.endAssertion();
	}

}
