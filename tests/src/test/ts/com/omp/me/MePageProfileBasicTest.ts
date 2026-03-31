// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { expect } from "common/testing/playwright";

export class MePageProfileBasicTest extends BaseRestTest {

    private user: UserModel;
    private skillName: string = "microsoft excel";

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public jobRoleConfigurationPage(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.goToMePageProfile();
        expect(__page1.viewDetailsButton).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified data. View details button is visible");
        expect(__page1.skillsAssessmentButton).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified data. Skills assessment button is visible");
        expect(__page1.viewPublicProfileIcon).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified data. View public profile icon is visible");
        expect(__page1.editButton).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified data. Edit profile button is visible");
        expect(__page1.pointsLabel).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified data. Points label is visible");
        __page1 = __page1.clickProfileTab();
        expect(__page1.interestsLabel).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified data. Interest label is visible");
        __page1 = __page1.clickAddLearningGoals();
        __page1 = __page1.typeEnterSkill(this.skillName);
        __page1 = __page1.clickSelectLevelDropdown();
        __page1 = __page1.clickAddSkillButton();
        __page1 = __page1.clickSaveButton();
        expect(__page1.addedSkillValue.first()).toContainText(this.skillName, { timeout: 30000 });
        __page1.logger.info("Successfully verified data. Added skill name found on the list.");
        expect(__page1.totalLearningHours).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified data. Total learning hours is visible");
        expect(__page1.inProgressLabel).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified data. In progress label is visible");
        expect(__page1.openLearningPlan).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified data. Open learning plan button is visible");
        expect(__page1.mySkillsAssessment).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified data. My skills assessment is visible");
        expect(__page1.openSkillsAssessment).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified data. Open skills assessment is visible");
        expect(__page1.myGroups).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified data. My groups label is visible");
        expect(__page1.viewAllGroupsButton).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified data. In progress label is visible");
        expect(__page1.myChannels).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified data. My channel is visible");
        expect(__page1.findChannels).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified data. Find channels button is visible");
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
