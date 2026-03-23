import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { AriaRole, Browser, LoadState, Locator, WaitForSelectorState } from "common/testing/playwright";
import { ResultContainer } from "models/ResultContainer";
import { CareerPathPage_New } from "pages/careergrowth/careergrowth/CareerPathPage_New";
import { RolesListPage_New } from "pages/careergrowth/careergrowth/RolesListPage_New";
import { SuggestionsPage_New } from "pages/careergrowth/careergrowth/SuggestionsPage_New";
import { VacanciesListPage_New } from "pages/careergrowth/careergrowth/VacanciesListPage_New";
import { JobVacancyDetailsPage } from "pages/careergrowth/jobs/JobVacancyDetailsPage";
import { MatchingAnalysisModalPage } from "pages/careergrowth/MatchingAnalysisModalPage";
import { JobRoleMarkedAsAspirationalModal } from "pages/careergrowth/roles/JobRoleMarkedAsAspirationalModal";
import { SetYourLerningGoalsModalPage } from "pages/careergrowth/SetYourLerningGoalsModalPage";

export class RoleDetailsPage extends BasePage {
  static pageModel = { pageName: "Role Details Page", url: "/career/detail/job_role/%s", checkUrl: false };

    public roleNameLabel: Locator = this.page.locator("//div[@class='job-title block']");
    public divInDescription: Locator = this.page.locator("div.job-description-section > div > div#divIdFromCustomDescription > span");
    public h3InDescription: Locator = this.page.locator("div.job-description-section > div > h3#h3IdFromCustomDescription");
    public aInDescription: Locator = this.page.locator("div.job-description-section > div > a#aIdFromCustomDescription");
    public strongInDescription: Locator = this.page.locator("div.job-description-section > div > strong#strongIdFromCustomDescription");
    public dismissButton: Locator = this.page.locator("//div[@class='vacancy-details__buttons']/descendant::button[@class='ed-btn no-padding min-width-0 social-activity-btn--red']");
    public undismissButton: Locator = this.page.locator("//div[@class='vacancy-details__buttons']/descendant::button[@class='ed-btn no-padding min-width-0 social-activity-btn--red social-activity-btn--red-active']");
    public matchingLabel: Locator = this.page.locator("div.matching-label");
    public matchingValue: Locator = this.page.locator("span.progress-item");
    public matchingValueForAssertions(style: string): Locator {
      return this.getLocatorWithParam("span.progress-item[style = '%s']", style);
    }
    public matchDetails: Locator = this.page.locator("button.match-modal-link");
    public skillsMatchDetails: Locator = this.page.locator("//div[@class='tm__match-modal-tabs']/descendant::label[text()='Skills']");
    public skillsMatchDetailsTitle: Locator = this.page.locator("//div[@id='match-explanations']/descendant::span/child::span[text()='Skills']/parent::span");
    public experienceMatchDetails: Locator = this.page.locator("//div[@class='tm__match-modal-tabs']/descendant::label[text()='Experience']");
    public experienceMatchDetailsTitle: Locator = this.page.locator("//div[@id='match-explanations']/descendant::span/child::span[text()='Experience']/parent::span");
    public matchIcon(area: string): Locator {
      return this.getLocatorWithParam("//span[text()='%s']/parent::span/child::i", area);
    }
    public matchInformation: Locator = this.page.locator(".icon-inverse-exclamation-circle");
    public viewLearningButton: Locator = this.page.locator("div.recommended-learning__button button");
    public carouselCounter: Locator = locator("//h2[@class='tm-carousel__header__left__title']/child::span").build();
    public jobsOnCarousel: Locator = this.page.locator("//div[contains(@class, 'ed-carousel')]/descendant::div[@class='job-card__details']");
    public carouselJobTitle(jobTitle: string): Locator {
      return this.getLocatorWithParam("//a[@class='job-card__details__title']/child::div[(text()='%s')]", jobTitle);
    }
    public carouselJobLocationLabel(jobTitle: string): Locator {
      return locatorWithParams("//div[(text()='%s')]/ancestor::div[@class='job-card__details__wrapper']/descendant::div[contains(@id,'location')]", jobTitle).build();
    }
    public carouselJobTypeLabel(jobTitle: string): Locator {
      return this.getLocatorWithParam("//div[(text()='%s')]/ancestor::div[@class='job-card__details__header']/following-sibling::div/child::div/following-sibling::div[@class='job-card__details__job-type']/descendant::span[2]", jobTitle);
    }
    public carouselJobMatchLabel(job: string): Locator {
      return this.getLocatorWithParam("//div[(text()='%s')]/ancestor::div[@class='job-card__details']/following-sibling::div/descendant::div[@class='matching-label']", job);
    }
    public carouselJobMatchProgressBar(job: string): Locator {
      return this.getLocatorWithParam("//div[contains(@class,'job-card__details__title')][text()='%s']/parent::div/parent::div/descendant::div[@class='progress-container']/descendant::span[2]", job);
    }
    public smileIconForJobVacancy(jobTitle: string): Locator {
      return this.getLocatorWithParam("//div[(text()='%s')]/ancestor::div[@class='job-card__details']/following-sibling::div/descendant::div[@class='smile-icon']/child::img", jobTitle);
    }
    public carouselSkillLabel(jobTitle: string): Locator {
      return this.getLocatorWithParam("//div[(text()='%s')]/ancestor::div[@class='job-card__details__header']/following-sibling::div/child::div[@class='job-card__skills']/descendant::li[@class='job-skill__skills__chip']", jobTitle);
    }
    public rightCarouselControlButton: Locator = this.page.locator("//button[@aria-label='Next']");
    public leftCarouselControlButton: Locator = this.page.locator("//button[@aria-label='Previous']");
    public jobTitlesOnCarousel: Locator = this.page.locator("//a[@class='job-card__details__title']/child::div");
    public toolTip: Locator = this.page.locator("//div[contains(@class, 'MuiTooltip-tooltipArrow')]");
    public backButton: Locator = getByRole(AriaRole.BUTTON, "Back").build();
    public closeButton: Locator = this.page.locator("//button[text()='Close']");
    public alertForSimilarJobsRadiobutton: Locator = this.page.locator("//input[@id='Set alerts for similar Job Vacancies!']");
    public viewAllLink: Locator = this.page.locator("div.tm-carousel__header__right__view-all > a");
    public levelLabel: Locator = this.page.locator("//div[@class='vacancy-information__label'][text()='Level']/following-sibling::div");
    public careerPathIcon: Locator = this.page.locator("//div[@class='career-pathing block']/descendant::*[@class='career-path-icon']");
    public careerPathHeader: Locator = this.page.locator("//div[@class='career-pathing block']/descendant::span[@class='section-subheader']");
    public careerPathDescription: Locator = this.page.locator("//div[@class='career-pathing block']/descendant::span[@class='section-subheader']/following-sibling::span");
    public seeAllCareerPathsButton: Locator = this.page.locator("//div[@class='career-pathing block']/descendant::button");
    public statusMessage: Locator = this.page.locator("//span[@class='status-message__text']");
    public relatedSkillsLink: Locator = this.page.locator(".job-skills>button");
    public addSkillsToPassport: Locator = this.page.locator(".job-skills__action-footer button.ed-btn-neutral:last-of-type");
    public setLearningGoals: Locator = this.page.locator(".job-skills__action-footer button.ed-btn-neutral:nth-child(2)");
    public Locator skillCheckbox(String skillLabel){ return this.getLocatorWithParam("//span[text()='%s']/ancestor::label/input", skillLabel); };
    public addSkillButton: Locator = this.page.locator(".ed-dialog-modal-footer button.ed-btn-primary");
    public Locator matchingSkillColumn(String skillLabel, int columnNumber){ return this.getLocatorWithParam("//p[text()='%s']/ancestor::tr/td[%s]//p", skillLabel, String.valueOf(columnNumber)); };
    public Locator learningGoalColumn(String skillLabel, int columnNumber){ return this.getLocatorWithParam("//span[text()='%s']/ancestor::tr/td[%s]", skillLabel,String.valueOf(columnNumber)); };
    public closeMatchingSkillsModalButton: Locator = this.page.locator(".ed-dialog-modal-footer >button[aria-label='Close']");
    public addLearningGoalButton: Locator = this.page.locator("button[aria-label='Add']");
    public Locator skillsOfLevel(String skillsLevel){ return this.getLocatorWithParam("//div[@class = 'job-skill__group'][div/p[text()='%s']/parent::div]/descendant::li[contains(@class,'job-skill__skills')]", skillsLevel); };
    public showMoreSkillsButton: Locator = this.page.locator(".job-skills-block .job-skill__skills--remaining button");
    public jobWithExcellentOrGoodMatch: Locator = locator("//div[@class='job-matching job-card__matching']/descendant::div[text()='Excellent match']|//div[text()='Good match']").build();
    public noDataLabel: Locator = this.page.locator("//div[@class='tm-opportunities__no-data']/descendant::div/following-sibling::div");

