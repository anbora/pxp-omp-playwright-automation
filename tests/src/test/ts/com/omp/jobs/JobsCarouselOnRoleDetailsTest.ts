// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { ResultContainer } from "models/ResultContainer";
import { UserModel } from "models/user/UserModel";
import { RoleDetailsPage } from "pages/careergrowth/roles/RoleDetailsPage";
import { AddWorkHistoryToCareerProfileScenario } from "scenarios/jobs/AddWorkHistoryToCareerProfileScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";
import { AddSkillToCareerProfileScenario } from "scenarios/profile/AddSkillToCareerProfileScenario";
import { expect } from "common/testing/playwright";

export class JobsCarouselOnRoleDetailsTest extends BaseRestTest {

    private titleResultContainer: ResultContainer = new ResultContainer();
    private user: UserModel;
    private lumesse: string = "lumesse";
    private october: string = "Oct";
    private year_2017: string = "2017";
    private june: string = "Jun";
    private year_2022: string = "2022";
    private unusuals: string = "Unusuals";
    private fishCounter: string = "Fish Counter";
    private bikeFisher: string = "Bike Fisher";
    private paranormalTourGuide: string = "Paranormal Tour Guide";
    private fifteen: string = "15";
    private fifteenNo: number = 15;
    private internship: string = "Internship";
    private goodMatch: string = "Good match";
    private fairMatch: string = "Fair match";
    private lowMatch: string = "Low match";
    private goodMatchColor: string = "rgb(145, 200, 62)";
    private fairMatchColor: string = "rgb(251, 171, 25)";
    private lowMatchColor: string = "rgb(187, 187, 187)";
    private goodMatchIcon: string = "data:image/svg+xml;utf8,%3Csvg%20width%3D%2225%22%20height%3D%2224%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20clip-path%3D%22url(%23a)%22%3E%3Cpath%20d%3D%22M12.5%2024c6.627%200%2012-5.373%2012-12s-5.373-12-12-12S.5%205.373.5%2012s5.373%2012%2012%2012Z%22%20fill%3D%22%2391C83E%22%2F%3E%3Cpath%20d%3D%22M12.5%201c6.1%200%2011%204.9%2011%2011s-4.9%2011-11%2011-11-5-11-11%205-11%2011-11Zm0-1C5.9%200%20.5%205.3.5%2012s5.4%2012%2012%2012%2012-5.4%2012-12-5.4-12-12-12Z%22%20fill%3D%22%236AAE44%22%2F%3E%3Cpath%20d%3D%22M7.3%2010.4a1.5%201.5%200%201%200%200-3%201.5%201.5%200%200%200%200%203ZM17.7%2010.4a1.5%201.5%200%201%200%200-3%201.5%201.5%200%200%200%200%203ZM12.5%2018.2c-4.3%200-5.8-3.2-5.9-3.4-.2-.5%200-1.1.5-1.3.5-.2%201.1%200%201.3.5%200%20.1%201.1%202.2%204.1%202.2%202.8%200%204.1-2.3%204.2-2.3.3-.5.9-.6%201.4-.4.5.3.6.9.4%201.4-.2.2-2.1%203.3-6%203.3Z%22%20fill%3D%22%23000%22%2F%3E%3C%2Fg%3E%3Cdefs%3E%3CclipPath%20id%3D%22a%22%3E%3Cpath%20fill%3D%22%23fff%22%20transform%3D%22translate(.5)%22%20d%3D%22M0%200h24v24H0z%22%2F%3E%3C%2FclipPath%3E%3C%2Fdefs%3E%3C%2Fsvg%3E";
    private fairMatchIcon: string = "data:image/svg+xml;utf8,%3Csvg%20width%3D%2225%22%20height%3D%2224%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20clip-path%3D%22url(%23a)%22%3E%3Cpath%20d%3D%22M12.5%2024c6.627%200%2012-5.373%2012-12s-5.373-12-12-12S.5%205.373.5%2012s5.373%2012%2012%2012Z%22%20fill%3D%22%23FBAB19%22%2F%3E%3Cpath%20d%3D%22M12.5%201c6.1%200%2011%204.9%2011%2011s-4.9%2011-11%2011-11-5-11-11%205-11%2011-11Zm0-1C5.9%200%20.5%205.3.5%2012s5.4%2012%2012%2012%2012-5.4%2012-12-5.4-12-12-12Z%22%20fill%3D%22%23C58D2C%22%2F%3E%3Cpath%20d%3D%22M7.3%2010.4a1.5%201.5%200%201%200%200-3%201.5%201.5%200%200%200%200%203ZM17.7%2010.4a1.5%201.5%200%201%200%200-3%201.5%201.5%200%200%200%200%203ZM12.5%2017.2c-3.2%200-4.4-.8-4.6-1-.4-.3-.5-1-.2-1.4.3-.4%201-.5%201.4-.2%200%200%20.9.6%203.4.6%202.3%200%203.5-.6%203.5-.6.5-.3%201.1-.1%201.4.4.3.5.1%201.1-.3%201.4-.2%200-1.7.8-4.6.8Z%22%20fill%3D%22%23000%22%2F%3E%3C%2Fg%3E%3Cdefs%3E%3CclipPath%20id%3D%22a%22%3E%3Cpath%20fill%3D%22%23fff%22%20transform%3D%22translate(.5)%22%20d%3D%22M0%200h24v24H0z%22%2F%3E%3C%2FclipPath%3E%3C%2Fdefs%3E%3C%2Fsvg%3E";
    private lowMatchIcon: string = "data:image/svg+xml;utf8,%3Csvg%20width%3D%2225%22%20height%3D%2224%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20clip-path%3D%22url(%23a)%22%3E%3Cpath%20d%3D%22M12.5%2024c6.627%200%2012-5.373%2012-12s-5.373-12-12-12S.5%205.373.5%2012s5.373%2012%2012%2012Z%22%20fill%3D%22%23BBB%22%2F%3E%3Cpath%20d%3D%22M12.5%201c6.1%200%2011%204.9%2011%2011s-4.9%2011-11%2011-11-5-11-11%205-11%2011-11Zm0-1C5.9%200%20.5%205.3.5%2012s5.4%2012%2012%2012%2012-5.4%2012-12-5.4-12-12-12Z%22%20fill%3D%22%23555%22%2F%3E%3Cpath%20d%3D%22M7.3%2010.4a1.5%201.5%200%201%200%200-3%201.5%201.5%200%200%200%200%203ZM17.7%2010.4a1.5%201.5%200%201%200%200-3%201.5%201.5%200%200%200%200%203Z%22%20fill%3D%22%23000%22%2F%3E%3Cpath%20d%3D%22M9.5%2016h6%22%20stroke%3D%22%23000%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fg%3E%3Cdefs%3E%3CclipPath%20id%3D%22a%22%3E%3Cpath%20fill%3D%22%23fff%22%20transform%3D%22translate(.5)%22%20d%3D%22M0%200h24v24H0z%22%2F%3E%3C%2FclipPath%3E%3C%2Fdefs%3E%3C%2Fsvg%3E";
    private fishery: string = "fishery";
    private beginner: string = "Beginner";
    private londonOffice: string = "London office";

