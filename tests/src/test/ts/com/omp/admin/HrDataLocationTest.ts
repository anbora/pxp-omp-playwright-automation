// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { expect } from "common/testing/playwright";

export class HrDataLocationTest extends BaseRestTest {

    private locationName: string = UUID.randomUUID().toString();
    private hrData: string = "HR Data";
    private locationNameAfterEdit: string = UUID.randomUUID().toString();
    private locationNameTranslation: string = UUID.randomUUID().toString();
    private user: UserModel;
    private country: string = "Afghanistan";
    private countryAfterEdit: string = "Albania";

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public createAndEditJobFunctionAndTranslationViaAdminPage(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.goToAdminPanel();
        __page1 = __page1.selectMainTab(this.hrData);
        __page1 = __page1.openMenuForLocationHRData();
        __page1 = __page1.clickAddLocationButton();
        __page1 = __page1.enterLocationName(this.locationName);
        __page1 = __page1.selectCountry(this.country);
        __page1 = __page1.clickSaveButton();
        __page1 = __page1.clickSearchLocation(this.locationName);
        expect(__page1.locationName.first()).toContainText(this.locationName, { timeout: 30000 });
        __page1.logger.info("Successfully verified data. Location name found on the list.");
        __page1 = __page1.clickEditLocationButton();
        __page1 = __page1.enterLocationName(this.locationNameAfterEdit);
        __page1 = __page1.clickClearButton();
        __page1 = __page1.selectCountry(this.countryAfterEdit);
        __page1 = __page1.clickSaveButton();
        expect(__page1.locationName.first()).toContainText(this.locationNameAfterEdit, { timeout: 30000 });
        __page1.logger.info("Successfully verified data. Location found on the list.");
        expect(__page1.countryName.first()).toContainText(this.countryAfterEdit, { timeout: 30000 });
        __page1.logger.info("Successfully verified data. Location this.countryAfterEdit after edit name found on the list.");
        __page1 = __page1.clickTranslationButton();
        __page1 = __page1.clickLocationTranslationDropdown();
        __page1 = __page1.typeEnterLocationName(this.locationNameTranslation);
        __page1 = __page1.clickSaveButton();
        __page1 = __page1.clickSearchLocation(this.locationNameAfterEdit);
        __page1 = __page1.clickTranslationButton();
        __page1 = __page1.clickLocationTranslationDropdown();
        expect(__page1.locationName.first()).toHaveValue(this.locationNameTranslation);
        __page1.logger.info("Successfully verified data. Location translation name contains text.");
        __page1 = __page1.clickSaveButton();
    }
}
