import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, LoadState, Locator, Page, WaitForSelectorState } from "common/testing/playwright";
import { VacanciesListPage_New } from "pages/careergrowth/careergrowth/VacanciesListPage_New";
import { EditJobDiscardChangesModalPage } from "pages/careergrowth/jobs/EditJobDiscardChangesModalPage";
import { Interface1 } from "pages/careergrowth/jobs/Interface1";
import { Interface2 } from "pages/careergrowth/jobs/Interface2";
import { JobVacancyDetailsPage } from "pages/careergrowth/jobs/JobVacancyDetailsPage";
import { MyOpportunitiesPage } from "pages/careergrowth/jobs/MyOpportunitiesPage";
import { ProficiencySkillsLevelsHandler } from "pages/handlers/ProficiencySkillsLevelsHandler";

export class EditJobVacancyPage extends BasePage implements Interface1, Interface2{

    public static readonly BEGINNER: number = 1;
    public static readonly INTERMEDIATE: number = 2;
    public static readonly ADVANCED: number = 3;
    public static readonly REMOVE_ICON_CSS: string = "div.ed-multi-select__multi-value__remove";
    public static readonly SKILL_INPUT_CSS: string = ".ed-multi-select__input";
    public static readonly FORM: string = "#menuContent";
    public static readonly LONG_TIMEOUT_AFTER_SAVE: number = 60000;
    public emptySkillInput: Locator = this.page.locator("//div[contains(text(), 'Search Skills...')]");
    public emptySkillInput_SkillLevel: Locator = this.page.locator("//div[contains(text(), 'Search Skills')]");
    public emptyRoleInput: Locator = this.page.locator("//div[2]/div[@role='application']/div/div/div[1]/div[2]");
    public emptyJobRoleInput: Locator = this.page.locator("//div[@id='react-select-3-listbox']/div[1]");
    public skillInput: Locator = this.page.locator("#job-skills");
    public skillInputNew: Locator = this.page.locator("//div[@class='skill-container']//div[@role='application']/div/div/div[1]/div[2]");
    public skillInputNewSelect: Locator = this.page.locator("//div[text()='football manager']");
    public skillLevelSelect: Locator = this.page.locator("//div[@class='level-select-input']/descendant::select");
    public addButton: Locator = this.page.locator("//button[text()='Add']");
    public allRemoveSkillButtons: Locator = this.page.locator("//div[contains(@class, 'ed-skill-section')]/descendant::button");
    public pageTitle: Locator = this.page.locator("//h1[contains(text(), 'Edit Job Vacancy')] | //h1[contains(text(), 'Edit Vacancy')]");
    public optionToSelect(value: string): Locator {
      return this.getLocatorWithParam("//div[@tabindex = '-1'][text()='%s']", value);
    }
    public skillChips(): Locator {
      return this.aiLocator(FORM, "//ul[contains(@class,'ed-skill-list')]/descendant::div/child::span/following-sibling::span");
    }
    public saveButton: Locator = this.page.locator("//div[@class='job-form-footer-actions']/descendant::button[contains(text(), 'Save')]");
    public cancelButton: Locator = this.page.locator("//div[@class='job-form-footer-actions']/descendant::button[contains(text(), 'Cancel')]");
    public skillPlaceholder: Locator = this.page.locator("div.ed-multi-select__placeholder");
    public Locator removeCertainSkill(String skillLabel){ return this.getLocatorWithParam("//div[contains(@class,'ed-multi-select__multi-value__label')][text()='%s']/parent::div/div[contains(@class, 'ed-multi-select__multi-value__remove')]", skillLabel); };
    public suggestedSkills: Locator = this.page.locator(".suggested-skills");
    public Locator suggestedSkillLevel(int level){ return this.getLocatorWithParam("//div[@class='dropdown-content']//li[@id='%s']", String.valueOf(level)); };
    public proficencyLevelsHeaders: Locator = this.page.locator(".ed-skill-section h3.ed-input-title");
    public dropdownSelect(jobFamilyAndRoleName: string): Locator {
      return this.getLocatorWithParam("//div[contains(@class, 'option')][text() = '%s']", jobFamilyAndRoleName);
    }

    private proficiencySkillsLevelsHandler: ProficiencySkillsLevelsHandler = new ProficiencySkillsLevelsHandler(page);

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    private addSkill(skillValue: string, skillInput: Locator): EditJobVacancyPage {
        this.page.waitForLoadState();
        this.page.locator("#job-form-header").click();
        this.pause(2000);
        skillInput.click();
        skillInput.fill(skillValue);
//        cy.wait(5000)
        this.optionToSelect(skillValue).click();
        return this;
    }

    public addSkillWithLevel(skillValue: string, skillLevel: string): EditJobVacancyPage {
        this.page.waitForLoadState();
        this.page.locator("#job-form-header").click();
        this.pause(1000);
        skillInputNew.click();
        this.page.keyboard().type(skillValue);
        skillInputNewSelect.click();
        skillLevelSelect.selectOption(skillLevel);
        addButton.click();
        return this;
    }

    public addSkill(skillValue: string): EditJobVacancyPage {

      return addSkill(skillValue, skillInput);

    }

