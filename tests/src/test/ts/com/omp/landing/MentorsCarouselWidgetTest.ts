// @ts-nocheck

import { BaseTest } from "common/BaseTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { LandingPage } from "pages/landing/LandingPage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { expect } from "common/testing/playwright";

export class MentorsCarouselWidgetTest extends BaseTest {

    public mentorsCarouselWidgetTest(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginScenario(this.getUserByName("Rajendran Sridhar")));
        expect(__page1.mentorsCarousel).toBeVisible({ timeout: 30000 });
        expect(__page1.mentorAvatar.first()).toBeVisible({ timeout: 30000 });
        expect(__page1.mentorName.first()).toBeVisible({ timeout: 30000 });
        __page1 = __page1.clickFirstMentorCardAvatar();
        expect(__page1.mentorProfileMentorTitleText).toBeVisible({ timeout: 30000 });
        if (!"".isEmpty()) {
                    expect(__page1.mentorProfileName("")).toBeVisible({ timeout: 30000 });
                }
        expect(__page1.mentorProfileAvatar).toBeVisible({ timeout: 30000 });
        expect(__page1.mentorAboutSectionHeader).toBeVisible({ timeout: 30000 });
        expect(__page1.mentorSkillsSectionHeader).toBeVisible({ timeout: 30000 });
        expect(__page1.mentorDetails).toBeVisible({ timeout: 30000 });
        __page1 = __page1.goDirectlyTo(LandingPage);
        __page1 = __page1.clickSeeAllButtonForMentorsCarouselWidget();
        expect(__page1.allMentorsHeader).toBeVisible({ timeout: 30000 });
        expect(__page1.filtersButton()).toBeVisible({ timeout: 30000 });
        expect(__page1.searchInput()).toBeVisible({ timeout: 30000 });
        expect(__page1.searchButtonElement()).toBeVisible({ timeout: 30000 });
        expect(__page1.sortByDropDown()).toBeVisible({ timeout: 30000 });
    }
}
