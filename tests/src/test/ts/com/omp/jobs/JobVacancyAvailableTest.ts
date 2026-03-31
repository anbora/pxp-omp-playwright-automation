// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { ResultContainer } from "models/ResultContainer";
import { UserModel } from "models/user/UserModel";
import { AddWorkHistoryToCareerProfileScenario } from "scenarios/jobs/AddWorkHistoryToCareerProfileScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddBasicCareerPreferencesForUser } from "scenarios/profile/AddBasicCareerPreferencesForUser";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";
import { expect } from "common/testing/playwright";

export class JobVacancyAvailableTest extends BaseRestTest {

    private unusuals: string = "Unusuals";
    private newest: string = "Newest First";
    private roleContainer: ResultContainer = new ResultContainer();
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser();

    }

    public shouldCheckOpenJobVacancyIconForRole(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.run(new AddRoleAndFamilyToNewUserScenario(this.user.name));
        __page1 = __page1.run(new AddBasicCareerPreferencesForUser());
        __page1 = __page1.goToCareerGrowthPage();
        __page1 = __page1.goToRolesPageViaCard();
        __page1 = __page1.typeSearchValue(this.unusuals);
        expect(__page1.similarJobVacancyForRoleIcon(this.unusuals)).toBeVisible({ timeout: 30000 });
        __page1 = __page1.goToFirstRoleCard();
        expect(__page1.jobsOnCarousel.first()).toBeVisible({ timeout: 30000 });
        __page1 = __page1.clickBackButton();
        __page1 = __page1.clearSearchKeywordCriteria();
        __page1 = __page1.sortListBy(this.newest);
        __page1 = __page1.getFirstCardOnAllList(this.roleContainer);
        expect(__page1.similarJobVacancyForRoleIcon(this.roleContainer.getValue())).toBeHidden();
        __page1 = __page1.goToFirstRoleCard();
        expect(__page1.noDataLabel.first()).toContainText("There are currently no similar Job Vacancies!", { timeout: 30000 });
    }

    public deleteUser(): void {

      this.deleteUser(this.user);

    }
}
