// @ts-nocheck
import { BasePage } from "common/BasePage";
import { BaseTest } from "common/BaseTest";
import { ElementType } from "common/enums/ElementType";
import { WidgetsOnLandingPage } from "common/enums/landingpage/WidgetsOnLandingPage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { AriaRole, Browser, FileChooser, LoadState, Locator } from "common/testing/playwright";
import { ResultContainer } from "models/ResultContainer";
import { UserModel } from "models/user/UserModel";
import { JobVacancyDetailsPage } from "pages/careergrowth/jobs/JobVacancyDetailsPage";
import { MentorProfilePage } from "pages/careergrowth/mentorship/MentorProfilePage";
import { MentorshipDiscoveryPage } from "pages/careergrowth/mentorship/MentorshipDiscoveryPage";
import { ExperienceCareerProfileModalPage } from "pages/careergrowth/profiles/ExperienceCareerProfileModalPage";
import { ProjectDetailsPage } from "pages/careergrowth/project/ProjectDetailsPage";
import { ProjectDiscoveryPage } from "pages/careergrowth/project/ProjectDiscoveryPage";
import { RoleDetailsPage } from "pages/careergrowth/roles/RoleDetailsPage";
import { DiscoverPage } from "pages/discover/DiscoverPage";
import { SmartCardDetailsPage } from "pages/insights/SmartCardDetailsPage";
import { LearningQueuePage } from "pages/me/LearningQueuePage";
import { MePageProfile } from "pages/me/MePageProfile";
import { NotificationPage } from "pages/other/NotificationPage";

export class LandingPage extends BasePage {
  static pageModel = { pageName: "Landing Page", url: "/", checkUrl: false };

