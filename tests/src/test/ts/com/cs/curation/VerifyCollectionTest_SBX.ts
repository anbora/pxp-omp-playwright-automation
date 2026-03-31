// @ts-nocheck
import { Faker } from "com/github/javafaker/Faker";
import { BaseTest } from "common/BaseTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { ITestContext } from "common/testing/runtime";
import { CreateCollectionPage } from "cs/pages/CreateCollectionPage";
import { OpenCollection } from "cs/scenarios/OpenCollection";
import { ResultContainer } from "models/ResultContainer";
import { expect } from "common/testing/playwright";

export class VerifyCollectionTest_SBX extends BaseTest {

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

	public createCollection(): void {
		let today: any = new Date();

		let collectionName: string = "Auto_" + this.data.name().firstName() + this.dfor.format(today);
		let collectionDes: string = "AutoDes_" + this.data.name().firstName() + this.dfor.format(today);


		  let __page1: any = this;
  __page1 = __page1.getCsLoginPage(this.getConfig().getSbxurl());
  __page1 = __page1.logintoSBX("CSUSERTHREE", "welcome");
  __page1 = __page1.navigateToPageByPath(this.PATH, CreateCollectionPage);
  expect(__page1.buttonText("All Collections")).toBeVisible({ timeout: 60000 });
  expect(__page1.buttonText("Cornerstone Curated")).toBeVisible({ timeout: 60000 });
  __page1 = __page1.createCollection(collectionName, collectionDes, null);
  expect(__page1.messageElement("Add content to your collection")).toBeVisible({ timeout: 60000 });
	}

	// Fully implemented
	public sendCollectionforReview(): void {

		let courseToBeAdd: string[][] = [ [ "Subscriptions only", "Architecting Scalable Python Applications (CyberU)" ],
				[ "Subscriptions only", "20 Questions To Help You Start a Business (MadeCraft)" ],
				[ "Learning platform only", "Microsoft 365: Administration" ] ];
		let collectionReviewer: string = "member12 member12";
		let today: any = new Date();
		let collectionName: string = "Auto_" + this.data.name().firstName() + this.dfor.format(today);
		let collectionDes: string = "AutoDes_" + this.data.name().firstName() + this.dfor.format(today);



		  let __page2: any = this;
  __page2 = __page2.getCsLoginPage(this.getConfig().getSbxurl());
  __page2 = __page2.logintoSBX("CSUSERTHREE", "welcome");
  __page2 = __page2.navigateToPageByPath(this.PATH, CreateCollectionPage);
  __page2 = __page2.createCollection(collectionName, collectionDes, "suomi (Suomi)s");
  __page2 = __page2.ClickAddcontent();
  __page2 = __page2.Addcontent(courseToBeAdd);
  __page2 = __page2.clickReviewCollection();
  __page2 = __page2.clickAddContentToCollection();
  expect(__page2.messageElement(courseToBeAdd[0][1])).toBeVisible({ timeout: 60000 });
  expect(__page2.messageElement(courseToBeAdd[1][1])).toBeVisible({ timeout: 60000 });
  expect(__page2.messageElement(courseToBeAdd[2][1])).toBeVisible({ timeout: 60000 });
  __page2 = __page2.clickSendCollectionForReview();
  __page2 = __page2.clickCollectionReviewDownArr();
  __page2 = __page2.inputReviewerName(collectionReviewer);
  __page2 = __page2.selectCollectionReviewer(collectionReviewer);
  __page2 = __page2.clickSendReview();
  expect(__page2.validateReviewer(collectionReviewer)).toBeVisible({ timeout: 60000 });
	}

