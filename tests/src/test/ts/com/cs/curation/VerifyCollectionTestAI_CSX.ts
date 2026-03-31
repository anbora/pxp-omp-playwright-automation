// @ts-nocheck
import { Faker } from "com/github/javafaker/Faker";
import { BaseTest } from "common/BaseTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { CreateCollectionPage } from "cs/pages/CreateCollectionPage";
import { OpenCollection } from "cs/scenarios/OpenCollection";
import { ResultContainer } from "models/ResultContainer";
import { expect } from "common/testing/playwright";

export class VerifyCollectionTestAI_CSX extends BaseTest {

	private readonly PATH: string[] = [ "Curation", "Explore collections" ];
	private readonly YOURCOLLECTION_PATH: string[] = [ "Curation", "Your collections" ];
	data: Faker = new Faker();
	dfor: DateFormat = new SimpleDateFormat("ddMMyy_HHmmss");
	private readonly LABEL_SUBSCRIBE: string = "Subscribed";
	private readonly LABEL_NEW: string = "New";
	private readonly LABEL_RETIRING: string = "Retiring";
	private readonly AI_SEARCH_KEYWORD: string = "Leadership";
	collectionName_AI: ResultContainer = new ResultContainer();
	private searchAI: string[] = ["Leadership","Business","Time Management","People","Python","Java","Selenium","Test",
			"Game","Honey","Technology","Test Automation","Windows","Tasty","Mouse"];

	public createCollectionUsingAI(): void {

		let indexToSelect: number = new Random().nextInt(5 - 1 + 1) + 1;
		let AISearchIndex: number = new Random().nextInt(15 - 1 + 1) + 1;

		  let __page1: any = this;
  __page1 = __page1.getCsLoginPage(this.getConfig().getThinkContentURL());
  __page1 = __page1.loginToThinkContent(this.getPlayFifteenUser().email, this.getPlayFifteenUser().password);
  __page1 = __page1.navigateToPageByPath(this.PATH, CreateCollectionPage);
  __page1 = __page1.clickNewCollectionButton();
  __page1 = __page1.clickCollectionNameAI();
  __page1 = __page1.fillSearchTextAI(this.searchAI[AISearchIndex]);
  __page1 = __page1.clickSearchArrowAI();
  __page1 = __page1.hoverandSelectFirst(this.collectionName_AI, true, String.valueOf(indexToSelect));
  __page1 = __page1.clickCollectionDesAI();
  __page1 = __page1.hoverandSelectFirst(this.collectionName_AI, false, String.valueOf(1));
  __page1 = __page1.submitCollection();
  expect(__page1.messageElement("Add content to your collection")).toBeVisible({ timeout: 60000 });
  expect(__page1.buttonAddContent_AI).toBeVisible({ timeout: 60000 });
  __page1 = __page1.navigateToPageByPath(this.PATH, CreateCollectionPage);
  __page1 = __page1.fillCollectionSearch(this.collectionName_AI.getValue());
  expect(__page1.locatePTagByText(this.collectionName_AI.getValue())).toBeVisible({ timeout: 60000 });
	}

	// Fully implemented
	public manageContentDelete(): void {

		let courseToBeAdd: string[][] = [ [ "Subscriptions only", "Architecting Scalable Python Applications" ],
				[ "Subscriptions only", "20 Questions To Help You Start a Business" ],
				[ "Learning platform only", "Microsoft Office 2016 Excel Basic" ] ];

		let today: any = new Date();
		let collectionName: string = "Auto_" + this.data.name().firstName() + this.dfor.format(today);
		let collectionDes: string = "AutoDes_" + this.data.name().firstName() + this.dfor.format(today);

		  let __page2: any = this;
  __page2 = __page2.getCsLoginPage(this.getConfig().getThinkContentURL());
  __page2 = __page2.loginToThinkContent(this.getPlayFifteenUser().email, this.getPlayFifteenUser().password);
  __page2 = __page2.navigateToPageByPath(this.PATH, CreateCollectionPage);
  __page2 = __page2.createCollection(collectionName, collectionDes, "suomi (Suomi)s");
  __page2 = __page2.ClickAddcontent();
  __page2 = __page2.Addcontent(courseToBeAdd);
  __page2 = __page2.clickReviewCollection();
  __page2 = __page2.clickAddContentToCollection();
  __page2 = __page2.navigateToPageByPath(this.YOURCOLLECTION_PATH, CreateCollectionPage);
  __page2 = __page2.waitForContentCardLoad();
  __page2 = __page2.run(new OpenCollection(collectionName));
  __page2 = __page2.clickManageContent();
  __page2 = __page2.clickMangeOption("Delete Courses");
  __page2 = __page2.selectcourse(courseToBeAdd[2][1]);
  __page2 = __page2.clickDeleteSelected();
  __page2 = __page2.clickYes();
  expect(__page2.messageElement(collectionDes)).not.toBeVisible({ timeout: 60000 });
	}

	// Fully implemented
	public exportCollectionAndvalidateCSV(): void {
		let today: any = new Date();
		let collectionName: string = "Auto_" + this.data.name().firstName() + this.dfor.format(today);
		let collectionDes: string = "AutoDes_" + this.data.name().firstName() + this.dfor.format(today);

		  let __page3: any = this;
  __page3 = __page3.getCsLoginPage(this.getConfig().getThinkContentURL());
  __page3 = __page3.loginToThinkContent(this.getPlayFifteenUser().email, this.getPlayFifteenUser().password);
  __page3 = __page3.navigateToPageByPath(this.PATH, CreateCollectionPage);
  __page3 = __page3.createCollection(collectionName, collectionDes, null);
  expect(__page3.messageElement("Add content to your collection")).toBeVisible({ timeout: 60000 });
  __page3 = __page3.clickCollectionOptionVerticalDot();
  __page3 = __page3.clickCollectionOption("Export collection as CSV");
		// Add CSV validation

	}



}