    public addBeginnerSkill(skillValue: string): EditJobVacancyPage {

      return addSkill(skillValue, skillContainer(BEGINNER).locator(SKILL_INPUT_CSS));

    }

    public addIntermediateSkill(skillValue: string): EditJobVacancyPage {

      return addSkill(skillValue, skillContainer(INTERMEDIATE).locator(SKILL_INPUT_CSS));

    }

    public addAdvancedSkill(skillValue: string): EditJobVacancyPage {

      return addSkill(skillValue, skillContainer(ADVANCED).locator(SKILL_INPUT_CSS));

    }

    public addSkillToProficiencyLevel(skillName: string, level: string): EditJobVacancyPage {
        proficiencySkillsLevelsHandler.addSkillToLevel(skillName, level);
        return this;
    }

    public addJobRole(jobRoleName: string, jobFamilyAndRoleName: string): EditJobVacancyPage {
        emptyRoleInput.click();
        emptyRoleInput.pressSequentially(jobRoleName);
        this.dropdownSelect(jobFamilyAndRoleName).click();
        return this;
    }

    public removeSkill(skillValue: string): EditJobVacancyPage {
        this.removeSkillButton(skillValue).click();
        return this;
    }

	private removeAllSkills(skillsToRemove: Locator): EditJobVacancyPage {
        this.page.waitForLoadState();
        this.pause(2000);
        try {
            if (skillsToRemove.first().isVisible()) {
                this.repeatUntilElementToBeNotVisible(
                        () => {
                            skillsToRemove.first().click();
                            this.page.waitForLoadState();
                        },
                        skillsToRemove,
                        50,
                        250,
                        () => {
                            this.page.waitForLoadState(LoadState.DOMCONTENTLOADED);
                        });
            }
        } catch (e) {
            //empty line
        }
        return this;
    }

    public removeAllSkills(): EditJobVacancyPage {
        this.pause(10000);
        return this.removeAllSkills(allRemoveSkillButtons);
    }

    public removeAllBeginnerSkills(): EditJobVacancyPage {

      return removeAllSkills(skillContainer(BEGINNER).locator(REMOVE_ICON_CSS));

    }
    public removeAllIntermediateSkills(): EditJobVacancyPage {
      return removeAllSkills(skillContainer(INTERMEDIATE).locator(REMOVE_ICON_CSS));
    }

    public removeAllAdvancedSkills(): EditJobVacancyPage {

      return removeAllSkills(skillContainer(ADVANCED).locator(REMOVE_ICON_CSS));

    }

    public removeSingleSkill(skillLabel: string): EditJobVacancyPage {
        this.removeCertainSkill(skillLabel).click();
        return this;
    }

    public removeSkillFromLevel(skillLabel: string, level: string): EditJobVacancyPage {
        proficiencySkillsLevelsHandler.removeSkillFromLevel(skillLabel, level);
        return this;
    }

    private addSuggestedSkillToLevel(skillLabel: string, level: number): EditJobVacancyPage {
        suggestedSkills.locator(String.format("//div[text()='%s']", skillLabel)).waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        this.repeatUntilElementToBeVisible(() =>suggestedSkills.locator(String.format("//div[text()='%s']/button", skillLabel)).click(), this.page.locator(".dropdown-content"), 3, 2000, () =>{});
        this.suggestedSkillLevel(level).click();
        return this;
    }

    public addSuggestedSkillToBeginnerLevel(skillLabel: string): EditJobVacancyPage {

      return addSuggestedSkillToLevel(skillLabel, BEGINNER-1);

    }

    public addSuggestedSkillToIntermediateLevel(skillLabel: string): EditJobVacancyPage {

      return addSuggestedSkillToLevel(skillLabel, INTERMEDIATE-1);

    }

    public addSuggestedSkillToAdvancedLevel(skillLabel: string): EditJobVacancyPage {

      return addSuggestedSkillToLevel(skillLabel, ADVANCED-1);

    }

	public clickSaveButton(): JobVacancyDetailsPage {
        this.pause(2000);
        this.page.waitForLoadState();
        saveButton.click();
//        repeatUntilElementToBeNotVisible(() => saveButton.click(), saveButton, 5000, 5, () => {});
        this.page.waitForLoadState();
        this.page.locator(".tm-carousel__header__left__title").waitFor(new Locator.WaitForOptions().setTimeout(LONG_TIMEOUT_AFTER_SAVE).setState(WaitForSelectorState.VISIBLE));
        this.pause(1000);
        return this.getPageClassInstance(JobVacancyDetailsPage);
    }

	public clickSaveButtonAndGoBackToMyOpportunitiesPage(): MyOpportunitiesPage {
        saveButton.click();
        this.page.waitForLoadState();
        return this.getPageClassInstance(MyOpportunitiesPage);
    }

	public clickSaveButtonAndGoBackToCareerGrowthPage(): VacanciesListPage_New {
        saveButton.click();
        return this.getPageClassInstance(VacanciesListPage_New);
    }

	public clickCancelButton(): EditJobDiscardChangesModalPage {
        cancelButton.click();
        return this.getPageClassInstance(EditJobDiscardChangesModalPage);
    }

    public getP(): Page {

      return getPage();

    }
}
