// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { QuizCardModal } from "pages/smartcard/QuizCardModal";
import { expect } from "common/testing/playwright";

export class QuizCardModalAssertions extends BaseAssertion<QuizCardModal> {

    public assertThatValidationErrorForQuestionIsDisplayed(langCode: string, label: string, validationError: string): QuizCardModalAssertions {
        expect(this.page.multilingualQuestionValidationError(langCode, label)).toContainText(validationError);
        this.page.logger.info("Successfully verified that correct validation error is displayed");
        return this;
    }

    public assertThatValidationErrorForOptionIsDisplayed(langCode: string, questionLabel: string, langCodeForOption: string, optionLabel: string, validationError: string): QuizCardModalAssertions {
        expect(this.page.multiLingualOptionValidationError(langCode, questionLabel, langCodeForOption, optionLabel)).toContainText(validationError);
        this.page.logger.info("Successfully verified that correct validation error is displayed");
        return this;
    }

    public assertThatValidationErrorForCorrectOptionIsDisplayed(langCode: string, label: string, validationError: string): QuizCardModalAssertions {
        expect(this.page.correctOptionValidation(langCode, label)).toContainText(validationError);
        this.page.logger.info("Successfully verified that correct validation error is displayed");
        return this;
    }

    public assertThatArchiveContentCheckboxIsEnabled(): QuizCardModalAssertions {
        expect(this.page.archiveContentCheckbox).toBeEnabled();
        this.page.logger.info("Successfully verified that archive this content checkbox is enabled");
        return this;
    }
    public assertThatArchiveContentDateIsAdded(date: string): QuizCardModalAssertions {
        expect(this.page.getArchiveDate()).toContainText(date);
        this.page.logger.info("Successfully verified that automatically archive date is added");
        return this;
    }
}
