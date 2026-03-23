import { BaseAssertion } from "common/BaseAssertion";
import { Locator, WaitForSelectorState } from "common/testing/playwright";
import { assertThat } from "common/testing/playwrightAssertions";
import { Assert } from "common/testing/runtime";
import { MyOpportunitiesPage } from "pages/careergrowth/jobs/MyOpportunitiesPage";

export class MyOpportunitiesAssertions extends BaseAssertion<MyOpportunitiesPage> {

    public assertThatSubmenuTabIsSelected(subMenuTab: string): MyOpportunitiesAssertions {
        this.assertThat(this.page.selectedTab(subMenuTab)).isVisible(this.isVisibleOptions);
//        this.page.selectedTab(subMenuTab).should('exist')
        return this;
    }

	public assertThatSubmenuTabIsHighlighted(subMenuTab: string, rgbColor: string): MyOpportunitiesAssertions {
        this.assertThat(this.page.selectedTab(subMenuTab)).hasCSS("background-color", rgbColor);
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
        this.assertThat(this.page.jobCards).not().containsText(vacancyTitle, this.containsTextOptions);
        return this;
    }

	public assertThatJobIdIsPresentOnTheList(jobId: string): MyOpportunitiesAssertions {
        this.assertThat(this.page.jobCardById(jobId)).isVisible(this.isVisibleOptions);
//        this.page.jobCardById(jobId).should('exist')
        return this;
    }

	public assertThatVacancyIsMarkedAsBookmarked(vacancyTitle: string): MyOpportunitiesAssertions {
        this.assertThat(this.page.jobVacancyMarkedAsBookmarked(vacancyTitle)).isVisible(this.isVisibleOptions);
//        this.page.jobVacancyMarkedAsBookmarked(vacancyTitle).should('exist')
        return this;
    }

    public assertThatVacancyIdIsMarkedAsBookmarked(jobId: string): MyOpportunitiesAssertions {
        this.assertThat(this.page.jobVacancyIdMarkedAsBookmarked(jobId)).isVisible();
//        this.page.jobVacancyMarkedAsBookmarked(vacancyTitle).should('exist')
        return this;
    }

	public assertThatVacancyIsMarkedAsDismissed(vacancyTitle: string): MyOpportunitiesAssertions {
        this.page.getPage().waitForLoadState();
        this.assertThat(this.page.jobVacancyDismissButton(vacancyTitle)).hasAttribute("class", "ed-btn no-padding min-width-0 social-activity-btn--red social-activity-btn--red-active");
//        this.page.jobVacancyDismissButton(vacancyTitle).should('have', 'social-activity-btn--red-active')
        return this;
    }

	public assertThatJobIdIsMarkedAsDismissed(jobId: string): MyOpportunitiesAssertions {
        this.page.getPage().waitForLoadState();
        this.assertThat(this.page.jobIdDismissButton(jobId)).hasClass("ed-btn no-padding min-width-0 social-activity-btn--red social-activity-btn--red-active");
//        this.page.jobIdDismissButton(jobId).should('have', 'social-activity-btn--red-active') toHaveText('Sign in', { timeout: 10000 });
        return this;
    }

	public assertThatThereIsNoItemsToShow(information: string): MyOpportunitiesAssertions {
        this.assertThat(this.page.noJobVacanciesToShowInfo).isVisible(this.isVisibleOptions);
//        this.page.noJobVacanciesToShowInfo(information).should('exist')
        return this;
    }

    public assertThatSkillChipIsDisplayedForFirstJob(skill: string): MyOpportunitiesAssertions {
        this.assertThat(this.page.skillNameChip(skill)).isVisible();
        return this;
    }

	public assertThatSkillChipIsDisplayedForTheJob(jobTitle: string, skill: string): MyOpportunitiesAssertions {
//        cy.wait(3000)
        this.assertThat(this.page.skillChip(jobTitle)).containsText(skill, this.containsTextOptions);
//        this.page.skillChip(jobTitle).should('contain.text', skill)
        return this;
    }

    public assertThatSharedjobIsPresent(jobTitle: string): MyOpportunitiesAssertions {
        this.assertThat(this.page.sharedJobByTitle(jobTitle)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertMessageText(messageText: string): MyOpportunitiesAssertions {
        this.assertThat(this.page.message).containsText(messageText, this.containsTextOptions);
        return this;
    }
}
