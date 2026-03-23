import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { AriaRole, Browser, Locator } from "common/testing/playwright";
import { AddSkillModalPage } from "pages/careergrowth/jobs/AddSkillModalPage";
import { MyOpportunitiesPage } from "pages/careergrowth/jobs/MyOpportunitiesPage";
import { VisibilityModalPage } from "pages/careergrowth/jobs/VisibilityModalPage";
import { MyMentorshipPage } from "pages/careergrowth/mentorship/MyMentorshipPage";
import { ConfirmDeleteModalPage } from "pages/careergrowth/profiles/ConfirmDeleteModalPage";
import { ProfileDetailsPage } from "pages/careergrowth/profiles/ProfileDetailsPage";
import { ProjectsMePage } from "pages/careergrowth/project/ProjectsMePage";
import { ManageRolePage } from "pages/careergrowth/roles/ManageRolePage";
import { MePageProfile } from "pages/me/MePageProfile";
import { AddCertificateModalPage } from "pages/skillspassport/AddCertificateModalPage";
import { AddEditBadgeModalPage } from "pages/skillspassport/AddEditBadgeModalPage";
import { AddPatentModalPage } from "pages/skillspassport/AddPatentModalPage";

export class SkillsPassportMePage extends BasePage {

    public viewPublicProfileButton: Locator = this.page.locator("//button[@aria-label='View Public Profile']");
    public exitPublicProfileButton: Locator = this.page.locator("//button[@aria-label='Exit Public Profile']");
    public editProfileButton: Locator = this.page.locator("//button[@aria-label='Edit Public Profile']");
    public addSkillButton: Locator = getByRole(AriaRole.BUTTON,"Add More Skill/Credential").build();
    public addedSkill(skill: string): Locator {
      return this.getByRole(AriaRole.BUTTON, skill).build();
    }
    public skillCounter(skillCounter: string): Locator {
      return this.getLocatorWithParam("//div[@class = 'icon-container']/following-sibling::p[text() = '%s']", skillCounter);
    }
    public skillDescription: Locator = this.page.locator("//div[@class='view-description']/descendant::span[1]");
    public skillEditButton: Locator = this.page.locator("//div[@class='header-actions-container']/button[text() = 'Edit']");
    public deleteSkillButton: Locator = getByRole(AriaRole.BUTTON,"Delete").build();
    public projectsTab: Locator = this.page.locator("a[aria-label= 'Projects']");
    public mentorshipsTab: Locator = this.page.locator("a[aria-label='Mentorships']");
    public openJobsTab: Locator = this.page.locator("//li[@class='tabs-item']/child::a[text()='Job Vacancies'] | //li[@class='tabs-item']/child::a[text()='Open Jobs']");
    public rolesTab: Locator = this.page.locator("//li[@class='tabs-item']/child::a[text()='Roles'] | //li[@class='tabs-item']/child::a[text()='Job Roles']");
    public workHistoryHeader: Locator = this.page.locator("//h2[text()='Work History']/following-sibling::div");
    public workHistoryTitle: Locator = this.page.locator("//div[@class='experence-card']/descendant::div[@class='wh-title']");
    public workHistoryPeriod(position: string): Locator {
      return this.getLocatorWithParam("//div[@class='wh-title'][text()='%s']/preceding-sibling::label/child::span", position);
    }
    public workHistoryCompany(position: string): Locator {
      return this.getLocatorWithParam("//div[@class='wh-title'][text()='%s']/parent::div/parent::div/following-sibling::label", position);
    }
    public workHistoryItem(position: string): Locator {
      return this.getLocatorWithParam("//div[@class='wh-title'][text()='%s']/ancestor::div[@class='experence-card']", position);
    }
    public deleteItemButton: Locator = this.page.locator("//div[contains(@class,'skill-view-details')]/descendant::button[@aria-label='Delete']");
    public confirmationButton: Locator = this.page.locator("//button[text()='Confirm']");
    public skillContainer: Locator = this.page.locator(".skills-passport-container");
    public badgeContainer: Locator = this.page.locator(".badge-container");
    public certificateContainer: Locator = this.page.locator("//div[contains(@class, 'certificate-carousel')]/child::div/child::div");
    public assessmentContainer: Locator = this.page.locator("//div[contains(@class, 'assessment-carousel')]/child::div/child::div");
    public experienceContainer: Locator = this.page.locator(".experence-card");
    public visibilityButton(skillType: string): Locator {
      return this.getLocatorWithParam("//button[@aria-label='Visibility:%s']", skillType);
    }
    public profileLabel: Locator = this.page.locator("//div[@id='profile_section']/descendant::div[contains(@class, 'profile-text')]");
    public privateIcon: Locator = this.page.locator("//div[@id='profile_section']/descendant::i[@class='icon-eye-slash']");
    public Locator skillLevelIcon(String skillLabel){ return this.getLocatorWithParam("//div[@class='title-header-container']/div[text()='%s']//ancestor::div[contains(@class,'title-container')]//i", skillLabel); };
    public Locator skillBox(String skillLabel){ return this.getLocatorWithParam("//div[contains(@class,'title-header')][text()='%s']/ancestor::button", skillLabel); };
    public readonly skillsPassportAddSkillButton: Locator = this.page.locator("//div[@class='flex-center']/preceding::button[@aria-label='Add More Skill/Credential']");
    private readonly badgeInput: Locator = this.page.locator("//input[@value='badge']");
    private readonly certificateInput: Locator = this.page.locator("//input[@value='certificate']");
    private readonly patentInput: Locator = this.page.locator("//input[@value='patent']");

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public viewPublicProfile(): MePageProfile {
        viewPublicProfileButton.click();
        return this.getPageClassInstance(MePageProfile);
    }

