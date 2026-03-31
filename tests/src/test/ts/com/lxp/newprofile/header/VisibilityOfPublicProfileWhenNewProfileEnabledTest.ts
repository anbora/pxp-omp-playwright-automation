// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { PortalsEnum } from "common/enums/portals/PortalsEnum";
import { TeamsResponsibleEnum } from "common/enums/TeamsResponsibleEnum";
import { UserModel } from "models/user/UserModel";
import { NewProfilePage } from "pages/newprofile/NewProfilePage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { expect } from "common/testing/playwright";

export class VisibilityOfPublicProfileWhenNewProfileEnabledTest extends BaseRestTest {

    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public shouldDisplayPublicProfileOfSelfIfPrivateToYouEnabled(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.goDirectlyTo(NewProfilePage);
        expect(__page1.viewPublicProfileButton).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified, that View Public Profile button is visible");
        __page1 = __page1.clickPublicProfileButton();
        expect(__page1.username(this.user)).toBeVisible({ timeout: 30000 });
        expect(__page1.contactInfoButton).toBeHidden();
        __page1.logger.info("Successfully verified, that Contact Info button is not visible");
        expect(__page1.showMoreDetailButton).toBeHidden();
        __page1.logger.info("Successfully verified, that Show More Detail button is not visible");
        __page1 = __page1.clickExitPublicProfileButton();
        expect(__page1.contactInfoButton).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified, that Contact Info button is visible");
        expect(__page1.followersButton).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified, that Followers button is visible");
        expect(__page1.followingButton).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified, that Following button is visible");
        expect(__page1.showMoreDetailButton).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified, that Show More Detail button is visible");
        expect(__page1.addProfileSectionButton).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified, that Add Profile Section button is visible");
        expect(__page1.viewPublicProfileButton).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified, that View Public Profile button is visible");
        expect(__page1.showOrganizationButton).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified, that Show Organization button is visible");
        expect(__page1.pencilIcon).toBeVisible({ timeout: 30000 });
        __page1.logger.info("Successfully verified, that Pencil icon is visible");
    }

    public shouldDisplayPublicProfileOfSelfIfPrivateToYouDisabled(): void {
                let __page2: any = this;
        __page2 = __page2.getOmpLoginPage();
        __page2 = __page2.run(new LoginScenario(this.user));
        __page2 = __page2.goDirectlyTo(NewProfilePage);
        expect(__page2.viewPublicProfileButton).toBeVisible({ timeout: 30000 });
        __page2.logger.info("Successfully verified, that View Public Profile button is visible");
        __page2 = __page2.clickContactInfoButton();
        __page2 = __page2.clickPrivateToYouSwitch();
        __page2 = __page2.closeContactInfoModal();
        expect(__page2.privateToYouIconForContactInfoModal).toBeHidden();
        __page2.logger.info("Successfully verified, that Private To You switch for Contact Info is disabled");
        __page2 = __page2.clickShowMoreDetailButton();
        __page2 = __page2.clickPrivateToYouSwitch();
        __page2 = __page2.closeShowMoreDetailModal();
        __page2 = __page2.clickPublicProfileButton();
        expect(__page2.username(this.user)).toBeVisible({ timeout: 30000 });
        expect(__page2.contactInfoButton).toBeVisible({ timeout: 30000 });
        __page2.logger.info("Successfully verified, that Contact Info button is visible");
        expect(__page2.showMoreDetailButton).toBeVisible({ timeout: 30000 });
        __page2.logger.info("Successfully verified, that Show More Detail button is visible");

    }

    public afterTests(): void {

      this.deleteUser(this.user);

    }
}
