import { BasePage } from "common/BasePage";
import { AriaRole, LoadState, Locator, WaitForSelectorState } from "common/testing/playwright";
import { ResultContainer } from "models/ResultContainer";
import { BaseInterface } from "pages/careergrowth/careergrowth/components/BaseInterface";
import { RolesListPage_New } from "pages/careergrowth/careergrowth/RolesListPage_New";
import { SuggestionsPage_New } from "pages/careergrowth/careergrowth/SuggestionsPage_New";
import { JobVacancyDetailsPage } from "pages/careergrowth/jobs/JobVacancyDetailsPage";
import { ShareContentModalPage } from "pages/careergrowth/jobs/ShareContentModalPage";
import { MatchingSkillsModalPage } from "pages/careergrowth/MatchingSkillsModalPage";
import { RoleDetailsPage } from "pages/careergrowth/roles/RoleDetailsPage";

export interface CareerGrowthCartComponent<T extends BasePage> extends BaseInterface<T> {
    T getP();

    /*
     * Card boxes
     */
    recommendedBox(): default Locator {
      return getP().getByLabel("Recommended").build();
    }
    recommendedJobBox(): default Locator {
      return getP().getByLabel("Recommended Job Vacancies").build();
    }
    recommendedRoleBox(): default Locator {
      return getP().getByLabel("Recommended Job Roles").build();
    }
    allBox(): default Locator {
      return getP().locator("//div[@class = 'all-vacancy-container' or  @class = 'all-roles-container']").build();
    }
    cardContainer(title: string): default Locator {
      return getP().getByTestId(title).build();
    }
    recommendedCardContainer(title: string): default Locator {
      return getP().locator(recommendedBox()).getByTestId(title).build();
    }

    /*
     * Card types
     */
    allCards(): default Locator {
      return getP().locator("//div[contains(@class, 'role-card-full') or contains(@class, 'job-card ed-ui')]").build();
    }
    firstCard(): default Locator {
      return allCards().first();
    }
    firstCardInAllBox(): default Locator {
      return getP().locator(allBox()).locator("//div[contains(@class, 'role-card-full') or contains(@class, 'job-card ed-ui')]").build().first();
    }
    firstCardName(): default Locator {
      return getP().locator(firstCard()).getByRole(AriaRole.LINK, "").build().first();
    }
    firstCardNameInAllBox(): default Locator {
      return getP().locator(firstCardInAllBox()).getByRole(AriaRole.LINK, "").build().first();
    }
    firstRecommendedCard(): default Locator {
      return getP().locator(recommendedBox()).locator("//div[contains(@class, 'role-card-full') or contains(@class, 'job-card ed-ui')]").build().first();
    }
    firstJobRecommendedCard(): default Locator {
      return getP().locator(recommendedJobBox()).locator("//div[contains(@class, 'role-card-full') or contains(@class, 'job-card ed-ui')]").build().first();
    }
    firstRoleRecommendedCard(): default Locator {
      return getP().locator(recommendedRoleBox()).locator("//div[contains(@class, 'role-card-full') or contains(@class, 'job-card ed-ui')]").build().first();
    }
    firstCardInAllList(): default Locator {
      return getP().locator(recommendedBox()).locator("//div[contains(@class, 'role-card-full') or contains(@class, 'job-card ed-ui')]").build().first();
    }
    cardName(title: string): default Locator {
      return getP().locator(cardContainer(title)).getByRole(AriaRole.LINK, title).build();
    }
    recommendedCardName(title: string): default Locator {
      return getP().locator(recommendedCardContainer(title)).getByRole(AriaRole.LINK, title).build();
    }

    shareButton(): default Locator {

      return getP().locator(firstCard()).getByTestId("card-share-actionbutton").build().first();

    }
    shareButton(title: string): default Locator {
      return getP().locator(cardContainer(title)).getByTestId("card-share-actionbutton").build().first();
    }
    bookmarkButton(): default Locator {
      return getP().locator(firstCard()).getByTestId("card-bookmark-actionbutton").build().first();
    }
    bookmarkButton(title: string): default Locator {
      return getP().locator(cardContainer(title)).getByTestId("card-bookmark-actionbutton").build().first();
    }
    dismissButton(locator: Locator): default Locator {
      return getP().locator(locator).getByTestId("card-dismiss-actionbutton").build().first();
    }
    dismissButton(title: string): default Locator {
      return getP().locator(cardContainer(title)).getByTestId("card-dismiss-actionbutton").build().first();
    }
    moreActionButtonForCard(): default Locator {
      return getP().getByRole(AriaRole.BUTTON," more actions").build().first();
    }
    moreActionButtonForSpecificCard(cardName: string): default Locator {
      return getP().getByTestId(cardName).getByRole(AriaRole.BUTTON," more actions").build().first();
    }
    moreActionsPopperOption(action: string): default Locator {
      return getP().getLocatorWithParam("//div[contains(@class,'role-card-popper')]/descendant::li[text()='%s']", action);
    }
    goodOrExcellentMatch(): default Locator {
      return getP().locator("//div[text()='Excellent match'] | //div[text()='Good match']").build();
    }
    roleLevelByTitle(roleTitle: string): default Locator {
      return getP().getLocatorWithParam("//div[contains(@class,'role-title')][text()='%s']/parent::div/following-sibling::div/child::div[@class='role-level']", roleTitle);
    }
    roleJobFamilyByTitle(roleTitle: string): default Locator {
      return getP().getLocatorWithParam("//div[contains(@class,'role-title')][text()='%s']/parent::div/following-sibling::div/child::div[@class='role-area']", roleTitle);
    }
    firstItemOnRecommendedRolesListLocator(): default Locator {
      return getP().locator("//div[@class='ed-carousel-wrapper']/descendant::div[@class='role-card_header'][1]/div[1]").build();
    }
    recommendedRoleLevelIcon(roleTitle: string): default Locator {
      return getP().getLocatorWithParam("//div[@class='ed-carousel-wrapper']/descendant::div[contains(@class,'role-title')][text()='%s']/ancestor::div[@class='role-card-full']/descendant::i[@class='icon icon-balance']", roleTitle);
    }
    recommendedRoleJobFamilyIcon(roleTitle: string): default Locator {
      return getP().getLocatorWithParam("//div[@class='ed-carousel-wrapper']/descendant::div[contains(@class,'role-title')][text()='%s']/ancestor::div[@class='role-card-full']/descendant::i[@class='icon icon-department']", roleTitle);
    }
    markedAsAspirationalRoleArrowIcon(): default Locator {
      return getP().locator("//div/i[@class='icon icon-bullseye-arrow active']").build();
    }
    remainingSkillsButton(jobTitle: string): default Locator {
      return getP().getLocatorWithParam("//div[contains(@class,'job-card ed-ui')][descendant::div[text() = '%s']]/descendant::li[@class='job-skill__skills--remaining']/child::button", jobTitle);
    }

