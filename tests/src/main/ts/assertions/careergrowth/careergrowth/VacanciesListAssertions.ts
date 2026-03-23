import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { Assert, assertTrue } from "common/testing/runtime";
import { VacanciesListPage_New } from "pages/careergrowth/careergrowth/VacanciesListPage_New";

export class VacanciesListAssertions extends BaseAssertion<VacanciesListPage_New> {

    public active: string = "social-activity-btn--red-active";

    public assertThatVacancyCardsDisplayNumberOfCardsEquals(cardsNumber: number): VacanciesListAssertions {
        this.page.pause(5000);
        Assert.assertTrue(this.page.firstCard().count() >= cardsNumber);
//        this.page.vacancyCards().should("have.length", `${cardsNumber}`)
        return this;
    }

    public assertThatJobVacanciesListIsEmpty(): VacanciesListAssertions {
        this.assertThat(this.page.noDataBriefCaseIcon).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatEmptyJobVacanciesListHasDescription(description: string): VacanciesListAssertions {
        this.assertThat(this.page.noDataDescription).containsText(description, this.containsTextOptions);
        return this;
    }

    public assertThatSearchHerePlaceholderIsDisplayed(): VacanciesListAssertions {
        this.assertThat(this.page.searchHerePlaceholder()).isVisible(this.isVisibleOptions);
//        this.page.searchHerePlaceholder().should("exist")
        return this;
    }

    public assertThatAllJobVacanciesHeaderIsDisplayed(): VacanciesListAssertions {
        this.assertThat(this.page.allJobVacanciesHeader()).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatJobVacancyIsOnTheList(jobTitle: string): VacanciesListAssertions {
        this.assertThat(this.page.jobVacancyCardsDetails(jobTitle).first()).isVisible(this.isVisibleOptions);
//        this.page.jobVacancyCardsDetails(jobTitle).should("exist")
        return this;
    }

    public assertThatThereIsNoSuggestions(): VacanciesListAssertions {
        this.assertThat(this.page.noSuggestionsCard).isVisible(this.isVisibleOptions);
//        this.page.noSuggestionsCard().should("exist")
        return this;
    }

    public assertThatJobVacancyOnAllJobVacanciesListHasMatchEqualTo(jobVacancyTitle: string, jobVacancyMatch: string): VacanciesListAssertions {
        this.assertThat(this.page.jobVacancyMatch(jobVacancyTitle).first()).containsText(jobVacancyMatch, this.containsTextOptions);
        return this;
    }

	public assertThatVacancyIsBookmarked(vacancyTitle: string): VacanciesListAssertions {
        this.assertThat(this.page.jobVacancyBookmarked(vacancyTitle).first()).isVisible(this.isVisibleOptions);
//        this.page.jobVacancyBookmarked(vacancyTitle).should("exist")
        return this;
    }

	public assertThatVacancyIsNotBookmarked(vacancyTitle: string): VacanciesListAssertions {
        this.assertThat(this.page.bookmarkButton(vacancyTitle).first()).isVisible(this.isVisibleOptions);
//        this.page.jobVacancyBookmark(vacancyTitle).should("exist")
        return this;
    }

	public assertThatVacancyCannotBeBookmarked(vacancyTitle: string): VacanciesListAssertions {
        this.assertThat(this.page.bookmarkButton(vacancyTitle)).isDisabled();
//        this.page.jobVacancyBookmarkButton(vacancyTitle).should("be.disabled")
        return this;
    }

	public assertThatVacancyIdIsDismissed(jobId: string): VacanciesListAssertions {
        this.assertThat(this.page.jobVacancyIdDismissButton(jobId)).hasClass(active);
//        this.page.jobVacancyIdDismissButton(jobId).should("have", active)
        return this;
    }

	public assertThatVacancyIdIsNotDismissed(jobId: string): VacanciesListAssertions {
        this.assertThat(this.page.jobVacancyIdDismissButton(jobId)).not().hasClass(active);
//        this.page.jobVacancyIdDismissButton(jobId).should("not.have", active)
        return this;
    }

    public assertThatJobVacancyTitleSuggestionIsPresentOnTheList(jobTitle: string): VacanciesListAssertions {
        this.assertThat(this.page.firstCard().first()).containsText(jobTitle, this.containsTextOptions);
        return this;
    }

    public assertThatSkillIsDisplayedForJob(title: string, skill: string): VacanciesListAssertions {
        this.assertThat(this.page.skillChip(title, skill)).isVisible(this.isVisibleOptions);
//        this.page.skillChip(jobId, skill).should("exist")
        return this;
    }

	public assertThatThereIsNoSkillsForJob(title: string): VacanciesListAssertions {
        this.assertThat(this.page.noJobSkillsLabel(title)).isVisible(this.isVisibleOptions);
//        this.page.noJobSkillsLabel(jobId).should("exist")
        return this;
    }

	public assertThatThereIsNoSkillsForRole(roleId: string): VacanciesListAssertions {
        this.assertThat(this.page.noRoleSkillsLabel(roleId)).isVisible(this.isVisibleOptions);
//        this.page.noRoleSkillsLabel(roleId).should("exist")
        return this;
    }

	public assertThatNumberOfRemainingSkillsIsEqualTo(jobTitle: string, number: string): VacanciesListAssertions {
        this.assertThat(this.page.moreSkillsOnJobCard(jobTitle)).containsText(number, this.containsTextOptions);
        return this;
    }

	public assertThatThereIsNoRemainingSkillsForJob(jobTitle: string): VacanciesListAssertions {
        this.assertThat(this.page.moreSkillsOnJobCard(jobTitle)).isHidden();
        return this;
    }

    public assertThatFirstJobOnTheListIsNotEqualTo(jobTitle: string): VacanciesListAssertions {
        this.assertThat(this.page.firstItemOnAllVacanciesListLocator.first()).not().containsText(jobTitle, this.containsTextOptions);
//        this.page.firstItemOnAllVacanciesList().should("not.contain.text", jobTitle)
        return this;
    }

	public assertThatSkillsElementOnJobCardEqualTo(skillName: string): VacanciesListAssertions {
        this.assertThat(this.page.skillsOnJobCard.last()).containsText(skillName, this.containsTextOptions);
//        this.page.skillsOnJobCard().should("contain.text", skillName)
        return this;
    }

    public assertThatJobIdIsPresentOnAllJobsList(jobId: string): VacanciesListAssertions {
        this.assertThat(this.page.jobById(jobId)).isVisible(this.isVisibleOptions);
//        this.page.jobById(jobId).should("be.visible")
        return this;
    }

	public assertThatJobVacancyIdIsNotOnTheList(jobId: string): VacanciesListAssertions {
        this.assertThat(this.page.jobById(jobId)).isHidden();
//        this.page.jobById(jobId).should("not.exist")
        return this;
    }

	public assertThatFirstJobOnTheListIsEqualTo(jobTitle: string): VacanciesListAssertions {
        this.assertThat(this.page.firstItemOnAllVacanciesListLocator.first()).containsText(jobTitle, this.containsTextOptions);
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
        this.assertThat(this.page.cardName(jobTitle).first()).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatJobVacancySuggestionIsNotPresentOnTheList(jobTitle: string): VacanciesListAssertions {
        this.assertThat(this.page.cardName(jobTitle)).isHidden();
        return this;
    }

    public assertThatActivePageIsEqualTo(pageNumber: string): VacanciesListAssertions {
//        assertThat(this.page.)
//        this.page.pageButton(pageNumber).should("have", "active")
        return this;
    }

    public assertThatPageIsNotClickable(pageNumber: string): VacanciesListAssertions {
//        assertThat(this.page.)
//        this.page.pageButton(pageNumber).should("have", "disable")
        return this;
    }

    public assertThatUrlContainsProperText(urlText: string): VacanciesListAssertions {
        this.assertTrue(this.page.getPage().url().contains(urlText), "Expected url: '" + urlText + "' but was: '" + this.page.getPage().url() + "'");
        return this;
    }

    public assertThatVacancyCardsDisplayProperNumberOfCards(cardsNumber: number): VacanciesListAssertions {
        this.assertThat(this.page.allCards()).hasCount(cardsNumber);
        return this;
    }

    public assertThatFilterIsApplied(filterValue: string): VacanciesListAssertions {
        this.assertThat(this.page.removeFilterButton(filterValue)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatLocationIsVisibleOnJobVacancyCard(): VacanciesListAssertions {
        this.assertThat(this.page.jobCardLocation).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatLocationIsNotVisibleOnJobVacancyCard(): VacanciesListAssertions {
        this.assertThat(this.page.jobCardLocation).isHidden();
        return this;
    }

    public assertThatLocationIsVisibleOnJobVacancyDetails(): VacanciesListAssertions {
        this.assertThat(this.page.jobDetailsLocation).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatLocationIsNotVisibleOnJobVacancyDetails(): VacanciesListAssertions {
        this.assertThat(this.page.jobDetailsLocation).isHidden();
        return this;
    }

    public assertThatZeroResultsForClosedVacancies(): VacanciesListAssertions {
        this.assertThat(this.page.noResultsMessage).isVisible(this.isVisibleOptions);
        return this;
    }
}
