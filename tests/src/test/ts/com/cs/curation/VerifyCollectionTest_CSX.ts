import { Faker } from "com/github/javafaker/Faker";
import { BaseTest } from "common/BaseTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { ITestContext } from "common/testing/runtime";
import { CreateCollectionAssertions } from "cs/assertions/CreateCollectionAssertions";
import { CreateCollectionPage } from "cs/pages/CreateCollectionPage";
import { OpenCollection } from "cs/scenarios/OpenCollection";
import { ResultContainer } from "models/ResultContainer";

export class VerifyCollectionTest_CSX extends BaseTest {

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
	public createCollection(): void {
		let today: any = new Date();

		let collectionName: string = "Auto_" + this.data.name().firstName() + this.dfor.format(today);
		let collectionDes: string = "AutoDes_" + this.data.name().firstName() + this.dfor.format(today);

		this.getCsLoginPage(this.getConfig().getThinkContentURL())
				.loginToThinkContent(this.getPlayTwoUser().email, this.getPlayOneUser().password)
				.navigateToPageByPath(this.PATH, CreateCollectionPage)
				.check(CreateCollectionAssertions)
				.assertThatButtonIsVisible("All Collections")
				.assertThatButtonIsVisible("Cornerstone Curated")
				.endAssertion()
				.createCollection(collectionName, collectionDes, null)
				.check(CreateCollectionAssertions)
				.assertThatMessageIsVisible("Add content to your collection")
				.endAssertion();
	}

	// Fully implemented
	public sendCollectionforReview(): void {
		let courseToBeAdd: string[][] = [ [ "Subscriptions only", "Architecting Scalable Python Applications" ],
				[ "Subscriptions only", "20 Questions To Help You Start a Business" ],
				[ "Learning platform only", "Microsoft Office 2016 Excel Basic" ] ];
		let collectionReviewer: string = "Nitin Mane";
		let today: any = new Date();
		let collectionName: string = "Auto_" + this.data.name().firstName() + this.dfor.format(today);
		let collectionDes: string = "AutoDes_" + this.data.name().firstName() + this.dfor.format(today);

		this.getCsLoginPage(this.getConfig().getThinkContentURL())
				.loginToThinkContent(this.getPlayTwoUser().email, this.getPlayOneUser().password)
				.navigateToPageByPath(this.PATH, CreateCollectionPage)
				.createCollection(collectionName, collectionDes, "suomi (Suomi)s")
				.ClickAddcontent()
				.Addcontent(courseToBeAdd)
				.clickReviewCollection()
				.clickAddContentToCollection()
				.check(CreateCollectionAssertions)
				.assertThatMessageIsVisible(courseToBeAdd[0][1])
				.assertThatMessageIsVisible(courseToBeAdd[1][1])
				.assertThatMessageIsVisible(courseToBeAdd[2][1])
				.endAssertion()
				.clickSendCollectionForReview()
				.clickCollectionReviewDownArr()
				.inputReviewerName(collectionReviewer)
				.selectCollectionReviewer(collectionReviewer)
				.clickSendReview()
				.check(CreateCollectionAssertions)
				.assertThatReviewerNameIsVisible(collectionReviewer)
				.endAssertion();
	}

	// Fully Implemented
	public changeCollectionReviewer(testdata: ITestContext): void {

		let courseToBeAdd: string[][] = [ [ "Subscriptions only", "Architecting Scalable Python Applications" ]];
		//{ "Learning platform only", "Microsoft Office 2016 Excel Basic" } };
		let collectionReviewer: string = "Nitin Mane";
		let collectionReviewerUpdated: string = "CS Tester updated1";
		let today: Date = new Date();
		let collectionName: string = "Auto_" + this.data.name().firstName() + this.dfor.format(today);
		let collectionDes: string = "AutoDes_" + this.data.name().firstName() + this.dfor.format(today);
		testdata.setAttribute("collectionToComment", collectionName);

		this.getCsLoginPage(this.getConfig().getThinkContentURL())
		.loginToThinkContent(this.getPlayTwoUser().email, this.getPlayOneUser().password)
		.navigateToPageByPath(this.PATH, CreateCollectionPage)
		.createCollection(collectionName, collectionDes, "suomi (Suomi)s")
		.ClickAddcontent()
		.Addcontent(courseToBeAdd)
		.clickReviewCollection()
		.clickAddContentToCollection()
		.clickSendCollectionForReview()
		.clickCollectionReviewDownArr()
		.inputReviewerName(collectionReviewer)
		.selectCollectionReviewer(collectionReviewer)
		.clickSendReview()
		.check(CreateCollectionAssertions)
		.assertThatReviewerNameIsVisible(collectionReviewer)
		.endAssertion()
		.clickChangeCollectionReviewer()
		.clickCollectionReviewDownArr()
		.inputReviewerName(collectionReviewerUpdated)
		.selectCollectionReviewer(collectionReviewerUpdated)
		.clickSendReview();
	}

