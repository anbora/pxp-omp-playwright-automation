import { BasePage } from "common/BasePage";
import { ElementType } from "common/enums/ElementType";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { AriaRole, Browser, LoadState, Locator, WaitForSelectorState } from "common/testing/playwright";
import { ResultContainer } from "models/ResultContainer";
import { AddToSkillsPassportModalPage } from "pages/careergrowth/AddToSkillsPassportModalPage";
import { SuggestionsPage_New } from "pages/careergrowth/careergrowth/SuggestionsPage_New";
import { VacanciesListPage_New } from "pages/careergrowth/careergrowth/VacanciesListPage_New";
import { EditJobVacancyPage } from "pages/careergrowth/jobs/EditJobVacancyPage";
import { JobVacancySkillModalPage } from "pages/careergrowth/jobs/JobVacancySkillModalPage";
import { ShareContentModalPage } from "pages/careergrowth/jobs/ShareContentModalPage";
import { ShowInterestModalPage } from "pages/careergrowth/jobs/ShowInterestModalPage";
import { MatchingAnalysisModalPage } from "pages/careergrowth/MatchingAnalysisModalPage";
import { RoleDetailsPage } from "pages/careergrowth/roles/RoleDetailsPage";
import { SetYourLerningGoalsModalPage } from "pages/careergrowth/SetYourLerningGoalsModalPage";

export class JobVacancyDetailsPage extends BasePage {
  static pageModel = { pageName: "Job Vacancy Details", url: "/career/detail/job_vacancy/%s", checkUrl: false };

