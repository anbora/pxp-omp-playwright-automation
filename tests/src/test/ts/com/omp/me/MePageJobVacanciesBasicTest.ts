// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddSkillToCareerProfileScenario } from "scenarios/profile/AddSkillToCareerProfileScenario";
import { Locator, WaitForSelectorState } from "common/testing/playwright";
import { Assert, assertTrue } from "common/testing/runtime";

export class MePageJobVacanciesBasicTest extends BaseRestTest {

    private static readonly GARDENER: string = "Gardener";
    public static readonly HORTICULTURE: string = "horticulture";
    public static readonly GARDENING: string = "gardening";
    public static readonly SHRUB: string = "shrub";
    public static readonly ADVANCED: string = "Advanced";
    public static readonly INTERMEDIATE: string = "Intermediate";
    public static readonly BEGINNER: string = "Beginner";
    public static readonly MULCH: string = "mulch";
    public static readonly EXPERT: string = "Expert";
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser();

    }

    public MeJobVacanciesBasicTest(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.goToCareerGrowthPage();
        __page1 = __page1.editProfile();
        __page1 = __page1.clickEditProfileButton();
        __page1 = __page1.clickAddJobFamilyAndRoleButton();
        __page1 = __page1.selectFirstJobRoleFromInput(MePageJobVacanciesBasicTest.GARDENER, MePageJobVacanciesBasicTest.GARDENER);
        __page1 = __page1.clickSelectButton();
        __page1 = __page1.clickSaveButton();
        __page1 = __page1.goToCareerGrowthPage();
        __page1 = __page1.refreshPage();
        __page1 = __page1.clickUpdateCareerProfileLink();
        __page1 = __page1.clickSkipForNowButton();
        __page1 = __page1.run(new AddSkillToCareerProfileScenario(MePageJobVacanciesBasicTest.SHRUB, MePageJobVacanciesBasicTest.BEGINNER));
        __page1 = __page1.run(new AddSkillToCareerProfileScenario(MePageJobVacanciesBasicTest.GARDENING, MePageJobVacanciesBasicTest.INTERMEDIATE));
        __page1 = __page1.run(new AddSkillToCareerProfileScenario(MePageJobVacanciesBasicTest.HORTICULTURE, MePageJobVacanciesBasicTest.ADVANCED));
        __page1 = __page1.run(new AddSkillToCareerProfileScenario(MePageJobVacanciesBasicTest.MULCH, MePageJobVacanciesBasicTest.EXPERT));
        __page1 = __page1.clickSaveAndContinueButton();
        __page1 = __page1.clickXButton();
        __page1 = __page1.goToMePageProfile();
        __page1 = __page1.clickOpenJobsTab();
        __page1 = __page1.clickExploreOpenJobs();
        __page1 = __page1.firstSuggestedJobVacancyDismiss();
        __page1 = __page1.firstSuggestedJobVacancyBookmark();
        __page1 = __page1.goToMePageProfile();
        __page1 = __page1.clickOpenJobsTab();
        __page1 = __page1.selectLeftMenuTab("Bookmarked");
        __page1.jobCards.first().waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        Assert.assertTrue(__page1.jobCards.isVisible());
        __page1 = __page1.selectLeftMenuTab("Dismissed");
        __page1.jobCards.first().waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        Assert.assertTrue(__page1.jobCards.isVisible());
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
