import { Faker } from "com/github/javafaker/Faker";
import { BaseTest } from "common/BaseTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { LMSPageAssertions } from "cs/assertions/LMSPageAssertions";
import { CreateCollectionPage } from "cs/pages/CreateCollectionPage";
import { LMSPage } from "cs/pages/LMSPage";

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


		this.getCsLoginPage(this.getConfig().getThinkContentURL())
		.loginToThinkContent(this.getPlayTwelveUser().email, this.getPlayTwelveUser().password)
		.navigateToPageByPath(this.YOURCOLLECTION_PATH, CreateCollectionPage)
		.createCollection(collectionName, collectionDes, "suomi (Suomi)s")
		.ClickAddcontent()
		.Addcontent(courseToBeAdd)
		.clickReviewCollection()
		.clickAddContentToCollection()
		.clickSendCollectionForReview()
		.clickCollectionReviewDownArr()
		.inputReviewerName("TestTwelveF TestTwelveL")
		.selectCollectionReviewer("TestTwelveF TestTwelveL"+" (You)")
		.clickSendReview()
		.clickPublish()
		.clickPublishnow()
		.clickViewInPlatForm(LMSPage)
		.waitForTime(5000)
		.check(LMSPageAssertions)
		.assertThaURLIsVisible()
		.assertThatLMSCollectionNameIsVisible(collectionName)
		.endAssertion();
	}
}
