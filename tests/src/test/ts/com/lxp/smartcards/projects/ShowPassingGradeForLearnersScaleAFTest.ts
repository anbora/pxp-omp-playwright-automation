import { ContentMePageAssertions } from "assertions/me/ContentMePageAssertions";
import { ProjectCardModalAssertions } from "assertions/smartcards/ProjectCardModalAssertions";
import { SmartCardStandAlonePageAssertions } from "assertions/smartcards/SmartCardStandAlonePageAssertions";
import { SmartCardRestService } from "common/api/SmartCardRestService";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { ResultContainer } from "models/ResultContainer";
import { UserModel } from "models/user/UserModel";
import { ContentMePage } from "pages/me/ContentMePage";
import { NotificationPage } from "pages/other/NotificationPage";
import { SignOutPage } from "pages/other/SignOutPage";
import { SmartCardStandAlonePage } from "pages/smartcard/SmartCardStandAlonePage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

export class ShowPassingGradeForLearnersScaleAFTest extends SmartCardRestService {

    private static readonly UNIQUE_SUFFIX: string = UUID.randomUUID().toString();
    private static readonly SMART_CARD_TITLE_EN: string = "EN_" + ShowPassingGradeForLearnersScaleAFTest.UNIQUE_SUFFIX;
    private static readonly NOTIFICATION: string = "Your card has been published publicly and will be accessible to everyone";
    private static readonly UPDATE_NOTIFICATION: string = "SmartCard updated successfully";
    private static readonly SHARE_NOTIFICATION: string = "You have shared this SmartCard with";
    private static readonly PASSING_GRADE: string = "C";
    private user1: UserModel;
    private user2: UserModel;
    private readonly eclId: ResultContainer = new ResultContainer();

    public initialize(): void {

      this.user1 = this.createUser(false);
      this.user2 = this.createUser(false);
    }

    public verifyThatProjectSmartCardCanBeCreated(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user1))
                .clickCreateButton()
                .clickSmartCardButton()
                .goToProjectSmartCardTab()
                .fillInSingleLanguageTitle(ShowPassingGradeForLearnersScaleAFTest.SMART_CARD_TITLE_EN)
                .check(ProjectCardModalAssertions)
                    .assertThatShowPassingGradeToLearnersCheckboxIsDisabled()
                .endAssertion()
                .clickCreateCardButton()
                .check(ContentMePageAssertions)
                    .assertThatCardNotificationIs(ShowPassingGradeForLearnersScaleAFTest.NOTIFICATION)
                .endAssertion()
                .goToCardStandAloneView(ShowPassingGradeForLearnersScaleAFTest.SMART_CARD_TITLE_EN)
                .getECLUniqueId(this.eclId)
                .check(SmartCardStandAlonePageAssertions)
                    .assertThatPassingGradeLabelIsNotPresent();
    }

    public verifyThatShowPassingGradeToLearnersCanBeCheckedForAFGradingScale(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user1))
                .goDirectlyTo(ContentMePage)
                .goToCardStandAloneView(ShowPassingGradeForLearnersScaleAFTest.SMART_CARD_TITLE_EN)
                .editProjectSmartCard()
                .selectPassingGrade(ShowPassingGradeForLearnersScaleAFTest.PASSING_GRADE)
                .check(ProjectCardModalAssertions)
                    .assertThatShowPassingGradeToLearnersCheckboxIsEnabled()
                .endAssertion()
                .clickShowPassingGradeCheckbox()
                .clickUpdateCardButton()
                .check(ContentMePageAssertions)
                    .assertThatCardNotificationIs(ShowPassingGradeForLearnersScaleAFTest.UPDATE_NOTIFICATION);
    }

    public verifyThatPassingGradeIsShownToCardAuthor(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user1))
                .goDirectlyTo(ContentMePage)
                .goToCardStandAloneView(ShowPassingGradeForLearnersScaleAFTest.SMART_CARD_TITLE_EN)
                .check(SmartCardStandAlonePageAssertions)
                    .assertThatPassingGradeLabelIsPresent()
                    .assertThatSecondPositionFieldValueIsAsExpected(ShowPassingGradeForLearnersScaleAFTest.PASSING_GRADE);
    }

     public verifyThatPassingGradeIsShownWhenSharedWithAnotherUser(): void {
            this.getOmpLoginPage()
                    .run(new LoginScenario(this.user1))
                    .goDirectlyTo(ContentMePage)
                    .goToCardStandAloneView(ShowPassingGradeForLearnersScaleAFTest.SMART_CARD_TITLE_EN)
                    .clickShareContentButton()
                    .searchForUserToShareContentWith(this.user2.fullName)
                    .selectUserToShareContentWith(this.user2.fullName)
                    .clickShareButton()
                    .check(SmartCardStandAlonePageAssertions)
                        .assertThatSmartCardNotificationIs(ShowPassingGradeForLearnersScaleAFTest.SHARE_NOTIFICATION)
                    .endAssertion()
                    .goDirectlyTo(SignOutPage);

        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user2))
                .goDirectlyTo(NotificationPage)
                .clickFirstNotificationInRecentUpdatesWidget(SmartCardStandAlonePage)
                .check(SmartCardStandAlonePageAssertions)
                    .assertThatPassingGradeLabelIsPresent()
                    .assertThatSecondPositionFieldValueIsAsExpected(ShowPassingGradeForLearnersScaleAFTest.PASSING_GRADE);
    }

    public afterClass(): void {
        this.deleteUser(this.user1);
        this.deleteUser(this.user2);
        this.deleteSmartCard(this.eclId.getValue());
    }
}
