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
import { assertTrue } from "common/testing/runtime";

export class OpportunitiesTabsInProfileTest extends BaseRestTest {

    private first: string = "1";
    private second: string = "2";
    private alphabeticalAZ: string = "Alphabetical: Z-A";
    private highlightedColor: string = "rgb(56, 182, 160)";
    private markAsAspitrationalRole: string = "Mark as aspirational Job Role";
    private markedAsAspitrationalRole: string = "Marked as aspirational Job Role";
    private removeAsAspitrationalRole: string = "Remove as aspirational Job Role";
    private applications: string = "Applications";
    private bookmarked: string = "Bookmarked";
    private dismissed: string = "Dismissed";
    private openJobVacanciesUrl: string = "/career/job-vacancies";
    private rolesUrl: string = "/career/job-roles";
    private noBookmarkedJobs: string = "You haven`t this.bookmarked any Open Jobs yet. Start by exploring open Open Jobs!";
    private noAspirationalRoles: string = "You haven`t marked any Job Roles as aspirational Job Role yet. Start by exploring available Job Roles!";
    private roleContainer: ResultContainer = new ResultContainer();
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser();

    }

    public shouldVerifyRolesProfileTab(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.run(new AddRoleAndFamilyToNewUserScenario(this.user.name));
        __page1 = __page1.goToCareerGrowthPage();
        __page1 = __page1.goToRolesPageViaCard();
        __page1 = __page1.sortListBy(this.alphabeticalAZ);
        __page1 = __page1.getFirstItemOnSuggestedJobVacanciesList(this.roleContainer);
        __page1 = __page1.performActionForRoleNumber(this.first, this.markAsAspitrationalRole);
        __page1 = __page1.goToProfileFromUserDropDown(this.user.name);
        __page1 = __page1.clickRolesTab();
        __page1 = __page1.refreshPageUntilRoleFound(this.roleContainer.getValue());
        expect(__page1.selectedTab(this.markedAsAspitrationalRole)).toBeVisible({ timeout: 30000 });
        expect(__page1.selectedTab(this.markedAsAspitrationalRole)).toHaveCSS("background-color", this.highlightedColor);
        __page1 = __page1.performActionForRole(this.removeAsAspitrationalRole);
        expect(__page1.noJobVacanciesToShowInfo(this.noAspirationalRoles)).toBeVisible({ timeout: 30000 });
    }

    public shouldVerifyJobVacanciesProfileTab(): void {
                let __page2: any = this;
        __page2 = __page2.getOmpLoginPage();
        __page2 = __page2.run(new LoginScenario(this.user));
        __page2 = __page2.goToCareerGrowthPage();
        __page2 = __page2.goToVacanciesPageViaCard();
        __page2 = __page2.sortListBy(this.alphabeticalAZ);
        __page2 = __page2.clickSpecifiedVacancyByOrder(this.first);
        __page2 = __page2.clickBookmarkButton();
        __page2 = __page2.clickBackButton();
        __page2 = __page2.clickSpecifiedVacancyByOrder(this.second);
        __page2 = __page2.clickDismissButton();
        __page2 = __page2.clickBackButton();
        __page2 = __page2.goToProfileFromUserDropDown(this.user.name);
        __page2 = __page2.clickOpenJobsTab();
        expect(__page2.selectedTab(this.applications)).toBeVisible({ timeout: 30000 });
        expect(__page2.selectedTab(this.applications)).toHaveCSS("background-color", this.highlightedColor);
        __page2 = __page2.selectLeftMenuTab(this.bookmarked);
        expect(__page2.selectedTab(this.bookmarked)).toBeVisible({ timeout: 30000 });
        expect(__page2.selectedTab(this.bookmarked)).toHaveCSS("background-color", this.highlightedColor);
        __page2 = __page2.clickUnbookmarkJobVacancy();
        expect(__page2.noJobVacanciesToShowInfo).toBeVisible({ timeout: 30000 });
        __page2 = __page2.selectLeftMenuTab(this.dismissed);
        expect(__page2.selectedTab(this.dismissed)).toBeVisible({ timeout: 30000 });
        expect(__page2.selectedTab(this.dismissed)).toHaveCSS("background-color", this.highlightedColor);
        __page2 = __page2.selectLeftMenuTab(this.bookmarked);
        __page2 = __page2.clickExploreOpenJobs();
        assertTrue(__page2.getPage().url().contains(this.openJobVacanciesUrl), "Expected url: '" + this.openJobVacanciesUrl + "' but was: '" + __page2.getPage().url() + "'");
    }

    public afterTests(): void {

      this.deleteUser(this.user);

    }
}
