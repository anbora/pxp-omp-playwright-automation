import { EditFieldModalAssertions } from "assertions/admin/EditFieldModalAssertions";
import { HrDataConfigurationStandardFieldAssertion } from "assertions/admin/hrdata/configuration/HrDataConfigurationStandardFieldAssertion";
import { LanguageModalAssertions } from "assertions/admin/LanguageModalAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { ResultContainer } from "models/ResultContainer";
import { UserModel } from "models/user/UserModel";
import { HrDataConfigurationPage } from "pages/admin/hrdata/configuration/HrDataConfigurationPage";
import { HrDataConfigurationStandardFieldPage } from "pages/admin/hrdata/configuration/HrDataConfigurationStandardFieldPage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

export class HrDataCountryFieldTest extends BaseRestTest {

    private worldwideCountryName: string = "Worldwide";
    private worldwideCountryKey: string = "WW";
    private czechLanguage: string = "Czech (Čeština)";
    private translation: string = "TranslationTest for Worldwide";
    private hrData: string = "HR Data";
    private secondRowIndex: string = "3";
    private thirdRowIndex: string = "4";

    private secondRowResultContainer: ResultContainer = new ResultContainer();
    private thirdRowResultContainer: ResultContainer = new ResultContainer();;

    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public prepareBeforeTests(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .goToAdminPanel()
                .selectMainTab(this.hrData)
                .openMenuForHrConfiguration()
                .gotoStandardFieldPage()
                .clickInCountryFieldEditIcon()
                .clickSetLanguage(this.worldwideCountryName)
                .deleteTranslation(this.czechLanguage)
                .setLanguages()
                .clickSave(HrDataConfigurationStandardFieldPage);
    }

    public shouldCheckCountryFieldExistWithTranslations(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToAdminPanel()
                .selectMainTab(this.hrData)
                .openMenuForHrConfiguration()
                .gotoStandardFieldPage()
                .check(HrDataConfigurationStandardFieldAssertion)
                    .assertThatCountryLabelIsVisible()
                .endAssertion()
                .clickInCountryFieldEditIcon()
                .check(EditFieldModalAssertions)
                    .assertThatDefaultLabelForFirstElementIsVisible(this.worldwideCountryName)
                    .assertThatKeyForFirstElementIsVisible(this.worldwideCountryKey)
                    .assertThatFirstElementIsEnable()
                .endAssertion()
                .clickSetLanguage(this.worldwideCountryName)
                .selectLanguage(this.czechLanguage)
                .clickAddLanguage()
                .typeTranslation(this.czechLanguage, this.translation)
                .check(LanguageModalAssertions)
                    .assertThatTranslationForLanguageContains(this.czechLanguage, this.translation)
                .endAssertion()
                .setLanguages()
                .clickSave(HrDataConfigurationStandardFieldPage)
                .refreshCurrentPage(HrDataConfigurationPage)
                .gotoStandardFieldPage()
                .clickInCountryFieldEditIcon()
                .clickSetLanguage(this.worldwideCountryName)
                .check(LanguageModalAssertions)
                    .assertThatTranslationForLanguageContains(this.czechLanguage, this.translation)
                .endAssertion()
                .deleteTranslation(this.czechLanguage)
                .setLanguages()
                .clickSave(HrDataConfigurationStandardFieldPage);
    }

    public shouldCheckThatDragAndDropWorksAsExpected(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToAdminPanel()
                .selectMainTab(this.hrData)
                .openMenuForHrConfiguration()
                .gotoStandardFieldPage()
                .clickInCountryFieldEditIcon()
                .getElementDefaultValueByIndex(this.secondRowResultContainer, this.secondRowIndex)
                .getElementDefaultValueByIndex(this.thirdRowResultContainer, this.thirdRowIndex)
                .check(EditFieldModalAssertions)
                    .assertThatDefaultLabelForElementByIndexIsContains(this.secondRowIndex, this.secondRowResultContainer.getValue())
                    .assertThatDefaultLabelForElementByIndexIsContains(this.thirdRowIndex, this.thirdRowResultContainer.getValue())
                .endAssertion()
                .changeOrderOfTheElements(this.secondRowIndex, this.thirdRowIndex)
                .check(EditFieldModalAssertions)
                    .assertThatDefaultLabelForElementByIndexIsContains(this.secondRowIndex, this.thirdRowResultContainer.getValue())
                    .assertThatDefaultLabelForElementByIndexIsContains(this.thirdRowIndex, this.secondRowResultContainer.getValue())
                .endAssertion()
                .clickSave(HrDataConfigurationStandardFieldPage)
                .refreshCurrentPage(HrDataConfigurationPage)
                .gotoStandardFieldPage()
                .clickInCountryFieldEditIcon()
                .check(EditFieldModalAssertions)
                    .assertThatDefaultLabelForElementByIndexIsContains(this.secondRowIndex, this.thirdRowResultContainer.getValue())
                    .assertThatDefaultLabelForElementByIndexIsContains(this.thirdRowIndex, this.secondRowResultContainer.getValue())
                .endAssertion();
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
