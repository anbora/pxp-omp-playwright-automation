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

export class VisibilityOfProfileHeaderInNewProfileTest extends BaseRestTest {

    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public shouldDisplayProfileHeaderInformation(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.goDirectlyTo(NewProfilePage);
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
        __page1 = __page1.clickShowOrganizationButton();
        expect(__page1.organizationTree).toContainText(this.user.fullName);
        __page1.logger.info("Successfully verified, that User Name is displayed");
    }

    public shouldDisablePrivateToYouSwitchForContactInfoModal(): void {
                let __page2: any = this;
        __page2 = __page2.getOmpLoginPage();
        __page2 = __page2.run(new LoginScenario(this.user));
        __page2 = __page2.goDirectlyTo(NewProfilePage);
        __page2 = __page2.clickContactInfoButton();
        __page2 = __page2.clickPrivateToYouSwitch();
        __page2 = __page2.closeContactInfoModal();
        expect(__page2.privateToYouIconForContactInfoModal).toBeHidden();
        __page2.logger.info("Successfully verified, that Private To You switch for Contact Info is disabled");
    }

    public shouldEnablePrivateToYouSwitchForContactInfoModal(): void {
                let __page3: any = this;
        __page3 = __page3.getOmpLoginPage();
        __page3 = __page3.run(new LoginScenario(this.user));
        __page3 = __page3.goDirectlyTo(NewProfilePage);
        __page3 = __page3.clickContactInfoButton();
        __page3 = __page3.clickPrivateToYouSwitch();
        __page3 = __page3.closeContactInfoModal();
        expect(__page3.privateToYouIconForContactInfoModal).toBeVisible({ timeout: 30000 });
        __page3.logger.info("Successfully verified, that Private To You switch for Contact Info is enabled");
    }

    public shouldDisablePrivateToYouSwitchForSeeMoreDetailModal(): void {
                let __page4: any = this;
        __page4 = __page4.getOmpLoginPage();
        __page4 = __page4.run(new LoginScenario(this.user));
        __page4 = __page4.goDirectlyTo(NewProfilePage);
        __page4 = __page4.clickShowMoreDetailButton();
        __page4 = __page4.clickPrivateToYouSwitch();
        __page4 = __page4.closeShowMoreDetailModal();
        expect(__page4.privateToYouIconForShowMoreDetailModal).toBeHidden();
        __page4.logger.info("Successfully verified, that Private To You switch for Show More Detail is disabled");
    }

    public shouldEnablePrivateToYouSwitchForSeeMoreDetailModal(): void {
                let __page5: any = this;
        __page5 = __page5.getOmpLoginPage();
        __page5 = __page5.run(new LoginScenario(this.user));
        __page5 = __page5.goDirectlyTo(NewProfilePage);
        __page5 = __page5.clickShowMoreDetailButton();
        __page5 = __page5.clickPrivateToYouSwitch();
        __page5 = __page5.closeShowMoreDetailModal();
        expect(__page5.privateToYouIconForShowMoreDetailModal).toBeVisible({ timeout: 30000 });
        __page5.logger.info("Successfully verified, that Private To You switch for Show More Detail is enabled");
    }

    public afterTests(): void {

      this.deleteUser(this.user);

    }
}
