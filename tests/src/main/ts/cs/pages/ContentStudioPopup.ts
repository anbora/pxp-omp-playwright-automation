import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, LoadState, Locator, Page } from "common/testing/playwright";
import { BrowseBySubjectPage } from "cs/pages/BrowseBySubjectPage";
import { GlobalNavigationPage } from "cs/pages/GlobalNavigationPage";

export class ContentStudioPopup extends GlobalNavigationPage {

    public selectorForWait: Locator = this.page.locator("//a[text() = 'CONTENT STUDIO']");
    public arrowDropDownIcon: Locator = this.page.getByTestId("KeyboardArrowDownIcon");
    public complianceText: Locator = this.page.getByText("Compliance");
    public complianceEmploymentLawElement: Locator = this.page.locator("//span[text()='Compliance employment law']/parent::span/descendant::input");
    public browseButton: Locator = this.page.locator("button:has-text('Browse')");
//    public Locator csAdminNavigationLink(String actionName) { return this.getLocatorWithParam("//span[text()='%s']", actionName);}

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {
        super(this.browser, this.pageHandler, this.logger, this.portalIndex);
        selectorForWait.waitFor(new Locator.WaitForOptions().setTimeout(60000));
    }

    public browseByComplianceText(): BrowseBySubjectPage {
        arrowDropDownIcon.click();
        complianceText.first().click();
        complianceEmploymentLawElement.first().click();
        browseButton.click();
        return this.getPageClassInstance(BrowseBySubjectPage);
    }


    public <T extends BasePage> getPageClass(clazz: Class<T>): T {


      return this.getPageClassInstance(clazz);


    }
}
