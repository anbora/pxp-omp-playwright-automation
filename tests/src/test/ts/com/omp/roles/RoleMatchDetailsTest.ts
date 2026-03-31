// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { AllFiltersModalPage } from "pages/careergrowth/jobs/AllFiltersModalPage";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";
import { expect } from "common/testing/playwright";

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
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.run(new AddRoleAndFamilyToNewUserScenario(this.user.name));
        __page1 = __page1.goToCareerGrowthPage();
        __page1 = __page1.clickUpdateCareerProfileLink();
        __page1 = __page1.clickSkipForNowButton();
        __page1 = __page1.clickSkipForNowButton();
        __page1 = __page1.clickSkipForNowButton();
        __page1 = __page1.selectCareerPreferenceCheckbox(this.workplaceModel, this.remote);
        __page1 = __page1.clickSaveAndContinueButton();
        __page1 = __page1.clickSaveButton();
        __page1 = __page1.goToRolesPageViaCard();
        __page1 = __page1.openFiltersModal(AllFiltersModalPage);
        __page1 = __page1.searchForFilterValueWithWait(this.skills, this.java, 2000);
        __page1 = __page1.applyFiltersAndBackToRoleList();
        __page1 = __page1.goToFirstRoleCard();
        __page1 = __page1.showMatchDetails();
        expect(__page1.matchModalTabTitle(this.skills)).toBeVisible({ timeout: 30000 });
        expect(__page1.matchModalTabTitle(this.careerPreferences)).toBeVisible({ timeout: 30000 });
        expect(__page1.matchModalTabTitle(this.experience)).toBeVisible({ timeout: 30000 });
        expect(__page1.matchModalTabTitle(this.careerPath)).toBeVisible({ timeout: 30000 });
    }

    public afterTests(): void {

      this.deleteUser(this.user);

    }
}
