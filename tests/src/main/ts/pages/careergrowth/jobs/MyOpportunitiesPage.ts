// @ts-nocheck
import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, LoadState, Locator, WaitForSelectorState } from "common/testing/playwright";
import { VacanciesListPage_New } from "pages/careergrowth/careergrowth/VacanciesListPage_New";
import { EditJobVacancyPage } from "pages/careergrowth/jobs/EditJobVacancyPage";
import { JobVacancyDetailsPage } from "pages/careergrowth/jobs/JobVacancyDetailsPage";

export class MyOpportunitiesPage extends BasePage {

    public jobCardByTitle(vacancyTitle: string): Locator {

      return this.getLocatorWithParam("//div[text()='%s']", vacancyTitle);

    }
    public jobCardById(jobId: string): Locator {
      return this.getLocatorWithParam("//div[@class='job-cards']/child::div[@data-testid='%s']", jobId);
    }
    public jobCards: Locator = this.page.locator("//a[contains(@class, 'job-card__details__title')]");
    public matchingLabel: Locator = this.page.locator("//p[@class ='matching-label']");
    public shareButton: Locator = this.page.locator("//button[contains(@id, 'card-share-job-details')]");
    public dismissButton: Locator = this.page.locator("//i[@class='icon-ban']/parent::button");
    public jobVacancyDismissButton(vacancyTitle: string): Locator {
      return this.getLocatorWithParam("//a[contains(@class, 'job-card__details__title')]/div[text()='%s']/ancestor::div[contains(@class, 'job-card')][contains(@class, 'ed-ui')]/descendant::i[@class='icon-ban']/parent::button", vacancyTitle);
    }
    public jobIdDismissButton(jobId: string): Locator {
      return this.getLocatorWithParam("//div[@class= 'job-cards']/child::div[@data-testid='%s']/descendant::i[@class='icon-ban']/parent::button", jobId);
    }
    public jobVacancyInApplicationsSection: Locator = this.page.locator("//div[@class='tm-carousel__header__left__title'][text()='Applications']/ancestor::div[@class='tm-carousel ed-ui']/descendant::div[contains(@class, 'job-card__details__title')]");
    public jobVacancyInBookmarkedSection: Locator = this.page.locator("//div[@class='tm-carousel__header__left__title'][text()='Bookmarked']/ancestor::div[@class='tm-carousel ed-ui']/descendant::div[contains(@class, 'job-card__details__title')]");
    public jobVacancyMarkedAsBookmarked(vacancyTitle: string): Locator {
      return this.getLocatorWithParam("//a[contains(@class, 'job-card__details__title')]/div[text()='%s']/ancestor::div[contains(@class, 'job-card')][contains(@class, 'ed-ui')]/descendant::i[@class='icon-bookmark-fill']", vacancyTitle);
    }
    public jobVacancyIdMarkedAsBookmarked(jobId: string): Locator {
      return this.getLocatorWithParam("//div[contains(@class, 'job-card ed-ui')][@data-testid='%s']/descendant::i[@class='icon-bookmark-fill']", jobId);
    }
    public unbookmarkJobVacancyByTitleButton(vacancyTitle: string): Locator {
      return this.getLocatorWithParam("//a[contains(@class, 'job-card__details__title')]/div[text()='%s']/ancestor::div[contains(@class, 'job-card')][contains(@class, 'ed-ui')]/descendant::i[@class='icon-bookmark-fill']/parent::button", vacancyTitle);
    }
    public unbookmarkButton: Locator = this.page.locator("//i[@class='icon-bookmark-fill']/parent::button");
    public bookmarkButton: Locator = this.page.locator("//i[@class='icon-bookmark']/parent::button");
    public leftMenuTab(tabName: string): Locator {
      return this.getByText(tabName);
    }
    public selectedTab(tabName: string): Locator {
      return this.getLocatorWithParam("//button[text() ='%s'][contains(@class,'selected')]", tabName);
    }
    public noJobVacanciesToShowInfo: Locator = this.page.locator("//div[@class='tm-opportunities__no-data']/child::div[@class='icon-area']/following-sibling::div[1]");
    public exploreJobsButton: Locator = this.page.locator("//button[@id ='Explore Job Vacancies']");
    public moreActionsButton: Locator = this.page.locator("//div[@class='job-cards']/div//div[@class='dropdown-wrapper undefined']/button[@class='dropdown-btn']");
    public moreActionsForFirstJobButton: Locator = this.page.locator("//div[contains(@class,'job-card__details')]/descendant::button[@class = 'dropdown-btn']");
    public editOption: Locator = this.page.locator("//ul[@class='tm__project-dropdown-list']/child::li/button[text()='Edit']");
    public skillNameChip(title: string): Locator {
      return this.getLocatorWithParam("//li[contains(@class, 'job-skill__skills__chip')][text() = '%s']", title);
    }
    public skillChip(title: string): Locator {
      return this.getLocatorWithParam("//a[contains(@class, 'job-card__details__title')]/div[text()='%s']/ancestor::div[@class = 'job-card__details']/descendant::li[@class='job-skill__skills__chip']", title);
    }
    public skillChipByJobId(id: string): Locator {
      return this.getLocatorWithParam("div[data-testid = '%s'] ul.job-skill__skills", id);
    }
    public skillChipByJobIdAndSkill(id: string, skill: string): Locator {
      return this.getLocatorWithParam("//div[@data-testid = '%s']/descendant::li[@class = 'job-skill__skills__chip'][text() = '%s']", id, skill);
    }
    public skillChipByJobTitleAndSkill(jobTitle: string, skill: string): Locator {
      return this.getLocatorWithParam("//div[@class = 'job-card__details'][descendant::a[contains(@class, 'job-card__details__title')]/div[text()='%s']]/descendant::li[@class='job-skill__skills__chip'][text()='%s']", jobTitle, skill);
    }
    public viewMessage: Locator = this.page.locator(".view-messages-btn");
    public message: Locator = this.page.locator(".view-message-modal-container-user-info-message>p");
    public closeButton: Locator = this.page.locator(".view-message-modal button.ed-btn-neutral");
    public sharedJobByTitle(jobTitle: string): Locator {
      return this.getLocatorWithParam("//h3[contains(text(),'%s')]", jobTitle);
    }
    public sharedJobById(jobId: string): Locator {
      return this.getLocatorWithParam("div[data-testid='%s']", jobId);
    }
    public jobThreeDotMenu(jobId: string): Locator {
      return this.getLocatorWithParam("div[data-testid='%s'] div.dropdown-wrapper", jobId);
    }
    public dismissOption: Locator = this.page.locator("//ul[@class='tm__project-dropdown-list']/li[text()='Dismiss']");

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public selectLeftMenuTab(tabName: string): MyOpportunitiesPage {
        this.leftMenuTab(tabName).click();
        return this;
    }

