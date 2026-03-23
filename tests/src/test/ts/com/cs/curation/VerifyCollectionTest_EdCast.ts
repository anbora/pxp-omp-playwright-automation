import { Faker } from "com/github/javafaker/Faker";
import { BaseTest } from "common/BaseTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { ITestContext } from "common/testing/runtime";
import { CourseDetailsAssertions } from "cs/assertions/CourseDetailsAssertions";
import { CreateCollectionAssertions } from "cs/assertions/CreateCollectionAssertions";
import { CourseDetailsPage } from "cs/pages/CourseDetailsPage";
import { CreateCollectionPage } from "cs/pages/CreateCollectionPage";
import { SubscriptionPage } from "cs/pages/SubscriptionPage";
import { OpenCollection } from "cs/scenarios/OpenCollection";
import { ResultContainer } from "models/ResultContainer";

export class VerifyCollectionTest_EdCast extends BaseTest {

	private readonly PATH: string[] = [ "Curation", "Explore collections" ];
	private readonly YOURCOLLECTION_PATH: string[] = [ "Curation", "Your collections" ];
	private readonly EXPLORESUBSCRIPTIONPATH: string[] = ["Subscriptions","Explore subscriptions"];
	private readonly YOURSUBSCRIPTIONPATH: string[] = ["Subscriptions","Your subscriptions"];
	private readonly SORING_BY_NEWEST: string = "By newest";
	private readonly SORING_BY_TOTAL_LEARNER: string = "By total learners";
	private readonly SORING_BY_YOUR_LEARNER: string = "By your learners";
	private readonly ALL_CONTENT: string = "All content";
	private readonly SUBSCRIBE_CONTENT: string = "Subscriptions only";
	private readonly LEARNING_CONTENT: string = "Learning platform only";
	data: Faker = new Faker();
	dfor: DateFormat = new SimpleDateFormat("ddMMyy_HHmmss");
	textCon: Array<string> = [];
	private duration: ResultContainer = new ResultContainer();
	private language: ResultContainer = new ResultContainer();
	private subscription: ResultContainer = new ResultContainer();
	private readonly CATEGORY_LANGUAGE_REGION: string = "Language Region";

	public verifyOrderCourseNotAvailable(testdata: ITestContext): void {

		let collectionName: string = testdata.getAttribute("collectionToValidate");
		System.out.println("verifyOrderCourseNotAvailable  : "+collectionName);

		this.getCsLoginPage(this.getConfig().getEdCastURL())
		.navigateToLogin()
		.loginToApplication(this.getPlayEdCastUserTwo().email, this.getPlayEdCastUserTwo().password)
		.launchEdCastContentStudio()
		.navigateToPageByPath(this.YOURCOLLECTION_PATH, CreateCollectionPage)
		.run(new OpenCollection(collectionName))
		.waitForTime(3000)
		.clickManageContent()
		.check(CreateCollectionAssertions)
		.assertThatMangeOptionNotVisible("Order Courses")
		.endAssertion()
		.closeDialog()
		.logoutFromContentStudio(CreateCollectionPage);
	}

	public verifySortingOptionAndSubscriptionDetails(testdata: ITestContext): void {

		let courseToBeAdd: string[][] = [["Subscriptions only", "Python Programming" ]];
		let today: any = new Date();
		let collectionName: string = "Auto_" + this.data.name().firstName() + this.dfor.format(today);
		let collectionDes: string = "AutoDes_" + this.data.name().firstName() + this.dfor.format(today);
		testdata.setAttribute("collectionToValidate", collectionName);


		this.getCsLoginPage(this.getConfig().getEdCastURL())
		.navigateToLogin()
		.loginToApplication(this.getPlayEdCastUserTwo().email, this.getPlayEdCastUserTwo().password)
		.launchEdCastContentStudio()
		.navigateToPageByPath(this.YOURSUBSCRIPTIONPATH, CreateCollectionPage)
		.waitForTime(5000)
		.getYourSubsciption(this.textCon)
		.navigateToPageByPath(this.PATH, CreateCollectionPage)
		.createCollection(collectionName, collectionDes,null)
		.ClickAddcontent()
		.clickfilterArrow("Subscriptions")
		.waitForTime(5000)
		.check(CreateCollectionAssertions)
		//.assertThatFilterValueDisplay(textCon)
		.endAssertion()
		.closeDialog()
		.clickClearAllFilters(CreateCollectionPage)
		.clickContentSourceDownArrow()
		.selectContentSource(this.SUBSCRIBE_CONTENT)
		.clickSortingDownArrow(CreateCollectionPage)
		.check(CreateCollectionAssertions)
		.assertThatSortingOptionVisible(this.SORING_BY_NEWEST)
		.assertThatSortingOptionVisible(this.SORING_BY_TOTAL_LEARNER)
		.assertThatSortingOptionVisible(this.SORING_BY_YOUR_LEARNER)
		.endAssertion()
		.closeDialog()
		.searchContent(courseToBeAdd[0][1])
		.selectcourse(courseToBeAdd[0][1])
		.clickQuickView(courseToBeAdd[0][1], CreateCollectionPage)
		.getQuickViewDuration(this.duration,CreateCollectionPage)
		.getQuickViewLanguage(this.language,CreateCollectionPage)
		.getQuickViewSubscription(this.subscription,CreateCollectionPage)
		.clickGoToDetails(CreateCollectionPage)
		.check(CreateCollectionAssertions)
		.assertThatSubsDurationIsVisible(this.duration.getValue())
		.assertThatLanguageIsVisible(this.language.getValue())
		.assertThatSubscriptionIsVisible(this.subscription.getValue())
		.endAssertion()
		.goToLastPage()
		.closeQuickViewDialog(courseToBeAdd[0][1])
		.selectcourse(courseToBeAdd[0][1])
		.clickReviewCollection()
		.clickAddContentToCollection()
		.logoutFromContentStudio(SubscriptionPage);

	}

