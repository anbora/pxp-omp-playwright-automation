import { CertificateModalPageAssertion } from "assertions/skillspassport/CertificateModalPageAssertion";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { AddCertificateModalPage } from "pages/skillspassport/AddCertificateModalPage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";

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
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .run(new AddRoleAndFamilyToNewUserScenario(this.user.name))
                .goToMePageProfile()
                .goToSkillPassportTab()
                .clickSkillsPassportAddSkillButton()
                .selectCertificateType()
                .selectCertificateFromInput(CreateCertificateCardWithCertificateIDAndCertificateURLTest.CERTIFICATE_NAME)
                .selectCertificateLevel(CreateCertificateCardWithCertificateIDAndCertificateURLTest.CERTIFICATE_LEVEL)
                .selectCertificateIssuerFromInput(CreateCertificateCardWithCertificateIDAndCertificateURLTest.CERTIFICATE_ISSUER)
                .selectCertificateIDFromInput(CreateCertificateCardWithCertificateIDAndCertificateURLTest.ID_NUMBER)
                .selectCertificateURLFromInput(CreateCertificateCardWithCertificateIDAndCertificateURLTest.URL_NAME)
                .clickSaveButton()
                .clickCertificateCard()
                .check(CertificateModalPageAssertion)
                    .assertThatCertificateIsAdded(CreateCertificateCardWithCertificateIDAndCertificateURLTest.CERTIFICATE_NAME)
                .endAssertion()
                .clickEditButton()
                .check(CertificateModalPageAssertion)
                    .assertThatCertificateContainsIDNumber(CreateCertificateCardWithCertificateIDAndCertificateURLTest.ID_NUMBER)
                    .assertThatCertificateContainsURLName(CreateCertificateCardWithCertificateIDAndCertificateURLTest.URL_NAME)
                .endAssertion();
    }

    public deleteAddedCertificateCard(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goDirectlyTo(AddCertificateModalPage,CreateCertificateCardWithCertificateIDAndCertificateURLTest.CERTIFICATE_NAME)
                .clickCertificateCard()
                .clickDeleteButton()
                .clickConfirmButton()
                .check(CertificateModalPageAssertion)
                    .assertThatCertificateIsDeleted();
    }

    public afterTests(): void {

      this.deleteUser(this.user);

    }
}
