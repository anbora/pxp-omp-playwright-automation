import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { AriaRole, Browser, LoadState, Locator, WaitForSelectorState } from "common/testing/playwright";
import { MatchingMatrixPage } from "pages/careergrowth/talentsourcing/MatchingMatrixPage";

export class TalentSourcingPage extends BasePage {
    public talentSourcingIcon: Locator = this.page.locator("//label[text()='Talent Sourcing']/parent::a");
    public talentSourcingText: Locator = this.page.locator("//div[contains(text(), 'Talent Sourcing')]");
    public searchInput: Locator = this.page.locator("//div[@class='input-group flex']/input");
    public readonly searchButton: Locator = this.page.locator("//button[@aria-label='Search']");
    public jobName(title: string): Locator {
      return this.getLocatorWithParam("//h6[contains(text(),'%s')]", title);
    }
    public threeDotsOptions(jobNames: string): Locator {
      return this.getLocatorWithParam("//h6[contains(text(),'%s')]/ancestor::a/parent::div/following-sibling::div/child::div/child::div/child::button/i[@class='icon-ellipsis-h icon card-icon']", jobNames);
    }
    public viewDetails: Locator = this.page.locator("//button[contains(text(), 'View Details')]");
    public manageJobVacancy: Locator = this.page.locator("//button[contains(text(), 'Manage Job Vacancy')]");
    public bookMarksText(jobName: string): Locator {
      return this.getLocatorWithParam("//h6[contains(text(),'%s')]/parent::a/parent::div/following-sibling::div/child::div/child::h6[contains(text(), 'Bookmarks')]", jobName);
    }
    public appliedText(jobName: string): Locator {
      return this.getLocatorWithParam("//h6[contains(text(),'%s')]/parent::a/parent::div/following-sibling::div/child::div/child::h6[contains(text(), 'Applied')]", jobName);
    }
    public firstItemOnAllTalentSourcingJobList: Locator = this.page.locator("//div[@class='sourcing-filters-container']/following-sibling::div");
    public jobVacancyTitle: Locator = this.page.locator("//p[text()='Job Vacancy']");
    public genericTitleHeader(titleName: string): Locator {
      return this.getLocatorWithParam("//h6[contains(text(), '%s')]", titleName);
    }
    public peopleTitle: Locator = this.page.locator("//div[text()= 'Talent']");
    public getFirstCandidateFromSuggestedTalentList: Locator = this.page.locator("//table[@class='table-candidate-header']/tbody/tr");
    public candidateName(name: string): Locator {
      return this.locator(".table-candidate-name").filter(name).build();
    }
    public viewDetailsOfCandidate(name: string): Locator {
      return this.locator("tr").filter(candidateName(name)).getByLabel("Expand").build();
    }
    public genericTitleForCandidate(titleName: string): Locator {
      return this.getLocatorWithParam("//p[text()= '%s']", titleName);
    }
    public viewMatchingMatrix: Locator = getByRole(AriaRole.BUTTON, "View skills matrix").build();
    public backButton: Locator = this.page.locator("//button[text()='Back']");
    public resultNotFoundMessage(message: string): Locator {
      return this.getLocatorWithParam("//div[contains(text(),'%s')]", message);
    }
    public genericTitleHeaders(name: string): Locator {
      return this.getLocatorWithParam("//span[contains(text(),'%s')]", name);
    }
    public displayVacancyFilterValues(value: string): Locator {
      return this.getLocatorWithParam("//option[contains(text(), '%s')]/parent::select", value);
    }
    public genericFilterButton(value: string): Locator {
      return this.getLocatorWithParam("//button[text()='%s']", value);
    }
    public saveButton: Locator = this.page.locator("//button[text()='Save']");
    public genericFilterOption(filterOption: string): Locator {
      return this.getLocatorWithParam("//input[@aria-label='%s']", filterOption);
    }
    public suggestedCandidateName(value: string): Locator {
      return this.getLocatorWithParam("//span[contains(text(), '%s')]", value);
    }
    public allTab: Locator = this.page.locator("//button[contains(text(), 'All')]");

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public shouldTypeAndSearchJobVacancy(value: string): TalentSourcingPage {
        searchInput.fill(value);
        searchButton.click();
        return this;
    }

    public clickOnKebabMenu(value: string): TalentSourcingPage {
        this.threeDotsOptions(value).click();
        return this;
    }

    public clickOnManageJobVacancy(): TalentSourcingPage {
        manageJobVacancy.click();
        this.pause(3000);
        return this;
    }

    public clickOnViewDetail(): TalentSourcingPage {
        viewDetails.click();
        return this;
    }

    public clickAllTab(): TalentSourcingPage {
        this.pause(1000);
        allTab.click();
        this.pause(3000);
        return this;
    }

    public getFirstJobVacancyListInTalentSourcing(): TalentSourcingPage {
        this.page.waitForLoadState(LoadState.DOMCONTENTLOADED);
        firstItemOnAllTalentSourcingJobList.first().waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        return this;
    }

    public getFirstCandidateFromSuggestedTalent(): TalentSourcingPage {
        getFirstCandidateFromSuggestedTalentList.first().waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        return this;
    }

    public clickOnViewDetailsOfCandidate(candidateName: string): TalentSourcingPage {
        this.pause(2000);
        this.viewDetailsOfCandidate(candidateName).first().click();
        return this;
    }

    public clickOnViewMatchingMatrix(): MatchingMatrixPage {
        viewMatchingMatrix.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        viewMatchingMatrix.click();
        return this.getPageClassInstance(MatchingMatrixPage);
    }

    public clickOnBackButton(): TalentSourcingPage {
        backButton.click();
        return this;
    }

    public clickOnDisplayVacancyFilter(value: string): TalentSourcingPage {
        this.pause(10);
        this.displayVacancyFilterValues(value).selectOption(value);
        return this;
    }

    public clickOnAddFilterButton(filterName: string): TalentSourcingPage {
        this.genericFilterButton(filterName).click();
        return this;
    }

    public clickOnFilterValue(filterName: string, filterOption: string): TalentSourcingPage {
        this.genericFilterButton(filterName).click();
        this.genericFilterOption(filterOption).click();
        saveButton.click();
        return this;
    }

    public clickOnSearchButton(): TalentSourcingPage {
        searchButton.click();
        this.repeatUntilElementToBeVisible(() => searchButton.click(), firstItemOnAllTalentSourcingJobList, 10, 5000, () => {
        });
        return this;
    }
}
