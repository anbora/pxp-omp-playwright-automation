// @ts-nocheck

import { SmartCardRestService } from "common/api/SmartCardRestService";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { ResultContainer } from "models/ResultContainer";
import { UserModel } from "models/user/UserModel";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { expect } from "common/testing/playwright";

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
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user1));
        __page1 = __page1.clickCreateButton();
        __page1 = __page1.clickSmartCardButton();
        __page1 = __page1.goToProjectSmartCardTab();
        __page1 = __page1.fillInSingleLanguageTitle(ShowPassingGradeCheckboxOnProjectCreationTest.SMART_CARD_TITLE_EN);
        expect(__page1.showPassingGradeCheckbox).toBeDisabled();
        __page1.logger.info("Successfully verified that show passing grade to learners checkbox is disabled");
        __page1 = __page1.selectPassingGrade(ShowPassingGradeCheckboxOnProjectCreationTest.PASSING_GRADE_C);
        expect(__page1.showPassingGradeCheckbox).toBeEnabled();
        __page1.logger.info("Successfully verified that show passing grade to learners checkbox is enabled");
        __page1 = __page1.selectGradingScale(ShowPassingGradeCheckboxOnProjectCreationTest.GRADING_SCALE);
        expect(__page1.showPassingGradeCheckbox).toBeDisabled();
        __page1.logger.info("Successfully verified that show passing grade to learners checkbox is disabled");
        __page1 = __page1.selectPassingGrade(ShowPassingGradeCheckboxOnProjectCreationTest.PASSING_GRADE_3);
        expect(__page1.showPassingGradeCheckbox).toBeEnabled();
        __page1.logger.info("Successfully verified that show passing grade to learners checkbox is enabled");
        __page1 = __page1.clickShowPassingGradeCheckbox();
        __page1 = __page1.clickCreateCardButton();
        expect(__page1.cardNotification).toContainText(ShowPassingGradeCheckboxOnProjectCreationTest.NOTIFICATION);
        __page1.logger.info("Successfully verified that ShowPassingGradeCheckboxOnProjectCreationTest.NOTIFICATION text is as expected");
        __page1 = __page1.goToCardStandAloneView(ShowPassingGradeCheckboxOnProjectCreationTest.SMART_CARD_TITLE_EN);
        __page1 = __page1.getECLUniqueId(this.eclId);
        expect(__page1.passingGradeLabel).toBeVisible();
        __page1.logger.info("Successfully verified that passing grade label is visible");
        expect(__page1.secondPositionMetadataValue).toContainText(ShowPassingGradeCheckboxOnProjectCreationTest.PASSING_GRADE_3);
        __page1.logger.info("Successfully verified that field value is as expected");
    }

    public afterClass(): void {
        this.deleteUser(this.user1);
        this.deleteSmartCard(this.eclId.getValue());
    }
}
