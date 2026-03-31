// @ts-nocheck

import { BaseTest } from "common/BaseTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { expect } from "common/testing/playwright";

export class MentorStatusFiltersFromMePageTest extends BaseTest {

    public verifyMentorStausFiltersFromMePageTest(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginScenario(this.getUserByName("Rajendran Sridhar")));
        __page1 = __page1.goToCareerGrowthPage();
        __page1 = __page1.goToMentorshipPageViaCard();
        expect(__page1.allMentorsHeader).toBeVisible({ timeout: 30000 });
        expect(__page1.filtersButton()).toBeVisible({ timeout: 30000 });
        expect(__page1.searchInput()).toBeVisible({ timeout: 30000 });
        expect(__page1.searchButtonElement()).toBeVisible({ timeout: 30000 });
        expect(__page1.sortByDropDown()).toBeVisible({ timeout: 30000 });
        expect(__page1.viewMyMentorProfileButton).toBeVisible({ timeout: 30000 });
        expect(__page1.myMentorshipsButton).toBeVisible({ timeout: 30000 });
        __page1 = __page1.goToMePageProfile();
        __page1 = __page1.goToMentorshipsTab();
        __page1 = __page1.clickMyMentorsTab();
        __page1 = __page1.selectAFilterOption("mentor-options-INPROGRESS");
        expect(__page1.mentorName("Deepa Kanathe")).toBeVisible({ timeout: 30000 });
        __page1 = __page1.selectAFilterOption("mentor-options-REJECTED");
        expect(__page1.mentorName("Bobby Benjamin")).toBeVisible({ timeout: 30000 });
        __page1 = __page1.selectAFilterOption("mentor-options-COMPLETED");
        expect(__page1.mentorName("Linda Hamilton")).toBeVisible({ timeout: 30000 });
        __page1 = __page1.selectAFilterOption("mentor-options-APPLIED");
        expect(__page1.mentorName("Steven Smith")).toBeVisible({ timeout: 30000 });

    }
}
