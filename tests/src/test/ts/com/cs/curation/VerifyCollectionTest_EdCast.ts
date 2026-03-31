// @ts-nocheck
import { Faker } from "com/github/javafaker/Faker";
import { BaseTest } from "common/BaseTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { ITestContext } from "common/testing/runtime";
import { CourseDetailsPage } from "cs/pages/CourseDetailsPage";
import { CreateCollectionPage } from "cs/pages/CreateCollectionPage";
import { SubscriptionPage } from "cs/pages/SubscriptionPage";
import { OpenCollection } from "cs/scenarios/OpenCollection";
import { ResultContainer } from "models/ResultContainer";
import { expect } from "common/testing/playwright";

export class VerifyCollectionTest_EdCast extends BaseTest {

	private readonly PATH: string[] = [ "Curation", "Explore collections" ];
	private readonly YOURCOLLECTION_PATH: string[] = [ "Curation", "Your collections" ];
	private readonly EXPLORESUBSCRIPTIONPATH: string[] = ["Subscriptions","Explore subscriptions"];
	private readonly YOURSUBSCRIPTIONPATH: string[] = ["Subscriptions","Your subscriptions"];
	private readonly SORING_BY_NEWEST: string = "By newest";
	private readonly SORING_BY_TOTAL_LEARNER: string = "By total learners";
	private readonly SORING_BY_YOUR_LEARNER: string = "By your learners";
	private readonly ALL_CONTENT: string = "All content";
	private readonly SUBSCRIBE_CONTENT: string = "Subscriptions only";
	private readonly LEARNING_CONTENT: string = "Learning platform only";
	data: Faker = new Faker();
	dfor: DateFormat = new SimpleDateFormat("ddMMyy_HHmmss");
	textCon: Array<string> = [];
	private duration: ResultContainer = new ResultContainer();
	private language: ResultContainer = new ResultContainer();
	private subscription: ResultContainer = new ResultContainer();
	private readonly CATEGORY_LANGUAGE_REGION: string = "Language Region";

	public verifyOrderCourseNotAvailable(testdata: ITestContext): void {

		let collectionName: string = testdata.getAttribute("collectionToValidate");
		System.out.println("verifyOrderCourseNotAvailable  : "+collectionName);

		  let __page1: any = this;
  __page1 = __page1.getCsLoginPage(this.getConfig().getEdCastURL());
  __page1 = __page1.navigateToLogin();
  __page1 = __page1.loginToApplication(this.getPlayEdCastUserTwo().email, this.getPlayEdCastUserTwo().password);
  __page1 = __page1.launchEdCastContentStudio();
  __page1 = __page1.navigateToPageByPath(this.YOURCOLLECTION_PATH, CreateCollectionPage);
  __page1 = __page1.run(new OpenCollection(collectionName));
  __page1 = __page1.waitForTime(3000);
  __page1 = __page1.clickManageContent();
  expect(__page1.contentSourceOption("Order Courses")).not.toBeVisible({ timeout: 60000 });
  __page1 = __page1.closeDialog();
  __page1 = __page1.logoutFromContentStudio(CreateCollectionPage);
	}