    clickMoreActionButtonForCard(): default T {
        this.moreActionButtonForCard().click();
        return this.getP();
    }

    clickMoreSkillsButton(jobTitle: string): default MatchingSkillsModalPage {
        this.remainingSkillsButton(jobTitle).click();
        return this.getP().getPageClassInstance(MatchingSkillsModalPage);
    }

    clickMoreActionButtonForSpecificCard(cardName: string): default T {
        this.moreActionButtonForSpecificCard(cardName).click();
        return this.getP();
    }

    clickShare(): default ShareContentModalPage {
        this.shareButton().first().click();
        return this.getP().getPageClassInstance(ShareContentModalPage);
    }

    bookmarkFirstCard(): default T {
        this.bookmarkButton("").first().click();
        this.pause(6000);
        return this.getP();
    }

    goToCard(gClass: Class<G>): default <G extends BasePage> G {
        this.getP().getPage().waitForLoadState(LoadState.DOMCONTENTLOADED);
        this.firstCardInAllBox().click();
        return this.getP().getPageClassInstance(gClass);
    }

    goToFirstRoleCard(): default RoleDetailsPage {

      return goToCard(RoleDetailsPage);

    }

    goToFirstJobVacancyCard(): default JobVacancyDetailsPage {

      return goToCard(JobVacancyDetailsPage);

    }

    getCardNameInAllBox(roleNameContainer: ResultContainer): default RolesListPage_New {
        roleNameContainer.setValue(firstCardNameInAllBox().textContent());
        return this.getP().getPageClassInstance(RolesListPage_New);
    }

    waitForGoodOrExcellentMatch(): default T {
        this.getP().repeatUntilElementToBeVisible(() => {}, goodOrExcellentMatch(), 36, 10000,
                () => getP().refreshCurrentPage(SuggestionsPage_New));
        return this.getP();
    }

    performActionForSuggestedNotYourCurrentRole(action: string): default T {
        this.clickMoreActionButtonForCard();
        this.getP().getPage().waitForLoadState();
        this.moreActionsPopperOption(action).click();
        this.getP().getPage().waitForLoadState();
        this.pause(2000);
        return this.getP();
    }

    getFirstItemOnSuggestedJobVacanciesList(jobTitle: ResultContainer): default T {
        this.firstJobRecommendedCard().waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        jobTitle.setValue(firstJobRecommendedCard().textContent());
        return this.getP();
    }

    getFirstCardOnAllList(roleTitle: ResultContainer): default T {
        this.pause(1000);
        roleTitle.setValue(firstCardInAllList().first().textContent());
        return this.getP();
    }

    goToFirstSuggestedCard(gClass: Class<G>, locator: Locator): default <G extends BasePage> G {
        this.pause(1000);
        locator.first().click();
        this.pause(1000);
        return this.getP().getPageClassInstance(gClass);
    }

    goToFirstSuggestedJobVacancyDetailsPage(): default JobVacancyDetailsPage {

      return goToFirstSuggestedCard(JobVacancyDetailsPage, firstJobRecommendedCard());

    }

    goToFirstSuggestedRoleDetailsPage(): default RoleDetailsPage {

      return goToFirstSuggestedCard(RoleDetailsPage, firstRoleRecommendedCard());

    }

    dismissFirstSuggestedJobCard(): default T {
        this.dismissButton(firstJobRecommendedCard()).click();
        this.pause(5000);
        return this.getP();
    }

    dismissFirstCard(): default T {
        this.dismissButton(firstCard()).click();
        this.pause(5000);
        return this.getP();
    }

    waitForSuggestions(): default T {
        this.pause(5000);
        this.getP().refreshCurrentPage(getP().getClass());
        this.getP().repeatUntilElementToBeVisible(() => {
        }, firstRecommendedCard(), 20, 20000, () => {
            this.getP().refreshCurrentPage(getP().getClass());
        });
        this.pause(2000);
        return this.getP();
    }

    waitForGoodOrExcellentMatchForSuggestedJobVacancy(): default T {
        this.getP().repeatUntilElementToBeVisible(() => {}, goodOrExcellentMatch(), 36, 10000,
                () => getP().refreshCurrentPage(getP().getClass()));
        return this.getP();
    }

    hoverOverShare(): default T {
        this.shareButton().hover();
        return this.getP();
    }

    hoverOverDismiss(): default T {
        this.dismissButton(firstCard()).hover();
        return this.getP();
    }

    hoverOverBookmark(): default T {
        this.bookmarkButton().hover();
        return this.getP();
    }
}
