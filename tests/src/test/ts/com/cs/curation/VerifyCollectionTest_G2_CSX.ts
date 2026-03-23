import { Faker } from "com/github/javafaker/Faker";
import { BaseTest } from "common/BaseTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { CreateCollectionAssertions } from "cs/assertions/CreateCollectionAssertions";
import { CreateCollectionPage } from "cs/pages/CreateCollectionPage";
import { ResultContainer } from "models/ResultContainer";

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

		this.getCsLoginPage(this.getConfig().getThinkContentURL())
		.loginToThinkContent(this.getPlayFourteenUser().email, this.getPlayFourteenUser().password)
		.navigateToPageByPath(this.PATH, CreateCollectionPage)
		.createCollection(collectionName, collectionDes, "suomi (Suomi)s")
		.ClickAddcontent()
		.clickClearAllFilters(CreateCollectionPage)
		.clickContentSourceDownArrow()
		.selectContentSource(courseToBeAdd[0][0])
		.searchContent(courseToBeAdd[0][1])
		.check(CreateCollectionAssertions)
		.assertThatBadgeIsVisible(this.LABEL_NEW)
		.endAssertion()
		.selectcourse(courseToBeAdd[0][1])
		.clickQuickView(courseToBeAdd[0][1], CreateCollectionPage)
		.check(CreateCollectionAssertions)
		.assertThatQVBadgeIsVisible(this.LABEL_NEW)
		.endAssertion()
		.clickGoToDetails(CreateCollectionPage)
		.check(CreateCollectionAssertions)
		.assertThatBadgeIsVisible(this.LABEL_NEW)
		.endAssertion()
		.goToLastPage()
		.closeQuickViewDialog(courseToBeAdd[0][1])
		.clickReviewCollection()
		.clickAddContentToCollection();
		//.logoutFromContentStudio(SubscriptionPage);
	}

	public verifyBadgeRetire(): void {

		let courseToBeAdd: string[][] = [ [ "Subscriptions only", "Project Management Professional 6 (2018)" ]];
		let today: any = new Date();
		let collectionName: string = "Auto_" + this.data.name().firstName() + this.dfor.format(today);
		let collectionDes: string = "AutoDes_" + this.data.name().firstName() + this.dfor.format(today);

		this.getCsLoginPage(this.getConfig().getThinkContentURL())
		.loginToThinkContent(this.getPlayFourteenUser().email, this.getPlayFourteenUser().password)
		.navigateToPageByPath(this.PATH, CreateCollectionPage)
		.createCollection(collectionName, collectionDes, "suomi (Suomi)s")
		.ClickAddcontent()
		.clickContentSourceDownArrow()
		.selectContentSource(courseToBeAdd[0][0])
		.searchContent(courseToBeAdd[0][1])
		.check(CreateCollectionAssertions)
		.assertThatBadgeIsVisible(this.LABEL_RETIRING)
		.endAssertion()
		.selectcourse(courseToBeAdd[0][1])
		.clickQuickView(courseToBeAdd[0][1], CreateCollectionPage)
		.check(CreateCollectionAssertions)
		.assertThatQVBadgeIsVisible(this.LABEL_RETIRING)
		.endAssertion()
		.clickGoToDetails(CreateCollectionPage)
		.check(CreateCollectionAssertions)
		.assertThatBadgeIsVisible(this.LABEL_RETIRING)
		.endAssertion()
		.goToLastPage()
		.closeQuickViewDialog(courseToBeAdd[0][1])
		.clickReviewCollection()
		.clickAddContentToCollection();
		//.logoutFromContentStudio(SubscriptionPage);
	}

	//@Test
	public createCollectionUsingAI(): void {

		let indexToSelect: number = new Random().nextInt(5 - 1 + 1) + 1;

		this.getCsLoginPage(this.getConfig().getThinkContentURL())
		.loginToThinkContent(this.getPlayFourteenUser().email, this.getPlayFourteenUser().password)
		.navigateToPageByPath(this.PATH, CreateCollectionPage)
		.clickNewCollectionButton()
		.clickCollectionNameAI()
		.fillSearchTextAI(this.AI_SEARCH_KEYWORD)
		.clickSearchArrowAI()
		.hoverandSelectFirst(this.collectionName_AI,true,String.valueOf(indexToSelect))
		.clickCollectionDesAI()
		.hoverandSelectFirst(this.collectionName_AI,false,String.valueOf(1))
		.submitCollection()
		.check(CreateCollectionAssertions)
		.assertThatMessageIsVisible("Add content to your collection")
		.assertThatADDContentAIIsVisible()
		.endAssertion()
		.navigateToPageByPath(this.PATH, CreateCollectionPage)
		.fillCollectionSearch(this.collectionName_AI.getValue())
		.check(CreateCollectionAssertions)
		.assertThatCollectionIsVisible(this.collectionName_AI.getValue())
		.endAssertion();
	}

	public verifylanguage(): void {
		let courseToBeAdd: string[][] = [ [ "Subscriptions only", "Project Management Professional 6 (2018)" ]];
		let today: any = new Date();
		let collectionName: string = "Auto_" + this.data.name().firstName() + this.dfor.format(today);
		let collectionDes: string = "AutoDes_" + this.data.name().firstName() + this.dfor.format(today);

		this.getCsLoginPage(this.getConfig().getThinkContentURL())
		.loginToThinkContent(this.getPlayFourteenUser().email, this.getPlayFourteenUser().password)
		.navigateToPageByPath(this.PATH, CreateCollectionPage)
		.createCollection(collectionName, collectionDes, "suomi (Suomi)s")
		.ClickAddcontent()
		.clickContentSourceDownArrow()
		.selectContentSource(courseToBeAdd[0][0])
		.searchContent(courseToBeAdd[0][1])
		.check(CreateCollectionAssertions)
		.assertThatBadgeIsVisible("English")
		.endAssertion()
		.clickQuickView(courseToBeAdd[0][1], CreateCollectionPage)
		.check(CreateCollectionAssertions)
		.assertThatBadgeIsVisible("English")
		.endAssertion();
	}

}
