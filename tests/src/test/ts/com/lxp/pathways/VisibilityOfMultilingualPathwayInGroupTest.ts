// @ts-nocheck

import { GroupsRestService } from "common/api/GroupsRestService";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { GroupModel } from "models/lxp/GroupModel";
import { UserModel } from "models/user/UserModel";
import { GroupDetailsPage } from "pages/groups/GroupDetailsPage";
import { MembersGroupPage } from "pages/groups/MembersGroupPage";
import { ContentMePage } from "pages/me/ContentMePage";
import { SignOutPage } from "pages/other/SignOutPage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { expect } from "common/testing/playwright";
import { Assert, assertTrue } from "common/testing/runtime";

export class VisibilityOfMultilingualPathwayInGroupTest extends GroupsRestService {
    private static readonly UNIQUE_SUFFIX: string = UUID.randomUUID().toString();
    private static readonly GROUP_NAME_EN: string = "EN-group-" + VisibilityOfMultilingualPathwayInGroupTest.UNIQUE_SUFFIX;
    private static readonly GROUP_NAME_PL: string = "PL-group-" + VisibilityOfMultilingualPathwayInGroupTest.UNIQUE_SUFFIX;
    private static readonly GROUP_DESCRIPTION_EN: string = "EN-Group description " + VisibilityOfMultilingualPathwayInGroupTest.UNIQUE_SUFFIX;
    private static readonly GROUP_DESCRIPTION_PL: string = "PL-Group description " + VisibilityOfMultilingualPathwayInGroupTest.UNIQUE_SUFFIX;
    private static readonly GROUP_UPDATE_NOTIFICATION: string = "Group Updated Successfully";
    private static readonly PATHWAY_DELETION_NOTIFICATION: string = "Pathway deleted. It will never show again";
    private static readonly PATHWAY_NAME_EN: string = "EN-pathway-" + VisibilityOfMultilingualPathwayInGroupTest.UNIQUE_SUFFIX;
    private static readonly SMARTCARD_TITLE_EN: string = "EN-smartcard-" + VisibilityOfMultilingualPathwayInGroupTest.UNIQUE_SUFFIX;
    private static readonly PATHWAY_DESCRIPTION_EN: string = "EN-description-" + VisibilityOfMultilingualPathwayInGroupTest.UNIQUE_SUFFIX;
    private static readonly GROUP_ADMIN: string = "Group Admin";
    private static readonly PATHWAY_NAME_PL: string = "PL-pathway-" + VisibilityOfMultilingualPathwayInGroupTest.UNIQUE_SUFFIX;
    private static readonly PATHWAY_DESCRIPTION_PL: string = "PL-description-" + VisibilityOfMultilingualPathwayInGroupTest.UNIQUE_SUFFIX;
    private static readonly LANG_CODE_POLISH: string = "pl";
    private static readonly LANG_CODE_SPANISH: string = "es";
    private static readonly LANG_CODE_ENGLISH: string = "en";
    private static readonly ACCORDION_LANGUAGE: string = "Polish (Polski)";
    private groupId: string;
    private user: UserModel;

    private readonly groupModel: GroupModel = new GroupModel();

    public initialize(): void {
      this.user = this.createUser(true);
      this.groupId = createGroup(VisibilityOfMultilingualPathwayInGroupTest.GROUP_NAME_EN, VisibilityOfMultilingualPathwayInGroupTest.GROUP_DESCRIPTION_EN, true, this.groupModel);
        this.addUserToGroup(this.groupId, this.user);
    }

