// @ts-nocheck
import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator, WaitForSelectorState } from "common/testing/playwright";
import { ResultContainer } from "models/ResultContainer";
import { CareerGrowthCarouselComponent } from "pages/careergrowth/careergrowth/components/CareerGrowthCarouselComponent";
import { CareerGrowthFiltersComponent } from "pages/careergrowth/careergrowth/components/CareerGrowthFiltersComponent";
import { CareerGrowthTopPanelComponent } from "pages/careergrowth/careergrowth/components/CareerGrowthTopPanelComponent";
import { JobVacancyDetailsPage } from "pages/careergrowth/jobs/JobVacancyDetailsPage";
import { RoleDetailsPage } from "pages/careergrowth/roles/RoleDetailsPage";

export class SuggestionsPage_New extends BasePage implements CareerGrowthTopPanelComponent<SuggestionsPage_New>,
        CareerGrowthCarouselComponent<SuggestionsPage_New>, CareerGrowthFiltersComponent<SuggestionsPage_New> {

    public readonly recommendedRolesMatchNames: Locator = this.page.locator("div.matching-label");
    public readonly suggestedJobVacancyId: Locator = this.page.locator("div.job-card__details__title");
    public suggestedJobVacancyId(jobId: string): Locator {
      return this.getLocatorWithParam("//ul[contains(@class,'ed-carousel')]/child::div[@data-testid='%s']", jobId);
    }
    public recommendedRoleByTitle(roleTitle: string): Locator {
      return this.getLocatorWithParam("//div[contains(@class,'ed-carousel-container')]/descendant::div[contains(@class, 'role-title')][text()='%s']", roleTitle);
    }
    public jobVacancyIdBookmarked(jobId: string): Locator {
      return this.getLocatorWithParam("//div[contains(@class, 'job-card ed-ui')][@data-testid='%s']/descendant::i[@class='icon-bookmark-fill']", jobId);
    }
    public jobVacancyIdBookmark(jobId: string): Locator {
      return this.getLocatorWithParam("//div[contains(@class, 'job-card ed-ui')][@data-testid='%s']/descendant::i[@class='icon-bookmark']", jobId);
    }
    public hoverShare: Locator = this.locator("//li[@class='footer-icon-wrapper']/button/div");
    public hoverOverDismiss: Locator = this.locator("//button/i[@class='icon-ban']");
    public hoverBookmark: Locator = this.locator("//li[2]/div/button/i");
    public threeDotMenuButtonForRole: Locator = this.locator("i.icon-ellipsis-h");
    public rolesThreeDots: Locator = this.locator("//div[@class='role-card-dropdown']/button");
    public markAsAspirationalFromCard: Locator = this.locator("//ul[@role='menu']/li[1]");
    public hoverMadeAspirational: Locator = this.locator("//div[@class='role-menu']/div/i");

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    public getP(): SuggestionsPage_New {

      return this;
    }

    public getFirstOpportunityMatchValue(matchName: ResultContainer): SuggestionsPage_New {
        matchName.setValue(recommendedRolesMatchNames.first().textContent());
        return this;
    }

    public getFirstItemIdOnSuggestedJobVacanciesList(jobTitle: ResultContainer): SuggestionsPage_New {
        this.firstCard().waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        jobTitle.setValue(firstCardName().textContent());
        return this;
    }

    public getFirstItemOnSuggestedRolesList(jobTitle: ResultContainer): SuggestionsPage_New {
        jobTitle.setValue(firstCardName().textContent());
        return this;
    }

    public waitForJobVacanciesSuggestionByTitle(jobTitle: string): SuggestionsPage_New {
        this.repeatUntilElementToBeVisible(() => {
        }, cardName(jobTitle), 10, 10000, () => {
            this.refreshCurrentPage(SuggestionsPage_New);
        });
        return this;
    }

    public waitForJobRoleRecommendationByTitle(roleTitle: string): SuggestionsPage_New {
        this.repeatUntilElementToBeVisible(() => {
        }, recommendedRoleByTitle(roleTitle), 10, 10000, () => {
            this.refreshCurrentPage(SuggestionsPage_New);
        });
        return this;
    }

    public waitForRoleSuggestions(): SuggestionsPage_New {
        this.repeatUntilElementToBeVisible(() => {
        }, firstCardName(), 36, 10000, () => refreshCurrentPage(SuggestionsPage_New));
        return this;
    }

    public clickOnRecommendedJobVacancyByTitle(title: string): JobVacancyDetailsPage {
        this.cardName(title).click();
        return this.getPageClassInstance(JobVacancyDetailsPage);
    }

    public clickOnRecommendedJobRoleByTitle(title: string): RoleDetailsPage {
        this.recommendedRoleByTitle(title).click();
        return this.getPageClassInstance(RoleDetailsPage);
    }

    public markFirstRoleAsAspirational(): SuggestionsPage_New {
        rolesThreeDots.first().click();
        markAsAspirationalFromCard.click();
        this.pause(2000);
        return this;
    }

    public hoverOverMarkedAsAspirational(): SuggestionsPage_New {
        hoverMadeAspirational.first().hover();
        return this;
    }

    public clickActionsButtonJobVacancy(): SuggestionsPage_New {

      return this;
    }

    public clickActionsButtonJobRoles(): SuggestionsPage_New {

      return this;
    }
}
