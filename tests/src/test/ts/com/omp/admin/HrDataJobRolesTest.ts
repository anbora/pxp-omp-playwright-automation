// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { expect } from "common/testing/playwright";

export class HrDataJobRolesTest extends BaseRestTest {

    private hrData: string = "HR Data";
    private jobRoleName: string = UUID.randomUUID().toString();
    private roleDescription: string = UUID.randomUUID().toString();
    private roleSummary: string = UUID.randomUUID().toString();
    private additionalDescription: string = UUID.randomUUID().toString();
    private functionAndFamilyName: string = "QA Job Function For Roles (DO NOT TOUCH)";
    private functionName: string = "QA Job Function For Roles (DO NOT TOUCH)";
    private roleNameAfterEdit: string = UUID.randomUUID().toString();
    private roleNameTranslation: string = UUID.randomUUID().toString();
    private roleDescriptionTranslation: string = UUID.randomUUID().toString();
    private translationLanguage: string = "Italian";
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public createAndEditJobRoleAndTranslationViaAdminPage(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.goToAdminPanel();
        __page1 = __page1.selectMainTab(this.hrData);
        __page1 = __page1.openMenuForJobRolesHRData();
        __page1 = __page1.clickAddJobRoleButton();
        __page1 = __page1.typeRoleName(this.jobRoleName);
        __page1 = __page1.typeRoleDescription(this.roleDescription);
        __page1 = __page1.typeRoleSummary(this.roleSummary);
        __page1 = __page1.typeAdiitionalDescription(this.additionalDescription);
        __page1 = __page1.clickLocationDropdown();
        __page1 = __page1.selectFunctionAndFamily(this.functionName, this.functionAndFamilyName);
        __page1 = __page1.clickJobLevelDropdown();
        __page1 = __page1.clickSaveButton();
        __page1 = __page1.clickSearchJobRole(this.jobRoleName);
        expect(__page1.jobRoleName.first()).toContainText(this.jobRoleName, { timeout: 30000 });
        __page1.logger.info("Successfully verified data. Job role name found on the list.");
        __page1 = __page1.clickEditJobRoleButton();
        expect(__page1.enterAdditionalDescription).toContainText(this.additionalDescription);
        __page1.logger.info("Successfully verified data Additional Description is displayed");
        expect(__page1.enterRoleDescription).toContainText(this.roleDescription);
        __page1.logger.info("Successfully verified data Description is displayed");
        expect(__page1.enterRoleSummary).toContainText(this.roleSummary);
        __page1.logger.info("Successfully verified data Role Summary is displayed");
        expect(__page1.locationValue(value1)).toBeVisible({ timeout: 30000 });
        expect(__page1.locationValue(value2)).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified data locations are displayed");
        __page1 = __page1.typeEnterRoleName(this.roleNameAfterEdit);
        __page1 = __page1.addAdditionalLocation();
        __page1 = __page1.clickSaveButton();
        __page1 = __page1.clickSearchJobRole(this.roleNameAfterEdit);
        expect(__page1.jobRoleName.first()).toContainText(this.roleNameAfterEdit, { timeout: 30000 });
        __page1.logger.info("Successfully verified data. Job role name found on the list.");
        __page1 = __page1.clickEditJobRoleButton();
        expect(__page1.locationValue(value1)).toBeVisible({ timeout: 30000 });
        expect(__page1.locationValue(value2)).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified data locations are displayed");
        expect(__page1.locationValue(value3)).toBeVisible({ timeout: 30000 });
        expect(__page1.locationValue(value4)).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified data  additional locations are displayed");
        __page1 = __page1.clickSaveButton();
        __page1 = __page1.clickSearchJobRole(this.roleNameAfterEdit);
        __page1 = __page1.clickTranslationButton();
        __page1 = __page1.clickTranslationDropdown(this.translationLanguage);
        __page1 = __page1.typeEnterRoleName(this.roleNameTranslation);
        __page1 = __page1.typeEnterRoleDescription(this.roleDescriptionTranslation);
        __page1 = __page1.clickSaveButton();
        __page1 = __page1.clickSearchJobRole(this.roleNameAfterEdit);
        __page1 = __page1.clickTranslationButton();
        __page1 = __page1.clickTranslationDropdown(this.translationLanguage);
        expect(__page1.roleName.first()).toHaveValue(this.roleNameTranslation);
        __page1.logger.info("Successfully verified data. Job role translation name contains text.");
        expect(__page1.enterRoleDescription.first()).toContainText(this.roleDescriptionTranslation, { timeout: 30000 });
        __page1.logger.info("Successfully verified data. Job role translation description contains text.");
        __page1 = __page1.clickSaveButton();
        __page1 = __page1.clickThreeDotsButton();
        __page1 = __page1.clickNextRoleGenerationalStatusButton();
        __page1 = __page1.clickSearchJobRole(this.roleNameAfterEdit);
        expect(__page1.nextRoleGenerationalStatusResults.first()).toContainText("In progress", { timeout: 30000 });
        __page1.logger.info("Successfully verified data. Next job roles generation status results contains role name.");
        __page1 = __page1.clickCloseButton();
    }

    public checkJobRoleFilledFieldsInCareerGrowth(): void {
                let __page2: any = this;
        __page2 = __page2.getOmpLoginPage();
        __page2 = __page2.run(new LoginScenario(this.user));
        __page2 = __page2.goToCareerGrowthPage();
        __page2 = __page2.goToRolesPageViaCard();
        __page2 = __page2.typeSearchValue(this.roleNameAfterEdit);
        __page2 = __page2.goToFirstRoleCard();
        expect(__page2.descriptionBlock).toContainText(this.roleDescription);
        __page2.logger.info("Successfully verified data Description is displayed");
        expect(__page2.descriptionBlock).toContainText(this.roleSummary);
        __page2.logger.info("Successfully verified data Role Summary is displayed");
        expect(__page2.descriptionBlock).toContainText(this.additionalDescription);
        __page2.logger.info("Successfully verified data Additional Description is displayed");
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
