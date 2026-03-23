import { BaseTest } from "common/BaseTest";
import { CreateCollectionPage } from "cs/pages/CreateCollectionPage";
import { ManageObjectivesPage } from "cs/pages/ManageObjectivesPage";

export class DeleteCollection extends BaseTest{
	private readonly YOURCOLLECTION_PATH: string[] = [ "Curation", "Your collections" ];
	private readonly MANAGEOBJECTIVEPATH: string[] = ["Configuration", "Manage Objectives"];

	public deletecollections(): void {

		this.getCsLoginPage(this.getConfig().getThinkContentURL())
		.loginToThinkContent(this.getPlayTwoUser().email, this.getPlayOneUser().password)
		.navigateToPageByPath(this.YOURCOLLECTION_PATH, CreateCollectionPage)
		.waitForContentCardLoad()
		.clickCollection()
		.clickCollectionOptionVerticalDot()
		.clickCollectionOption("Delete collection")
		.clickYes()
		.deleteCollection(this.YOURCOLLECTION_PATH);
	}

	public deleteObjective(): void {

		this.getCsLoginPage(this.getConfig().getThinkContentURL())
		.loginToThinkContent(this.getPlayTwoUser().email, this.getPlayOneUser().password)
		.navigateToPageByPath(this.MANAGEOBJECTIVEPATH, ManageObjectivesPage)
		.clickObjectiveDelete()
		.clickDeleteObjectiveYes()
		.DeleteMultipleObjective();

	}
}
