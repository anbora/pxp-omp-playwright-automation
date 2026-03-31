// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { AddCertificateModalPage } from "pages/skillspassport/AddCertificateModalPage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";
import { expect } from "common/testing/playwright";

export class CreateCertificateWithCertificateIDAsOptionalParameterTest extends BaseRestTest {

    private static readonly UNIQUE_SUFFIX: string = UUID.randomUUID().toString();
    private static readonly RANDOM_SUFFIX: string = RandomStringUtils.randomAlphabetic(10);
    private static readonly CERTIFICATE_NAME: string = "EN Certificate" + CreateCertificateWithCertificateIDAsOptionalParameterTest.RANDOM_SUFFIX;
    private static readonly CERTIFICATE_LEVEL: string = "Beginner";
    private static readonly CERTIFICATE_ISSUER: string = "Issuer-"  + CreateCertificateWithCertificateIDAsOptionalParameterTest.UNIQUE_SUFFIX;
    private static readonly NEW_CERTIFICATE_ISSUER: string = "New Issuer" + CreateCertificateWithCertificateIDAsOptionalParameterTest.UNIQUE_SUFFIX;;
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser();

    }

    public addCertificateCardWithoutCertificateID(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.run(new AddRoleAndFamilyToNewUserScenario(this.user.name));
        __page1 = __page1.goToMePageProfile();
        __page1 = __page1.goToSkillPassportTab();
        __page1 = __page1.clickSkillsPassportAddSkillButton();
        __page1 = __page1.selectCertificateType();
        __page1 = __page1.selectCertificateFromInput(CreateCertificateWithCertificateIDAsOptionalParameterTest.CERTIFICATE_NAME);
        __page1 = __page1.selectCertificateLevel(CreateCertificateWithCertificateIDAsOptionalParameterTest.CERTIFICATE_LEVEL);
        __page1 = __page1.selectCertificateIssuerFromInput(CreateCertificateWithCertificateIDAsOptionalParameterTest.CERTIFICATE_ISSUER);
        __page1 = __page1.clickSaveButton();
        __page1 = __page1.clickCertificateCard();
        expect(__page1.getCertificateCardName()).toContainText(CreateCertificateWithCertificateIDAsOptionalParameterTest.CERTIFICATE_NAME);
        __page1.logger.info("Successfully verified that certificate is added");
        __page1 = __page1.clickEditButton();
        expect(__page1.getCertificateIssuer()).toHaveValue(CreateCertificateWithCertificateIDAsOptionalParameterTest.CERTIFICATE_ISSUER);
        __page1.logger.info("Successfully verified that certificate contains Issuer Name");
    }

    public editAddedCertificateCardWithoutCertificateID(): void {
                let __page2: any = this;
        __page2 = __page2.getOmpLoginPage();
        __page2 = __page2.run(new LoginScenario(this.user));
        __page2 = __page2.goDirectlyTo(AddCertificateModalPage, CreateCertificateWithCertificateIDAsOptionalParameterTest.CERTIFICATE_NAME);
        __page2 = __page2.clickCertificateCard();
        __page2 = __page2.clickEditButton();
        __page2 = __page2.selectCertificateIssuerFromInput(CreateCertificateWithCertificateIDAsOptionalParameterTest.NEW_CERTIFICATE_ISSUER);
        __page2 = __page2.clickSaveButton();
        __page2 = __page2.clickCertificateCard();
        __page2 = __page2.clickEditButton();
        expect(__page2.getCertificateIssuer()).toHaveValue(CreateCertificateWithCertificateIDAsOptionalParameterTest.NEW_CERTIFICATE_ISSUER);
        __page2.logger.info("Successfully verified that certificate contains Issuer Name");
    }

    public afterTests(): void {

      this.deleteUser(this.user);

    }
}
