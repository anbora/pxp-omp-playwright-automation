// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";
import { assertTrue } from "common/testing/runtime";

export class JobsAndRolesListPaginationTest extends BaseRestTest {

    private vacanciesUrlPage1: string = "/career/job-vacancies/all?page=1";
    private vacanciesUrlPage2: string = "/career/job-vacancies/all?page=2";
    private vacanciesUrlPage6: string = "/career/job-vacancies/all?page=6";
    private rolesUrlPage1: string = "/career/job-roles/all?page=1";
    private rolesUrlPage2: string = "/career/job-roles/all?page=2";
    private previous: string = "«";
    private dots: string = "...";
    private one: string = "1";
    private two: string = "2";
    private six: string = "6";
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public shouldCheckJobsListPagination(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.run(new AddRoleAndFamilyToNewUserScenario(this.user.name));
        __page1 = __page1.goToCareerGrowthPage();
        __page1 = __page1.goToVacanciesPageViaCard();
        __page1 = __page1.clickRightArrowButton();
        assertTrue(__page1.getPage().url().contains(this.vacanciesUrlPage2), "Expected url: '" + this.vacanciesUrlPage2 + "' but was: '" + __page1.getPage().url() + "'");
        __page1 = __page1.clickLeftArrowButton();
        assertTrue(__page1.getPage().url().contains(this.vacanciesUrlPage1), "Expected url: '" + this.vacanciesUrlPage1 + "' but was: '" + __page1.getPage().url() + "'");
        __page1 = __page1.clickPageNumber(this.dots);
        assertTrue(__page1.getPage().url().contains(this.vacanciesUrlPage6), "Expected url: '" + this.vacanciesUrlPage6 + "' but was: '" + __page1.getPage().url() + "'");
    }

    public shouldCheckRolesListPagination(): void {
                let __page2: any = this;
        __page2 = __page2.getOmpLoginPage();
        __page2 = __page2.run(new LoginScenario(this.user));
        __page2 = __page2.goToCareerGrowthPage();
        __page2 = __page2.goToRolesPageViaCard();
        __page2 = __page2.clickRightArrowButton();
        assertTrue(__page2.getPage().url().contains(this.rolesUrlPage2), "Expected url: '" + this.rolesUrlPage2 + "' but was: '" + __page2.getPage().url() + "'");
        __page2 = __page2.clickLeftArrowButton();
        assertTrue(__page2.getPage().url().contains(this.rolesUrlPage1), "Expected url: '" + this.rolesUrlPage1 + "' but was: '" + __page2.getPage().url() + "'");
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