    // ------------------------------------ CAREER PATHS locators ------------------------------------------------------
    public markRoleAsAspirationalButton: Locator = this.page.locator("//div[@class='career-pathing-head-actions']/descendant::button");
    public markRoleAsAspirationalButton_alternate: Locator = this.page.locator("//button[contains(text(),'Mark as Aspirational')]");
    public markedAsAspirationalRoleButton: Locator = this.page.locator("//div[@id='menuContent']/div[@class='footer-wrapped-content reduce-footer']/main/div[@class='tmp-layout-content']//div[@class='button-marked']/i[@class='icon-bullseye-arrow']");
    public aspirationalSubmenuButton(pathName: string): Locator {
      return this.getLocatorWithParam("//div[@class='aspirational-paths__submenu block']/descendant::button[text()='%s']", pathName);
    }
    public aspirationalIconForPath(pathName: string): Locator {
      return this.getLocatorWithParam("//button[text()='%s']/following-sibling::i", pathName);
    }
    public changePathButton: Locator = this.page.locator("//button[@class='aspirational-paths-change__button ed-link']");
    public header: Locator = this.page.locator("//div[@class='ed-dialog-modal-header']");
    public statusIcon: Locator = this.page.locator("//span[contains(@class,'status-icon--big icon-exclamation-circle')]");
    public errorMessage: Locator = this.page.locator("//span[@class='status-message__text'][contains(text(),'Something went wrong')]");
    public statusMessageDescription: Locator = this.page.locator("//span[@class='status-message__text']/following-sibling::span");
    public customPill: Locator = this.page.locator("//div[contains(@class, '--custom-message')]/descendant::div[@class='cp-role-pill__name']");
    public subwayViewDescription: Locator = this.page.locator("//div[@class='cp-subway-view__description']");
    public userRoleName: Locator = this.page.locator("//div[@class='cp-user-role__name']/child::div[1]");
    public path(number: string): Locator {
      return this.getLocatorWithParam("//*[@id='path_nr_%s']", number);
    }
    public paths: Locator = this.page.locator("//*[contains(@id,'path_nr_')]");
    public movesForGivenPath(pathNo: string): Locator {
      return this.getLocatorWithParam("//*[contains(@id,'path_nr_%s')]/child::*", pathNo);
    }
    public highlightedMoveForGivenPath(pathNo: string): Locator {
      return this.getLocatorWithParam("//*[contains(@id,'path_nr_%s')]/child::*[contains(@class,'highlihgted')]", pathNo);
    }
    public moveForGivenStep(pathNo: string, pathNoPlus1: string, stepNo: string): Locator {
      return this.getLocatorWithParam("//*[contains(@id,'%s')]/child::*[contains(@class, 'path_%s step_%s')]", pathNo, pathNoPlus1, stepNo);
    }
    public moveByPathAndStep(pathNo: string, stepNo: string): Locator {
      return this.getLocatorWithParam("//*[contains(@class, 'path_%s step_%s')]", pathNo, stepNo);
    }
    public roleName: Locator = this.page.locator("//div[@class='cp-role-pill__name']/child::div");
    public goalRoleName: Locator = this.page.locator("//div[contains(@class,'cp-role-pill--highlighted')]/descendant::div[@class='cp-role-pill__name']");
    public roleBackgroundColor(roleName: string): Locator {
      return this.getLocatorWithParam("//div[contains(@class, 'cp-role-pill__content')][descendant::div[text() = '%s']]", roleName);
    }
    public gridLine: Locator = this.page.locator("//div[@class='cp-subway-view__container']/descendant::*[@stroke='#ddd']");
    public rolePosition(roleName: string): Locator {
      return this.getLocatorWithParam("//div[text()='%s']/parent::div[@class='cp-role-pill__name']/parent::div/parent::div", roleName);
    }
    public pathButton(pathName: string): Locator {
      return this.getLocatorWithParam("//div[@class='cp-subway-view__path-tabs ']/descendant::button[text()='%s']", pathName);
    }
    public closeModalButton: Locator = this.page.locator("//div[@class='ed-dialog-modal-footer ']/child::button[text()='Close']");
    public aspirationalRoleConfirmationText: Locator = this.page.locator("//div[@class='button-marked']");
    public optionallyAddSkillsCloseModal: Locator = this.page.locator("//div[@role='dialog']//button[@class='ed-btn ed-btn-neutral']");
    public noPathSelection: Locator = this.page.locator("//button[contains(text(),'No path selection')]");
    public descriptionBlock: Locator = this.page.locator("//div[@class='job-description block']");
    public roleDetailsMatching: Locator = this.page.locator("//div[@class='job-matching']/div[@class='job-matching__details']/div[@class='matching-label']");
    public roleDetailsLevel: Locator = this.page.locator("//div[@class='right-panel']/div/div[@class='odp-infobox ']/div[2]/div/div[text()='Level']");
    public jobRoleDetailsLocation: Locator = getByText("Location").build();
    public roleMessage: Locator = getByText("No direct path to this Job").build();

