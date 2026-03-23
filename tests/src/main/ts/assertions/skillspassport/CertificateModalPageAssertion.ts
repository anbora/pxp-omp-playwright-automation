import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { AddCertificateModalPage } from "pages/skillspassport/AddCertificateModalPage";

export class CertificateModalPageAssertion extends BaseAssertion<AddCertificateModalPage> {

    public assertThatCertificateIsAdded(certificateName: string): CertificateModalPageAssertion {
        this.assertThat(this.page.getCertificateCardName()).containsText(certificateName);
        this.page.logger.info("Successfully verified that certificate is added");
        return this;
    }

    public assertThatCertificateIsDeleted(): CertificateModalPageAssertion {
        this.assertThat(this.page.getCertificateCard()).isHidden();
        this.page.logger.info("Successfully verified that certificate is deleted");
        return this;
    }

    public assertThatCertificateContainsIssuerName(issuerName: string): CertificateModalPageAssertion {
        this.assertThat(this.page.getCertificateIssuer()).hasValue(issuerName);
        this.page.logger.info("Successfully verified that certificate contains Issuer Name");
        return this;
    }

    public assertThatCertificateContainsIDNumber(idNumber: string): CertificateModalPageAssertion {
        this.assertThat(this.page.getCertificateCardID()).hasValue(idNumber);
        this.page.logger.info("Successfully verified that certificate contains ID Number");
        return this;
    }
    public assertThatCertificateContainsURLName(urlName: string): CertificateModalPageAssertion {
        this.assertThat(this.page.getCertificateURL()).hasValue(urlName);
        this.page.logger.info("Successfully verified that certificate contains URL Name");
        return this;
    }
}
