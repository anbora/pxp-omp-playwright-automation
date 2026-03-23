import { HrDataCreateJobRoleAssertion } from "assertions/admin/hrdata/HrDataCreateJobRoleAssertion";
import { HrDataEditJobRoleAssertion } from "assertions/admin/hrdata/HrDataEditJobRoleAssertion";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

export class HrDataJobRoleMaximumAmountOfSkillsCheckTest extends BaseRestTest {

    private hrData: string = "HR Data";
    private jobRoleName: string = UUID.randomUUID().toString();
    private user: UserModel;
    private functionAndFamilyName: string = "QA Job Function For Roles (DO NOT TOUCH)";
    private functionName: string = "QA Job Function For Roles (DO NOT TOUCH)";
    private firstSkill: string = "peer support";
    private secondSkill: string = "desktop support";
    private thirdSkill: string = "customer support";
    private fourthSkill: string = "sales support";
    private fifthSkill: string = "technical support";
    private sixthSkill: string = "production support";
    private maxNumber1: string = "5";
    private maxNumber2: string = "50";

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public createAndEditJobRoleAndTranslationViaAdminPage(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .goToAdminPanel()
                .selectMainTab(this.hrData)
                .openMenuForHrConfiguration()
                .clearAndFillMaxNumberOfSkills(this.maxNumber1)
                .clickSaveButtonJobRoleTab()
                .openMenuForJobRolesHRData()
                .clickAddJobRoleButton()
                .typeRoleName(this.jobRoleName)
                .selectFunctionAndFamily(this.functionName, this.functionAndFamilyName)
                .clickJobLevelDropdown()
                .addSkillsToTheJobRole(this.firstSkill)
                .addSkillsToTheJobRole(this.secondSkill)
                .addSkillsToTheJobRole(this.thirdSkill)
                .addSkillsToTheJobRole(this.fourthSkill)
                .addSkillsToTheJobRole(this.fifthSkill)
                .addSkillsToTheJobRole(this.sixthSkill)
                .check(HrDataCreateJobRoleAssertion)
                    .assertThatMaxNumberOfSkillsReachedMessageIsDisplayed()
                .endAssertion()
                .clickCloseButton()
                .clickSaveButton()
                .clickSearchJobRole(this.jobRoleName)
                .clickEditJobRoleButton()
                .tryAddingOneMoreSkill(this.sixthSkill)
                .check(HrDataEditJobRoleAssertion)
                    .assertThatMaxNumberOfSkillsReachedMessageIsDisplayed()
                .endAssertion()
                .clickCloseButton()
                .clickSaveButton()
                .openMenuForHrConfiguration()
                .clearAndFillMaxNumberOfSkills(this.maxNumber2)
                .clickSaveButtonJobRoleTab();
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
