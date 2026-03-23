import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";
import { SkillsStudioGlobalNavigationPage } from "skillstudio/pages/SkillsStudioGlobalNavigationPage";

export class SkillsLibraryPage extends SkillsStudioGlobalNavigationPage{

    public Skill_Search_Input_Loc: Locator = this.page.locator("//input[@id='interactive-icon']");
    public Skill_Label_Loc(skill_name: string): Locator {
      return this.getLocatorWithParam("//div[@data-test='table-container']//label[text()='%s']", skill_name);
    }
    public Verify_Skill_Status_Loc(skill_name: string, status: string): Locator {
      return this.getLocatorWithParam("//label[text()='%s']/ancestor::tr//td[text()='%s']", skill_name, status);
    }
    public Verify_Source_Name_Loc(source_name: string): Locator {
      return this.getLocatorWithParam("//div[@data-test='table-container']//td[text()='%s']", source_name);
    }
    public Skill_Checkbox_Loc(skill_name: string): Locator {
      return this.getLocatorWithParam("//label[text()='%s']/ancestor::tr//input", skill_name);
    }
    public Skill_Change_Status_Button_Loc(status: string): Locator {
      return this.getLocatorWithParam("//button[text()='%s']", status);
    }
    public Skill_Edit_Label_Loc: Locator = this.page.locator("//input[@id='label']");
    public Skill_Edit_Description_Loc: Locator = this.page.locator("//textarea[@id='Description']");
    public Skill_Save_Changes_Button_Loc: Locator = this.page.locator("//button[text()='Save changes']");
    public Skill_Library_Page_Navigation_Loc: Locator = this.page.locator("//span[text()='Skills library']//ancestor::a[1]");
    public Skill_Update_Label_Loc(skill_name: string): Locator {
      return this.getLocatorWithParam("//div[@data-test='table-container']//label[text()='%s']", skill_name);
    }
    public Skills_Description_Verification_Loc(desc: string): Locator {
      return this.getLocatorWithParam("//textarea[text()='%s']", desc);
    }

    public Linked_Skills_Graph_Equivalent_Loc(skill_graph_equivalent: string): Locator {

      return this.getLocatorWithParam("//h5[text()='Link to skills graph equivalent.']//ancestor::div[2]//div[contains(@class,\"sc-dqYEFG\")]//span[text()='%s']", skill_graph_equivalent);

    }

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public skillSearch(source_name: string): SkillsLibraryPage {
        Skill_Search_Input_Loc.fill(source_name);
        for (int i = 0; i < 5; i++) {
            Skill_Search_Input_Loc.clear();  // Clear the input field
            Skill_Search_Input_Loc.fill(source_name);  // Type the source_name
        }
        return this;
    }
    public skillsStatusOperation(skill_name: string, status: string): SkillsLibraryPage {
        this.Skill_Checkbox_Loc(skill_name).check();
        //Activate, Deactivate
        this.Skill_Change_Status_Button_Loc(status).click();
        this.page.reload();
        return this;
    }
    public clickOnSkillLabel(skill_name: string): SkillsLibraryPage {
        this.Skill_Label_Loc(skill_name).click();
        return this;
    }

    public editSkillLabel(new_label: string): SkillsLibraryPage {
        Skill_Edit_Label_Loc.clear();
        Skill_Edit_Label_Loc.fill(new_label);
        return this;
    }

    public editSkillDescription(new_description: string): SkillsLibraryPage {
        Skill_Edit_Description_Loc.clear();
        Skill_Edit_Description_Loc.fill(new_description);
        return this;
    }

    public clickSkillSaveChangesButton(): SkillsLibraryPage {
        Skill_Save_Changes_Button_Loc.click();
        Skill_Library_Page_Navigation_Loc.click();
        this.page.waitForTimeout(5000);
        this.pause(2000);
        return this;
    }
}
