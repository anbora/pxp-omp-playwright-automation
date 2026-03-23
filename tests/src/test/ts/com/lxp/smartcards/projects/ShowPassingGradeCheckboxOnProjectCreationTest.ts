import { ContentMePageAssertions } from "assertions/me/ContentMePageAssertions";
import { ProjectCardModalAssertions } from "assertions/smartcards/ProjectCardModalAssertions";
import { SmartCardStandAlonePageAssertions } from "assertions/smartcards/SmartCardStandAlonePageAssertions";
import { SmartCardRestService } from "common/api/SmartCardRestService";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { ResultContainer } from "models/ResultContainer";
import { UserModel } from "models/user/UserModel";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

export class ShowPassingGradeCheckboxOnProjectCreationTest  extends SmartCardRestService {

    private static readonly UNIQUE_SUFFIX: string = UUID.randomUUID().toString();
    private static readonly SMART_CARD_TITLE_EN: string = "EN_" + ShowPassingGradeCheckboxOnProjectCreationTest.UNIQUE_SUFFIX;
    private static readonly NOTIFICATION: string = "Your card has been published publicly and will be accessible to everyone";
    private static readonly PASSING_GRADE_C: string = "C";
    private static readonly PASSING_GRADE_3: string = "3";
    private static readonly GRADING_SCALE: string = "Score (1-5)";
    private user1: UserModel;
    private readonly eclId: ResultContainer = new ResultContainer();

    public initialize(): void {

    this.user1 = this.createUser(false);

    }

    public verifyShowPassingGradeCheckboxOnProjectCardCreation(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user1))
                .clickCreateButton()
                .clickSmartCardButton()
                .goToProjectSmartCardTab()
                .fillInSingleLanguageTitle(ShowPassingGradeCheckboxOnProjectCreationTest.SMART_CARD_TITLE_EN)
                .check(ProjectCardModalAssertions)
                    .assertThatShowPassingGradeToLearnersCheckboxIsDisabled()
                .endAssertion()
                .selectPassingGrade(ShowPassingGradeCheckboxOnProjectCreationTest.PASSING_GRADE_C)
                .check(ProjectCardModalAssertions)
                    .assertThatShowPassingGradeToLearnersCheckboxIsEnabled()
                .endAssertion()
                .selectGradingScale(ShowPassingGradeCheckboxOnProjectCreationTest.GRADING_SCALE)
                .check(ProjectCardModalAssertions)
                    .assertThatShowPassingGradeToLearnersCheckboxIsDisabled()
                .endAssertion()
                .selectPassingGrade(ShowPassingGradeCheckboxOnProjectCreationTest.PASSING_GRADE_3)
                .check(ProjectCardModalAssertions)
                    .assertThatShowPassingGradeToLearnersCheckboxIsEnabled()
                .endAssertion()
                .clickShowPassingGradeCheckbox()
                .clickCreateCardButton()
                .check(ContentMePageAssertions)
                    .assertThatCardNotificationIs(ShowPassingGradeCheckboxOnProjectCreationTest.NOTIFICATION)
                .endAssertion()
                .goToCardStandAloneView(ShowPassingGradeCheckboxOnProjectCreationTest.SMART_CARD_TITLE_EN)
                .getECLUniqueId(this.eclId)
                .check(SmartCardStandAlonePageAssertions)
                    .assertThatPassingGradeLabelIsPresent()
                    .assertThatSecondPositionFieldValueIsAsExpected(ShowPassingGradeCheckboxOnProjectCreationTest.PASSING_GRADE_3);
    }

    public afterClass(): void {
        this.deleteUser(this.user1);
        this.deleteSmartCard(this.eclId.getValue());
    }
}