    public GRID_SELECTOR: string = "//div[contains(@id, 'grid-row')]";
    private static readonly HOME_PAGE_CONTENT: string = "//div[@id='menuContent']";
    private static readonly HOME_PAGE_ASK_MENTOR_MODAL: string = ".ed-dialog-modal-wrapper";
    public requestMentorship(): Locator {
      return this.aiLocator(HOME_PAGE_CONTENT, "//ul/div[1]//button[@class='ed-btn ed-btn-primary']");
    }
    public sendButton(): Locator {
      return this.aiLocator(HOME_PAGE_ASK_MENTOR_MODAL, "//div[@class='content']/div[@role='presentation']//button[@class='ed-btn ed-btn-primary']");
    }
    public userWelcomeName(userModel: UserModel): Locator {
      return this.getLocatorWithParam("//div[@id = 'grid-001']/div[@id = 'grid-002']/descendant::h2[contains(text(), 'Hi %s')]/following-sibling::a[@href = '/me']", userModel.name);
    }
    public widgetHeader(widgetName: WidgetsOnLandingPage): Locator {
      return this.getLocatorWithParam("//h2[text() = '%s']/parent::div", widgetName.getWidgetName());
    }
    public allTabForWidget(widgetName: WidgetsOnLandingPage): Locator {
      return widgetHeader(widgetName).first().locator("//button[@role = 'tab'][text() = 'All']");
    }
    public dueDateTabForWidget(widgetName: WidgetsOnLandingPage): Locator {
      return widgetHeader(widgetName).first().locator("//button[@role = 'tab'][text() = 'Due date']");
    }
    public seeAllButtonForWidget(widgetName: WidgetsOnLandingPage): Locator {
      return widgetHeader(widgetName).first().locator("//button[text() = 'See all'] | //a[text() = 'See all']");
    }
    public exploreContentButtonForWidget(widgetName: WidgetsOnLandingPage): Locator {
      return widgetHeader(widgetName).locator("//a[text() = 'Explore content']");
    }
    public contentPanelForLearningWidget(widgetName: WidgetsOnLandingPage): Locator {
      return widgetHeader(widgetName).locator("//div");
    }
    public contentPanelForRecentUpdatesWidget(widgetName: WidgetsOnLandingPage): Locator {
      return widgetHeader(widgetName).locator("//div");
    }
    public smartCardNameForLearningWidget(cardName: string): Locator {
      return contentPanelForLearningWidget(WidgetsOnLandingPage.CONTINUE_LEARNING).locator(getLocatorWithParam("//h6[text() = '%s']", cardName));
    }
    public smartCardTypeForLearningWidget(cardName: string, cardType: string): Locator {
      return smartCardNameForLearningWidget(cardName).locator(getLocatorWithParam("//preceding-sibling::div/span[text() = '%s']", cardType));
    }
    public smartCardImageForLearningWidget(cardName: string): Locator {
      return smartCardNameForLearningWidget(cardName).locator("//parent::div/following-sibling::div/descendant::object[@data-testid = 'blocks-thumbnail']");
    }
    public iconForEmptyContentInLearningWidget: Locator = contentPanelForLearningWidget(WidgetsOnLandingPage.CONTINUE_LEARNING).locator("//i[@role = 'presentation']");
    public messageForEmptyContentInLearningWidget: Locator = contentPanelForLearningWidget(WidgetsOnLandingPage.CONTINUE_LEARNING).locator("//p");
    public messageForEmptyRecentUpdatesWidget: Locator = contentPanelForRecentUpdatesWidget(WidgetsOnLandingPage.RECENT_UPDATES).locator("//p");
    public notificationMessageRecentUpdatesWidget: Locator = contentPanelForRecentUpdatesWidget(WidgetsOnLandingPage.RECENT_UPDATES).locator("button.notification-msg > div");
    public setUpYourAccountTickIconForCompleteYourProfileWidget: Locator = this.page.locator("//h4[text() = 'Set up your account']/parent::div/preceding-sibling::div/descendant::i[contains(@class, 'icon-check-circle-light')]");
    public addSkillsTickIconForCompleteYourProfileWidget: Locator = this.page.locator("//h4[text() = 'Add skills']/parent::div/preceding-sibling::div/descendant::i[contains(@class, 'icon-check-circle-light')]");
    public workExperienceTickIconForCompleteYourProfileWidget: Locator = this.page.locator("//h4[text() = 'Update your work experience']/parent::div/preceding-sibling::div/descendant::i[contains(@class, 'icon-check-circle-light')]");
    public setUpYourAccountArrowIconForCompleteYourProfileWidget: Locator = this.page.locator("//h4[text() = 'Set up your account']/parent::div/preceding-sibling::div/descendant::i[contains(@class, 'icon-arrow-circle-right')]");
    public addSkillsArrowIconForCompleteYourProfileWidget: Locator = this.page.locator("//h4[text() = 'Add skills']/parent::div/preceding-sibling::div/descendant::i[contains(@class, 'icon-arrow-circle-right')]");
    public workExperienceArrowIconForCompleteYourProfileWidget: Locator = this.page.locator("//h4[text() = 'Update your work experience']/parent::div/preceding-sibling::div/descendant::i[contains(@class, 'icon-arrow-circle-right')]");
    public updateCareerProfileButtonForCompleteYourProfileWidget: Locator = this.page.locator("//button[text() = 'Update career profile']");
    public percentageForCompleteYourProfileWidget: Locator = this.page.locator("//h1[@data-testid = 'circular-progress-count']");
    public userProfileImageInWelcomeWidget: Locator = this.page.locator("//div[@id = 'grid-001']/div[@id = 'grid-002']/descendant::h2/following-sibling::a[@href = '/me']");
    public welcomeStringAndSubTextInWelcomeWidget: Locator = this.page.locator("//div[@class='footer-wrapped-content reduce-footer']/div[@class='plare-theme']|//p[.='Welcome to your portal for learning and growth.']");
    public readonly mentorsCarousel: Locator = this.page.locator("//div[contains(@class, 'recommended-mentors-header')]");
    public mentorName: Locator = this.page.locator("//div[@class='tm__mentorship-card-name']");
    public mentorAvatar: Locator = this.page.locator("//div[@class='tm__mentorship-card-avatar']//img");
    public seeAllButtonForMentorCarousel(): Locator {
      return mentorsCarousel.locator("//a[text() = 'See all']");
    }
    public announcementsWidget(): Locator {
      return this.aiLocator(GRID_SELECTOR, "//h2[@data-testid='base-card' and text()='Announcements']");
    }
    public bookmarksWidgetHeader: Locator = this.page.locator("//h2[@data-testid='base-card' and text()='Bookmarks']");
    public assignedLearningWidgetHeader: Locator = this.page.locator("//h2[@data-testid='base-card'][contains(text(), 'Assigned learning')]");
    public announcement(announcementTitle: string): Locator {
      return this.getLocatorWithParam("//div[contains(@class, 'announcement-item')]/div[text()='%s']", announcementTitle);
    }
    public readonly newOpeningsWidget: Locator = this.page.locator("//div[contains(@class, 'ed-ui')]/descendant::h2[text() = 'Suggested openings']");
    public readonly newOpeningsWidgetJobVacanciesTab: Locator = this.page.locator("//div/h2[text()='Suggested openings']/../following-sibling::div/div/ul/li[2]/button[text()='Job Vacancies']");
    public jobVacanciesCardTitle(jobVacancyTitle: string): Locator {
      return this.getLocatorWithParam("//div/a[@class= 'job-card__details__title']/div[text()='%s']", jobVacancyTitle);
    }
    public readonly jobVacancyTitleLocator: Locator = this.page.locator("//div/a[@class= 'job-card__details__title']");
    public readonly projectsTitleLocator: Locator = this.page.locator("//div[contains(@class, 'tm__project-recommendations-carousel')]/descendant::div[@class='tm__project-card-header']/h3");
    public seeAllButtonInNewOpeningsWidget: Locator = this.page.locator("//div[contains(@class, 'ed-ui')]/descendant::h2[text() = 'Suggested openings']/following-sibling::a[text() = 'See all']");
    public projectCardWithProjectTitle(projectTitle: string): Locator {
      return this.getLocatorWithParam("//div[@class='tm__project-card-header']/h3[text()='%s']", projectTitle);
    }
    public readonly learningFeedWidget: Locator = this.page.locator("//div/h2[contains(text(),'Your learning feed')]");
    public readonly todaysInsightsTab: Locator = this.page.locator("//div/h2[contains(text(),'Your learning feed')]/following-sibling::div/descendant::li/button[text() = \"Today's Insights\"]");
    public readonly teamLearningTab: Locator = this.page.locator("//div/h2[contains(text(),'Your learning feed')]/following-sibling::div/descendant::li/button[text() = \"Team Learning\"]");
    public readonly myAssignmentsTab: Locator = this.page.locator("//div/h2[contains(text(),'Your learning feed')]/following-sibling::div/descendant::li/button[text() = \"My Assignments\"]");
    public readonly featuredTab: Locator = this.page.locator("//div/h2[contains(text(),'Your learning feed')]/following-sibling::div/descendant::li/button[text() = \"Featured\"]");
    public readonly learningFeedNoCardsIcon: Locator = this.page.locator("//div[@id='assign_content_panel']/descendant::i[contains(@class, 'icon-smartcard')]");
    public readonly myAssignmentsCardTitle: Locator = this.page.locator("//div/h2[contains(text(),'Your learning feed')]/../descendant::div[contains(@id,'card-title')]/span/span");
    public myAssignmentsCardWithTitle(cardTitle: string): Locator {
      return this.getLocatorWithParam("//div/h2[contains(text(),'Your learning feed')]/../descendant::div[contains(@id,'card-title')]/span/span[text()='%s']", cardTitle);
    }
    public inProgressWidgetHeader: Locator = this.page.locator("//h2[@data-testid='base-card' and text()='In progress']");
    public recentUpdatesWidgetHeader: Locator = this.page.locator("//h2[@data-testid='base-card' and text()='Recent updates']");
    public yourNextCareerMilestoneWidgetHeader: Locator = this.page.locator("//h2[@data-testid='base-card' and text()='Your next career milestone']");
    public completeYourProfileWidgetHeader: Locator = this.page.locator("//div/h2[contains(text(),'Complete your profile')]");
    public leaderboardWidgetHeader: Locator = this.page.locator("//h2[@data-testid='base-card' and text()='Leaderboard']");
    public allJobVacanciesPageHeader: Locator = this.page.locator("//div[@class='all-vacancy-container']");
    public yourNextCareerMilestoneWidgetEmptyLabel: Locator = this.page.locator("//h2[@data-testid='base-card' and text()='Your next career milestone']/following-sibling::div/descendant::p[text()='Select a role which interests you and we can help you with a learning plan to get there']");
    public aspirationalRoleWithTitle(roleTitle: string): Locator {
      return this.getLocatorWithParam("//h2[@data-testid='base-card' and text()='Your next career milestone']/following-sibling::div/descendant::article/h3/a[text()='%s']", roleTitle);
    }
    public completeYourProfileWidgetCompletionPercentage(percentageCompleted: string): Locator {
      return this.getLocatorWithParam("//div[@aria-label='%s']", percentageCompleted);
    }
    public completeYourProfileWidgetAvatar: Locator = this.page.locator("//div[@data-testid='circular-progress-avatar']");
    public completeYourProfileWidgetCompleteNowButton: Locator = this.page.locator("//div/button[text()='Complete now']");
    public completeYourProfileWidgetUpdateNowButton: Locator = this.page.locator("//div/button[text()='Update now']");
    public workHistoryLineLabel(text: string): Locator {
      return this.getLocatorWithParam("//label[text()='%s']", text);
    }
    public submitButton_alternate: Locator = this.page.locator("//button[@class='ed-btn ed-btn-primary' and text()='Submit']");
    public addButton: Locator = this.page.locator("//button[text() = 'Add']");
    public nextbutton: Locator = this.page.locator("//button[contains(@class,'ed-btn ed-btn-neutral') and text()='next']");
    public suggestedSkillsHeader: Locator = this.page.locator("//div[@class='skills-suggested-for-user__content__title']");
    public readonly allSkillsCheckbox: Locator = this.page.locator("//div[text()='Skill']/parent::span//input");
    public completeYourProfileModalAddExperienceButton: Locator = this.page.locator("//div[@class='new-work-history-section']/button");
    public completeYourProfileNoviceSkillInput: Locator = this.page.locator("//input[@id='skill-search-Novice']");
    public selectFileButton: Locator = this.page.locator("//i[@class='icon-upload']");
    public saveButton: Locator = this.page.locator("//button[text()='Save']");
    public completeYourProfileCareerPrefsCareerGoal1stChkBox: Locator = this.page.locator("//div/label/input[@id='FORWARD']");
    public userButton: Locator = this.page.locator("//ul[@class = 'user-actions']/descendant::div[@class = 'ed-avatar']/parent::button");
    public helpSection: Locator = this.page.locator("//ul[@class = 'user-actions']/descendant::button[text() = 'Help']");
    public configureLandingPageHeader: Locator = this.page.locator("//h1[text()='Home page configuration']");
    public configureLandingPageWidgetLibraryCarousel: Locator = this.page.locator("//ul[@id='dnd-lib' and @class='ed-carousel ']");
    public configureLandingPageSaveCancelButtons: Locator = this.page.locator("//div[@class='admin__lp__header-layout-buttons']");
    public configureLandingPageDeleteRow: Locator = this.page.locator("//button[text()='Delete row']");
    public configureLandingPageSaveAndExitButton: Locator = this.page.locator("//button[text()='Save & exit']");
    public configureLandingPageEmptyLayoutWarningModal(): Locator {
      return this.getByRole(AriaRole.HEADING, "Warning");
    }
    public emptyLayoutWarningModalYesButton: Locator = this.page.locator("//div[@class='ed-dialog-modal-footer ']/button[text()='Yes']");
    public emptyLandingPageStartEditingButton: Locator = this.page.locator("//div[@class='no-content-icon-wrapper make-center']/following-sibling::button");
    public configureLandingPageWidgetAddButton(widgetName: string): Locator {
      return this.getLocatorWithParam("//div[@class='top-container__content']/h2[text()='%s']/parent::div/parent::div/following-sibling::div/button[text()='Add']", widgetName);
    }
    public addButtonForLandingWidget: Locator = this.page.locator("//li[descendant::h2[not(contains(text(), 'Custom text display'))]]/descendant::button[text() = 'Add']");
    public selectItemFromDropDownSearchResults(searchResultToSelect: string): Locator {
      return this.getLocatorWithParam("//div[contains(@class, 'ed-multi-select__option') and text()='%s']", searchResultToSelect);
    }
    public nextCareerMilestoneRoleMatching: Locator = this.page.locator("//div[@role='region']//ul/article[1]//div[@class='matching-label']");
    public nextCareerMilestoneRoleOpen: Locator = this.page.locator("//ul/article[1]/h3");
    public yourNextCareerMilestoneArticleLevel: Locator = this.page.locator("//div/h2[text()='Your next career milestone']/parent::div/div/div/div[@class='ed-carousel-wrapper']/ul/article[1]/dl/div/dt/span[text()='Level']");
    public mentorCardApplicationStatus(status: string): Locator {
      return this.getLocatorWithParam("//div[contains(@class, 'om__mentorship-application-status--label') and text()='%s']", status);
    }

