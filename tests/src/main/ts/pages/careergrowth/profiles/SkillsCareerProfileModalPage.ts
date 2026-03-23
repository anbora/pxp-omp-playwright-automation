import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, LoadState, Locator, WaitForSelectorState } from "common/testing/playwright";
import { ResultContainer } from "models/ResultContainer";
import { WelcomePage_New } from "pages/careergrowth/careergrowth/WelcomePage_New";
import { JobVacancyDetailsPage } from "pages/careergrowth/jobs/JobVacancyDetailsPage";
import { SkillsPassportMePage } from "pages/careergrowth/jobs/SkillsPassportMePage";
import { ExperienceCareerProfileModalPage } from "pages/careergrowth/profiles/ExperienceCareerProfileModalPage";
import { PreferencesCareerProfileModalPage } from "pages/careergrowth/profiles/PreferencesCareerProfileModalPage";
import { SkillsToDevelopPage } from "pages/careergrowth/profiles/SkillsToDevelopPage";
import { SuggestedSkillsModalPage } from "pages/careergrowth/profiles/SuggestedSkillsModalPage";
import { UpdateCareerProfilePage } from "pages/careergrowth/profiles/UpdateCareerProfilePage";
import { UploadResumeFileModalPage } from "pages/careergrowth/project/UploadResumeFileModalPage";

export class SkillsCareerProfileModalPage extends UpdateCareerProfilePage {