	public verifyProviderNameDurationLanguage(): void {

	let languageValue: Array<string> = [];
	let durationValue: Array<string> = [];
	let skill: any = new ResultContainer();
	let courseToBeAdd: string[][] = [["Subscriptions only", "Python Programming" ]];
	let today: any = new Date();
	let collectionName: string = "Auto_" + this.data.name().firstName() + this.dfor.format(today);
	let collectionDes: string = "AutoDes_" + this.data.name().firstName() + this.dfor.format(today);

	this.getCsLoginPage(this.getConfig().getEdCastURL())
	.navigateToLogin()
	.loginToApplication(this.getPlayEdCastUserTwo().email, this.getPlayEdCastUserTwo().password)
	.launchEdCastContentStudio()
	.navigateToPageByPath(this.PATH, CreateCollectionPage)
	.createCollection(collectionName, collectionDes,null)
	.ClickAddcontent()
	//.clickClearAllFilters(CreateCollectionPage)
	.clickContentSourceDownArrow()
	.selectContentSource(this.LEARNING_CONTENT)
	.searchContent("I/T Architecture in Action") //who s afraid of the blockchain
	.waitForContentCardLoad()
	.getConentCardLanguageValue(languageValue)
	.getConentCardDurationValue(durationValue)
	.check(CreateCollectionAssertions)
	.assertThatContentCardLanguage(languageValue)
	.assertThatContentCardDuration(durationValue,"0 minutes")
	.endAssertion()
	.clickQuickView("I/T Architecture in Action", CreateCollectionPage) //who s afraid of the blockchain
	.getQuickViewSkill(skill,CreateCollectionPage)
	.closeQuickViewDialog("I/T Architecture in Action")	//who s afraid of the blockchain
	.clickAllFilters(CreateCollectionPage)
	.expandCategory("Skills", CreateCollectionPage)
	.check(CreateCollectionAssertions)
	.assertThatAllFilterValueVisible(skill.getValue())
	.endAssertion()
	.clickCloseIcon(CreateCollectionPage)
	.logoutFromContentStudio(CreateCollectionPage);

	}

