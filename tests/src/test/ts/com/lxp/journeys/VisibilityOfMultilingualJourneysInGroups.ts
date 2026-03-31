// @ts-nocheck
import { GroupsRestService } from "common/api/GroupsRestService";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { expect } from "common/testing/playwright";
import { GroupModel } from "models/lxp/GroupModel";
import { UserModel } from "models/user/UserModel";
import { GroupDetailsPage } from "pages/groups/GroupDetailsPage";
import { MembersGroupPage } from "pages/groups/MembersGroupPage";
import { ContentMePage } from "pages/me/ContentMePage";
import { SignOutPage } from "pages/other/SignOutPage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

export class VisibilityOfMultilingualJourneysInGroups extends GroupsRestService {

    private static readonly UNIQUE_SUFFIX: string = UUID.randomUUID().toString();
    private static readonly GROUP_NAME_EN: string = "EN-group-" + VisibilityOfMultilingualJourneysInGroups.UNIQUE_SUFFIX;
    private static readonly GROUP_NAME_PL: string = "PL-group-" + VisibilityOfMultilingualJourneysInGroups.UNIQUE_SUFFIX;
    private static readonly GROUP_DESCRIPTION_EN: string = "EN-Group description " + VisibilityOfMultilingualJourneysInGroups.UNIQUE_SUFFIX;
    private static readonly GROUP_DESCRIPTION_PL: string = "PL-Group description " + VisibilityOfMultilingualJourneysInGroups.UNIQUE_SUFFIX;
    private static readonly GROUP_UPDATE_NOTIFICATION: string = "Group Updated Successfully";
    private static readonly JOURNEY_DELETION_NOTIFICATION: string = "Journey deleted. It will never show again";
    private static readonly JOURNEY_NAME_EN: string = "EN-journey-" + VisibilityOfMultilingualJourneysInGroups.UNIQUE_SUFFIX;
    private static readonly JOURNEY_DESCRIPTION_EN: string = "EN-description-" + VisibilityOfMultilingualJourneysInGroups.UNIQUE_SUFFIX;
    private static readonly SMARTCARD_TITLE_EN: string = "EN-smartcard-" + VisibilityOfMultilingualJourneysInGroups.UNIQUE_SUFFIX;
    private static readonly GROUP_ADMIN: string = "Group Admin";
    private static readonly JOURNEY_NAME_PL: string = "PL-journey-" + VisibilityOfMultilingualJourneysInGroups.UNIQUE_SUFFIX;
    private static readonly JOURNEY_DESCRIPTION_PL: string = "PL-description-" + VisibilityOfMultilingualJourneysInGroups.UNIQUE_SUFFIX;
    private static readonly SECTION_TITLE: string = "Section-title-" + VisibilityOfMultilingualJourneysInGroups.UNIQUE_SUFFIX;
    private static readonly LANG_CODE_POLISH: string = "pl";
    private static readonly LANG_CODE_SPANISH: string = "es";
    private static readonly LANG_CODE_ENGLISH: string = "en";
    private static readonly ACCORDION_LANGUAGE: string = "Polish (Polski)";
    private groupId: string;
    private user: UserModel;

    private readonly groupModel: GroupModel = new GroupModel();

    public initialize(): void {
      this.user = this.createUser(true);
      this.groupId = createGroup(VisibilityOfMultilingualJourneysInGroups.GROUP_NAME_EN, VisibilityOfMultilingualJourneysInGroups.GROUP_DESCRIPTION_EN, true, this.groupModel);
        this.addUserToGroup(this.groupId, this.user);
    }

