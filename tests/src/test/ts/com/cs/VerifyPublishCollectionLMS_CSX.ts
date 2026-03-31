// @ts-nocheck
import { Faker } from "com/github/javafaker/Faker";
import { BaseTest } from "common/BaseTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { CreateCollectionPage } from "cs/pages/CreateCollectionPage";
import { LMSPage } from "cs/pages/LMSPage";
import { expect } from "common/testing/playwright";

export class VerifyPublishCollectionLMS_CSX extends BaseTest {

	private readonly YOURCOLLECTION_PATH: string[] = [ "Curation", "Your collections" ];
	private readonly MANAGEOBJECTIVEPATH: string[] = ["Configuration", "Manage Objectives"];
	private readonly LABEL_SEARCHCOURSE_RETIRE: string = "Duty of Care for Workers";
	private readonly PATH: string[] = [ "Curation", "Explore collections" ];
	data: Faker = new Faker();
	dfor: DateFormat = new SimpleDateFormat("ddMMyy_HHmmss");

	public verifyCollectionPublishAndViewInPlatForm(): void {

		let courseToBeAdd: string[][] = [ [ "Subscriptions only", "Architecting Scalable Python Applications" ]];
		let collectionReviewerUpdated: string = "CS Tester updated1";
		let today: any = new Date();
		let collectionName: string = "Auto_" + this.data.name().firstName() + this.dfor.format(today);
		let collectionDes: string = "AutoDes_" + this.data.name().firstName() + this.dfor.format(today);


		  let __page1: any = this;
  __page1 = __page1.getCsLoginPage(this.getConfig().getThinkContentURL());
  __page1 = __page1.loginToThinkContent(this.getPlayTwelveUser().email, this.getPlayTwelveUser().password);
  __page1 = __page1.navigateToPageByPath(this.YOURCOLLECTION_PATH, CreateCollectionPage);
  __page1 = __page1.createCollection(collectionName, collectionDes, "suomi (Suomi)s");
  __page1 = __page1.ClickAddcontent();
  __page1 = __page1.Addcontent(courseToBeAdd);
  __page1 = __page1.clickReviewCollection();
  __page1 = __page1.clickAddContentToCollection();
  __page1 = __page1.clickSendCollectionForReview();
  __page1 = __page1.clickCollectionReviewDownArr();
  __page1 = __page1.inputReviewerName("TestTwelveF TestTwelveL");
  __page1 = __page1.selectCollectionReviewer("TestTwelveF TestTwelveL"+" (You)");
  __page1 = __page1.clickSendReview();
  __page1 = __page1.clickPublish();
  __page1 = __page1.clickPublishnow();
  __page1 = __page1.clickViewInPlatForm(LMSPage);
  __page1 = __page1.waitForTime(5000);
  __page1.pause(5000);
  expect(__page1.getPage()).toHaveURL(Pattern.compile("((http|https):\\/\\/*)(thinkcontent.csod.com)"));
  expect(__page1.verifyPlaylistName(collectionName)).toBeVisible({ timeout: 60000 });
	}
}
