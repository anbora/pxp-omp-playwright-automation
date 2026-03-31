// @ts-nocheck
import { Faker } from "com/github/javafaker/Faker";
import { BaseTest } from "common/BaseTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { ContentStudioPopup } from "cs/pages/ContentStudioPopup";
import { CreateCollectionPage } from "cs/pages/CreateCollectionPage";
import { ManageConfigurationPage } from "cs/pages/ManageConfigurationPage";
import { ResultContainer } from "models/ResultContainer";
import { expect } from "common/testing/playwright";

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

		      let __page1: any = this;
    __page1 = __page1.getCsLoginPage(this.getConfig().getThinkContentURL());
    __page1 = __page1.loginToThinkContent(this.getPlayThreeUser().email, this.getPlayOneUser().password);
    __page1 = __page1.navigateToPageByPath(this.PATH, ContentStudioPopup);
    __page1 = __page1.navigateToPageByPath(this.ConPATH, ManageConfigurationPage);
    expect(__page1.buttonUsingText("Upcoming removals")).toBeVisible({ timeout: 60000 });
    expect(__page1.buttonUsingText("Removed content")).toBeVisible({ timeout: 60000 });
    expect(__page1.tableHeaders).toContainText(["Content title", "Provider", "Collections it is part of", "Total learners last quarter", "Total learners all time", "Date of removal", "Replacement suggestion"]);
	 }

	//Fully done
	public verifyRemovedContentTab(): void {

		let headerName: string = "Manage content refresh";
		  let __page2: any = this;
  __page2 = __page2.getCsLoginPage(this.getConfig().getThinkContentURL());
  __page2 = __page2.loginToThinkContent(this.getPlayThreeUser().email, this.getPlayOneUser().password);
  __page2 = __page2.navigateToPageByPath(this.PATH, ContentStudioPopup);
  __page2 = __page2.navigateToPageByPath(this.ConPATH, ManageConfigurationPage);
  __page2 = __page2.clickRemovedContentTab();
  expect(__page2.tableHeaders).toContainText(["Content title","Provider","Total learners last quarter","Total learners all time","Date of removal"]);
  __page2 = __page2.waitForTablePresent();
  __page2 = __page2.scrolltoBottom("1500", ManageConfigurationPage);
  expect(__page2.loc_DIV_ByText(headerName)).toBeVisible({ timeout: 60000 });
  __page2 = __page2.scrolltoBottom("Downmost", ManageConfigurationPage);
  expect(__page2.loc_DIV_ByText(headerName)).toBeVisible({ timeout: 60000 });

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
		      let __page3: any = this;
    __page3 = __page3.getCsLoginPage(this.getConfig().getThinkContentURL());
    __page3 = __page3.loginToThinkContent(this.getPlayThreeUser().email, this.getPlayOneUser().password);
    __page3 = __page3.navigateToPageByPath(this.ConPATH, ManageConfigurationPage);
    __page3 = __page3.waitForTablePresent();
    __page3 = __page3.clickCourseReviewButton(this.COURSE_VIEW);
    expect(__page3.buttonUsingText("View Course")).toBeVisible({ timeout: 60000 });
    __page3 = __page3.closeReviewDialog();
	}

	//@Test(description = "Verify that curator user is able to View course from Review action : C28933094,C28933095")
	//Added Above
	public verifyViewCourseFromReviewAction(): void {
		      let __page4: any = this;
    __page4 = __page4.getCsLoginPage(this.getConfig().getThinkContentURL());
    __page4 = __page4.loginToThinkContent(this.getPlayThreeUser().email, this.getPlayOneUser().password);
    __page4 = __page4.navigateToPageByPath(this.ConPATH, ManageConfigurationPage);
    __page4 = __page4.waitForTablePresent();
    __page4 = __page4.clickCourseReviewButton(this.COURSE_VIEW);
    __page4 = __page4.geReplacementCourseName(this.replacementCourseName);
    __page4 = __page4.clickViewCourseButton();
    expect(__page4.courseTitleCourseDetailsPage(this.replacementCourseName.getValue())).toBeVisible({ timeout: 60000 });
	}

	//@Test(description = "Count of Collection it is part of column gets increased : C28940587")
	public verifyCountIncrease(): void {

		let courseToBeAdd: string[][] = [ [ "Subscriptions only", this.COURSE_COUNT_VALIDATION ]];
		let today: any = new Date();
		let collectionName: string = "Auto_" + this.data.name().firstName() + this.dfor.format(today);
		let collectionDes: string = "AutoDes_" + this.data.name().firstName() + this.dfor.format(today);


		  let __page5: any = this;
  __page5 = __page5.getCsLoginPage(this.getConfig().getThinkContentURL());
  __page5 = __page5.loginToThinkContent(this.getPlayThreeUser().email, this.getPlayOneUser().password);
  __page5 = __page5.navigateToPageByPath(this.ConPATH, ManageConfigurationPage);
  __page5 = __page5.waitForTablePresent();
  __page5 = __page5.getCollectionsPartOfCount(this.courseCount, this.COURSE_COUNT_VALIDATION, this.COLUMN_COLLECTION_IT_IS_PART_OF);
  __page5 = __page5.navigateToPageByPath(this.PATH, CreateCollectionPage);
  __page5 = __page5.createCollection(collectionName, collectionDes, null);
  __page5 = __page5.ClickAddcontent();
  __page5 = __page5.Addcontent(courseToBeAdd);
  __page5 = __page5.clickReviewCollection();
  __page5 = __page5.clickAddContentToCollection();
  __page5 = __page5.waitForTime(10000);
  __page5 = __page5.navigateToPageByPath(this.ConPATH, ManageConfigurationPage);
  __page5 = __page5.waitForTablePresent();
  let newcount: number = Integer.parseInt(this.courseCount.getValue())+1;
  expect(__page5.tableData(this.COURSE_COUNT_VALIDATION, this.COLUMN_COLLECTION_IT_IS_PART_OF)).toHaveText(String.valueOf(newcount));
	}

	//@Test
	public verfiyBadgeRetiring(): void {

		  let __page6: any = this;
  __page6 = __page6.getCsLoginPage(this.getConfig().getThinkContentURL());
  __page6 = __page6.loginToThinkContent(this.getPlayThreeUser().email, this.getPlayOneUser().password);
  __page6 = __page6.navigateToPageByPath(this.ConPATH, ManageConfigurationPage);
  __page6 = __page6.waitForTablePresent();
  __page6 = __page6.clickCourse(this.COURSE_VIEW_RETIRE);
  expect(__page6.courseTitleCourseDetailsPage(this.COURSE_VIEW_RETIRE)).toBeVisible({ timeout: 60000 });
  expect(__page6.badge_check(this.LABEL_RETIRING)).toBeVisible({ timeout: 60000 });
  expect(__page6.courseDetailsPage_contentPartner(this.partnerName)).toBeVisible({ timeout: 60000 });
  expect(__page6.CourseDetailsPage_Duration(this.duration)).toBeVisible({ timeout: 60000 });

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
