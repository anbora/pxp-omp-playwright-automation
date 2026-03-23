import { SkillsPassportMePageAssertions } from "assertions/careergrowth/jobs/SkillsPassportMePageAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";

export class CrudSkillsTest extends BaseRestTest {

    private skillValue: string = "Skill";
    private skillName: string = "cardiology";
    private skillNameInModal: string = "cardiology";
    private skillLevel: string = "Beginner";
    private yearValue: string = "1";
    private monthValue: string = "1";
    private skillDescriptionText: string = "Skill description";

    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser();

    }

    public shouldAddSkill(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .run(new AddRoleAndFamilyToNewUserScenario(this.user.name))
                .goToMePageProfile()
                .goToSkillPassportTab()
                .clickAddMoreSkillsButton()
                .selectSkillValue(this.skillValue)
                .selectSkillFromInput(this.skillNameInModal,  this.skillName)
                .selectSkillLevel(this.skillLevel)
                .selectYearValue(this.yearValue)
                .selectMonthValue(this.monthValue)
                .clickSaveButton()
                .check(SkillsPassportMePageAssertions)
                    .assertThatSkillIsAdded(this.skillName);
    }

    public shouldUpdateSkill(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToMePageProfile()
                .goToSkillPassportTab()
                .openSkillDetails(this.skillName)
                .editSkillDetails()
                .addDescription(this.skillDescriptionText)
                .clickSaveButton()
                .clickSkillBox(this.skillName)
                .check(SkillsPassportMePageAssertions)
                    .assertThatSkillDetailsShowsDescription(this.skillName);
    }

    public shouldDeleteSkill(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToMePageProfile()
                .goToSkillPassportTab()
                .openSkillDetails(this.skillName)
                .deleteSkill()
                .clickConfirm()
                .check(SkillsPassportMePageAssertions)
                    .assertThatSkillIsNotVisible(this.skillName);
    }

    public afterTests(): void {

      this.deleteUser(this.user);

    }
}
