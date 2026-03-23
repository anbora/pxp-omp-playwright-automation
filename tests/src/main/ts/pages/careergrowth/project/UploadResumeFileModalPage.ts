import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, FileChooser, Locator, Page, WaitForSelectorState } from "common/testing/playwright";
import { WorkHistoryItem } from "models/job/WorkHistoryItem";
import { WelcomePage_New } from "pages/careergrowth/careergrowth/WelcomePage_New";
import { ExperienceCareerProfileModalPage } from "pages/careergrowth/profiles/ExperienceCareerProfileModalPage";
import { PreferencesCareerProfileModalPage } from "pages/careergrowth/profiles/PreferencesCareerProfileModalPage";

export class UploadResumeFileModalPage extends BasePage {
    public static readonly TIME_PERIOD: string = "//label[1]";
    public static readonly ROLE_NAME: string = "//label[2]";
    public static readonly COMPANY_NAME: string = "//label[3]";
    public fileInput: Locator = this.page.locator("#fileInput");
    public uploadButton: Locator = this.page.locator("//button[text()='Submit'] | //button[text()='Upload']");
    public documentName: Locator = this.page.locator("//button[@for='fileInput']/parent::div/child::label");
    public nextButton: Locator = this.page.locator("button.resume-uploaded-wizard__footer__next_button");
    public addButton: Locator = this.page.locator("//button[text() = 'Add']");
    public workHistoryRows: Locator = this.page.locator(".add-work-history__data__row .ed-dynamic-inline-container");
    public Locator skillRow(String skillLabel) { return this.getLocatorWithParam("//span[contains(@class, 'skill-name__header')]/div[text()=translate('%s','ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz')]/ancestor::tr",skillLabel); };
    public careerTabs(tab: string): Locator {
      return this.getLocatorWithParam("//label[text()='%s']/ancestor::button", tab);
    }
    public readonly addSkill: Locator = this.page.locator("//button[text()='Add']");
    public readonly allSkillsCheckbox: Locator = this.page.locator("//div[text()='Skill']/parent::span//input");
    public addTitleError: Locator = this.page.locator("//label[text()='Please add title for your work history']");
    public editIconForTitleError: Locator = this.page.locator("//label[text()='Please add title for your work history']//parent::div//child::button[@class='icon-edit-light']");
    public enterTitleInputBox: Locator = this.page.locator("//input[@placeholder='Enter job title here']");
    public doneButton: Locator = this.page.locator("//button[text()='Done']");
    public readonly xButton: Locator = this.page.locator("//button[@class = 'close-btn']");
    public readonly saveAndContinueButton: Locator = this.page.locator("//button[text()='Save and continue']");
    public readonly saveButton: Locator = this.page.locator("//button[text()='Save']");

    public uploadFile(filePathWithDocumentName: string): UploadResumeFileModalPage {
        let fileChooser: FileChooser = this.page.waitForFileChooser(() => this.page.locator("//div[@class='drag-drop-zone']//button[@class='ed-btn ed-btn-primary']").click());
        fileChooser.setFiles(Paths.get(filePathWithDocumentName));
        return this;
    }

    public uploadFile(filePath: string, documentName: string): UploadResumeFileModalPage {

      return uploadFile(filePath + documentName);

    }

	public clickUploadButton(): UploadResumeFileModalPage {
        uploadButton.click();
        return this.getPageClassInstance(UploadResumeFileModalPage);
    }

    public clickNextButton(): UploadResumeFileModalPage {
        nextButton.click();
        return this;
    }

    public clickAddButton(): ExperienceCareerProfileModalPage {
        addButton.click();
        return this.getPageClassInstance(ExperienceCareerProfileModalPage);
    }

    public getWorkHistory(): Set<WorkHistoryItem> {
        this.page.locator(".add-work-history__data__header__label").waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        let workHistoryItems: any = new LinkedHashSet<>();
        for (const locator of workHistoryRows.all()){
            let workHistoryItem: any = new WorkHistoryItem();
            workHistoryItem.setTimePeriod(locator.locator(TIME_PERIOD).innerText());
            workHistoryItem.setRoleName(locator.locator(ROLE_NAME).innerText());
            workHistoryItem.setCompanyName(locator.locator(COMPANY_NAME).innerText());
            workHistoryItems.add(workHistoryItem);
        }
        return workHistoryItems;

    }

    public markParsedSkill(skillLabel: string): UploadResumeFileModalPage {
        addSkill.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        this.skillRow(skillLabel).locator("input").click();
        return this;
    }

    public selectSkillLevel(skillLabel: string, skillLevel: string): UploadResumeFileModalPage {
        this.skillRow(skillLabel).locator("select").selectOption(skillLevel);
        return this;
    }

    public markAllSkills(): UploadResumeFileModalPage {
        allSkillsCheckbox.click();
        return this;
    }

    public goToExperienceTab(): UploadResumeFileModalPage {
        this.careerTabs("Experience").click();
        return this;
    }

    public goToSkillsTab(): UploadResumeFileModalPage {
        this.careerTabs("Skills").click();
        return this;
    }

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public unselectAllSkills(): UploadResumeFileModalPage {
        allSkillsCheckbox.click();
        return this;
    }

    public editJobTitle(jobTitle: string): UploadResumeFileModalPage {
        editIconForTitleError.click();
        enterTitleInputBox.fill(jobTitle);
        doneButton.click();
        return this;
    }

    public clickXButton(): WelcomePage_New {
        this.pause(2500);
        xButton.click();
        return this.getPageClassInstance(WelcomePage_New);
    }

    public clickSaveAndContinueButton(): UploadResumeFileModalPage {
        saveAndContinueButton.first().waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        saveAndContinueButton.click();
        saveButton.first().waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        return this;
    }
}
