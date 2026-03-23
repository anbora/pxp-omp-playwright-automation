import { Faker } from "com/github/javafaker/Faker";
import { BaseTest } from "common/BaseTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { ITestContext } from "common/testing/runtime";
import { CreateCollectionAssertions } from "cs/assertions/CreateCollectionAssertions";
import { CreateCollectionPage } from "cs/pages/CreateCollectionPage";
import { OpenCollection } from "cs/scenarios/OpenCollection";
import { ResultContainer } from "models/ResultContainer";

export class VerifyCollectionTest_G1_CSX extends BaseTest {

	private readonly PATH: string[] = [ "Curation", "Explore collections" ];
	private readonly YOURCOLLECTION_PATH: string[] = [ "Curation", "Your collections" ];
	data: Faker = new Faker();
	dfor: DateFormat = new SimpleDateFormat("ddMMyy_HHmmss");
	private readonly LABEL_SUBSCRIBE: string = "Subscribed";
	private readonly LABEL_NEW: string = "New";
	private readonly LABEL_RETIRING: string = "Retiring";
	private readonly AI_SEARCH_KEYWORD: string = "Leadership";
	collectionName_AI: ResultContainer = new ResultContainer();
	private readonly searchAI: string[] = ["Leadership","Business","Time Management","People","Python","Java","Selenium"];

	// Fully implemented
	public createCollectionAndSendForReview(testdata: ITestContext): void {

		let courseToBeAdd: string[][] = [ [ "Subscriptions only", "Architecting Scalable Python Applications" ]];
		let collectionReviewerUpdated: string = "CS Tester updated1";
		let today: any = new Date();
		let collectionName: string = "Auto_" + this.data.name().firstName() + this.dfor.format(today);
		let collectionDes: string = "AutoDes_" + this.data.name().firstName() + this.dfor.format(today);
		testdata.setAttribute("collectionToPublish", collectionName);
		this.getCsLoginPage(this.getConfig().getThinkContentURL())
		.loginToThinkContent(this.getPlayThirteenUser().email, this.getPlayThirteenUser().password)
		.navigateToPageByPath(this.YOURCOLLECTION_PATH, CreateCollectionPage)
		.createCollection(collectionName, collectionDes, "suomi (Suomi)s")
		.ClickAddcontent()
		.Addcontent(courseToBeAdd)
		.clickReviewCollection()
		.clickAddContentToCollection()
		.clickSendCollectionForReview()
		.clickCollectionReviewDownArr()
		.inputReviewerName(collectionReviewerUpdated)
		.selectCollectionReviewer(collectionReviewerUpdated)
		.clickSendReview()
		.check(CreateCollectionAssertions)
		.assertThatReviewerNameIsVisible(collectionReviewerUpdated)
		.endAssertion();
	}

	public publishCollectionAndAddContent(testdata: ITestContext): void {

		let collectionName: string = testdata.getAttribute("collectionToPublish");

		let courseToBeAdd_AfterPublish: string[][] = [
				[ "Subscriptions only", "20 Questions To Help You Start a Business" ] ];

		this.getCsLoginPage(this.getConfig().getThinkContentURL())
		.loginToThinkContent("cstester@csod.com", "Csod567")
		.navigateToPageByPath(this.YOURCOLLECTION_PATH, CreateCollectionPage)
		.clickPendingReview()
		.run(new OpenCollection(collectionName))
		.clickPublish()
		.clickPublishnow()
		.check(CreateCollectionAssertions)
		.assertThatPublishCollectionSuccess("Collection successfully published!")
		.assertThatButtonIsVisible("Continue exploring")
		.assertThatButtonIsVisible("View in platform")
		.endAssertion()
		.clickContinueExploring()
		.navigateToPageByPath(this.PATH, CreateCollectionPage)
		.run(new OpenCollection(collectionName))
		.clickManageContent()
		.clickMangeOption("Add Courses")
		.Addcontent(courseToBeAdd_AfterPublish)
		.clickReviewCollection()
		.clickAddContentToCollection();
	}

