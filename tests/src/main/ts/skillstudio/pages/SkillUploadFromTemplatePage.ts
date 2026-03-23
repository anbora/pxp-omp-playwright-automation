import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, FileChooser, Locator } from "common/testing/playwright";
import { SkillsStudioGlobalNavigationPage } from "skillstudio/pages/SkillsStudioGlobalNavigationPage";

export class SkillUploadFromTemplatePage extends SkillsStudioGlobalNavigationPage {

    public BrowseSkillsUploadButton: Locator = this.page.locator("//span[text()='Browse']//ancestor::button");
    public SourceNameInputFieldLoc: Locator = this.page.locator("//input[@id='source']");
    public UploadSkillsButtonLoc: Locator = this.page.locator("//button[text()='Upload Skills']");
    public Skill_Status: Locator = this.page.locator("//label[@for='status__active']");
    public Verify_Recent_Uploaded_Skill_Import_Loc(source_name: string, uploadstatus: string): Locator {
      return this.getLocatorWithParam("//div[text()='%s']//ancestor::tr//div[text()='%s']", source_name, uploadstatus);
    }

    public Automap_Skill_CheckBox_Loc: Locator = this.page.locator("//input[@type=\"checkbox\"][@id=\"mapping_configuration__is_auto_map_unlinked_skills\"]");

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public uploadSkillsWithTemplate(source_name: string, status: boolean, uploadStatus: string): SkillUploadFromTemplatePage {
        let fileChooser: FileChooser = this.page.waitForFileChooser(() => BrowseSkillsUploadButton.click());
        let filePath: string = "src/main/resources/fixtures/csv/skills/singleskillimport.xlsx";
        fileChooser.setFiles(Paths.get(filePath).toAbsolutePath());
        SourceNameInputFieldLoc.fill(source_name);
        if (status) {
            Skill_Status.click();
            this.page.waitForTimeout(20000);
        }
        UploadSkillsButtonLoc.click();
        this.page.waitForTimeout(20000);
        let isElementPresent: boolean = false;
        let maxAttempts: number = 5;
        let attempt: number = 0;

      while(maxAttempts: !isElementPresent && attempt <):  {
            attempt++;
            let element: Locator = Verify_Recent_Uploaded_Skill_Import_Loc(source_name, uploadStatus);
            if (element.count() > 0) {
              let isElementPresent:  = true;

            } else {
                this.page.reload();
                this.page.waitForTimeout(2000);
            }
        }
            return this;
        }

    public mappingconfiguration(automap_unlinked_skills: string): SkillUploadFromTemplatePage {
        if(automap_unlinked_skills=="OFF")
        {
            Automap_Skill_CheckBox_Loc.click();
        }
        return this;
    }
}