	public dismissRole(): RoleDetailsPage {
        dismissButton.click();
//        cy.wait(1000)
        return this;
    }

	public undismissRole(): RoleDetailsPage {
        undismissButton.click();
        return this;
    }

    public optionallyAddSkillsCloseModal(): RoleDetailsPage {
        optionallyAddSkillsCloseModal.click();
        return this;
    }

    public showMatchDetails(): MatchingAnalysisModalPage {
        matchDetails.click();
        return this.getPageClassInstance(MatchingAnalysisModalPage);
    }

	public getRoleId(roleId: ResultContainer): RoleDetailsPage {
        roleId.setValue(this.page.url().split("/")[6]);
        return this;
    }

	public hoverOverMatchInformation(): RoleDetailsPage {
        this.page.waitForLoadState();
        matchInformation.first().hover();
        return this;
    }

	public clickViewAllButton(): VacanciesListPage_New {
        viewAllLink.click();
        return this.getPageClassInstance(VacanciesListPage_New);
    }

	public clickBackButton(): RolesListPage_New {
        backButton.click();
        this.page.waitForLoadState();
        return this.getPageClassInstance(RolesListPage_New);
    }

    public clickBackButtonAndReturnToGalaxyView(): CareerPathPage_New {
        this.page.waitForLoadState(LoadState.DOMCONTENTLOADED);
        this.page.waitForLoadState(LoadState.DOMCONTENTLOADED);
        backButton.click();
        this.page.waitForLoadState(LoadState.DOMCONTENTLOADED);
        return this.getPageClassInstance(CareerPathPage_New);
    }