	// Fully implemented
	public validateCountAndDuration(): void {

		let courseToBeAdd: string[][] = [ [ "Subscriptions only", "Architecting Scalable Python Applications" ],
				[ "Subscriptions only", "20 Questions To Help You Start a Business" ],
				[ "Learning platform only", "Microsoft Office 2016 Excel Basic" ] ];
		let expectedDuration: string[] = ["1.1 hours","3.5 hours"];
		let today: any = new Date();
		let collectionName: string = "Auto_" + this.data.name().firstName() + this.dfor.format(today);
		let collectionDes: string = "AutoDes_" + this.data.name().firstName() + this.dfor.format(today);

		this.getCsLoginPage(this.getConfig().getThinkContentURL())
		.loginToThinkContent(this.getPlayThirteenUser().email, this.getPlayThirteenUser().password)
		.navigateToPageByPath(this.PATH, CreateCollectionPage)
		.createCollection(collectionName, collectionDes, "suomi (Suomi)s")
		.ClickAddcontent()
		.Addcontent(courseToBeAdd)
		.clickReviewCollection()
		.clickAddContentToCollection()
		.check(CreateCollectionAssertions)
		.assertThatCountIsVisible(3)
		.assertThatDurationIsVisible()
		.endAssertion();

	}

	//@Test
	// Fully implemented
	public manageContentAdd(): void {

		let courseToBeAdd: string[][] = [ [ "Subscriptions only", "Architecting Scalable Python Applications" ],
				[ "Learning platform only", "Microsoft Office 2016 Excel Basic" ] ];

		let today: any = new Date();
		let collectionName: string = "Auto_" + this.data.name().firstName() + this.dfor.format(today);
		let collectionDes: string = "AutoDes_" + this.data.name().firstName() + this.dfor.format(today);
		let add_course: string = "Mastering Excel 2013 - Basics";

		this.getCsLoginPage(this.getConfig().getThinkContentURL())
		.loginToThinkContent(this.getPlayThirteenUser().email, this.getPlayThirteenUser().password)
		.navigateToPageByPath(this.YOURCOLLECTION_PATH, CreateCollectionPage)
		.createCollection(collectionName, collectionDes, "suomi (Suomi)s")
		.ClickAddcontent()
		.Addcontent(courseToBeAdd)
		.clickReviewCollection()
		.clickAddContentToCollection()
		.waitForTime(3000)
		.navigateToPageByPath(this.YOURCOLLECTION_PATH, CreateCollectionPage)
		.run(new OpenCollection(collectionName))
		.clickManageContent()
		.clickMangeOption("Add Courses")
		.searchContent(add_course)
		.pressKey("Enter")
		.selectcourse(add_course)
		.clickReviewCollection()
		.check(CreateCollectionAssertions)
		.assertThatMessageIsVisible(add_course)
		.endAssertion()
		.clickAddContentToCollection();
	}

	//@Test
	//Fully not Implemented
	public manageContentOrder(): void {
		let courseToBeAdd: string[][] = [ [ "Subscriptions only", "Architecting Scalable Python Applications" ],
				[ "Subscriptions only", "20 Questions To Help You Start a Business" ],
				[ "Learning platform only", "Microsoft Office 2016 Excel Basic" ] ];
		let today: any = new Date();
		let collectionName: string = "Auto_" + this.data.name().firstName() + this.dfor.format(today);
		let collectionDes: string = "AutoDes_" + this.data.name().firstName() + this.dfor.format(today);

		this.getCsLoginPage(this.getConfig().getThinkContentURL())
				.loginToThinkContent(this.getPlayThirteenUser().email, this.getPlayThirteenUser().password)
				.navigateToPageByPath(this.PATH, CreateCollectionPage)
				.run(new OpenCollection("AutomationCollectionTitle_2023-09-24_1634_mWNMUnlt3A"))
				.clickManageContent()
				.clickMangeOption("Order Courses")
				.dragAndDrop();

	}

	//@Test
	// Fully implemented
	public manageContentDelete(): void {

		let courseToBeAdd: string[][] = [ [ "Subscriptions only", "Architecting Scalable Python Applications" ],
				[ "Subscriptions only", "20 Questions To Help You Start a Business" ],
				[ "Learning platform only", "Microsoft Office 2016 Excel Basic" ] ];

		let today: any = new Date();
		let collectionName: string = "Auto_" + this.data.name().firstName() + this.dfor.format(today);
		let collectionDes: string = "AutoDes_" + this.data.name().firstName() + this.dfor.format(today);

		this.getCsLoginPage(this.getConfig().getThinkContentURL())

		.loginToThinkContent(this.getPlayThirteenUser().email, this.getPlayThirteenUser().password)
		.navigateToPageByPath(this.PATH, CreateCollectionPage)
		.createCollection(collectionName, collectionDes, "suomi (Suomi)s")
		.ClickAddcontent()
		.Addcontent(courseToBeAdd)
		.clickReviewCollection()
		.clickAddContentToCollection()
		.navigateToPageByPath(this.YOURCOLLECTION_PATH, CreateCollectionPage)
		.waitForContentCardLoad()
		.run(new OpenCollection(collectionName))
		.clickManageContent()
		.clickMangeOption("Delete Courses")
		.selectcourse(courseToBeAdd[2][1])
		.clickDeleteSelected()
		.clickYes()
		.check(CreateCollectionAssertions)
		.assertThatMessageIsNotVisible(collectionDes)
		.endAssertion();
	}

