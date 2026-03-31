// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { TeamsResponsibleEnum } from "common/enums/TeamsResponsibleEnum";
import { UserModel } from "models/user/UserModel";
import { SignOutPage } from "pages/other/SignOutPage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { expect } from "common/testing/playwright";
import { assertTrue } from "common/testing/runtime";

export class ChangeBannerImageForAllUsersFromAdminPanelTest extends BaseRestTest {

    private static readonly UNIQUE_SUFFIX: string = UUID.randomUUID().toString();
    private static readonly DEFAULT_BANNER: string = "default_banner_user_image.png";
    private static readonly CUSTOM_USER_BANNER: string = "cornerstone-user-banner.png";
    private static readonly ADMIN_BANNER: string = "cornerstone-banner.png";
    private static readonly BRANDING: string = "Branding";
    private static readonly DEFAULT_ALT_TEXT: string = "User profile banner image";
    private static readonly CUSTOM_ALT_TEXT: string = "Custom alt text " + ChangeBannerImageForAllUsersFromAdminPanelTest.UNIQUE_SUFFIX;
    private filePath: string = "src/main/resources/fixtures/user/cornerstone-user-banner.png";
    private filePath2: string = "src/main/resources/fixtures/user/cornerstone-banner.png";
    private adminUser: UserModel;
    private regularUser: UserModel;

    public initialize(): void {
      this.adminUser = this.createUser(true);
      this.regularUser = this.createUser(false);
    }