	public clickJobCard(vacancyTitle: string): JobVacancyDetailsPage {
        this.jobCardByTitle(vacancyTitle).click();
        return this.getPageClassInstance(JobVacancyDetailsPage);
    }

	public clickUnbookmarkJobVacancy(): MyOpportunitiesPage {
        unbookmarkButton.first().click();
        try {
            Thread.sleep(5000);
        } catch (e) {
        }
        return this;
    }

	public clickUnbookmarkJobVacancyByTitle(vacancyTitle: string): MyOpportunitiesPage {
        this.unbookmarkJobVacancyByTitleButton(vacancyTitle).first().click();
        this.jobCardByTitle(vacancyTitle).first().waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.HIDDEN));
        return this;
    }

	public dismissJobVacancy(): MyOpportunitiesPage {
        dismissButton.first().click();
        return this;
    }

	public undismissJobById(jobId: string): MyOpportunitiesPage {
        this.jobIdDismissButton(jobId).first().click();
        try {
            Thread.sleep(5000);
        } catch (e) {
        }
        return this;
    }

	public undismissJobByTitle(jobTitle: string): MyOpportunitiesPage {
        this.jobVacancyDismissButton(jobTitle).first().click();
        this.pause(5000);
        return this;
    }

	public clickExploreOpenJobs(): VacanciesListPage_New {
        exploreJobsButton.first().click();
        return this.getPageClassInstance(VacanciesListPage_New);
    }

	public clickMoreActionButton(title: string): MyOpportunitiesPage {
//        repeatUntilElementToBeVisible(() =>{}, moreActionsButton(title), 10, 10000, this::refreshPage);
        moreActionsButton.first().click();
        return this;
    }

    public clickMoreActionButtonForFirstJob(): MyOpportunitiesPage {
        moreActionsForFirstJobButton.first().click();
        return this;
    }

	public editJob(title: string): EditJobVacancyPage {
        this.clickMoreActionButton(title);
        editOption.click();
        return this.getPageClassInstance(EditJobVacancyPage);
    }

    public editFirstJob(): EditJobVacancyPage {
        this.clickMoreActionButtonForFirstJob();
        editOption.click();
        return this.getPageClassInstance(EditJobVacancyPage);
    }

	public refreshPage(): MyOpportunitiesPage {
        this.page.reload();
        return this;
    }

	public waitForJobSkillToBeVisible(jobId: string, skill: string): MyOpportunitiesPage {
        this.repeatUntilElementToBeVisible(() => {
        }, skillChipByJobIdAndSkill(jobId, skill), 10, 10000, () => {
            this.refreshPage();
        });
        this.page.waitForLoadState(LoadState.DOMCONTENTLOADED);
        this.skillChipByJobIdAndSkill(jobId, skill).waitFor(new Locator.WaitForOptions().setTimeout(20000).setState(WaitForSelectorState.VISIBLE));
        return this;
    }

    public waitForJobSkillToBeVisibleOnJobCard(jobTitle: string, skill: string): MyOpportunitiesPage {
        this.repeatUntilElementToBeVisible(() => {
        }, skillChipByJobTitleAndSkill(jobTitle, skill), 10, 10000, () => {
            this.refreshPage();
        });
        this.page.waitForLoadState(LoadState.DOMCONTENTLOADED);
        this.skillChipByJobTitleAndSkill(jobTitle, skill).waitFor(new Locator.WaitForOptions().setTimeout(20000).setState(WaitForSelectorState.VISIBLE));
        return this;
    }

    public waitForSkillToBeVisible(skill: string): MyOpportunitiesPage {
        this.repeatUntilElementToBeVisible(() => {
        }, skillNameChip(skill), 24, 10000, () => {
            this.refreshPage();
        });
        return this;
    }

    public waitForJobToBeVisible(): MyOpportunitiesPage {
        this.repeatUntilElementToBeVisible(() => {
            this.refreshPage();
        }, jobCards, 10, 10000, () => {
            try {
                Thread.sleep(3000);
            } catch (e) {
            }
        });
        this.pause(2000);
        return this;
    }

    public waitForJobToBeVisible(jobTitle: string): MyOpportunitiesPage {
        this.repeatUntilElementToBeVisible(() => {
            this.refreshPage();
        }, jobCardByTitle(jobTitle), 10, 10000, () => {
            try {
                Thread.sleep(3000);
            } catch (e) {
            }
        });
        return this;
    }

    public clickViewMessage(): MyOpportunitiesPage {
        viewMessage.first().click();
        return this;
    }

	public closeMessageModal(): MyOpportunitiesPage {
        closeButton.click();
        return this;
    }

	public expandMenuInContextOfTheRole(jobId: string): MyOpportunitiesPage {
        this.jobThreeDotMenu(jobId).click();
        return this;
    }

	public dismissSharedJob(): MyOpportunitiesPage {
        dismissOption.click();
        return this;
    }
}
