import { ContentMePageAssertions } from "assertions/me/ContentMePageAssertions";
import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { SmartCardStandAlonePage } from "pages/smartcard/SmartCardStandAlonePage";

export class SmartCardStandAlonePageAssertions extends BaseAssertion<SmartCardStandAlonePage> {

    public assertThatSmartCardTitleIsAsExpected(smartCardTitle: string): SmartCardStandAlonePageAssertions {
        this.assertThat(this.page.smartCardTitle).containsText(smartCardTitle);
        this.page.logger.info("Successfully verified that smart card title is as expected");
        return this;
    }

    public assertThatSecondPositionFieldValueIsAsExpected(grade: string): SmartCardStandAlonePageAssertions {
        this.assertThat(this.page.secondPositionMetadataValue).containsText(grade);
        this.page.logger.info("Successfully verified that field value is as expected");
        return this;
    }

    public assertThatPassingGradeLabelIsNotPresent(): SmartCardStandAlonePageAssertions {
        this.assertThat(this.page.passingGradeLabel).not().isVisible();
        this.page.logger.info("Successfully verified that passing grade label is not visible");
        return this;
    }

    public assertThatPassingGradeLabelIsPresent(): SmartCardStandAlonePageAssertions {
        this.assertThat(this.page.passingGradeLabel).isVisible();
        this.page.logger.info("Successfully verified that passing grade label is visible");
        return this;
    }

    public assertThatMaximumReattemptsLabelIsPresent(): SmartCardStandAlonePageAssertions {
        this.assertThat(this.page.maximumReattemptsLabel).isVisible();
        this.page.logger.info("Successfully verified that passing grade label is visible");
        return this;
    }

    public assertThatSmartCardNotificationIs(notification: string): SmartCardStandAlonePageAssertions {
        this.assertThat(this.page.smartCardNotification).containsText(notification);
        this.page.logger.info("Successfully verified that notification text is as expected");
        return this;
    }

    public assertThatSmartCardQuestionIsPresent(question: string): SmartCardStandAlonePageAssertions {
        this.assertThat(this.page.smartCardQuestion(question)).isVisible();
        this.page.logger.info("Successfully verified that smart card question is present");
        return this;
    }

    public assertThatPollQuestionIsPresent(question: string): SmartCardStandAlonePageAssertions {
        this.assertThat(this.page.pollCardQuestion(question)).isVisible();
        this.page.logger.info("Successfully verified that poll question is present");
        return this;

    }

    public assertThatSmartCardOptionIsPresent(option: string): SmartCardStandAlonePageAssertions {
        this.assertThat(this.page.smartCardOption(option)).isVisible();
        this.page.logger.info("Successfully verified that smart card option is present");
        return this;
    }
    public assertThatPollCardOptionIsPresent(option: string): SmartCardStandAlonePageAssertions {
        this.assertThat(this.page.pollCardOption(option)).isVisible();
        this.page.logger.info("Successfully verified that poll card option is present");
        return this;
    }

    public assertThatEditSmartCardButtonIsVisible(): SmartCardStandAlonePageAssertions {
        this.assertThat(this.page.editSmartCard).isVisible();
        this.page.logger.info("Successfully verified that edit smart card option is present");
        return this;
    }

    public assertThatEditSmartCardButtonIsNotVisible(): SmartCardStandAlonePageAssertions {
        this.assertThat(this.page.editSmartCard).not().isVisible();
        this.page.logger.info("Successfully verified that edit smart card option is not present");
        return this;
    }

    public assertThatSubmittedButtonIsDisabled(): SmartCardStandAlonePageAssertions {
        this.assertThat(this.page.submittedSmartCardButton).isDisabled();
        this.page.logger.info("Successfully verified that submit button is disabled");
        return this;
    }

    public assertThatCorrectStatusIsDisplayed(status: string): SmartCardStandAlonePageAssertions {
        this.assertThat(this.page.markAsCompletedButton).containsText(status);
        this.page.logger.info("Successfully verified that smart card status is as expected");
        return this;
    }

    public assertThatCardNotificationIs(notification: string): SmartCardStandAlonePageAssertions {
        this.assertThat(this.page.cardNotification).containsText(notification);
        this.page.logger.info("Successfully verified that notification text is as expected");
        return this;
    }

    public assertThatVoteButtonIsDisabled(): SmartCardStandAlonePageAssertions {
        this.assertThat(this.page.voteButton).isDisabled();
        this.page.logger.info("Successfully verified that vote button is disabled");
        return this;
    }

    public assertThatVoteButtonIsEnabled(): SmartCardStandAlonePageAssertions {
        this.assertThat(this.page.voteButton).isEnabled();
        this.page.logger.info("Successfully verified that vote button is enabled");
        return this;
    }

    public assertThatPollOptionHasBeenChosen(option: string, answerText: string): SmartCardStandAlonePageAssertions {
        this.assertThat(this.page.answeredPollOption(option)).containsText(answerText);
        this.page.logger.info("Successfully verified that poll has been answered");
        return this;
    }
}