    constructor(browser: Browser, pageHandler: PageHandler, url: string, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, BaseTest.getPortalConfig(portalIndex).getUrl() + url, logger, portalIndex);

    }

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public assertHomePageLoaded(user: UserModel): LandingPage {
        this.homeTab().waitFor(new Locator.WaitForOptions().setState("visible").setTimeout(30000));
        this.logger.info("-------------------------------------------------------------------");
        this.logger.info("User logged with data:");
        this.logger.info(" - id: " + user.id);
        this.logger.info(" - email: " + user.email);
        this.logger.info("-------------------------------------------------------------------");
        return this;
    }

    public clickAllTabForTheWidget(widget: WidgetsOnLandingPage): LandingPage {
        this.allTabForWidget(widget).click();
        return this;
    }

    public clickDueDateForTheWidget(widget: WidgetsOnLandingPage): LandingPage {
        this.dueDateTabForWidget(widget).click();
        return this;
    }

    public uploadFile(filePath: string): LandingPage {
        let fileChooser: FileChooser = this.page.waitForFileChooser(() => this.page.locator("//div[@class='drag-drop-zone']//button[@class='ed-btn ed-btn-primary']").click());
        fileChooser.setFiles(Paths.get(filePath));
        return this;
    }

    public clickNextButton_alternate(): LandingPage {
        nextbutton.click();
        return this;
    }

    public openNextCareerMilestoneRole(): RoleDetailsPage {
        nextCareerMilestoneRoleOpen.click();
        return this.getPageClassInstance(RoleDetailsPage);
    }

    public markAllSkills(): LandingPage {
        allSkillsCheckbox.click();
        return this;
    }

    public clickAddButton(): LandingPage {
        addButton.click();
        return this;
    }

    public clickSeeAllButtonForContinueLearningWidget(): LearningQueuePage {
        this.seeAllButtonForWidget(WidgetsOnLandingPage.CONTINUE_LEARNING).first().click();
        return this.getPageClassInstance(LearningQueuePage);
    }

    public clickSeeAllButtonForRecentUpdatesWidget(): NotificationPage {
        this.pause(5000);
        this.seeAllButtonForWidget(WidgetsOnLandingPage.RECENT_UPDATES).first().click();
        return this.getPageClassInstance(NotificationPage);
    }

    public clickSeeAllButtonForMentorsCarouselWidget(): MentorshipDiscoveryPage {
        this.seeAllButtonForMentorCarousel().first().click();
        return this.getPageClassInstance(MentorshipDiscoveryPage);
    }

    public clickSeeAllButtonInNewOpeningsWidget(): ProjectDiscoveryPage {
        seeAllButtonInNewOpeningsWidget.first().click();
        return this.getPageClassInstance(ProjectDiscoveryPage);
    }

    public clickSeeAllButtonInJobVacanciesTab(): LandingPage {
        seeAllButtonInNewOpeningsWidget.click();
        return this;
    }

    public clickSmartCardNameForContinueLearningWidget(articleName: string): SmartCardDetailsPage {
        this.smartCardNameForLearningWidget(articleName).click();
        return this.getPageClassInstance(SmartCardDetailsPage);
    }

    public clickExploreContentButtonForContinueLearningWidget(): DiscoverPage {
        this.exploreContentButtonForWidget(WidgetsOnLandingPage.CONTINUE_LEARNING).click();
        return this.getPageClassInstance(DiscoverPage);
    }

    public clickFirstNotificationInRecentUpdatesWidget<T extends BasePage>(clazz: Class<T>): T {
        this.notificationMessageRecentUpdatesWidget.first().click();
        return this.getPageClassInstance(clazz);
    }

    public clickUpdateCareerProfileInCompleteYourProfileWidget(): ExperienceCareerProfileModalPage {
        this.updateCareerProfileButtonForCompleteYourProfileWidget.click();
        return this.getPageClassInstance(ExperienceCareerProfileModalPage);
    }

    public clickProfileImageInWelcomeWidget(): MePageProfile {
        userProfileImageInWelcomeWidget.click();
        return this.getPageClassInstance(MePageProfile);
    }

    public clickFirstMentorCardAvatar(): MentorProfilePage {
        mentorAvatar.first().click();
        return this.getPageClassInstance(MentorProfilePage);
    }

    public clickProjectCardWithProjectTitle(projectTitle: string): ProjectDetailsPage {
        this.projectCardWithProjectTitle(projectTitle).first().click();
        return this.getPageClassInstance(ProjectDetailsPage);
    }

    public getFirstItemOnAllProjectsList(projectTitle: ResultContainer): LandingPage {
        projectTitle.setValue(projectsTitleLocator.first().textContent());
        return this;
    }

    public clickJobVacanciesTab(): LandingPage {
        newOpeningsWidgetJobVacanciesTab.click();
        return this;
    }

    public clickJobVacancyCardWithTitle(jobVacancyTitle: string): JobVacancyDetailsPage {
        this.jobVacanciesCardTitle(jobVacancyTitle).first().click();
        return this.getPageClassInstance(JobVacancyDetailsPage);
    }

    public getFirstItemOnAllJobVacanciesList(jobVacancyTitle: ResultContainer): LandingPage {
        jobVacancyTitle.setValue(jobVacancyTitleLocator.first().textContent());
        return this;
    }

    public clickTodaysInsightsTab(): LandingPage {
        todaysInsightsTab.first().click();
        return this;
    }

    public clickTeamLearningTab(): LandingPage {
        teamLearningTab.first().click();
        return this;
    }

    public clickMyAssignmentsTab(): LandingPage {
        myAssignmentsTab.first().click();
        return this;
    }

    public clickFeaturedTab(): LandingPage {
        featuredTab.first().click();
        return this;
    }

    public getFirstCardOnMyAssignmentsList(CardTitle: ResultContainer): LandingPage {
        CardTitle.setValue(myAssignmentsCardTitle.first().textContent());
        return this;
    }

    public clickMyAssignmentsCardWithTitle(CardTitle: string): SmartCardDetailsPage {
        this.myAssignmentsCardWithTitle(CardTitle).first().click();
        return this.getPageClassInstance(SmartCardDetailsPage);
    }

    public refreshUntilLearningFeedWidgetTitleLoads(): LandingPage {
        this.repeatUntilElementToBeVisible(() => {
        }, learningFeedWidget, 5, 5000, () => this.page.reload());
        return this;
    }

    public refreshUntilNewOpeningsWidgetTitleLoads(): LandingPage {
        this.repeatUntilElementToBeVisible(() => {
        }, newOpeningsWidget, 5, 5000, () => this.page.reload());
        return this;
    }

    public clickCompleteNowButton(): ExperienceCareerProfileModalPage {
        completeYourProfileWidgetCompleteNowButton.click();
        return this.getPageClassInstance(ExperienceCareerProfileModalPage);
    }

    public clickAddExperienceButton(): ExperienceCareerProfileModalPage {
        completeYourProfileModalAddExperienceButton.click();
        return this.getPageClassInstance(ExperienceCareerProfileModalPage);
    }

    public clickAspirationalRoleCard(roleTitle: string): RoleDetailsPage {
        this.aspirationalRoleWithTitle(roleTitle).click();
        return this.getPageClassInstance(RoleDetailsPage);
    }

    public clickSelectFile(): LandingPage {
        selectFileButton.click();
        return this;
    }

    public clickSubmitButton(): LandingPage {
        submitButton_alternate.click();
        return this;
    }

    public clickSaveButton(): LandingPage {
        saveButton.click();
        return this;
    }

    public searchAndAddNoviceSkill(SkillName: string): LandingPage {
        completeYourProfileNoviceSkillInput.click();
        completeYourProfileNoviceSkillInput.fill(SkillName);
        this.selectItemFromDropDownSearchResults(SkillName).click();
        return this;
    }

    public removeAllRowsFromConfigureLandingPage(deleteRowHeader: Locator): LandingPage {
        this.page.waitForLoadState();
        this.pause(2000);
        try {
          if (deleteRowHeader.first().isVisible()) {
                this.repeatUntilElementToBeNotVisible(
                        () => {
                            deleteRowHeader.first().click();
                            this.page.waitForLoadState();
                        },
                        deleteRowHeader,
                        20,
                        250,
                        () =>{
                            this.page.waitForLoadState(LoadState.DOMCONTENTLOADED);
                        });
            }
            }catch (e){
            //empty line
        }
        return this;
    }

    public deleteRows(): LandingPage {
        this.pause(10000);
        return this.removeAllRowsFromConfigureLandingPage(configureLandingPageDeleteRow);
    }

    public clickSaveAndExitButton(): LandingPage {
        configureLandingPageSaveAndExitButton.click();
        return this;
    }

    public clickUserButton(): LandingPage {
        userButton.click();
        return this;
    }

    public clickYesButtonWarningModal(): LandingPage {
        emptyLayoutWarningModalYesButton.click();
        return this;
    }

    public clickStartEditingEmptyLandingPage(): LandingPage {
        emptyLandingPageStartEditingButton.click();
        return this;
    }

    public configureLandingPageAddWidget(widgetName: string): LandingPage {
        this.configureLandingPageWidgetAddButton(widgetName).click();
        return this;
    }

    public addAllLandingWidgets(): LandingPage {
        this.repeatUntilElementToBeNotVisible(() => addButtonForLandingWidget.first().click(), addButtonForLandingWidget, 20, 200, () => {});
        return this;
    }

    public clickDeleteRowButtonMentorship(): LandingPage {
        configureLandingPageDeleteRow.click();
        this.pause(3000);
        configureLandingPageSaveAndExitButton.click();
        this.pause(3000);
        emptyLayoutWarningModalYesButton.click();
        this.pause(3000);
        return this;
    }

    public checkMentorshipOnLandingPage(): LandingPage {
      if (!this.emptyLandingPageStartEditingButton.isVisible()) {
            this.clickConfigureHomePageButton();
            this.clickDeleteRowButtonMentorship();
        }
        return this;
    }

    public requestMentorshipHomePage(): LandingPage {
        this.requestMentorship().click();
        this.sendButton().click();
        return this;
    }

}
