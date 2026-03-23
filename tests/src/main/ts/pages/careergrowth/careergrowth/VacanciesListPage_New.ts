import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { AriaRole, Browser, Locator, WaitForSelectorState } from "common/testing/playwright";
import { ResultContainer } from "models/ResultContainer";
import { CareerGrowthCarouselComponent } from "pages/careergrowth/careergrowth/components/CareerGrowthCarouselComponent";
import { CareerGrowthFiltersComponent } from "pages/careergrowth/careergrowth/components/CareerGrowthFiltersComponent";
import { CareerGrowthLeftMenuComponent } from "pages/careergrowth/careergrowth/components/CareerGrowthLeftMenuComponent";
import { CareerGrowthTopPanelComponent } from "pages/careergrowth/careergrowth/components/CareerGrowthTopPanelComponent";
import { SuggestionsPage_New } from "pages/careergrowth/careergrowth/SuggestionsPage_New";
import { EditJobVacancyPage } from "pages/careergrowth/jobs/EditJobVacancyPage";
import { JobVacancyDetailsPage } from "pages/careergrowth/jobs/JobVacancyDetailsPage";
import { MyOpportunitiesPage } from "pages/careergrowth/jobs/MyOpportunitiesPage";
import { SkillDetailsModalPage } from "pages/careergrowth/jobs/SkillDetailsModalPage";
import { MatchingSkillsModalPage } from "pages/careergrowth/MatchingSkillsModalPage";

