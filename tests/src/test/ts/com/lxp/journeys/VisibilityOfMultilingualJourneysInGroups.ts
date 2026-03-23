import { GroupDetailsAssertions } from "assertions/groups/GroupDetailsAssertions";
import { JourneyDetailsPageAssertions } from "assertions/journeys/JourneyDetailsPageAssertions";
import { ContentMePageAssertions } from "assertions/me/ContentMePageAssertions";
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

        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .goDirectlyTo(GroupDetailsPage, VisibilityOfMultilingualJourneysInGroups.GROUP_NAME_EN)
                .clickSettings()
                .clickEditGroupOption()
                .clickAddLanguagesButton()
                .addLanguages(VisibilityOfMultilingualJourneysInGroups.LANG_CODE_POLISH)
                .clickSelectLanguageDropdown()
                .openAccordion(VisibilityOfMultilingualJourneysInGroups.ACCORDION_LANGUAGE)
                .fillInGroupNameInAccordion(VisibilityOfMultilingualJourneysInGroups.GROUP_NAME_PL)
                .fillInGroupDescriptionInAccordion(VisibilityOfMultilingualJourneysInGroups.GROUP_DESCRIPTION_PL)
                .changeDefaultLanguage(VisibilityOfMultilingualJourneysInGroups.LANG_CODE_POLISH)
                .clickAddLanguageInModal()
                .clickUpdateGroupButton()
                .check(GroupDetailsAssertions)
                    .assertThatGroupNotificationIs(VisibilityOfMultilingualJourneysInGroups.GROUP_UPDATE_NOTIFICATION);
    }

    public shouldCreateAndShareJourneyInAGroup(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goDirectlyTo(GroupDetailsPage, VisibilityOfMultilingualJourneysInGroups.GROUP_NAME_EN)
                .clickShareJourneyButton()
                .fillInJourneyTitle(VisibilityOfMultilingualJourneysInGroups.JOURNEY_NAME_EN)
                .fillInJourneyDescription(VisibilityOfMultilingualJourneysInGroups.JOURNEY_DESCRIPTION_EN)
                .clickAddLanguagesButton()
                .addLanguages(VisibilityOfMultilingualJourneysInGroups.LANG_CODE_POLISH)
                .clickSelectLanguagesDropdown()
                .openAccordion(VisibilityOfMultilingualJourneysInGroups.ACCORDION_LANGUAGE)
                .fillInJourneyNameInAccordion(VisibilityOfMultilingualJourneysInGroups.JOURNEY_NAME_PL)
                .fillInJourneyDescriptionInAccordion(VisibilityOfMultilingualJourneysInGroups.JOURNEY_DESCRIPTION_PL)
                .changeDefaultLanguage(VisibilityOfMultilingualJourneysInGroups.LANG_CODE_POLISH)
                .clickAddLanguageInModal()
                .clickContinueButton()
                .enterSectionTitle(VisibilityOfMultilingualJourneysInGroups.SECTION_TITLE)
                .clickAddNewSmartCardButton()
                .goToTextSmartCardTab()
                .fillInTitle(VisibilityOfMultilingualJourneysInGroups.SMARTCARD_TITLE_EN)
                .clickCreateCardButtonInJourney()
                .clickPublishJourneyButton()
                .check(ContentMePageAssertions)
                    .assertThatCardTitleIsAsExpected(VisibilityOfMultilingualJourneysInGroups.JOURNEY_NAME_EN);
    }

    public shouldDisplayJourneyInGroupInUserPreferredLanguage(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goDirectlyTo(GroupDetailsPage, VisibilityOfMultilingualJourneysInGroups.GROUP_NAME_EN)
                .check(GroupDetailsAssertions)
                    .assertThatSharedJourneyContentTitleIs(VisibilityOfMultilingualJourneysInGroups.JOURNEY_NAME_EN)
                    .assertThatGroupTitleIs(VisibilityOfMultilingualJourneysInGroups.GROUP_NAME_EN)
                .endAssertion()
                .clickJourneyTitle()
                .check(JourneyDetailsPageAssertions)
                    .assertThatJourneyTitleIs(VisibilityOfMultilingualJourneysInGroups.JOURNEY_NAME_EN)
                    .assertThatSelectedLanguageIs(VisibilityOfMultilingualJourneysInGroups.LANG_CODE_ENGLISH);

    }

    public shouldDisplayJourneyInGroupInDefaultLanguage(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .changeUserDefinedLanguage(VisibilityOfMultilingualJourneysInGroups.LANG_CODE_POLISH)
                .goDirectlyTo(GroupDetailsPage, VisibilityOfMultilingualJourneysInGroups.GROUP_NAME_EN)
                .check(GroupDetailsAssertions)
                    .assertThatSharedJourneyContentTitleIs(VisibilityOfMultilingualJourneysInGroups.JOURNEY_NAME_PL)
                    .assertThatGroupTitleIs(VisibilityOfMultilingualJourneysInGroups.GROUP_NAME_PL)
                .endAssertion()
                .clickJourneyTitle()
                .check(JourneyDetailsPageAssertions)
                    .assertThatJourneyTitleIs(VisibilityOfMultilingualJourneysInGroups.JOURNEY_NAME_PL)
                    .assertThatSelectedLanguageIs(VisibilityOfMultilingualJourneysInGroups.LANG_CODE_POLISH)
                .endAssertion()
                .changeUserDefinedLanguageInPolish(VisibilityOfMultilingualJourneysInGroups.LANG_CODE_ENGLISH);

    }

    public shouldDisplayJourneyInGroupInDefaultLanguageWhenUserPreferredLanguageIsChanged(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .changeUserDefinedLanguage(VisibilityOfMultilingualJourneysInGroups.LANG_CODE_SPANISH)
                .goDirectlyTo(GroupDetailsPage, VisibilityOfMultilingualJourneysInGroups.GROUP_NAME_EN)
                .check(GroupDetailsAssertions)
                    .assertThatGroupTitleIs(VisibilityOfMultilingualJourneysInGroups.GROUP_NAME_PL)
                    .assertThatCardListIsEmpty()
                .endAssertion()
                .clickDisplayAllContentButton()
                .check(GroupDetailsAssertions)
                    .assertThatSharedJourneyContentTitleIs(VisibilityOfMultilingualJourneysInGroups.JOURNEY_NAME_PL)
                    .assertThatGroupTitleIs(VisibilityOfMultilingualJourneysInGroups.GROUP_NAME_PL)
                .endAssertion()
                .clickJourneyTitle()
                .check(JourneyDetailsPageAssertions)
                    .assertThatJourneyTitleIs(VisibilityOfMultilingualJourneysInGroups.JOURNEY_NAME_PL)
                    .assertThatSelectedLanguageIs(VisibilityOfMultilingualJourneysInGroups.LANG_CODE_POLISH)
                .endAssertion()
                .changeUserDefinedLanguageInSpanish(VisibilityOfMultilingualJourneysInGroups.LANG_CODE_ENGLISH);
    }

    public shouldDeleteJourney(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goDirectlyTo(ContentMePage)
                .clickThreeDotsMenuForSpecificCards(VisibilityOfMultilingualJourneysInGroups.JOURNEY_NAME_EN)
                .clickDeleteCard()
                .confirmJourneyDeletion()
                .check(ContentMePageAssertions)
                    .assertThatCardNotificationIs(VisibilityOfMultilingualJourneysInGroups.JOURNEY_DELETION_NOTIFICATION);
    }

    public afterTests(): void {
        this.deleteUser(this.user);
        this.deleteGroup(this.groupId);
    }

}
