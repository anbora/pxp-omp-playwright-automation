// @ts-nocheck
import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { AriaRole, Browser, Locator, WaitForSelectorState } from "common/testing/playwright";
import { WelcomePage_New } from "pages/careergrowth/careergrowth/WelcomePage_New";
import { AddSkillModalPage } from "pages/careergrowth/jobs/AddSkillModalPage";
import { PreferencesCareerProfileModalPage } from "pages/careergrowth/profiles/PreferencesCareerProfileModalPage";
import { SkillsCareerProfileModalPage } from "pages/careergrowth/profiles/SkillsCareerProfileModalPage";
import { UpdateCareerProfilePage } from "pages/careergrowth/profiles/UpdateCareerProfilePage";
import { UploadResumeFileModalPage } from "pages/careergrowth/project/UploadResumeFileModalPage";
import { LandingPage } from "pages/landing/LandingPage";

export class ExperienceCareerProfileModalPage extends UpdateCareerProfilePage {

    public readonly selectFileButton: Locator = this.page.locator("//i[@class='icon-upload']");
    public readonly skillsButton: Locator = this.page.locator("//label[text()='Skills']/parent::button");
    public readonly experienceButton: Locator = this.page.locator("//label[text()='Experience']/parent::button");
    public readonly preferencesButton: Locator = this.page.locator("//label[text()='Career Preferences']/parent::button");
    public readonly addMoreExperienceButton: Locator = this.page.locator("//button[text()='Add more experience']");
    public readonly addWorkHistoryButton: Locator = this.page.locator("//button[text()='Add more experience']");
    public readonly startDateMonthSelect: Locator = this.page.locator("//select[contains(@id, 'start-month')]");
    public readonly startDateYearSelect: Locator = this.page.locator("//select[contains(@id, 'start-year')]");
    public readonly endDateMonthSelect: Locator = this.page.locator("//select[contains(@id, 'end-month')]");
    public readonly endDateYearSelect: Locator = this.page.locator("//select[contains(@id, 'end-year')]");
    public readonly currentlyWorkingHereCheckbox: Locator = this.page.locator("//input[@name='workHere-new'])");
    public readonly positionTitleLabel: Locator = this.page.locator("//label[@class='title-text']");
    public readonly positionTitleInput: Locator = this.page.locator("(//label[text()='Title']/following::input)[1]");
    public companyNameLabel(position: string): Locator {
      return this.getLocatorWithParam("//label[@class='title-text'][text()='%s']/following-sibling::label", position);
    }
    public readonly companyNameInput: Locator = this.page.locator("//div[@class = 'content']/descendant::input[@id = 'companyName'] | //div[@class = 'content']/descendant::input[contains(@id, 'name-new')]");
    public readonly descriptionTextarea: Locator = this.page.locator("//label[text() = 'Tell us what what were your responsibilities on this position.']/following-sibling::textarea[contains(@id, 'description')] | //textarea[contains(@id, 'description')]");
    public readonly cancelButton: Locator = this.page.locator("//button[text()='Cancel']");
    public readonly doneButton: Locator = this.page.locator("//button[text()='Done']");
    public workHistoryLineLabel(text: string): Locator {
      return this.getByText(text);
    }
    public workHistoryPeriodLabel(position: string): Locator {
      return this.getLocatorWithParam("//label[@class='title-text'][text()='%s']/preceding-sibling::label", position);
    }
    public workHistoryCompanyLabel(position: string): Locator {
      return this.getLocatorWithParam("//label[@class='title-text'][text()='%s']/following-sibling::label", position);
    }
    public readonly workHistoryLineEditButton: Locator = this.page.locator("(//button[@aria-label='edit the work history'])");
    public readonly workHistoryLineDeleteButton: Locator = this.page.locator("(//button[@class='icon-trash'])[1]");
    public readonly goToPreferencesButton: Locator = this.page.locator("//button[text()='4']");
    public readonly closeButton: Locator = this.page.locator("//button[@class='close-btn']");
    public readonly saveButton: Locator = this.page.locator("//button[text()='Save']");
    public readonly dateWarningMessages: Locator = this.page.locator(".employment-period span.error-label");
    public readonly titleWarningMessage: Locator = this.page.locator("//span[contains(@id, 'title-new_error')]");
    public readonly companyNameWarningMessage: Locator = this.page.locator("//span[contains(@id, 'name-new_error')]");
    public readonly unsavedHistoryWarningMessage: Locator = this.page.locator("//div[@class='closable-warning']");
    public readonly descriptionWarningMessage: Locator = this.locator("span.input-warning-message");
    public readonly warning: Locator = this.getByText("There are some unsaved work");
    public readonly companyNameRadioButton: Locator = this.page.locator("//input[@placeholder='Enter company name here']");
    public readonly saveAndContinueButton: Locator = this.page.locator("//button[text()='Save and continue']");
    public skipForNowLocator: Locator = this.getByText("Skip for now");
    public xButton: Locator = this.page.locator("//button[@class = 'close-btn'][text() = '×']");
    public goToCareerPreferenceTab: Locator = this.page.locator("//ul[@role='list']//button[.='4']");
    public readonly stepDescriptionLabel: Locator = this.page.locator("//span[@class='step-description']/child::span[1]");
    public readonly stepDescriptionContLabel: Locator = this.page.locator("//span[@class='step-description']/child::span[2]");
    public readonly recommendationInformationLabel: Locator = this.page.locator("//p[@class='cyp-information-text']/child::span[1]");
    public readonly recommendationInformationContLabel: Locator = this.page.locator("//p[@class='cyp-information-text']/child::span[2]");

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public clickSelectFile(): UploadResumeFileModalPage {
        selectFileButton.click();
        return this.getPageClassInstance(UploadResumeFileModalPage);
    }

