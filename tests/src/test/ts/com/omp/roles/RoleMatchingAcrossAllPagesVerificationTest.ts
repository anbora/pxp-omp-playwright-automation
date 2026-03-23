import { CareerGrowthJobRoleTabAssertions } from "assertions/careergrowth/roles/CareerGrowthJobRoleTabAssertions";
import { RoleDetailsAssertions } from "assertions/careergrowth/roles/RoleDetailsAssertions";
import { LandingPageAssertions } from "assertions/landing/LandingPageAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LandingPage } from "pages/landing/LandingPage";
import { AddWorkHistoryToCareerProfileScenario } from "scenarios/jobs/AddWorkHistoryToCareerProfileScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddBasicCareerPreferencesForUser } from "scenarios/profile/AddBasicCareerPreferencesForUser";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";
import { AddSkillToNewUserScenario_SkillLevel } from "scenarios/profile/AddSkillToNewUserScenario_SkillLevel";

export class RoleMatchingAcrossAllPagesVerificationTest extends BaseRestTest {

    private user: UserModel;
    private javaDeveloper: string = "Java developer";
    private lumesse: string = "Lumesse";
    private coding: string = "coding";
    private october: string = "Oct";
    private year_2017: string = "2017";
    private june: string = "Jun";
    private year_2022: string = "2022";

    public initialize(): void {

    this.user = this.createUser();

    }

    public roleMatchingShouldStayTheSameAcrossAllPages(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .run(new AddRoleAndFamilyToNewUserScenario(this.user.name))
                .run(new AddSkillToNewUserScenario_SkillLevel())
                .run(new AddBasicCareerPreferencesForUser())
                .clickUpdateCareerProfileLink()
                .run(new AddWorkHistoryToCareerProfileScenario(this.javaDeveloper, this.lumesse, this.coding,this.october,this.year_2017,this.june,this.year_2022 ))
                .clickSaveAndContinueButton()
                .clickXButton()
                .goToCareerGrowthPage()
                .goToRolesPageViaCard()
                .check(CareerGrowthJobRoleTabAssertions)
                    .assertMatchText("Fair match")
                .endAssertion()
                .markFirstSuggestedRoleAsAspirational()
                .goDirectlyTo(LandingPage)
                .check(LandingPageAssertions)
                    .assertMatchText("Fair match")
                .endAssertion()
                .openNextCareerMilestoneRole()
                .check(RoleDetailsAssertions)
                    .assertThatRoleHasProperMatch("Fair match")
                .endAssertion();
    }

    public afterTests(): void {

      this.deleteUser(this.user);

    }
}
