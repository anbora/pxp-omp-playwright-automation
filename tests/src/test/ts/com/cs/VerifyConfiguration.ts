import { Faker } from "com/github/javafaker/Faker";
import { BaseTest } from "common/BaseTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { ManageConfigurationAssertions } from "cs/assertions/ManageConfigurationAssertions";
import { ContentStudioPopup } from "cs/pages/ContentStudioPopup";
import { CreateCollectionPage } from "cs/pages/CreateCollectionPage";
import { ManageConfigurationPage } from "cs/pages/ManageConfigurationPage";
import { ResultContainer } from "models/ResultContainer";

export class VerifyConfiguration extends BaseTest{
	private readonly PATH: string[] = ["Curation", "Explore collections"];
	private readonly ConPATH: string[] = ["Configuration","Manage content refresh"];
	private readonly COURSE_VIEW_RETIRE: string = "Corrective Action Training: Seat Belts";
	private partnerName: string="JJ Keller";	//Kineo
	private readonly duration: string = "5 minutes";
	private courseCount: ResultContainer = new ResultContainer();
	data: Faker = new Faker();
	dfor: DateFormat = new SimpleDateFormat("ddMMyy_HHmmss");
	private readonly COLUMN_COLLECTION_IT_IS_PART_OF: string = "Collections it is part of";
	private readonly COURSE_COUNT_VALIDATION: string = "Global Anti-Corruption";
	private readonly LABEL_SUBSCRIBE: string = "Subscribed";
	private readonly LABEL_NEW: string = "New";
	private readonly LABEL_RETIRING: string = "Retiring";
	private readonly COURSE_VIEW: string = "MS Office 2013 PowerPoint: Introduction";
	private replacementCourseName: ResultContainer = new ResultContainer();

	//Fully done
	public verifyConfigurationPage(): void {

		  this.getCsLoginPage(this.getConfig().getThinkContentURL())
	      	.loginToThinkContent(this.getPlayThreeUser().email, this.getPlayOneUser().password)
			.navigateToPageByPath(this.PATH, ContentStudioPopup)
			.navigateToPageByPath(this.ConPATH, ManageConfigurationPage)
			.check(ManageConfigurationAssertions)
			.assertThatTabsVisible("Upcoming removals")
			.assertThatTabsVisible("Removed content")
			.assertThatTableHeaders(["Content title", "Provider", "Collections it is part of", "Total learners last quarter", "Total learners all time", "Date of removal", "Replacement suggestion"])
			//.assertThatNoContentMessagePresent()
			.endAssertion();
	 }

	//Fully done
	public verifyRemovedContentTab(): void {

		let headerName: string = "Manage content refresh";
		this.getCsLoginPage(this.getConfig().getThinkContentURL())
	    .loginToThinkContent(this.getPlayThreeUser().email, this.getPlayOneUser().password)
		.navigateToPageByPath(this.PATH, ContentStudioPopup)
		.navigateToPageByPath(this.ConPATH, ManageConfigurationPage)
		.clickRemovedContentTab()
		.check(ManageConfigurationAssertions)
		.assertThatTableHeaders(["Content title","Provider","Total learners last quarter","Total learners all time","Date of removal"])
		.endAssertion()
		.waitForTablePresent()
		.scrolltoBottom("1500",ManageConfigurationPage)
		.check(ManageConfigurationAssertions)
		.assertThatStickyHeaderVisible(headerName)
		.endAssertion()
		.scrolltoBottom("Downmost",ManageConfigurationPage)
		.check(ManageConfigurationAssertions)
		.assertThatStickyHeaderVisible(headerName)
		.endAssertion();

	  }

	//@Test(description = "Verify DownLoad CSV")
	public verifyDownloadCSV(): void {

		  this.getCsLoginPage(this.getConfig().getThinkContentURL())
	    	.loginToThinkContent(this.getPlayThreeUser().email, this.getPlayOneUser().password)
			.navigateToPageByPath(this.ConPATH, ManageConfigurationPage)
			.waitForTablePresent()
			.clickDownloadCSV();
	}

