import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { Assert, assertTrue } from "common/testing/runtime";
import { SuggestionsPage_New } from "pages/careergrowth/careergrowth/SuggestionsPage_New";

export class SuggestionsAssertions extends BaseAssertion<SuggestionsPage_New> {

    public active: string = "social-activity-btn--red-active";

    public assertThatSuggestedJobVacancyIsVisibleUnderSuggestions(): SuggestionsAssertions {
        this.assertThat(this.page.recommendedJobBox()).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatVacancyIsNotDismissed(jobTitle: string): SuggestionsAssertions {
        this.page.getPage().waitForLoadState();
        Assert.assertFalse(this.page.dismissButton(jobTitle).first().getAttribute("class").contains(active));
//        this.page.jobVacancyDismissButton(jobTitle).should("not.have", active)
        return this;
    }

    public assertThatJobVacancySuggestionIsPresentOnTheList(jobTitle: string): SuggestionsAssertions {
        this.assertThat(this.page.recommendedCardName(jobTitle).first()).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatJobVacancySuggestionIsNotPresentOnTheList(jobTitle: string): SuggestionsAssertions {
        this.assertThat(this.page.recommendedCardName(jobTitle)).isHidden();
        return this;
    }

    public assertThatFirstRoleIsMarkedWithArrowIcon(): SuggestionsAssertions {
        this.assertThat(this.page.markedAsAspirationalRoleArrowIcon().first()).isVisible(this.isVisibleOptions);
//        this.page.markedAsAspirationalRoleArrowIcon().first().should("be.visible")
        return this;
    }

    public assertThatLevelIconIsDisplayedForRecommendedRole(roleTitle: string): SuggestionsAssertions {
        this.assertThat(this.page.recommendedRoleLevelIcon(roleTitle)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatJobFamilyIconIsDisplayedForRecommendedRole(roleTitle: string): SuggestionsAssertions {
        this.assertThat(this.page.recommendedRoleJobFamilyIcon(roleTitle)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatRecommendedRoleLevelIsEqualTo(roleTitle: string, level: string): SuggestionsAssertions {
        this.assertThat(this.page.roleLevelByTitle(roleTitle).first()).containsText(level, this.containsTextOptions);
        return this;
    }

    public assertThatRecommendedRoleJobFamilyIsEqualTo(roleTitle: string, jobFamily: string): SuggestionsAssertions {
        this.assertThat(this.page.roleJobFamilyByTitle(roleTitle).first()).containsText(jobFamily, this.containsTextOptions);
        return this;
    }

    public assertThatFirstRoleOnRecommendedRolesListIsEqualTo(roleTitle: string): SuggestionsAssertions {
        this.assertThat(this.page.firstCard()).containsText(roleTitle, this.containsTextOptions);
        return this;
    }

    public assertThatRoleIsNotDisplayedAsRecommended(roleTitle: string): SuggestionsAssertions {
        this.assertThat(this.page.firstCard().first()).not().containsText(roleTitle, this.containsTextOptions);
        return this;
    }

    public assertThatUrlContainsProperText(urlText: string): SuggestionsAssertions {
        this.assertTrue(this.page.getPage().url().contains(urlText), "Expected url: '" + urlText + "' but was: '" + this.page.getPage().url() + "'");
        return this;
    }
}
