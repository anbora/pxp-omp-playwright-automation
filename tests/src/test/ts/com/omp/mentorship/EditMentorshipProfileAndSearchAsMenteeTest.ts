import { MentorProfileAssertions } from "assertions/careergrowth/mentorship/MentorProfileAssertions";
import { MentorshipDiscoveryAssertions } from "assertions/careergrowth/mentorship/MentorshipDiscoveryAssertions";
import { MyMentorshipAssertions } from "assertions/careergrowth/mentorship/MyMentorshipAssertions";
import { BaseTest } from "common/BaseTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { LoginScenario } from "scenarios/other/LoginScenario";

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
        this.getOmpLoginPage()
                .run(new LoginScenario(this.getUserByName("Samuel Smith")))
                .goToMePageProfile()
                .goToMentorshipsTab()
                .clickMyMenteesTab()
                .clickViewMyMentorProfileButton()
                .check(MentorProfileAssertions)
                    .assertMentorProfilePageLoadsAllFieldsForMentor(this.mentorName)
                    .assertMentorProfileActionLoads(this.mentorAction1)
                    .assertMentorProfileActionLoads(this.mentorAction2)
                    .assertMentorDetailsLocationLoads(this.locationName)
                .endAssertion()
                .clickMentorProfileAction(this.mentorAction1)
                .check(MentorProfileAssertions)
                    .assertMentorEditProfileModalLoads()
                    .assertEditMentorProfileModalLocationLoads(this.locationName)
                .endAssertion()
                .editMentorProfileDescription(this.descriptionTextChange)
                .removeSkillIfExist(this.removeSkillName)
                .clickMentorEditProfileSaveButton()
                .check(MentorProfileAssertions)
                    .assertmentorProfileDescriptionContainsText(this.descriptionTextChange)
                    .assertMentorSkillIsNotDisplayed(this.skillLevel, this.skillName)
                .endAssertion()
                .clickMentorProfileAction(this.mentorAction1)
                .check(MentorProfileAssertions)
                    .assertMentorEditProfileModalLoads()
                .endAssertion()
                .searchAndAddASkill(this.skillName)
                .clickMentorEditProfileSaveButton()
                .check(MentorProfileAssertions)
                    .assertMentorSkillNameAndLevelIsDisplayed(this.skillLevel, this.skillName);
    }

    public loginAsMenteeUserSearchForMentorAndValidateMentorProfileMenteeView(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.getUserByName("Rajendran Sridhar")))
                .goToCareerGrowthPage()
                .goToMentorshipPageViaCard()
                .check(MentorshipDiscoveryAssertions)
                    .assertMentorDiscoveryPageLoadsAllFields()
                    .assertViewMyMentorProfileButtonisDisplayed()
                    .assertMyMentorshipsButtonIsDisplayed()
                .endAssertion()
                .clickInFiltersButton()
                .check(MentorshipDiscoveryAssertions)
                    .assertFilterModalLoadsAllFields()
                .endAssertion()
                .searchAndApplyFilterValue(this.filterHeaderOrg, this.filterValueOrg)
                .searchAndApplyFilterValue(this.filterHeaderLocation, this.locationName)
                .clickApplyButtonFiltersModal()
                .typeSearchValue(this.mentorSearchName)
                .check(MentorshipDiscoveryAssertions)
                    .assertMentorNameIsDisplayedInResults(this.mentorSearchName)
                .endAssertion()
                .clickMentorCardDropdownAction(this.mentorSearchName,this.mentorSearchAction1)
                .check(MentorProfileAssertions)
                    .assertMentorProfilePageLoadsAllFieldsForMentee(this.mentorSearchName)
                    .assertMentorDetailsLocationLoads(this.locationName);
    }

    public validateMyMentorshipPageLoads(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.getUserByName("Rajendran Sridhar")))
                .goToMePageProfile()
                .goToMentorshipsTab()
                .check(MyMentorshipAssertions)
                    .assertMyMentorshipsPageLoads()
                    .assertMyMenteesTabIsDisplayed()
                .endAssertion()
                .clickMyMentorsTab()
                .check(MyMentorshipAssertions)
                    .assertMyMentorshipsPageLoads()
                    .assertMyMentorsTabIsDisplayed();
    }
}