	public verifySortingOptionAndSubscriptionDetails(testdata: ITestContext): void {

		let courseToBeAdd: string[][] = [["Subscriptions only", "Python Programming" ]];
		let today: any = new Date();
		let collectionName: string = "Auto_" + this.data.name().firstName() + this.dfor.format(today);
		let collectionDes: string = "AutoDes_" + this.data.name().firstName() + this.dfor.format(today);
		testdata.setAttribute("collectionToValidate", collectionName);


		  let __page2: any = this;
  __page2 = __page2.getCsLoginPage(this.getConfig().getEdCastURL());
  __page2 = __page2.navigateToLogin();
  __page2 = __page2.loginToApplication(this.getPlayEdCastUserTwo().email, this.getPlayEdCastUserTwo().password);
  __page2 = __page2.launchEdCastContentStudio();
  __page2 = __page2.navigateToPageByPath(this.YOURSUBSCRIPTIONPATH, CreateCollectionPage);
  __page2 = __page2.waitForTime(5000);
  __page2 = __page2.getYourSubsciption(this.textCon);
  __page2 = __page2.navigateToPageByPath(this.PATH, CreateCollectionPage);
  __page2 = __page2.createCollection(collectionName, collectionDes, null);
  __page2 = __page2.ClickAddcontent();
  __page2 = __page2.clickfilterArrow("Subscriptions");
  __page2 = __page2.waitForTime(5000);
  __page2 = __page2.closeDialog();
  __page2 = __page2.clickClearAllFilters(CreateCollectionPage);
  __page2 = __page2.clickContentSourceDownArrow();
  __page2 = __page2.selectContentSource(this.SUBSCRIBE_CONTENT);
  __page2 = __page2.clickSortingDownArrow(CreateCollectionPage);
  expect(__page2.sortingOption(this.SORING_BY_NEWEST)).toBeVisible({ timeout: 60000 });
  expect(__page2.sortingOption(this.SORING_BY_TOTAL_LEARNER)).toBeVisible({ timeout: 60000 });
  expect(__page2.sortingOption(this.SORING_BY_YOUR_LEARNER)).toBeVisible({ timeout: 60000 });
  __page2 = __page2.closeDialog();
  __page2 = __page2.searchContent(courseToBeAdd[0][1]);
  __page2 = __page2.selectcourse(courseToBeAdd[0][1]);
  __page2 = __page2.clickQuickView(courseToBeAdd[0][1], CreateCollectionPage);
  __page2 = __page2.getQuickViewDuration(this.duration, CreateCollectionPage);
  __page2 = __page2.getQuickViewLanguage(this.language, CreateCollectionPage);
  __page2 = __page2.getQuickViewSubscription(this.subscription, CreateCollectionPage);
  __page2 = __page2.clickGoToDetails(CreateCollectionPage);
  expect(__page2.this.duration.getValue()(this.duration.getValue())).toBeVisible({ timeout: 30000 });
  expect(__page2.this.language.getValue()(this.language.getValue())).toBeVisible({ timeout: 30000 });
  let subscriptionlistArray: string[] = this.subscription.getValue().split(",");
  for (const subscription of subscriptionlistArray) {
  			if(subscription.equals("N/A")) {
  
  				expect(__page2.getPage().locator("//span[text()='SUBSCRIPTIONS']/following-sibling:: span[not(text()='')]")).not.toBeVisible();
  			}
  			else {
  				expect(__page2.subscriptions(subscription.trim())).toBeVisible({ timeout: 30000 });
  			}
  		}
  __page2 = __page2.goToLastPage();
  __page2 = __page2.closeQuickViewDialog(courseToBeAdd[0][1]);
  __page2 = __page2.selectcourse(courseToBeAdd[0][1]);
  __page2 = __page2.clickReviewCollection();
  __page2 = __page2.clickAddContentToCollection();
  __page2 = __page2.logoutFromContentStudio(SubscriptionPage);

	}

	public verifyProviderNameDurationLanguage(): void {

	let languageValue: Array<string> = [];
	let durationValue: Array<string> = [];
	let skill: any = new ResultContainer();
	let courseToBeAdd: string[][] = [["Subscriptions only", "Python Programming" ]];
	let today: any = new Date();
	let collectionName: string = "Auto_" + this.data.name().firstName() + this.dfor.format(today);
	let collectionDes: string = "AutoDes_" + this.data.name().firstName() + this.dfor.format(today);

	 let __page3: any = this;
 __page3 = __page3.getCsLoginPage(this.getConfig().getEdCastURL());
 __page3 = __page3.navigateToLogin();
 __page3 = __page3.loginToApplication(this.getPlayEdCastUserTwo().email, this.getPlayEdCastUserTwo().password);
 __page3 = __page3.launchEdCastContentStudio();
 __page3 = __page3.navigateToPageByPath(this.PATH, CreateCollectionPage);
 __page3 = __page3.createCollection(collectionName, collectionDes, null);
 __page3 = __page3.ClickAddcontent();
 __page3 = __page3.clickContentSourceDownArrow();
 __page3 = __page3.selectContentSource(this.LEARNING_CONTENT);
 __page3 = __page3.searchContent("I/T Architecture in Action");
 __page3 = __page3.waitForContentCardLoad();
 __page3 = __page3.getConentCardLanguageValue(languageValue);
 __page3 = __page3.getConentCardDurationValue(durationValue);
 const arr = languageValue.toArray();
 expect(__page3.contentCardlanguage).toContainText(arr);
 expect(__page3.contentCardDuration).toContainText(["0 minutes"]);
 __page3 = __page3.clickQuickView("I/T Architecture in Action", CreateCollectionPage);
 __page3 = __page3.getQuickViewSkill(skill, CreateCollectionPage);
 __page3 = __page3.closeQuickViewDialog("I/T Architecture in Action");
 __page3 = __page3.clickAllFilters(CreateCollectionPage);
 __page3 = __page3.expandCategory("Skills", CreateCollectionPage);
 expect(__page3.allfilterValue(skill.getValue())).toBeVisible({ timeout: 30000 });
 __page3 = __page3.clickCloseIcon(CreateCollectionPage);
 __page3 = __page3.logoutFromContentStudio(CreateCollectionPage);

	}

