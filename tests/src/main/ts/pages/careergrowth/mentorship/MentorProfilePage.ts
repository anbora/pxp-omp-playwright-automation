import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator, Page, WaitForSelectorState } from "common/testing/playwright";

export class MentorProfilePage extends BasePage {

    public mentorProfileMentorTitleText: Locator = this.page.locator("//div//span[@class='om__mentorship-details-page--supporting-text' and text()= 'Mentor']");
    public availableToMentorToggle: Locator = this.page.locator("//button[contains(@class, 'om__mentorship-details-page--supporting-text') and @for='Available to Mentor']");
    public mentorProfileName(mentorName: string): Locator {
      return this.getLocatorWithParam("//div//a[@class='om__mentorship-details-page--user-meta-info-header-container-name' and text()='%s']", mentorName);
    }
    public mentorDetails: Locator = this.page.locator("//div//h2[@class='om__section--title m-margin-bottom' and text()='Mentor Details']");
    public mentorAboutSectionHeader: Locator = this.page.locator("//h2[@class='om__mentorship-details-page--section-title s-margin-bottom' and text()='About Mentor']");
    public mentorSkillsSectionHeader: Locator = this.page.locator("//h2[@class='om__section--title' and contains(text(),'Skills')]");
    public mentorProfileActionsDropdownButton: Locator = this.page.locator("//button[contains(@class, 'om__mentorship-details-page--supporting-text') and @for='Available to Mentor']/following-sibling::div[@class='ed-dropdown']//div[@class='dropdown-wrapper undefined']//button[@class='dropdown-btn']/i[@class='icon-ellipsis-h icon card-icon']");
    public mentorMentorshipStatus(statusName: string): Locator {
      return this.getLocatorWithParam("//div[contains(@class, 'om__mentorship-application-status--label') and text()='%s']", statusName);
    }
    public mentorProfileAvatar: Locator = this.page.locator("//div[@class='om__mentorship-details-page--user-meta-info-header-container m-margin-bottom']//img");
    public mentorProfileAction(actionName: string): Locator {
      return this.getLocatorWithParam("//div[@class='dropdown-content']//ul//li/button[text()='%s']", actionName);
    }
    public mentorEditMentorProfileHeader: Locator = this.page.locator("//div[@class='ed-dialog-modal-header']//h2[text()='Edit Mentor Profile']|//div[@class='ed-dialog-modal-header']//h1[text()='Edit Mentor Profile']");
    public mentorEditMentorProfileDescription: Locator = this.page.locator("//div[@id='mentorship-description']");
    public mentorRemoveSkillInEditMentorProfile(removeSkillName: string): Locator {
      return this.getLocatorWithParam("//div[@class='ed-skill-list']/div/button[@type='button' and @aria-label='%s']", removeSkillName);
    }
    public mentorSearchForSkillTxtBox: Locator = this.page.locator("//div[contains(@class,'ed-multi-select__input')]/input");
    public mentorSelectASkillFromSearchResults(skillName: string): Locator {
      return this.getLocatorWithParam("//div[contains(@class,'ed-multi-select__option') and text()='%s']", skillName);
    }
    public mentorEditProfileSaveButton: Locator = this.page.locator("//button[@class='ed-btn ed-btn-primary' and text()='Save Changes']");
    public mentorUserProfileInfo(userName: string): Locator {
      return this.getLocatorWithParam("//div[@class='profile-info']/h4[text()='%s']", userName);
    }
    public mentorProfileDescriptionText(descriptionText: string): Locator {
      return this.getLocatorWithParam("//div[@id='om__mentorship-details-page-description-show-more']//p[contains(text(),'%s')]", descriptionText);
    }
    public mentorEditMentorProfileLocationText(locationName: string): Locator {
      return this.getLocatorWithParam("//span[@class='become-a-mentor-modal--meta-detail-label' and text()='%s']", locationName);
    }
    public mentorLocationText(locationName: string): Locator {
      return this.getLocatorWithParam("//span[@class='om__sidebar-meta--label' and text()='%s']", locationName);
    }
    public mentorSkillLevelText(skillLevel: string): Locator {
      return this.getLocatorWithParam("//div[@class='ed-ui ed-single-skill-section']/label[text()='%s']", skillLevel);
    }
    public mentorSkillLevelAndNameText(skillLevel: string, skillName: string): Locator {
      return this.getLocatorWithParam("//div[@class='ed-ui ed-single-skill-section']/h3[text()='%s']/following-sibling::div[@class='ed-skill-list ed-close-btn']/div/span[text()='%s']", skillLevel, skillName);
    }

    public clickAvailableToMentorToggle(): MentorProfilePage {
        availableToMentorToggle.click();
        return this;
    }

    public clickMentorProfileAction(actionName: string): MentorProfilePage {
        mentorProfileActionsDropdownButton.click();
        this.mentorProfileAction(actionName).click();
        return this;
    }

    public removeExistingSkill(removeSkillName: string): MentorProfilePage {
        this.mentorRemoveSkillInEditMentorProfile(removeSkillName).click();
        return this;
    }

    public removeSkillIfExist(removeSkillName: string): MentorProfilePage {
        if (mentorRemoveSkillInEditMentorProfile(removeSkillName).isVisible()) {
            this.mentorRemoveSkillInEditMentorProfile(removeSkillName).click();
        }
        return this;
    }

    public searchAndAddASkill(skillName: string): MentorProfilePage {
        mentorSearchForSkillTxtBox.fill(skillName);
        this.mentorSelectASkillFromSearchResults(skillName).click();
        return this;
    }

    public clickMentorProfileActionsDropDown(): MentorProfilePage {
        mentorProfileActionsDropdownButton.click();
        return this;
    }

    public editMentorProfileDescription(descriptionText: string): MentorProfilePage {
        this.forceClear(mentorEditMentorProfileDescription);
        this.forceType(mentorEditMentorProfileDescription, descriptionText);
        return this;
    }

    public clickMentorEditProfileSaveButton(): MentorProfilePage {
        mentorEditProfileSaveButton.first().waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        mentorEditProfileSaveButton.click();
        return this;
    }

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }
}