    public initialize(): void {

    this.user = this.createUser();

    }

    public shouldCheckJobCarouselNavigationOnRoleDetailsPage(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.run(new AddRoleAndFamilyToNewUserScenario(this.user.name));
        __page1 = __page1.goToCareerGrowthPage();
        __page1 = __page1.clickUpdateCareerProfileLink();
        __page1 = __page1.run(new AddWorkHistoryToCareerProfileScenario(this.fishCounter, this.lumesse, this.fishery, this.october, this.year_2017, this.june, this.year_2022));
        __page1 = __page1.clickSaveAndContinueButton();
        __page1 = __page1.run(new AddSkillToCareerProfileScenario(this.fishery, this.beginner));
        __page1 = __page1.clickSaveAndContinueButton();
        __page1 = __page1.clickXButton();
        __page1 = __page1.goToVacanciesPageViaCard();
        __page1 = __page1.waitForGoodOrExcellentMatchForSuggestedJobVacancy();
        __page1 = __page1.goToRolesPageViaTab();
        __page1 = __page1.typeSearchValue(this.unusuals);
        __page1 = __page1.goToFirstRoleCard();
        __page1 = __page1.waitForGoodOrExcellentMatchForLinkedJobVacancy();
        __page1 = __page1.refreshCurrentPage(RoleDetailsPage);
        expect(__page1.carouselCounter).toContainText(this.fifteen, { timeout: 30000 });
        expect(__page1.jobsOnCarousel).toHaveCount(this.fifteenNo);
        expect(__page1.carouselJobTitle(this.fishCounter)).toBeVisible({ timeout: 30000 });
        expect(__page1.carouselJobTypeLabel(this.fishCounter)).toContainText(this.internship, { timeout: 30000 });
        expect(__page1.carouselJobLocationLabel(this.fishCounter)).toContainText(this.londonOffice, { timeout: 30000 });
        expect(__page1.carouselJobMatchLabel(this.fishCounter)).toContainText(this.goodMatch, { timeout: 30000 });
        expect(__page1.smileIconForJobVacancy(this.fishCounter)).toHaveAttribute("src", this.goodMatchIcon);
        expect(__page1.carouselSkillLabel(this.fishCounter)).toContainText(this.fishery, { timeout: 30000 });
        ;
        expect(__page1.carouselJobMatchLabel(this.bikeFisher)).toContainText(this.fairMatch, { timeout: 30000 });
        expect(__page1.smileIconForJobVacancy(this.bikeFisher)).toHaveAttribute("src", this.fairMatchIcon);
        expect(__page1.carouselJobMatchLabel(this.paranormalTourGuide)).toContainText(this.lowMatch, { timeout: 30000 });
        expect(__page1.smileIconForJobVacancy(this.paranormalTourGuide)).toHaveAttribute("src", this.lowMatchIcon);
        expect(__page1.leftCarouselControlButton).toBeHidden();
        expect(__page1.rightCarouselControlButton).toBeVisible({ timeout: 30000 });
        __page1 = __page1.clickRightControlButton();
        expect(__page1.leftCarouselControlButton).toBeEnabled();
        expect(__page1.rightCarouselControlButton).toBeVisible({ timeout: 30000 });
        __page1 = __page1.clickRightControlButton();
        __page1 = __page1.clickRightControlButton();
        expect(__page1.leftCarouselControlButton).toBeEnabled();
        expect(__page1.rightCarouselControlButton).toBeHidden();
        __page1 = __page1.clickLeftControlButton();
        __page1 = __page1.clickLeftControlButton();
        __page1 = __page1.clickLeftControlButton();
        expect(__page1.leftCarouselControlButton).toBeHidden();
        expect(__page1.rightCarouselControlButton).toBeVisible({ timeout: 30000 });
        __page1 = __page1.getFirstJobVacancyOnCarousel(this.titleResultContainer);
        __page1 = __page1.goToFirstJobVacancyOnCarousel();
        expect(__page1.jobTitle).toContainText(this.titleResultContainer.getValue(), { timeout: 30000 });
        __page1 = __page1.clickBackButtonToRolePage();
        expect(__page1.roleNameLabel).toContainText(this.unusuals, { timeout: 30000 });
    }
}