    public removeBanner(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.adminUser))
                .goToAdminPanel()
                .selectMainTab(ChangeBannerImageForAllUsersFromAdminPanelTest.BRANDING)
                .openGeneralBrandingPage()
                .clickRemoveBannerButton()
                .clickSaveChangesButton()
                .goDirectlyTo(SignOutPage);
    }

    public verifyIfUserCanUploadCustomBannerImage(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.regularUser));
        __page1 = __page1.goToCareerGrowthPage();
        __page1 = __page1.editProfile();
        expect(__page1.bannerImageLink(ChangeBannerImageForAllUsersFromAdminPanelTest.DEFAULT_BANNER)).toBeVisible();
        __page1.logger.info("Successfully verified that banner is visible");
        __page1 = __page1.clickEditProfileButton();
        __page1 = __page1.clickEditBannerImageButton();
        __page1 = __page1.uploadBannerImage(this.filePath);
        __page1 = __page1.clickSaveButton();
        expect(__page1.bannerImageLink(ChangeBannerImageForAllUsersFromAdminPanelTest.DEFAULT_BANNER)).not.toBeVisible();
        __page1.logger.info("Successfully verified that default banner is not visible");
        __page1 = __page1.clickBackButton();
        __page1 = __page1.goToMePageProfile();
        expect(__page1.bannerImageLink(ChangeBannerImageForAllUsersFromAdminPanelTest.CUSTOM_USER_BANNER)).toBeVisible();
        __page1.logger.info("Successfully verified that default banner is visible");
    }

    public verifyIfAdminUserCanUploadBannerImage(): void {
                let __page2: any = this;
        __page2 = __page2.getOmpLoginPage();
        __page2 = __page2.run(new LoginScenario(this.adminUser));
        __page2 = __page2.goToAdminPanel();
        __page2 = __page2.selectMainTab(ChangeBannerImageForAllUsersFromAdminPanelTest.BRANDING);
        __page2 = __page2.openGeneralBrandingPage();
        __page2 = __page2.clickUploadFileButton();
        __page2 = __page2.uploadBannerImage(this.filePath2);
        __page2 = __page2.clickSaveChangesButton();
        expect(__page2.deleteButtonForUploadedFile.first()).toContainText(ChangeBannerImageForAllUsersFromAdminPanelTest.ADMIN_BANNER);
        __page2 = __page2.goDirectlyTo(SignOutPage);

                let __page3: any = this;
        __page3 = __page3.getOmpLoginPage();
        __page3 = __page3.run(new LoginScenario(this.adminUser));
        __page3 = __page3.goToMePageProfile();
        expect(__page3.bannerImageLink(ChangeBannerImageForAllUsersFromAdminPanelTest.ADMIN_BANNER)).toBeVisible();
        __page3.logger.info("Successfully verified that default banner is visible");
        assertTrue(__page3.bannerImageLink(ChangeBannerImageForAllUsersFromAdminPanelTest.ADMIN_BANNER).getAttribute("alt").contains(ChangeBannerImageForAllUsersFromAdminPanelTest.DEFAULT_ALT_TEXT));
        __page3.logger.info("Successfully verified that alt text is as expected");
    }

    public verifyThatCustomUserBannerIsNotOverriddenByAdminSettings(): void {
                let __page4: any = this;
        __page4 = __page4.getOmpLoginPage();
        __page4 = __page4.run(new LoginScenario(this.regularUser));
        __page4 = __page4.goToMePageProfile();
        expect(__page4.bannerImageLink(ChangeBannerImageForAllUsersFromAdminPanelTest.CUSTOM_USER_BANNER)).toBeVisible();
        __page4.logger.info("Successfully verified that default banner is visible");
        __page4 = __page4.clickEditPublicProfileButton();
        __page4 = __page4.clickEditProfileButton();
        expect(__page4.bannerImageLink(ChangeBannerImageForAllUsersFromAdminPanelTest.CUSTOM_USER_BANNER)).toBeVisible();
        __page4.logger.info("Successfully verified that banner is visible");
        expect(__page4.editBannerImageButton).toBeVisible();
        __page4.logger.info("Successfully verified that change banner image button is displayed");
        expect(__page4.removeBannerButton).toBeVisible();
        __page4.logger.info("Successfully verified that remove banner button is displayed");
    }

    public verifyThatAdminCanDisableAbilityToChangeBannerByUser(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.adminUser))
                .goToAdminPanel()
                .selectMainTab(ChangeBannerImageForAllUsersFromAdminPanelTest.BRANDING)
                .openGeneralBrandingPage()
                .switchAllowUsersToModifyBannerToggle()
                .clickSaveChangesButton()
                .goDirectlyTo(SignOutPage);

                let __page5: any = this;
        __page5 = __page5.getOmpLoginPage();
        __page5 = __page5.run(new LoginScenario(this.regularUser));
        __page5 = __page5.goToMePageProfile();
        __page5 = __page5.clickEditPublicProfileButton();
        __page5 = __page5.clickEditProfileButton();
        expect(__page5.editBannerImageButton).not.toBeVisible();
        __page5.logger.info("Successfully verified that change banner image button is not displayed");
        expect(__page5.removeBannerButton).not.toBeVisible();
        __page5.logger.info("Successfully verified that remove banner button is not displayed");
    }

    public verifyThatAfterRemovingCustomImageUserFallsBackToAdminDefinedBannerImage(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.adminUser))
                .goToAdminPanel()
                .selectMainTab(ChangeBannerImageForAllUsersFromAdminPanelTest.BRANDING)
                .openGeneralBrandingPage()
                .switchAllowUsersToModifyBannerToggle()
                .clickSaveChangesButton()
                .goDirectlyTo(SignOutPage);

                let __page6: any = this;
        __page6 = __page6.getOmpLoginPage();
        __page6 = __page6.run(new LoginScenario(this.regularUser));
        __page6 = __page6.goToMePageProfile();
        __page6 = __page6.clickEditPublicProfileButton();
        __page6 = __page6.clickEditProfileButton();
        __page6 = __page6.clickRemoveBannerButton();
        __page6 = __page6.confirmBannerRemoval();
        __page6 = __page6.clickSaveButton();
        expect(__page6.bannerImageLink(ChangeBannerImageForAllUsersFromAdminPanelTest.ADMIN_BANNER)).toBeVisible();
        __page6.logger.info("Successfully verified that banner is visible");
        __page6 = __page6.clickBackButton();
        __page6 = __page6.goToMePageProfile();
        expect(__page6.bannerImageLink(ChangeBannerImageForAllUsersFromAdminPanelTest.ADMIN_BANNER)).toBeVisible();
        __page6.logger.info("Successfully verified that default banner is visible");
    }

    public verifyThatAdminUserCanDefineCustomAltTextForBanner(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.adminUser))
                .goToAdminPanel()
                .selectMainTab(ChangeBannerImageForAllUsersFromAdminPanelTest.BRANDING)
                .openGeneralBrandingPage()
                .fillInAltText(ChangeBannerImageForAllUsersFromAdminPanelTest.CUSTOM_ALT_TEXT)
                .clickSaveChangesButton()
                .goDirectlyTo(SignOutPage);

                let __page7: any = this;
        __page7 = __page7.getOmpLoginPage();
        __page7 = __page7.run(new LoginScenario(this.regularUser));
        __page7 = __page7.goToMePageProfile();
        assertTrue(__page7.bannerImageLink(ChangeBannerImageForAllUsersFromAdminPanelTest.ADMIN_BANNER).getAttribute("alt").contains(ChangeBannerImageForAllUsersFromAdminPanelTest.CUSTOM_ALT_TEXT));
        __page7.logger.info("Successfully verified that alt text is as expected");
    }

    public verifyIfAdminUserCanRemoveBannerImage(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.adminUser))
                .goToAdminPanel()
                .selectMainTab(ChangeBannerImageForAllUsersFromAdminPanelTest.BRANDING)
                .openGeneralBrandingPage()
                .clickRemoveBannerButton()
                .clickSaveChangesButton()
                .goDirectlyTo(SignOutPage);

                let __page8: any = this;
        __page8 = __page8.getOmpLoginPage();
        __page8 = __page8.run(new LoginScenario(this.regularUser));
        __page8 = __page8.goToMePageProfile();
        expect(__page8.bannerImageLink(ChangeBannerImageForAllUsersFromAdminPanelTest.DEFAULT_BANNER)).toBeVisible();
        __page8.logger.info("Successfully verified that default banner is visible");
        __page8 = __page8.clickEditPublicProfileButton();
        __page8 = __page8.clickEditProfileButton();
        expect(__page8.bannerImageLink(ChangeBannerImageForAllUsersFromAdminPanelTest.DEFAULT_BANNER)).toBeVisible();
        __page8.logger.info("Successfully verified that banner is visible");
    }

    public afterTests(): void {
        this.deleteUser(this.adminUser);
        this.deleteUser(this.regularUser);
    }
}