export class VacanciesListPage_New extends BasePage implements CareerGrowthTopPanelComponent<VacanciesListPage_New>,
        CareerGrowthCarouselComponent<VacanciesListPage_New>, CareerGrowthFiltersComponent<VacanciesListPage_New>,
        CareerGrowthLeftMenuComponent<VacanciesListPage_New> {

    public allJobVacanciesHeader(): Locator {

      return this.getByRole(AriaRole.HEADING, "All Job Vacancies").build();

    }
    public readonly firstItemOnAllVacanciesListLocator: Locator = locator("//div[@class='all-vacancy-container']/descendant::a[@class='job-card__details__title'][1]").build();
    public jobCardsWithSpecifiedLocation(locationName: string): Locator {
      return locatorWithParams("//div[@class = 'job-card__details__header'][following::div[(contains(text(),'%s'))]]", locationName).build();
    }
    public myJobVacanciesButton(): Locator {
      return this.getByRole(AriaRole.LINK, "My Job Vacancies").build();
    }
    public noJobSkillsLabel(jobTitle: string): Locator {
      return locatorWithParams("//div[contains(@class,'job-card__details')][descendant::div[text() = '%s']]/descendant::li[@class='job-skill__skills--no-skills']", jobTitle).build();
    }
    public jobVacancyMatch(jobVacancyTitle: string): Locator {
      return locatorWithParams("//div[@class='job-cards']/descendant::div[@aria-label='%s']/ancestor::div[@class='job-card ed-ui']/descendant::div[@class='matching-label']", jobVacancyTitle).build();
    }
    public readonly skillsOnJobCard: Locator = locator("//ul[@class = 'job-skill__skills text-mode']/descendant::li").build();
    public shareOpportunityButton(): Locator {
      return this.getByTestId("card-share-actionbutton").build();
    }
    public shareOpportunityFirstJobVacancyCardButton: Locator = locator("//div[@class='all-vacancy-container']/div/div[@class='job-card ed-ui'][1]/div[@class='job-card__footer']/ul/li/button").build();
    public moreSkillsOnJobCard(jobTitle: string): Locator {
      return this.getByTestId(jobTitle).getByTestId("omp-more-skills").build();
    }
    public jobVacancyMatchName(): Locator {
      return this.getByTestId("omp-matching-label").build();
    }
    public editJobOption(): Locator {
      return this.getByRole(AriaRole.LINK, "Edit").build();
    }
    public moreActionsForJobButton(jobTitle: string): Locator {
      return this.getLocatorWithParam("//div[contains(@class,'job-card__details')][descendant::div[text() = '%s']]/descendant::button[@class='dropdown-btn']", jobTitle);
    }
    public jobVacancyIdDismissButton(vacancyId: string): Locator {
      return this.getLocatorWithParam("//div[@class='job-cards']/child::div[@data-testid='%s']/descendant::i[@class='icon-ban']/parent::button", vacancyId);
    }
    public itemOnAllVacanciesListByOrder(number: string): Locator {
      return this.getLocatorWithParam("//div[@class='all-vacancy-container']/descendant::div[@class='job-card__details__wrapper'][%s]/div[1]", number);
    }
    public jobVacancyCardsDetails(vacancyTitle: string): Locator {
      return this.getLocatorWithParam("//div[contains(text(),'%s')]", vacancyTitle);
    }
    public noDataBriefCaseIcon: Locator = this.page.locator("//div[@class='tm-opportunities__no-data']/descendant::i[@class='icon-briefcase-thin']");
    public noDataDescription: Locator = this.page.locator("//div[@class='tm-opportunities__no-data']/descendant::div[2]");
    public readonly noSuggestionsCard: Locator = this.page.locator("//div[contains(text(), 'Sorry, nothing matches your criteria!')]");
    public jobVacancyBookmarked(vacancyTitle: string): Locator {
      return this.getLocatorWithParam("//a[contains(@class, 'job-card__details__title')]/div[text()='%s']/ancestor::div[contains(@class, 'job-card')]/descendant::i[@class='icon-bookmark-fill']", vacancyTitle);
    }
    public recommendedJobVacancyThatContainsTitle(jobVacancyTitle: string): Locator {
      return this.getLocatorWithParam("//div[contains(@class,'ed-carousel')]/descendant::div[contains(@class,'job-card__details__title')][contains(text(), '%s')]", jobVacancyTitle);
    }
    public skillChip(jobTitle: string, skill: string): Locator {
      return this.getLocatorWithParam("//div[contains(@class,'job-card__details')][descendant::div[text() = '%s']]/descendant::li[@class='job-skill__skills__chip'][text()='%s']", jobTitle, skill);
    }
    public remainingSkillsLabel(jobId: string, number: string): Locator {
      return this.getLocatorWithParam("//div[contains(@class, 'job-card')][@data-testid='%s']/descendant::li[@class='job-skill__skills--remaining']/child::button[text()='+ %s more']", jobId, number);
    }
    public jobSkillIcon(jobId: string): Locator {
      return this.getLocatorWithParam("//div[contains(@class, 'job-card')][@data-testid='%s']/descendant::div[@class='job-card__skills']/descendant::div[@class='job-card__skills__icon']/child::i", jobId);
    }
    public jobVacancyBookmark(vacancyTitle: string): Locator {
      return this.getLocatorWithParam("//button[contains(@class, 'job-card__details__title')]/div[text()='%s']/ancestor::div[contains(@class, 'job-card__details')]/following-sibling::div/descendant::i[@class='icon-bookmark']", vacancyTitle);
    }
    public jobById(jobId: string): Locator {
      return this.getLocatorWithParam("//div[@class='job-cards']/child::div[@data-testid='%s']/descendant::i[@class='icon-ban']/parent::button", jobId);
    }
    public noRoleSkillsLabel(roleId: string): Locator {
      return this.getLocatorWithParam("//div[contains(@class,'role-card')][@data-testid='%s']/descendant::li[@class='job-skill__skills--no-skills']", roleId);
    }
    public readonly firstItemOnRecommendedVacanciesListLocator: Locator = this.page.locator("//div[@class='job-card-widget__container']/descendant::div[@class='job-card__details__wrapper'][1]/div[1]");
    public firstSuggestedJobVacancyDismiss: Locator = this.page.locator("//ul/div[1]//ul[@class='social-activity__actions']/li[3]/div//i[@class='icon-ban']");
    public firstSuggestedJobVacancyBookmark: Locator = this.page.locator("//ul/div[1]//ul[@class='social-activity__actions']/li[2]/div");
    public readonly recommendedRoleCounter: Locator = this.page.locator("//div[@class = 'tm-carousel__header__left__title']/span[2]");
    public jobCardName(roleNumber: number): Locator {
      return this.getLocatorWithParam("//div[@class = 'job-card ed-ui'][%s]/descendant::a[contains(@class, 'job-card__details__title')]", String.valueOf(roleNumber));
    }
    public jobCardLocation: Locator = locator("//div[@class='job-card__details__location']").build();
    public jobDetailsLocation: Locator = getByText("Location").build();
    public backButton: Locator = getByRole(AriaRole.BUTTON, "Back").build();
    public noResultsMessage: Locator = getByText("Sorry, nothing matches your criteria! Try different keywords or adjust your filters").build();
    public hoverShare: Locator = this.page.locator("//div[@class='tm__vacancy-card-actions-container']/div[1]/button");
    public hoverBookmark: Locator = this.page.locator("//div[@class='tm__project-card-actions-container']/div[2]/button");
    public readonly emptyResultsOnVacancyList: Locator = this.page.locator(".tm-opportunities__no-data div:nth-of-type(2)");

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public getP(): VacanciesListPage_New {

      return this;
    }

    public typeSearchValue(vacancyName: string): VacanciesListPage_New {

      return typeSearchValueWithWaitForElement(vacancyName, firstCard(), firstCard());

    }

    public typeSearchValueAndWaitForEmptyResults(vacancyName: string): VacanciesListPage_New {

      return typeSearchValueWithWaitForElement(vacancyName, firstItemOnAllVacanciesListLocator, emptyResultsOnVacancyList);

    }

    public waitForJobSkillToBeVisible(title: string, skill: string): VacanciesListPage_New {
        this.repeatUntilElementToBeVisible(() => {
            this.refreshCurrentPage(VacanciesListPage_New);
            this.typeSearchValue(title);
        }, skillChip(title, skill), 5, 10000, () => {});
        return this;
    }

    public waitForJobSkillToNotBeVisible(title: string): VacanciesListPage_New {
        this.repeatUntilElementToBeVisible(() => {
            this.typeSearchValue(title);
        }, noJobSkillsLabel(title), 25, 10000, () => refreshCurrentPage(VacanciesListPage_New));
        return this;
    }

    public clickMyJobVacanciesButton(): MyOpportunitiesPage {
        this.myJobVacanciesButton().click();
        return this.getPageClassInstance(MyOpportunitiesPage);
    }

    public goToFirstJobVacancyOnAllJobsList(): JobVacancyDetailsPage {
        this.pause(5000);
        firstItemOnAllVacanciesListLocator.first().click();
        this.page.waitForLoadState();
        return this.getPageClassInstance(JobVacancyDetailsPage);
    }

    public goToFirstJobVacancyOnRecommendedJobsList(): JobVacancyDetailsPage {
        this.pause(2000);
        firstItemOnRecommendedVacanciesListLocator.first().click();
        this.page.waitForLoadState();
        return this.getPageClassInstance(JobVacancyDetailsPage);
    }

    public goToFirstJobVacancyWithSpecifiedLocation(locationName: string): JobVacancyDetailsPage {
        this.jobCardsWithSpecifiedLocation(locationName).first().click();
        this.page.waitForLoadState();
        return this.getPageClassInstance(JobVacancyDetailsPage);
    }

    public getFirstItemOnAllVacanciesList(jobTitle: ResultContainer): VacanciesListPage_New {
        firstItemOnAllVacanciesListLocator.first().waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        jobTitle.setValue(firstItemOnAllVacanciesListLocator.first().textContent());
        return this;
    }

    public firstSuggestedJobVacancyDismiss(): VacanciesListPage_New {
        this.pause(2000);
        firstSuggestedJobVacancyDismiss.click();
        this.refreshPage();
        return this;
    }

    public firstSuggestedJobVacancyBookmark(): VacanciesListPage_New {
        this.pause(2000);
        firstSuggestedJobVacancyBookmark.click();
        return this;
    }

    public <T extends BasePage> clickShare(clazz: Class<T>): T {
        this.shareOpportunityButton().first().click();
        return this.getPageClassInstance(clazz);
    }

    public <T extends BasePage> clickShareOpportunityFromAllJobVacancies(clazz: Class<T>): T {
        shareOpportunityFirstJobVacancyCardButton.click();
        return this.getPageClassInstance(clazz);
    }

    public viewDetailsOfSkillsForGivenJob(jobTitle: string): SkillDetailsModalPage {
        this.moreSkillsOnJobCard(jobTitle).click();
        return this.getPageClassInstance(SkillDetailsModalPage);
    }

    public hoverOverJobVacancyMatchName(): VacanciesListPage_New {
        this.jobVacancyMatchName().first().hover();
        return this;
    }

    public getJobVacancyScoringValues(scoringName: ResultContainer, scoringValue: ResultContainer): VacanciesListPage_New {
        scoringName.setValue(jobVacancyMatchName().first().textContent());
        return this;
    }

    public editJobById(jobId: string): EditJobVacancyPage {
        this.moreActionsForJobButton(jobId).click();
        this.editJobOption().click();
        return this.getPageClassInstance(EditJobVacancyPage);
    }

    public clickMoreSkillsForJob(jobTitle: string): MatchingSkillsModalPage {
        this.moreSkillsOnJobCard(jobTitle).click();
        return this.getPageClassInstance(MatchingSkillsModalPage);
    }

    public dismissRecommendedJobVacancyByTitle(jobTitle: string): VacanciesListPage_New {
        this.dismissButton(jobTitle).first().click();
        this.pause(4000);
        return this;
    }

    public dismissSuggestedJobById(jobId: string): VacanciesListPage_New {
        this.dismissJobById(jobId);
//        cy.wait(500)
        return this;
    }

    public dismissJobById(jobId: string): VacanciesListPage_New {
        this.jobVacancyIdDismissButton(jobId).click();
        return this;
    }

    public clickJobVacancyCardsDetails(vacancyTitle: string): JobVacancyDetailsPage {
        this.jobVacancyCardsDetails(vacancyTitle).first().click();
        return this.getPageClassInstance(JobVacancyDetailsPage);
    }

    public clickSpecifiedVacancyByOrder(number: string): JobVacancyDetailsPage {
        this.itemOnAllVacanciesListByOrder(number).click();
        return this.getPageClassInstance(JobVacancyDetailsPage);
    }

    public waitUntilJobVacancyTitleDisappearsFromRecommendations(title: string): VacanciesListPage_New {
        this.repeatUntilElementToBeNotVisible(() => {
            this.refreshCurrentPage(SuggestionsPage_New);
            this.firstCardName().first().waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        }, recommendedJobVacancyThatContainsTitle(title), 10, 15000, () => {
        });
        return this;
    }

    public getAllRecommendedJobVacanciesWhichContainsTitle(jobRoleList: ResultContainer, partOfTitle: string): VacanciesListPage_New {
        let counter: number = Integer.parseInt(recommendedRoleCounter.textContent().replace("(", "").replace(")", ""));
        let listOfJobRoles: any = new ArrayList();
        for (int i = 1; i <= counter; i++) {
            let recommendedRoleName: string = jobCardName(i).first().textContent();
            if (recommendedRoleName.contains(partOfTitle)) {
                listOfJobRoles.add(recommendedRoleName);
            }
        }
        jobRoleList.setListValue(listOfJobRoles);
        return this;
    }

    public waitForRecommendationsCounterEqualOrGreaterThan(recommendationCount: number): VacanciesListPage_New {
        let numberOfTries: number = 0;
        let numberOfRepeats: number = 20;
        do {
            numberOfTries++;
            try {
                this.refreshPage();
                Thread.sleep(5000);
                let counter: number = Integer.parseInt(recommendedRoleCounter.textContent().replace("(", "").replace(")", ""));
                if (counter >= recommendationCount) {
                    if (numberOfTries > 1) {
                        System.out.println((format("Worked after %s tries", numberOfTries)));
                    }
                    break;
                }
            } catch (e) {
                //do nothing
            }
        } while (numberOfTries < numberOfRepeats);
        return this;
    }

    public goBackToJobVacanciesFromDetailPage(): VacanciesListPage_New {
        backButton.click();
        this.pause(3000);
        return this.getPageClassInstance(VacanciesListPage_New);
    }

    public goToJobVacancyCardsDetails(vacancyTitle: string): VacanciesListPage_New {
        this.jobVacancyCardsDetails(vacancyTitle).first().click();
        return this.getPageClassInstance(VacanciesListPage_New);
    }
}
