import { BaseTest } from "common/BaseTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { CourseDetailsAssertions } from "cs/assertions/CourseDetailsAssertions";
import { IndustryInsightsAssertions } from "cs/assertions/IndustryInsightsAssertions";
import { SubscriptionAssertions } from "cs/assertions/SubscriptionAssertions";
import { CourseDetailsPage } from "cs/pages/CourseDetailsPage";
import { IndustryInsightsPage } from "cs/pages/IndustryInsightsPage";
import { SubscriptionPage } from "cs/pages/SubscriptionPage";
import { ResultContainer } from "models/ResultContainer";

export class VerifyIndustryInsightsVertical_CSX extends BaseTest{

	private readonly INDUSTRYINSIGHT: string[] = [ "Insights", "Industry insights" ];
	private readonly LAST_SYNC_MESSAGE: string = "LAST SYNCED: SEP 7, 2024 (UPDATES MONTHLY)";
	private readonly LEARNING_CULTURE_ALL: string = "All";
	private readonly LEARNING_CULTURE_ASSIGNED: string = "Assigned";
	private readonly LEARNING_CULTURE_SELF: string = "Self-directed";
	private readonly TOP_TEN_SKILL: string = "Top 10 skills in your vertical";
	private readonly HEADER_NAME: string = "Industry insights";
	private readonly COMPANION_INSIGHT_SUMMARY: string = "Companion insight summary";

	public verifyVerticalAllSectionHeader(): void {

		this.getCsLoginPage(this.getConfig().getThinkContentURL())
		.loginToThinkContent(this.getPlayNineUser().email, this.getPlayNineUser().password)
		.navigateToPageByPath(this.INDUSTRYINSIGHT, IndustryInsightsPage)
		.clickVerticalTab()
		.check(IndustryInsightsAssertions)
		.assertThatHeaderBetaTagVisible(this.INDUSTRYINSIGHT[1])
		.assertThatHeadingIsVisible("Active Learners")
		.assertThatHeadingIsVisible("Content consumption")
		.assertThatHeadingIsVisible("Time Spent")
		.assertThatHeadingIsVisible("Skills learned")
		.assertThatHeadingIsVisible("Top 10 skills in your vertical")
		.assertThatHeadingIsVisible("Top 10 courses in your vertical")
		.assertThatHeadingIsVisible(this.COMPANION_INSIGHT_SUMMARY)
		.endAssertion()
		.scrolltoBottom("1500",IndustryInsightsPage)
		.check(IndustryInsightsAssertions)
		.assertThatStickyHeaderVisible(this.HEADER_NAME)
		.endAssertion()
		.scrolltoBottom("Downmost",IndustryInsightsPage)
		.check(IndustryInsightsAssertions)
		.assertThatStickyHeaderVisible(this.HEADER_NAME)
		.endAssertion();
	 }

