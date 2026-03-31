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

export class CreateCertificateCardWithCertificateIDAndCertificateURLTest extends BaseRestTest {

    private static readonly UNIQUE_SUFFIX: string = UUID.randomUUID().toString();
    private static readonly RANDOM_SUFFIX: string = RandomStringUtils.randomAlphabetic(10);
    private static readonly CERTIFICATE_NAME: string = "EN Certificate" + CreateCertificateCardWithCertificateIDAndCertificateURLTest.RANDOM_SUFFIX;
    private static readonly CERTIFICATE_LEVEL: string = "Beginner";
    private static readonly CERTIFICATE_ISSUER: string = "Issuer-"  + CreateCertificateCardWithCertificateIDAndCertificateURLTest.RANDOM_SUFFIX;
    private static readonly ID_NUMBER: string = "ID-"  + CreateCertificateCardWithCertificateIDAndCertificateURLTest.UNIQUE_SUFFIX;
    private static readonly URL_NAME: string = "http://" + CreateCertificateCardWithCertificateIDAndCertificateURLTest.RANDOM_SUFFIX + "edcast.com";
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser();

    }

    public addCertificateCardWithCertificateIDAndCertificateURL(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.run(new AddRoleAndFamilyToNewUserScenario(this.user.name));
        __page1 = __page1.goToMePageProfile();
        __page1 = __page1.goToSkillPassportTab();
        __page1 = __page1.clickSkillsPassportAddSkillButton();
        __page1 = __page1.selectCertificateType();
        __page1 = __page1.selectCertificateFromInput(CreateCertificateCardWithCertificateIDAndCertificateURLTest.CERTIFICATE_NAME);
        __page1 = __page1.selectCertificateLevel(CreateCertificateCardWithCertificateIDAndCertificateURLTest.CERTIFICATE_LEVEL);
        __page1 = __page1.selectCertificateIssuerFromInput(CreateCertificateCardWithCertificateIDAndCertificateURLTest.CERTIFICATE_ISSUER);
        __page1 = __page1.selectCertificateIDFromInput(CreateCertificateCardWithCertificateIDAndCertificateURLTest.ID_NUMBER);
        __page1 = __page1.selectCertificateURLFromInput(CreateCertificateCardWithCertificateIDAndCertificateURLTest.URL_NAME);
        __page1 = __page1.clickSaveButton();
        __page1 = __page1.clickCertificateCard();
        expect(__page1.getCertificateCardName()).toContainText(CreateCertificateCardWithCertificateIDAndCertificateURLTest.CERTIFICATE_NAME);
        __page1.logger.info("Successfully verified that certificate is added");
        __page1 = __page1.clickEditButton();
        expect(__page1.getCertificateCardID()).toHaveValue(CreateCertificateCardWithCertificateIDAndCertificateURLTest.ID_NUMBER);
        __page1.logger.info("Successfully verified that certificate contains ID Number");
        expect(__page1.getCertificateURL()).toHaveValue(CreateCertificateCardWithCertificateIDAndCertificateURLTest.URL_NAME);
        __page1.logger.info("Successfully verified that certificate contains URL Name");
    }

    public deleteAddedCertificateCard(): void {
                let __page2: any = this;
        __page2 = __page2.getOmpLoginPage();
        __page2 = __page2.run(new LoginScenario(this.user));
        __page2 = __page2.goDirectlyTo(AddCertificateModalPage, CreateCertificateCardWithCertificateIDAndCertificateURLTest.CERTIFICATE_NAME);
        __page2 = __page2.clickCertificateCard();
        __page2 = __page2.clickDeleteButton();
        __page2 = __page2.clickConfirmButton();
        expect(__page2.getCertificateCard()).toBeHidden();
        __page2.logger.info("Successfully verified that certificate is deleted");
    }

    public afterTests(): void {

      this.deleteUser(this.user);

    }
}