	public verifyDurationLanguageForSubscribedContent(): void {

	let languageValue: Array<string> = [];
	let durationValue: Array<string> = [];

	let qvSkill: any = new ResultContainer();
	let qvlanguage: any = new ResultContainer();
	let qvCategory: any = new ResultContainer();
	let qvTopic: any = new ResultContainer();
	let qvSubject: any = new ResultContainer();
	let qvProvider: any = new ResultContainer();

	let courseToBeAdd: string[][] = [["Subscriptions only", "Python Programming" ]];
	let today: any = new Date();
	let collectionName: string = "Auto_" + this.data.name().firstName() + this.dfor.format(today);
	let collectionDes: string = "AutoDes_" + this.data.name().firstName() + this.dfor.format(today);

	 let __page4: any = this;
 __page4 = __page4.getCsLoginPage(this.getConfig().getEdCastURL());
 __page4 = __page4.navigateToLogin();
 __page4 = __page4.loginToApplication(this.getPlayEdCastUserTwo().email, this.getPlayEdCastUserTwo().password);
 __page4 = __page4.launchEdCastContentStudio();
 __page4 = __page4.navigateToPageByPath(this.EXPLORESUBSCRIPTIONPATH, CreateCollectionPage);
 __page4 = __page4.waitForTime(5000);
 __page4 = __page4.navigateToPageByPath(this.PATH, CreateCollectionPage);
 __page4 = __page4.waitForTime(3000);
 __page4 = __page4.createCollection(collectionName, collectionDes, null);
 __page4 = __page4.ClickAddcontent();
 __page4 = __page4.clickClearAllFilters(CreateCollectionPage);
 __page4 = __page4.clickContentSourceDownArrow();
 __page4 = __page4.selectContentSource(this.SUBSCRIBE_CONTENT);
 __page4 = __page4.waitForContentCardLoad();
 __page4 = __page4.getConentCardLanguageValue(languageValue);
 __page4 = __page4.getConentCardDurationValue(durationValue);
 const arr = languageValue.toArray();
 expect(__page4.contentCardlanguage).toContainText(arr);
 expect(__page4.contentCardDuration).toContainText(["0 minutes"]);
 __page4 = __page4.searchContent("Why Should You Collaborate?");
 __page4 = __page4.selectcourse("Why Should You Collaborate?");
 __page4 = __page4.clickQuickView("Why Should You Collaborate?", CreateCollectionPage);
 __page4 = __page4.getQuickViewSkill(qvSkill, CreateCollectionPage);
 __page4 = __page4.getQuickViewLanguage(qvlanguage, CreateCollectionPage);
 __page4 = __page4.getQuickViewProvider(qvProvider, CreateCollectionPage);
 __page4 = __page4.getQuickViewCategory(qvCategory, CreateCollectionPage);
 __page4 = __page4.getQuickViewTopic(qvTopic, CreateCollectionPage);
 __page4 = __page4.getQuickViewSubject(qvSubject, CreateCollectionPage);
 __page4 = __page4.closeQuickViewDialog("Why Should You Collaborate?");
 __page4 = __page4.clickAllFilters(CreateCollectionPage);
 expect(__page4.downarrowByCategory(this.CATEGORY_LANGUAGE_REGION)).not.toBeVisible({ timeout: 30000 });
 __page4 = __page4.clickCloseIcon(CourseDetailsPage);
 __page4 = __page4.clickQuickView("Why Should You Collaborate?", CreateCollectionPage);
 __page4 = __page4.clickGoToDetails(CourseDetailsPage);
 expect(__page4.qvlanguage.getValue()(qvlanguage.getValue())).toBeVisible({ timeout: 30000 });
 expect(__page4.contentPartner(qvProvider.getValue())).toBeVisible({ timeout: 30000 });
 if(qvSkill.getValue().equals("N/A")){
 			expect(__page4.getPage().locator("//span[text()='SKILLS']/following-sibling::div/div")).not.toBeVisible({ timeout: 30000 });
 		}
 		else {
 			expect(__page4.getPage().locator("//span[text()='SKILLS']/following-sibling::div/div").first()).toHaveText(qvSkill.getValue());
 		}
 expect(__page4.verifydetails("CATEGORIES")).toHaveText(qvCategory.getValue());
 expect(__page4.verifydetails("TOPICS").first()).toHaveText(qvTopic.getValue());
 expect(__page4.verifydetails("SUBJECTS").first()).toHaveText(qvSubject.getValue());
 __page4 = __page4.goToLastPage();
 __page4 = __page4.clickCloseQuickViewDialog("Why Should You Collaborate?", CreateCollectionPage);
 __page4 = __page4.logoutFromContentStudio(SubscriptionPage);

	}