	public goToProfileFromModal(): RoleDetailsPage {
        closeButton.click();
//        cy.wait(1000)
        return this;
    }

	public getFirstJobVacancyOnCarousel(jobVacancyTitleContainer: ResultContainer): RoleDetailsPage {
        jobVacancyTitleContainer.setValue(jobTitlesOnCarousel.first().textContent());
        return this;
    }

	public goToFirstJobVacancyOnCarousel(): JobVacancyDetailsPage {
        jobTitlesOnCarousel.first().click();
        return this.getPageClassInstance(JobVacancyDetailsPage);
    }

	public clickLeftControlButton(): RoleDetailsPage {
        this.page.waitForLoadState(LoadState.DOMCONTENTLOADED);
        this.pause(1000);
        leftCarouselControlButton.click();
        this.pause(1000);
        this.page.waitForLoadState(LoadState.DOMCONTENTLOADED);
        return this;
    }

	public clickRightControlButton(): RoleDetailsPage {
        this.page.waitForLoadState(LoadState.DOMCONTENTLOADED);
        this.pause(1000);
        if (rightCarouselControlButton.isVisible()) {
            rightCarouselControlButton.click();
        }
        this.pause(1000);
        this.page.waitForLoadState(LoadState.DOMCONTENTLOADED);
        return this;
    }

    public waitForRoleDetailsToBeVisible(roleTitle: string): RoleDetailsPage {
        this.repeatUntilElementToBeVisible(() => {}, roleNameLabel, 10, 5000, () => this.page.reload());
        return this;
    }

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public waitForSkills(): RoleDetailsPage {
        this.page.waitForSelector(".job-skills");
        this.repeatUntilElementToBeNotVisible(() =>{}, this.page.locator(".job-skill__skills--no-skills"), 3, 20000, () =>{this.page.reload(); pause(3000);});
        this.pause(2000);
        return this;
    }

    public clickAddSkillsToPassport(): RoleDetailsPage {
        addSkillsToPassport.click();
        return this;
    }

    public clickSetLearningGoals(): SetYourLerningGoalsModalPage {
        setLearningGoals.click();
        return this.getPageClassInstance(SetYourLerningGoalsModalPage);
    }

    public markSkill(skillLabel: string): RoleDetailsPage {
        this.skillCheckbox(skillLabel).click();
        return this;
    }