    public shouldEditGroup(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.getCypressUser()))
                .goDirectlyTo(MembersGroupPage, VisibilityOfMultilingualJourneysInGroups.GROUP_NAME_EN)
                .changeGroupMemberRole(this.user.fullName, VisibilityOfMultilingualJourneysInGroups.GROUP_ADMIN)
                .goDirectlyTo(SignOutPage);

        let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.goDirectlyTo(GroupDetailsPage, VisibilityOfMultilingualJourneysInGroups.GROUP_NAME_EN);
        __page1 = __page1.clickSettings();
        __page1 = __page1.clickEditGroupOption();
        __page1 = __page1.clickAddLanguagesButton();
        __page1 = __page1.addLanguages(VisibilityOfMultilingualJourneysInGroups.LANG_CODE_POLISH);
        __page1 = __page1.clickSelectLanguageDropdown();
        __page1 = __page1.openAccordion(VisibilityOfMultilingualJourneysInGroups.ACCORDION_LANGUAGE);
        __page1 = __page1.fillInGroupNameInAccordion(VisibilityOfMultilingualJourneysInGroups.GROUP_NAME_PL);
        __page1 = __page1.fillInGroupDescriptionInAccordion(VisibilityOfMultilingualJourneysInGroups.GROUP_DESCRIPTION_PL);
        __page1 = __page1.changeDefaultLanguage(VisibilityOfMultilingualJourneysInGroups.LANG_CODE_POLISH);
        __page1 = __page1.clickAddLanguageInModal();
        __page1 = __page1.clickUpdateGroupButton();
        expect(__page1.groupNotification).toContainText(VisibilityOfMultilingualJourneysInGroups.GROUP_UPDATE_NOTIFICATION);
    }

    public shouldCreateAndShareJourneyInAGroup(): void {
        let __page2: any = this;
        __page2 = __page2.getOmpLoginPage();
        __page2 = __page2.run(new LoginScenario(this.user));
        __page2 = __page2.goDirectlyTo(GroupDetailsPage, VisibilityOfMultilingualJourneysInGroups.GROUP_NAME_EN);
        __page2 = __page2.clickShareJourneyButton();
        __page2 = __page2.fillInJourneyTitle(VisibilityOfMultilingualJourneysInGroups.JOURNEY_NAME_EN);
        __page2 = __page2.fillInJourneyDescription(VisibilityOfMultilingualJourneysInGroups.JOURNEY_DESCRIPTION_EN);
        __page2 = __page2.clickAddLanguagesButton();
        __page2 = __page2.addLanguages(VisibilityOfMultilingualJourneysInGroups.LANG_CODE_POLISH);
        __page2 = __page2.clickSelectLanguagesDropdown();
        __page2 = __page2.openAccordion(VisibilityOfMultilingualJourneysInGroups.ACCORDION_LANGUAGE);
        __page2 = __page2.fillInJourneyNameInAccordion(VisibilityOfMultilingualJourneysInGroups.JOURNEY_NAME_PL);
        __page2 = __page2.fillInJourneyDescriptionInAccordion(VisibilityOfMultilingualJourneysInGroups.JOURNEY_DESCRIPTION_PL);
        __page2 = __page2.changeDefaultLanguage(VisibilityOfMultilingualJourneysInGroups.LANG_CODE_POLISH);
        __page2 = __page2.clickAddLanguageInModal();
        __page2 = __page2.clickContinueButton();
        __page2 = __page2.enterSectionTitle(VisibilityOfMultilingualJourneysInGroups.SECTION_TITLE);
        __page2 = __page2.clickAddNewSmartCardButton();
        __page2 = __page2.goToTextSmartCardTab();
        __page2 = __page2.fillInTitle(VisibilityOfMultilingualJourneysInGroups.SMARTCARD_TITLE_EN);
        __page2 = __page2.clickCreateCardButtonInJourney();
        __page2 = __page2.clickPublishJourneyButton();
        expect(__page2.cardTile).toContainText(VisibilityOfMultilingualJourneysInGroups.JOURNEY_NAME_EN);
    }

    public shouldDisplayJourneyInGroupInUserPreferredLanguage(): void {
        let __page3: any = this;
        __page3 = __page3.getOmpLoginPage();
        __page3 = __page3.run(new LoginScenario(this.user));
        __page3 = __page3.goDirectlyTo(GroupDetailsPage, VisibilityOfMultilingualJourneysInGroups.GROUP_NAME_EN);
        expect(__page3.sharedJourneyTitle).toContainText(VisibilityOfMultilingualJourneysInGroups.JOURNEY_NAME_EN);
        expect(__page3.groupTitle).toContainText(VisibilityOfMultilingualJourneysInGroups.GROUP_NAME_EN);
        __page3 = __page3.clickJourneyTitle();
        expect(__page3.journeyTitle).toContainText(VisibilityOfMultilingualJourneysInGroups.JOURNEY_NAME_EN);
        expect(__page3.languageDropdown).toHaveValue(VisibilityOfMultilingualJourneysInGroups.LANG_CODE_ENGLISH);
    }

    public shouldDisplayJourneyInGroupInDefaultLanguage(): void {
        let __page4: any = this;
        __page4 = __page4.getOmpLoginPage();
        __page4 = __page4.run(new LoginScenario(this.user));
        __page4 = __page4.changeUserDefinedLanguage(VisibilityOfMultilingualJourneysInGroups.LANG_CODE_POLISH);
        __page4 = __page4.goDirectlyTo(GroupDetailsPage, VisibilityOfMultilingualJourneysInGroups.GROUP_NAME_EN);
        expect(__page4.sharedJourneyTitle).toContainText(VisibilityOfMultilingualJourneysInGroups.JOURNEY_NAME_PL);
        expect(__page4.groupTitle).toContainText(VisibilityOfMultilingualJourneysInGroups.GROUP_NAME_PL);
        __page4 = __page4.clickJourneyTitle();
        expect(__page4.journeyTitle).toContainText(VisibilityOfMultilingualJourneysInGroups.JOURNEY_NAME_PL);
        expect(__page4.languageDropdown).toHaveValue(VisibilityOfMultilingualJourneysInGroups.LANG_CODE_POLISH);
        __page4 = __page4.changeUserDefinedLanguageInPolish(VisibilityOfMultilingualJourneysInGroups.LANG_CODE_ENGLISH);
    }

    public shouldDisplayJourneyInGroupInDefaultLanguageWhenUserPreferredLanguageIsChanged(): void {
        let __page5: any = this;
        __page5 = __page5.getOmpLoginPage();
        __page5 = __page5.run(new LoginScenario(this.user));
        __page5 = __page5.changeUserDefinedLanguage(VisibilityOfMultilingualJourneysInGroups.LANG_CODE_SPANISH);
        __page5 = __page5.goDirectlyTo(GroupDetailsPage, VisibilityOfMultilingualJourneysInGroups.GROUP_NAME_EN);
        expect(__page5.groupTitle).toContainText(VisibilityOfMultilingualJourneysInGroups.GROUP_NAME_PL);
        expect(__page5.sharedJourneyTitle).not.toBeVisible();
        __page5 = __page5.clickDisplayAllContentButton();
        expect(__page5.sharedJourneyTitle).toContainText(VisibilityOfMultilingualJourneysInGroups.JOURNEY_NAME_PL);
        expect(__page5.groupTitle).toContainText(VisibilityOfMultilingualJourneysInGroups.GROUP_NAME_PL);
        __page5 = __page5.clickJourneyTitle();
        expect(__page5.journeyTitle).toContainText(VisibilityOfMultilingualJourneysInGroups.JOURNEY_NAME_PL);
        expect(__page5.languageDropdown).toHaveValue(VisibilityOfMultilingualJourneysInGroups.LANG_CODE_POLISH);
        __page5 = __page5.changeUserDefinedLanguageInSpanish(VisibilityOfMultilingualJourneysInGroups.LANG_CODE_ENGLISH);
    }

    public shouldDeleteJourney(): void {
        let __page6: any = this;
        __page6 = __page6.getOmpLoginPage();
        __page6 = __page6.run(new LoginScenario(this.user));
        __page6 = __page6.goDirectlyTo(ContentMePage);
        __page6 = __page6.clickThreeDotsMenuForSpecificCards(VisibilityOfMultilingualJourneysInGroups.JOURNEY_NAME_EN);
        __page6 = __page6.clickDeleteCard();
        __page6 = __page6.confirmJourneyDeletion();
        expect(__page6.cardNotification).toContainText(VisibilityOfMultilingualJourneysInGroups.JOURNEY_DELETION_NOTIFICATION);
    }

    public afterTests(): void {
        this.deleteUser(this.user);
        this.deleteGroup(this.groupId);
    }

}
