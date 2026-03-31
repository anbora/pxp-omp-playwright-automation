// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { MentorshipDiscoveryPage } from "pages/careergrowth/mentorship/MentorshipDiscoveryPage";
import { expect } from "common/testing/playwright";

export class MentorshipDiscoveryAssertions extends BaseAssertion<MentorshipDiscoveryPage> {

    private showMoreTimeZones: string = "3";
    private showMoreLanguages: string = "4";
    private showMoreLocations: string = "5";
    private showMoreDepartments: string = "6";

    public assertMentorNameIsDisplayedInResults(mentorName: string): MentorshipDiscoveryAssertions {
        expect(this.page.mentorCardMentorName(mentorName).first()).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertMentorNameIsNotDisplayedInResults(mentorName: string): MentorshipDiscoveryAssertions {
        expect(this.page.mentorCardMentorName(mentorName)).toBeHidden();
        return this;
    }

    public assertMentorActionIsDisplayed(actionName: string): MentorshipDiscoveryAssertions {
        expect(this.page.mentorCardDropDownAction(actionName)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertMentorPositionIsDisplayed(mentorName: string, positionName: string): MentorshipDiscoveryAssertions {
        expect(this.page.mentorCardPositionMetaData(mentorName, positionName)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertMentorSkillIsDisplayed(mentorName: string, skillName: string): MentorshipDiscoveryAssertions {
        expect(this.page.mentorCardSkillsMetaData(mentorName, skillName)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertRequestMentorshipButtonIsDisplayed(mentorName: string): MentorshipDiscoveryAssertions {
        expect(this.page.mentorCardRequestMentorshipButton(mentorName)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertExpectedSearchResultsCount(expectedResultsCount: string): MentorshipDiscoveryAssertions {
        expect(this.page.searchResultsText(expectedResultsCount)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertMyMentorshipsButtonIsDisplayed(): MentorshipDiscoveryAssertions {
        expect(this.page.myMentorshipsButton).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertMentorDiscoveryPageLoadsAllFields(): MentorshipDiscoveryAssertions {
        expect(this.page.allMentorsHeader).toBeVisible(this.isVisibleOptions);
        expect(this.page.filtersButton()).toBeVisible(this.isVisibleOptions);
        expect(this.page.searchInput()).toBeVisible(this.isVisibleOptions);
        expect(this.page.searchButtonElement()).toBeVisible(this.isVisibleOptions);
        expect(this.page.sortByDropDown()).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertBecomeAMentorButtonisDisplayed(): MentorshipDiscoveryAssertions {
        expect(this.page.becomeAMentorButton).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertViewMyMentorProfileButtonisDisplayed(): MentorshipDiscoveryAssertions {
        expect(this.page.viewMyMentorProfileButton).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertFilterModalLoadsAllFields(): MentorshipDiscoveryAssertions {
        expect(this.page.allFiltersheader).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertAllMentorsHeaderIsDisplayed(): MentorshipDiscoveryAssertions {
        expect(this.page.allMentorsHeader).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertBecomeAMentorButtonIsNotDisplayed(): MentorshipDiscoveryAssertions {
        expect(this.page.becomeAMentorButton).not.toBeVisible(this.isNotVisibleOptions);
        return this;
    }

    public assertViewMyMentorProfileButtonisNotDisplayed(): MentorshipDiscoveryAssertions {
        expect(this.page.viewMyMentorProfileButton).not.toBeVisible(this.isNotVisibleOptions);
        return this;
    }

    public assertRequestMentorshipModalIsDisplayed(): MentorshipDiscoveryAssertions {
        expect((this.page.mentorRequestMentorshipModal)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertMentorCardApplicationStatusIsDisplayed(status: string): MentorshipDiscoveryAssertions {
        expect((this.page.mentorCardApplicationStatus(status))).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatFilterTitlesAreDisplayed(filterTitle: string): MentorshipDiscoveryAssertions {
        expect(this.page.filterTitle(filterTitle)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatFilterTitlesSecondAreDisplayed(filterTitleSecond: string): MentorshipDiscoveryAssertions {
        expect(this.page.filterTitleSecond(filterTitleSecond)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatSearchFieldsDefaultTextIsDisplayed(searchFieldText: string): MentorshipDiscoveryAssertions {
        expect(this.page.searchFields(searchFieldText)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatTimeZonesAndLanguagesInputFieldsAreDisplayed(timeZoneAndLanguagesField: string): MentorshipDiscoveryAssertions {
        expect(this.page.timeZonesAndLanguagesFilterInput(timeZoneAndLanguagesField)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatLocationsAndDepartmentInputFieldsAreDisplayed(locationAndDepartmentField: string): MentorshipDiscoveryAssertions {
        expect(this.page.locationsAndDepartmentFilterInput(locationAndDepartmentField)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatShowMoreFieldIsDisplayed(): MentorshipDiscoveryAssertions {
        expect(this.page.showMore(showMoreTimeZones)).toBeVisible(this.isVisibleOptions);
        expect(this.page.showMore(showMoreLanguages)).toBeVisible(this.isVisibleOptions);
        expect(this.page.showMore(showMoreLocations)).toBeVisible(this.isVisibleOptions);
        expect(this.page.showMore(showMoreDepartments)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatAppliedFiltersAreVisible(filterValue: string): MentorshipDiscoveryAssertions {
        expect(this.page.filterPanel).toContainText(filterValue, this.containsTextOptions);
        return this;
    }

    public assertCreatedMentorProfileTextIsDisplayed(): MentorshipDiscoveryAssertions {
        expect(this.page.createdMentorProfileText()).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatLocationIsVisibleForMentorFilters(): MentorshipDiscoveryAssertions {
        expect(this.page.mentorFilterLocation).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatLocationIsNotVisibleForMentorFilters(): MentorshipDiscoveryAssertions {
        expect(this.page.mentorFilterLocation).toBeHidden();
        return this;
    }

    public assertThatLocationIsVisibleForMentorProfile(): MentorshipDiscoveryAssertions {
        expect(this.page.mentorProfileLocation).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatLocationIsNotVisibleForMentorProfile(): MentorshipDiscoveryAssertions {
        expect(this.page.mentorProfileLocation).toBeHidden();
        return this;
    }
}
