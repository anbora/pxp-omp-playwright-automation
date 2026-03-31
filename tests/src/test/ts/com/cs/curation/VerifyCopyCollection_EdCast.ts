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

export class VerifyCopyCollection_EdCast extends BaseTest {

	private readonly PATH: string[] = [ "Curation", "Explore collections" ];
	private readonly YOURCOLLECTION_PATH: string[] = [ "Curation", "Your collections" ];
	data: Faker = new Faker();
	dfor: DateFormat = new SimpleDateFormat("ddMMyy_HHmmss");
	private readonly COLLECION_COPY: string = "Copy collection";
	private readonly COLLECION_EXPORT: string = "Export collection as CSV";
	private readonly COLLECION_PUBLISHANDSYNC: string = "Publish & auto-sync";
	private COLLECION_NAME: string="Anti-Racism in the Workplace"; //Anti-Racism for Leaders
	private readonly BUTTON_LEAVE_COMMENT: string = "Leave a comment";
	private readonly COLLECION_FILTER_STATUS: string = "Status";
	private readonly STATUS_CREATED: string = "CREATED";
	private readonly STATUS_PUBLISHED: string = "PUBLISHED";
	private readonly STATUS_IN_PROGRESS: string = "IN_PROGRESS";
	private readonly STATUS_READY_FOR_REVIEW: string = "READY_FOR_REVIEW";
	private readonly WARNING_MESSAGE: string = "This collection is part of automatic sync and cannot be edited";

	private readonly COLLECION_CREATOR: string = "Testten Testten";
	courseToBeAdd: string[][] = [
			[ "Subscriptions only", "Visualizing Data in Excel" ] ];

	collectionName_AI: ResultContainer = new ResultContainer();

	public verifyPublishAndAutoSync(): void {

		  let __page1: any = this;
  __page1 = __page1.getCsLoginPage(this.getConfig().getEdCastURL());
  __page1 = __page1.navigateToLogin();
  __page1 = __page1.loginToApplication(this.getPlayEdCastUserSix().email, this.getPlayEdCastUserSix().password);
  __page1 = __page1.launchEdCastContentStudio();
  __page1 = __page1.navigateToPageByPath(this.PATH, CreateCollectionPage);
  __page1 = __page1.clickCollectionFilterArrow(this.COLLECION_FILTER_STATUS);
  __page1 = __page1.clickCollectionFilterValueCheckbox(this.STATUS_PUBLISHED);
  __page1 = __page1.closeDialog();
  __page1 = __page1.clickCornerstoneCurationTab();
  __page1 = __page1.openPublishedCollection("Anti-Racism in the Workplace");
  expect(__page1.badge_check(this.WARNING_MESSAGE).first()).toBeVisible({ timeout: 60000 });

	}

