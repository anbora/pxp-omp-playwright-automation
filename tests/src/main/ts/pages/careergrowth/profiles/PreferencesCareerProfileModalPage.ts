import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { AriaRole, Browser, Locator, WaitForSelectorState } from "common/testing/playwright";
import { WelcomePage_New } from "pages/careergrowth/careergrowth/WelcomePage_New";
import { JobVacancyDetailsPage } from "pages/careergrowth/jobs/JobVacancyDetailsPage";
import { ExperienceCareerProfileModalPage } from "pages/careergrowth/profiles/ExperienceCareerProfileModalPage";
import { SkillsCareerProfileModalPage } from "pages/careergrowth/profiles/SkillsCareerProfileModalPage";
import { UpdateCareerProfilePage } from "pages/careergrowth/profiles/UpdateCareerProfilePage";
import { UploadResumeFileModalPage } from "pages/careergrowth/project/UploadResumeFileModalPage";

export class PreferencesCareerProfileModalPage extends UpdateCareerProfilePage {

    public readonly selectFileButton: Locator = this.page.locator(".upload-cvs > button");
    public readonly skillsButton: Locator = this.page.locator("//label[text()='Skills']/parent::button");
    public readonly experienceButton: Locator = this.page.locator("//label[text()='Experience']/parent::button");
    public readonly preferencesButton: Locator = this.page.locator("//h3[text()='Career Preferences']");
    public preferencesLabel(label: string): Locator {
      return this.getLocatorWithParam("//label[text()='%s']/parent::div/following-sibling::span[@class='icon-edit-light']", label);
    }
    public optionCheckbox(option: string): Locator {
      return this.getLocatorWithParam("//input[@aria-label='%s']", option);
    }
    public optionWithinTypeCheckbox(type: string, optionName: string): Locator {
      return this.getLocatorWithParam("//div[contains(@class, 'break-all')][text()='%s']/parent::label/following-sibling::div/descendant::input[@aria-label='%s']", type, optionName);
    }
    public optionChip(type: string, optionName: string): Locator {
      return this.getLocatorWithParam("//div[contains(@class, 'break-all')][text()='%s']/parent::label/following-sibling::div/descendant::div[contains(@class, 'ed-multi-select__multi-value__label')][text()='%s']", type, optionName);
    }
    public preferenceInput(type: string, value: string): Locator {
      return this.getByRole(AriaRole.GROUP, type).getByText(value).build().first();
    }
    public preferenceInput(type: string): Locator {
      return this.getLocatorWithParam("//div[text()='%s']/parent::label/parent::div/descendant::input", type);
    }
    public optionToSelect(value: string): Locator {
      return this.getLocatorWithParam("//div[contains(@class, 'ed-multi-select__option')][text()='%s']", value);
    }
    public removeOptionButton(type: string, value: string): Locator {
      return this.getLocatorWithParam("//div[contains(@class,'break-all')][text()='%s']/parent::label/following-sibling::div/descendant::div[contains(@class, 'ed-multi-select__multi-value__label')][text()='%s']/following-sibling::div", type, value);
    }
    public emptyStateInput(type: string): Locator {
      return this.getLocatorWithParam("//div[contains(@class, 'break-all')][text()='%s']/parent::label/following-sibling::div/descendant::div[contains(@class, 'ed-multi-select__placeholder')]", type);
    }
    public readonly cancelButton: Locator = this.page.locator("//button[text()='Cancel']");
    public readonly successAlertBox: Locator = this.page.locator("//div[@class = 'success']/span[@id='toast-message']");
    public readonly goToExperienceButton: Locator = this.page.locator("//button[text()='Go to Experience']");
    public readonly closeButton: Locator = this.page.locator("//button[text()='Close']");
    public readonly saveButton: Locator = this.page.locator("//button[text()='Save']");
    public readonly confirmationHeader: Locator = this.page.locator("//h6[@class='confirmation-message'][text()='You have successfully added information to your profile']");
    public readonly xButton: Locator = this.page.locator("//button[@class = 'close-btn']");
    public radioButtonKilometers: Locator = this.page.locator("//label/child::input[@id='distance-unit-radio-items-0']");
    public radioButtonMiles: Locator = this.page.locator("//label/child::input[@id='distance-unit-radio-items-1']");
    public distance: Locator = this.page.locator("//div/input[@id='set-distance']");
    public preferredLocation: Locator = this.page.locator("//div[@class='geolocation-select-search__input']/div[@class='ed-input-container']/div/div/div[1]/div[2]/input[@role='combobox']");
    public preferredLocationValue(value: string): Locator {
      return this.getLocatorWithParam("//div[text()='%s']", value);
    }
    public maximumNumberOfLocations: Locator = this.page.locator("//div/div[@class='geolocation-select-search__warning']");
    public deleteFirstPreferredLocation: Locator = this.page.locator("//div[@class='ed-input-container']/div/div/div[1]/div[1]/div/div[@role='button']");
    public preferredLocation3: Locator = this.page.locator("//div[@class='geolocation-select-search__input']/div[@class='ed-input-container']/div/div/div[1]/div[3]/input[@role='combobox']");
    public preferredLocation4: Locator = this.page.locator("//div[@class='geolocation-select-search__input']/div[@class='ed-input-container']/div/div/div[1]/div[4]/input[@role='combobox']");
    public preferredLocation5: Locator = this.page.locator("//div[@class='geolocation-select-search__input']/div[@class='ed-input-container']/div/div/div[1]/div[5]/input[@role='combobox']");
    public readonly recommendationInformation: Locator = this.page.locator("//div[@class='confirmation_modal_container']/descendant::p[@class='cyp-information-text']/child::span");
    public readonly careerPreferencesLocation: Locator = getByText("Preferred Work Location").build();
    public completeYourProfileCareerPrefsCareerGoal1stChkBox: Locator = this.page.locator("//div/label/input[@id='FORWARD']");
    public Locator completeYourProfileWidgetProfileCompletedHeader() { return this.getByRole(AriaRole.HEADING, "Profile completed").build(); };
    public completeYourProfile100CompletedProgressData: Locator = this.page.locator("//div[@class='progress-data']/span[text()='100']");

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public clickSelectFile(): UploadResumeFileModalPage {
        selectFileButton.click();
        return this.getPageClassInstance(UploadResumeFileModalPage);
    }

