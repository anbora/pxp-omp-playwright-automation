import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator, MouseButton, Page } from "common/testing/playwright";
import { GlobalNavigationPage } from "cs/pages/GlobalNavigationPage";

export class ManageObjectivesPage extends GlobalNavigationPage {

	public locUsingButtonText(buttonText: string): Locator {

	  return this.getLocatorWithParam("//button[text()='%s']", buttonText);

	}
	public objectivePresent(ObjectiveName: string): Locator {
	  return this.getLocatorWithParam("//tbody//td/span[text()='%s']", ObjectiveName);
	}
	public ObjectiveView(ObjectiveName: string): Locator {
	  return this.getLocatorWithParam("(//span[text()='%s']/ancestor::tr//div/*)[1]", ObjectiveName);
	}
	public ObjectiveEdit(ObjectiveName: string): Locator {
	  return this.getLocatorWithParam("(//span[text()='%s']/ancestor::tr//div/*)[3]", ObjectiveName);
	}
	public ObjectiveDelete(ObjectiveName: string): Locator {
	  return this.getLocatorWithParam("(//span[text()='%s']/ancestor::tr//div/*)[4]", ObjectiveName);
	}
	public objectiveTableHeader: Locator = this.page.locator("table[aria-label='basic table']>thead>tr>th>div");
	public ObjectiveTitle: Locator = this.page.locator("input#title");
	public ObjectiveDescription: Locator = this.page.locator("textarea#description");
	public ObjectiveLanguageDownArrow: Locator = this.page.locator("input[placeholder='Select a language']+svg");
	public ObjectiveLanguage(language: string): Locator {
	  return this.getLocatorWithParam("//span[text()='%s']", language);
	}
	public ObjectiveSearchBox: Locator = this.page.locator("input#search-box");
	public ObjectiveSearchIcon: Locator = this.page.locator("input#search-box+svg");
	public addSkill: Locator = this.page.getByPlaceholder("Type a new skill to add");
	public objTitleViewPopup(title: string): Locator {
	  return this.getLocatorWithParam("//div[text()='%s']", title);
	}
	public objDescriptionViewPopup(description: string): Locator {
	  return this.getLocatorWithParam("//p[text()='%s']", description);
	}
	public objSkillViewPopup(skill: string): Locator {
	  return this.getLocatorWithParam("//span[text()='%s']|//span[contains(text(),'%s')]", skill,skill);
	}
	public clearskill: Locator = this.page.locator("button[title='Clear']");
	public closeViewObjective: Locator = this.page.locator("button[aria-label='close']>svg>g");
	public objTitle_languageIcon: Locator = this.page.locator("//input[@id='title']/ancestor:: div[@class='relative']//*[@data-testid='LanguageOutlinedIcon']");
	public objDescription_languageIcon: Locator = this.page.locator("//textarea[@id='description']/ancestor:: div[@class='relative']//*[@data-testid='LanguageOutlinedIcon']");
	public objAddAnotherIcon: Locator = this.page.locator("//p//*[@data-testid='AddCircleOutlineOutlinedIcon']");
	public ObjGlobeLanguageTextArea(language: string): Locator {
	  return this.getLocatorWithParam("//span[text()='%s']/ancestor:: label/parent:: div//textarea", language);
	}
	public objTranslateSave: Locator = this.page.locator("//p[text()='Translate']/following-sibling:: form//button[@type='submit']");
	public deleteObjectiveButton: Locator = this.page.locator("tbody>tr>td svg:nth-child(3)");
	public needInspirations: Locator = this.page.locator("//div[@id='panel1d-header' and @aria-expanded='false']");
	public needInspirations_Text: Locator = this.page.locator("//div[@id='panel1d-header']//span[text()='Need Inspiration?']/following-sibling::span[text()='Choose from a list of most commonly utilized objectives to get started']");
	public needInspirations_Obj_Eye(objectiveName: string): Locator {
	  return this.getLocatorWithParam("//span[text()='%s']/following-sibling::div//*[name()='svg' and not(@data-testid)]", objectiveName);
	}
	public needInspirations_Obj_Add(objectiveName: string): Locator {
	  return this.getLocatorWithParam("//span[text()='%s']/following-sibling::div//span[text()='Add']", objectiveName);
	}
	public ObjSuccessMessage(objName: string): Locator {
	  return this.getLocatorWithParam("//div[contains(text(),'Added successfully')]", objName);
	}

	constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {
		super(this.browser, this.pageHandler, this.logger, this.portalIndex);
		// TODO Auto-generated constructor stub
	}

	public clickNewObjectiveButton(): ManageObjectivesPage {
		this.locUsingButtonText("New objective").first().click();
		return this;
	}

	public fillObjectiveTitle(objTitle: string): ManageObjectivesPage {
		ObjectiveTitle.fill(objTitle);
		return this;
	}
	public changeWindowSize(): ManageObjectivesPage {
		this.page.setViewportSize(1366, 1000);
		return this;
	}