	public verifyPublishCollection(): void {

		let courseToBeAdd: string[][] = [ [ "Subscriptions only", "Identify Key Details of Change" ],
				[ "Learning platform only", "Learning Experience Platform | LXP - EdCast" ]];

		let collectionReviewer: string = "EDTRYTWOF EDTRYTWOL";

		let today: any = new Date();
		let collectionName: string = "Auto_" + this.data.name().firstName() + this.dfor.format(today);
		let collectionDes: string = "AutoDes_" + this.data.name().firstName() + this.dfor.format(today);

		  let __page5: any = this;
  __page5 = __page5.getCsLoginPage(this.getConfig().getEdCastURL());
  __page5 = __page5.navigateToLogin();
  __page5 = __page5.loginToApplication(this.getPlayEdCastUserTwo().email, this.getPlayEdCastUserTwo().password);
  __page5 = __page5.launchEdCastContentStudio();
  __page5 = __page5.navigateToPageByPath(this.YOURCOLLECTION_PATH, CreateCollectionPage);
  __page5 = __page5.createCollection(collectionName, collectionDes, null);
  __page5 = __page5.ClickAddcontent();
  __page5 = __page5.clickClearAllFilters(CreateCollectionPage);
  __page5 = __page5.Addcontent(courseToBeAdd);
  __page5 = __page5.clickReviewCollection();
  __page5 = __page5.clickAddContentToCollection();
  __page5 = __page5.clickSendCollectionForReview();
  __page5 = __page5.clickCollectionReviewDownArr();
  __page5 = __page5.inputReviewerName(collectionReviewer);
  __page5 = __page5.selectCollectionReviewer(collectionReviewer+" (You)");
  __page5 = __page5.clickSendReview();
  expect(__page5.validateReviewer(collectionReviewer)).toBeVisible({ timeout: 60000 });
  __page5 = __page5.clickPublish();
  __page5 = __page5.clickPublishnow();
  expect(__page5.selectReviewer("Collection successfully published!")).toBeVisible({ timeout: 60000 });
  expect(__page5.buttonText("Continue exploring")).toBeVisible({ timeout: 60000 });
  expect(__page5.buttonText("View in platform")).toBeVisible({ timeout: 60000 });
  __page5 = __page5.clickContinueExploring();
  expect(__page5.bannerPublishedAsMessage("Pathway","Cornerstone Learning Experience")).toBeVisible({ timeout: 30000 });
  expect(__page5.bannerPublisherName(collectionReviewer)).toBeVisible({ timeout: 30000 });
  __page5 = __page5.logoutFromContentStudio(CreateCollectionPage);

	}
}