	// Fully Implemented
	public changeCollectionReviewer(testdata: ITestContext): void {

		let courseToBeAdd: string[][] = [ [ "Subscriptions only", "Architecting Scalable Python Applications (CyberU)" ]];
		//{ "Learning platform only", "Microsoft 365: Administration" } };
		let collectionReviewer: string = "member12 member12";
		let collectionReviewerUpdated: string = "CS Test SIX";
		let today: Date = new Date();
		let collectionName: string = "Auto_" + this.data.name().firstName() + this.dfor.format(today);
		let collectionDes: string = "AutoDes_" + this.data.name().firstName() + this.dfor.format(today);
		testdata.setAttribute("collectionToComment", collectionName);

		  let __page3: any = this;
  __page3 = __page3.getCsLoginPage(this.getConfig().getSbxurl());
  __page3 = __page3.logintoSBX("CSUSERTHREE", "welcome");
  __page3 = __page3.navigateToPageByPath(this.PATH, CreateCollectionPage);
  __page3 = __page3.createCollection(collectionName, collectionDes, "suomi (Suomi)s");
  __page3 = __page3.ClickAddcontent();
  __page3 = __page3.Addcontent(courseToBeAdd);
  __page3 = __page3.clickReviewCollection();
  __page3 = __page3.clickAddContentToCollection();
  __page3 = __page3.clickSendCollectionForReview();
  __page3 = __page3.clickCollectionReviewDownArr();
  __page3 = __page3.inputReviewerName(collectionReviewer);
  __page3 = __page3.selectCollectionReviewer(collectionReviewer);
  __page3 = __page3.clickSendReview();
  expect(__page3.validateReviewer(collectionReviewer)).toBeVisible({ timeout: 60000 });
  __page3 = __page3.clickChangeCollectionReviewer();
  __page3 = __page3.clickCollectionReviewDownArr();
  __page3 = __page3.inputReviewerName(collectionReviewerUpdated);
  __page3 = __page3.selectCollectionReviewer(collectionReviewerUpdated);
  __page3 = __page3.clickSendReview();
	}

	// Fully implemented
	public commentOnCollection(testdata: ITestContext): void {

		let today: any = new Date();
		let collectionComment: string = "AutomationComment_" + this.dfor.format(today);
		let collectionName: string = testdata.getAttribute("collectionToComment");

		  let __page4: any = this;
  __page4 = __page4.getCsLoginPage(this.getConfig().getSbxurl());
  __page4 = __page4.logintoSBX("CSUSERTHREE", "welcome");
  __page4 = __page4.navigateToPageByPath(this.YOURCOLLECTION_PATH, CreateCollectionPage);
  __page4 = __page4.run(new OpenCollection(collectionName));
  __page4 = __page4.fillComment(collectionComment);
  __page4 = __page4.clickCommentAdd();
  expect(__page4.collectionComment(collectionComment)).toBeVisible({ timeout: 60000 });

	}

	// Fully implemented
	public createCollectionAndSendForReview(testdata: ITestContext): void {

		let courseToBeAdd: string[][] = [ [ "Subscriptions only", "Architecting Scalable Python Applications (CyberU)" ]];
		let collectionReviewerUpdated: string = "CS Test SIX";
		let today: any = new Date();
		let collectionName: string = "Auto_" + this.data.name().firstName() + this.dfor.format(today);
		let collectionDes: string = "AutoDes_" + this.data.name().firstName() + this.dfor.format(today);
		testdata.setAttribute("collectionToPublish", collectionName);

		  let __page5: any = this;
  __page5 = __page5.getCsLoginPage(this.getConfig().getSbxurl());
  __page5 = __page5.logintoSBX("CSUSERTHREE", "welcome");
  __page5 = __page5.navigateToPageByPath(this.YOURCOLLECTION_PATH, CreateCollectionPage);
  __page5 = __page5.createCollection(collectionName, collectionDes, "suomi (Suomi)s");
  __page5 = __page5.ClickAddcontent();
  __page5 = __page5.Addcontent(courseToBeAdd);
  __page5 = __page5.clickReviewCollection();
  __page5 = __page5.clickAddContentToCollection();
  __page5 = __page5.clickSendCollectionForReview();
  __page5 = __page5.clickCollectionReviewDownArr();
  __page5 = __page5.inputReviewerName(collectionReviewerUpdated);
  __page5 = __page5.selectCollectionReviewer(collectionReviewerUpdated);
  __page5 = __page5.clickSendReview();
  expect(__page5.validateReviewer(collectionReviewerUpdated)).toBeVisible({ timeout: 60000 });
	}

