import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { AriaRole, Browser, FileChooser, LoadState, Locator } from "common/testing/playwright";
import { ManageProjectPage } from "pages/careergrowth/project/ManageProjectPage";
import { ProjectsMePage } from "pages/careergrowth/project/ProjectsMePage";
import { ShareProjectPage } from "pages/careergrowth/share/ShareProjectPage";

export class CreateProjectPage extends BasePage {

    private filePath: string = "src/main/resources/fixtures/project/SamplePNGImage_1mbmb.png";
    public createProjectHeader: Locator = this.page.locator("#create-edit-projects-header");
    public projectTitle: Locator = this.page.locator("#project-title");
    public projectDescription: Locator = this.page.locator("#project-description");
    public projectThumbnail: Locator = this.page.locator("#project-thumbnail");
    public projectThumbnailButton: Locator = this.page.locator("//div[@id='project-thumbnail']//button");
    public projectThumbnailUploadTab: Locator = this.page.locator("//i[@class='icon-upload']");
    public imageUploadConfirmButton: Locator = this.page.locator("//div/span[@class='fsp-button fsp-button--primary']");
    public image1Unsplash: Locator = this.page.locator("//div[@class='unsplash-image-uploader']//ul//li[1]");
    public unsplashSelectButton: Locator = this.page.locator("//button[@class='ed-btn ed-btn-primary' and text()='Add Image']");
    public applicationRequiredToggle: Locator = getByRole(AriaRole.BUTTON, "Application required").build();
    public publishBuitton: Locator = this.page.locator("//div[@class='projects-footer-actions']/button[text()='Publish']");
    public confirmationModalShareButton: Locator = this.page.locator("//button[text()='Get Shareable Link'] | //button[text()='Share']");
    public errormessageRequiredField: Locator = this.page.locator("div.input-error > span.input-error");
    public draftButton: Locator = this.page.locator("//div[@class='projects-footer-actions']/button[text()='Save As Draft']");
    public maybeLaterButton: Locator = this.page.locator("//button[text()='Maybe Later']");
    public editProjectHeader: Locator = this.page.locator("//h1[@id='create-edit-projects-header' and text()='Edit Draft'] | //h1[@id='create-edit-projects-header' and text()='Edit Project']");
    public createDuplicateProjectHeader: Locator = this.page.locator("//div/h1[@id='create-edit-projects-header' and text()='Duplicate Project']");
    public projectTitleText(projectTitle: string): Locator {
      return this.getLocatorWithParam("//input[@id='project-title' and @value='%s']", projectTitle);
    }
    public projectDescText(descText: string): Locator {
      return this.getLocatorWithParam("//div[@id='project-description']/p[text()='%s']", descText);
    }
    public numberOfOpeningsCount: Locator = this.page.locator("//input[@class='input-field input-field-border' and @aria-label='Openings available']");
    public replaceImageTxt: Locator = getByText("Replace image").build();
    public projectOwnersCountTxt: Locator = getByText("1/6 Owners").build();
    public duplicateProjectTitleWarning: Locator = this.page.locator("//div[contains(@class, 'ed-dialog-modal-content')]/span[@class='duplicate-project-warning-modal__hint']");
    public duplicateTitleWarningYesButton: Locator = this.page.locator("//button[@class='ed-btn ed-btn-primary' and text() ='Yes']");
    public duplicateTitleWarningCancelButton: Locator = this.page.locator("//div[@class='ed-dialog-modal-footer ']//button[@class='ed-btn ed-btn-neutral' and text() ='Cancel']");
    public searchLocationsText: Locator = this.page.locator("//input[@id='project-locations']");
    public searchSkillsTextBox: Locator = this.page.locator("//div[contains(@class,'ed-multi-select__placeholder') and text()='Search skills...']/following-sibling::div/input");
    public addSkillButton: Locator = this.page.locator("//button[@class='ed-btn ed-btn-primary' and text()='Add']");
    public searchRolesText: Locator = this.page.locator("input#project-job-roles");
    public searchTimeZonesText: Locator = this.page.locator("//div[contains(@class,'ed-multi-select__placeholder') and text()='Search Time Zones']/following-sibling::div/input");
    public searchLanguages: Locator = this.page.locator("//div[contains(@class,'ed-multi-select__placeholder') and text()='Search Languages']/following-sibling::div/input");
    public remotePossibleChkBox: Locator = this.page.locator("//span[@class='ed-checkbox-label ltr-direction' and text()='Remote Work Possible']");
    public timeCommitmentText: Locator = this.page.locator("//input[@id='project-time-commitment']");
    public selectItemFromDropDownSearchResults(searchResultToSelect: string): Locator {
      return this.getLocatorWithParam("//div[contains(@class, 'ed-multi-select__option') and text()='%s']", searchResultToSelect);
    }
    public createProjectSaveButton: Locator = this.page.locator("//button[@class='ed-btn ed-btn-primary' and text()='Save']");
    public suggestedSkillsSection: Locator = this.page.locator("//div[@class='suggested-skills-header']");
    public closeProjectModal: Locator = this.page.locator("//div[@class='ed-dialog-modal-header']/h2[text()='Close Project?']");
    public closeProjectModalCloseButton: Locator = this.page.locator("//div/button[@class='ed-btn ed-btn-primary' and @aria-label='Close']");
    public suggestedSkillsMoreButton: Locator = this.page.locator("//button[@class='suggested-skills-more']");
    public suggestedSkillsModalHeaderSubmitButton: Locator = this.page.locator("//div[@class='ed-dialog-modal-footer ']/button[@class='ed-btn ed-btn-primary']");
    public enterOrgFieldDepartmentInput: Locator = this.page.locator("//input[@id='project-custom-organization-unit-DEPARTMENT']");
    public selectOrgValueFromOptions(orgValue: string): Locator {
      return this.getLocatorWithParam("//div[contains(@class,'ed-multi-select__option') and text()='%s']", orgValue);
    }
    public selectASkillFromSuggestedSkillsModal(skillID: string): Locator {
      return this.getLocatorWithParam("//div[@class='skill-checkbox']/label/input[@id='%s']", skillID);
    }
    public selectASkillFromSuggestedSkillsSection(skillName: string): Locator {
      return this.getLocatorWithParam("//div[@class='suggested-skills']/div/div/button[@aria-label='%s']", skillName);
    }
    public selectSkillLevelFromSuggestedSkillsSection(skillLevel: string): Locator {
      return this.getLocatorWithParam("//div[@class='dropdown-wrapper ed-skill-level-select-dropdown']/div/ul/li/button[text()='%s']", skillLevel);
    }

