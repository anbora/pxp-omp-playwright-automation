// @ts-nocheck

import { BaseTest } from "common/BaseTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { expect } from "common/testing/playwright";

//@Group(GroupNameEnum.OMP_FEATURE)
export class EditMentorshipProfileAndSearchAsMenteeTest extends BaseTest {

    private descriptionTextChange: string = "EditedDescription" + UUID.randomUUID();
    private mentorSearchName: string = "Bobby Benjamin";
    private mentorSearchAction1: string = "View Mentor Profile";
    private mentorName: string = "Samuel Smith";
    private mentorAction1: string = "Edit Profile";
    private mentorAction2: string = "Manage Mentorships";
    private locationName: string = "Santa Monica HQ";
    private skillLevel: string = "Expert";
    private skillName: string = "managed accounts";
    private removeSkillName: string = "Remove managed accounts";
    private filterHeaderOrg: string = "Department";
    private filterValueOrg: string = "Automation Dept";
    private filterHeaderLocation: string = "Locations";

    public editMentorshipProfileAndValidateRemovingAddingSkill(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginScenario(this.getUserByName("Samuel Smith")));
        __page1 = __page1.goToMePageProfile();
        __page1 = __page1.goToMentorshipsTab();
        __page1 = __page1.clickMyMenteesTab();
        __page1 = __page1.clickViewMyMentorProfileButton();
        expect(__page1.mentorProfileMentorTitleText).toBeVisible({ timeout: 30000 });
        expect(__page1.mentorProfileName(this.mentorName)).toBeVisible({ timeout: 30000 });
        expect(__page1.mentorProfileAvatar).toBeVisible({ timeout: 30000 });
        expect(__page1.mentorAboutSectionHeader).toBeVisible({ timeout: 30000 });
        expect(__page1.mentorSkillsSectionHeader).toBeVisible({ timeout: 30000 });
        expect(__page1.mentorDetails).toBeVisible({ timeout: 30000 });
        expect(__page1.availableToMentorToggle).toBeVisible({ timeout: 30000 });
        __page1.mentorProfileActionsDropdownButton.click();
        expect(__page1.mentorProfileAction(this.mentorAction1)).toBeVisible({ timeout: 30000 });
        __page1.mentorProfileActionsDropdownButton.click();
        __page1.mentorProfileActionsDropdownButton.click();
        expect(__page1.mentorProfileAction(this.mentorAction2)).toBeVisible({ timeout: 30000 });
        __page1.mentorProfileActionsDropdownButton.click();
        expect(__page1.mentorLocationText(this.locationName)).toBeVisible({ timeout: 30000 });
        __page1 = __page1.clickMentorProfileAction(this.mentorAction1);
        expect(__page1.mentorEditMentorProfileHeader).toBeVisible({ timeout: 30000 });
        expect(__page1.mentorEditMentorProfileLocationText(this.locationName)).toBeVisible({ timeout: 30000 });
        __page1 = __page1.editMentorProfileDescription(this.descriptionTextChange);
        __page1 = __page1.removeSkillIfExist(this.removeSkillName);
        __page1 = __page1.clickMentorEditProfileSaveButton();
        expect(__page1.mentorProfileDescriptionText(this.descriptionTextChange)).toBeVisible({ timeout: 30000 });
        expect(__page1.mentorSkillLevelAndNameText(this.skillLevel, this.skillName)).not.toBeVisible({ timeout: 5000 });
        __page1 = __page1.clickMentorProfileAction(this.mentorAction1);
        expect(__page1.mentorEditMentorProfileHeader).toBeVisible({ timeout: 30000 });
        __page1 = __page1.searchAndAddASkill(this.skillName);
        __page1 = __page1.clickMentorEditProfileSaveButton();
        expect(__page1.mentorSkillLevelAndNameText(this.skillLevel, this.skillName)).toBeVisible({ timeout: 30000 });
    }

    public loginAsMenteeUserSearchForMentorAndValidateMentorProfileMenteeView(): void {
                let __page2: any = this;
        __page2 = __page2.getOmpLoginPage();
        __page2 = __page2.run(new LoginScenario(this.getUserByName("Rajendran Sridhar")));
        __page2 = __page2.goToCareerGrowthPage();
        __page2 = __page2.goToMentorshipPageViaCard();
        expect(__page2.allMentorsHeader).toBeVisible({ timeout: 30000 });
        expect(__page2.filtersButton()).toBeVisible({ timeout: 30000 });
        expect(__page2.searchInput()).toBeVisible({ timeout: 30000 });
        expect(__page2.searchButtonElement()).toBeVisible({ timeout: 30000 });
        expect(__page2.sortByDropDown()).toBeVisible({ timeout: 30000 });
        expect(__page2.viewMyMentorProfileButton).toBeVisible({ timeout: 30000 });
        expect(__page2.myMentorshipsButton).toBeVisible({ timeout: 30000 });
        __page2 = __page2.clickInFiltersButton();
        expect(__page2.allFiltersheader).toBeVisible({ timeout: 30000 });
        __page2 = __page2.searchAndApplyFilterValue(this.filterHeaderOrg, this.filterValueOrg);
        __page2 = __page2.searchAndApplyFilterValue(this.filterHeaderLocation, this.locationName);
        __page2 = __page2.clickApplyButtonFiltersModal();
        __page2 = __page2.typeSearchValue(this.mentorSearchName);
        expect(__page2.mentorCardMentorName(this.mentorSearchName).first()).toBeVisible({ timeout: 30000 });
        __page2 = __page2.clickMentorCardDropdownAction(this.mentorSearchName, this.mentorSearchAction1);
        expect(__page2.mentorProfileMentorTitleText).toBeVisible({ timeout: 30000 });
        if (!this.mentorSearchName.isEmpty()) {
                    expect(__page2.mentorProfileName(this.mentorSearchName)).toBeVisible({ timeout: 30000 });
                }
        expect(__page2.mentorProfileAvatar).toBeVisible({ timeout: 30000 });
        expect(__page2.mentorAboutSectionHeader).toBeVisible({ timeout: 30000 });
        expect(__page2.mentorSkillsSectionHeader).toBeVisible({ timeout: 30000 });
        expect(__page2.mentorDetails).toBeVisible({ timeout: 30000 });
        expect(__page2.mentorLocationText(this.locationName)).toBeVisible({ timeout: 30000 });
    }

    public validateMyMentorshipPageLoads(): void {
                let __page3: any = this;
        __page3 = __page3.getOmpLoginPage();
        __page3 = __page3.run(new LoginScenario(this.getUserByName("Rajendran Sridhar")));
        __page3 = __page3.goToMePageProfile();
        __page3 = __page3.goToMentorshipsTab();
        expect(__page3.myMentorshipsPageLoad).toBeVisible({ timeout: 30000 });
        expect(__page3.myMenteesTab).toBeVisible({ timeout: 30000 });
        __page3 = __page3.clickMyMentorsTab();
        expect(__page3.myMentorshipsPageLoad).toBeVisible({ timeout: 30000 });
        expect(__page3.myMentorsTab).toBeVisible({ timeout: 30000 });
    }
}
