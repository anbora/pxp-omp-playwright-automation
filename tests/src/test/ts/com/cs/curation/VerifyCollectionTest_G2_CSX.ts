// @ts-nocheck
import { Faker } from "com/github/javafaker/Faker";
import { BaseTest } from "common/BaseTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { CreateCollectionPage } from "cs/pages/CreateCollectionPage";
import { ResultContainer } from "models/ResultContainer";
import { expect } from "common/testing/playwright";

export class VerifyCollectionTest_G2_CSX extends BaseTest {

	private readonly PATH: string[] = [ "Curation", "Explore collections" ];
	private readonly YOURCOLLECTION_PATH: string[] = [ "Curation", "Your collections" ];
	data: Faker = new Faker();
	dfor: DateFormat = new SimpleDateFormat("ddMMyy_HHmmss");
	private readonly LABEL_SUBSCRIBE: string = "Subscribed";
	private readonly LABEL_NEW: string = "New";
	private readonly LABEL_RETIRING: string = "Retiring";
	private readonly AI_SEARCH_KEYWORD: string = "Leadership";
	collectionName_AI: ResultContainer = new ResultContainer();
	private readonly searchAI: string[] = ["Leadership","Business","Time Management","People","Python","Java","Selenium"];

	// Fully implemented
	public verifyCollectionCreationUsingObjective(): void {
		let courseToBeAdd: string[][] = [ [ "All content", "Discovering Design Thinking" ]];
		let today: any = new Date();
		let collectionName: string = "Auto_" + this.data.name().firstName() + this.dfor.format(today);
		let collectionDes: string = "AutoDes_" + this.data.name().firstName() + this.dfor.format(today);

		this.getCsLoginPage(this.getConfig().getThinkContentURL())
		.loginToThinkContent(this.getPlayFourteenUser().email, this.getPlayFourteenUser().password)
		.navigateToPageByPath(this.PATH, CreateCollectionPage)
		.createCollection(collectionName, collectionDes, "suomi (Suomi)s")
		.ClickAddcontent()
		.clickObjectiveArrow()
		.selectObjeciveByName("Creative Problem Solving")
		.Addcontent(courseToBeAdd)
		.clickReviewCollection()
		.clickAddContentToCollection();
	}
	//@Test
	public verifyBadgeNew(): void {

		let courseToBeAdd: string[][] = [ [ "Subscriptions only", "Cyberbezpieczeństwo i nawyki w sieci" ]]; //\"Make decisions like a boss
		let today: any = new Date();
		let collectionName: string = "Auto_" + this.data.name().firstName() + this.dfor.format(today);
		let collectionDes: string = "AutoDes_" + this.data.name().firstName() + this.dfor.format(today);

		  let __page1: any = this;
  __page1 = __page1.getCsLoginPage(this.getConfig().getThinkContentURL());
  __page1 = __page1.loginToThinkContent(this.getPlayFourteenUser().email, this.getPlayFourteenUser().password);
  __page1 = __page1.navigateToPageByPath(this.PATH, CreateCollectionPage);
  __page1 = __page1.createCollection(collectionName, collectionDes, "suomi (Suomi)s");
  __page1 = __page1.ClickAddcontent();
  __page1 = __page1.clickClearAllFilters(CreateCollectionPage);
  __page1 = __page1.clickContentSourceDownArrow();
  __page1 = __page1.selectContentSource(courseToBeAdd[0][0]);
  __page1 = __page1.searchContent(courseToBeAdd[0][1]);
  expect(__page1.badge_check(this.LABEL_NEW).first()).toBeVisible({ timeout: 60000 });
  __page1 = __page1.selectcourse(courseToBeAdd[0][1]);
  __page1 = __page1.clickQuickView(courseToBeAdd[0][1], CreateCollectionPage);
  expect(__page1.qv_badge_check(this.LABEL_NEW)).toBeVisible({ timeout: 60000 });
  __page1 = __page1.clickGoToDetails(CreateCollectionPage);
  expect(__page1.badge_check(this.LABEL_NEW).first()).toBeVisible({ timeout: 60000 });
  __page1 = __page1.goToLastPage();
  __page1 = __page1.closeQuickViewDialog(courseToBeAdd[0][1]);
  __page1 = __page1.clickReviewCollection();
  __page1 = __page1.clickAddContentToCollection();
		//.logoutFromContentStudio(SubscriptionPage);
	}