	//@Test(description = "Verify that curator user is able to review content and  : C28933093")
	public verifyCuratorUserAbleToReviewContent(): void {
		  this.getCsLoginPage(this.getConfig().getThinkContentURL())
	    	.loginToThinkContent(this.getPlayThreeUser().email, this.getPlayOneUser().password)
			.navigateToPageByPath(this.ConPATH, ManageConfigurationPage)
			.waitForTablePresent()
			.clickCourseReviewButton(this.COURSE_VIEW)
			.check(ManageConfigurationAssertions)
			//.assertThatCourseTilePresent(COURSE_VIEW)
			.assertThatDialogViewCourseButton("View Course")
			.endAssertion()
			.closeReviewDialog();
	}

	//@Test(description = "Verify that curator user is able to View course from Review action : C28933094,C28933095")
	//Added Above
	public verifyViewCourseFromReviewAction(): void {
		  this.getCsLoginPage(this.getConfig().getThinkContentURL())
	    	.loginToThinkContent(this.getPlayThreeUser().email, this.getPlayOneUser().password)
			.navigateToPageByPath(this.ConPATH, ManageConfigurationPage)
			.waitForTablePresent()
			.clickCourseReviewButton(this.COURSE_VIEW)
			.geReplacementCourseName(this.replacementCourseName)
			.clickViewCourseButton()
			.check(ManageConfigurationAssertions)
			.assertThatCourseTilePresent(this.replacementCourseName.getValue())
			.endAssertion();
	}

	//@Test(description = "Count of Collection it is part of column gets increased : C28940587")
	public verifyCountIncrease(): void {

		let courseToBeAdd: string[][] = [ [ "Subscriptions only", this.COURSE_COUNT_VALIDATION ]];
		let today: any = new Date();
		let collectionName: string = "Auto_" + this.data.name().firstName() + this.dfor.format(today);
		let collectionDes: string = "AutoDes_" + this.data.name().firstName() + this.dfor.format(today);


		this.getCsLoginPage(this.getConfig().getThinkContentURL())
	    	.loginToThinkContent(this.getPlayThreeUser().email, this.getPlayOneUser().password)
			.navigateToPageByPath(this.ConPATH, ManageConfigurationPage)
			.waitForTablePresent()
			.getCollectionsPartOfCount(this.courseCount,this.COURSE_COUNT_VALIDATION,this.COLUMN_COLLECTION_IT_IS_PART_OF)
			.navigateToPageByPath(this.PATH, CreateCollectionPage)
			.createCollection(collectionName, collectionDes, null)
			.ClickAddcontent()
			.Addcontent(courseToBeAdd)
			.clickReviewCollection()
			.clickAddContentToCollection()
			.waitForTime(10000)
			.navigateToPageByPath(this.ConPATH, ManageConfigurationPage)
			.waitForTablePresent()
			.check(ManageConfigurationAssertions)
			.assertThatPartOfCountPresent(this.COURSE_COUNT_VALIDATION,this.COLUMN_COLLECTION_IT_IS_PART_OF, this.courseCount.getValue())
			.endAssertion();
	}

	//@Test
	public verfiyBadgeRetiring(): void {

		this.getCsLoginPage(this.getConfig().getThinkContentURL())
    	.loginToThinkContent(this.getPlayThreeUser().email, this.getPlayOneUser().password)
		.navigateToPageByPath(this.ConPATH, ManageConfigurationPage)
		.waitForTablePresent()
		.clickCourse(this.COURSE_VIEW_RETIRE)
		.check(ManageConfigurationAssertions)
		.assertThatCourseTilePresent(this.COURSE_VIEW_RETIRE)
		.assertThatBadgeIsVisible(this.LABEL_RETIRING)
		.assertThatContentPartnerPresent(this.partnerName)
		.assertThatDurationPresent(this.duration)
		.endAssertion();

	}

	//@Test(description = "Verify DownLoad CSV Removed Content")
	public verifyDownloadCSVRemovedContent(): void {

		  this.getCsLoginPage(this.getConfig().getThinkContentURL())
	    	.loginToThinkContent(this.getPlayThreeUser().email, this.getPlayOneUser().password)
			.navigateToPageByPath(this.ConPATH, ManageConfigurationPage)
			.clickRemovedContentTab()
			.waitForTablePresent();
			//.clickDownloadCSV();
	}
}