    public clickAddSkills(): RoleDetailsPage {
        addSkillButton.click();
        this.page.locator(".success").first().waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        return this;
    }

    public openMatchingSkillsModal(): RoleDetailsPage {
        relatedSkillsLink.click();
        return this;
    }

    public closeMatchingSkillsModal(): RoleDetailsPage {
        closeMatchingSkillsModalButton.click();
        return this;
    }

    public clickAdd(): RoleDetailsPage {
        addLearningGoalButton.click();
        return this;
    }

    public selectLearningTargetLevelForSkill(skillLabel: string, level: string): RoleDetailsPage {
        this.learningGoalColumn(skillLabel, 3).locator("//select").selectOption(level);
        return this;
    }

    public getSkillsOfLevel(skillsLevel: string): Set<string> {
        return this.skillsOfLevel(skillsLevel).all()
            .stream()
            .map(skillElement=>skillElement.innerText())
            .collect(Collectors.toSet());
    }

    public clickShowMoreSkills(): RoleDetailsPage {
        showMoreSkillsButton.click();
        this.page.locator("//button[text()='Show Less']").waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        return this;
    }

    public waitForGoodOrExcellentMatchForLinkedJobVacancy(): RoleDetailsPage {
        this.repeatUntilElementToBeVisible(() => {}, jobWithExcellentOrGoodMatch, 36, 10000,
                () => refreshCurrentPage(SuggestionsPage_New));
        return this;
    }

    // -------------------------------------- CAREER PATHS methods -----------------------------------------------------

    public selectPath(pathNo: string): RoleDetailsPage {
        this.pathButton(pathNo).click();
        this.page.waitForLoadState(LoadState.DOMCONTENTLOADED);
        return this;
    }

    public selectPathAndOpenInterestsModal(pathName: string): JobRoleMarkedAsAspirationalModal {
        this.repeatUntilElementToBeVisible(() =>aspirationalSubmenuButton(pathName).click(), this.page.locator(".goals-modal-content-for-aspirational"), 5, 3000, () =>{});
        return this.getPageClassInstance(JobRoleMarkedAsAspirationalModal);
    }

    public markRoleAspirational(): RoleDetailsPage {
        this.repeatUntilElementToBeVisible(() =>markRoleAsAspirationalButton.click(),this.page.locator(".aspirational-paths__submenu"), 5,3000, () =>{});
        this.page.waitForLoadState(LoadState.DOMCONTENTLOADED);
        return this;
    }

    public markRoleAspirational_alternate(): RoleDetailsPage {
        markRoleAsAspirationalButton_alternate.click();
        noPathSelection.click();
        this.page.waitForLoadState(LoadState.DOMCONTENTLOADED);
        aspirationalRoleConfirmationText.isVisible();
        return this;
    }

    public removeRoleAsAspirational(): RoleDetailsPage {
        if (markedAsAspirationalRoleButton.isVisible()) {
            markedAsAspirationalRoleButton.click();
            this.page.waitForLoadState(LoadState.DOMCONTENTLOADED);
        }
        return this;
    }

    public changePath(): RoleDetailsPage {
        changePathButton.click();
        return this;
    }

    public selectPathForAspirationalSubmenu(pathName: string): RoleDetailsPage {
        this.aspirationalSubmenuButton(pathName).click();
        this.pause(2000);
        closeModalButton.click();
        return this;
    }

    public selectPathForAspirationalSubmenuForExistingAspirationalRole(pathName: string): RoleDetailsPage {
        this.aspirationalSubmenuButton(pathName).click();
        return this;
    }

    public clickOnRoleName(roleName: string): RoleDetailsPage {
        this.rolePosition(roleName).click();
        return this;
    }

    public getRoleName(roleNameContainer: ResultContainer): RoleDetailsPage {
        roleNameContainer.setValue(roleName.textContent());
        return this;
    }

    public refreshPageUntilSubwayViewIsDisplayed(): RoleDetailsPage {
        this.repeatUntilElementToBeVisible(() => {
            paths.first().waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        }, userRoleName, 3, 3000, () => {
            this.refreshPage();
            this.page.waitForLoadState(LoadState.DOMCONTENTLOADED);
        });
        return this;
    }

    public refreshPage(): RoleDetailsPage {
        this.page.reload();
        return this;
    }

    public clickOnMarkRoleAsAspirationalButton(): RoleDetailsPage {
        this.pause(2000);
        markRoleAsAspirationalButton.click();
        this.pause(2000);
        return this;
    }
}
