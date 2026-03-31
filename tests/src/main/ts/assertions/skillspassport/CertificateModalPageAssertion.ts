// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { AddCertificateModalPage } from "pages/skillspassport/AddCertificateModalPage";
import { expect } from "common/testing/playwright";

export class CertificateModalPageAssertion extends BaseAssertion<AddCertificateModalPage> {

    public assertThatCertificateIsAdded(certificateName: string): CertificateModalPageAssertion {
        expect(this.page.getCertificateCardName()).toContainText(certificateName);
        this.page.logger.info("Successfully verified that certificate is added");
        return this;
    }

    public assertThatCertificateIsDeleted(): CertificateModalPageAssertion {
        expect(this.page.getCertificateCard()).toBeHidden();
        this.page.logger.info("Successfully verified that certificate is deleted");
        return this;
    }

    public assertThatCertificateContainsIssuerName(issuerName: string): CertificateModalPageAssertion {
        expect(this.page.getCertificateIssuer()).toHaveValue(issuerName);
        this.page.logger.info("Successfully verified that certificate contains Issuer Name");
        return this;
    }

    public assertThatCertificateContainsIDNumber(idNumber: string): CertificateModalPageAssertion {
        expect(this.page.getCertificateCardID()).toHaveValue(idNumber);
        this.page.logger.info("Successfully verified that certificate contains ID Number");
        return this;
    }
    public assertThatCertificateContainsURLName(urlName: string): CertificateModalPageAssertion {
        expect(this.page.getCertificateURL()).toHaveValue(urlName);
        this.page.logger.info("Successfully verified that certificate contains URL Name");
        return this;
    }
}