    public clickRadioButtonKilometers(): PreferencesCareerProfileModalPage {
        radioButtonKilometers.click();
        return this.getPageClassInstance(PreferencesCareerProfileModalPage);
    }

    public clickRadioButtonMiles(): PreferencesCareerProfileModalPage {
        radioButtonMiles.click();
        return this.getPageClassInstance(PreferencesCareerProfileModalPage);
    }

    public clearAndSetDistance(distanceValue: string): PreferencesCareerProfileModalPage {
        distance.clear();
        distance.fill(distanceValue);
        return this.getPageClassInstance(PreferencesCareerProfileModalPage);
    }

    public enterPreferredLocations(locationValue: string): PreferencesCareerProfileModalPage {
        preferredLocation.click();
        preferredLocation.fill(locationValue);
        this.pause(2000);
        this.preferredLocationValue(locationValue).click();
        this.pause(2000);
        return this.getPageClassInstance(PreferencesCareerProfileModalPage);
    }

    public enterPreferredFurtherLocations(locationValue3: string, locationValue4: string, locationValue5: string): PreferencesCareerProfileModalPage {
        preferredLocation3.click();
        preferredLocation3.fill(locationValue3);
        this.pause(2000);
        this.preferredLocationValue(locationValue3).click();
        preferredLocation4.click();
        preferredLocation4.fill(locationValue4);
        this.pause(2000);
        this.preferredLocationValue(locationValue4).click();
        preferredLocation5.click();
        preferredLocation5.fill(locationValue5);
        this.pause(2000);
        this.preferredLocationValue(locationValue5).click();
        return this.getPageClassInstance(PreferencesCareerProfileModalPage);
    }

