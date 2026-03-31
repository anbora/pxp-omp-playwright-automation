// @ts-nocheck
import { Faker } from "com/github/javafaker/Faker";
import { BaseTest } from "common/BaseTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { CreateCollectionPage } from "cs/pages/CreateCollectionPage";
import { ResultContainer } from "models/ResultContainer";
import { expect } from "common/testing/playwright";

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

		  let __page1: any = this;
  __page1 = __page1.getCsLoginPage(this.getConfig().getThinkContentURL());
  __page1 = __page1.loginToThinkContent(this.getPlayTwoUser().email, this.getPlayOneUser().password);
  __page1 = __page1.navigateToPageByPath(this.YOURCOLLECTION_PATH, CreateCollectionPage);
  __page1 = __page1.waitForContentCardLoad();
  __page1 = __page1.scrolltoBottom("700", CreateCollectionPage);
  expect(__page1.loc_DIV_ByText(headername)).toBeVisible({ timeout: 60000 });
  __page1 = __page1.scrolltoBottom("Downmost", CreateCollectionPage);
  expect(__page1.loc_DIV_ByText(headername)).toBeVisible({ timeout: 60000 });
	}

	//@Test
	public verifyHeaderStickyExploreCollection(): void {
		let headername: string = "Explore collections";

		  let __page2: any = this;
  __page2 = __page2.getCsLoginPage(this.getConfig().getThinkContentURL());
  __page2 = __page2.loginToThinkContent(this.getPlayTwoUser().email, this.getPlayOneUser().password);
  __page2 = __page2.navigateToPageByPath(this.PATH, CreateCollectionPage);
  __page2 = __page2.waitForContentCardLoad();
  __page2 = __page2.scrolltoBottom("700", CreateCollectionPage);
  expect(__page2.loc_DIV_ByText(headername)).toBeVisible({ timeout: 60000 });
  __page2 = __page2.scrolltoBottom("Downmost", CreateCollectionPage);
  expect(__page2.loc_DIV_ByText(headername)).toBeVisible({ timeout: 60000 });
	}
}
