// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { expect } from "common/testing/playwright";

export class HrDataOrganizationTest extends BaseRestTest {

    private user: UserModel;
    private hrData: string = "HR Data";
    private organizationName: string = UUID.randomUUID().toString();
    private organizationNameAfterEdit: string = UUID.randomUUID().toString();
    private organizationNameTranslation: string = UUID.randomUUID().toString();
    private externalSystemId: string = UUID.randomUUID().toString();
    private organizationType: string = "Department";

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public createAndEditOrganizationAndTranslationViaAdminPage(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.goToAdminPanel();
        __page1 = __page1.selectMainTab(this.hrData);
        __page1 = __page1.openMenuForOrganizationHRData();
        __page1 = __page1.clickAddOrganizationButton();
        __page1 = __page1.enterOrganizationName(this.organizationName);
        __page1 = __page1.selectOrganizationType(this.organizationType);
        __page1 = __page1.typeExternalSystemId(this.externalSystemId);
        __page1 = __page1.clickSaveButton();
        __page1 = __page1.clickSearchOrganization(this.organizationName);
        expect(__page1.organizationName.first()).toContainText(this.organizationName, { timeout: 30000 });
        __page1.logger.info("Successfully verified data. Organization name found on the list.");
        __page1 = __page1.clickEditOrganizationButton();
        __page1 = __page1.enterOrganizationName(this.organizationNameAfterEdit);
        __page1 = __page1.clickSaveButton();
        __page1 = __page1.clickSearchOrganization(this.organizationNameAfterEdit);
        expect(__page1.organizationName.first()).toContainText(this.organizationNameAfterEdit, { timeout: 30000 });
        __page1.logger.info("Successfully verified data. Organization name found on the list.");
        __page1 = __page1.clickTranslationButton();
        __page1 = __page1.clickTranslationDropdown();
        __page1 = __page1.typeEnterOrganizationName(this.organizationNameTranslation);
        __page1 = __page1.clickSaveButton();
        __page1 = __page1.clickSearchOrganization(this.organizationNameAfterEdit);
        __page1 = __page1.clickTranslationButton();
        __page1 = __page1.clickTranslationDropdown();
        expect(__page1.organizationName.first()).toHaveValue(this.organizationNameTranslation);
        __page1.logger.info("Successfully verified data. Organization translation name contains text.");
        __page1 = __page1.clickSaveButton();
    }
}
