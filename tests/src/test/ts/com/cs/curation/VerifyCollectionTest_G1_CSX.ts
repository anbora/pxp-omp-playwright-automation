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
		  let __page1: any = this;
  __page1 = __page1.getCsLoginPage(this.getConfig().getThinkContentURL());
  __page1 = __page1.loginToThinkContent(this.getPlayThirteenUser().email, this.getPlayThirteenUser().password);
  __page1 = __page1.navigateToPageByPath(this.YOURCOLLECTION_PATH, CreateCollectionPage);
  __page1 = __page1.createCollection(collectionName, collectionDes, "suomi (Suomi)s");
  __page1 = __page1.ClickAddcontent();
  __page1 = __page1.Addcontent(courseToBeAdd);
  __page1 = __page1.clickReviewCollection();
  __page1 = __page1.clickAddContentToCollection();
  __page1 = __page1.clickSendCollectionForReview();
  __page1 = __page1.clickCollectionReviewDownArr();
  __page1 = __page1.inputReviewerName(collectionReviewerUpdated);
  __page1 = __page1.selectCollectionReviewer(collectionReviewerUpdated);
  __page1 = __page1.clickSendReview();
  expect(__page1.validateReviewer(collectionReviewerUpdated)).toBeVisible({ timeout: 60000 });
	}

	public publishCollectionAndAddContent(testdata: ITestContext): void {

		let collectionName: string = testdata.getAttribute("collectionToPublish");

		let courseToBeAdd_AfterPublish: string[][] = [
				[ "Subscriptions only", "20 Questions To Help You Start a Business" ] ];

		  let __page2: any = this;
  __page2 = __page2.getCsLoginPage(this.getConfig().getThinkContentURL());
  __page2 = __page2.loginToThinkContent("cstester@csod.com", "Csod567");
  __page2 = __page2.navigateToPageByPath(this.YOURCOLLECTION_PATH, CreateCollectionPage);
  __page2 = __page2.clickPendingReview();
  __page2 = __page2.run(new OpenCollection(collectionName));
  __page2 = __page2.clickPublish();
  __page2 = __page2.clickPublishnow();
  expect(__page2.selectReviewer("Collection successfully published!")).toBeVisible({ timeout: 60000 });
  expect(__page2.buttonText("Continue exploring")).toBeVisible({ timeout: 60000 });
  expect(__page2.buttonText("View in platform")).toBeVisible({ timeout: 60000 });
  __page2 = __page2.clickContinueExploring();
  __page2 = __page2.navigateToPageByPath(this.PATH, CreateCollectionPage);
  __page2 = __page2.run(new OpenCollection(collectionName));
  __page2 = __page2.clickManageContent();
  __page2 = __page2.clickMangeOption("Add Courses");
  __page2 = __page2.Addcontent(courseToBeAdd_AfterPublish);
  __page2 = __page2.clickReviewCollection();
  __page2 = __page2.clickAddContentToCollection();
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

		  let __page3: any = this;
  __page3 = __page3.getCsLoginPage(this.getConfig().getThinkContentURL());
  __page3 = __page3.loginToThinkContent(this.getPlayThirteenUser().email, this.getPlayThirteenUser().password);
  __page3 = __page3.navigateToPageByPath(this.PATH, CreateCollectionPage);
  __page3 = __page3.createCollection(collectionName, collectionDes, "suomi (Suomi)s");
  __page3 = __page3.ClickAddcontent();
  __page3 = __page3.Addcontent(courseToBeAdd);
  __page3 = __page3.clickReviewCollection();
  __page3 = __page3.clickAddContentToCollection();
  expect(__page3.contentCard).toHaveCount(3);
  expect(__page3.collectionDuration).toHaveText(Pattern.compile("(^\\d.\\d hours$)"));
  ;

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

		  let __page4: any = this;
  __page4 = __page4.getCsLoginPage(this.getConfig().getThinkContentURL());
  __page4 = __page4.loginToThinkContent(this.getPlayThirteenUser().email, this.getPlayThirteenUser().password);
  __page4 = __page4.navigateToPageByPath(this.YOURCOLLECTION_PATH, CreateCollectionPage);
  __page4 = __page4.createCollection(collectionName, collectionDes, "suomi (Suomi)s");
  __page4 = __page4.ClickAddcontent();
  __page4 = __page4.Addcontent(courseToBeAdd);
  __page4 = __page4.clickReviewCollection();
  __page4 = __page4.clickAddContentToCollection();
  __page4 = __page4.waitForTime(3000);
  __page4 = __page4.navigateToPageByPath(this.YOURCOLLECTION_PATH, CreateCollectionPage);
  __page4 = __page4.run(new OpenCollection(collectionName));
  __page4 = __page4.clickManageContent();
  __page4 = __page4.clickMangeOption("Add Courses");
  __page4 = __page4.searchContent(add_course);
  __page4 = __page4.pressKey("Enter");
  __page4 = __page4.selectcourse(add_course);
  __page4 = __page4.clickReviewCollection();
  expect(__page4.messageElement(add_course)).toBeVisible({ timeout: 60000 });
  __page4 = __page4.clickAddContentToCollection();
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

		  let __page5: any = this;
  __page5 = __page5.getCsLoginPage(this.getConfig().getThinkContentURL());
  __page5 = __page5.loginToThinkContent(this.getPlayThirteenUser().email, this.getPlayThirteenUser().password);
  __page5 = __page5.navigateToPageByPath(this.PATH, CreateCollectionPage);
  __page5 = __page5.createCollection(collectionName, collectionDes, "suomi (Suomi)s");
  __page5 = __page5.ClickAddcontent();
  __page5 = __page5.Addcontent(courseToBeAdd);
  __page5 = __page5.clickReviewCollection();
  __page5 = __page5.clickAddContentToCollection();
  __page5 = __page5.navigateToPageByPath(this.YOURCOLLECTION_PATH, CreateCollectionPage);
  __page5 = __page5.waitForContentCardLoad();
  __page5 = __page5.run(new OpenCollection(collectionName));
  __page5 = __page5.clickManageContent();
  __page5 = __page5.clickMangeOption("Delete Courses");
  __page5 = __page5.selectcourse(courseToBeAdd[2][1]);
  __page5 = __page5.clickDeleteSelected();
  __page5 = __page5.clickYes();
  expect(__page5.messageElement(collectionDes)).not.toBeVisible({ timeout: 60000 });
	}

	//@Test
	// Fully implemented
	public exportCollectionAndvalidateCSV(): void {
		let today: any = new Date();
		let collectionName: string = "Auto_" + this.data.name().firstName() + this.dfor.format(today);
		let collectionDes: string = "AutoDes_" + this.data.name().firstName() + this.dfor.format(today);
		  let __page6: any = this;
  __page6 = __page6.getCsLoginPage(this.getConfig().getThinkContentURL());
  __page6 = __page6.loginToThinkContent(this.getPlayThirteenUser().email, this.getPlayThirteenUser().password);
  __page6 = __page6.navigateToPageByPath(this.PATH, CreateCollectionPage);
  __page6 = __page6.createCollection(collectionName, collectionDes, null);
  expect(__page6.messageElement("Add content to your collection")).toBeVisible({ timeout: 60000 });
  __page6 = __page6.clickCollectionOptionVerticalDot();
  __page6 = __page6.clickCollectionOption("Export collection as CSV");
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

		  let __page7: any = this;
  __page7 = __page7.getCsLoginPage(this.getConfig().getThinkContentURL());
  __page7 = __page7.loginToThinkContent(this.getPlayThirteenUser().email, this.getPlayThirteenUser().password);
  __page7 = __page7.navigateToPageByPath(this.PATH, CreateCollectionPage);
  __page7 = __page7.createCollection(collectionName, collectionDes, null);
  expect(__page7.messageElement("Add content to your collection")).toBeVisible({ timeout: 60000 });
  __page7 = __page7.clickCollectionOptionVerticalDot();
  __page7 = __page7.clickCollectionOption("Modify collection details");
	}

	// Fully implemented
	public DeleteCollectionWithoutContent(): void {
		let today: any = new Date();
		let collectionName: string = "Auto_" + this.data.name().firstName() + this.dfor.format(today);
		let collectionDes: string = "AutoDes_" + this.data.name().firstName() + this.dfor.format(today);

		  let __page8: any = this;
  __page8 = __page8.getCsLoginPage(this.getConfig().getThinkContentURL());
  __page8 = __page8.loginToThinkContent(this.getPlayThirteenUser().email, this.getPlayThirteenUser().password);
  __page8 = __page8.navigateToPageByPath(this.PATH, CreateCollectionPage);
  __page8 = __page8.createCollection(collectionName, collectionDes, null);
  expect(__page8.messageElement("Add content to your collection")).toBeVisible({ timeout: 60000 });
  __page8 = __page8.clickCollectionOptionVerticalDot();
  __page8 = __page8.clickCollectionOption("Delete collection");
	}
}
