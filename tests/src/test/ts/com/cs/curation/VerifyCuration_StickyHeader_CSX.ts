import { Faker } from "com/github/javafaker/Faker";
import { BaseTest } from "common/BaseTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { CreateCollectionAssertions } from "cs/assertions/CreateCollectionAssertions";
import { CreateCollectionPage } from "cs/pages/CreateCollectionPage";
import { ResultContainer } from "models/ResultContainer";

export class VerifyCuration_StickyHeader_CSX extends BaseTest {

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


	//@Test
	public verifyHeaderSticky(): void {
		let headername: string = "Your collections";

		this.getCsLoginPage(this.getConfig().getThinkContentURL())
		.loginToThinkContent(this.getPlayTwoUser().email, this.getPlayOneUser().password)
		.navigateToPageByPath(this.YOURCOLLECTION_PATH, CreateCollectionPage)
		.waitForContentCardLoad()
		.scrolltoBottom("700",CreateCollectionPage)
		.check(CreateCollectionAssertions)
		.assertThatHeaderYourCollectionVisible(headername)
		.endAssertion()
		.scrolltoBottom("Downmost",CreateCollectionPage)
		.check(CreateCollectionAssertions)
		.assertThatHeaderYourCollectionVisible(headername)
		.endAssertion();
	}

	//@Test
	public verifyHeaderStickyExploreCollection(): void {
		let headername: string = "Explore collections";

		this.getCsLoginPage(this.getConfig().getThinkContentURL())
		.loginToThinkContent(this.getPlayTwoUser().email, this.getPlayOneUser().password)
		.navigateToPageByPath(this.PATH, CreateCollectionPage)
		.waitForContentCardLoad()
		.scrolltoBottom("700",CreateCollectionPage)
		.check(CreateCollectionAssertions)
		.assertThatHeaderYourCollectionVisible(headername)
		.endAssertion()
		.scrolltoBottom("Downmost",CreateCollectionPage)
		.check(CreateCollectionAssertions)
		.assertThatHeaderYourCollectionVisible(headername)
		.endAssertion();
	}
}