    public deleteFirstPreferredLocation(): PreferencesCareerProfileModalPage {
        deleteFirstPreferredLocation.click();
        return this;
    }

    public clickExperienceIcon(): ExperienceCareerProfileModalPage {
        experienceButton.click();
        return this.getPageClassInstance(ExperienceCareerProfileModalPage);
    }

    public clickSkillsIcon(): SkillsCareerProfileModalPage {
        skillsButton.click();
        return this.getPageClassInstance(SkillsCareerProfileModalPage);
    }

    public clickPreferencesLabel(label: string): PreferencesCareerProfileModalPage {
        this.preferencesLabel(label).click();
        return this;
    }

    public selectCareerPreferenceCheckbox(type: string, value: string): PreferencesCareerProfileModalPage {
        this.preferenceInput(type, value).click();
        return this;
    }

    public addCareerPreference(type: string, value: string): PreferencesCareerProfileModalPage {
        this.pause(1000);
        this.preferenceInput(type).click();
        this.preferenceInput(type).fill(value);
        this.optionToSelect(value).click();
        return this;
    }

    public addAFewCareerPreferencesWithCondition(type: string, valuesList: Array<string>, condition: boolean): PreferencesCareerProfileModalPage {
        if (condition) {
            for (const value of valuesList) {
                this.selectCareerPreferenceCheckbox(type, value);
            }
        }
        return this;
    }

    public clickAFewCheckboxesWithCondition(type: string, valuesList: Array<string>, condition: boolean): PreferencesCareerProfileModalPage {
        if (condition) {
            for (const value of valuesList) {
                this.addCareerPreference(type, value);
            }
        }
        return this;
    }

    public removeCareerPreference(type: string, value: string): PreferencesCareerProfileModalPage {
        this.pause(1000);
        this.removeOptionButton(type, value).click();
        return this;
    }

    public checkOption(option: string): PreferencesCareerProfileModalPage {
        this.optionCheckbox(option).click();
        return this;
    }

    public <T extends BasePage> clickSaveButton(tClass: Class<T>): T {
        this.pause(1000);
        if (saveButton.isVisible()) {
            saveButton.click();
        }
        this.pause(1000);
        if (xButton.isVisible()) {
            xButton.click();
        }
        return this.getPageClassInstance(tClass);
    }

    public clickSaveButton(): WelcomePage_New {

      return clickSaveButton(WelcomePage_New);

    }

    public clickSaveAndContinueButton(): PreferencesCareerProfileModalPage {
        this.saveAndContinue().first().waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        this.saveAndContinue().click();
        saveButton.first().waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        return this;
    }

    public clickSaveButtonAndGoBackToJobVacancyDetails(): JobVacancyDetailsPage {
        confirmationHeader.first().waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        saveButton.click();
        return this.getPageClassInstance(JobVacancyDetailsPage);
    }

    public clickCloseButton(): WelcomePage_New {
        closeButton.first().click();
        return this.getPageClassInstance(WelcomePage_New);
    }

    public clickSkipForNowButton(): PreferencesCareerProfileModalPage {
        this.pause(2000);
        skipForNow.click();
        this.pause(2000);
        return this.getPageClassInstance(PreferencesCareerProfileModalPage);
    }

    public clickXButton(): WelcomePage_New {
        this.pause(2500);
        xButton.click();
        return this.getPageClassInstance(WelcomePage_New);
    }

    public waitForResponse(): PreferencesCareerProfileModalPage {
        this.pause(5000);
        return this;
    }

    public deleteAllPreferredLocations(): PreferencesCareerProfileModalPage {
        for (int i=0; i <4; i++) {
            deleteFirstPreferredLocation.click();
        }
        return this;
    }

    public select1stChkBoxCareerPrefs(): PreferencesCareerProfileModalPage {
        completeYourProfileCareerPrefsCareerGoal1stChkBox.click();
        return this;
    }
}
