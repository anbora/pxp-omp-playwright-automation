import { Faker } from "com/github/javafaker/Faker";
import { BaseTest } from "common/BaseTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { ITestContext } from "common/testing/runtime";
import { CreateCollectionAssertions } from "cs/assertions/CreateCollectionAssertions";
import { CreateCollectionPage } from "cs/pages/CreateCollectionPage";
import { OpenCollection } from "cs/scenarios/OpenCollection";
import { ResultContainer } from "models/ResultContainer";

export class VerifyCopyCollection_CSX extends BaseTest {

	private readonly PATH: string[] = [ "Curation", "Explore collections" ];
	private readonly YOURCOLLECTION_PATH: string[] = [ "Curation", "Your collections" ];
	private readonly OPEN_COLLECTION: string = "Programme Content Anytime : Leadership inclusif";
	data: Faker = new Faker();
	dfor: DateFormat = new SimpleDateFormat("ddMMyy_HHmmss");
	private readonly LABEL_SUBSCRIBE: string = "Subscribed";
	private readonly LABEL_NEW: string = "New";
	private readonly LABEL_RETIRING: string = "Retiring";
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

		this.getCsLoginPage(this.getConfig().getThinkContentURL())
		.loginToThinkContent(this.getPlayTenUser().email, this.getPlayTenUser().password)
		.navigateToPageByPath(this.PATH, CreateCollectionPage)
		.clickCornerstoneCurationTab()
		.searchCollection(this.COLLECION_NAME)
		.clickCardVertialDot()
		.check(CreateCollectionAssertions)
		.assertThatCollectionCardOptionIsVisible(this.COLLECION_COPY)
		.assertThatCollectionCardOptionIsVisible(this.COLLECION_EXPORT)
		.endAssertion()
		.closeDialog()
		.openCollection(this.COLLECION_NAME)
		.clickCardVertialDot()
		.check(CreateCollectionAssertions)
		.assertThatCollectionCardOptionIsVisible(this.COLLECION_COPY)
		.assertThatCollectionCardOptionIsVisible(this.COLLECION_EXPORT)
		.endAssertion()
		.clickCollectionOption(this.COLLECION_COPY)
		.enterCollectionName(collectionName)
		.clickContinue()
		.check(CreateCollectionAssertions)
		.assertThatButtonIsVisible("Send collection for review")
		.assertThatButtonIsVisible("Leave a comment")
		.assertThatCollectionCreatorIsVisible(this.COLLECION_CREATOR)
		.endAssertion();
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

		this.getCsLoginPage(this.getConfig().getThinkContentURL())
		.loginToThinkContent(this.getPlayTenUser().email, this.getPlayTenUser().password)
		.navigateToPageByPath(this.YOURCOLLECTION_PATH, CreateCollectionPage)
		.waitForContentCardLoad()
		.run(new OpenCollection(collectionName))
		.clickManageContent()
		.clickMangeOption("Delete Courses")
		.selectcourse(this.courseToBeAdd[0][1])
		.clickDeleteSelected()
		.clickYes()
		.check(CreateCollectionAssertions)
		.assertThatMessageIsNotVisible(this.courseToBeAdd[0][1])
		.endAssertion();
	}

}