    public fillInProjectDescription(projectDesc: string): CreateProjectPage {
        this.pause(2000);
        this.page.waitForLoadState(LoadState.DOMCONTENTLOADED);
        projectDescription.click();
        this.pause(1000);
        this.page.keyboard().type(projectDesc);
        this.pause(1000);
        return this;
    }

    public selectAProjectThumbnail(): CreateProjectPage {
        this.pause(3000);
        this.page.waitForLoadState(LoadState.DOMCONTENTLOADED);
        projectThumbnailButton.click();
        this.pause(500);
        image1Unsplash.click();
        this.pause(500);
        unsplashSelectButton.click();
        this.pause(500);
        return this;
    }

    public selectProjectLocation(locationText: string, locationName: string): CreateProjectPage {
        searchLocationsText.click();
        searchLocationsText.fill(locationText);
        this.selectItemFromDropDownSearchResults(locationName).click();
        return this;
    }

    public clickPublishButton(): CreateProjectPage {
        publishBuitton.click();
        return this;
    }

    public clickDraftButton(): CreateProjectPage {
        draftButton.click();
        this.pause(500);
        return this.getPageClassInstance(CreateProjectPage);
    }

    public fillInProjectTitle(title: string): CreateProjectPage {
        this.pause(2000);
        this.page.waitForLoadState(LoadState.DOMCONTENTLOADED);
        projectTitle.clear();
        this.pause(2000);
        projectTitle.fill(title);
        this.pause(1000);
        return this;
    }

    public clickMayBeLaterButton(): ProjectsMePage {
        maybeLaterButton.click();
        return this.getPageClassInstance(ProjectsMePage);
    }