	// Fully implemented
	public commentOnCollection(testdata: ITestContext): void {
		let today: any = new Date();
		let collectionComment: string = "AutomationComment_" + this.dfor.format(today);
		let collectionName: string = testdata.getAttribute("collectionToComment");
		this.getCsLoginPage(this.getConfig().getThinkContentURL())
		.loginToThinkContent(this.getPlayTwoUser().email, this.getPlayOneUser().password)
		.navigateToPageByPath(this.YOURCOLLECTION_PATH, CreateCollectionPage)
		.run(new OpenCollection(collectionName))
		.fillComment(collectionComment)
		.clickCommentAdd()
		.check(CreateCollectionAssertions)
		.assertThatCommentIsVisible(collectionComment)
		.endAssertion();
	}

	//@Test
	// Fully implemented
	public createCollectionAndSendForReview(testdata: ITestContext): void {

		let courseToBeAdd: string[][] = [ [ "Subscriptions only", "Architecting Scalable Python Applications" ]];
		let collectionReviewerUpdated: string = "CS Tester updated1";
		let today: any = new Date();
		let collectionName: string = "Auto_" + this.data.name().firstName() + this.dfor.format(today);
		let collectionDes: string = "AutoDes_" + this.data.name().firstName() + this.dfor.format(today);
		testdata.setAttribute("collectionToPublish", collectionName);
		this.getCsLoginPage(this.getConfig().getThinkContentURL())
		.loginToThinkContent(this.getPlayTwoUser().email, this.getPlayOneUser().password)
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

	//@Test
	public publishCollectionAndAddContent(testdata: ITestContext): void {

		let collectionName: string = testdata.getAttribute("collectionToPublish");

		let courseToBeAdd_AfterPublish: string[][] = [
				[ "Subscriptions only", "20 Questions To Help You Start a Business" ] ];

		this.getCsLoginPage(this.getConfig().getThinkContentURL())
		.loginToThinkContent("cstester@csod.com", "Csod234")
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

	//@Test
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
		.loginToThinkContent(this.getPlayTwoUser().email, this.getPlayOneUser().password)
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

	// Fully implemented
	public manageContentAdd(): void {

		let courseToBeAdd: string[][] = [ [ "Subscriptions only", "Architecting Scalable Python Applications" ],
				[ "Learning platform only", "Microsoft Office 2016 Excel Basic" ] ];

		let today: any = new Date();
		let collectionName: string = "Auto_" + this.data.name().firstName() + this.dfor.format(today);
		let collectionDes: string = "AutoDes_" + this.data.name().firstName() + this.dfor.format(today);
		let add_course: string = "Mastering Excel 2013 - Basics";

		this.getCsLoginPage(this.getConfig().getThinkContentURL())
		.loginToThinkContent(this.getPlayTwoUser().email, this.getPlayOneUser().password)
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
				.loginToThinkContent(this.getPlayTwoUser().email, this.getPlayOneUser().password)
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

		.loginToThinkContent(this.getPlayTwoUser().email, this.getPlayOneUser().password)
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

				.loginToThinkContent(this.getPlayTwoUser().email, this.getPlayOneUser().password)
				.navigateToPageByPath(this.PATH, CreateCollectionPage)
				.createCollection(collectionName, collectionDes, null)
				.check(CreateCollectionAssertions)
				.assertThatMessageIsVisible("Add content to your collection")
				.endAssertion()
				.clickCollectionOptionVerticalDot()
				.clickCollectionOption("Export collection as CSV");
		// Add CSV validation

	}

	//@Test
	// Fully implemented
	public DeleteCollectionWithContent(): void {

		let today: any = new Date();
		let collectionName: string = "Auto_" + this.data.name().firstName() + this.dfor.format(today);
		let collectionDes: string = "AutoDes_" + this.data.name().firstName() + this.dfor.format(today);

		let courseToBeAdd: string[][] = [ [ "Subscriptions only", "Architecting Scalable Python Applications" ],
				[ "Learning platform only", "Microsoft Office 2016 Excel Basic" ] ];


		this.getCsLoginPage(this.getConfig().getThinkContentURL())

				.loginToThinkContent(this.getPlayTwoUser().email, this.getPlayOneUser().password)
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

	//@Test
	// Fully implemented
	public ModifyCollectionDetails(): void {

		let today: any = new Date();
		let collectionName: string = "Auto_" + this.data.name().firstName() + this.dfor.format(today);
		let collectionDes: string = "AutoDes_" + this.data.name().firstName() + this.dfor.format(today);

		this.getCsLoginPage(this.getConfig().getThinkContentURL())
		.loginToThinkContent(this.getPlayTwoUser().email, this.getPlayOneUser().password)
		.navigateToPageByPath(this.PATH, CreateCollectionPage)
		.createCollection(collectionName, collectionDes, null)
		.check(CreateCollectionAssertions)
		.assertThatMessageIsVisible("Add content to your collection")
		.endAssertion()
		.clickCollectionOptionVerticalDot()
		.clickCollectionOption("Modify collection details");
	}

	//@Test
	// Fully implemented
	public DeleteCollectionWithoutContent(): void {
		let today: any = new Date();
		let collectionName: string = "Auto_" + this.data.name().firstName() + this.dfor.format(today);
		let collectionDes: string = "AutoDes_" + this.data.name().firstName() + this.dfor.format(today);

		this.getCsLoginPage(this.getConfig().getThinkContentURL())
		.loginToThinkContent(this.getPlayTwoUser().email, this.getPlayOneUser().password)
		.navigateToPageByPath(this.PATH, CreateCollectionPage)
		.createCollection(collectionName, collectionDes, null)
		.check(CreateCollectionAssertions)
		.assertThatMessageIsVisible("Add content to your collection")
		.endAssertion()
		.clickCollectionOptionVerticalDot()
		.clickCollectionOption("Delete collection");
	}

	//@Test
	// Fully implemented
	public verifyCollectionCreationUsingObjective(): void {
		let courseToBeAdd: string[][] = [ [ "All content", "Discovering Design Thinking" ]];
		let today: any = new Date();
		let collectionName: string = "Auto_" + this.data.name().firstName() + this.dfor.format(today);
		let collectionDes: string = "AutoDes_" + this.data.name().firstName() + this.dfor.format(today);

		this.getCsLoginPage(this.getConfig().getThinkContentURL())
				.loginToThinkContent(this.getPlayTwoUser().email, this.getPlayOneUser().password)
				.navigateToPageByPath(this.PATH, CreateCollectionPage)
				.createCollection(collectionName, collectionDes, "suomi (Suomi)s")
				.ClickAddcontent()
				.clickObjectiveArrow()
				.selectObjeciveByName("Creative Problem Solving")
				.Addcontent(courseToBeAdd)
				.clickReviewCollection()
				.clickAddContentToCollection();
	}

	//@Test
	public verifyBadgeNew(): void {

		let courseToBeAdd: string[][] = [ [ "Subscriptions only", "The wellness myth" ]];
		let today: any = new Date();
		let collectionName: string = "Auto_" + this.data.name().firstName() + this.dfor.format(today);
		let collectionDes: string = "AutoDes_" + this.data.name().firstName() + this.dfor.format(today);

		this.getCsLoginPage(this.getConfig().getThinkContentURL())
		.loginToThinkContent(this.getPlayTwoUser().email, this.getPlayOneUser().password)
		.navigateToPageByPath(this.PATH, CreateCollectionPage)
		.createCollection(collectionName, collectionDes, "suomi (Suomi)s")
		.ClickAddcontent()
		.clickContentSourceDownArrow()
		.selectContentSource(courseToBeAdd[0][0])
		.searchContent(courseToBeAdd[0][1])
		.check(CreateCollectionAssertions)
		.assertThatBadgeIsVisible(this.LABEL_NEW)
		.endAssertion()
		.selectcourse(courseToBeAdd[0][1])
		.clickQuickView(courseToBeAdd[0][1], CreateCollectionPage)
		.check(CreateCollectionAssertions)
		.assertThatQVBadgeIsVisible(this.LABEL_NEW)
		.endAssertion()
		.clickGoToDetails(CreateCollectionPage)
		.check(CreateCollectionAssertions)
		.assertThatBadgeIsVisible(this.LABEL_NEW)
		.endAssertion()
		.goToLastPage()
		.closeQuickViewDialog(courseToBeAdd[0][1])
		.clickReviewCollection()
		.clickAddContentToCollection();
		//.logoutFromContentStudio(SubscriptionPage);
	}

	//@Test
	public verifyBadgeRetire(): void {

		let courseToBeAdd: string[][] = [ [ "Subscriptions only", "Project Management Professional 6 (2018)" ]];
		let today: any = new Date();
		let collectionName: string = "Auto_" + this.data.name().firstName() + this.dfor.format(today);
		let collectionDes: string = "AutoDes_" + this.data.name().firstName() + this.dfor.format(today);

		this.getCsLoginPage(this.getConfig().getThinkContentURL())
		.loginToThinkContent(this.getPlayTwoUser().email, this.getPlayOneUser().password)
		.navigateToPageByPath(this.PATH, CreateCollectionPage)
		.createCollection(collectionName, collectionDes, "suomi (Suomi)s")
		.ClickAddcontent()
		.clickContentSourceDownArrow()
		.selectContentSource(courseToBeAdd[0][0])
		.searchContent(courseToBeAdd[0][1])
		.check(CreateCollectionAssertions)
		.assertThatBadgeIsVisible(this.LABEL_RETIRING)
		.endAssertion()
		.selectcourse(courseToBeAdd[0][1])
		.clickQuickView(courseToBeAdd[0][1], CreateCollectionPage)
		.check(CreateCollectionAssertions)
		.assertThatQVBadgeIsVisible(this.LABEL_RETIRING)
		.endAssertion()
		.clickGoToDetails(CreateCollectionPage)
		.check(CreateCollectionAssertions)
		.assertThatBadgeIsVisible(this.LABEL_RETIRING)
		.endAssertion()
		.goToLastPage()
		.closeQuickViewDialog(courseToBeAdd[0][1])
		.clickReviewCollection()
		.clickAddContentToCollection();
		//.logoutFromContentStudio(SubscriptionPage);
	}

	//@Test
	public createCollectionUsingAI(): void {

		let indexToSelect: number = new Random().nextInt(5 - 1 + 1) + 1;

		this.getCsLoginPage(this.getConfig().getThinkContentURL())
		.loginToThinkContent(this.getPlayTwoUser().email, this.getPlayOneUser().password)
		.navigateToPageByPath(this.PATH, CreateCollectionPage)
		.clickNewCollectionButton()
		.clickCollectionNameAI()
		.fillSearchTextAI(this.AI_SEARCH_KEYWORD)
		.clickSearchArrowAI()
		.hoverandSelectFirst(this.collectionName_AI,true,String.valueOf(indexToSelect))
		.clickCollectionDesAI()
		.hoverandSelectFirst(this.collectionName_AI,false,String.valueOf(1))
		.submitCollection()
		.check(CreateCollectionAssertions)
		.assertThatMessageIsVisible("Add content to your collection")
		.assertThatADDContentAIIsVisible()
		.endAssertion()
		.navigateToPageByPath(this.PATH, CreateCollectionPage)
		.fillCollectionSearch(this.collectionName_AI.getValue())
		.check(CreateCollectionAssertions)
		.assertThatCollectionIsVisible(this.collectionName_AI.getValue())
		.endAssertion();
	}

	//@Test(description = "CP-1209")
	public verifylanguage(): void {
		let courseToBeAdd: string[][] = [ [ "Subscriptions only", "Project Management Professional 6 (2018)" ]];
		let today: any = new Date();
		let collectionName: string = "Auto_" + this.data.name().firstName() + this.dfor.format(today);
		let collectionDes: string = "AutoDes_" + this.data.name().firstName() + this.dfor.format(today);

		this.getCsLoginPage(this.getConfig().getThinkContentURL())
		.loginToThinkContent(this.getPlayTwoUser().email, this.getPlayOneUser().password)
		.navigateToPageByPath(this.PATH, CreateCollectionPage)
		.createCollection(collectionName, collectionDes, "suomi (Suomi)s")
		.ClickAddcontent()
		.clickContentSourceDownArrow()
		.selectContentSource(courseToBeAdd[0][0])
		.searchContent(courseToBeAdd[0][1])
		.check(CreateCollectionAssertions)
		.assertThatBadgeIsVisible("English")
		.endAssertion()
		.clickQuickView(courseToBeAdd[0][1], CreateCollectionPage)
		.check(CreateCollectionAssertions)
		.assertThatBadgeIsVisible("English")
		.endAssertion();
	}

}
