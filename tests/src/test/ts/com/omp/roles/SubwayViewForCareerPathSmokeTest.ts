// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { expect } from "common/testing/playwright";

export class SubwayViewForCareerPathSmokeTest extends BaseRestTest {

    private startingRole: string = "Current role for Smoke Test";
    private endRole: string = "End role for Smoke Test";
    private startingRoleFullName: string = "First Job Family -  Current role for Smoke Test";
    private roleDetailsHeader: string = "Career paths";
    private moreThan4MovesToReachTheRole: string = "More than 4 moves";
    private yourCurrentJobRole: string = "Your current Job Role";
    private lowMatching: string = "Low to Excellent Match";
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser();

    }

    public shouldCheckCareerPathSectionForDifferentRoles(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.goToMePageProfile();
        __page1 = __page1.editProfile();
        __page1 = __page1.goToEditProfileFromUserDropDown(this.user.name);
        __page1 = __page1.clickEditProfileButton();
        __page1 = __page1.clickAddJobFamilyAndRoleButton();
        __page1 = __page1.selectFirstJobRoleFromInput(this.startingRole, this.startingRoleFullName);
        __page1 = __page1.clickSelectButton();
        __page1 = __page1.clickSaveButton();
        __page1 = __page1.goToCareerGrowthPage();
        __page1 = __page1.goToRolesPageViaCard();
        __page1 = __page1.typeSearchValue(this.startingRole);
        __page1 = __page1.goToFirstRoleCard();
        expect(__page1.careerPathIcon).toBeHidden();
        __page1.logger.info("Successfully verified that path icon doesn't exist.");
        expect(__page1.careerPathHeader).toBeHidden();
        __page1.logger.info("Successfully verified that path header doesn't exist.");
        __page1 = __page1.clickBackButton();
        __page1 = __page1.clearSearchKeywordCriteria();
        __page1 = __page1.sortListBy(this.lowMatching);
        __page1 = __page1.goToFirstRoleCard();
//                    .assertThatCareerPathHeaderIsEqualTo(roleDetailsHeader)
//                    .assertThatCustomPillContainsText(moreThan4MovesToReachTheRole);
    }

    public shouldCheckSimpleCareerPath(): void {
                let __page2: any = this;
        __page2 = __page2.getOmpLoginPage();
        __page2 = __page2.run(new LoginScenario(this.user));
        __page2 = __page2.goToCareerGrowthPage();
        __page2 = __page2.goToRolesPageViaCard();
        __page2 = __page2.typeSearchValue(this.endRole);
        __page2 = __page2.goToFirstRoleCard();
        expect(__page2.userRoleName).toContainText(this.startingRole, { timeout: 30000 });
        __page2.logger.info("Successfully verified that user role name contains '" + this.startingRole + "' text.");
        expect(__page2.goalRoleName).toContainText(this.endRole, { timeout: 30000 });
        __page2.logger.info("Successfully verified that goal this.endRole name contains '" + this.endRole + "' text.");
    }

    public afterTests(): void {

      this.deleteUser(this.user);

    }
}