    private static readonly RIGHT_DETAILS: string = ".vacancy-details";
    public jobTitle: Locator = this.page.locator("//div[@class = 'job-title block']");
    public matchingLabel: Locator = this.page.locator("div.matching-label");
    public applyButton: Locator = getByRole(AriaRole.LINK, "Apply").build();
    public anyButton: Locator = this.page.locator("//div[@class='vacancy-details__buttons']/descendant::a[1]");
    public matchingValue: Locator = this.page.locator("div.vacancy-details span.progress-item");
    public shareButton: Locator = this.page.locator("//div[@class='vacancy-details__buttons']/descendant::button[contains(@id, 'card-share-job-details')]");
    public bookmarkButton: Locator = this.page.locator("//i[@class='icon-bookmark']");
    public unbookmarkButton: Locator = this.page.locator(".icon-bookmark-fill");
    public dismissButton: Locator = this.page.locator("//div[@class='vacancy-details__buttons']/descendant::i[@class='icon-ban']/parent::button");
    public description: Locator = this.page.locator("//div[@class='job-description-section']/parent::div/parent::div");
    public descriptionPlainText: Locator = this.page.locator("//div[@class='job-description block']/descendant::div[@class='plainText']");
    public descriptionHeader(headerText: string): Locator {
      return this.getLocatorWithParam("//div[@class='job-description block']/descendant::h3[contains(text(), '%s')]", headerText);
    }
    public descriptionStrongText(strongText: string): Locator {
      return this.getLocatorWithParam("//div[@class='job-description block']/descendant::strong[contains(text(), '%s')]", strongText);
    }
    public descriptionList(listText: string): Locator {
      return this.getLocatorWithParam("//div[@class='job-description block']/descendant::li[contains(text(), '%s')]", listText);
    }
    public yourRecruiter: Locator = this.page.getByText("Your recruiter");
    public matchDetailValue(detailName: string): Locator {
      return this.getLocatorWithParam("//div[text()='%s'][@class='vacancy-information__label']/following-sibling::div", detailName);
    }
    public workplaceModelLabel(workplaceModel: string): Locator {
      return this.getLocatorWithParam("//div[contains(text(), '%s')]/parent::div/parent::div/preceding-sibling::div[@class = 'vacancy-information__label'][text() = 'Location']", workplaceModel);
    }
    public applyButtonText: Locator = this.page.locator(".vacancy-details__buttons > a.ed-btn-primary");
    public applyUrlButton(applyUrl: string): Locator {
      return this.getLocatorWithParam(".vacancy-details__buttons > a[href*='%s']", applyUrl);
    }
    public jobApplied: Locator = this.page.locator("//span[@class='job-applied-info']");
    public context(context: string): Locator {
      return this.getLocatorWithParam("//div[contains(text(), '%s')]", context);
    }
    public matchDetails(): Locator {
      return this.aiLocator(RIGHT_DETAILS, "button.match-modal-link", "Show match details button", ElementType.BUTTON);
    }
    public skillsMatchDetails: Locator = this.page.locator("//div[@id='match-explanations']/descendant::span/child::span[text()='Skills']");
    public skillsMatchDetailsTitle: Locator = this.page.locator("//div[@id='match-explanations']/descendant::span/child::span[text()='Skills']/parent::span");
    public experienceMatchDetails: Locator = this.page.locator("//div[@id='match-explanations']/descendant::span/child::span[text()='Experience']");
    public experienceMatchDetailsTitle: Locator = this.page.locator("//div[@id='match-explanations']/descendant::span/child::span[text()='Experience']/parent::span");
    public matchInformation: Locator = this.page.locator(".icon-inverse-exclamation-circle");
    public threeDotsButton: Locator = this.page.locator(".job-title i.icon-ellipsis-h");
    public editButton: Locator = this.page.locator("//li/button[contains(text(), 'Edit')]");
    public toolTip: Locator = this.page.locator("//div[contains(@class, 'MuiTooltip-tooltipArrow')]");
    public firstSkillChip: Locator = this.page.locator("//li[@class='job-skill__skills__chip'][1]");
    public skillChips(skillValue: string): Locator {
      return this.getLocatorWithParam("//li[starts-with(text(), '%s')]", skillValue);
    }
    public readMoreButton: Locator = this.page.locator("//span[@class='control'][contains(text(), 'read more')]");
    public readLessButton: Locator = this.page.locator("//span[@class='control'][contains(text(), 'read less')]");
    public carouselCounter: Locator = this.page.locator("//div[@class='tm-carousel__header__left__title']/child::span");
    public jobsOnCarousel: Locator = this.page.locator("//div[contains(@class,'ed-carousel')]/descendant::div[@class='job-card__details']");
    public carouselJobTitle(jobTitle: string): Locator {
      return this.getLocatorWithParam("//div[contains(@class,'job-card__details__title')][text() = '%s']", jobTitle);
    }
    public carouselJobLocationLabel(jobTitle: string): Locator {
      return this.getLocatorWithParam("//div[contains(@class,'job-card__details__title')][text() = '%s']/ancestor::div[@class='job-card__details__wrapper']/descendant::div[@class='job-card__details__location']/child::div/following-sibling::div", jobTitle);
    }
    public carouselJobTypeLabel(jobTitle: string): Locator {
      return this.getLocatorWithParam("//div[contains(@class,'job-card__details__title')][text() = '%s']/ancestor::div[@class='job-card__details__wrapper']/descendant::div[@class='job-card__details__job-type']/descendant::span", jobTitle);
    }
    public carouselJobMatchLabel(jobTitle: string): Locator {
      return this.getLocatorWithParam("//div[contains(@class,'job-card__details__title')][text() = '%s']/ancestor::div[@class='job-card ed-ui']/descendant::div[@class='matching-label']", jobTitle);
    }
    public jobWithExcellentMatchingLabel: Locator = this.page.locator("//div[contains(@class,'job-card__details__title')]/ancestor::div[@class='job-card ed-ui']/descendant::div[@class='matching-label'][text()='Excellent match']");
    public smileIconForJobVacancy(jobTitle: string): Locator {
      return this.getLocatorWithParam("//div[contains(@class,'job-card__details__title')][text()='%s']/parent::div/parent::div/parent::div/following-sibling::div/descendant::div[@class='smile-icon']/child::*/child::*[1]/child::*[1]", jobTitle);
    }
    public carouselJobMatchProgressBar(job: string, width: string): Locator {
      return this.getLocatorWithParam("//div[contains(@class,'job-card__details__title')][text() = '%s']/parent::div/parent::div/descendant::div[@class='progress-container']/descendant::span[@style='%s']/parent::span", job, width);
    }
    public carouselSkillLabel(jobTitle: string, skill: string): Locator {
      return this.getLocatorWithParam("//div[contains(@class,'job-card__details__title')][text() = '%s']/ancestor::div[@class='job-card__details__wrapper']/descendant::li[@class='job-skill__skills__chip'][contains(text(),'%s')]", jobTitle, skill);
    }
    public rightCarouselControlButton: Locator = this.page.locator("//button[@class='scroll-btn right']");
    public leftCarouselControlButton: Locator = this.page.locator("//button[@class='scroll-btn left']");
    public firstItemOnJobCarousel: Locator = this.page.locator("//div[@class='job-card-widget__container']/div/div[@role='region']/div/ul/div//button[@class='job-card__details__title']");
    public addSkillsToPassportButton: Locator = getByRole(AriaRole.BUTTON, "Add skills to passport").build();
    public skillsPassportNumberOfSkills(userSkills: string): Locator {
      return this.getLocatorWithParam("//span[contains(text(), 'You have %s out of')][contains(text(), ' skills in your skill passport.')]", userSkills);
    }
    public skillsPassportNumberOfSkills_SkillLevel(userSkills: string): Locator {
      return this.getLocatorWithParam("//button[contains(text(), 'You have %s out of')][contains(text(), ' of the desired skills based on your profile')]", userSkills);
    }
    public matchIcon(area: string): Locator {
      return this.getLocatorWithParam("//span[text()='%s']/parent::span/child::i", area);
    }
    public jobTitleOnJobCarousel(jobTitle: string): Locator {
      return this.getLocatorWithParam("//div[contains(@class,'job-card__details__title')][text()='%s']", jobTitle);
    }
    public alertForSimilarJobsRadiobutton: Locator = this.page.locator("//input[@id='Set alerts for similar Job Vacancies']");
    public shareButtonForSimilarJob(jobTitle: string): Locator {
      return this.getLocatorWithParam("//button[contains(@class, 'job-card__details__title')]/div[text()='%s']/ancestor::div[contains(@class, 'ed-ui')][1]/descendant::button[contains(@id,'card-share-job-details')]", jobTitle);
    }
    public bookmarkButtonForSimilarJob(jobTitle: string): Locator {
      return this.getLocatorWithParam("//button[contains(@class, 'job-card__details__title')]/div[text()='%s']/ancestor::div[contains(@class, 'ed-ui')][1]/descendant::i[@class='icon-bookmark']/parent::button", jobTitle);
    }
    public bookmarkedButtonForSimilarJob(jobTitle: string): Locator {
      return this.getLocatorWithParam("//button[contains(@class, 'job-card__details__title')]/div[text()='%s']/ancestor::div[contains(@class, 'ed-ui')][1]/descendant::i[@class='icon-bookmark-fill']/parent::button", jobTitle);
    }
    public dismissButtonForSimilarJob(jobTitle: string): Locator {
      return this.getLocatorWithParam("//button[contains(@class, 'job-card__details__title')]/div[text()='%s']/ancestor::div[contains(@class, 'ed-ui')][1]/descendant::i[@class='icon-ban']/parent::button", jobTitle);
    }
    public dismissedButtonForSimilarJob(jobTitle: string): Locator {
      return this.getLocatorWithParam("//button[contains(@class, 'job-card__details__title')]/div[text()='%s']/ancestor::div[contains(@class, 'ed-ui')][1]/descendant::i[@class='icon-ban']/parent::button[@class='ed-btn no-padding min-width-0 social-activity-btn--red social-activity-btn--red-active']", jobTitle);
    }
    public viewAllLink: Locator = this.page.locator("div.tm-carousel__header__right__view-all > a");
    public jobDescriptionHeader: Locator = this.page.locator("//div[@class='job-description block']/descendant::span[contains(text(), 'Description')]");
    public jobVacancyHeader: Locator = this.page.locator("//span[contains(text(), 'Job Vacancy')]");
    public skillsOfLevel(skillsLevel: string): Locator {
      return locatorWithParams("//div[@class = 'job-skill__group'][div/p[text()='%s']/parent::div]/descendant::li[contains(@class,'job-skill__skills')]", skillsLevel).build();
    }
    public skillsWithoutLevel: Locator = this.page.locator(".related-skills .job-skill__skills__chip");
    public skillContainer(n: number): Locator {
      return this.getLocatorWithParam("div.job-skill__group:nth-child(n)", String.valueOf(n));
    }
    public Locator skillContainer(String level){ return this.getLocatorWithParam("//div[@class = 'job-skill__group'][div/p[text()='%s']/parent::div]", level); };
    public showMoreSkillsButton: Locator = this.page.locator(".job-skills-block .job-skill__skills--remaining button");
    public relatedSkillsLink: Locator = this.page.locator(".job-skills>button");
    public addSkillsToPassport: Locator = this.page.locator(".job-skills__action-footer button.ed-btn-neutral:last-of-type");
    public setLearningGoalsButton: Locator = getByRole(AriaRole.BUTTON, "Set Learning Goals").build();
    public growYourSkillsButton: Locator = getByRole(AriaRole.BUTTON, "Grow your skills").build();
    public allSkills: Locator = this.page.locator(".job-skills-block .job-skill__skills__chip");
    public proficiencyLevels: Locator = this.page.locator("//p[@class='job-skill__group__label'][text()!='']");
    private skillNameElement(skillName: string): Locator {
      return this.getLocatorWithParam("//li[@class = 'job-skill__skills__chip'][text() = '%s']", skillName);
    }
    public backButton: Locator = getByRole(AriaRole.BUTTON, "Back").build();

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public getJobId(jobId: ResultContainer): JobVacancyDetailsPage {
        jobId.setValue(this.page.url().split("/")[6]);
        return this;
    }