	public publishCollectionAndAddContent(testdata: ITestContext): void {

		let collectionName: string = testdata.getAttribute("collectionToPublish");
		let courseToBeAdd_AfterPublish: string[][] = [
				[ "Subscriptions only", "20 Questions To Help You Start a Business (MadeCraft)" ] ];

		  let __page6: any = this;
  __page6 = __page6.getCsLoginPage(this.getConfig().getSbxurl());
  __page6 = __page6.logintoSBX("CSUSERSIX", "welcome");
  __page6 = __page6.navigateToPageByPath(this.YOURCOLLECTION_PATH, CreateCollectionPage);
  __page6 = __page6.clickPendingReview();
  __page6 = __page6.run(new OpenCollection(collectionName));
  __page6 = __page6.clickPublish();
  __page6 = __page6.clickPublishnow();
  expect(__page6.selectReviewer("Collection successfully published!")).toBeVisible({ timeout: 60000 });
  expect(__page6.buttonText("Continue exploring")).toBeVisible({ timeout: 60000 });
  expect(__page6.buttonText("View in platform")).toBeVisible({ timeout: 60000 });
  __page6 = __page6.clickContinueExploring();
  __page6 = __page6.navigateToPageByPath(this.PATH, CreateCollectionPage);
  __page6 = __page6.run(new OpenCollection(collectionName));
  __page6 = __page6.clickManageContent();
  __page6 = __page6.clickMangeOption("Add Courses");
  __page6 = __page6.Addcontent(courseToBeAdd_AfterPublish);
  __page6 = __page6.clickReviewCollection();
  __page6 = __page6.clickAddContentToCollection();
	}

	// Fully implemented
	public validateCountAndDuration(): void {

		let courseToBeAdd: string[][] = [ [ "Subscriptions only", "Architecting Scalable Python Applications (CyberU)" ],
				[ "Subscriptions only", "20 Questions To Help You Start a Business (MadeCraft)" ],
				[ "Learning platform only", "Microsoft 365: Administration" ] ];
		//String[] expectedDuration={"1.1 hours","3.5 hours"};
		let today: any = new Date();
		let collectionName: string = "Auto_" + this.data.name().firstName() + this.dfor.format(today);
		let collectionDes: string = "AutoDes_" + this.data.name().firstName() + this.dfor.format(today);

		  let __page7: any = this;
  __page7 = __page7.getCsLoginPage(this.getConfig().getSbxurl());
  __page7 = __page7.logintoSBX("CSUSERTHREE", "welcome");
  __page7 = __page7.navigateToPageByPath(this.PATH, CreateCollectionPage);
  __page7 = __page7.createCollection(collectionName, collectionDes, "suomi (Suomi)s");
  __page7 = __page7.ClickAddcontent();
  __page7 = __page7.Addcontent(courseToBeAdd);
  __page7 = __page7.clickReviewCollection();
  __page7 = __page7.clickAddContentToCollection();
  expect(__page7.contentCard).toHaveCount(3);
  expect(__page7.collectionDuration).toHaveText(Pattern.compile("(^\\d.\\d hours$)"));
  ;

	}

	// Fully implemented
	public manageContentAdd(): void {

		let courseToBeAdd: string[][] = [ [ "Subscriptions only", "Architecting Scalable Python Applications (CyberU)" ],
				[ "Learning platform only", "Microsoft 365: Administration" ] ];

		let today: any = new Date();
		let collectionName: string = "Auto_" + this.data.name().firstName() + this.dfor.format(today);
		let collectionDes: string = "AutoDes_" + this.data.name().firstName() + this.dfor.format(today);
		let add_course: string = "Micro Talk: Asking for Help (Bookboon)";

		  let __page8: any = this;
  __page8 = __page8.getCsLoginPage(this.getConfig().getSbxurl());
  __page8 = __page8.logintoSBX("CSUSERTHREE", "welcome");
  __page8 = __page8.navigateToPageByPath(this.YOURCOLLECTION_PATH, CreateCollectionPage);
  __page8 = __page8.createCollection(collectionName, collectionDes, "suomi (Suomi)s");
  __page8 = __page8.ClickAddcontent();
  __page8 = __page8.Addcontent(courseToBeAdd);
  __page8 = __page8.clickReviewCollection();
  __page8 = __page8.clickAddContentToCollection();
  __page8 = __page8.waitForTime(3000);
  __page8 = __page8.navigateToPageByPath(this.YOURCOLLECTION_PATH, CreateCollectionPage);
  __page8 = __page8.run(new OpenCollection(collectionName));
  __page8 = __page8.clickManageContent();
  __page8 = __page8.clickMangeOption("Add Courses");
  __page8 = __page8.searchContent(add_course);
  __page8 = __page8.pressKey("Enter");
  __page8 = __page8.selectcourse(add_course);
  __page8 = __page8.clickReviewCollection();
  expect(__page8.messageElement(add_course)).toBeVisible({ timeout: 60000 });
  __page8 = __page8.clickAddContentToCollection();
	}

