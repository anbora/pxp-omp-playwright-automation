import { HrDataEditLocationAssertions } from "assertions/admin/hrdata/HrDataEditLocationAssertions";
import { HrDataLocationAssertions } from "assertions/admin/hrdata/HrDataLocationAssertions";
import { HrDataLocationTranslationAssertions } from "assertions/admin/hrdata/HrDataLocationTranslationAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

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
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .goToAdminPanel()
                .selectMainTab(this.hrData)
                .openMenuForLocationHRData()
                .clickAddLocationButton()
                .enterLocationName(this.locationName)
                .selectCountry(this.country)
                .clickSaveButton()
                .clickSearchLocation(this.locationName)
                .check(HrDataLocationAssertions)
                    .assertThatLocationIsDisplayedOnTheList(this.locationName)
                .endAssertion()
                .clickEditLocationButton()
                .enterLocationName(this.locationNameAfterEdit)
                .clickClearButton()
                .selectCountry(this.countryAfterEdit)
                .clickSaveButton()
                .check(HrDataEditLocationAssertions)
                    .assertThatLocationNameIsDisplayedOnTheList(this.locationNameAfterEdit)
                    .assertThatLocationCountryEditIsDisplayedOnTheList(this.countryAfterEdit)
                .endAssertion()
                .clickTranslationButton()
                .clickLocationTranslationDropdown()
                .typeEnterLocationName(this.locationNameTranslation)
                .clickSaveButton()
                .clickSearchLocation(this.locationNameAfterEdit)
                .clickTranslationButton()
                .clickLocationTranslationDropdown()
                .check(HrDataLocationTranslationAssertions)
                    .assertThatLocationTranslationIsDisplayed(this.locationNameTranslation)
                .endAssertion()
                .clickSaveButton();
    }
}