    public getJobTitle(jobTitleResultContainer: ResultContainer): JobVacancyDetailsPage {
        jobTitleResultContainer.setValue(jobTitle.textContent());
        return this;
    }

    public clickApplyButton(): ShowInterestModalPage {
        applyButton.click();
        return this.getPageClassInstance(ShowInterestModalPage);
    }

    public <T extends BasePage> clickApplyButtonAndGoToPage(clazz: Class<T>): T {
//        applyButton.click();
        return this.openPageInNewTab(anyButton, clazz);
    }

    public clickViewOnCareerSiteButton(): ShowInterestModalPage {
        applyButtonText.click();
        return this.getPageClassInstance(ShowInterestModalPage);
    }

    public clickBookmarkButton(): JobVacancyDetailsPage {
        bookmarkButton.first().waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        bookmarkButton.click();
        unbookmarkButton.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        return this;
    }

    public unbookmark(): JobVacancyDetailsPage {
        unbookmarkButton.first().waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        unbookmarkButton.click();
        bookmarkButton.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        return this;
    }

    public bookmark(): JobVacancyDetailsPage {
        bookmarkButton.click();
        return this;
    }

    public clickDismissButton(): JobVacancyDetailsPage {
        anyButton.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        if (dismissButton.isVisible()) {
            dismissButton.click();
            this.pause(5000);
        }
        return this;
    }