	//@Test
	//Fully not Implemented
	public manageContentOrder(): void {
		let courseToBeAdd: string[][] = [ [ "Subscriptions only", "Architecting Scalable Python Applications (CyberU)" ],
				[ "Subscriptions only", "20 Questions To Help You Start a Business (MadeCraft)" ],
				[ "Learning platform only", "Microsoft 365: Administration" ] ];
		let today: any = new Date();
		let collectionName: string = "Auto_" + this.data.name().firstName() + this.dfor.format(today);
		let collectionDes: string = "AutoDes_" + this.data.name().firstName() + this.dfor.format(today);

		this.getCsLoginPage(this.getConfig().getSbxurl())
		.logintoSBX("CSUSERTHREE", "welcome")
				.navigateToPageByPath(this.PATH, CreateCollectionPage)
				.run(new OpenCollection("AutomationCollectionTitle_2023-09-24_1634_mWNMUnlt3A"))
				.clickManageContent()
				.clickMangeOption("Order Courses")
				.dragAndDrop();

	}

	// Fully implemented
	public manageContentDelete(): void {

		let courseToBeAdd: string[][] = [ [ "Subscriptions only", "Architecting Scalable Python Applications (CyberU)" ],
				[ "Subscriptions only", "20 Questions To Help You Start a Business (MadeCraft)" ],
				[ "Learning platform only", "Microsoft 365: Administration" ] ];

		let today: any = new Date();
		let collectionName: string = "Auto_" + this.data.name().firstName() + this.dfor.format(today);
		let collectionDes: string = "AutoDes_" + this.data.name().firstName() + this.dfor.format(today);

		  let __page9: any = this;
  __page9 = __page9.getCsLoginPage(this.getConfig().getSbxurl());
  __page9 = __page9.logintoSBX("CSUSERTHREE", "welcome");
  __page9 = __page9.navigateToPageByPath(this.PATH, CreateCollectionPage);
  __page9 = __page9.createCollection(collectionName, collectionDes, "suomi (Suomi)s");
  __page9 = __page9.ClickAddcontent();
  __page9 = __page9.Addcontent(courseToBeAdd);
  __page9 = __page9.clickReviewCollection();
  __page9 = __page9.clickAddContentToCollection();
  __page9 = __page9.navigateToPageByPath(this.YOURCOLLECTION_PATH, CreateCollectionPage);
  __page9 = __page9.waitForContentCardLoad();
  __page9 = __page9.run(new OpenCollection(collectionName));
  __page9 = __page9.clickManageContent();
  __page9 = __page9.clickMangeOption("Delete Courses");
  __page9 = __page9.selectcourse(courseToBeAdd[2][1]);
  __page9 = __page9.clickDeleteSelected();
  __page9 = __page9.clickYes();
  expect(__page9.messageElement(collectionDes)).not.toBeVisible({ timeout: 60000 });
	}

