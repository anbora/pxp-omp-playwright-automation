// @ts-nocheck
import { ContentMePageAssertions } from "assertions/me/ContentMePageAssertions";
import { BaseAssertion } from "common/BaseAssertion";
import { SmartCardStandAlonePage } from "pages/smartcard/SmartCardStandAlonePage";
import { expect } from "common/testing/playwright";

export class SmartCardStandAlonePageAssertions extends BaseAssertion<SmartCardStandAlonePage> {

    public assertThatSmartCardTitleIsAsExpected(smartCardTitle: string): SmartCardStandAlonePageAssertions {
        expect(this.page.smartCardTitle).toContainText(smartCardTitle);
        this.page.logger.info("Successfully verified that smart card title is as expected");
        return this;
    }

    public assertThatSecondPositionFieldValueIsAsExpected(grade: string): SmartCardStandAlonePageAssertions {
        expect(this.page.secondPositionMetadataValue).toContainText(grade);
        this.page.logger.info("Successfully verified that field value is as expected");
        return this;
    }

    public assertThatPassingGradeLabelIsNotPresent(): SmartCardStandAlonePageAssertions {
        expect(this.page.passingGradeLabel).not.toBeVisible();
        this.page.logger.info("Successfully verified that passing grade label is not visible");
        return this;
    }

    public assertThatPassingGradeLabelIsPresent(): SmartCardStandAlonePageAssertions {
        expect(this.page.passingGradeLabel).toBeVisible();
        this.page.logger.info("Successfully verified that passing grade label is visible");
        return this;
    }

    public assertThatMaximumReattemptsLabelIsPresent(): SmartCardStandAlonePageAssertions {
        expect(this.page.maximumReattemptsLabel).toBeVisible();
        this.page.logger.info("Successfully verified that passing grade label is visible");
        return this;
    }

    public assertThatSmartCardNotificationIs(notification: string): SmartCardStandAlonePageAssertions {
        expect(this.page.smartCardNotification).toContainText(notification);
        this.page.logger.info("Successfully verified that notification text is as expected");
        return this;
    }

    public assertThatSmartCardQuestionIsPresent(question: string): SmartCardStandAlonePageAssertions {
        expect(this.page.smartCardQuestion(question)).toBeVisible();
        this.page.logger.info("Successfully verified that smart card question is present");
        return this;
    }

    public assertThatPollQuestionIsPresent(question: string): SmartCardStandAlonePageAssertions {
        expect(this.page.pollCardQuestion(question)).toBeVisible();
        this.page.logger.info("Successfully verified that poll question is present");
        return this;

    }

    public assertThatSmartCardOptionIsPresent(option: string): SmartCardStandAlonePageAssertions {
        expect(this.page.smartCardOption(option)).toBeVisible();
        this.page.logger.info("Successfully verified that smart card option is present");
        return this;
    }
    public assertThatPollCardOptionIsPresent(option: string): SmartCardStandAlonePageAssertions {
        expect(this.page.pollCardOption(option)).toBeVisible();
        this.page.logger.info("Successfully verified that poll card option is present");
        return this;
    }

    public assertThatEditSmartCardButtonIsVisible(): SmartCardStandAlonePageAssertions {
        expect(this.page.editSmartCard).toBeVisible();
        this.page.logger.info("Successfully verified that edit smart card option is present");
        return this;
    }

    public assertThatEditSmartCardButtonIsNotVisible(): SmartCardStandAlonePageAssertions {
        expect(this.page.editSmartCard).not.toBeVisible();
        this.page.logger.info("Successfully verified that edit smart card option is not present");
        return this;
    }

    public assertThatSubmittedButtonIsDisabled(): SmartCardStandAlonePageAssertions {
        expect(this.page.submittedSmartCardButton).toBeDisabled();
        this.page.logger.info("Successfully verified that submit button is disabled");
        return this;
    }

    public assertThatCorrectStatusIsDisplayed(status: string): SmartCardStandAlonePageAssertions {
        expect(this.page.markAsCompletedButton).toContainText(status);
        this.page.logger.info("Successfully verified that smart card status is as expected");
        return this;
    }

    public assertThatCardNotificationIs(notification: string): SmartCardStandAlonePageAssertions {
        expect(this.page.cardNotification).toContainText(notification);
        this.page.logger.info("Successfully verified that notification text is as expected");
        return this;
    }

    public assertThatVoteButtonIsDisabled(): SmartCardStandAlonePageAssertions {
        expect(this.page.voteButton).toBeDisabled();
        this.page.logger.info("Successfully verified that vote button is disabled");
        return this;
    }

    public assertThatVoteButtonIsEnabled(): SmartCardStandAlonePageAssertions {
        expect(this.page.voteButton).toBeEnabled();
        this.page.logger.info("Successfully verified that vote button is enabled");
        return this;
    }

    public assertThatPollOptionHasBeenChosen(option: string, answerText: string): SmartCardStandAlonePageAssertions {
        expect(this.page.answeredPollOption(option)).toContainText(answerText);
        this.page.logger.info("Successfully verified that poll has been answered");
        return this;
    }
}