	public fillObjectiveDescription(objDescription: string): ManageObjectivesPage {
		ObjectiveDescription.fill(objDescription);;
		return this;
	}

	public clickObjectiveLanguageDownArrow(): ManageObjectivesPage {
		ObjectiveLanguageDownArrow.click();
		return this;
	}

	public selectObjectiveLanguage(language: string): ManageObjectivesPage {
		this.ObjectiveLanguage(language).click();
		return this;
	}

	public fillObjectiveSearchBox(objective: string): ManageObjectivesPage {
		ObjectiveSearchBox.fill(objective);
		return this;
	}

	public clickSearchObjective(): ManageObjectivesPage {
		ObjectiveSearchIcon.click();
		return this;
	}

	public clickContinue(): ManageObjectivesPage {
		this.locUsingButtonText("Continue").click();
		this.pause(3000);
		return this;
	}

	public clickSave(): ManageObjectivesPage {
		this.page.locator("css=button[type='submit']").scrollIntoViewIfNeeded();
		this.page.locator("css=button[type='submit']").hover();
		this.page.locator("css=button[type='submit']").click();
		this.pause(2000);
		return this;
	}

	public clickObjectiveView(ObjectiveName: string): ManageObjectivesPage {
		this.ObjectiveView(ObjectiveName).click();
		return this;
	}

	public clickObjectiveEdit(ObjectiveName: string): ManageObjectivesPage {
		this.ObjectiveEdit(ObjectiveName).click();
		return this;
	}

	public clickObjectiveDelete(ObjectiveName: string): ManageObjectivesPage {
		this.ObjectiveDelete(ObjectiveName).click();
		return this;
	}

	public clickBack(): ManageObjectivesPage {
		this.locUsingButtonText("Back").scrollIntoViewIfNeeded();
		this.locUsingButtonText("Back").hover();
		this.pause(1000);
		this.locUsingButtonText("Back").click();;
		return this;
	}

	public addSkill(SkillName: string): ManageObjectivesPage {

		addSkill.fill(SkillName);
		this.pause(5000);
		this.page.keyboard().press("ArrowUp");
		this.pause(1000);
		this.page.keyboard().press("Enter");
		this.pause(1000);
		clearskill.click();
		this.pause(1000);
		return this;
	}

	public clickDeleteObjectiveYes(): ManageObjectivesPage {
		this.locUsingButtonText("Yes, delete").click();;
		return this;
	}

	public clickDeleteObjectiveNo(): ManageObjectivesPage {
		this.locUsingButtonText("No, cancel").click();;
		return this;
	}

	public clickCloseViewObjective(): ManageObjectivesPage {
		this.pause(1000);
		closeViewObjective.first().click();
		return this;
	}

	public clickTitleLanguageIcon(): ManageObjectivesPage {
		objTitle_languageIcon.click();
		return this;
	}

	public clickDescriptionLanguageIcon(): ManageObjectivesPage {
		objDescription_languageIcon.click();
		return this;
	}

	public clickAddAnotherLanguage(): ManageObjectivesPage {
		objAddAnotherIcon.click();
		return this;
	}

	public selectGlobalLanguage(language: string): ManageObjectivesPage {
		this.objSkillViewPopup(language).click();
		return this;
	}

	public fillLanguageName(language: string): ManageObjectivesPage {
		this.ObjGlobeLanguageTextArea(language).click();
		this.ObjGlobeLanguageTextArea(language).fill(language+"Added Lan");
		return this;
	}

	public clickTranslateSave(): ManageObjectivesPage {
		objTranslateSave.click();
		this.pause(2000);
		return this;
	}

	public clickObjectiveDelete(): ManageObjectivesPage {
		deleteObjectiveButton.first().click();
		this.pause(2000);
		return this;
	}

	public DeleteMultipleObjective(): ManageObjectivesPage {
		for(int i=0;i<5;i++) {
			this.clickObjectiveDelete();
			this.clickDeleteObjectiveYes();
			this.pause(5000);
			System.out.println("Removed Objective"+i);
		}
		return this;
	}

	public clickNeedInspirations(): ManageObjectivesPage {
		needInspirations.click();
		return this;
	}

	public clickNeedInspirationsEye(objectiveName: string): ManageObjectivesPage {
		this.needInspirations_Obj_Eye(objectiveName).scrollIntoViewIfNeeded();
		this.needInspirations_Obj_Eye(objectiveName).click();
		this.pause(1000);
		return this;
	}

	public clickNeedInspirationsAdd(objectiveName: string): ManageObjectivesPage {
		this.needInspirations_Obj_Add(objectiveName).click();
		return this;
	}

	public waitForTime(time: number): ManageObjectivesPage {
		this.pause(time);
		return this;
	}
}