	// Fully implemented
	public exportCollectionAndvalidateCSV(): void {
		let today: any = new Date();
		let collectionName: string = "Auto_" + this.data.name().firstName() + this.dfor.format(today);
		let collectionDes: string = "AutoDes_" + this.data.name().firstName() + this.dfor.format(today);

		  let __page10: any = this;
  __page10 = __page10.getCsLoginPage(this.getConfig().getSbxurl());
  __page10 = __page10.logintoSBX("CSUSERTHREE", "welcome");
  __page10 = __page10.navigateToPageByPath(this.PATH, CreateCollectionPage);
  __page10 = __page10.createCollection(collectionName, collectionDes, null);
  expect(__page10.messageElement("Add content to your collection")).toBeVisible({ timeout: 60000 });
  __page10 = __page10.clickCollectionOptionVerticalDot();
  __page10 = __page10.clickCollectionOption("Export collection as CSV");
		// Add CSV validation

	}

	// Fully implemented
	public DeleteCollectionWithContent(): void {

		let today: any = new Date();
		let collectionName: string = "Auto_" + this.data.name().firstName() + this.dfor.format(today);
		let collectionDes: string = "AutoDes_" + this.data.name().firstName() + this.dfor.format(today);

		let courseToBeAdd: string[][] = [ [ "Subscriptions only", "Architecting Scalable Python Applications (CyberU)" ],
				[ "Learning platform only", "Microsoft 365: Administration" ] ];


		this.getCsLoginPage(this.getConfig().getSbxurl())
		.logintoSBX("CSUSERTHREE", "welcome")
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

	// Fully Not implemented
	public ModifyCollectionDetails(): void {

		let today: any = new Date();
		let collectionName: string = "Auto_" + this.data.name().firstName() + this.dfor.format(today);
		let collectionDes: string = "AutoDes_" + this.data.name().firstName() + this.dfor.format(today);

		  let __page11: any = this;
  __page11 = __page11.getCsLoginPage(this.getConfig().getSbxurl());
  __page11 = __page11.logintoSBX("CSUSERTHREE", "welcome");
  __page11 = __page11.navigateToPageByPath(this.PATH, CreateCollectionPage);
  __page11 = __page11.createCollection(collectionName, collectionDes, null);
  expect(__page11.messageElement("Add content to your collection")).toBeVisible({ timeout: 60000 });
  __page11 = __page11.clickCollectionOptionVerticalDot();
  __page11 = __page11.clickCollectionOption("Modify collection details");
	}

	// Fully implemented
	public DeleteCollectionWithoutContent(): void {
		let today: any = new Date();
		let collectionName: string = "Auto_" + this.data.name().firstName() + this.dfor.format(today);
		let collectionDes: string = "AutoDes_" + this.data.name().firstName() + this.dfor.format(today);

		  let __page12: any = this;
  __page12 = __page12.getCsLoginPage(this.getConfig().getSbxurl());
  __page12 = __page12.logintoSBX("CSUSERTHREE", "welcome");
  __page12 = __page12.navigateToPageByPath(this.PATH, CreateCollectionPage);
  __page12 = __page12.createCollection(collectionName, collectionDes, null);
  expect(__page12.messageElement("Add content to your collection")).toBeVisible({ timeout: 60000 });
  __page12 = __page12.clickCollectionOptionVerticalDot();
  __page12 = __page12.clickCollectionOption("Delete collection");
	}

	// Fully implemented
	public verifyCollectionCreationUsingObjective(): void {
		let courseToBeAdd: string[][] = [ [ "All content", "Change Management for HR" ]];
		let today: any = new Date();
		let collectionName: string = "Auto_" + this.data.name().firstName() + this.dfor.format(today);
		let collectionDes: string = "AutoDes_" + this.data.name().firstName() + this.dfor.format(today);

		this.getCsLoginPage(this.getConfig().getSbxurl())
		.logintoSBX("CSUSERTHREE", "welcome")
				.navigateToPageByPath(this.PATH, CreateCollectionPage)
				.createCollection(collectionName, collectionDes, "suomi (Suomi)s")
				.ClickAddcontent()
				.clickObjectiveArrow()
				.selectObjeciveByName("Testing leadership")
				.Addcontent(courseToBeAdd)
				.clickReviewCollection()
				.clickAddContentToCollection();
	}

	//@Test
	public verifyBadgeNew(): void {

		let courseToBeAdd: string[][] = [ [ "Subscriptions only", "The Silent Treatment: A Positive Power (Bookboon)" ]];
		let today: any = new Date();
		let collectionName: string = "Auto_" + this.data.name().firstName() + this.dfor.format(today);
		let collectionDes: string = "AutoDes_" + this.data.name().firstName() + this.dfor.format(today);

		  let __page13: any = this;
  __page13 = __page13.getCsLoginPage(this.getConfig().getSbxurl());
  __page13 = __page13.logintoSBX("CSUSERTHREE", "welcome");
  __page13 = __page13.navigateToPageByPath(this.PATH, CreateCollectionPage);
  __page13 = __page13.createCollection(collectionName, collectionDes, "suomi (Suomi)s");
  __page13 = __page13.ClickAddcontent();
  __page13 = __page13.clickContentSourceDownArrow();
  __page13 = __page13.selectContentSource(courseToBeAdd[0][0]);
  __page13 = __page13.searchContent(courseToBeAdd[0][1]);
  expect(__page13.badge_check(this.LABEL_NEW).first()).toBeVisible({ timeout: 60000 });
  __page13 = __page13.selectcourse(courseToBeAdd[0][1]);
  __page13 = __page13.clickQuickView(courseToBeAdd[0][1], CreateCollectionPage);
  expect(__page13.qv_badge_check(this.LABEL_NEW)).toBeVisible({ timeout: 60000 });
  __page13 = __page13.clickGoToDetails(CreateCollectionPage);
  expect(__page13.badge_check(this.LABEL_NEW).first()).toBeVisible({ timeout: 60000 });
  __page13 = __page13.goToLastPage();
  __page13 = __page13.closeQuickViewDialog(courseToBeAdd[0][1]);
  __page13 = __page13.clickReviewCollection();
  __page13 = __page13.clickAddContentToCollection();
		//.logoutFromContentStudio(SubscriptionPage);
	}

	//@Test
	public verifyBadgeRetire(): void {

		let courseToBeAdd: string[][] = [ [ "Subscriptions only", "Project Management Professional 6 (2018)" ]];
		let today: any = new Date();
		let collectionName: string = "Auto_" + this.data.name().firstName() + this.dfor.format(today);
		let collectionDes: string = "AutoDes_" + this.data.name().firstName() + this.dfor.format(today);

		  let __page14: any = this;
  __page14 = __page14.getCsLoginPage(this.getConfig().getSbxurl());
  __page14 = __page14.logintoSBX("CSUSERTHREE", "welcome");
  __page14 = __page14.navigateToPageByPath(this.PATH, CreateCollectionPage);
  __page14 = __page14.createCollection(collectionName, collectionDes, "suomi (Suomi)s");
  __page14 = __page14.ClickAddcontent();
  __page14 = __page14.clickContentSourceDownArrow();
  __page14 = __page14.selectContentSource(courseToBeAdd[0][0]);
  __page14 = __page14.searchContent(courseToBeAdd[0][1]);
  expect(__page14.badge_check(this.LABEL_RETIRING).first()).toBeVisible({ timeout: 60000 });
  __page14 = __page14.selectcourse(courseToBeAdd[0][1]);
  __page14 = __page14.clickQuickView(courseToBeAdd[0][1], CreateCollectionPage);
  expect(__page14.qv_badge_check(this.LABEL_RETIRING)).toBeVisible({ timeout: 60000 });
  __page14 = __page14.clickGoToDetails(CreateCollectionPage);
  expect(__page14.badge_check(this.LABEL_RETIRING).first()).toBeVisible({ timeout: 60000 });
  __page14 = __page14.goToLastPage();
  __page14 = __page14.closeQuickViewDialog(courseToBeAdd[0][1]);
  __page14 = __page14.clickReviewCollection();
  __page14 = __page14.clickAddContentToCollection();
		//.logoutFromContentStudio(SubscriptionPage);
	}

	//@Test
	public createCollectionUsingAI(): void {

		let indexToSelect: number = new Random().nextInt(5 - 1 + 1) + 1;

		  let __page15: any = this;
  __page15 = __page15.getCsLoginPage(this.getConfig().getSbxurl());
  __page15 = __page15.logintoSBX("CSUSERTHREE", "welcome");
  __page15 = __page15.navigateToPageByPath(this.PATH, CreateCollectionPage);
  __page15 = __page15.clickNewCollectionButton();
  __page15 = __page15.clickCollectionNameAI();
  __page15 = __page15.fillSearchTextAI(this.AI_SEARCH_KEYWORD);
  __page15 = __page15.clickSearchArrowAI();
  __page15 = __page15.hoverandSelectFirst(this.collectionName_AI, true, String.valueOf(indexToSelect));
  __page15 = __page15.clickCollectionDesAI();
  __page15 = __page15.hoverandSelectFirst(this.collectionName_AI, false, String.valueOf(1));
  __page15 = __page15.submitCollection();
  expect(__page15.messageElement("Add content to your collection")).toBeVisible({ timeout: 60000 });
  expect(__page15.buttonAddContent_AI).toBeVisible({ timeout: 60000 });
  __page15 = __page15.navigateToPageByPath(this.PATH, CreateCollectionPage);
  __page15 = __page15.fillCollectionSearch(this.collectionName_AI.getValue());
  expect(__page15.locatePTagByText(this.collectionName_AI.getValue())).toBeVisible({ timeout: 60000 });
	}

	public verifylanguage(): void {
		let courseToBeAdd: string[][] = [ [ "Subscriptions only", "Project Management (Access Learning)" ]];
		let today: any = new Date();
		let collectionName: string = "Auto_" + this.data.name().firstName() + this.dfor.format(today);
		let collectionDes: string = "AutoDes_" + this.data.name().firstName() + this.dfor.format(today);

		  let __page16: any = this;
  __page16 = __page16.getCsLoginPage(this.getConfig().getSbxurl());
  __page16 = __page16.logintoSBX("CSUSERTHREE", "welcome");
  __page16 = __page16.navigateToPageByPath(this.PATH, CreateCollectionPage);
  __page16 = __page16.createCollection(collectionName, collectionDes, "suomi (Suomi)s");
  __page16 = __page16.ClickAddcontent();
  __page16 = __page16.clickContentSourceDownArrow();
  __page16 = __page16.selectContentSource(courseToBeAdd[0][0]);
  __page16 = __page16.searchContent(courseToBeAdd[0][1]);
  expect(__page16.badge_check("English").first()).toBeVisible({ timeout: 60000 });
  __page16 = __page16.clickQuickView(courseToBeAdd[0][1], CreateCollectionPage);
  expect(__page16.badge_check("English").first()).toBeVisible({ timeout: 60000 });
	}

	public verifyHeaderSticky(): void {
		let headername: string = "Your collections";

		  let __page17: any = this;
  __page17 = __page17.getCsLoginPage(this.getConfig().getSbxurl());
  __page17 = __page17.logintoSBX("CSUSERTHREE", "welcome");
  __page17 = __page17.navigateToPageByPath(this.YOURCOLLECTION_PATH, CreateCollectionPage);
  __page17 = __page17.waitForContentCardLoad();
  __page17 = __page17.scrolltoBottom("700", CreateCollectionPage);
  expect(__page17.loc_DIV_ByText(headername)).toBeVisible({ timeout: 60000 });
  __page17 = __page17.scrolltoBottom("Downmost", CreateCollectionPage);
  expect(__page17.loc_DIV_ByText(headername)).toBeVisible({ timeout: 60000 });
	}

	public verifyHeaderStickyExploreCollection(): void {
		let headername: string = "Explore collections";

		  let __page18: any = this;
  __page18 = __page18.getCsLoginPage(this.getConfig().getSbxurl());
  __page18 = __page18.logintoSBX("CSUSERTHREE", "welcome");
  __page18 = __page18.navigateToPageByPath(this.PATH, CreateCollectionPage);
  __page18 = __page18.waitForContentCardLoad();
  __page18 = __page18.scrolltoBottom("700", CreateCollectionPage);
  expect(__page18.loc_DIV_ByText(headername)).toBeVisible({ timeout: 60000 });
  __page18 = __page18.scrolltoBottom("Downmost", CreateCollectionPage);
  expect(__page18.loc_DIV_ByText(headername)).toBeVisible({ timeout: 60000 });
	}
}
