import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { AriaRole, Browser, Locator } from "common/testing/playwright";
import { UserModel } from "models/user/UserModel";
import { CompleteYourProfileAddSkillsModalPage } from "pages/newprofile/CompleteYourProfileAddSkillsModalPage";
import { NewProfileContactInfoModalPage } from "pages/newprofile/NewProfileContactInfoModalPage";
import { NewProfileFollowingModalPage } from "pages/newprofile/NewProfileFollowingModalPage";
import { NewProfileOrganizationTreeModalPage } from "pages/newprofile/NewProfileOrganizationTreeModalPage";
import { NewProfileShowMoreDetailModalPage } from "pages/newprofile/NewProfileShowMoreDetailModalPage";
import { NewProfileSkillPage } from "pages/newprofile/skills/NewProfileSkillPage";

export class NewProfilePage extends BasePage {
  static pageModel = { pageName: "New Profile Page", url: "/me/overview" };
    public username(user: UserModel): Locator {
      return this.getLocatorWithParam("//div[contains(@class, 'profile-info')]/h1[contains(text(), '%s')]", user.name);
    }

    public followersButton: Locator = getByRole(AriaRole.BUTTON, "Followers").build();
    public followingButton: Locator = getByRole(AriaRole.BUTTON, "Following").build();
    public showOrganizationButton: Locator = getByRole(AriaRole.BUTTON, "Show organization").build();
    public contactInfoButton: Locator = getByRole(AriaRole.BUTTON, "Contact Info").build();
    public showMoreDetailButton: Locator = getByRole(AriaRole.BUTTON, "Show more detail").build();
    public privateToYouSwitch: Locator = this.page.locator("//span[contains(text(),'Private to you')]");
    public privateToYouIconForContactInfoModal: Locator = this.page.locator("//button[contains(text(),'Contact Info')]/following-sibling::div");
    public privateToYouIconForShowMoreDetailModal: Locator = this.page.locator("//button[contains(text(),'Show more detail')]/following-sibling::div");
    public organizationTree: Locator = this.page.locator("//button[@class='organization-tree-member-info-user-name']");
    public addProfileSectionButton: Locator = this.page.locator("//button[contains(text(),'Add profile section')]");
    public pencilIcon: Locator = this.page.locator("//i[@class='icon-pencil']");
    public viewPublicProfileButton: Locator = getByRole(AriaRole.BUTTON, "View Public Profile").build();
    public exitPublicProfileButton: Locator = getByRole(AriaRole.BUTTON, "Exit Public Profile").build();
    public addYourSkillsButtonInCompleteYourProfile: Locator = getByRole(AriaRole.BUTTON, "Add your skills").build();
    public mentorProfileButton: Locator = getByRole(AriaRole.BUTTON, "Mentor profile").build();
    public skillsTab: Locator = this.page.locator("//button[text() = 'Skills']");

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public clickFollowingButton(): NewProfileFollowingModalPage {
        followingButton.click();
        return this.getPageClassInstance(NewProfileFollowingModalPage);
    }

    public clickFollowersButton(): NewProfileFollowingModalPage {
        followersButton.click();
        return this.getPageClassInstance(NewProfileFollowingModalPage);
    }
    public clickShowOrganizationButton(): NewProfileOrganizationTreeModalPage {
        showOrganizationButton.click();
        return this.getPageClassInstance(NewProfileOrganizationTreeModalPage);
    }

    public clickContactInfoButton(): NewProfileContactInfoModalPage {
        contactInfoButton.click();
        return this.getPageClassInstance(NewProfileContactInfoModalPage);
    }

    public clickShowMoreDetailButton(): NewProfileShowMoreDetailModalPage {
        showMoreDetailButton.click();
        return this.getPageClassInstance(NewProfileShowMoreDetailModalPage);
    }

    public clickPublicProfileButton(): NewProfilePage {
        viewPublicProfileButton.click();
        return this;
    }

    public clickExitPublicProfileButton(): NewProfilePage {
        exitPublicProfileButton.click();
        return this;
    }

    public clickAddYourSkillsButton(): CompleteYourProfileAddSkillsModalPage {
        addYourSkillsButtonInCompleteYourProfile.click();
        return this.getPageClassInstance(CompleteYourProfileAddSkillsModalPage);
    }

    public openSkillTab(): NewProfileSkillPage {
        skillsTab.click();
        this.pause(5000);
        this.page.waitForLoadState();
        return this.getPageClassInstance(NewProfileSkillPage);
    }

}
