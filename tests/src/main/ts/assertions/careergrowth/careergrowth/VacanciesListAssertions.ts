// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { Assert, assertTrue } from "common/testing/runtime";
import { VacanciesListPage_New } from "pages/careergrowth/careergrowth/VacanciesListPage_New";
import { expect } from "common/testing/playwright";

export class VacanciesListAssertions extends BaseAssertion<VacanciesListPage_New> {

    public active: string = "social-activity-btn--red-active";

    public assertThatVacancyCardsDisplayNumberOfCardsEquals(cardsNumber: number): VacanciesListAssertions {
        this.page.pause(5000);
        Assert.assertTrue(this.page.firstCard().count() >= cardsNumber);
//        this.page.vacancyCards().should("have.length", `${cardsNumber}`)
        return this;
    }

    public assertThatJobVacanciesListIsEmpty(): VacanciesListAssertions {
        expect(this.page.noDataBriefCaseIcon).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatEmptyJobVacanciesListHasDescription(description: string): VacanciesListAssertions {
        expect(this.page.noDataDescription).toContainText(description, this.containsTextOptions);
        return this;
    }

    public assertThatSearchHerePlaceholderIsDisplayed(): VacanciesListAssertions {
        expect(this.page.searchHerePlaceholder()).toBeVisible(this.isVisibleOptions);
//        this.page.searchHerePlaceholder().should("exist")
        return this;
    }

    public assertThatAllJobVacanciesHeaderIsDisplayed(): VacanciesListAssertions {
        expect(this.page.allJobVacanciesHeader()).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatJobVacancyIsOnTheList(jobTitle: string): VacanciesListAssertions {
        expect(this.page.jobVacancyCardsDetails(jobTitle).first()).toBeVisible(this.isVisibleOptions);
//        this.page.jobVacancyCardsDetails(jobTitle).should("exist")
        return this;
    }

    public assertThatThereIsNoSuggestions(): VacanciesListAssertions {
        expect(this.page.noSuggestionsCard).toBeVisible(this.isVisibleOptions);
//        this.page.noSuggestionsCard().should("exist")
        return this;
    }

    public assertThatJobVacancyOnAllJobVacanciesListHasMatchEqualTo(jobVacancyTitle: string, jobVacancyMatch: string): VacanciesListAssertions {
        expect(this.page.jobVacancyMatch(jobVacancyTitle).first()).toContainText(jobVacancyMatch, this.containsTextOptions);
        return this;
    }

	public assertThatVacancyIsBookmarked(vacancyTitle: string): VacanciesListAssertions {
        expect(this.page.jobVacancyBookmarked(vacancyTitle).first()).toBeVisible(this.isVisibleOptions);
//        this.page.jobVacancyBookmarked(vacancyTitle).should("exist")
        return this;
    }

	public assertThatVacancyIsNotBookmarked(vacancyTitle: string): VacanciesListAssertions {
        expect(this.page.bookmarkButton(vacancyTitle).first()).toBeVisible(this.isVisibleOptions);
//        this.page.jobVacancyBookmark(vacancyTitle).should("exist")
        return this;
    }

	public assertThatVacancyCannotBeBookmarked(vacancyTitle: string): VacanciesListAssertions {
        expect(this.page.bookmarkButton(vacancyTitle)).toBeDisabled();
//        this.page.jobVacancyBookmarkButton(vacancyTitle).should("be.disabled")
        return this;
    }

	public assertThatVacancyIdIsDismissed(jobId: string): VacanciesListAssertions {
        expect(this.page.jobVacancyIdDismissButton(jobId)).toHaveClass(active);
//        this.page.jobVacancyIdDismissButton(jobId).should("have", active)
        return this;
    }

	public assertThatVacancyIdIsNotDismissed(jobId: string): VacanciesListAssertions {
        expect(this.page.jobVacancyIdDismissButton(jobId)).not.toHaveClass(active);
//        this.page.jobVacancyIdDismissButton(jobId).should("not.have", active)
        return this;
    }

    public assertThatJobVacancyTitleSuggestionIsPresentOnTheList(jobTitle: string): VacanciesListAssertions {
        expect(this.page.firstCard().first()).toContainText(jobTitle, this.containsTextOptions);
        return this;
    }

    public assertThatSkillIsDisplayedForJob(title: string, skill: string): VacanciesListAssertions {
        expect(this.page.skillChip(title, skill)).toBeVisible(this.isVisibleOptions);
//        this.page.skillChip(jobId, skill).should("exist")
        return this;
    }

	public assertThatThereIsNoSkillsForJob(title: string): VacanciesListAssertions {
        expect(this.page.noJobSkillsLabel(title)).toBeVisible(this.isVisibleOptions);
//        this.page.noJobSkillsLabel(jobId).should("exist")
        return this;
    }

	public assertThatThereIsNoSkillsForRole(roleId: string): VacanciesListAssertions {
        expect(this.page.noRoleSkillsLabel(roleId)).toBeVisible(this.isVisibleOptions);
//        this.page.noRoleSkillsLabel(roleId).should("exist")
        return this;
    }

	public assertThatNumberOfRemainingSkillsIsEqualTo(jobTitle: string, number: string): VacanciesListAssertions {
        expect(this.page.moreSkillsOnJobCard(jobTitle)).toContainText(number, this.containsTextOptions);
        return this;
    }

	public assertThatThereIsNoRemainingSkillsForJob(jobTitle: string): VacanciesListAssertions {
        expect(this.page.moreSkillsOnJobCard(jobTitle)).toBeHidden();
        return this;
    }

    public assertThatFirstJobOnTheListIsNotEqualTo(jobTitle: string): VacanciesListAssertions {
        expect(this.page.firstItemOnAllVacanciesListLocator.first()).not.toContainText(jobTitle, this.containsTextOptions);
//        this.page.firstItemOnAllVacanciesList().should("not.contain.text", jobTitle)
        return this;
    }

	public assertThatSkillsElementOnJobCardEqualTo(skillName: string): VacanciesListAssertions {
        expect(this.page.skillsOnJobCard.last()).toContainText(skillName, this.containsTextOptions);
//        this.page.skillsOnJobCard().should("contain.text", skillName)
        return this;
    }

    public assertThatJobIdIsPresentOnAllJobsList(jobId: string): VacanciesListAssertions {
        expect(this.page.jobById(jobId)).toBeVisible(this.isVisibleOptions);
//        this.page.jobById(jobId).should("be.visible")
        return this;
    }

	public assertThatJobVacancyIdIsNotOnTheList(jobId: string): VacanciesListAssertions {
        expect(this.page.jobById(jobId)).toBeHidden();
//        this.page.jobById(jobId).should("not.exist")
        return this;
    }

	public assertThatFirstJobOnTheListIsEqualTo(jobTitle: string): VacanciesListAssertions {
        expect(this.page.firstItemOnAllVacanciesListLocator.first()).toContainText(jobTitle, this.containsTextOptions);
//        this.page.firstItemOnAllVacanciesList().should("contain.text", jobTitle)
        return this;
    }

    public assertThatVacancyIsNotDismissed(jobTitle: string): VacanciesListAssertions {
        this.page.getPage().waitForLoadState();
        Assert.assertFalse(this.page.dismissButton(jobTitle).first().getAttribute("class").contains(active));
//        this.page.jobVacancyDismissButton(jobTitle).should("not.have", active)
        return this;
    }

    public assertThatJobVacancySuggestionIsPresentOnTheList(jobTitle: string): VacanciesListAssertions {
        expect(this.page.cardName(jobTitle).first()).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatJobVacancySuggestionIsNotPresentOnTheList(jobTitle: string): VacanciesListAssertions {
        expect(this.page.cardName(jobTitle)).toBeHidden();
        return this;
    }

    public assertThatActivePageIsEqualTo(pageNumber: string): VacanciesListAssertions {
//        expect(this.page.)
//        this.page.pageButton(pageNumber).should("have", "active")
        return this;
    }

    public assertThatPageIsNotClickable(pageNumber: string): VacanciesListAssertions {
//        expect(this.page.)
//        this.page.pageButton(pageNumber).should("have", "disable")
        return this;
    }

    public assertThatUrlContainsProperText(urlText: string): VacanciesListAssertions {
        this.assertTrue(this.page.getPage().url().contains(urlText), "Expected url: '" + urlText + "' but was: '" + this.page.getPage().url() + "'");
        return this;
    }

    public assertThatVacancyCardsDisplayProperNumberOfCards(cardsNumber: number): VacanciesListAssertions {
        expect(this.page.allCards()).toHaveCount(cardsNumber);
        return this;
    }

    public assertThatFilterIsApplied(filterValue: string): VacanciesListAssertions {
        expect(this.page.removeFilterButton(filterValue)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatLocationIsVisibleOnJobVacancyCard(): VacanciesListAssertions {
        expect(this.page.jobCardLocation).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatLocationIsNotVisibleOnJobVacancyCard(): VacanciesListAssertions {
        expect(this.page.jobCardLocation).toBeHidden();
        return this;
    }

    public assertThatLocationIsVisibleOnJobVacancyDetails(): VacanciesListAssertions {
        expect(this.page.jobDetailsLocation).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatLocationIsNotVisibleOnJobVacancyDetails(): VacanciesListAssertions {
        expect(this.page.jobDetailsLocation).toBeHidden();
        return this;
    }

    public assertThatZeroResultsForClosedVacancies(): VacanciesListAssertions {
        expect(this.page.noResultsMessage).toBeVisible(this.isVisibleOptions);
        return this;
    }
}
