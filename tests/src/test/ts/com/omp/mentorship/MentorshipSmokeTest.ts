// @ts-nocheck

import { BaseTest } from "common/BaseTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { expect } from "common/testing/playwright";

export class MentorshipSmokeTest extends BaseTest {

    private mentorSearchName: string = "Bobby Benjamin";
    private mentorSearchAction1: string = "View Mentor Profile";

    public searchForMentorAndValidateMentorProfileAndMyMentorshipPage(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginScenario(this.getUserByName("Rajendran Sridhar")));
        __page1 = __page1.goToCareerGrowthPage();
        __page1 = __page1.goToMentorshipPageViaCard();
        expect(__page1.allMentorsHeader).toBeVisible({ timeout: 30000 });
        expect(__page1.filtersButton()).toBeVisible({ timeout: 30000 });
        expect(__page1.searchInput()).toBeVisible({ timeout: 30000 });
        expect(__page1.searchButtonElement()).toBeVisible({ timeout: 30000 });
        expect(__page1.sortByDropDown()).toBeVisible({ timeout: 30000 });
        expect(__page1.viewMyMentorProfileButton).toBeVisible({ timeout: 30000 });
        expect(__page1.myMentorshipsButton).toBeVisible({ timeout: 30000 });
        __page1 = __page1.clickInFiltersButton();
        expect(__page1.allFiltersheader).toBeVisible({ timeout: 30000 });
        __page1 = __page1.clickCancelButtonFiltersModal();
        __page1 = __page1.typeSearchValue(this.mentorSearchName);
        expect(__page1.mentorCardMentorName(this.mentorSearchName).first()).toBeVisible({ timeout: 30000 });
        __page1 = __page1.clickMentorCardDropdownAction(this.mentorSearchName, this.mentorSearchAction1);
        expect(__page1.mentorProfileMentorTitleText).toBeVisible({ timeout: 30000 });
        if (!this.mentorSearchName.isEmpty()) {
                    expect(__page1.mentorProfileName(this.mentorSearchName)).toBeVisible({ timeout: 30000 });
                }
        expect(__page1.mentorProfileAvatar).toBeVisible({ timeout: 30000 });
        expect(__page1.mentorAboutSectionHeader).toBeVisible({ timeout: 30000 });
        expect(__page1.mentorSkillsSectionHeader).toBeVisible({ timeout: 30000 });
        expect(__page1.mentorDetails).toBeVisible({ timeout: 30000 });
        __page1 = __page1.goToMePageProfile();
        __page1 = __page1.goToMentorshipsTab();
        expect(__page1.myMenteesTab).toBeVisible({ timeout: 30000 });
        __page1 = __page1.clickMyMentorsTab();
        expect(__page1.myMentorsTab).toBeVisible({ timeout: 30000 });
    }
}
