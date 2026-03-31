// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { GeneralBrandingAdminPage } from "pages/admin/branding/GeneralBrandingAdminPage";
import { expect } from "common/testing/playwright";

export class GeneralBrandingAdminPageAssertions extends BaseAssertion<GeneralBrandingAdminPage> {

    public assertThatUploadedFileNameIsDisplayed(filename: string): GeneralBrandingAdminPageAssertions {
        expect(this.page.deleteButtonForUploadedFile.first()).toContainText(filename);
        return this;

    }
}
