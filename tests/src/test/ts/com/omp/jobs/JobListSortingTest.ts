// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { ResultContainer } from "models/ResultContainer";
import { UserModel } from "models/user/UserModel";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";
import { expect } from "common/testing/playwright";

export class JobListSortingTest extends BaseRestTest {

    private jobContainer: ResultContainer = new ResultContainer();
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser();

    }

    public dataProviderForJobListSorting(): any[][] {
        return [
                        ["Excellent to Low Match", "Low to Excellent Match"],
                        ["Newest First", "Oldest First"],
                        ["Alphabetical: A-Z", "Alphabetical: Z-A"]
                ];
    }

    public prepareUserBeforeTests(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .run(new AddRoleAndFamilyToNewUserScenario(this.user.name))
                .goToCareerGrowthPage()
                .goToVacanciesPageViaCard()
                .waitForGoodOrExcellentMatchForSuggestedJobVacancy();
    }

    public shouldCheckJobsSorting(startSorting: string, endSorting: string): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginScenario(this.user));
        __page1 = __page1.goToCareerGrowthPage();
        __page1 = __page1.goToVacanciesPageViaCard();
        __page1 = __page1.sortListBy(startSorting);
        __page1 = __page1.getFirstItemOnAllVacanciesList(this.jobContainer);
        expect(__page1.firstItemOnAllVacanciesListLocator.first()).toContainText(this.jobContainer.getValue(), { timeout: 30000 });
        __page1 = __page1.sortListBy(endSorting);
        expect(__page1.firstItemOnAllVacanciesListLocator.first()).not.toContainText(this.jobContainer.getValue(), { timeout: 30000 });
        __page1 = __page1.sortListBy(startSorting);
        expect(__page1.firstItemOnAllVacanciesListLocator.first()).toContainText(this.jobContainer.getValue(), { timeout: 30000 });
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
