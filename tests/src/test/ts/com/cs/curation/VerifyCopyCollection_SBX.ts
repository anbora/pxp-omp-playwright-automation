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

export class VerifyCopyCollection_SBX extends BaseTest {

	private readonly PATH: string[] = [ "Curation", "Explore collections" ];
	private readonly YOURCOLLECTION_PATH: string[] = [ "Curation", "Your collections" ];
	data: Faker = new Faker();
	dfor: DateFormat = new SimpleDateFormat("ddMMyy_HHmmss");
	private readonly COLLECION_COPY: string = "Copy collection";
	private readonly COLLECION_EXPORT: string = "Export collection as CSV";
	private readonly COLLECION_NAME: string = "Anti-Racism for Leaders";
	private readonly COLLECION_CREATOR: string = "Testten Testten";
	courseToBeAdd: string[][] = [
			[ "Subscriptions only", "20 Questions To Help You Start a Business" ] ];

	collectionName_AI: ResultContainer = new ResultContainer();


	// Fully implemented
	public verifyCollectionCardOptions(data: ITestContext): void {
		let today: any = new Date();

		let collectionName: string = this.COLLECION_NAME+"_CC" + this.dfor.format(today);
		this.data.setAttribute("CopiedCollection", collectionName);

		  let __page1: any = this;
  __page1 = __page1.getCsLoginPage(this.getConfig().getThinkContentURL());
  __page1 = __page1.loginToThinkContent(this.getPlayTenUser().email, this.getPlayTenUser().password);
  __page1 = __page1.navigateToPageByPath(this.PATH, CreateCollectionPage);
  __page1 = __page1.clickCornerstoneCurationTab();
  __page1 = __page1.searchCollection(this.COLLECION_NAME);
  __page1 = __page1.clickCardVertialDot();
  expect(__page1.locate_LI_TagByText(this.COLLECION_COPY)).toBeVisible({ timeout: 60000 });
  expect(__page1.locate_LI_TagByText(this.COLLECION_EXPORT)).toBeVisible({ timeout: 60000 });
  __page1 = __page1.closeDialog();
  __page1 = __page1.openCollection(this.COLLECION_NAME);
  __page1 = __page1.clickCardVertialDot();
  expect(__page1.locate_LI_TagByText(this.COLLECION_COPY)).toBeVisible({ timeout: 60000 });
  expect(__page1.locate_LI_TagByText(this.COLLECION_EXPORT)).toBeVisible({ timeout: 60000 });
  __page1 = __page1.clickCollectionOption(this.COLLECION_COPY);
  __page1 = __page1.enterCollectionName(collectionName);
  __page1 = __page1.clickContinue();
  expect(__page1.buttonText("Send collection for review")).toBeVisible({ timeout: 60000 });
  expect(__page1.buttonText("Leave a comment")).toBeVisible({ timeout: 60000 });
  expect(__page1.loc_CollectionCreator(this.COLLECION_CREATOR)).toBeVisible({ timeout: 60000 });
	}

	public verifyAddContent(data: ITestContext): void {
		let collectionName: string = this.data.getAttribute("CopiedCollection").toString();


		this.getCsLoginPage(this.getConfig().getThinkContentURL())
		.loginToThinkContent(this.getPlayTenUser().email, this.getPlayTenUser().password)
		.navigateToPageByPath(this.YOURCOLLECTION_PATH, CreateCollectionPage)
		.waitForContentCardLoad()
		.run(new OpenCollection(collectionName))
		.clickManageContent()
		.clickMangeOption("Add Courses")
		.Addcontent(this.courseToBeAdd)
		.clickReviewCollection()
		.clickAddContentToCollection();
	}

	public verifyDeleteContent(data: ITestContext): void {
		let collectionName: string = this.data.getAttribute("CopiedCollection").toString();

		  let __page2: any = this;
  __page2 = __page2.getCsLoginPage(this.getConfig().getThinkContentURL());
  __page2 = __page2.loginToThinkContent(this.getPlayTenUser().email, this.getPlayTenUser().password);
  __page2 = __page2.navigateToPageByPath(this.YOURCOLLECTION_PATH, CreateCollectionPage);
  __page2 = __page2.waitForContentCardLoad();
  __page2 = __page2.run(new OpenCollection(collectionName));
  __page2 = __page2.clickManageContent();
  __page2 = __page2.clickMangeOption("Delete Courses");
  __page2 = __page2.selectcourse(this.courseToBeAdd[0][1]);
  __page2 = __page2.clickDeleteSelected();
  __page2 = __page2.clickYes();
  expect(__page2.messageElement(this.courseToBeAdd[0][1])).not.toBeVisible({ timeout: 60000 });
	}

}
