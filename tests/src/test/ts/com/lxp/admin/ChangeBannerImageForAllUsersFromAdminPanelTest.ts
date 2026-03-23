import { GeneralBrandingAdminPageAssertions } from "assertions/admin/branding/GeneralBrandingAdminPageAssertions";
import { ProfileDetailsAssertions } from "assertions/careergrowth/profiles/ProfileDetailsAssertions";
import { MePageProfileTabAssertions } from "assertions/me/MePageProfileTabAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { TeamsResponsibleEnum } from "common/enums/TeamsResponsibleEnum";
import { UserModel } from "models/user/UserModel";
import { SignOutPage } from "pages/other/SignOutPage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

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
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.regularUser))
                .goToCareerGrowthPage()
                .editProfile()
                .check(ProfileDetailsAssertions)
                    .assertThatBannerIsDisplayed(ChangeBannerImageForAllUsersFromAdminPanelTest.DEFAULT_BANNER)
                .endAssertion()
                .clickEditProfileButton()
                .clickEditBannerImageButton()
                .uploadBannerImage(this.filePath)
                .clickSaveButton()
                .check(ProfileDetailsAssertions)
                    .assertThatBannerIsNotDisplayed(ChangeBannerImageForAllUsersFromAdminPanelTest.DEFAULT_BANNER)
                .endAssertion()
                .clickBackButton()
                .goToMePageProfile()
                .check(MePageProfileTabAssertions)
                    .assertThatBannerIsDisplayed(ChangeBannerImageForAllUsersFromAdminPanelTest.CUSTOM_USER_BANNER);
    }

    public verifyIfAdminUserCanUploadBannerImage(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.adminUser))
                .goToAdminPanel()
                .selectMainTab(ChangeBannerImageForAllUsersFromAdminPanelTest.BRANDING)
                .openGeneralBrandingPage()
                .clickUploadFileButton()
                .uploadBannerImage(this.filePath2)
                .clickSaveChangesButton()
                .check(GeneralBrandingAdminPageAssertions)
                    .assertThatUploadedFileNameIsDisplayed(ChangeBannerImageForAllUsersFromAdminPanelTest.ADMIN_BANNER)
                .endAssertion()
                .goDirectlyTo(SignOutPage);

        this.getOmpLoginPage()
                .run(new LoginScenario(this.adminUser))
                .goToMePageProfile()
                .check(MePageProfileTabAssertions)
                    .assertThatBannerIsDisplayed(ChangeBannerImageForAllUsersFromAdminPanelTest.ADMIN_BANNER)
                    .assertThatAltTextIs(ChangeBannerImageForAllUsersFromAdminPanelTest.ADMIN_BANNER, ChangeBannerImageForAllUsersFromAdminPanelTest.DEFAULT_ALT_TEXT);
    }

    public verifyThatCustomUserBannerIsNotOverriddenByAdminSettings(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.regularUser))
                .goToMePageProfile()
                .check(MePageProfileTabAssertions)
                    .assertThatBannerIsDisplayed(ChangeBannerImageForAllUsersFromAdminPanelTest.CUSTOM_USER_BANNER)
                .endAssertion()
                .clickEditPublicProfileButton()
                .clickEditProfileButton()
                .check(ProfileDetailsAssertions)
                    .assertThatBannerIsDisplayed(ChangeBannerImageForAllUsersFromAdminPanelTest.CUSTOM_USER_BANNER)
                    .assertThatChangeBannerImageButtonIsDisplayed()
                    .assertThatRemoveBannerImageButtonIsDisplayed();
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

        this.getOmpLoginPage()
                .run(new LoginScenario(this.regularUser))
                .goToMePageProfile()
                .clickEditPublicProfileButton()
                .clickEditProfileButton()
                .check(ProfileDetailsAssertions)
                    .assertThatChangeBannerImageButtonIsNotDisplayed()
                    .assertThatRemoveBannerImageButtonIsNotDisplayed();
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

        this.getOmpLoginPage()
                .run(new LoginScenario(this.regularUser))
                .goToMePageProfile()
                .clickEditPublicProfileButton()
                .clickEditProfileButton()
                .clickRemoveBannerButton()
                .confirmBannerRemoval()
                .clickSaveButton()
                .check(ProfileDetailsAssertions)
                    .assertThatBannerIsDisplayed(ChangeBannerImageForAllUsersFromAdminPanelTest.ADMIN_BANNER)
                .endAssertion()
                .clickBackButton()
                .goToMePageProfile()
                .check(MePageProfileTabAssertions)
                    .assertThatBannerIsDisplayed(ChangeBannerImageForAllUsersFromAdminPanelTest.ADMIN_BANNER);
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

        this.getOmpLoginPage()
                .run(new LoginScenario(this.regularUser))
                .goToMePageProfile()
                .check(MePageProfileTabAssertions)
                    .assertThatAltTextIs(ChangeBannerImageForAllUsersFromAdminPanelTest.ADMIN_BANNER, ChangeBannerImageForAllUsersFromAdminPanelTest.CUSTOM_ALT_TEXT);
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

        this.getOmpLoginPage()
                .run(new LoginScenario(this.regularUser))
                .goToMePageProfile()
                .check(MePageProfileTabAssertions)
                    .assertThatBannerIsDisplayed(ChangeBannerImageForAllUsersFromAdminPanelTest.DEFAULT_BANNER)
                .endAssertion()
                .clickEditPublicProfileButton()
                .clickEditProfileButton()
                .check(ProfileDetailsAssertions)
                    .assertThatBannerIsDisplayed(ChangeBannerImageForAllUsersFromAdminPanelTest.DEFAULT_BANNER);
    }

    public afterTests(): void {
        this.deleteUser(this.adminUser);
        this.deleteUser(this.regularUser);
    }
}
