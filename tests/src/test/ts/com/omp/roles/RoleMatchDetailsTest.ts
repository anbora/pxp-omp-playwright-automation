import { MatchingAnalysisModalAssertions } from "assertions/careergrowth/MatchingAnalysisModalAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { AllFiltersModalPage } from "pages/careergrowth/jobs/AllFiltersModalPage";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";

export class RoleMatchDetailsTest extends BaseRestTest {

    private readonly skills: string = "Skills";
    private readonly careerPreferences: string = "Career Preferences";
    private readonly experience: string = "Experience";
    private readonly careerPath: string = "Career Path";
    private readonly workplaceModel: string = "Workplace Model";
    private readonly remote: string = "Remote";
    private readonly java: string = "java";
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser();

    }

    public shouldCheckIfMatchAnalysisIsVisibleOnJobRole(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .run(new AddRoleAndFamilyToNewUserScenario(this.user.name))
                .goToCareerGrowthPage()
                .clickUpdateCareerProfileLink()
                .clickSkipForNowButton()
                .clickSkipForNowButton()
                .clickSkipForNowButton()
                .selectCareerPreferenceCheckbox(this.workplaceModel, this.remote)
                .clickSaveAndContinueButton()
                .clickSaveButton()
                .goToRolesPageViaCard()
                .openFiltersModal(AllFiltersModalPage)
                .searchForFilterValueWithWait(this.skills, this.java, 2000)
                .applyFiltersAndBackToRoleList()
                .goToFirstRoleCard()
                .showMatchDetails()
                .check(MatchingAnalysisModalAssertions)
                    .assertThatTabIsDisplayed(this.skills)
                    .assertThatTabIsDisplayed(this.careerPreferences)
                    .assertThatTabIsDisplayed(this.experience)
                    .assertThatTabIsDisplayed(this.careerPath);
    }

    public afterTests(): void {

      this.deleteUser(this.user);

    }
}
