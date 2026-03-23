import { RoleListAssertions } from "assertions/careergrowth/careergrowth/RoleListAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { ResultContainer } from "models/ResultContainer";
import { UserModel } from "models/user/UserModel";
import { LandingPage } from "pages/landing/LandingPage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddCustomRoleToUserScenario } from "scenarios/profile/AddCustomRoleToUserScenario";
import { AddCustomSkillToUserScenario } from "scenarios/profile/AddCustomSkillToUserScenario";

export class LocationRestrictionToJobRoleRecommendationsTest extends BaseRestTest {

    private user3: UserModel;

    private user1: UserModel;

    private user2: UserModel;
    private recommendedJobList: ResultContainer = new ResultContainer();
    private restaurantManagerRole: string = "Restaurant Manager";

    private location1: string = "Restaurant - Bialka";
    private location2: string = "Restaurant - Makow";
    private location3: string = "Restaurant - Sucha";

    private TITLE_1: string = "Restaurant Manager - Bialka";
    private TITLE_2: string = "Restaurant Manager - Makow";
    private TITLE_3: string = "Restaurant Manager - Sucha";
    private TITLE_4: string = "Restaurant Manager - empty location";
    private TITLE_5: string = "Restaurant Manager - Bialka and Sucha";

    private expectedRestrictionOffNoLocation: Array<string> = Arrays.asList(this.TITLE_1, this.TITLE_2, this.TITLE_3, this.TITLE_4, this.TITLE_5);
    private noExpectedRestrictionOffNoLocation: Array<string> = List.of();
    private expectedRestrictionOnNoLocation: Array<string> = Arrays.asList(this.TITLE_1, this.TITLE_2, this.TITLE_3, this.TITLE_4, this.TITLE_5);
    private noExpectedRestrictionOnNoLocation: Array<string> = List.of();
    private expectedRestrictionOffBialkaLocation: Array<string> = Arrays.asList(this.TITLE_1, this.TITLE_2, this.TITLE_3, this.TITLE_4, this.TITLE_5);
    private noExpectedRestrictionOffBialkaLocation: Array<string> = List.of();
    private expectedRestrictionOnBialkaLocation: Array<string> = Arrays.asList(this.TITLE_1, this.TITLE_5, this.TITLE_4);
    private noExpectedRestrictionOnBialkaLocation: Array<string> = Arrays.asList(this.TITLE_2, this.TITLE_3);
    private expectedRestrictionOffMakowAndSuchaLocations: Array<string> = Arrays.asList(this.TITLE_1, this.TITLE_2, this.TITLE_3, this.TITLE_4, this.TITLE_5);
    private noExpectedRestrictionOffMakowAndSuchaLocations: Array<string> = List.of();
    private expectedRestrictionOnMakowAndSuchaLocations: Array<string> = Arrays.asList(this.TITLE_2, this.TITLE_3, this.TITLE_4, this.TITLE_5);
    private noExpectedRestrictionOnMakowAndSuchaLocations: Array<string> = Arrays.asList(this.TITLE_1);

    public initialize(): void {
      this.user1 = this.createUser(true);
      this.user2 = this.createUser(true);
      this.user3 = this.createUser(true);
    }

    public dataProvider(): any[][] {
        return [
                [this.user1, false, List.of(), this.expectedRestrictionOffNoLocation, this.noExpectedRestrictionOffNoLocation, this.expectedRestrictionOnNoLocation, this.noExpectedRestrictionOnNoLocation],
                [this.user2, true, Collections.singleton(this.location1), this.expectedRestrictionOffBialkaLocation, this.noExpectedRestrictionOffBialkaLocation, this.expectedRestrictionOnBialkaLocation, this.noExpectedRestrictionOnBialkaLocation],
                [this.user3, true, Arrays.asList(this.location2, this.location3), this.expectedRestrictionOffMakowAndSuchaLocations, this.noExpectedRestrictionOffMakowAndSuchaLocations, this.expectedRestrictionOnMakowAndSuchaLocations, this.noExpectedRestrictionOnMakowAndSuchaLocations]
        ];
    }

    public shouldCheckThat(user: UserModel, withLocation: boolean, locationValueList: Array<string>, expectedRoleList: Array<string>, notExpectedRoleList: Array<string>, expectedRoleList2: Array<string>, notExpectedRoleList2: Array<string>): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(user))
                .run(new AddCustomRoleToUserScenario(user, this.restaurantManagerRole, "Restaurant family -  " + this.restaurantManagerRole))
                .run(new AddCustomSkillToUserScenario("restaurant management"))
                .run(new AddCustomSkillToUserScenario("restaurant menus"))
                .run(new AddCustomSkillToUserScenario("food safety"))
                .goToAdminPanel()
                .selectOpportunityMarketplace()
                .openMenuForJobRoleOpportunityMarketplace()
                .clickRecommendationsButton()
                .enableOrDisableLocationPreferences(true)
                .clickSaveButton()
                .goDirectlyTo(LandingPage)
                .goToCareerGrowthPage()
                .goToRolesPageViaTab()
                .waitForGoodOrExcellentMatch()
                .getAllRecommendedJobRolesWhichContainsTitle(this.recommendedJobList, this.restaurantManagerRole)
                .check(RoleListAssertions)
                    .assertThatJobRoleListContainsValues(this.recommendedJobList.getListValue(), expectedRoleList2)
                    .assertThatJobRoleListContainsNotValues(this.recommendedJobList.getListValue(), notExpectedRoleList2)
                .endAssertion()
                .goToAdminPanel()
                .selectOpportunityMarketplace()
                .openMenuForJobRoleOpportunityMarketplace()
                .clickRecommendationsButton()
                .enableOrDisableLocationPreferences(false)
                .clickSaveButton()
                .goDirectlyTo(LandingPage)
                .goToCareerGrowthPage()
                .goToRolesPageViaTab()
                .waitForGoodOrExcellentMatch()
                .getAllRecommendedJobRolesWhichContainsTitle(this.recommendedJobList, this.restaurantManagerRole)
                .check(RoleListAssertions)
                    .assertThatJobRoleListContainsValues(this.recommendedJobList.getListValue(), expectedRoleList)
                    .assertThatJobRoleListContainsNotValues(this.recommendedJobList.getListValue(), notExpectedRoleList)
                .endAssertion();
    }

    public clearAfterTests(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.getCypressUser()))
                .goToAdminPanel()
                .selectOpportunityMarketplace()
                .openMenuForJobRoleOpportunityMarketplace()
                .clickRecommendationsButton()
                .enableOrDisableLocationPreferences(false)
                .clickSaveButton();
    }

    public afterClass(): void {
        this.deleteUser(this.user1);
        this.deleteUser(this.user2);
        this.deleteUser(this.user3);
    }
}
