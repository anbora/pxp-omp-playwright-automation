// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { Assert, assertTrue } from "common/testing/runtime";
import { SuggestionsPage_New } from "pages/careergrowth/careergrowth/SuggestionsPage_New";
import { expect } from "common/testing/playwright";

export class SuggestionsAssertions extends BaseAssertion<SuggestionsPage_New> {

    public active: string = "social-activity-btn--red-active";

    public assertThatSuggestedJobVacancyIsVisibleUnderSuggestions(): SuggestionsAssertions {
        expect(this.page.recommendedJobBox()).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatVacancyIsNotDismissed(jobTitle: string): SuggestionsAssertions {
        this.page.getPage().waitForLoadState();
        Assert.assertFalse(this.page.dismissButton(jobTitle).first().getAttribute("class").contains(active));
//        this.page.jobVacancyDismissButton(jobTitle).should("not.have", active)
        return this;
    }

    public assertThatJobVacancySuggestionIsPresentOnTheList(jobTitle: string): SuggestionsAssertions {
        expect(this.page.recommendedCardName(jobTitle).first()).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatJobVacancySuggestionIsNotPresentOnTheList(jobTitle: string): SuggestionsAssertions {
        expect(this.page.recommendedCardName(jobTitle)).toBeHidden();
        return this;
    }

    public assertThatFirstRoleIsMarkedWithArrowIcon(): SuggestionsAssertions {
        expect(this.page.markedAsAspirationalRoleArrowIcon().first()).toBeVisible(this.isVisibleOptions);
//        this.page.markedAsAspirationalRoleArrowIcon().first().should("be.visible")
        return this;
    }

    public assertThatLevelIconIsDisplayedForRecommendedRole(roleTitle: string): SuggestionsAssertions {
        expect(this.page.recommendedRoleLevelIcon(roleTitle)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatJobFamilyIconIsDisplayedForRecommendedRole(roleTitle: string): SuggestionsAssertions {
        expect(this.page.recommendedRoleJobFamilyIcon(roleTitle)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatRecommendedRoleLevelIsEqualTo(roleTitle: string, level: string): SuggestionsAssertions {
        expect(this.page.roleLevelByTitle(roleTitle).first()).toContainText(level, this.containsTextOptions);
        return this;
    }

    public assertThatRecommendedRoleJobFamilyIsEqualTo(roleTitle: string, jobFamily: string): SuggestionsAssertions {
        expect(this.page.roleJobFamilyByTitle(roleTitle).first()).toContainText(jobFamily, this.containsTextOptions);
        return this;
    }

    public assertThatFirstRoleOnRecommendedRolesListIsEqualTo(roleTitle: string): SuggestionsAssertions {
        expect(this.page.firstCard()).toContainText(roleTitle, this.containsTextOptions);
        return this;
    }

    public assertThatRoleIsNotDisplayedAsRecommended(roleTitle: string): SuggestionsAssertions {
        expect(this.page.firstCard().first()).not.toContainText(roleTitle, this.containsTextOptions);
        return this;
    }

    public assertThatUrlContainsProperText(urlText: string): SuggestionsAssertions {
        this.assertTrue(this.page.getPage().url().contains(urlText), "Expected url: '" + urlText + "' but was: '" + this.page.getPage().url() + "'");
        return this;
    }
}