	public exitPublicProfile(): MePageProfile {
        exitPublicProfileButton.click();
        return this.getPageClassInstance(MePageProfile);
    }

	public editProfile(): ProfileDetailsPage {
        editProfileButton.click();
        return this.getPageClassInstance(ProfileDetailsPage);
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

	public goToProjectsTab(): ProjectsMePage {
        projectsTab.click();;
        return this.getPageClassInstance(ProjectsMePage);
    }

	public clickAddMoreSkillsButton(): AddSkillModalPage {
        this.pause(1000);
        addSkillButton.click();
        return this.getPageClassInstance(AddSkillModalPage);
    }

	public openSkillDetails(skill: string): SkillsPassportMePage {
        this.page.reload();
        this.addedSkill(skill).click();
        return this;
    }

	public editSkillDetails(): AddSkillModalPage {
        skillEditButton.click();
        return this.getPageClassInstance(AddSkillModalPage);
    }

	public deleteSkill(): ConfirmDeleteModalPage {
        deleteSkillButton.click();
        return this.getPageClassInstance(ConfirmDeleteModalPage);
    }

    public clickOnWorkHistoryItem(position: string): SkillsPassportMePage {
        this.workHistoryItem(position).first().click();
        return this;
    }

    public deleteWorkHistoryItem(): ConfirmDeleteModalPage {
        deleteItemButton.click();
        return this.getPageClassInstance(ConfirmDeleteModalPage);
    }

	public openVisibilityModal(skillType: string): VisibilityModalPage {
        this.visibilityButton(skillType).click();
        return this.getPageClassInstance(VisibilityModalPage);
    }

    public clickSkillBox(skillName: string): SkillsPassportMePage {
        this.repeatUntilElementToBeVisible(() => skillBox(skillName).click(), skillDescription, 5, 2000, () => skillBox(skillName).click());
        return this;
    }

    public clickSkillsPassportAddSkillButton(): SkillsPassportMePage {
        skillsPassportAddSkillButton.click();
        return this;
    }

    public selectCertificateType(): AddCertificateModalPage {
        certificateInput.click();
        return this.getPageClassInstance(AddCertificateModalPage);
    }

    public selectBadgeType(): AddEditBadgeModalPage {
        badgeInput.click();
        return this.getPageClassInstance(AddEditBadgeModalPage);
    }

    public selectPatentType(): AddPatentModalPage {
        patentInput.click();
        return this.getPageClassInstance(AddPatentModalPage);
    }
}
