import { CertificateModalPageAssertion } from "assertions/skillspassport/CertificateModalPageAssertion";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { AddCertificateModalPage } from "pages/skillspassport/AddCertificateModalPage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";

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
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .run(new AddRoleAndFamilyToNewUserScenario(this.user.name))
                .goToMePageProfile()
                .goToSkillPassportTab()
                .clickSkillsPassportAddSkillButton()
                .selectCertificateType()
                .selectCertificateFromInput(CreateCertificateWithCertificateIDAsOptionalParameterTest.CERTIFICATE_NAME)
                .selectCertificateLevel(CreateCertificateWithCertificateIDAsOptionalParameterTest.CERTIFICATE_LEVEL)
                .selectCertificateIssuerFromInput(CreateCertificateWithCertificateIDAsOptionalParameterTest.CERTIFICATE_ISSUER)
                .clickSaveButton()
                .clickCertificateCard()
                .check(CertificateModalPageAssertion)
                    .assertThatCertificateIsAdded(CreateCertificateWithCertificateIDAsOptionalParameterTest.CERTIFICATE_NAME)
                .endAssertion()
                .clickEditButton()
                .check(CertificateModalPageAssertion)
                    .assertThatCertificateContainsIssuerName(CreateCertificateWithCertificateIDAsOptionalParameterTest.CERTIFICATE_ISSUER);
    }

    public editAddedCertificateCardWithoutCertificateID(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goDirectlyTo(AddCertificateModalPage,CreateCertificateWithCertificateIDAsOptionalParameterTest.CERTIFICATE_NAME)
                .clickCertificateCard()
                .clickEditButton()
                .selectCertificateIssuerFromInput(CreateCertificateWithCertificateIDAsOptionalParameterTest.NEW_CERTIFICATE_ISSUER)
                .clickSaveButton()
                .clickCertificateCard()
                .clickEditButton()
                .check(CertificateModalPageAssertion)
                    .assertThatCertificateContainsIssuerName(CreateCertificateWithCertificateIDAsOptionalParameterTest.NEW_CERTIFICATE_ISSUER);
    }

    public afterTests(): void {

      this.deleteUser(this.user);

    }
}
