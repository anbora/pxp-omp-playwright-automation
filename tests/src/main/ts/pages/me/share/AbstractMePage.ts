import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { AriaRole, Browser, Locator } from "common/testing/playwright";
import { UserModel } from "models/user/UserModel";
import { MyOpportunitiesPage } from "pages/careergrowth/jobs/MyOpportunitiesPage";
import { SkillsPassportMePage } from "pages/careergrowth/jobs/SkillsPassportMePage";
import { MyMentorshipPage } from "pages/careergrowth/mentorship/MyMentorshipPage";
import { ProfileDetailsPage } from "pages/careergrowth/profiles/ProfileDetailsPage";
import { ProjectsMePage } from "pages/careergrowth/project/ProjectsMePage";
import { ManageRolePage } from "pages/careergrowth/roles/ManageRolePage";
import { ContentMePage } from "pages/me/ContentMePage";
import { LearningQueuePage } from "pages/me/LearningQueuePage";
import { MePageProfile } from "pages/me/MePageProfile";

export abstract class AbstractMePage  <T extends AbstractMePage > extends BasePage {

    public username(user: UserModel): Locator {

      return this.getLocatorWithParam("//div[contains(@class, 'profile-info')]/h1[contains(text(), '%s')]", user.name);

    }

    public profileTab: Locator = this.page.locator("//button[text() = 'Profile']");
    public readonly editButton: Locator = this.page.locator("//button[@aria-label='Edit Public Profile']");
    public readonly editProfileButton: Locator = getByLabel("Edit Public Profile").build();
    public readonly skillsTab: Locator = getByRole(AriaRole.TAB, "Skills").build();
    public readonly contentTab: Locator = getByRole(AriaRole.TAB, "Content").build();
    public readonly learningQueueTab: Locator = getByRole(AriaRole.TAB, "Learning Queue").build();
    public readonly projectsTab: Locator = this.page.locator("//li[7]/button[contains(text(),'Projects')]");
    public readonly mentorshipsTab: Locator = this.page.locator("//button[contains(text(),'Mentorship')]");
    public readonly openJobsTab: Locator = getByRole(AriaRole.TAB, "Job Vacancies").build();
    public readonly rolesTab: Locator = getByRole(AriaRole.TAB, "Job Roles").build();
    public viewDetailsButton: Locator = this.page.locator("//button[contains(text(),'View Details')]");
    public skillsAssessmentButton: Locator = this.page.locator("//button[text()='Skills Assessment']");
    public viewPublicProfileIcon: Locator = this.page.locator("//i[@class='icon-eye supporting-text-color']");
    public exitModalIcon: Locator = this.page.locator("//button[@class='ed-dialog-modal-header-close-button']");
    public pointsLabel: Locator = this.page.locator(".skillscoin-container .supporting-text-color");
    public readonly learnigGoals: Locator = this.page.locator(".learning-goals-column .topics-chips");
    public Locator learningGoalLevel(String skillLabel){ return this.getLocatorWithParam("//div[@class='learning-goals-column']//div[contains(@class,'topics-chips')]/span[text()='%s']/parent::div//span[contains(@class, 'filled-cirle')]", skillLabel); };

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public goToSkillPassportTab(): SkillsPassportMePage {
        skillsTab.click();
        return this.getPageClassInstance(SkillsPassportMePage);
    }

    public goToProjectsTab(): ProjectsMePage {
        projectsTab.click();
        return this.getPageClassInstance(ProjectsMePage);
    }

    public goToMentorshipsTab(): MyMentorshipPage {
        mentorshipsTab.click();
        return this.getPageClassInstance(MyMentorshipPage);
    }

    public clickOpenJobsTab(): MyOpportunitiesPage {
        openJobsTab.click();
        return this.getPageClassInstance(MyOpportunitiesPage);
    }

    public clickRolesTab(): ManageRolePage {
        rolesTab.click();
        return this.getPageClassInstance(ManageRolePage);
    }

    public clickProfileTab(): MePageProfile {
        profileTab.click();
        return this.getPageClassInstance(MePageProfile);
    }

    public clickContentTab(): ContentMePage {
        contentTab.click();
        return this.getPageClassInstance(ContentMePage);
    }

    public clickLearningQueue(): LearningQueuePage {
        learningQueueTab.click();
        return this.getPageClassInstance(LearningQueuePage);
    }

    public editProfile(): ProfileDetailsPage {
        editProfileButton.click();
        return this.getPageClassInstance(ProfileDetailsPage);
    }

    public getLearningGoals(): Set<string> {
        this.page.waitForSelector(".learning-goal-heading");
        return learnigGoals.locator("span.topic_chip_label ")
                .all()
                .stream()
                .map(goalElement => goalElement.innerText())
                .collect(Collectors.toSet());
    }
}