    public clickSkillsIcon(): SkillsCareerProfileModalPage {
        skillsButton.click();
        return this.getPageClassInstance(SkillsCareerProfileModalPage);
    }

    public clickPreferencesIcon(): PreferencesCareerProfileModalPage {
        preferencesButton.click();
        return this.getPageClassInstance(PreferencesCareerProfileModalPage);
    }

    public clickAddMoreExperience(): ExperienceCareerProfileModalPage {
        addMoreExperienceButton.click();
        this.pause(6000);
        return this;
    }

    public addWorkHistoryLine(): ExperienceCareerProfileModalPage {
        addWorkHistoryButton.click();
        this.pause(6000);
        return this;
    }

    public editHistoryLine(): ExperienceCareerProfileModalPage {
        workHistoryLineEditButton.first().click();
        return this;
    }

    public deleteFirstWorkHistoryLine(): ExperienceCareerProfileModalPage {
        workHistoryLineDeleteButton.first().click();
        return this;
    }

	public fillPositionTitle(title: string): ExperienceCareerProfileModalPage {
        positionTitleInput.clear();
        positionTitleInput.fill(title);
        return this;
    }

	public fillDescription(description: string): ExperienceCareerProfileModalPage {
        descriptionTextarea.last().clear();
        descriptionTextarea.last().fill(description);
        return this;
    }

	public fillCompanyName(name: string): ExperienceCareerProfileModalPage {
        companyNameInput.clear();
        companyNameInput.fill(name);
        return this;
    }

	public selectStartDateMonth(month: string): ExperienceCareerProfileModalPage {
        startDateMonthSelect.selectOption(month);
        return this;
    }

	public selectStartDateYear(year: string): ExperienceCareerProfileModalPage {
        startDateYearSelect.selectOption(year);
        return this;
    }

	public selectEndDateMonth(month: string): ExperienceCareerProfileModalPage {
        endDateMonthSelect.selectOption(month);
        return this;
    }

	public selectEndDateYear(year: string): ExperienceCareerProfileModalPage {
        endDateYearSelect.selectOption(year);
        return this;
    }

    public clickCancelButton(): ExperienceCareerProfileModalPage {
        cancelButton.click();
        return this;
    }

	public clickDoneButton(): ExperienceCareerProfileModalPage {
        this.pause(4000);
        doneButton.click();
        return this;
    }

	public clickSaveButton(): ExperienceCareerProfileModalPage {
        this.pause(1000);
        saveButton.first().waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        saveButton.first().click();
        return this;
    }

    public clickSaveAndContinueButton(): SkillsCareerProfileModalPage {
        this.pause(2000);
        saveAndContinueButton.first().waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        saveAndContinueButton.click();
        this.pause(2000);
        return this.getPageClassInstance(SkillsCareerProfileModalPage);
    }

    public clickSaveButtonAndGoToLandingPage(): LandingPage {
        saveButton.first().waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        saveButton.click();
        return this.getPageClassInstance(LandingPage);
    }

	public clickCloseButton(): WelcomePage_New {
        closeButton.click();
        return this.getPageClassInstance(WelcomePage_New);
    }

    public clickCloseButtonAndBackToLandingPage(): LandingPage {
        closeButton.click();
        return this.getPageClassInstance(LandingPage);
    }

    public clickCloseButtonStaysInCareerProfileModelPage(): ExperienceCareerProfileModalPage {
        closeButton.click();
        return this;
    }

    public clickGoToPreferencesButton(): PreferencesCareerProfileModalPage {
        goToPreferencesButton.first().click();
        return this.getPageClassInstance(PreferencesCareerProfileModalPage);
    }

    public clickCloseButtonForSkillsPassport(): AddSkillModalPage {
        closeButton.first().click();
        return this.getPageClassInstance(AddSkillModalPage);
    }

    public clickCompanyNameRadioButton(): ExperienceCareerProfileModalPage {
        this.pause(1000);
        companyNameRadioButton.click();
        return this;
    }

    public clickSkipForNowButton(): SkillsCareerProfileModalPage {
        skipForNowLocator.click();
        return this.getPageClassInstance(SkillsCareerProfileModalPage);
    }

    public clickXButton(): WelcomePage_New {
        xButton.click();
        return this.getPageClassInstance(WelcomePage_New);
    }

    public clickXButtonAndStayInModal(): ExperienceCareerProfileModalPage {
        xButton.click();
        return this;
    }

    public goToCareerPreferenceTab(): PreferencesCareerProfileModalPage {
        goToCareerPreferenceTab.click();
        return this.getPageClassInstance(PreferencesCareerProfileModalPage);
    }
}
