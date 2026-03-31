// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { Locator, WaitForSelectorState, expect } from "common/testing/playwright";
import { Assert } from "common/testing/runtime";
import { MyOpportunitiesPage } from "pages/careergrowth/jobs/MyOpportunitiesPage";

export class MyOpportunitiesAssertions extends BaseAssertion<MyOpportunitiesPage> {

    public assertThatSubmenuTabIsSelected(subMenuTab: string): MyOpportunitiesAssertions {
        expect(this.page.selectedTab(subMenuTab)).toBeVisible(this.isVisibleOptions);
//        this.page.selectedTab(subMenuTab).should('exist')
        return this;
    }

	public assertThatSubmenuTabIsHighlighted(subMenuTab: string, rgbColor: string): MyOpportunitiesAssertions {
        expect(this.page.selectedTab(subMenuTab)).toHaveCSS("background-color", rgbColor);
//        this.page.selectedTab(subMenuTab).should('have.css', 'background-color').and('eq', rgbColor)
        return this;
    }

    public assertThatJobIsPresentOnTheList(): MyOpportunitiesAssertions {
        this.page.jobCards.first().waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        Assert.assertTrue(this.page.jobCards.isVisible());
        return this;
    }

	public assertThatJobTitleIsPresentOnTheList(vacancyTitle: string): MyOpportunitiesAssertions {
        this.page.jobCards.first().waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        Assert.assertTrue(this.page.jobCards.allTextContents().contains(vacancyTitle));
//        this.page.jobCards().should('contain.text', vacancyTitle)
        return this;
    }

	public assertThatJobTitleIsNotPresentOnTheList(vacancyTitle: string): MyOpportunitiesAssertions {
        expect(this.page.jobCards).not.toContainText(vacancyTitle, this.containsTextOptions);
        return this;
    }

	public assertThatJobIdIsPresentOnTheList(jobId: string): MyOpportunitiesAssertions {
        expect(this.page.jobCardById(jobId)).toBeVisible(this.isVisibleOptions);
//        this.page.jobCardById(jobId).should('exist')
        return this;
    }

	public assertThatVacancyIsMarkedAsBookmarked(vacancyTitle: string): MyOpportunitiesAssertions {
        expect(this.page.jobVacancyMarkedAsBookmarked(vacancyTitle)).toBeVisible(this.isVisibleOptions);
//        this.page.jobVacancyMarkedAsBookmarked(vacancyTitle).should('exist')
        return this;
    }

    public assertThatVacancyIdIsMarkedAsBookmarked(jobId: string): MyOpportunitiesAssertions {
        expect(this.page.jobVacancyIdMarkedAsBookmarked(jobId)).toBeVisible();
//        this.page.jobVacancyMarkedAsBookmarked(vacancyTitle).should('exist')
        return this;
    }

	public assertThatVacancyIsMarkedAsDismissed(vacancyTitle: string): MyOpportunitiesAssertions {
        this.page.getPage().waitForLoadState();
        expect(this.page.jobVacancyDismissButton(vacancyTitle)).toHaveAttribute("class", "ed-btn no-padding min-width-0 social-activity-btn--red social-activity-btn--red-active");
//        this.page.jobVacancyDismissButton(vacancyTitle).should('have', 'social-activity-btn--red-active')
        return this;
    }

	public assertThatJobIdIsMarkedAsDismissed(jobId: string): MyOpportunitiesAssertions {
        this.page.getPage().waitForLoadState();
        expect(this.page.jobIdDismissButton(jobId)).toHaveClass("ed-btn no-padding min-width-0 social-activity-btn--red social-activity-btn--red-active");
//        this.page.jobIdDismissButton(jobId).should('have', 'social-activity-btn--red-active') toHaveText('Sign in', { timeout: 10000 });
        return this;
    }

	public assertThatThereIsNoItemsToShow(information: string): MyOpportunitiesAssertions {
        expect(this.page.noJobVacanciesToShowInfo).toBeVisible(this.isVisibleOptions);
//        this.page.noJobVacanciesToShowInfo(information).should('exist')
        return this;
    }

    public assertThatSkillChipIsDisplayedForFirstJob(skill: string): MyOpportunitiesAssertions {
        expect(this.page.skillNameChip(skill)).toBeVisible();
        return this;
    }

	public assertThatSkillChipIsDisplayedForTheJob(jobTitle: string, skill: string): MyOpportunitiesAssertions {
//        cy.wait(3000)
        expect(this.page.skillChip(jobTitle)).toContainText(skill, this.containsTextOptions);
//        this.page.skillChip(jobTitle).should('contain.text', skill)
        return this;
    }

    public assertThatSharedjobIsPresent(jobTitle: string): MyOpportunitiesAssertions {
        expect(this.page.sharedJobByTitle(jobTitle)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertMessageText(messageText: string): MyOpportunitiesAssertions {
        expect(this.page.message).toContainText(messageText, this.containsTextOptions);
        return this;
    }
}