	public verifyVerticalTopTenCourses(): void {

		const SECTIONNAME_TOPCOURSES: string = "Top 10 courses in your vertical";
		let coursetoClick: string = "Microsoft 365 OneDrive - Beginner";
		let qvSkill: any = new ResultContainer();
		let qvlanguage: any = new ResultContainer();
		let qvCategory: any = new ResultContainer();
		let qvTopic: any = new ResultContainer();
		let qvSubject: any = new ResultContainer();
		let qvProvider: any = new ResultContainer();

		this.getCsLoginPage(this.getConfig().getThinkContentURL())
		.loginToThinkContent(this.getPlayNineUser().email, this.getPlayNineUser().password)
		.navigateToPageByPath(this.INDUSTRYINSIGHT, IndustryInsightsPage)
		.clickVerticalTab()
		.check(IndustryInsightsAssertions)
		.assertThatHeadingIsVisible(SECTIONNAME_TOPCOURSES)
		.assertTextAssignedLlearningIsVisible(SECTIONNAME_TOPCOURSES)
		.assertTextSelfDirectedLearningVisible(SECTIONNAME_TOPCOURSES)
		.assertSelfDirectedTableDataCount(SECTIONNAME_TOPCOURSES)
		.assertAssignedLearningTableDataCount(SECTIONNAME_TOPCOURSES)
		.endAssertion()
		.clickAssignedLearningTopTenCourse(SECTIONNAME_TOPCOURSES,coursetoClick)
		.getQuickViewSkill(qvSkill, IndustryInsightsPage)
		.getQuickViewLanguage(qvlanguage, IndustryInsightsPage)
		.getQuickViewProvider(qvProvider, IndustryInsightsPage)
		.getQuickViewCategory(qvCategory, IndustryInsightsPage)
		.getQuickViewTopic(qvTopic, IndustryInsightsPage)
		.getQuickViewSubject(qvSubject, IndustryInsightsPage)
		.getPageClass(SubscriptionPage)
		.check(SubscriptionAssertions)
		.assertThatButtonWithOptionVisible("All-time")
		.assertThatButtonWithOptionVisible("Last Quarter")
		.assertThatYourLearnerMetricVisible("Not subscribed yet")
		.assertThatTotalLearnerMetricTextVisible()
		.assertThatQuickViewDurationIsVisible(coursetoClick)
		.endAssertion()
		.clickGoToDetails(IndustryInsightsPage)
		.getPageClass(CourseDetailsPage)
		.check(CourseDetailsAssertions)
		.assertThatLanguageIsVisible(qvlanguage.getValue())
		.assertThatContentPartnerIsVisible(qvProvider.getValue())
		.assertThatSkillIsVisible(qvSkill.getValue())
		.assertThatCategoryIsVisible(qvCategory.getValue())
		.assertThatTopicIsVisible(qvTopic.getValue())
		.assertThatSubjectIsVisible(qvSubject.getValue())
		.endAssertion();
	 }

	public verifyVerticalTopTenSkill(): void {

		const SECTIONNAME_TOPSKILL: string = "Top 10 skills in your vertical";

		this.getCsLoginPage(this.getConfig().getThinkContentURL())
		.loginToThinkContent(this.getPlayNineUser().email, this.getPlayNineUser().password)
		.navigateToPageByPath(this.INDUSTRYINSIGHT, IndustryInsightsPage)
		.clickVerticalTab()
		.check(IndustryInsightsAssertions)
		.assertThatHeaderBetaTagVisible(this.INDUSTRYINSIGHT[1])
		.assertThatHeadingIsVisible(SECTIONNAME_TOPSKILL)
		.assertTextAssignedLlearningIsVisible(SECTIONNAME_TOPSKILL)
		.assertTextSelfDirectedLearningVisible(SECTIONNAME_TOPSKILL)
		.assertSelfDirectedTableDataCount(SECTIONNAME_TOPSKILL)
		.assertAssignedLearningTableDataCount(SECTIONNAME_TOPSKILL)
		.endAssertion();
	 }

	public verifyVerticalFilters(): void {

		this.getCsLoginPage(this.getConfig().getThinkContentURL())
		.loginToThinkContent(this.getPlayEightUser().email, this.getPlayEightUser().password)
		.navigateToPageByPath(this.INDUSTRYINSIGHT, IndustryInsightsPage)
		.clickVerticalTab()
		.check(IndustryInsightsAssertions)
		.assertThatLearningCultureIsVisible()
		.endAssertion()
		.clickLearningCultureArrow()
		.selectLearningCulture(this.LEARNING_CULTURE_ASSIGNED);
	 }

	public verifyVerticalDateLastSync(): void {

		this.getCsLoginPage(this.getConfig().getThinkContentURL())
		.loginToThinkContent(this.getPlayEightUser().email, this.getPlayEightUser().password)
		.navigateToPageByPath(this.INDUSTRYINSIGHT, IndustryInsightsPage)
		.clickVerticalTab()
		.check(IndustryInsightsAssertions)
		.assertThatLastSyncMessageVisible(this.LAST_SYNC_MESSAGE)
		.endAssertion();
	}

	public verifyVerticalTimeFrame(): void {

		this.getCsLoginPage(this.getConfig().getThinkContentURL())
		.loginToThinkContent(this.getPlayEightUser().email, this.getPlayEightUser().password)
		.navigateToPageByPath(this.INDUSTRYINSIGHT, IndustryInsightsPage)
		.clickVerticalTab()
		.check(IndustryInsightsAssertions)
		.assertThatTimeFameSelectorIsVisible(String.valueOf(3))
		.endAssertion()
		.clickRegionTimeFramArrow(String.valueOf(3))
		.selectTimeFrame(String.valueOf(6));
	}
}
