// @ts-nocheck
import { BasePage } from "common/BasePage";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, LoadState, Locator, Page } from "common/testing/playwright";
import { ResultContainer } from "models/ResultContainer";
import { ProfileDetailsPage } from "pages/careergrowth/profiles/ProfileDetailsPage";

export class ChangeRoleAndFamilyModalPage extends BasePage {

    public roleInput: Locator = this.page.locator("//div[text() = 'Start Typing']/following-sibling::div/descendant::input | //div[text() = 'Start typing']/following-sibling::div/descendant::input");
    public selectButton: Locator = this.page.locator("//button[text() = 'Select']");
    public optionToSelect(role: string): Locator {
      return this.getLocatorWithParam("//div[@tabindex = '-1'][contains(text(), '%s')]", role);
    }

	public selectJobRoleFromInput(defaultRoleName: string, shortRoleName: string, roleFullNameList: string[], roleName: ResultContainer): ChangeRoleAndFamilyModalPage {
        for (const roleFullName of roleFullNameList) {
            if (!Objects.equals(defaultRoleName, roleFullName)) {
                roleInput.clear();
                roleInput.fill(shortRoleName);
                this.optionToSelect(roleFullName).click();
                roleName.setValue(roleFullName);
                break;
            }
        }
        return this;
    }

    public selectFirstJobRoleFromInput(shortRoleName: string, roleFullName: string): ChangeRoleAndFamilyModalPage {
        roleInput.clear();
        roleInput.fill(shortRoleName);
        this.pause(500);
        this.page.waitForLoadState(LoadState.DOMCONTENTLOADED);
        this.optionToSelect(roleFullName).first().click();
        return this;
    }

	public clickSelectButton(): ProfileDetailsPage {
        this.pause(500);
        this.page.waitForLoadState(LoadState.DOMCONTENTLOADED);
        selectButton.click();
        this.page.waitForLoadState(LoadState.DOMCONTENTLOADED);
        this.pause(500);
        return this.getPageClassInstance(ProfileDetailsPage);
    }

    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {

      super(browser, pageHandler, logger, portalIndex);

    }
}
