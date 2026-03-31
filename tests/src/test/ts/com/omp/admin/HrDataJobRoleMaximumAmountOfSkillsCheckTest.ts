// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { expect } from "common/testing/playwright";

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
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.goToAdminPanel();
        __page1 = __page1.selectMainTab(this.hrData);
        __page1 = __page1.openMenuForHrConfiguration();
        __page1 = __page1.clearAndFillMaxNumberOfSkills(this.maxNumber1);
        __page1 = __page1.clickSaveButtonJobRoleTab();
        __page1 = __page1.openMenuForJobRolesHRData();
        __page1 = __page1.clickAddJobRoleButton();
        __page1 = __page1.typeRoleName(this.jobRoleName);
        __page1 = __page1.selectFunctionAndFamily(this.functionName, this.functionAndFamilyName);
        __page1 = __page1.clickJobLevelDropdown();
        __page1 = __page1.addSkillsToTheJobRole(this.firstSkill);
        __page1 = __page1.addSkillsToTheJobRole(this.secondSkill);
        __page1 = __page1.addSkillsToTheJobRole(this.thirdSkill);
        __page1 = __page1.addSkillsToTheJobRole(this.fourthSkill);
        __page1 = __page1.addSkillsToTheJobRole(this.fifthSkill);
        __page1 = __page1.addSkillsToTheJobRole(this.sixthSkill);
        expect(__page1.maximumNumberOfSkillsMessage).toContainText("You have already added max allowed skill.", { timeout: 30000 });
        __page1.logger.info("Successfully verified data. Warning message is showing");
        __page1 = __page1.clickCloseButton();
        __page1 = __page1.clickSaveButton();
        __page1 = __page1.clickSearchJobRole(this.jobRoleName);
        __page1 = __page1.clickEditJobRoleButton();
        __page1 = __page1.tryAddingOneMoreSkill(this.sixthSkill);
        expect(__page1.maximumNumberOfSkillsMessage).toContainText("You have already added max allowed skill.", { timeout: 30000 });
        __page1.logger.info("Successfully verified data. Warning message is showing");
        __page1 = __page1.clickCloseButton();
        __page1 = __page1.clickSaveButton();
        __page1 = __page1.openMenuForHrConfiguration();
        __page1 = __page1.clearAndFillMaxNumberOfSkills(this.maxNumber2);
        __page1 = __page1.clickSaveButtonJobRoleTab();
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
