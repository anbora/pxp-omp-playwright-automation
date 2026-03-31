// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { LanguageModalPage } from "pages/admin/LanguageModalPage";
import { expect } from "common/testing/playwright";

export class LanguageModalAssertions extends BaseAssertion<LanguageModalPage> {

    public assertThatTranslationForLanguageContains(language: string, translation: string): LanguageModalAssertions {
        expect(this.page.translatedTextInput(language)).toHaveValue(translation, this.hasValueOptions);
        return this;
    }
}
