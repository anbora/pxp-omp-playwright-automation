import { CareerPathAssertions } from "assertions/careergrowth/roles/CareerPathAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { TeamsResponsibleEnum } from "common/enums/TeamsResponsibleEnum";
import { UserModel } from "models/user/UserModel";
import { WelcomePage_New } from "pages/careergrowth/careergrowth/WelcomePage_New";
import { AddWorkHistoryToCareerProfileScenario } from "scenarios/jobs/AddWorkHistoryToCareerProfileScenario";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddSkillToCareerProfileScenario } from "scenarios/profile/AddSkillToCareerProfileScenario";

export class GalaxyViewRolePillsAndCardsTest extends BaseRestTest {

    private one: string = "1";
    private two: string = "2";
    private three: string = "3";
    private four: string = "4";
    private startingRole: string = "Starting Actor";
    private startingRoleFullName: string = "House of Cards -  Starting Actor";
    private low: string = "Low";
    private fair: string = "Fair";
    private good: string = "Good";
    private excellent: string = "Excellent";
    private excellentMatchColor: string = "rgb(109, 196, 151)";
    private goodMatchColor: string = "rgb(145, 200, 62)";
    private fairMatchColor: string = "rgb(251, 171, 25)";
    private lowMatchColor: string = "rgb(238, 124, 43)";
    private friends: string = "Friends";
    private joeyTribbiani: string = "Joey Tribbiani";
    private rossGeller: string = "Ross Geller";
    private gunther: string = "Gunther";
    private edwardMeechum: string = "Edward Meechum";
    private sopranos: string = "The Sopranos";
    private janiceSoprano: string = "Janice Soprano";
    private adrianaLeCerva: string = "Adriana Le Cerva";
    private patyParisi: string = "Paty Parisi";
    private vitoSpatafore: string = "Vito Spatafore";
    private bobbyBaccalieri: string = "Bobby Baccalieri";
    private director: string = "Director";
    private contests: string = "contests";
    private interfaith: string = "interfaith";
    private shrub: string = "shrub";
    private lumesse: string = "lumesse";
    private october: string = "Oct";
    private year_2017: string = "2017";
    private december: string = "Dec";
    private year_2023: string = "2023";
    private underwood: string = "Francis Underwood";
    private blessings: string = "Blessings";
    private intermediate: string = "Intermediate";
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser();

    }

    public shouldCheckGalaxyViewRoleDetailsOnRoleCard(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .goToEditProfileFromUserDropDown(this.user.name)
                .clickEditProfileButton()
                .clickAddJobFamilyAndRoleButton()
                .selectFirstJobRoleFromInput(this.startingRole, this.startingRoleFullName)
                .clickSelectButton()
                .clickSaveButton()
                .goToCareerGrowthPage()
                .clickUpdateCareerProfileLink()
                .run(new AddWorkHistoryToCareerProfileScenario(this.underwood, this.lumesse, this.lumesse, this.october, this.year_2017, this.december, this.year_2023))
                .clickSaveAndContinueButton()
                .run(new AddSkillToCareerProfileScenario(this.blessings, this.intermediate))
                .clickSaveAndContinueButton()
                .clickXButton()
                .goToCareerPathPageViaTab()
                .waitForRolePillOnGalaxyView(this.joeyTribbiani)
                .check(CareerPathAssertions)
                    .assertThatRoleNamePillIsCollapsed(this.janiceSoprano)
                .endAssertion()
                .clickRolePill(this.janiceSoprano)
                .check(CareerPathAssertions)
                    .assertThatRoleCardLevelIsEqualTo(this.janiceSoprano, this.director)
                    .assertThatRoleCardFamilyIsEqualTo(this.janiceSoprano, this.sopranos)
                    .assertThatRoleCardSkillIsDisplayed(this.janiceSoprano, this.contests)
                    .assertThatRoleCardSkillIsDisplayed(this.janiceSoprano, this.interfaith)
                    .assertThatRoleCardSkillIsDisplayed(this.janiceSoprano, this.shrub);
    }

    public shouldCheckGalaxyViewRoleMatchingOnPills(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToCareerGrowthPage()
                .goToCareerPathPageViaTab()
                .waitForMatchOnRoleCard(this.bobbyBaccalieri, this.excellent)
                .check(CareerPathAssertions)
                    .assertThatSmileIconColorForRolePillIsEqualTo(this.edwardMeechum, this.fairMatchColor)
                    .assertThatSmileIconColorForRolePillIsEqualTo(this.joeyTribbiani, this.goodMatchColor)
                    .assertThatSmileIconColorForRolePillIsEqualTo(this.bobbyBaccalieri, this.excellentMatchColor)
                    .assertThatSmileIconColorForCollapsedRolePillIsEqualTo(this.janiceSoprano, this.lowMatchColor)
                    //.assertThatSmileIconColorForCollapsedRolePillIsEqualTo(chandlerBing, fairMatchColor) //TM-7189
                    //.assertThatCollapsedGroupedRolesPillContainsSmileIconWhichColorIsEqualTo(sopranos, two, one, fairMatchColor //TM-7189
                    .assertThatCollapsedGroupedRolesPillContainsSmileIconWhichColorIsEqualTo(this.sopranos, this.one, this.one, this.goodMatchColor)
                    //.assertThatCollapsedGroupedRolesPillContainsSmileIconWhichColorIsEqualTo(sopranos, one, two, fairMatchColor) //TM-7189
                    .assertThatCollapsedGroupedRolesPillContainsSmileIconWhichColorIsEqualTo(this.friends, this.one, this.one, this.excellentMatchColor);
    }

    public shouldCheckGalaxyViewRoleMatchingOnCards(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToCareerGrowthPage()
                .goToCareerPathPageViaTab()
                .waitForRolePillOnGalaxyView(this.joeyTribbiani)
                .clickRolePill(this.janiceSoprano)
                .check(CareerPathAssertions)
                    .assertThatSmileIconColorForRoleCardIsEqualTo(this.janiceSoprano, this.lowMatchColor)
                    .assertThatRoleCardMatchingIsEqualTo(this.janiceSoprano, this.low)
                .endAssertion()
                .clickRolePill(this.edwardMeechum)
                .check(CareerPathAssertions)
                    .assertThatSmileIconColorForRoleCardIsEqualTo(this.edwardMeechum, this.fairMatchColor)
                    .assertThatRoleCardMatchingIsEqualTo(this.edwardMeechum, this.fair)
                .endAssertion()
                .clickRolePill(this.joeyTribbiani)
                .check(CareerPathAssertions)
                    .assertThatSmileIconColorForRoleCardIsEqualTo(this.joeyTribbiani, this.goodMatchColor)
                    .assertThatRoleCardMatchingIsEqualTo(this.joeyTribbiani, this.good)
                .endAssertion()
                .clickRolePill(this.bobbyBaccalieri)
                .check(CareerPathAssertions)
                    .assertThatSmileIconColorForRoleCardIsEqualTo(this.bobbyBaccalieri, this.excellentMatchColor)
                    .assertThatRoleCardMatchingIsEqualTo(this.bobbyBaccalieri, this.excellent)
                .endAssertion()
                .clickGroupedRolesPill(this.two, this.friends)
                .check(CareerPathAssertions)
                    .assertThatSmileIconColorForRoleCardIsEqualTo(this.gunther, this.fairMatchColor)
                    .assertThatSmileIconColorForRoleCardIsEqualTo(this.rossGeller, this.excellentMatchColor);
    }

    public shouldCheckGalaxyViewRolePillsGroupingWhileZooming(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToCareerGrowthPage()
                .goToCareerPathPageViaTab()
                .waitForRolePillOnGalaxyView(this.joeyTribbiani)
                .check(CareerPathAssertions)
                    .assertThatTheNumberOfRolesWithinGroupedPillsIsEqualTo(this.sopranos, this.one, this.three)
                    .assertThatRoleNamePillIsNotDisplayed(this.adrianaLeCerva)
                    .assertThatRoleNamePillIsNotDisplayed(this.vitoSpatafore)
                    .assertThatRoleNamePillIsNotDisplayed(this.patyParisi)
                    .assertThatRoleNamePillIsDisplayed(this.bobbyBaccalieri)
                    .assertThatRoleNamePillIsDisplayed(this.janiceSoprano)
                .endAssertion()
                .zoomIn()
                .check(CareerPathAssertions)
                    .assertThatRoleNamePillIsNotDisplayed(this.vitoSpatafore)
                    .assertThatRoleNamePillIsNotDisplayed(this.patyParisi)
                    .assertThatRoleNamePillIsDisplayed(this.bobbyBaccalieri)
                    .assertThatRoleNamePillIsDisplayed(this.adrianaLeCerva)
                    .assertThatRoleNamePillIsDisplayed(this.janiceSoprano)
                .endAssertion()
                .zoomOut()
                .zoomOut()
                .zoomOut()
                .check(CareerPathAssertions)
                    .assertThatTheNumberOfRolesWithinGroupedPillsIsEqualTo(this.sopranos, this.one, this.four)
                    .assertThatRoleNamePillIsNotDisplayed(this.adrianaLeCerva)
                    .assertThatRoleNamePillIsNotDisplayed(this.vitoSpatafore)
                    .assertThatRoleNamePillIsNotDisplayed(this.patyParisi)
                    .assertThatRoleNamePillIsNotDisplayed(this.bobbyBaccalieri)
                    .assertThatRoleNamePillIsDisplayed(this.janiceSoprano);
    }
}
