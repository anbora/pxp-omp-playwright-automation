import { CareerPathAssertions } from "assertions/careergrowth/roles/CareerPathAssertions";
import { GalayViewFiltersModalAssertions } from "assertions/careergrowth/roles/GalayViewFiltersModalAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { TeamsResponsibleEnum } from "common/enums/TeamsResponsibleEnum";
import { UserModel } from "models/user/UserModel";
import { AllFiltersModalPage } from "pages/careergrowth/jobs/AllFiltersModalPage";
import { GalaxyViewFiltersModalPage } from "pages/careergrowth/roles/GalaxyViewFiltersModalPage";
import { LoginPage } from "pages/other/LoginPage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

export class GalaxyViewFilteringTest extends BaseRestTest {

    private sevenInt: number = 7;
    private elevenInt: number = 11;
    private twentyTwoInt: number = 22;
    private thirtyOneInt: number = 31;
    private zero: string = "0";
    private one: string = "1";
    private four: string = "4";
    private five: string = "5";
    private six: string = "6";
    private seven: string = "7";
    private eight: string = "8";
    private nine: string = "9";
    private eleven: string = "11";
    private fifteen: string = "15";
    private startingRole: string = "Starting Actor";
    private startingRoleFullName: string = "House of Cards -  Starting Actor";
    private qaFamily: string = "QA family";
    private alert: string = "You reached the maximum number of choices (4)";
    private strangerThings: string = "Stranger Things";
    private houseMD: string = "House M.D.";
    private friends: string = "Friends";
    private rachelGreen: string = "Rachel Green";
    private monicaGeller: string = "Monica Geller";
    private phoebeBuffay: string = "Phoebe Buffay";
    private joeyTribbiani: string = "Joey Tribbiani";
    private chandlerBing: string = "Chandler Bing";
    private rossGeller: string = "Ross Geller";
    private gunther: string = "Gunther";
    private houseOfCards: string = "House of Cards";
    private breakingBad: string = "Breaking Bad";
    private sopranos: string = "The Sopranos";

    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser();

    }

    public shouldCheckGalaxyViewForFewJobFamiliesWithoutFiltering(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .goToCareerGrowthPage()
                .goToMePageProfile()
                .editProfile()
                .clickEditProfileButton()
                .clickAddJobFamilyAndRoleButton()
                .selectFirstJobRoleFromInput(this.startingRole, this.startingRoleFullName)
                .clickSelectButton()
                .clickSaveButton()
                .goToMePageProfile()
                .goToCareerGrowthPage()
                .goToCareerPathPageViaTab()
                .waitForRolePillOnGalaxyView(this.phoebeBuffay)
                .check(CareerPathAssertions)
                    .assertThatJobFamilySectionLineIsDisplayed(this.sopranos)
                    .assertThatJobFamilySectionLineIsDisplayed(this.houseOfCards)
                    .assertThatJobFamilySectionLineIsDisplayed(this.breakingBad)
                    .assertThatJobFamilySectionLineIsDisplayed(this.friends)
                    .assertThatTheNumberOfRolePillsIsEqualTo(this.thirtyOneInt);
    }

    public shouldCheckExceedingTheLimitOfJobFamilies(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToCareerGrowthPage()
                .goToCareerPathPageViaTab()
                .waitForRolePillOnGalaxyView(this.phoebeBuffay)
                .openFiltersModal(AllFiltersModalPage)
                .check(GalayViewFiltersModalAssertions)
                    .assertThatJobFamilyCheckboxIsDisabled(this.qaFamily)
                    .assertThatNumberOfRolesWithinJobFamilyIsEqualTo(this.qaFamily, this.one)
                    .assertThatNumberOfSelectedFamiliesIsEqualTo(this.zero)
                .endAssertion()
                .selectCustomOption()
                .selectJobFamilyCheckbox(this.sopranos)
                .check(GalayViewFiltersModalAssertions)
                    .assertThatNumberOfSelectedFamiliesIsEqualTo(this.one)
                .endAssertion()
                .selectJobFamilyCheckbox(this.houseOfCards)
                .selectJobFamilyCheckbox(this.houseMD)
                .selectJobFamilyCheckbox(this.friends)
                .check(GalayViewFiltersModalAssertions)
                    .assertThatNumberOfSelectedFamiliesIsEqualTo(this.four)
                .endAssertion()
                .selectJobFamilyCheckbox(this.breakingBad)
                .check(GalayViewFiltersModalAssertions)
                    .assertThatNumberOfSelectedFamiliesIsEqualTo(this.five)
                    .assertThatAlertIsDisplayedWithText(this.alert)
                    .assertThatApplyButtonIsDisabled()
                .endAssertion()
                .selectJobFamilyCheckbox(this.breakingBad)
                .check(GalayViewFiltersModalAssertions)
                    .assertThatAlertIsNotDisplayed()
                    .assertThatApplyButtonIsEnabled();
    }

    public shouldCheckGalaxyViewFiltering(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToCareerGrowthPage()
                .goToCareerPathPageViaTab()
                .waitForRolePillOnGalaxyView(this.phoebeBuffay)
                .openFiltersModal(GalaxyViewFiltersModalPage)
                .selectCustomOption()
                .check(GalayViewFiltersModalAssertions)
                    .assertThatNumberOfRolesWithinJobFamilyIsEqualTo(this.houseOfCards, this.six)
                    .assertThatNumberOfRolesWithinJobFamilyIsEqualTo(this.friends, this.seven)
                    .assertThatNumberOfRolesWithinJobFamilyIsEqualTo(this.breakingBad, this.eight)
                    .assertThatNumberOfRolesWithinJobFamilyIsEqualTo(this.houseMD, this.nine)
                    .assertThatNumberOfRolesWithinJobFamilyIsEqualTo(this.strangerThings, this.eleven)
                    .assertThatNumberOfRolesWithinJobFamilyIsEqualTo(this.sopranos, this.fifteen)
                .endAssertion()
                .selectJobFamilyCheckbox(this.friends)
                .applyFilters()
                .check(CareerPathAssertions)
                    .assertThatTheNumberOfRolePillsIsEqualTo(this.sevenInt)
                    .assertThatRoleNamePillIsDisplayed(this.rachelGreen)
                    .assertThatRoleNamePillIsDisplayed(this.monicaGeller)
                    .assertThatRoleNamePillIsDisplayed(this.phoebeBuffay)
                    .assertThatRoleNamePillIsDisplayed(this.joeyTribbiani)
                    .assertThatRoleNamePillIsDisplayed(this.chandlerBing)
                    .assertThatRoleNamePillIsDisplayed(this.rossGeller)
                    .assertThatRoleNamePillIsDisplayed(this.gunther)
                .endAssertion()
                .removeFilter(this.friends)
                .check(CareerPathAssertions)
                    .assertThatTheNumberOfRolePillsIsEqualTo(this.thirtyOneInt)
                .endAssertion()
                .openFiltersModal(GalaxyViewFiltersModalPage)
                .selectCustomOption()
                .selectJobFamilyCheckbox(this.sopranos)
                .selectJobFamilyCheckbox(this.strangerThings)
                .applyFilters()
                .check(CareerPathAssertions)
                    .assertThatTheNumberOfRolePillsIsEqualTo(this.twentyTwoInt)
                .endAssertion()
                .removeFilter(this.sopranos)
                .check(CareerPathAssertions)
                    .assertThatTheNumberOfRolePillsIsEqualTo(this.elevenInt)
                .endAssertion()
                .openFiltersModal(GalaxyViewFiltersModalPage)
                .selectJobFamilyCheckbox(this.houseMD)
                .applyFilters()
                .removeAllFilter()
                .waitForRolePillOnGalaxyView(this.joeyTribbiani)
                .check(CareerPathAssertions)
                    .assertThatTheNumberOfRolePillsIsEqualTo(this.thirtyOneInt);
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
