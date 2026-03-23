import { BasePage } from "common/BasePage";
import { ElementType } from "common/enums/ElementType";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { AriaRole, Browser, LoadState, Locator } from "common/testing/playwright";
import { CareerGrowthFiltersComponent } from "pages/careergrowth/careergrowth/components/CareerGrowthFiltersComponent";
import { MentorProfilePage } from "pages/careergrowth/mentorship/MentorProfilePage";
import { LandingPage } from "pages/landing/LandingPage";

export class MentorshipDiscoveryPage extends BasePage
        implements CareerGrowthFiltersComponent<MentorshipDiscoveryPage> {

    private static readonly FILTERS_SECTION: string = ".tm__opportunities-filters-container";
    private static readonly TOP_MENU_TABS: string = ".menu-items-wrapper";
    private static readonly CREATE_MENTOR_MODAL: string = ".become-a-mentor-modal";
    private static readonly MENTOR_CONFIRM_MODAL: string = ".become-a-mentor-confirmation-modal";
    private static readonly SKILL_ADD_MODAL: string = ".ed-dialog-modal-content";
    private static readonly SKILL_ADD_MODAL_FOOTER: string = ".ed-dialog-modal-footer";
    public allMentorsHeader: Locator = getByRole(AriaRole.HEADING, "All Mentors").build();
    public searchInputField: Locator = getByPlaceholder("Search here...").build();
    public searchIcon: Locator = getByRole(AriaRole.BUTTON, "Search").build().last();
    public sortByDropDownButton: Locator = this.page.locator("//div[@class='ed-input-container']");
    public filtersButton(): Locator {
      return this.aiLocator(FILTERS_SECTION, "//i[@class='icon-new-filter']/parent::button[@class = 'ed-btn ed-btn-neutral']", "Filters", ElementType.BUTTON);
    }
    public sortByDropDown: Locator = getByText("Sort By").locator("//..").getByRole(AriaRole.COMBOBOX).build();
    public homePageTab(): Locator {
      return this.aiLocator(TOP_MENU_TABS, "//li/child::a[text()='HOME']");
    }
    public filterButton(): Locator {
      return this.getByRole(AriaRole.BUTTON, "Filters").build();
    }
    public myMentorshipsButton: Locator = this.page.locator("//i[@class='icon-external-link']/parent::a[@class = 'ed-btn ed-btn-neutral']");
    public viewMyMentorProfileButton: Locator = this.page.locator("//div/div[@class='filter-header-cta-wrapper']/button");
    public becomeAMentorButton: Locator = this.page.locator("//button[@class='tm__mentorship-tab-primary-action-btn ed-btn ed-btn-primary' and text()='Become a Mentor']");

    public mentorCardMentorName(mentorName: string): Locator {

      return this.getLocatorWithParam("//div[@class='tm__mentorship-tab-all-mentorship-container']/descendant::div[text()='%s']", mentorName);

    }

    public mentorCardMain(mentorName: string): Locator {

      return this.getLocatorWithParam("//div[@class='tm__mentorship-tab-all-mentorship-container']/descendant::div[text()='%s']/parent::div/preceding-sibling::div/parent::div", mentorName);

    }

    public mentorCardActionsDropDownButton(mentorName: string): Locator {

      return this.getLocatorWithParam("//div[@class='tm__mentorship-tab-all-mentorship-container']/descendant::div//div[text()='%s']/../../../div[@class='tm__mentorship-card-header']/div[@class='ed-dropdown']//div//button", mentorName);

    }

    public mentorCardDropDownAction(actionName: string): Locator {

      return this.getLocatorWithParam("//ul[@class = 'tm__project-dropdown-list']/li/button[text()='%s']", actionName);

    }

    public mentorCardPositionMetaData(mentorName: string, positionName: string): Locator {

      return this.getLocatorWithParam("//div[@class='tm__mentorship-tab-all-mentorship-container']/descendant::div//div[text()='%s']/../../../div[@class='tm__mentorship-card-main']//div[@class='tm__mentorship-card-meta']/span[text()='%s']", mentorName, positionName);

    }

    public mentorCardSkillsMetaData(mentorName: string, skillName: string): Locator {

      return this.getLocatorWithParam("//div[@class='tm__mentorship-tab-all-mentorship-container']/descendant::div//div[text()='%s']/../../../div[@class='tm__mentorship-card-main']//div[@class='tm__mentorship-card-skills']//div//div//button[text()='%s']", mentorName, skillName);

    }

    public mentorCardRequestMentorshipButton(mentorName: string): Locator {

      return this.getLocatorWithParam("//div[@class='tm__mentorship-tab-all-mentorship-container']/descendant::div//div[text()='%s']/../../../div[@class='tm__mentorship-card-footer']//button[text()='Request Mentorship']", mentorName);

    }

    public allFiltersheader: Locator = this.page.locator("//div[@class='ed-dialog-modal-header']/h2[text()='All Filters']|//div[@class='ed-dialog-modal-header']/h1[text()='All Filters']");

    public mentorCardApplicationStatus(status: string): Locator {

      return this.getLocatorWithParam("//div[contains(@class, 'om__mentorship-application-status--label') and text()='%s']", status);

    }

    public filterValue(filterValue: string): Locator {

      return this.getLocatorWithParam("//span[@class='ed-checkbox-label ltr-direction' and text() = '%s']", filterValue);

    }

    public filterCancelButton: Locator = this.page.locator("//button[@class='ed-btn ed-btn-neutral' and text()='Cancel']");
    public filterApplyButton: Locator = this.page.locator("//button[@class='ed-btn ed-btn-primary' and text()='Apply']");
    public mentorRequestMentorshipModal: Locator = this.page.locator("//div[@class='ed-dialog-modal-header']/h1|//div[@class='ed-dialog-modal-header']/h2");
    public mentorRequestMentorshipModalMessageBox: Locator = this.page.locator("//div[@class='ed-input-container']/label/following-sibling::textarea");
    public mentorRequestMentorshipModalSubmitButton: Locator = this.page.locator("//div[@class='ed-dialog-modal-footer ']/button[@class='ed-btn ed-btn-primary']");

    public filterSearchTextField(filterHeader: string): Locator {

      return this.getLocatorWithParam("//legend[contains(@class,'filter-list__title')]/div[text()='%s']/../following-sibling::div/div/input", filterHeader);

    }

    public filterSelectValue(filterValue: string): Locator {

      return this.getLocatorWithParam("//input[@type='checkbox']/following-sibling::span[text()='%s']", filterValue);

    }

    public filterTitle(filterTitle: string): Locator {

      return this.getLocatorWithParam("//div/fieldset/legend[text()='%s']", filterTitle);

    }

    public filterTitleSecond(filterTitleSecond: string): Locator {

      return this.getLocatorWithParam("//div/fieldset/legend/div[text()='%s']", filterTitleSecond);

    }

    public searchResultsText(expectedResultsCount: string): Locator {

      return this.getLocatorWithParam("//div[@class='tm-filterbar__keyword' and text()='%s results for']", expectedResultsCount);

    }

    public searchFields(searchFieldText: string): Locator {

      return this.getLocatorWithParam("//div/div[text()='%s']/following-sibling::div/input", searchFieldText);

    }

    public timeZonesAndLanguagesFilterInput(sectionNumber: string): Locator {

      return this.getLocatorWithParam("//div/fieldset[%s][@class='opportunity-filter-modal-list']/div/div/div/div/div[text()='Search here...']/parent::div/div/input", sectionNumber);

    }

    public locationsAndDepartmentFilterInput(sectionNumber: string): Locator {

      return this.getLocatorWithParam("//div/fieldset[%s][@class='opportunity-filter-modal-list']/div/div/input", sectionNumber);

    }

    public locationsAndDepartmentFilterInputValue(locationAndDepartmentValue: string): Locator {

      return this.getLocatorWithParam("//li/label/span[text()='%s']/preceding-sibling::input", locationAndDepartmentValue);

    }

    public showMore(sectionNumber: string): Locator {

      return this.getLocatorWithParam("//fieldset[%s][@class='opportunity-filter-modal-list']/button[text()='Show More']", sectionNumber);

    }

    public languageAndTimeZoneInputValue(languageAndTimezoneValue: string): Locator {

      return this.getLocatorWithParam("//div[text()='%s']", languageAndTimezoneValue);

    }

    public filterValueSelect(filterValue: string): Locator {

      return this.getLocatorWithParam("//div[text()='%s']", filterValue);

    }

    public filterValueSecondSelect(filterSecondValue: string): Locator {

      return this.getLocatorWithParam("//span[text()='%s']/parent::label", filterSecondValue);

    }

    public filterPanel: Locator = this.page.locator("//div[@class='tm-filterbar__activefilters']");

    public addSkillsToSkillPassportLink(): Locator {

      return this.aiLocator(CREATE_MENTOR_MODAL, "//a[normalize-space()='Add Skills to Skills Passport']");

    }

    public skillRadioButton(): Locator {

      return this.aiLocator(SKILL_ADD_MODAL, "//span[text()='Skill']");

    }

    public skillInput(): Locator {

      return this.aiLocator(SKILL_ADD_MODAL, "//input[@id='skill-skill']");

    }

    public skillLevelField(): Locator {

      return this.aiLocator(SKILL_ADD_MODAL, "//select[@id='skill_level']");

    }

    public saveSkillsButton(): Locator {

      return this.aiLocator(SKILL_ADD_MODAL_FOOTER, "//button[@id='submit-skills']");

    }

    public addMoreButton: Locator = this.page.locator("//div[@class='m-margin-right']/child::button[@aria-label='Add More Skill/Credential']");

    public filtersInMyMentorsTab: Locator = locator("//div[@class='dropdown-wrapper ed-filter-with-radio-select']").build();
    public requestMentorship(mentorName: string): Locator {
      return this.getByLabel(mentorName).build().first();
    }
    public readonly myMenteesTab: Locator = locator("//ul[@class='left-navigation mb-16']/li[2]/button[@role='listitem']").build();
    public readonly myMentorsTab: Locator = locator("//ul[@class='left-navigation mb-16']/li[3]/button[@role='listitem']").build();
    public createProfileButton: Locator = locator("//div[@class='me__mentorships']/div/div/div/div/button").build();
    public createProfileButtonFromModal: Locator = getByRole(AriaRole.BUTTON, "Create Profile").build();
    public optionToSelect(skill: string): Locator {
      return this.getLocatorWithParam("//div[@tabindex = '-1'][contains(text(), '%s')]", skill);
    }
    public skillSelect(): Locator {
      return this.aiLocator(CREATE_MENTOR_MODAL,"//input[@id='mentorship-skills']");
    }
    public descriptionField(): Locator {
      return this.aiLocator(CREATE_MENTOR_MODAL,"//div[@id='mentorship-description']");
    }
    public createProfileButton(): Locator {
      return this.aiLocator(CREATE_MENTOR_MODAL,"//button[text()='Create Profile']");
    }
    public createdMentorProfileText(): Locator {
      return this.aiLocator(MENTOR_CONFIRM_MODAL,"//h1[text()='Mentor Profile Created']");
    }
    public closeMentorProfileCreatedButton: Locator = getByRole(AriaRole.BUTTON, "Close Mentor Profile Created").build();
    public readonly mentorFilterLocation: Locator = getByLabel("Locations").build();
    public mentorProfileLocation: Locator = getByText("Location").build();

    public clickMentorCard(mentorName: string): MentorshipDiscoveryPage {
        this.mentorCardMain(mentorName).click();
        return this;
    }

    public submitMentorshipRequestWithMessage(message: string): MentorshipDiscoveryPage {
        mentorRequestMentorshipModalMessageBox.fill(message);
        mentorRequestMentorshipModalSubmitButton.click();
        return this;
    }

    public clickMentorCardDropdownAction(mentorName: string, actionName: string): MentorProfilePage {
        this.mentorCardActionsDropDownButton(mentorName).click();
        this.mentorCardDropDownAction(actionName).click();
        return this.getPageClassInstance(MentorProfilePage);
    }

    public clickMentorCardDropdown(mentorName: string): MentorshipDiscoveryPage {
        this.mentorCardActionsDropDownButton(mentorName).click();
        return this;
    }

    public clickMentorCardRequestMentorshipButton(mentorName: string): MentorshipDiscoveryPage {
        this.mentorCardRequestMentorshipButton(mentorName).click();
        return this;
    }

    public clickViewMyMentorProfileButton(): MentorshipDiscoveryPage {
        viewMyMentorProfileButton.click();
        return this;
    }

    public clickMyMentorshipsButton(): MentorshipDiscoveryPage {
        myMentorshipsButton.click();
        return this;
    }

    public clickApplyButtonFiltersModal(): MentorshipDiscoveryPage {
        filterApplyButton.click();
        return this;
    }

    public searchAndApplyFilterValue(FilterHeader: string, filterValue: string): MentorshipDiscoveryPage {
        this.filterSearchTextField(FilterHeader).fill(filterValue);
        this.filterSelectValue(filterValue).click();
        return this;
    }

    public clickCancelButtonFiltersModal(): MentorshipDiscoveryPage {
        filterCancelButton.click();
        return this;
    }

    public clickAndFillLanguageAndTimezonesFilter(sectionNumber: string, languageAndTimezoneValue: string): MentorshipDiscoveryPage {
        this.timeZonesAndLanguagesFilterInput(sectionNumber).click();
        this.timeZonesAndLanguagesFilterInput(sectionNumber).fill(languageAndTimezoneValue);
        this.languageAndTimeZoneInputValue(languageAndTimezoneValue).click();
        return this;
    }

    public clickAndFillLocationsAndDepartmentFilter(sectionNumber: string, locationAndDepartmentValue: string): MentorshipDiscoveryPage {
        this.locationsAndDepartmentFilterInput(sectionNumber).click();
        this.locationsAndDepartmentFilterInput(sectionNumber).fill(locationAndDepartmentValue);
        this.locationsAndDepartmentFilterInputValue(locationAndDepartmentValue).click();
        return this;
    }

    public clickAndFillFilter(filterDefaultText: string, filterValue: string, filterValueSelect: string): MentorshipDiscoveryPage {
        this.searchFields(filterDefaultText).click();
        this.searchFields(filterDefaultText).fill(filterValue);
        this.filterValueSelect(filterValueSelect).click();
        return this;
    }

    public selectDivisionFilter(divisionFilter: string): MentorshipDiscoveryPage {
        this.filterValueSecondSelect(divisionFilter).click();
        return this;
    }

    public selectLegalUnitFilter(LegalUnitFilter: string): MentorshipDiscoveryPage {
        this.filterValueSecondSelect(LegalUnitFilter).click();
        return this;
    }

    public goToLandingPage(): LandingPage {
        this.homePageTab().click();
        return this.getPageClassInstance(LandingPage);
    }

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public clickBecomeAMentor(): MentorshipDiscoveryPage {
        becomeAMentorButton.click();
        return this;
    }

    public addSkillsToSkillPassport(shortSkillName: string, skillFullName: string, skillLevel: string): MentorshipDiscoveryPage {
        this.addSkillsToSkillPassportLink().click();
        addMoreButton.click();
        this.skillRadioButton().click();
        this.skillInput().fill(shortSkillName);
        this.page.waitForLoadState(LoadState.DOMCONTENTLOADED);
        this.optionToSelect(skillFullName).first().click();
        this.skillLevelField().selectOption(skillLevel);
        this.saveSkillsButton().click();
        return this;
    }

    public addSkillsAndDescription(shortSkillName: string, skillFullName: string, description: string): MentorshipDiscoveryPage {
        this.skillSelect().fill(shortSkillName);
        this.page.waitForLoadState(LoadState.DOMCONTENTLOADED);
        this.optionToSelect(skillFullName).first().click();
        this.descriptionField().clear();
        this.descriptionField().fill(description);
        this.page.keyboard().press("Backspace");
        return this;
    }

    public clickOnCreateProfileButton(): MentorshipDiscoveryPage {
        createProfileButton.click();
        this.pause(3000);
        return this;
    }

    public clickOnCreateProfileButtonFromModalPage(): MentorshipDiscoveryPage {
        createProfileButtonFromModal.click();
        this.pause(3000);
        return this;
    }

    public clickOnCloseMentorProfileButton(): MentorshipDiscoveryPage {
        closeMentorProfileCreatedButton.click();
        this.pause(3000);
        return this;
    }

    public getP(): MentorshipDiscoveryPage {

      return this;
    }

    public clickMyMentorsTab(): MentorshipDiscoveryPage {
        myMentorsTab.click();
        return this;
    }

    public clickFiltersInMyMentorsTab(): MentorshipDiscoveryPage {
        filtersInMyMentorsTab.click();
        return this;
    }

    public clickRequestMentorship(mentorName: string): MentorshipDiscoveryPage {
        this.requestMentorship(mentorName).first().click();
        return this.getPageClassInstance(MentorshipDiscoveryPage);
    }
}
