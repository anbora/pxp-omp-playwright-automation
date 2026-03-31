// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { expect } from "common/testing/playwright";

export class HrDataJobFamiliesTest extends BaseRestTest {

    private hrData: string = "HR Data";
    private familyName: string = UUID.randomUUID().toString();
    private familyNameAfterEdit: string = UUID.randomUUID().toString();
    private familyNameTranslation: string = UUID.randomUUID().toString();
    private familyDescription: string = UUID.randomUUID().toString();
    private familyDescriptionTranslation: string = UUID.randomUUID().toString();
    private functionName: string = "QA Job Function (DO NOT TOUCH)";
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public createAndEditJobFamilyAndTranslationViaAdminPage(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.goToAdminPanel();
        __page1 = __page1.selectMainTab(this.hrData);
        __page1 = __page1.openMenuForJobFamiliesHRData();
        __page1 = __page1.clickAddJobFamilyButton();
        __page1 = __page1.typeEnterJobTitle(this.familyName);
        __page1 = __page1.typeFamilyDescription(this.familyDescription);
        __page1 = __page1.selectFunction(this.functionName);
        __page1 = __page1.clickSaveButton();
        __page1 = __page1.clickSearchJobFamily(this.familyName);
        expect(__page1.familyName.first()).toContainText(this.familyName, { timeout: 30000 });
        __page1.logger.info("Successfully verified data. Job family name found on the list.");
        __page1 = __page1.clickEditJobFamilyButton();
        __page1 = __page1.typeEnterJobTitle(this.familyNameAfterEdit);
        __page1 = __page1.clickSaveButton();
        __page1 = __page1.clickSearchJobFamily(this.familyNameAfterEdit);
        expect(__page1.familyName.first()).toContainText(this.familyNameAfterEdit, { timeout: 30000 });
        __page1.logger.info("Successfully verified data. Job family name found on the list.");
        __page1 = __page1.clickTranslationButton();
        __page1 = __page1.clickTranslationDropdown();
        __page1 = __page1.typeEnterFamilyName(this.familyNameTranslation);
        __page1 = __page1.typeEnterFamilyDescription(this.familyDescriptionTranslation);
        __page1 = __page1.clickSaveButton();
        __page1 = __page1.clickSearchJobFamily(this.familyNameAfterEdit);
        __page1 = __page1.clickTranslationButton();
        __page1 = __page1.clickTranslationDropdown();
        expect(__page1.familyName.first()).toHaveValue(this.familyNameTranslation);
        __page1.logger.info("Successfully verified data. Job family translation name contains text.");
        expect(__page1.familyDescription.first()).toContainText(this.familyDescriptionTranslation, { timeout: 30000 });
        __page1.logger.info("Successfully verified data. Job family translation description contains text.");
        __page1 = __page1.clickSaveButton();
        __page1 = __page1.clickSearchJobFamily(this.familyNameAfterEdit);
        __page1 = __page1.clickEditJobFamilyButton();
        __page1 = __page1.clickDeleteJobFamilyButton();
        __page1 = __page1.clickAreYouSureDeleteJobFamilyButton();
        __page1 = __page1.clickSearchJobFamily(this.familyNameAfterEdit);
        expect(__page1.searchResults.first()).toContainText("There are no records available yet", { timeout: 30000 });
        __page1.logger.info("Successfully verified data. Job family name not found on the list.");
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