	// Fully implemented
	public verifyCollectionCardOptions(data: ITestContext): void {
		let today: any = new Date();

		let collectionName: string = this.COLLECION_NAME+"_ED" + this.dfor.format(today);
		this.data.setAttribute("CopiedCollection", collectionName);
		  let __page2: any = this;
  __page2 = __page2.getCsLoginPage(this.getConfig().getEdCastURL());
  __page2 = __page2.navigateToLogin();
  __page2 = __page2.loginToApplication(this.getPlayEdCastUserSix().email, this.getPlayEdCastUserSix().password);
  __page2 = __page2.launchEdCastContentStudio();
  __page2 = __page2.navigateToPageByPath(this.PATH, CreateCollectionPage);
  __page2 = __page2.clickCornerstoneCurationTab();
  __page2 = __page2.searchCollection(this.COLLECION_NAME);
  __page2 = __page2.clickCardVertialDot();
  expect(__page2.locate_LI_TagByText(this.COLLECION_COPY)).toBeVisible({ timeout: 60000 });
  expect(__page2.locate_LI_TagByText(this.COLLECION_EXPORT)).toBeVisible({ timeout: 60000 });
  expect(__page2.locate_LI_TagByText(this.COLLECION_PUBLISHANDSYNC)).toBeVisible({ timeout: 60000 });
  __page2 = __page2.closeDialog();
  __page2 = __page2.openCollection(this.COLLECION_NAME);
  __page2 = __page2.clickCardVertialDot();
  expect(__page2.locate_LI_TagByText(this.COLLECION_COPY)).toBeVisible({ timeout: 60000 });
  expect(__page2.locate_LI_TagByText(this.COLLECION_EXPORT)).toBeVisible({ timeout: 60000 });
  expect(__page2.locate_LI_TagByText(this.COLLECION_PUBLISHANDSYNC)).toBeVisible({ timeout: 60000 });
  expect(__page2.buttonText(this.COLLECION_PUBLISHANDSYNC)).toBeVisible({ timeout: 60000 });
  expect(__page2.buttonText(this.BUTTON_LEAVE_COMMENT)).toBeVisible({ timeout: 60000 });
  __page2 = __page2.clickCollectionOption("Copy collection");
  __page2 = __page2.enterCollectionName(collectionName);
  __page2 = __page2.clickContinue();
  __page2 = __page2.waitForTime(5000);
  __page2 = __page2.navigateToPageByPath(this.YOURCOLLECTION_PATH, CreateCollectionPage);
  __page2 = __page2.searchCollection(collectionName);
  __page2 = __page2.openCollection(collectionName);
  expect(__page2.loc_DIV_ByText(collectionName)).toBeVisible({ timeout: 60000 });
  expect(__page2.buttonText("Send collection for review")).toBeVisible({ timeout: 60000 });
  expect(__page2.buttonText("Leave a comment")).toBeVisible({ timeout: 60000 });
	}

	//@Test
	public verifyAddContent(data: ITestContext): void {
		let collectionName: string = "Anti-Racism in the Workplace_ED250724_175236";//this.data.getAttribute("CopiedCollection").toString();


		this.getCsLoginPage(this.getConfig().getEdCastURL())
		.navigateToLogin()
		.loginToApplication(this.getPlayEdCastUserSix().email, this.getPlayEdCastUserSix().password)
		.launchEdCastContentStudio()
		.navigateToPageByPath(this.YOURCOLLECTION_PATH, CreateCollectionPage)
		.waitForContentCardLoad()
		.run(new OpenCollection(collectionName))
		.clickManageContent()
		.clickMangeOption("Add Courses")
		.waitForTime(150000)
		.Addcontent(this.courseToBeAdd)
		.clickReviewCollection()
		.clickAddContentToCollection();
	}

	//@Test
	public verifyDeleteContent(data: ITestContext): void {
		let collectionName: string = "Anti-Racism in the Workplace_ED250724_175236";//this.data.getAttribute("CopiedCollection").toString();

		  let __page3: any = this;
  __page3 = __page3.getCsLoginPage(this.getConfig().getEdCastURL());
  __page3 = __page3.navigateToLogin();
  __page3 = __page3.loginToApplication(this.getPlayEdCastUserSix().email, this.getPlayEdCastUserSix().password);
  __page3 = __page3.launchEdCastContentStudio();
  __page3 = __page3.navigateToPageByPath(this.YOURCOLLECTION_PATH, CreateCollectionPage);
  __page3 = __page3.waitForContentCardLoad();
  __page3 = __page3.run(new OpenCollection(collectionName));
  __page3 = __page3.clickManageContent();
  __page3 = __page3.clickMangeOption("Delete Courses");
  __page3 = __page3.selectcourse(this.courseToBeAdd[0][1]);
  __page3 = __page3.clickDeleteSelected();
  __page3 = __page3.clickYes();
  expect(__page3.messageElement(this.courseToBeAdd[0][1])).not.toBeVisible({ timeout: 60000 });
	}

}