	//@Test
	// Fully implemented
	public exportCollectionAndvalidateCSV(): void {
		let today: any = new Date();
		let collectionName: string = "Auto_" + this.data.name().firstName() + this.dfor.format(today);
		let collectionDes: string = "AutoDes_" + this.data.name().firstName() + this.dfor.format(today);
		this.getCsLoginPage(this.getConfig().getThinkContentURL())

				.loginToThinkContent(this.getPlayThirteenUser().email, this.getPlayThirteenUser().password)
				.navigateToPageByPath(this.PATH, CreateCollectionPage)
				.createCollection(collectionName, collectionDes, null)
				.check(CreateCollectionAssertions)
				.assertThatMessageIsVisible("Add content to your collection")
				.endAssertion()
				.clickCollectionOptionVerticalDot()
				.clickCollectionOption("Export collection as CSV");
		// Add CSV validation

	}

	// Fully implemented
	public DeleteCollectionWithContent(): void {

		let today: any = new Date();
		let collectionName: string = "Auto_" + this.data.name().firstName() + this.dfor.format(today);
		let collectionDes: string = "AutoDes_" + this.data.name().firstName() + this.dfor.format(today);

		let courseToBeAdd: string[][] = [ [ "Subscriptions only", "Architecting Scalable Python Applications" ],
				[ "Learning platform only", "Microsoft Office 2016 Excel Basic" ] ];


		this.getCsLoginPage(this.getConfig().getThinkContentURL())
		.loginToThinkContent(this.getPlayThirteenUser().email, this.getPlayThirteenUser().password)
		.navigateToPageByPath(this.YOURCOLLECTION_PATH, CreateCollectionPage)
		.createCollection(collectionName, collectionDes, null)
		.ClickAddcontent()
		.Addcontent(courseToBeAdd)
		.waitForTime(5000)
		.clickCollectionOptionVerticalDot()
		.clickCollectionOption("Delete collection")
		.clickYes();
				// Add Assertion
	}

	// Fully implemented
	public ModifyCollectionDetails(): void {

		let today: any = new Date();
		let collectionName: string = "Auto_" + this.data.name().firstName() + this.dfor.format(today);
		let collectionDes: string = "AutoDes_" + this.data.name().firstName() + this.dfor.format(today);

		this.getCsLoginPage(this.getConfig().getThinkContentURL())
		.loginToThinkContent(this.getPlayThirteenUser().email, this.getPlayThirteenUser().password)
		.navigateToPageByPath(this.PATH, CreateCollectionPage)
		.createCollection(collectionName, collectionDes, null)
		.check(CreateCollectionAssertions)
		.assertThatMessageIsVisible("Add content to your collection")
		.endAssertion()
		.clickCollectionOptionVerticalDot()
		.clickCollectionOption("Modify collection details");
	}

	// Fully implemented
	public DeleteCollectionWithoutContent(): void {
		let today: any = new Date();
		let collectionName: string = "Auto_" + this.data.name().firstName() + this.dfor.format(today);
		let collectionDes: string = "AutoDes_" + this.data.name().firstName() + this.dfor.format(today);

		this.getCsLoginPage(this.getConfig().getThinkContentURL())
		.loginToThinkContent(this.getPlayThirteenUser().email, this.getPlayThirteenUser().password)
		.navigateToPageByPath(this.PATH, CreateCollectionPage)
		.createCollection(collectionName, collectionDes, null)
		.check(CreateCollectionAssertions)
		.assertThatMessageIsVisible("Add content to your collection")
		.endAssertion()
		.clickCollectionOptionVerticalDot()
		.clickCollectionOption("Delete collection");
	}
}
