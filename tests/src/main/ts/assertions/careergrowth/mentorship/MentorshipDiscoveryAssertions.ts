import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { MentorshipDiscoveryPage } from "pages/careergrowth/mentorship/MentorshipDiscoveryPage";

export class MentorshipDiscoveryAssertions extends BaseAssertion<MentorshipDiscoveryPage> {

    private showMoreTimeZones: string = "3";
    private showMoreLanguages: string = "4";
    private showMoreLocations: string = "5";
    private showMoreDepartments: string = "6";

    public assertMentorNameIsDisplayedInResults(mentorName: string): MentorshipDiscoveryAssertions {
        this.assertThat(this.page.mentorCardMentorName(mentorName).first()).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertMentorNameIsNotDisplayedInResults(mentorName: string): MentorshipDiscoveryAssertions {
        this.assertThat(this.page.mentorCardMentorName(mentorName)).isHidden();
        return this;
    }

    public assertMentorActionIsDisplayed(actionName: string): MentorshipDiscoveryAssertions {
        this.assertThat(this.page.mentorCardDropDownAction(actionName)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertMentorPositionIsDisplayed(mentorName: string, positionName: string): MentorshipDiscoveryAssertions {
        this.assertThat(this.page.mentorCardPositionMetaData(mentorName, positionName)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertMentorSkillIsDisplayed(mentorName: string, skillName: string): MentorshipDiscoveryAssertions {
        this.assertThat(this.page.mentorCardSkillsMetaData(mentorName, skillName)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertRequestMentorshipButtonIsDisplayed(mentorName: string): MentorshipDiscoveryAssertions {
        this.assertThat(this.page.mentorCardRequestMentorshipButton(mentorName)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertExpectedSearchResultsCount(expectedResultsCount: string): MentorshipDiscoveryAssertions {
        this.assertThat(this.page.searchResultsText(expectedResultsCount)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertMyMentorshipsButtonIsDisplayed(): MentorshipDiscoveryAssertions {
        this.assertThat(this.page.myMentorshipsButton).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertMentorDiscoveryPageLoadsAllFields(): MentorshipDiscoveryAssertions {
        this.assertThat(this.page.allMentorsHeader).isVisible(this.isVisibleOptions);
        this.assertThat(this.page.filtersButton()).isVisible(this.isVisibleOptions);
        this.assertThat(this.page.searchInput()).isVisible(this.isVisibleOptions);
        this.assertThat(this.page.searchButtonElement()).isVisible(this.isVisibleOptions);
        this.assertThat(this.page.sortByDropDown()).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertBecomeAMentorButtonisDisplayed(): MentorshipDiscoveryAssertions {
        this.assertThat(this.page.becomeAMentorButton).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertViewMyMentorProfileButtonisDisplayed(): MentorshipDiscoveryAssertions {
        this.assertThat(this.page.viewMyMentorProfileButton).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertFilterModalLoadsAllFields(): MentorshipDiscoveryAssertions {
        this.assertThat(this.page.allFiltersheader).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertAllMentorsHeaderIsDisplayed(): MentorshipDiscoveryAssertions {
        this.assertThat(this.page.allMentorsHeader).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertBecomeAMentorButtonIsNotDisplayed(): MentorshipDiscoveryAssertions {
        this.assertThat(this.page.becomeAMentorButton).not().isVisible(this.isNotVisibleOptions);
        return this;
    }

    public assertViewMyMentorProfileButtonisNotDisplayed(): MentorshipDiscoveryAssertions {
        this.assertThat(this.page.viewMyMentorProfileButton).not().isVisible(this.isNotVisibleOptions);
        return this;
    }

    public assertRequestMentorshipModalIsDisplayed(): MentorshipDiscoveryAssertions {
        this.assertThat((this.page.mentorRequestMentorshipModal)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertMentorCardApplicationStatusIsDisplayed(status: string): MentorshipDiscoveryAssertions {
        this.assertThat((this.page.mentorCardApplicationStatus(status))).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatFilterTitlesAreDisplayed(filterTitle: string): MentorshipDiscoveryAssertions {
        this.assertThat(this.page.filterTitle(filterTitle)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatFilterTitlesSecondAreDisplayed(filterTitleSecond: string): MentorshipDiscoveryAssertions {
        this.assertThat(this.page.filterTitleSecond(filterTitleSecond)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatSearchFieldsDefaultTextIsDisplayed(searchFieldText: string): MentorshipDiscoveryAssertions {
        this.assertThat(this.page.searchFields(searchFieldText)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatTimeZonesAndLanguagesInputFieldsAreDisplayed(timeZoneAndLanguagesField: string): MentorshipDiscoveryAssertions {
        this.assertThat(this.page.timeZonesAndLanguagesFilterInput(timeZoneAndLanguagesField)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatLocationsAndDepartmentInputFieldsAreDisplayed(locationAndDepartmentField: string): MentorshipDiscoveryAssertions {
        this.assertThat(this.page.locationsAndDepartmentFilterInput(locationAndDepartmentField)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatShowMoreFieldIsDisplayed(): MentorshipDiscoveryAssertions {
        this.assertThat(this.page.showMore(showMoreTimeZones)).isVisible(this.isVisibleOptions);
        this.assertThat(this.page.showMore(showMoreLanguages)).isVisible(this.isVisibleOptions);
        this.assertThat(this.page.showMore(showMoreLocations)).isVisible(this.isVisibleOptions);
        this.assertThat(this.page.showMore(showMoreDepartments)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatAppliedFiltersAreVisible(filterValue: string): MentorshipDiscoveryAssertions {
        this.assertThat(this.page.filterPanel).containsText(filterValue, this.containsTextOptions);
        return this;
    }

    public assertCreatedMentorProfileTextIsDisplayed(): MentorshipDiscoveryAssertions {
        this.assertThat(this.page.createdMentorProfileText()).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatLocationIsVisibleForMentorFilters(): MentorshipDiscoveryAssertions {
        this.assertThat(this.page.mentorFilterLocation).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatLocationIsNotVisibleForMentorFilters(): MentorshipDiscoveryAssertions {
        this.assertThat(this.page.mentorFilterLocation).isHidden();
        return this;
    }

    public assertThatLocationIsVisibleForMentorProfile(): MentorshipDiscoveryAssertions {
        this.assertThat(this.page.mentorProfileLocation).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatLocationIsNotVisibleForMentorProfile(): MentorshipDiscoveryAssertions {
        this.assertThat(this.page.mentorProfileLocation).isHidden();
        return this;
    }
}
