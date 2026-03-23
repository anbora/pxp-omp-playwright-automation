import { RoleListAssertions } from "assertions/careergrowth/careergrowth/RoleListAssertions";
import { SuggestionsAssertions } from "assertions/careergrowth/careergrowth/SuggestionsAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { TeamsResponsibleEnum } from "common/enums/TeamsResponsibleEnum";
import { ResultContainer } from "models/ResultContainer";
import { UserModel } from "models/user/UserModel";
import { WelcomePage_New } from "pages/careergrowth/careergrowth/WelcomePage_New";
import { AddWorkHistoryToCareerProfileScenario } from "scenarios/jobs/AddWorkHistoryToCareerProfileScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddBasicCareerPreferencesForUser } from "scenarios/profile/AddBasicCareerPreferencesForUser";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";
import { AddSkillToCareerProfileScenario } from "scenarios/profile/AddSkillToCareerProfileScenario";
import { AddSkillToNewUserScenario_SkillLevel } from "scenarios/profile/AddSkillToNewUserScenario_SkillLevel";

export class RecommendedRolesCardsOnCarouselTest extends BaseRestTest {

    private matchName: ResultContainer = new ResultContainer();
    private currentUserRole: string = "Football player trainee";
    private footballPlayerJunior: string = "Football player junior";
    private entryLevel: string = "Entry Level";
    private unusualJobFamily: string = "Unusual job family";
    private football: string = "football";
    private skillsIcon: string = "icon icon-star-half";
    private footballClub: string = "Football club";
    private october: string = "Oct";
    private year_2017: string = "2017";
    private june: string = "Jun";
    private year_2022: string = "2022";
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser();

    }

    public checkDataShownOnRecommendedRolesCards(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .run(new AddRoleAndFamilyToNewUserScenario(this.user.name))
                .run(new AddSkillToNewUserScenario_SkillLevel())
                .run(new AddBasicCareerPreferencesForUser())
                .clickUpdateCareerProfileLink()
                .run(new AddWorkHistoryToCareerProfileScenario(this.footballPlayerJunior,this.footballClub,this.football,this.october,this.year_2017,this.june,this.year_2022 ))
                .clickSaveAndContinueButton()
                .clickXButton()
                .goToSuggestionsPageViaTab()
                .waitForJobRoleRecommendationByTitle(this.footballPlayerJunior)
                .getFirstOpportunityMatchValue(this.matchName)
                .check(SuggestionsAssertions)
                    .assertThatRoleIsNotDisplayedAsRecommended(this.currentUserRole)
                    .assertThatFirstRoleOnRecommendedRolesListIsEqualTo(this.footballPlayerJunior)
                    .assertThatLevelIconIsDisplayedForRecommendedRole(this.footballPlayerJunior)
                    .assertThatRecommendedRoleLevelIsEqualTo(this.footballPlayerJunior, this.entryLevel)
                    .assertThatJobFamilyIconIsDisplayedForRecommendedRole(this.footballPlayerJunior)
                    .assertThatRecommendedRoleJobFamilyIsEqualTo(this.footballPlayerJunior, this.unusualJobFamily)
                .endAssertion()
                .goToRolesPageViaTab()
                .check(RoleListAssertions)
                    .assertThatRoleIsNotDisplayedAsRecommended(this.currentUserRole)
                    .assertThatFirstRoleOnAllRolesListIsEqualTo(this.footballPlayerJunior)
                    .assertThatLevelIconIsDisplayedForRecommendedRole(this.footballPlayerJunior)
                    .assertThatRecommendedRoleLevelIsEqualTo(this.footballPlayerJunior, this.entryLevel)
                    .assertThatJobFamilyIconIsDisplayedForRecommendedRole(this.footballPlayerJunior)
                    .assertThatRecommendedRoleJobFamilyIsEqualTo(this.footballPlayerJunior, this.unusualJobFamily)
                    .assertThatRecommendedRoleSkillsIconIsDisplayed(this.footballPlayerJunior, this.skillsIcon)
                    .assertThatSkillIsDisplayedOnRecommendedRoleCard(this.footballPlayerJunior, this.football)
                    .assertThatMoreSkillsLinkIsDisplayedOnRecommendedRoleCard(this.footballPlayerJunior)
                    .assertThatMoreSkillsLinkIsDisplayedOnRecommendedRoleCard(this.footballPlayerJunior)
                    .assertThatJobRoleMatchIsEqualTo(this.footballPlayerJunior, this.matchName.getValue());
    }

    public afterTests(): void {

      this.deleteUser(this.user);

    }
}