    public clickBackButton(): VacanciesListPage_New {
        this.page.waitForLoadState();
        backButton.click();
        this.pause(5000);
        return this.getPageClassInstance(VacanciesListPage_New);
    }

    public clickBackButtonToSuggestionPage(): SuggestionsPage_New {
        this.page.waitForLoadState();
        backButton.click();
        this.pause(5000);
        return this.getPageClassInstance(SuggestionsPage_New);
    }

    public clickBackButtonToRolePage(): RoleDetailsPage {
        backButton.click();
        return this.getPageClassInstance(RoleDetailsPage);
    }

    public clickReadMoreButton(): JobVacancyDetailsPage {
        readMoreButton.click();
        return this;
    }

    public clickReadLessButton(): JobVacancyDetailsPage {
        readLessButton.click();
        return this;
    }

    public clickEditVacancyButton(): EditJobVacancyPage {
        threeDotsButton.click();
        editButton.click();
        this.pause(5000);
        return this.getPageClassInstance(EditJobVacancyPage);
    }

	public showMatchDetails(): MatchingAnalysisModalPage {
        this.matchDetails().click();
        return this.getPageClassInstance(MatchingAnalysisModalPage);
    }
    public openMatchDetailsWithWaitForData(): MatchingAnalysisModalPage {
        this.repeatUntilElementToBeNotVisible(() =>matchDetails().click(),this.page.locator("//label[text()='Skills']/parent::button/label[contains(text(), 'Missing')]"),3,5000, () =>this.page.locator(".ed-dialog-modal-footer  button").click());
        return this.getPageClassInstance(MatchingAnalysisModalPage);
    }

