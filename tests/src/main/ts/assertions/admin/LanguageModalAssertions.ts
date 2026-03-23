import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { LanguageModalPage } from "pages/admin/LanguageModalPage";

export class LanguageModalAssertions extends BaseAssertion<LanguageModalPage> {

    public assertThatTranslationForLanguageContains(language: string, translation: string): LanguageModalAssertions {
        this.assertThat(this.page.translatedTextInput(language)).hasValue(translation, this.hasValueOptions);
        return this;
    }
}
