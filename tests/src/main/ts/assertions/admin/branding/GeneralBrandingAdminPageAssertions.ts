import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { GeneralBrandingAdminPage } from "pages/admin/branding/GeneralBrandingAdminPage";

export class GeneralBrandingAdminPageAssertions extends BaseAssertion<GeneralBrandingAdminPage> {

    public assertThatUploadedFileNameIsDisplayed(filename: string): GeneralBrandingAdminPageAssertions {
        this.assertThat(this.page.deleteButtonForUploadedFile.first()).containsText(filename);
        return this;

    }
}