    public hoverOverMatchInformation(): JobVacancyDetailsPage {
        matchInformation.hover();
        return this;
    }

    public clickMatchDetailsArea(area: string): JobVacancyDetailsPage {
        this.matchIcon(area).click();
        return this;
    }

    public refreshPage(): JobVacancyDetailsPage {
        this.page.reload();
        return this;
    }

    public refreshPageUntilNewSkillAppears(value: string): JobVacancyDetailsPage {
        this.repeatUntilElementToBeVisible(() => {
            firstSkillChip.first().waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        }, skillChips(value), 10, 10000, () => {
            this.refreshPage();
        });
        return this;
    }

    public addSkillsToPassport(): JobVacancySkillModalPage {
        addSkillsToPassportButton.click();
        return this.getPageClassInstance(JobVacancySkillModalPage);
    }

    public goToJobVacancyOnCarousel(jobTitle: string): JobVacancyDetailsPage {
        this.jobTitleOnJobCarousel(jobTitle).first().click();
        return this;
    }

    public hoverOverJobMatchForSimilarJob(jobTitle: string): JobVacancyDetailsPage {
        this.carouselJobMatchLabel(jobTitle).hover();
        return this;
    }

    public shareSimilarJob(jobTitle: string): ShareContentModalPage {
        this.shareButtonForSimilarJob(jobTitle).click();
        return this.getPageClassInstance(ShareContentModalPage);
    }

    public bookmarkSimilarJob(jobTitle: string): JobVacancyDetailsPage {
        this.bookmarkButtonForSimilarJob(jobTitle).click();
        return this;
    }

    public dismissSimilarJob(jobTitle: string): JobVacancyDetailsPage {
        this.dismissButtonForSimilarJob(jobTitle).click();
        return this;
    }

    public clickViewAllButton(): VacanciesListPage_New {
        viewAllLink.click();
        return this.getPageClassInstance(VacanciesListPage_New);
    }

    public clickLeftControlButton(): JobVacancyDetailsPage {
        this.page.waitForLoadState(LoadState.DOMCONTENTLOADED);
        this.pause(1000);
        leftCarouselControlButton.click();
        this.pause(1000);
        this.page.waitForLoadState(LoadState.DOMCONTENTLOADED);
        return this;
    }

    public clickRightControlButton(): JobVacancyDetailsPage {
        this.page.waitForLoadState(LoadState.DOMCONTENTLOADED);
        this.pause(1000);
        if (rightCarouselControlButton.isVisible()) {
            rightCarouselControlButton.click();
        }
        this.pause(1000);
        this.page.waitForLoadState(LoadState.DOMCONTENTLOADED);
        return this;
    }

    public getFirstJobVacancyOnCarousel(jobVacancyTitleContainer: ResultContainer): JobVacancyDetailsPage {
        jobVacancyTitleContainer.setValue(firstItemOnJobCarousel.first().textContent());
        return this;
    }

    public goToFirstJobVacancyOnCarousel(): JobVacancyDetailsPage {
        firstItemOnJobCarousel.first().click();
        return this;
    }

    public clickBackButtonToJobVacancyDetailsPage(): JobVacancyDetailsPage {
        backButton.click();
        this.page.waitForLoadState();
        return this;
    }

    public waitForJobVacancyVisibleInCarousel(title: string): JobVacancyDetailsPage {
        this.repeatUntilElementToBeVisible(() => {}, carouselJobTitle(title), 4, 1000, this::clickRightControlButton);
        return this;
    }