    public skillToLowerCase(skill: string): string {

      return String.format("[translate(text(),'abcdefghijklmnopqrstuvwxyz','ABCDEFGHIJKLMNOPQRSTUVWXYZ')=translate('%s','abcdefghijklmnopqrstuvwxyz','ABCDEFGHIJKLMNOPQRSTUVWXYZ')]", skill);

    }
    public readonly selectFileButton: Locator = this.page.locator(".upload-cvs > span,.upload-cvs > button");
    public readonly skillsButton: Locator = this.page.locator("//label[text()='Skills']/parent::button");
    public readonly experienceButton: Locator = this.page.locator("//label[text()='Experience']/parent::button");
    public readonly preferencesButton: Locator = this.page.locator("//label[text()='Career Preferences']/parent::button");
    public readonly searchForSkill: Locator = this.page.locator(".ed-multi-select__input > input");
    public readonly intermediateSkillInput: Locator = this.page.locator("//input[@id='skill-search-Intermediate']");
    public optionToSelect(skill: string): Locator {
      return this.getLocatorWithParam("//div[@tabindex = '-1']" + skillToLowerCase(skill));
    }
    public readonly selectSkillLevel: Locator = this.page.locator("#career-skills");
    public readonly addSkill: Locator = this.page.locator("//button[text()='Add']");
    public addedSkill(level: string, skill: string): Locator {
      return this.getLocatorWithParam("//span[text()='%s']/parent::div/following-sibling::div[contains(@class, 'selected-skills')]/descendant::div[@class='tooltip-msg']" + skillToLowerCase(skill), level);
    }
    public removeSkillButton(skill: string): Locator {
      return this.getLocatorWithParam("//button[translate(@aria-label,'abcdefghijklmnopqrstuvwxyz','ABCDEFGHIJKLMNOPQRSTUVWXYZ')=translate('Remove %s','abcdefghijklmnopqrstuvwxyz','ABCDEFGHIJKLMNOPQRSTUVWXYZ')]", skill);
    }
    public readonly goToExperienceButton: Locator = this.page.locator("//button[text()=''Go to Experience']");
    public readonly closeButton: Locator = this.page.locator("//button[text()='Close']");
    public readonly saveButton: Locator = this.page.locator("//button[text()='Save']");
    public readonly dateWarningMessages: Locator = this.page.locator(".employment-period span.error-label");
    public readonly titleWarningMessage: Locator = this.page.locator("//span[contains(@id, 'title-new_error')]");
    public readonly companyNameWarningMessage: Locator = this.page.locator("//span[contains(@id, 'name-new_error')]");
    public readonly unsavedHistoryWarningMessage: Locator = this.page.locator("//div[@class='closable-warning']");
    public readonly descriptionWarningMessage: Locator = this.page.locator("//div[contains(@class,'input-warning-message')] | //button[contains(@class,'input-warning-message')]");
    public readonly warning: Locator = this.page.locator(".closable-warning .alert-body");
    public readonly firstSuggestedSkillAddButton: Locator = this.page.locator(".skills-suggested-for-user__content .skills-suggested-for-user__content__tags .user-skill-tag:first-child button");
    public readonly skillLevelDropDown: Locator = this.page.locator("dropdown-content");
    public skillLevelOption(skillLevel: string): Locator {
      return this.getLocatorWithParam(".dropdown-content li[aria-label='%s']>button", skillLevel);
    }
    public skillsOfLevel(skillLevel: string): Locator {
      return this.getLocatorWithParam("//div[@class='skill-with-proficiency-level__title']/div[contains(text(), '%s')]/ancestor::div//div[contains(@class, 'ed-multi-select__multi-value__label')]", skillLevel);
    }
    public skillOfLevelInput(skillLevel: string): Locator {
      return this.getLocatorWithParam("//input[@id='skill-search-%s']", skillLevel);
    }
    public xButton: Locator = this.page.locator("//button[@class = 'close-btn'][text() = '×']");

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }
    public readonly moreSkillsButton: Locator = this.page.locator(".user-skill-tag__button");

    public clickSelectFile(): UploadResumeFileModalPage {
        selectFileButton.click();
        return this.getPageClassInstance(UploadResumeFileModalPage);
    }

    public clickExperienceIcon(): ExperienceCareerProfileModalPage {
        experienceButton.click();
        return this.getPageClassInstance(ExperienceCareerProfileModalPage);
    }

    public clickPreferencesIcon(): PreferencesCareerProfileModalPage {
        preferencesButton.click();
        return this.getPageClassInstance(PreferencesCareerProfileModalPage);
    }

    public searchForSkill(skillLabel: string, skillLevel: string): SkillsCareerProfileModalPage {
        this.skillOfLevelInput(skillLevel).fill(skillLabel);
        return this;
    }

    public searchForIntermediateSkill(skill: string): SkillsCareerProfileModalPage {
        intermediateSkillInput.fill(skill);
        return this;
    }

    public selectOptionFromSkillsDropdown(skill: string): SkillsCareerProfileModalPage {
        this.optionToSelect(skill).first().click();
        return this;
    }

    public selectLevelFromDropdown(level: string): SkillsCareerProfileModalPage {
        selectSkillLevel.selectOption(level);
        return this;
    }

    public addSkill(): SkillsCareerProfileModalPage {
        addSkill.click();
        return this;
    }

    public removeSkill(skill: string): SkillsCareerProfileModalPage {
        this.removeSkillButton(skill).click();
        return this;
    }

    public clickGoToExperienceButton(): PreferencesCareerProfileModalPage {
        goToExperienceButton.first().click();
        return this.getPageClassInstance(PreferencesCareerProfileModalPage);
    }

    public <T extends BasePage> clickCloseButton(claaz: Class<T>): T {
        closeButton.click();
        return this.getPageClassInstance(claaz);
    }

    public clickCloseButtonAndStaysInSkillsTab(): SkillsCareerProfileModalPage {
        closeButton.click();
        return this;
    }

    public clickSaveButton(): SkillsCareerProfileModalPage {
        saveButton.first().waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        saveButton.click();
        saveButton.first().waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        return this;
    }

    public clickSaveButtonAndGoBackToJobVacancyDetails(): JobVacancyDetailsPage {
        saveButton.first().waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        saveButton.click();
        return this.getPageClassInstance(JobVacancyDetailsPage);
    }

    public clickCloseButtonForSkillsPassport(): SkillsCareerProfileModalPage {
        closeButton.first().click();
        return this;
    }

    public clickCloseButtonStaysInSkillsCareerProfileModelPage(): SkillsCareerProfileModalPage {
        closeButton.click();
        return this;
    }

    public clickAddFirstSuggestedSkill(skillContainer: ResultContainer, skillLevel: string): SkillsCareerProfileModalPage {
        skillContainer.setValue(firstSuggestedSkillAddButton.textContent());
        this.repeatUntilElementToBeVisible(firstSuggestedSkillAddButton::click, skillLevelDropDown, 3, 1000, () =>{});
        this.skillLevelOption(skillLevel).click();
        return this;
    }

    public clickMoreSkills(resultContainer: ResultContainer): SuggestedSkillsModalPage {
        let pattern: Pattern = Pattern.compile("\\d+");
        let matcher: Matcher = pattern.matcher(moreSkillsButton.textContent());
      if(matcher.find(): ):  {
            resultContainer.setValue(matcher.group());
        }
        moreSkillsButton.click();
        return this.getPageClassInstance(SuggestedSkillsModalPage);
    }

    public clickSkipForNowButton(): SkillsToDevelopPage {
        this.page.waitForLoadState(LoadState.DOMCONTENTLOADED);
        this.page.waitForLoadState(LoadState.DOMCONTENTLOADED);
        this.pause(1000);
        skipForNow.first().waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        skipForNow.click();
        this.pause(2000);
        return this.getPageClassInstance(SkillsToDevelopPage);
    }

    public clickSaveAndContinueButton(): SkillsToDevelopPage {
        this.pause(2000);
        this.saveAndContinue().click();
        this.pause(2000);
        return this.getPageClassInstance(SkillsToDevelopPage);
    }

    public clickXButton(): WelcomePage_New {
        this.page.waitForLoadState(LoadState.DOMCONTENTLOADED);
        this.pause(1000);
        xButton.click();
        return this.getPageClassInstance(WelcomePage_New);
    }

    public clickXButtonAndGoToSkillPassport(): SkillsPassportMePage {
        xButton.click();
        return this.getPageClassInstance(SkillsPassportMePage);
    }

    public clickXButtonAndStayInModal(): SkillsCareerProfileModalPage {
        xButton.click();
        return this;
    }
}
