// @ts-nocheck
import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { AriaRole, Browser, Locator } from "common/testing/playwright";
import { GroupDetailsPage } from "pages/groups/GroupDetailsPage";

export class EditGroupPage extends BasePage {
  static pageModel = { pageName: "Edit Group Page", url="" };

    public languageToSelect(langCode: string): Locator {

      return this.getLocatorWithParam("//div[@role='menuitemcheckbox' and @aria-labelledby='pl_label']/descendant::label", langCode);

    }
    public addLanguagesButton: Locator = this.page.locator("//div[@class='ed-input-container']/descendant::button/descendant::span[@alt='Add Language']");
    public selectLanguagesDropdown: Locator = this.page.locator("//input[@name='multi-lang-section']/following-sibling::div");
    public selectLanguagesDropdownExpanded: Locator = this.page.locator("//input[@name='multi-lang-section']/following-sibling::div[1]");
    public accordion(language: string): Locator {
      return this.getByRole(AriaRole.BUTTON, language);
    }
    public groupNameInAccordion: Locator = this.page.locator("//div[@class='accordion-item ed-details']/descendant::input[@placeholder='Enter Group Name here']");
    public groupDescriptionInAccordion: Locator = this.page.locator("//div[@class='accordion-item ed-details']/descendant::textarea[@placeholder='Enter Group description here']");
    public defaultLanguageSelectInModal: Locator = this.page.locator("//select[@class='ed-select']");
    public addLanguageButtonInModal: Locator = this.page.locator("#save-goal-btn");
    public updateGroupButton: Locator = this.page.locator("//button[text()='Update Group']");

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public clickAddLanguagesButton(): EditGroupPage {
        addLanguagesButton.click();
        return this;
    }

    public addLanguages(langCode: string): EditGroupPage {
        selectLanguagesDropdown.click();
        this.languageToSelect(langCode).click();
        return this;
    }

    public clickSelectLanguageDropdown(): EditGroupPage {
        selectLanguagesDropdownExpanded.click();
        return this;
    }

    public openAccordion(language: string): EditGroupPage {
        this.pause(DEFAULT_TIMEOUT);
        this.accordion(language).click();
        return this;
    }

    public fillInGroupNameInAccordion(name: string): EditGroupPage {
        groupNameInAccordion.fill(name);
        return this;
    }
    public fillInGroupDescriptionInAccordion(description: string): EditGroupPage {
        groupDescriptionInAccordion.fill(description);
        return this;
    }

    public changeDefaultLanguage(language: string): EditGroupPage {
        defaultLanguageSelectInModal.selectOption(language);
        return this;
    }

    public clickAddLanguageInModal(): EditGroupPage {
        addLanguageButtonInModal.click();
        return this;
    }

    public clickUpdateGroupButton(): GroupDetailsPage {
        updateGroupButton.click();
        return this.getPageClassInstance(GroupDetailsPage);
    }

}
