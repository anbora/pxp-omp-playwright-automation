import { Faker } from "com/github/javafaker/Faker";
import { BaseTest } from "common/BaseTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { ITestContext } from "common/testing/runtime";
import { CreateCollectionAssertions } from "cs/assertions/CreateCollectionAssertions";
import { CreateCollectionPage } from "cs/pages/CreateCollectionPage";
import { OpenCollection } from "cs/scenarios/OpenCollection";
import { ResultContainer } from "models/ResultContainer";

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

		this.getCsLoginPage(this.getConfig().getEdCastURL())
		.navigateToLogin()
		.loginToApplication(this.getPlayEdCastUserSix().email, this.getPlayEdCastUserSix().password)
		.launchEdCastContentStudio()
		.navigateToPageByPath(this.PATH, CreateCollectionPage)
		.clickCollectionFilterArrow(this.COLLECION_FILTER_STATUS)
		.clickCollectionFilterValueCheckbox(this.STATUS_PUBLISHED)
		.closeDialog()
		.clickCornerstoneCurationTab()
		.openPublishedCollection("Anti-Racism in the Workplace")
		.check(CreateCollectionAssertions)
		.assertThatBadgeIsVisible(this.WARNING_MESSAGE)
		.endAssertion();

	}

	// Fully implemented
	public verifyCollectionCardOptions(data: ITestContext): void {
		let today: any = new Date();

		let collectionName: string = this.COLLECION_NAME+"_ED" + this.dfor.format(today);
		this.data.setAttribute("CopiedCollection", collectionName);
		this.getCsLoginPage(this.getConfig().getEdCastURL())
		.navigateToLogin()
		.loginToApplication(this.getPlayEdCastUserSix().email, this.getPlayEdCastUserSix().password)
		.launchEdCastContentStudio()
		.navigateToPageByPath(this.PATH, CreateCollectionPage)
		.clickCornerstoneCurationTab()
		.searchCollection(this.COLLECION_NAME)
		.clickCardVertialDot()
		.check(CreateCollectionAssertions)
		.assertThatCollectionCardOptionIsVisible(this.COLLECION_COPY)
		.assertThatCollectionCardOptionIsVisible(this.COLLECION_EXPORT)
		.assertThatCollectionCardOptionIsVisible(this.COLLECION_PUBLISHANDSYNC)
		.endAssertion()
		.closeDialog()
		.openCollection(this.COLLECION_NAME)
		.clickCardVertialDot()
		.check(CreateCollectionAssertions)
		.assertThatCollectionCardOptionIsVisible(this.COLLECION_COPY)
		.assertThatCollectionCardOptionIsVisible(this.COLLECION_EXPORT)
		.assertThatCollectionCardOptionIsVisible(this.COLLECION_PUBLISHANDSYNC)
		.assertThatButtonIsVisible(this.COLLECION_PUBLISHANDSYNC)
		.assertThatButtonIsVisible(this.BUTTON_LEAVE_COMMENT)
		.endAssertion()
		.clickCollectionOption("Copy collection")
		.enterCollectionName(collectionName)
		.clickContinue()
		.waitForTime(5000)
		.navigateToPageByPath(this.YOURCOLLECTION_PATH, CreateCollectionPage)
		.searchCollection(collectionName)
		.openCollection(collectionName)
		.check(CreateCollectionAssertions)
		.assertThatHeaderYourCollectionVisible(collectionName)
		.assertThatButtonIsVisible("Send collection for review")
		.assertThatButtonIsVisible("Leave a comment")
		.endAssertion();
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

		this.getCsLoginPage(this.getConfig().getEdCastURL())
		.navigateToLogin()
		.loginToApplication(this.getPlayEdCastUserSix().email, this.getPlayEdCastUserSix().password)
		.launchEdCastContentStudio()
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
