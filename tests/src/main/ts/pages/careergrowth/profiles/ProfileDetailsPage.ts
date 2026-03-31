// @ts-nocheck
import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { AriaRole, Browser, Locator } from "common/testing/playwright";
import { CareerPathPage_New } from "pages/careergrowth/careergrowth/CareerPathPage_New";
import { ChangeRoleAndFamilyModalPage } from "pages/careergrowth/profiles/ChangeRoleAndFamilyModalPage";
import { PreferencesCareerProfileModalPage } from "pages/careergrowth/profiles/PreferencesCareerProfileModalPage";

export class ProfileDetailsPage extends BasePage {

    public careerPreferencesTab: Locator = this.getByRole(AriaRole.TAB, "Career Preferences");
    public addJobFamilyAndRole: Locator = this.getByRole(AriaRole.BUTTON, "Add Job Family & Role");
    public changeJobFamilyAndRole: Locator = this.page.locator("//span[text() = 'Change Job Family & Role']");
    public jobTitle: Locator = this.page.locator("//input[@placeholder = 'Job Title']");
    public saveButton: Locator = this.page.locator("button.create");
    public editProfileButton: Locator = this.page.locator("//button/span[text() = 'Edit Profile']");
    public editBannerImageButton: Locator = this.page.locator("//button[text()='Change Banner Image']");
    public removeBannerButton: Locator = this.page.locator("//button[text()='Remove Banner']");
    public readonly backButton: Locator = this.page.locator("//span[text()='Back']");
    public readonly yesButtonInModal: Locator = this.page.locator("//button[@label='Yes']");
    public currentRoleName(roleName: string): Locator {
      return this.getLocatorWithParam("//div[text() = '%s']", roleName);
    }
    public bannerImageLink(fileName: string): Locator {
      return this.getLocatorWithParam("//img[contains(@src, '%s')]", fileName);
    }
    public selectLocation: Locator = this.locator(".ed-multi-select__input");
    public dropdownSelect(organizationUnitTypeDropdown: string): Locator {
      return this.getLocatorWithParam("//div[contains(@class, 'option')][text() = '%s']", organizationUnitTypeDropdown);
    }
    public readonly userProfileLocation: Locator = this.getByText("Location");

	public goToCareerPreferencesTab(): PreferencesCareerProfileModalPage {
        careerPreferencesTab.click();
        return this.getPageClassInstance(PreferencesCareerProfileModalPage);
    }

	public clickAddJobFamilyAndRoleButton(): ChangeRoleAndFamilyModalPage {
        addJobFamilyAndRole.click();
        return this.getPageClassInstance(ChangeRoleAndFamilyModalPage);
    }

	public clickChangeJobFamilyAndRoleButton(): ChangeRoleAndFamilyModalPage {
        changeJobFamilyAndRole.click();
        return this.getPageClassInstance(ChangeRoleAndFamilyModalPage);
    }

	public clickEditProfileButton(): ProfileDetailsPage {
        editProfileButton.click();
        return this;
    }

    public fillInJobTitle(jobTitleValue: string): ProfileDetailsPage {
        jobTitle.fill(jobTitleValue);
        return this;
    }

	public clickSaveButton(): ProfileDetailsPage {
        saveButton.click();
        this.pause(3000);
        return this;
    }

    public clickEditBannerImageButton(): ProfileDetailsPage {
        editBannerImageButton.click();
        return this;
    }
    public uploadBannerImage(filePath: string): ProfileDetailsPage {
      return uploadBannerImage(filePath, removeBannerButton, ProfileDetailsPage);
    }

    public clickBackButton(): CareerPathPage_New {
        backButton.click();
        return this.getPageClassInstance(CareerPathPage_New);
    }

    public clickRemoveBannerButton(): ProfileDetailsPage {
        removeBannerButton.click();
        return this;
    }

    public confirmBannerRemoval(): ProfileDetailsPage {
        yesButtonInModal.click();
        return this;
    }

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public clickAddLocation(Location: string): ProfileDetailsPage {
        selectLocation.click();
        selectLocation.fill(Location);
        this.dropdownSelect(Location).click();
        return this;
    }
}
