import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { QuizCardModal } from "pages/smartcard/QuizCardModal";

export class QuizCardModalAssertions extends BaseAssertion<QuizCardModal> {

    public assertThatValidationErrorForQuestionIsDisplayed(langCode: string, label: string, validationError: string): QuizCardModalAssertions {
        this.assertThat(this.page.multilingualQuestionValidationError(langCode, label)).containsText(validationError);
        this.page.logger.info("Successfully verified that correct validation error is displayed");
        return this;
    }

    public assertThatValidationErrorForOptionIsDisplayed(langCode: string, questionLabel: string, langCodeForOption: string, optionLabel: string, validationError: string): QuizCardModalAssertions {
        this.assertThat(this.page.multiLingualOptionValidationError(langCode, questionLabel, langCodeForOption, optionLabel)).containsText(validationError);
        this.page.logger.info("Successfully verified that correct validation error is displayed");
        return this;
    }

    public assertThatValidationErrorForCorrectOptionIsDisplayed(langCode: string, label: string, validationError: string): QuizCardModalAssertions {
        this.assertThat(this.page.correctOptionValidation(langCode, label)).containsText(validationError);
        this.page.logger.info("Successfully verified that correct validation error is displayed");
        return this;
    }

    public assertThatArchiveContentCheckboxIsEnabled(): QuizCardModalAssertions {
        this.assertThat(this.page.archiveContentCheckbox).isEnabled();
        this.page.logger.info("Successfully verified that archive this content checkbox is enabled");
        return this;
    }
    public assertThatArchiveContentDateIsAdded(date: string): QuizCardModalAssertions {
        this.assertThat(this.page.getArchiveDate()).containsText(date);
        this.page.logger.info("Successfully verified that automatically archive date is added");
        return this;
    }
}
