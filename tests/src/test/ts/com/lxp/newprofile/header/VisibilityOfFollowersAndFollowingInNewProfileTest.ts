// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { PortalsEnum } from "common/enums/portals/PortalsEnum";
import { TeamsResponsibleEnum } from "common/enums/TeamsResponsibleEnum";
import { UserModel } from "models/user/UserModel";
import { NewProfilePage } from "pages/newprofile/NewProfilePage";
import { SignOutPage } from "pages/other/SignOutPage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { expect } from "common/testing/playwright";

export class VisibilityOfFollowersAndFollowingInNewProfileTest extends BaseRestTest {

    private user: UserModel;
    private user2: UserModel;

    public initialize(): void {
      this.user = this.createUser(true);
      this.user2 = this.createUser(true);
    }

    public shouldDisplayFollowingCounterAndList(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.goDirectlyTo(NewProfilePage);
        expect(__page1.followersButton).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified, that Followers button is visible");
        __page1 = __page1.useKeywordSearch(this.getCypress2User().name);
        __page1 = __page1.visitPeopleTab();
        __page1 = __page1.clickFollowButton();
        expect(__page1.unfollowButton).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified, that Unfollow button is visible");
        __page1 = __page1.goDirectlyTo(NewProfilePage);
        expect(__page1.followingButton).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified, that Following button is visible");
        expect(__page1.followingButton).toHaveCount(1);
        __page1.logger.info("Successfully verified, that Following button is visible");
        __page1 = __page1.clickFollowingButton();
        expect(__page1.followingNameIcon(this.getCypress2User().name)).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified, that Following Name is visible");
    }

        public shouldDisplayFollowersCounterAndList(): void {
                let __page2: any = this;
        __page2 = __page2.getOmpLoginPage();
        __page2 = __page2.run(new LoginWithOnboardingScenario(this.user2));
        __page2 = __page2.useKeywordSearch(this.user.name);
        __page2 = __page2.visitPeopleTab();
        __page2 = __page2.clickFollowButton();
        expect(__page2.unfollowButton).toBeVisible({ timeout: 30000 });
        __page2.logger.info("Successfully verified, that Unfollow button is visible");
        __page2 = __page2.goDirectlyTo(NewProfilePage);
        expect(__page2.followingButton).toHaveCount(1);
        __page2.logger.info("Successfully verified, that Following button is visible");
        expect(__page2.followingButton).toHaveCount(1);
        __page2.logger.info("Successfully verified, that Following button is visible");
        __page2 = __page2.goDirectlyTo(SignOutPage);

                let __page3: any = this;
        __page3 = __page3.getOmpLoginPage();
        __page3 = __page3.run(new LoginScenario(this.user));
        __page3 = __page3.goDirectlyTo(NewProfilePage);
        __page3 = __page3.clickFollowersButton();
        expect(__page3.followerNameIcon(this.user2.name)).toBeVisible({ timeout: 30000 });
        __page3.logger.info("Successfully verified, that Follower Name is visible");
    }

    public afterClass(): void {
        this.deleteUser(this.user);
        this.deleteUser(this.user2);
    }
}
