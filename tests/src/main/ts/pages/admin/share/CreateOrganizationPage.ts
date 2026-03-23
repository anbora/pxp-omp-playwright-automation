import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";
import { HrDataOrganizationPage } from "pages/admin/hrdata/HrDataOrganizationPage";
import { AbstractOrganizationModalPage } from "pages/admin/share/AbstractOrganizationModalPage";

export class CreateOrganizationPage extends AbstractOrganizationModalPage<CreateOrganizationPage> {

    public externalSystemIdField: Locator = this.page.locator("//html//input[@id='OrgExternalId']");

    public organizationTypeInput: Locator = this.page.locator("//div[contains(text(),'Choose organization type')]");
    public dropdownSelect(organizationTypeSelectOption: string): Locator {
      return this.getLocatorWithParam("//div[contains(@class, 'option')][text() = '%s']", organizationTypeSelectOption);
    }

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }

    protected thisReturnInstance(): CreateOrganizationPage {

      return this;
    }

    public enterOrganizationName(OrganizationName: string): CreateOrganizationPage {

      return super.enterOrganizationName(OrganizationName);

    }

    public clickSaveButton(): HrDataOrganizationPage {

      return super.saveButton();

    }

    public selectOrganizationType(organizationTypeSelect: string): CreateOrganizationPage {
        organizationTypeInput.click();
        organizationTypeInput.pressSequentially(organizationTypeSelect);
        this.dropdownSelect(organizationTypeSelect).click();
        return this;
    }

    public typeExternalSystemId(externalSystemId: string): CreateOrganizationPage {
        externalSystemIdField.click();
        externalSystemIdField.fill(externalSystemId);
        return this.getPageClassInstance(CreateOrganizationPage);
    }
}
