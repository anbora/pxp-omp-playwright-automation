// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { ResultContainer } from "models/ResultContainer";
import { UserModel } from "models/user/UserModel";
import { HrDataConfigurationPage } from "pages/admin/hrdata/configuration/HrDataConfigurationPage";
import { HrDataConfigurationStandardFieldPage } from "pages/admin/hrdata/configuration/HrDataConfigurationStandardFieldPage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { expect } from "common/testing/playwright";

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
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginScenario(this.user));
        __page1 = __page1.goToAdminPanel();
        __page1 = __page1.selectMainTab(this.hrData);
        __page1 = __page1.openMenuForHrConfiguration();
        __page1 = __page1.gotoStandardFieldPage();
        expect(__page1.countryFieldLabel).toBeVisible({ timeout: 30000 });
        __page1 = __page1.clickInCountryFieldEditIcon();
        expect(__page1.firstRowDefaultLabel(this.worldwideCountryName)).toBeVisible({ timeout: 30000 });
        expect(__page1.firstRowKey(this.worldwideCountryKey)).toBeVisible({ timeout: 30000 });
        expect(__page1.firstRowEnabled).toBeVisible({ timeout: 30000 });
        __page1 = __page1.clickSetLanguage(this.worldwideCountryName);
        __page1 = __page1.selectLanguage(this.czechLanguage);
        __page1 = __page1.clickAddLanguage();
        __page1 = __page1.typeTranslation(this.czechLanguage, this.translation);
        expect(__page1.translatedTextInput(this.czechLanguage)).toHaveValue(this.translation, { timeout: 30000 });
        __page1 = __page1.setLanguages();
        __page1 = __page1.clickSave(HrDataConfigurationStandardFieldPage);
        __page1 = __page1.refreshCurrentPage(HrDataConfigurationPage);
        __page1 = __page1.gotoStandardFieldPage();
        __page1 = __page1.clickInCountryFieldEditIcon();
        __page1 = __page1.clickSetLanguage(this.worldwideCountryName);
        expect(__page1.translatedTextInput(this.czechLanguage)).toHaveValue(this.translation, { timeout: 30000 });
        __page1 = __page1.deleteTranslation(this.czechLanguage);
        __page1 = __page1.setLanguages();
        __page1 = __page1.clickSave(HrDataConfigurationStandardFieldPage);
    }

    public shouldCheckThatDragAndDropWorksAsExpected(): void {
                let __page2: any = this;
        __page2 = __page2.getOmpLoginPage();
        __page2 = __page2.run(new LoginScenario(this.user));
        __page2 = __page2.goToAdminPanel();
        __page2 = __page2.selectMainTab(this.hrData);
        __page2 = __page2.openMenuForHrConfiguration();
        __page2 = __page2.gotoStandardFieldPage();
        __page2 = __page2.clickInCountryFieldEditIcon();
        __page2 = __page2.getElementDefaultValueByIndex(this.secondRowResultContainer, this.secondRowIndex);
        __page2 = __page2.getElementDefaultValueByIndex(this.thirdRowResultContainer, this.thirdRowIndex);
        expect(__page2.rowDefaultLabel(this.secondRowIndex)).toContainText(this.secondRowResultContainer.getValue(), { timeout: 30000 });
        expect(__page2.rowDefaultLabel(this.thirdRowIndex)).toContainText(this.thirdRowResultContainer.getValue(), { timeout: 30000 });
        __page2 = __page2.changeOrderOfTheElements(this.secondRowIndex, this.thirdRowIndex);
        expect(__page2.rowDefaultLabel(this.secondRowIndex)).toContainText(this.thirdRowResultContainer.getValue(), { timeout: 30000 });
        expect(__page2.rowDefaultLabel(this.thirdRowIndex)).toContainText(this.secondRowResultContainer.getValue(), { timeout: 30000 });
        __page2 = __page2.clickSave(HrDataConfigurationStandardFieldPage);
        __page2 = __page2.refreshCurrentPage(HrDataConfigurationPage);
        __page2 = __page2.gotoStandardFieldPage();
        __page2 = __page2.clickInCountryFieldEditIcon();
        expect(__page2.rowDefaultLabel(this.secondRowIndex)).toContainText(this.thirdRowResultContainer.getValue(), { timeout: 30000 });
        expect(__page2.rowDefaultLabel(this.thirdRowIndex)).toContainText(this.secondRowResultContainer.getValue(), { timeout: 30000 });
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