    public getSkillsOfLevel(skillsLevel: string): Set<string> {

      return getSkills(skillsOfLevel(skillsLevel));

    }

    public getSkillsWithoutLevel(): Set<string> {

      return getSkills(skillsWithoutLevel);

    }

    private getSkills(skillsLocator: Locator): Set<string> {
        this.page.waitForLoadState(LoadState.DOMCONTENTLOADED);
        this.clickShowMoreSkills();
        this.pause(1000);
        this.page.locator(".related-skills").waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        return skillsLocator.all()
                .stream()
                .map(skillElement=>skillElement.innerText())
                .collect(Collectors.toSet());
    }

    public getNumberOfSkillsInCategory(skillsLevel: string, resultContainer: ResultContainer): JobVacancyDetailsPage {
        let previousResultsNotChanged: number = 0;
        let previousSkillsNo: number = 0;
        do{
            this.clickShowMoreSkills();
            let currentSkillsNo: number = getSkillsFunction.apply(skillsLevel).length;
          if(previousSkillsNo: currentSkillsNo ==):  {
                previousResultsNotChanged++;
            }else{
              let previousSkillsNo:  = currentSkillsNo;
            }
            refreshPage();
            this.page.waitForLoadState(LoadState.DOMCONTENTLOADED);
            this.page.locator(".related-skills").waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        }while(previousResultsNotChanged<4);
        resultContainer.setValue(String.valueOf(getSkillsFunction.apply(skillsLevel).length));
        return this;
    }

    private Function<String, Set<String>> getSkillsFunction = skillLevel=>{
      if(null: skillLevel ==):  {
            return this.getSkillsWithoutLevel();
        }else{
            return this.getSkillsOfLevel(skillLevel);
        }
    };

    public clickShowMoreSkills(): JobVacancyDetailsPage {
        this.pause(2000);
      if(less"): showMoreSkillsButton.isVisible() && !showMoreSkillsButton.textContent().equalsIgnoreCase("show):  {
            showMoreSkillsButton.click();
            this.pause(2000);
        }
        return this;
    }

    public clickMoreButtonUntilSkillWillBeDisplayed(skill: string): JobVacancyDetailsPage {
        this.pause(3000);
        this.repeatUntilElementToBeNotVisible(() => {
        }, skillChips(skill), 6, 10000, () => showMoreSkillsButton.click());
        return this;
    }

    public waitForExcellentMatchingForLinkedJobVacancy(): JobVacancyDetailsPage {
        this.repeatUntilElementToBeVisible(() => {
            this.refreshCurrentPage(RoleDetailsPage);
            jobsOnCarousel.first().waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        }, jobWithExcellentMatchingLabel, 10, 10000, () => {
        });
        return this;
    }

    public clickAddSkillsToPassport(): AddToSkillsPassportModalPage {
        this.pause(2000);
        addSkillsToPassport.first().waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        addSkillsToPassport.click();
        return this.getPageClassInstance(AddToSkillsPassportModalPage);
    }

    public clickSetLearningGoals(): SetYourLerningGoalsModalPage {
        setLearningGoalsButton.click();
        return this.getPageClassInstance(SetYourLerningGoalsModalPage);
    }

    public waitForSkills(): JobVacancyDetailsPage {
        this.page.waitForLoadState(LoadState.DOMCONTENTLOADED);
        this.repeatUntilElementToBeNotVisible(() =>{ this.page.locator(".related-skills span").waitFor(new Locator.WaitForOptions().setTimeout(20000).setState(WaitForSelectorState.VISIBLE));}, this.page.locator(".related-skills .job-skill__skills--no-skills"), 36,10000, this::refreshPage);
        return this;
    }

    public waitForParticularSkill(skillName: string): JobVacancyDetailsPage {
        this.page.waitForLoadState(LoadState.DOMCONTENTLOADED);
        this.repeatUntilElementToBeVisible(
                () => {},
                this.skillNameElement(skillName),
                24,
                10000,
                this::refreshPage);
        return this;
    }
}
