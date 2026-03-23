import { GroupDetailsAssertions } from "assertions/groups/GroupDetailsAssertions";
import { ContentMePageAssertions } from "assertions/me/ContentMePageAssertions";
import { PathwayDetailsPageAssertions } from "assertions/pathways/PathwayDetailsPageAssertions";
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

        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .goDirectlyTo(GroupDetailsPage, VisibilityOfMultilingualPathwayInGroupTest.GROUP_NAME_EN)
                .clickSettings()
                .clickEditGroupOption()
                .clickAddLanguagesButton()
                .addLanguages(VisibilityOfMultilingualPathwayInGroupTest.LANG_CODE_POLISH)
                .clickSelectLanguageDropdown()
                .openAccordion(VisibilityOfMultilingualPathwayInGroupTest.ACCORDION_LANGUAGE)
                .fillInGroupNameInAccordion(VisibilityOfMultilingualPathwayInGroupTest.GROUP_NAME_PL)
                .fillInGroupDescriptionInAccordion(VisibilityOfMultilingualPathwayInGroupTest.GROUP_DESCRIPTION_PL)
                .changeDefaultLanguage(VisibilityOfMultilingualPathwayInGroupTest.LANG_CODE_POLISH)
                .clickAddLanguageInModal()
                .clickUpdateGroupButton()
                .check(GroupDetailsAssertions)
                    .assertThatGroupNotificationIs(VisibilityOfMultilingualPathwayInGroupTest.GROUP_UPDATE_NOTIFICATION);
    }

    public shouldCreateAndSharePathwayInAGroup(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goDirectlyTo(GroupDetailsPage, VisibilityOfMultilingualPathwayInGroupTest.GROUP_NAME_EN)
                .clickSharePathwayButton()
                .fillInPathwayTitle(VisibilityOfMultilingualPathwayInGroupTest.PATHWAY_NAME_EN)
                .fillInPathwayDescription(VisibilityOfMultilingualPathwayInGroupTest.PATHWAY_DESCRIPTION_EN)
                .clickAddLanguagesButton()
                .addLanguages(VisibilityOfMultilingualPathwayInGroupTest.LANG_CODE_POLISH)
                .clickSelectLanguagesDropdown()
                .openAccordion(VisibilityOfMultilingualPathwayInGroupTest.ACCORDION_LANGUAGE)
                .fillInPathwayNameInAccordion(VisibilityOfMultilingualPathwayInGroupTest.PATHWAY_NAME_PL)
                .fillInPathwayDescriptionInAccordion(VisibilityOfMultilingualPathwayInGroupTest.PATHWAY_DESCRIPTION_PL)
                .changeDefaultLanguage(VisibilityOfMultilingualPathwayInGroupTest.LANG_CODE_POLISH)
                .clickAddLanguageInModal()
                .clickContinueButton()
                .clickAddNewSmartCardButton()
                .goToTextSmartCardTab()
                .fillInTitle(VisibilityOfMultilingualPathwayInGroupTest.SMARTCARD_TITLE_EN)
                .clickCreateCardButtonInPathway()
                .clickPublishPathwayButton()
                .check(ContentMePageAssertions)
                    .assertThatCardTitleIsAsExpected(VisibilityOfMultilingualPathwayInGroupTest.PATHWAY_NAME_EN);
    }

    public shouldDisplayPathwayInGroupInUserPreferredLanguage(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goDirectlyTo(GroupDetailsPage, VisibilityOfMultilingualPathwayInGroupTest.GROUP_NAME_EN)
                .check(GroupDetailsAssertions)
                    .assertThatSharedPathwayContentTitleIs(VisibilityOfMultilingualPathwayInGroupTest.PATHWAY_NAME_EN)
                    .assertThatGroupTitleIs(VisibilityOfMultilingualPathwayInGroupTest.GROUP_NAME_EN)
                .endAssertion()
                .clickPathwayTitle()
                .check(PathwayDetailsPageAssertions)
                    .assertThatPathwayTitleIs(VisibilityOfMultilingualPathwayInGroupTest.PATHWAY_NAME_EN)
                    .assertThatSelectedLanguageIs(VisibilityOfMultilingualPathwayInGroupTest.LANG_CODE_ENGLISH);

    }

    public shouldDisplayPathwayInGroupInDefaultLanguage(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .changeUserDefinedLanguage(VisibilityOfMultilingualPathwayInGroupTest.LANG_CODE_POLISH)
                .goDirectlyTo(GroupDetailsPage, VisibilityOfMultilingualPathwayInGroupTest.GROUP_NAME_EN)
                .check(GroupDetailsAssertions)
                    .assertThatSharedPathwayContentTitleIs(VisibilityOfMultilingualPathwayInGroupTest.PATHWAY_NAME_PL)
                    .assertThatGroupTitleIs(VisibilityOfMultilingualPathwayInGroupTest.GROUP_NAME_PL)
                .endAssertion()
                .clickPathwayTitle()
                .check(PathwayDetailsPageAssertions)
                    .assertThatPathwayTitleIs(VisibilityOfMultilingualPathwayInGroupTest.PATHWAY_NAME_PL)
                    .assertThatSelectedLanguageIs(VisibilityOfMultilingualPathwayInGroupTest.LANG_CODE_POLISH)
                .endAssertion()
                .changeUserDefinedLanguageInPolish(VisibilityOfMultilingualPathwayInGroupTest.LANG_CODE_ENGLISH);

    }

    public shouldDisplayPathwayInGroupInDefaultLanguageWhenUserPreferredLanguageIsChanged(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .changeUserDefinedLanguage(VisibilityOfMultilingualPathwayInGroupTest.LANG_CODE_SPANISH)
                .goDirectlyTo(GroupDetailsPage, VisibilityOfMultilingualPathwayInGroupTest.GROUP_NAME_EN)
                .check(GroupDetailsAssertions)
                    .assertThatGroupTitleIs(VisibilityOfMultilingualPathwayInGroupTest.GROUP_NAME_PL)
                    .assertThatCardListIsEmpty()
                .endAssertion()
                .clickDisplayAllContentButton()
                .check(GroupDetailsAssertions)
                    .assertThatSharedPathwayContentTitleIs(VisibilityOfMultilingualPathwayInGroupTest.PATHWAY_NAME_PL)
                    .assertThatGroupTitleIs(VisibilityOfMultilingualPathwayInGroupTest.GROUP_NAME_PL)
                .endAssertion()
                .clickPathwayTitle()
                .check(PathwayDetailsPageAssertions)
                    .assertThatPathwayTitleIs(VisibilityOfMultilingualPathwayInGroupTest.PATHWAY_NAME_PL)
                    .assertThatSelectedLanguageIs(VisibilityOfMultilingualPathwayInGroupTest.LANG_CODE_POLISH)
                .endAssertion()
                .changeUserDefinedLanguageInSpanish(VisibilityOfMultilingualPathwayInGroupTest.LANG_CODE_ENGLISH);
    }

        public shouldDeletePathway(): void {
            this.getOmpLoginPage()
                    .run(new LoginScenario(this.user))
                    .goDirectlyTo(ContentMePage)
                    .clickThreeDotsMenuForSpecificCards(VisibilityOfMultilingualPathwayInGroupTest.PATHWAY_NAME_EN)
                    .clickDeleteCard()
                    .confirmPathwayDeletion()
                    .check(ContentMePageAssertions)
                        .assertThatCardNotificationIs(VisibilityOfMultilingualPathwayInGroupTest.PATHWAY_DELETION_NOTIFICATION);
        }

    public afterTests(): void {
        this.deleteUser(this.user);
        this.deleteGroup(this.groupId);
    }

}