	public verifyBadgeRetire(): void {

		let courseToBeAdd: string[][] = [ [ "Subscriptions only", "Project Management Professional 6 (2018)" ]];
		let today: any = new Date();
		let collectionName: string = "Auto_" + this.data.name().firstName() + this.dfor.format(today);
		let collectionDes: string = "AutoDes_" + this.data.name().firstName() + this.dfor.format(today);

		  let __page2: any = this;
  __page2 = __page2.getCsLoginPage(this.getConfig().getThinkContentURL());
  __page2 = __page2.loginToThinkContent(this.getPlayFourteenUser().email, this.getPlayFourteenUser().password);
  __page2 = __page2.navigateToPageByPath(this.PATH, CreateCollectionPage);
  __page2 = __page2.createCollection(collectionName, collectionDes, "suomi (Suomi)s");
  __page2 = __page2.ClickAddcontent();
  __page2 = __page2.clickContentSourceDownArrow();
  __page2 = __page2.selectContentSource(courseToBeAdd[0][0]);
  __page2 = __page2.searchContent(courseToBeAdd[0][1]);
  expect(__page2.badge_check(this.LABEL_RETIRING).first()).toBeVisible({ timeout: 60000 });
  __page2 = __page2.selectcourse(courseToBeAdd[0][1]);
  __page2 = __page2.clickQuickView(courseToBeAdd[0][1], CreateCollectionPage);
  expect(__page2.qv_badge_check(this.LABEL_RETIRING)).toBeVisible({ timeout: 60000 });
  __page2 = __page2.clickGoToDetails(CreateCollectionPage);
  expect(__page2.badge_check(this.LABEL_RETIRING).first()).toBeVisible({ timeout: 60000 });
  __page2 = __page2.goToLastPage();
  __page2 = __page2.closeQuickViewDialog(courseToBeAdd[0][1]);
  __page2 = __page2.clickReviewCollection();
  __page2 = __page2.clickAddContentToCollection();
		//.logoutFromContentStudio(SubscriptionPage);
	}

	//@Test
	public createCollectionUsingAI(): void {

		let indexToSelect: number = new Random().nextInt(5 - 1 + 1) + 1;

		  let __page3: any = this;
  __page3 = __page3.getCsLoginPage(this.getConfig().getThinkContentURL());
  __page3 = __page3.loginToThinkContent(this.getPlayFourteenUser().email, this.getPlayFourteenUser().password);
  __page3 = __page3.navigateToPageByPath(this.PATH, CreateCollectionPage);
  __page3 = __page3.clickNewCollectionButton();
  __page3 = __page3.clickCollectionNameAI();
  __page3 = __page3.fillSearchTextAI(this.AI_SEARCH_KEYWORD);
  __page3 = __page3.clickSearchArrowAI();
  __page3 = __page3.hoverandSelectFirst(this.collectionName_AI, true, String.valueOf(indexToSelect));
  __page3 = __page3.clickCollectionDesAI();
  __page3 = __page3.hoverandSelectFirst(this.collectionName_AI, false, String.valueOf(1));
  __page3 = __page3.submitCollection();
  expect(__page3.messageElement("Add content to your collection")).toBeVisible({ timeout: 60000 });
  expect(__page3.buttonAddContent_AI).toBeVisible({ timeout: 60000 });
  __page3 = __page3.navigateToPageByPath(this.PATH, CreateCollectionPage);
  __page3 = __page3.fillCollectionSearch(this.collectionName_AI.getValue());
  expect(__page3.locatePTagByText(this.collectionName_AI.getValue())).toBeVisible({ timeout: 60000 });
	}

	public verifylanguage(): void {
		let courseToBeAdd: string[][] = [ [ "Subscriptions only", "Project Management Professional 6 (2018)" ]];
		let today: any = new Date();
		let collectionName: string = "Auto_" + this.data.name().firstName() + this.dfor.format(today);
		let collectionDes: string = "AutoDes_" + this.data.name().firstName() + this.dfor.format(today);

		  let __page4: any = this;
  __page4 = __page4.getCsLoginPage(this.getConfig().getThinkContentURL());
  __page4 = __page4.loginToThinkContent(this.getPlayFourteenUser().email, this.getPlayFourteenUser().password);
  __page4 = __page4.navigateToPageByPath(this.PATH, CreateCollectionPage);
  __page4 = __page4.createCollection(collectionName, collectionDes, "suomi (Suomi)s");
  __page4 = __page4.ClickAddcontent();
  __page4 = __page4.clickContentSourceDownArrow();
  __page4 = __page4.selectContentSource(courseToBeAdd[0][0]);
  __page4 = __page4.searchContent(courseToBeAdd[0][1]);
  expect(__page4.badge_check("English").first()).toBeVisible({ timeout: 60000 });
  __page4 = __page4.clickQuickView(courseToBeAdd[0][1], CreateCollectionPage);
  expect(__page4.badge_check("English").first()).toBeVisible({ timeout: 60000 });
	}

}
