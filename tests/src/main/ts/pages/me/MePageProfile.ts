import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";
import { ProfileDetailsPage } from "pages/careergrowth/profiles/ProfileDetailsPage";
import { AbstractMePage } from "pages/me/share/AbstractMePage";
import { CompleteYourProfileAddSkillsModalPage } from "pages/newprofile/CompleteYourProfileAddSkillsModalPage";
import { NewProfileSkillPage } from "pages/newprofile/skills/NewProfileSkillPage";

export class MePageProfile extends AbstractMePage <MePageProfile> {

    public bannerImageLink(fileName: string): Locator {

      return this.getLocatorWithParam("//img[contains(@src, '%s')]", fileName);

    }
    public interestsLabel: Locator = this.page.locator("//h2[contains(text(),'Interests')]");
    public addLearningGoals: Locator = this.page.locator("//button[@id='add_learning_goals']/i");
    public enterSkillName: Locator = this.page.locator("//div[@role='dialog']/div[2]//div[@role='application']/div/div/div[1]/div[2]");
    public selectLevel: Locator = this.page.locator("//select[@id='skill_level']");
    public addSkillButton: Locator = this.page.locator("//button[contains(text(),'Add')]");

    public saveButton: Locator = this.page.locator("//button[contains(text(),'Save')]");
    public addedSkillValue: Locator = this.page.locator("//div[@class='learning-goals-column']/div[2]/div");
    public totalLearningHours: Locator = this.page.locator("//p[contains(text(),'Total Learning Hours')]");
    public inProgressLabel: Locator = this.page.locator("//h2[contains(text(),'In Progress')]");
    public openLearningPlan: Locator = this.page.locator("//button[contains(text(),'Open Learning Plan')]");
    public mySkillsAssessment: Locator = this.page.locator("//h2[contains(text(),'My Skills Assessment')]");
    public openSkillsAssessment: Locator = this.page.locator("//button[contains(text(),'Open Skills Assessment')]");
    public myGroups: Locator = this.page.locator("//h2[contains(text(),'My Groups')]");
    public viewAllGroupsButton: Locator = this.page.locator("//div[@class='ed-ui groups']/div/div//a[contains(text(),'View All')]");
    public myChannels: Locator = this.page.locator("//h2[contains(text(),'Channels I follow')]");
    public findChannels: Locator = this.page.locator("//button[contains(text(),'Find Channels')]");
    public selectSkillName: Locator = this.page.locator("//div[@role='application']/div/div[2]/div/div[.='microsoft excel']");
    public editPublicProfileButton: Locator = this.page.locator("//button[@aria-label='Edit Public Profile']");
    public closeMentorProfileCreatedButton: Locator = this.page.locator("//span[contains(text(),'Close Mentor Profile Created')]");

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public clickAddLearningGoals(): MePageProfile {
        addLearningGoals.click();
        return this;
    }

    public typeEnterSkill(skillName: string): MePageProfile {
        enterSkillName.click();
        this.page.keyboard().type(skillName);
        selectSkillName.click();
        return this;
    }

    public clickSelectLevelDropdown(): MePageProfile {
        selectLevel.selectOption("Novice");
        return this;
    }

    public clickAddSkillButton(): MePageProfile {
        addSkillButton.click();
        return this;
    }

    public clickSaveButton(): MePageProfile {
        saveButton.click();
        return this;
    }

    public clickEditPublicProfileButton(): ProfileDetailsPage {
        editPublicProfileButton.click();
        this.pause(3000);
        return this.getPageClassInstance(ProfileDetailsPage);

    }

}
