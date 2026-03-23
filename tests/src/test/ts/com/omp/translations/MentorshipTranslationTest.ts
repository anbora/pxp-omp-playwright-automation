import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { WelcomePage_New } from "pages/careergrowth/careergrowth/WelcomePage_New";
import { MentorshipDiscoveryPage } from "pages/careergrowth/mentorship/MentorshipDiscoveryPage";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";
import { AddSkillToNewUserScenario_SkillLevel } from "scenarios/profile/AddSkillToNewUserScenario_SkillLevel";

export class MentorshipTranslationTest extends BaseRestTest {

    private user: UserModel;
    private listOfExcludedStringForLandingPage: Array<string> = [];
    private message: string = UUID.randomUUID().toString();
    private skillName: string = "JavaScript";
    private description: string = "I want to become mentor in Java 8 am open.";

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public shouldCheckTranslationForLandingPage(): void {
        this.listOfExcludedStringForLandingPage.addAll(Arrays.asList("20%", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "master", "+", this.user.fullName, "Test This"));
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .run(new AddRoleAndFamilyToNewUserScenario(this.user.name))
                .run(new AddSkillToNewUserScenario_SkillLevel())
                .changeUserDefinedLanguage("Pseudo Localization (xx-XX-native)")
                .goDirectlyTo(WelcomePage_New)
                .goToMenthorshipPageViaTab()
                .checkTranslationWithPageRefresh(MentorshipDiscoveryPage, this.listOfExcludedStringForLandingPage)
                .clickInFiltersButton()
                .checkTranslationWithoutPageRefresh(MentorshipDiscoveryPage, this.listOfExcludedStringForLandingPage)
                .closeFilters()
                .clickSortByButton()
                .checkTranslationWithoutPageRefresh(MentorshipDiscoveryPage, this.listOfExcludedStringForLandingPage)
//                .clickActionsButtonMentorship()
                .checkTranslationWithoutPageRefresh(MentorshipDiscoveryPage, this.listOfExcludedStringForLandingPage)
                .typeSearchValue("Rajendran")
                .clickRequestMentorship("Rajendran Sridhar request")
                .checkTranslationWithoutPageRefresh(MentorshipDiscoveryPage, this.listOfExcludedStringForLandingPage)
                .submitMentorshipRequestWithMessage(this.message)
                .clickMyMentorsTab()
                .checkTranslationWithoutPageRefresh(MentorshipDiscoveryPage, this.listOfExcludedStringForLandingPage)
                .clickOnCreateProfileButton()
                .checkTranslationWithoutPageRefresh(MentorshipDiscoveryPage, this.listOfExcludedStringForLandingPage)
                .addSkillsAndDescription(this.skillName,this.skillName,this.description)
                .clickOnCreateProfileButtonFromModalPage()
                .checkTranslationWithoutPageRefresh(MentorshipDiscoveryPage, this.listOfExcludedStringForLandingPage)
                .clickOnCloseMentorProfileButton()
                .checkTranslationWithoutPageRefresh(MentorshipDiscoveryPage, this.listOfExcludedStringForLandingPage)
                .clickViewMyMentorProfileButton()
                .checkTranslationWithoutPageRefresh(MentorshipDiscoveryPage, this.listOfExcludedStringForLandingPage)
                .goDirectlyTo(WelcomePage_New)
                .goToMenthorshipPageViaTab()
                .clickMyMentorsTab()
                .checkTranslationWithoutPageRefresh(MentorshipDiscoveryPage, this.listOfExcludedStringForLandingPage)
                .clickFiltersInMyMentorsTab()
                .checkTranslationWithoutPageRefresh(MentorshipDiscoveryPage, this.listOfExcludedStringForLandingPage)
                .clickSortByButton()
                .checkTranslationWithoutPageRefresh(MentorshipDiscoveryPage, this.listOfExcludedStringForLandingPage)
//                .clickActionsButtonMyMentorsTab()
                .checkTranslationWithoutPageRefresh(MentorshipDiscoveryPage, this.listOfExcludedStringForLandingPage);
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