    public shouldEditGroup(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.getCypressUser()))
                .goDirectlyTo(MembersGroupPage, VisibilityOfMultilingualPathwayInGroupTest.GROUP_NAME_EN)
                .changeGroupMemberRole(this.user.fullName, VisibilityOfMultilingualPathwayInGroupTest.GROUP_ADMIN)
                .goDirectlyTo(SignOutPage);

                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.goDirectlyTo(GroupDetailsPage, VisibilityOfMultilingualPathwayInGroupTest.GROUP_NAME_EN);
        __page1 = __page1.clickSettings();
        __page1 = __page1.clickEditGroupOption();
        __page1 = __page1.clickAddLanguagesButton();
        __page1 = __page1.addLanguages(VisibilityOfMultilingualPathwayInGroupTest.LANG_CODE_POLISH);
        __page1 = __page1.clickSelectLanguageDropdown();
        __page1 = __page1.openAccordion(VisibilityOfMultilingualPathwayInGroupTest.ACCORDION_LANGUAGE);
        __page1 = __page1.fillInGroupNameInAccordion(VisibilityOfMultilingualPathwayInGroupTest.GROUP_NAME_PL);
        __page1 = __page1.fillInGroupDescriptionInAccordion(VisibilityOfMultilingualPathwayInGroupTest.GROUP_DESCRIPTION_PL);
        __page1 = __page1.changeDefaultLanguage(VisibilityOfMultilingualPathwayInGroupTest.LANG_CODE_POLISH);
        __page1 = __page1.clickAddLanguageInModal();
        __page1 = __page1.clickUpdateGroupButton();
        expect(__page1.getGroupNotification()).toContainText(VisibilityOfMultilingualPathwayInGroupTest.GROUP_UPDATE_NOTIFICATION);
        __page1.logger.info("Successfully verified that group VisibilityOfMultilingualPathwayInGroupTest.GROUP_UPDATE_NOTIFICATION text is as expected");
    }

    public shouldCreateAndSharePathwayInAGroup(): void {
                let __page2: any = this;
        __page2 = __page2.getOmpLoginPage();
        __page2 = __page2.run(new LoginScenario(this.user));
        __page2 = __page2.goDirectlyTo(GroupDetailsPage, VisibilityOfMultilingualPathwayInGroupTest.GROUP_NAME_EN);
        __page2 = __page2.clickSharePathwayButton();
        __page2 = __page2.fillInPathwayTitle(VisibilityOfMultilingualPathwayInGroupTest.PATHWAY_NAME_EN);
        __page2 = __page2.fillInPathwayDescription(VisibilityOfMultilingualPathwayInGroupTest.PATHWAY_DESCRIPTION_EN);
        __page2 = __page2.clickAddLanguagesButton();
        __page2 = __page2.addLanguages(VisibilityOfMultilingualPathwayInGroupTest.LANG_CODE_POLISH);
        __page2 = __page2.clickSelectLanguagesDropdown();
        __page2 = __page2.openAccordion(VisibilityOfMultilingualPathwayInGroupTest.ACCORDION_LANGUAGE);
        __page2 = __page2.fillInPathwayNameInAccordion(VisibilityOfMultilingualPathwayInGroupTest.PATHWAY_NAME_PL);
        __page2 = __page2.fillInPathwayDescriptionInAccordion(VisibilityOfMultilingualPathwayInGroupTest.PATHWAY_DESCRIPTION_PL);
        __page2 = __page2.changeDefaultLanguage(VisibilityOfMultilingualPathwayInGroupTest.LANG_CODE_POLISH);
        __page2 = __page2.clickAddLanguageInModal();
        __page2 = __page2.clickContinueButton();
        __page2 = __page2.clickAddNewSmartCardButton();
        __page2 = __page2.goToTextSmartCardTab();
        __page2 = __page2.fillInTitle(VisibilityOfMultilingualPathwayInGroupTest.SMARTCARD_TITLE_EN);
        __page2 = __page2.clickCreateCardButtonInPathway();
        __page2 = __page2.clickPublishPathwayButton();
        expect(__page2.cardTile).toContainText(VisibilityOfMultilingualPathwayInGroupTest.PATHWAY_NAME_EN);
        __page2.logger.info("Successfully verified that VisibilityOfMultilingualPathwayInGroupTest.PATHWAY_NAME_EN is as expected");
    }

    public shouldDisplayPathwayInGroupInUserPreferredLanguage(): void {
                let __page3: any = this;
        __page3 = __page3.getOmpLoginPage();
        __page3 = __page3.run(new LoginScenario(this.user));
        __page3 = __page3.goDirectlyTo(GroupDetailsPage, VisibilityOfMultilingualPathwayInGroupTest.GROUP_NAME_EN);
        expect(__page3.getSharedPathwayTitle()).toContainText(VisibilityOfMultilingualPathwayInGroupTest.PATHWAY_NAME_EN);
        __page3.logger.info("Successfully verified that shared content VisibilityOfMultilingualPathwayInGroupTest.PATHWAY_NAME_EN is as expected");
        expect(__page3.getGroupTitle()).toContainText(VisibilityOfMultilingualPathwayInGroupTest.GROUP_NAME_EN);
        __page3.logger.info("Successfully verified that group VisibilityOfMultilingualPathwayInGroupTest.GROUP_NAME_EN is as expected");
        __page3 = __page3.clickPathwayTitle();
        expect(__page3.getJourneyTitle()).toContainText(VisibilityOfMultilingualPathwayInGroupTest.PATHWAY_NAME_EN);
        __page3.logger.info("Successfully verified that journey VisibilityOfMultilingualPathwayInGroupTest.PATHWAY_NAME_EN is as expected");
        let selectedLanguage: string = __page3.getLanguageDropdown().inputValue();
        Assert.assertTrue(selectedLanguage.equals(VisibilityOfMultilingualPathwayInGroupTest.LANG_CODE_ENGLISH));

    }

    public shouldDisplayPathwayInGroupInDefaultLanguage(): void {
                let __page4: any = this;
        __page4 = __page4.getOmpLoginPage();
        __page4 = __page4.run(new LoginScenario(this.user));
        __page4 = __page4.changeUserDefinedLanguage(VisibilityOfMultilingualPathwayInGroupTest.LANG_CODE_POLISH);
        __page4 = __page4.goDirectlyTo(GroupDetailsPage, VisibilityOfMultilingualPathwayInGroupTest.GROUP_NAME_EN);
        expect(__page4.getSharedPathwayTitle()).toContainText(VisibilityOfMultilingualPathwayInGroupTest.PATHWAY_NAME_PL);
        __page4.logger.info("Successfully verified that shared content VisibilityOfMultilingualPathwayInGroupTest.PATHWAY_NAME_PL is as expected");
        expect(__page4.getGroupTitle()).toContainText(VisibilityOfMultilingualPathwayInGroupTest.GROUP_NAME_PL);
        __page4.logger.info("Successfully verified that group VisibilityOfMultilingualPathwayInGroupTest.GROUP_NAME_PL is as expected");
        __page4 = __page4.clickPathwayTitle();
        expect(__page4.getJourneyTitle()).toContainText(VisibilityOfMultilingualPathwayInGroupTest.PATHWAY_NAME_PL);
        __page4.logger.info("Successfully verified that journey VisibilityOfMultilingualPathwayInGroupTest.PATHWAY_NAME_PL is as expected");
        let selectedLanguage: string = __page4.getLanguageDropdown().inputValue();
        Assert.assertTrue(selectedLanguage.equals(VisibilityOfMultilingualPathwayInGroupTest.LANG_CODE_POLISH));
        __page4 = __page4.changeUserDefinedLanguageInPolish(VisibilityOfMultilingualPathwayInGroupTest.LANG_CODE_ENGLISH);

    }

    public shouldDisplayPathwayInGroupInDefaultLanguageWhenUserPreferredLanguageIsChanged(): void {
                let __page5: any = this;
        __page5 = __page5.getOmpLoginPage();
        __page5 = __page5.run(new LoginScenario(this.user));
        __page5 = __page5.changeUserDefinedLanguage(VisibilityOfMultilingualPathwayInGroupTest.LANG_CODE_SPANISH);
        __page5 = __page5.goDirectlyTo(GroupDetailsPage, VisibilityOfMultilingualPathwayInGroupTest.GROUP_NAME_EN);
        expect(__page5.getGroupTitle()).toContainText(VisibilityOfMultilingualPathwayInGroupTest.GROUP_NAME_PL);
        __page5.logger.info("Successfully verified that group VisibilityOfMultilingualPathwayInGroupTest.GROUP_NAME_PL is as expected");
        expect(__page5.sharedJourneyTitle).not.toBeVisible();
        __page5.logger.info("Successfully verified that card list is empty");
        __page5 = __page5.clickDisplayAllContentButton();
        expect(__page5.getSharedPathwayTitle()).toContainText(VisibilityOfMultilingualPathwayInGroupTest.PATHWAY_NAME_PL);
        __page5.logger.info("Successfully verified that shared content VisibilityOfMultilingualPathwayInGroupTest.PATHWAY_NAME_PL is as expected");
        expect(__page5.getGroupTitle()).toContainText(VisibilityOfMultilingualPathwayInGroupTest.GROUP_NAME_PL);
        __page5.logger.info("Successfully verified that group VisibilityOfMultilingualPathwayInGroupTest.GROUP_NAME_PL is as expected");
        __page5 = __page5.clickPathwayTitle();
        expect(__page5.getJourneyTitle()).toContainText(VisibilityOfMultilingualPathwayInGroupTest.PATHWAY_NAME_PL);
        __page5.logger.info("Successfully verified that journey VisibilityOfMultilingualPathwayInGroupTest.PATHWAY_NAME_PL is as expected");
        let selectedLanguage: string = __page5.getLanguageDropdown().inputValue();
        Assert.assertTrue(selectedLanguage.equals(VisibilityOfMultilingualPathwayInGroupTest.LANG_CODE_POLISH));
        __page5 = __page5.changeUserDefinedLanguageInSpanish(VisibilityOfMultilingualPathwayInGroupTest.LANG_CODE_ENGLISH);
    }

        public shouldDeletePathway(): void {
                        let __page6: any = this;
            __page6 = __page6.getOmpLoginPage();
            __page6 = __page6.run(new LoginScenario(this.user));
            __page6 = __page6.goDirectlyTo(ContentMePage);
            __page6 = __page6.clickThreeDotsMenuForSpecificCards(VisibilityOfMultilingualPathwayInGroupTest.PATHWAY_NAME_EN);
            __page6 = __page6.clickDeleteCard();
            __page6 = __page6.confirmPathwayDeletion();
            expect(__page6.cardNotification).toContainText(VisibilityOfMultilingualPathwayInGroupTest.PATHWAY_DELETION_NOTIFICATION);
            __page6.logger.info("Successfully verified that VisibilityOfMultilingualPathwayInGroupTest.PATHWAY_DELETION_NOTIFICATION text is as expected");
        }

    public afterTests(): void {
        this.deleteUser(this.user);
        this.deleteGroup(this.groupId);
    }

}