	public verifyDurationLanguageForSubscribedContent(): void {

	let languageValue: Array<string> = [];
	let durationValue: Array<string> = [];

	let qvSkill: any = new ResultContainer();
	let qvlanguage: any = new ResultContainer();
	let qvCategory: any = new ResultContainer();
	let qvTopic: any = new ResultContainer();
	let qvSubject: any = new ResultContainer();
	let qvProvider: any = new ResultContainer();

	let courseToBeAdd: string[][] = [["Subscriptions only", "Python Programming" ]];
	let today: any = new Date();
	let collectionName: string = "Auto_" + this.data.name().firstName() + this.dfor.format(today);
	let collectionDes: string = "AutoDes_" + this.data.name().firstName() + this.dfor.format(today);

	this.getCsLoginPage(this.getConfig().getEdCastURL())
	.navigateToLogin()
	.loginToApplication(this.getPlayEdCastUserTwo().email, this.getPlayEdCastUserTwo().password)
	.launchEdCastContentStudio()
	.navigateToPageByPath(this.EXPLORESUBSCRIPTIONPATH, CreateCollectionPage)
	.waitForTime(5000)
	.navigateToPageByPath(this.PATH, CreateCollectionPage)
	.waitForTime(3000)
	.createCollection(collectionName, collectionDes,null)
	.ClickAddcontent()
	.clickClearAllFilters(CreateCollectionPage)
	.clickContentSourceDownArrow()
	.selectContentSource(this.SUBSCRIBE_CONTENT)
	.waitForContentCardLoad()
	.getConentCardLanguageValue(languageValue)
	.getConentCardDurationValue(durationValue)
	.check(CreateCollectionAssertions)
	.assertThatContentCardLanguage(languageValue)
	.assertThatContentCardDuration(durationValue,"0 minutes")
	.endAssertion()
	.searchContent("Why Should You Collaborate?")
	.selectcourse("Why Should You Collaborate?")
	.clickQuickView("Why Should You Collaborate?", CreateCollectionPage)
	.getQuickViewSkill(qvSkill,CreateCollectionPage)
	.getQuickViewLanguage(qvlanguage, CreateCollectionPage)
	.getQuickViewProvider(qvProvider, CreateCollectionPage)
	.getQuickViewCategory(qvCategory, CreateCollectionPage)
	.getQuickViewTopic(qvTopic, CreateCollectionPage)
	.getQuickViewSubject(qvSubject, CreateCollectionPage)
	.closeQuickViewDialog("Why Should You Collaborate?")
	.clickAllFilters(CreateCollectionPage)
	.check(CreateCollectionAssertions)
	.assertThatAllFilterCategoryNotVisible(this.CATEGORY_LANGUAGE_REGION)
	.endAssertion()
	.clickCloseIcon(CourseDetailsPage)
	.clickQuickView("Why Should You Collaborate?", CreateCollectionPage)
	.clickGoToDetails(CourseDetailsPage)
	.check(CourseDetailsAssertions)
	.assertThatLanguageIsVisible(qvlanguage.getValue())
	.assertThatContentPartnerIsVisible(qvProvider.getValue())
	.assertThatSkillIsVisible(qvSkill.getValue())
	.assertThatCategoryIsVisible(qvCategory.getValue())
	.assertThatTopicIsVisible(qvTopic.getValue())
	.assertThatSubjectIsVisible(qvSubject.getValue())
	.endAssertion()
	.goToLastPage()
	.clickCloseQuickViewDialog("Why Should You Collaborate?",CreateCollectionPage)
	.logoutFromContentStudio(SubscriptionPage);

	}

	public verifyPublishCollection(): void {

		let courseToBeAdd: string[][] = [ [ "Subscriptions only", "Identify Key Details of Change" ],
				[ "Learning platform only", "Learning Experience Platform | LXP - EdCast" ]];

		let collectionReviewer: string = "EDTRYTWOF EDTRYTWOL";

		let today: any = new Date();
		let collectionName: string = "Auto_" + this.data.name().firstName() + this.dfor.format(today);
		let collectionDes: string = "AutoDes_" + this.data.name().firstName() + this.dfor.format(today);

		this.getCsLoginPage(this.getConfig().getEdCastURL())
		.navigateToLogin()
		.loginToApplication(this.getPlayEdCastUserTwo().email, this.getPlayEdCastUserTwo().password)
		.launchEdCastContentStudio()
		.navigateToPageByPath(this.YOURCOLLECTION_PATH, CreateCollectionPage)
		.createCollection(collectionName, collectionDes, null)
		.ClickAddcontent()
		.clickClearAllFilters(CreateCollectionPage)
		.Addcontent(courseToBeAdd)
		.clickReviewCollection()
		.clickAddContentToCollection()
		.clickSendCollectionForReview()
		.clickCollectionReviewDownArr()
		.inputReviewerName(collectionReviewer)
		.selectCollectionReviewer(collectionReviewer+" (You)")
		.clickSendReview()
		.check(CreateCollectionAssertions)
		.assertThatReviewerNameIsVisible(collectionReviewer)
		.endAssertion()
		.clickPublish()
		.clickPublishnow()
		.check(CreateCollectionAssertions)
		.assertThatPublishCollectionSuccess("Collection successfully published!")
		.assertThatButtonIsVisible("Continue exploring")
		.assertThatButtonIsVisible("View in platform")
		.endAssertion()
		.clickContinueExploring()
		.check(CreateCollectionAssertions)
		.assertThatBannerPublishMessageVisible("Pathway","Cornerstone Learning Experience")
		.assertThatBannerPublisherNameVisible(collectionReviewer)
		.endAssertion()
		.logoutFromContentStudio(CreateCollectionPage);

	}
}