    public clickSaveButton(): ManageProjectPage {
        createProjectSaveButton.click();
        return this.getPageClassInstance(ManageProjectPage);
    }

    public enableApplicationRequired(): CreateProjectPage {
        //editProjectHeader().should('exist') planning to use this at a later stage hence the toogle to comment out for the time being
        applicationRequiredToggle.click();
        return this;
    }

    public clickShareButton(): ShareProjectPage {
        confirmationModalShareButton.click();
        return this.getPageClassInstance(ShareProjectPage);
    }

    public duplicateTitleWarningModalclickYesButton(): CreateProjectPage {
        duplicateTitleWarningYesButton.click();
        return this;
    }

    public duplicateTitleWarningModalclickCancelButton(): CreateProjectPage {
        duplicateTitleWarningCancelButton.click();
        return this;
    }

    public enterNumberOfOpeningsCount(openingsCount: string): CreateProjectPage {
        numberOfOpeningsCount.clear();
        numberOfOpeningsCount.fill(openingsCount);
        return this;
    }

    public searchAndSelectASkillAndSkillLevel(skillText: string, skillName: string): CreateProjectPage {
        searchSkillsTextBox.click();
        searchSkillsTextBox.fill(skillText);
        this.selectItemFromDropDownSearchResults(skillName).click();
        return this;
    }

    public selectASkillLevel(skillLevelValue: string): CreateProjectPage {
        this.page.locator(".ed-select").selectOption(skillLevelValue);
        addSkillButton.click();
        return this;
    }

    public searchAndSelectARole(roleText: string, roleName: string): CreateProjectPage {
        searchRolesText.click();
        searchRolesText.fill(roleText);
        this.selectItemFromDropDownSearchResults(roleName).click();
        return this;
    }

    public searchAndSelectATimeZone(timeZoneText: string, timeZone: string): CreateProjectPage {
        searchTimeZonesText.click();
        searchTimeZonesText.fill(timeZoneText);
        this.selectItemFromDropDownSearchResults(timeZone).click();
        return this;
    }

    public toggleRemoteWorkPossibleChkBox(): CreateProjectPage {
        remotePossibleChkBox.click();
        return this;
    }

    public fillInTimeCommitment(timeCommitment: string): CreateProjectPage {
        timeCommitmentText.click();
        timeCommitmentText.fill(timeCommitment);
        return this;
    }

    public clickOnTimeCommitmentField(): CreateProjectPage {
        timeCommitmentText.click();
        return this;
    }

    public searchAndSelectLanguage(languageName: string): CreateProjectPage {
        searchLanguages.click();
        searchLanguages.fill(languageName);
        this.selectItemFromDropDownSearchResults(languageName).click();
        return this;
    }

    public selectASkillFromSuggestedSkills(skillName: string, skillLevel: string): CreateProjectPage {
        this.selectASkillFromSuggestedSkillsSection(skillName).click();
        this.selectSkillLevelFromSuggestedSkillsSection(skillLevel).click();
        return this;
    }

    public selectSkillFromSuggestedSkillsModal(skillID: string): CreateProjectPage {
        suggestedSkillsMoreButton.click();
        this.selectASkillFromSuggestedSkillsModal(skillID).click();
        suggestedSkillsModalHeaderSubmitButton.click();
        return this;
    }

    public clickCloseButtonCloseProjectModal(): CreateProjectPage {
        closeProjectModalCloseButton.click();
        return this;
    }

    public searchAndSelectOrgDepartment(deptName: string): CreateProjectPage {
        enterOrgFieldDepartmentInput.click();
        enterOrgFieldDepartmentInput.fill(deptName);
        this.selectOrgValueFromOptions(deptName).click();
        return this;
    }

    public selectUploadImageProjectThumbnail(): CreateProjectPage {
        projectThumbnailButton.click();
        projectThumbnailUploadTab.click();
        let fileChooser: FileChooser = this.page.waitForFileChooser(() => this.page.locator(".fsp-drop-area__title").click());
        fileChooser.setFiles(Paths.get(filePath).toAbsolutePath());
        imageUploadConfirmButton.click();
        return this;
    }

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }
}
