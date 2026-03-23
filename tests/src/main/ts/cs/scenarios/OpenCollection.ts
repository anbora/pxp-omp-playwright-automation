import { BaseScenario } from "common/BaseScenario";
import { CreateCollectionPage } from "cs/pages/CreateCollectionPage";

export class OpenCollection implements BaseScenario<CreateCollectionPage, CreateCollectionPage>{

	private collectionName: string;

	public run(entry: CreateCollectionPage): CreateCollectionPage {
		return entry
				.fillCollectionSearch(collectionName)
			 	.pressKey("Enter")
			 	.openCollection(collectionName);
	}
}
