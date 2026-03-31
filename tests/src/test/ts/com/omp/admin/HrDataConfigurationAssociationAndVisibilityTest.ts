// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { expect } from "common/testing/playwright";

export class HrDataConfigurationAssociationAndVisibilityTest extends BaseRestTest {

    private hrData: string = "HR Data";
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public configurationAssociation(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.goToAdminPanel();
        __page1 = __page1.selectMainTab(this.hrData);
        __page1 = __page1.openMenuForHrConfiguration();
        __page1 = __page1.clickOrganizationConfiguration();
        expect(__page1.association("Association")).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Association label is visible");
        expect(__page1.specifyAssociation).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Specify association of organization unit type with label is visible");
        __page1 = __page1.clickAssociationType();
        expect(__page1.associationTypes("Job Vacancy")).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Association label is visible");
        expect(__page1.associationTypes("Job Role")).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Association label is visible");
        expect(__page1.associationTypes("Project")).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Association label is visible");
        expect(__page1.associationTypes("Career preference")).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Association label is visible");
        expect(__page1.associationTypes("User")).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Association label is visible");
    }

    public configurationVisibility(): void {
                let __page2: any = this;
        __page2 = __page2.getOmpLoginPage();
        __page2 = __page2.run(new LoginScenario(this.user));
        __page2 = __page2.goToAdminPanel();
        __page2 = __page2.selectMainTab(this.hrData);
        __page2 = __page2.openMenuForHrConfiguration();
        __page2 = __page2.clickOrganizationConfiguration();
        expect(__page2.visibility).toBeVisible({ timeout: 30000 });
        __page2.logger.info("Visibility label is visible");
        expect(__page2.specifyVisibility).toBeVisible({ timeout: 30000 });
        __page2.logger.info("Specify visibility of organization unit type on label is visible");
        __page2 = __page2.clickVisibilityType();
        expect(__page2.visibilityTypesLoop("Job vacancy filter","Job Vacancy filter")).toBeVisible({ timeout: 30000 });
        __page2.logger.info("Visibility label is visible");
        expect(__page2.visibilityTypesLoop("Job vacancy details","Job Vacancy details")).toBeVisible({ timeout: 30000 });
        __page2.logger.info("Visibility label is visible");
        expect(__page2.visibilityTypesLoop("Job role filter","Job Role details")).toBeVisible({ timeout: 30000 });
        __page2.logger.info("Visibility label is visible");
        expect(__page2.visibilityTypes("Project filter")).toBeVisible({ timeout: 30000 });
        __page2.logger.info("Visibility label is visible");
        expect(__page2.visibilityTypes("Project details")).toBeVisible({ timeout: 30000 });
        __page2.logger.info("Visibility label is visible");
        expect(__page2.visibilityTypes("Mentor profile")).toBeVisible({ timeout: 30000 });
        __page2.logger.info("Visibility label is visible");
        expect(__page2.visibilityTypes("Mentorship filter")).toBeVisible({ timeout: 30000 });
        __page2.logger.info("Visibility label is visible");
        expect(__page2.visibilityTypes("Profile details")).toBeVisible({ timeout: 30000 });
        __page2.logger.info("Visibility label is visible");
        expect(__page2.visibilityTypes("User management")).toBeVisible({ timeout: 30000 });
        __page2.logger.info("Visibility label is visible");
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
