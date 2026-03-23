import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, LoadState, Locator } from "common/testing/playwright";
import { MentorProfilePage } from "pages/careergrowth/mentorship/MentorProfilePage";
import { ProjectsMePage } from "pages/careergrowth/project/ProjectsMePage";
import { CreateMentorProfileModalPage } from "pages/me/CreateMentorProfileModalPage";

export class MyMentorshipPage extends BasePage {

    public readonly myMenteesTab: Locator = this.page.locator("//button[text()='My Mentees']");
    public readonly myMentorsTab: Locator = this.page.locator("//button[text()='My Mentors']");
    public readonly viewMyMentorProfileButton: Locator = this.page.locator("//button[@class='ed-btn ed-btn-neutral header-cta' and text()='View My Mentor Profile']");
    public readonly filtersDropDownButton: Locator = this.page.locator("//button[@class='dropdown-btn']/span[text()]");
    public filterOptions(filterName: string): Locator {
      return this.getLocatorWithParam("//div[@class='dropdown-content']/fieldset/label/div/input[@id='%s']", filterName);
    }
    public readonly filterApplyButton: Locator = this.page.locator("//button[@class='ed-btn ed-btn-primary action-button' and text()='Apply']");
    public mentorCardActionsDropDownButton(mentorName: string): Locator {
      return this.getLocatorWithParam("//div[@class='tm__mentorship-card-main']//div//div[text()='%s']/../../../div[@class='tm__mentorship-card-header']/div[@class='ed-dropdown']", mentorName);
    }
    public mentorCardDropDownAction(mentorName: string, actionName: string): Locator {
      return this.getLocatorWithParam("//div[@class='tm__mentorship-card-main']//div//div[text()='%s']/../../../div[@class='tm__mentorship-card-header']/div[@class='ed-dropdown']//div//div//ul/li[text()='%s']", mentorName, actionName);
    }
    public mentorStatus(mentorName: string, statusName: string): Locator {
      return this.getLocatorWithParam("//div[@class='tm__mentorship-card-main']//div//div[text()='%s']/../../../div[@class='tm__mentorship-card-footer']//div[text()='%s']", mentorName, statusName);
    }
    public mentorCardMain(mentorName: string): Locator {
      return this.getLocatorWithParam("//div[@class='tm__mentorship-card-name']//div[text()='%s']/parent::div/preceding-sibling::div/parent::div", mentorName);
    }
    public mentorViewMessageButton(mentorName: string): Locator {
      return this.getLocatorWithParam("//div[@class='tm__horizontal-mentorship-card cursor-pointer tm__horizontal-project-card']//div//div[text()='%s']/following-sibling::button[text()='View message']", mentorName);
    }
    public mentorApplicationStatusText(mentorName: string, applicationStatus: string): Locator {
      return this.getLocatorWithParam("//div[@class='tm__horizontal-mentorship-card cursor-pointer tm__horizontal-project-card']//div//div[contains(text(),'%s')]/../div/following-sibling::div[text()='%s']", mentorName, applicationStatus);
    }
    public readonly viewCommentModal: Locator = this.page.locator("//div//h2[text()='View Comment']");
    public viewCommentModalButton(buttonName: string): Locator {
      return this.getLocatorWithParam("//div[@class='ed-dialog-modal-footer ']/button[text()='%s']", buttonName);
    }
    public mentorAcceptRejectButton(mentorName: string, buttonName: string): Locator {
      return this.getLocatorWithParam("//div[@class='tm__horizontal-mentorship-card cursor-pointer tm__horizontal-project-card']//div//div[contains(text(),'%s')]/../following-sibling::div/div/button[text()='%s']", mentorName, buttonName);
    }
    public mentorCardUserName(mentorName: string): Locator {
      return this.getLocatorWithParam("//div[@class='tm__horizontal-mentorship-card cursor-pointer tm__horizontal-project-card']//div//div[contains(text(),'%s')]", mentorName);
    }
    public myMentorshipsPageLoad: Locator = this.page.locator("//div[@class='me__mentorships-container']");
    public card: Locator = this.page.locator("//div[@class='me__mentorships-mentorship-cards-container']");
    public sureToRejectButton: Locator = this.page.locator("//div/button[text()='Yes, reject']");
    public mentorName(mentorNameText: string): Locator {
      return this.getLocatorWithParam("//div[text()='%s']",mentorNameText);
    }

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public clickMyMenteesTab(): MyMentorshipPage {
        myMenteesTab.click();
        return this;
    }

    public clickMyMentorsTab(): MyMentorshipPage {
        myMentorsTab.click();
        return this;
    }

    public clickYesRejectButton(): MyMentorshipPage {
        sureToRejectButton.click();
        return this;
    }

    public clickViewMyMentorProfileButton(): MentorProfilePage {
        viewMyMentorProfileButton.click();
        return this.getPageClassInstance(MentorProfilePage);
    }

    public clickMentorCardDropdownAction(mentorName: string, actionName: string): MyMentorshipPage {
        this.mentorCardActionsDropDownButton(mentorName).click();
        this.mentorCardDropDownAction(mentorName, actionName).click();
        return this;
    }

    public selectAFilterOption(filtername: string): MyMentorshipPage {
        filtersDropDownButton.click();
        this.filterOptions(filtername).click();
        filterApplyButton.click();
        return this;
    }

    public waitForMentorshipCardToBeVisible(): MyMentorshipPage {
        this.repeatUntilElementToBeVisible(() => {
            this.refreshCurrentPage(ProjectsMePage);
        }, card, 20, 10000, () => {
            try {
                Thread.sleep(3000);
            } catch (e) {
            }
        });
        this.pause(2000);
        return this;
    }

    public clickViewMessageButton(mentorName: string): MyMentorshipPage {
        this.mentorViewMessageButton(mentorName).click();
        return this;
    }

    public clickViewCommentModalButtonClose(): MyMentorshipPage {
        this.viewCommentModalButton("Close").click();
        return this;
    }

    public clickAcceptRejectButton(mentorName: string, buttonName: string): MyMentorshipPage {
        this.mentorAcceptRejectButton(mentorName, buttonName).click();
        this.pause(5000);
        this.page.waitForLoadState(LoadState.DOMCONTENTLOADED);
        this.page.waitForLoadState(LoadState.DOMCONTENTLOADED);
        return this;
    }

    public clickMentorCard(mentorName: string): MyMentorshipPage {
        this.mentorCardMain(mentorName).click();
        return this;
    }

    public clickCreateMentorProfileButton(): CreateMentorProfileModalPage {
    myMenteesTab.click();
        return this.getPageClassInstance(CreateMentorProfileModalPage);
    }
}
