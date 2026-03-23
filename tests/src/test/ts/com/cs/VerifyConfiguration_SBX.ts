import { Faker } from "com/github/javafaker/Faker";
import { BaseTest } from "common/BaseTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { ManageConfigurationAssertions } from "cs/assertions/ManageConfigurationAssertions";
import { ContentStudioPopup } from "cs/pages/ContentStudioPopup";
import { CreateCollectionPage } from "cs/pages/CreateCollectionPage";
import { ManageConfigurationPage } from "cs/pages/ManageConfigurationPage";
import { ResultContainer } from "models/ResultContainer";

export class VerifyConfiguration_SBX extends BaseTest{
	private readonly PATH: string[] = ["Curation", "Explore collections"];
	private readonly ConPATH: string[] = ["Configuration","Manage content refresh"];
	private readonly COURSE_VIEW: string = "Simple Ways to Protect Data";
	private partnerName: string="SAI 360";	//Kineo
	private readonly duration: string = "1 minutes";
	private courseCount: ResultContainer = new ResultContainer();
	data: Faker = new Faker();
	dfor: DateFormat = new SimpleDateFormat("ddMMyy_HHmmss");
	private readonly COLUMN_COLLECTION_IT_IS_PART_OF: string = "Collections it is part of";
	private readonly COURSE_COUNT_VALIDATION: string = "Thinking Like a Leader";
	private readonly LABEL_SUBSCRIBE: string = "Subscribed";
	private readonly LABEL_NEW: string = "New";
	private readonly LABEL_RETIRING: string = "Retiring";

	//Fully done
	public verifyConfigurationPage(): void {

		this.getCsLoginPage(this.getConfig().getSbxurl())
		.logintoSBX("CSUSERONE", "welcome")
			.navigateToPageByPath(this.PATH, ContentStudioPopup)
			.navigateToPageByPath(this.ConPATH, ManageConfigurationPage)
			.check(ManageConfigurationAssertions)
			.assertThatTabsVisible("Upcoming removals")
			.assertThatTabsVisible("Removed content")
			//.assertThatNoContentMessagePresent()
			.assertThatTableHeaders(["Content title", "Provider", "Collections it is part of", "Total learners last quarter", "Total learners all time", "Date of removal", "Replacement suggestion"])
			.endAssertion()
			.tableheader();
	 }

	//Fully done
	public verifyRemovedContentTab(): void {

		this.getCsLoginPage(this.getConfig().getSbxurl())
		.logintoSBX("CSUSERONE", "welcome")
			.navigateToPageByPath(this.PATH, ContentStudioPopup)
			.navigateToPageByPath(this.ConPATH, ManageConfigurationPage)
			.clickRemovedContentTab()
			.check(ManageConfigurationAssertions)
			.assertThatTableHeaders(["Content title","Provider","Total learners last quarter","Total learners all time","Date of removal"])
			.endAssertion();

	  }

	//@Test(description = "Verify DownLoad CSV")
	public verifyDownloadCSV(): void {

		this.getCsLoginPage(this.getConfig().getSbxurl())
		.logintoSBX("CSUSERONE", "welcome")
			.navigateToPageByPath(this.ConPATH, ManageConfigurationPage)
			.waitForTablePresent()
			.clickDownloadCSV();
	}

	//@Test(description = "Verify that curator user is able to review content : C28933093")
	public verifyCuratorUserAbleToReviewContent(): void {
		this.getCsLoginPage(this.getConfig().getSbxurl())
		.logintoSBX("CSUSERONE", "welcome")
			.navigateToPageByPath(this.ConPATH, ManageConfigurationPage)
			.waitForTablePresent()
			.clickCourseReviewButton(this.COURSE_VIEW)
			.check(ManageConfigurationAssertions)
			.assertThatDialogViewCourseButton("View Course")
			.endAssertion()
			.closeReviewDialog();
	}

	//@Test(description = "Verify that curator user is able to View course from Review action : C28933094,C28933095")
	public verifyViewCourseFromReviewAction(): void {
		this.getCsLoginPage(this.getConfig().getSbxurl())
		.logintoSBX("CSUSERONE", "welcome")
			.navigateToPageByPath(this.ConPATH, ManageConfigurationPage)
			.waitForTablePresent()
			.clickCourseReviewButton(this.COURSE_VIEW)
			.clickViewCourseButton()
			.check(ManageConfigurationAssertions)
			.assertThatCourseTilePresent(this.COURSE_VIEW)
			.endAssertion();
	}


	//@Test(description = "Count of Collection it is part of column gets increased : C28940587")
	public verifyCountIncrease(): void {

		let courseToBeAdd: string[][] = [ [ "Subscriptions only", this.COURSE_COUNT_VALIDATION ]];
		let today: any = new Date();
		let collectionName: string = "Auto_" + this.data.name().firstName() + this.dfor.format(today);
		let collectionDes: string = "AutoDes_" + this.data.name().firstName() + this.dfor.format(today);


		this.getCsLoginPage(this.getConfig().getSbxurl())
		.logintoSBX("CSUSERONE", "welcome")
			.navigateToPageByPath(this.ConPATH, ManageConfigurationPage)
			.waitForTablePresent()
			.getCollectionsPartOfCount(this.courseCount,this.COURSE_COUNT_VALIDATION,this.COLUMN_COLLECTION_IT_IS_PART_OF)
			.navigateToPageByPath(this.PATH, CreateCollectionPage)
			.createCollection(collectionName, collectionDes, null)
			.ClickAddcontent()
			.Addcontent(courseToBeAdd)
			.clickReviewCollection()
			.clickAddContentToCollection()
			.navigateToPageByPath(this.ConPATH, ManageConfigurationPage)
			.waitForTablePresent()
			.check(ManageConfigurationAssertions)
			.assertThatPartOfCountPresent(this.COURSE_COUNT_VALIDATION,this.COLUMN_COLLECTION_IT_IS_PART_OF, this.courseCount.getValue())
			.endAssertion();


	}

	//@Test(description = "Verify Course Details page after Clicking on course Title")
	public verifyCourseDetailsAfterClcikingOnCourseTitle(): void {

		this.getCsLoginPage(this.getConfig().getSbxurl())
		.logintoSBX("CSUSERONE", "welcome")
			.navigateToPageByPath(this.ConPATH, ManageConfigurationPage)
			.waitForTablePresent()
			.clickCourse(this.COURSE_VIEW)
			.check(ManageConfigurationAssertions)
			.assertThatCourseTilePresent(this.COURSE_VIEW)
			.assertThatContentPartnerPresent(this.partnerName)
			.assertThatDurationPresent(this.duration)
			.endAssertion();
	}

	//@Test
	public verfiyBadgeRetiring(): void {

		this.getCsLoginPage(this.getConfig().getSbxurl())
		.logintoSBX("CSUSERONE", "welcome")
		.navigateToPageByPath(this.ConPATH, ManageConfigurationPage)
		.waitForTablePresent()
		.clickCourse("Simple Ways to Protect Data")
		.check(ManageConfigurationAssertions)
		.assertThatCourseTilePresent(this.COURSE_VIEW)
		.assertThatBadgeIsVisible(this.LABEL_RETIRING)
		.endAssertion();

	}

	//@Test(description = "Verify DownLoad CSV Removed Content")
	public verifyDownloadCSVRemovedContent(): void {

		this.getCsLoginPage(this.getConfig().getSbxurl())
		.logintoSBX("CSUSERONE", "welcome")
			.navigateToPageByPath(this.ConPATH, ManageConfigurationPage)
			.clickRemovedContentTab()
			.waitForTablePresent();
			//.clickDownloadCSV();
	}

}
