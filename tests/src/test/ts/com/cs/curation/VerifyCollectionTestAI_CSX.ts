import { Faker } from "com/github/javafaker/Faker";
import { BaseTest } from "common/BaseTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { CreateCollectionAssertions } from "cs/assertions/CreateCollectionAssertions";
import { CreateCollectionPage } from "cs/pages/CreateCollectionPage";
import { OpenCollection } from "cs/scenarios/OpenCollection";
import { ResultContainer } from "models/ResultContainer";

export class VerifyCollectionTestAI_CSX extends BaseTest {

	private readonly PATH: string[] = [ "Curation", "Explore collections" ];
	private readonly YOURCOLLECTION_PATH: string[] = [ "Curation", "Your collections" ];
	data: Faker = new Faker();
	dfor: DateFormat = new SimpleDateFormat("ddMMyy_HHmmss");
	private readonly LABEL_SUBSCRIBE: string = "Subscribed";
	private readonly LABEL_NEW: string = "New";
	private readonly LABEL_RETIRING: string = "Retiring";
	private readonly AI_SEARCH_KEYWORD: string = "Leadership";
	collectionName_AI: ResultContainer = new ResultContainer();
	private searchAI: string[] = ["Leadership","Business","Time Management","People","Python","Java","Selenium","Test",
			"Game","Honey","Technology","Test Automation","Windows","Tasty","Mouse"];

	public createCollectionUsingAI(): void {

		let indexToSelect: number = new Random().nextInt(5 - 1 + 1) + 1;
		let AISearchIndex: number = new Random().nextInt(15 - 1 + 1) + 1;

		this.getCsLoginPage(this.getConfig().getThinkContentURL())
		.loginToThinkContent(this.getPlayFifteenUser().email, this.getPlayFifteenUser().password)
		.navigateToPageByPath(this.PATH, CreateCollectionPage)
		.clickNewCollectionButton()
		.clickCollectionNameAI()
		.fillSearchTextAI(this.searchAI[AISearchIndex])
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

	// Fully implemented
	public manageContentDelete(): void {

		let courseToBeAdd: string[][] = [ [ "Subscriptions only", "Architecting Scalable Python Applications" ],
				[ "Subscriptions only", "20 Questions To Help You Start a Business" ],
				[ "Learning platform only", "Microsoft Office 2016 Excel Basic" ] ];

		let today: any = new Date();
		let collectionName: string = "Auto_" + this.data.name().firstName() + this.dfor.format(today);
		let collectionDes: string = "AutoDes_" + this.data.name().firstName() + this.dfor.format(today);

		this.getCsLoginPage(this.getConfig().getThinkContentURL())
		.loginToThinkContent(this.getPlayFifteenUser().email, this.getPlayFifteenUser().password)
		.navigateToPageByPath(this.PATH, CreateCollectionPage)
		.createCollection(collectionName, collectionDes, "suomi (Suomi)s")
		.ClickAddcontent()
		.Addcontent(courseToBeAdd)
		.clickReviewCollection()
		.clickAddContentToCollection()
		.navigateToPageByPath(this.YOURCOLLECTION_PATH, CreateCollectionPage)
		.waitForContentCardLoad()
		.run(new OpenCollection(collectionName))
		.clickManageContent()
		.clickMangeOption("Delete Courses")
		.selectcourse(courseToBeAdd[2][1])
		.clickDeleteSelected()
		.clickYes()
		.check(CreateCollectionAssertions)
		.assertThatMessageIsNotVisible(collectionDes)
		.endAssertion();
	}

	// Fully implemented
	public exportCollectionAndvalidateCSV(): void {
		let today: any = new Date();
		let collectionName: string = "Auto_" + this.data.name().firstName() + this.dfor.format(today);
		let collectionDes: string = "AutoDes_" + this.data.name().firstName() + this.dfor.format(today);

		this.getCsLoginPage(this.getConfig().getThinkContentURL())
		.loginToThinkContent(this.getPlayFifteenUser().email, this.getPlayFifteenUser().password)
		.navigateToPageByPath(this.PATH, CreateCollectionPage)
		.createCollection(collectionName, collectionDes, null)
		.check(CreateCollectionAssertions)
		.assertThatMessageIsVisible("Add content to your collection")
		.endAssertion()
		.clickCollectionOptionVerticalDot()
		.clickCollectionOption("Export collection as CSV");
		// Add CSV validation

	}



}
