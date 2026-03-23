import { PreferencesCareerProfileModalAssertions } from "assertions/careergrowth/profiles/PreferencesCareerProfileModalAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";

export class ManageCareerPreferencesFromProfileTest extends BaseRestTest {

    private careerGoal: string = "Career Goal";
    private level: string = "Level";
    private workplaceModel: string = "Workplace Model";
    private jobType: string = "Job Type";
    private schedule: string = "Schedule";
    private careerTrack: string = "Career Track";
    private backward: string = "I am open to roles with lower levels of responsibility";
    private internship: string = "Internship";
    private remote: string = "Remote";
    private temporary: string = "Temporary";
    private partTime: string = "Part time";
    private individualContributor: string = "Individual contributor";
    private updateAlert: string = "Career preferences updated";

    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser();

    }

    public shouldAddPreferencesInProfileSettings(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .run(new AddRoleAndFamilyToNewUserScenario(this.user.name))
                .goToCareerGrowthPage()
                .goToProfileFromUserDropDown(this.user.name)
                .editProfile()
                .goToCareerPreferencesTab()
                .selectCareerPreferenceCheckbox(this.careerGoal, this.backward)
                .addCareerPreference(this.level, this.internship)
                .selectCareerPreferenceCheckbox(this.workplaceModel, this.remote)
                .addCareerPreference(this.jobType, this.temporary)
                .selectCareerPreferenceCheckbox(this.schedule, this.partTime)
                .selectCareerPreferenceCheckbox(this.careerTrack, this.individualContributor)
                .check(PreferencesCareerProfileModalAssertions)
                    .assertThatPreferencesAreUpdated(this.updateAlert)
                    .assertThatOptionIsChecked(this.careerGoal, this.backward)
                    .assertThatOptionIsChecked(this.careerTrack, this.individualContributor)
                .endAssertion()
                .waitForResponse()
                .goToCareerGrowthPage()
                .clickUpdateCareerProfileLink()
                .clickSkipForNowButton()
                .clickSkipForNowButton()
                .clickSkipForNowButton()
                .check(PreferencesCareerProfileModalAssertions)
                    .assertThatOptionIsChecked(this.careerGoal, this.backward)
                    .assertThatChipIsDisplayed(this.level, this.internship)
                    .assertThatOptionIsChecked(this.workplaceModel, this.remote)
                    .assertThatChipIsDisplayed(this.jobType, this.temporary)
                    .assertThatOptionIsChecked(this.schedule, this.partTime)
                    .assertThatOptionIsChecked(this.careerTrack, this.individualContributor);
    }

    public shouldUpdateCareerProfileByRemovingPreferences(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToProfileFromUserDropDown(this.user.name)
                .editProfile()
                .goToCareerPreferencesTab()
                .selectCareerPreferenceCheckbox(this.careerGoal, this.backward)
                .removeCareerPreference(this.level, this.internship)
                .selectCareerPreferenceCheckbox(this.workplaceModel, this.remote)
                .removeCareerPreference(this.jobType, this.temporary)
                .selectCareerPreferenceCheckbox(this.schedule, this.partTime)
                .selectCareerPreferenceCheckbox(this.careerTrack, this.individualContributor)
                .check(PreferencesCareerProfileModalAssertions)
                    .assertThatPreferencesAreUpdated(this.updateAlert)
                    .assertThatOptionIsNotChecked(this.careerGoal, this.backward)
                    .assertThaEmptyStateIsDisplayedForType(this.level)
                    .assertThatOptionIsNotChecked(this.workplaceModel, this.remote)
                    .assertThaEmptyStateIsDisplayedForType(this.jobType)
                    .assertThatOptionIsNotChecked(this.schedule, this.partTime)
                    .assertThatOptionIsNotChecked(this.careerTrack, this.individualContributor);
    }

    public afterTests(): void {

      this.deleteUser(this.user);

    }
}
