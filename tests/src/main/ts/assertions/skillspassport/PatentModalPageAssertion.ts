import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { AddPatentModalPage } from "pages/skillspassport/AddPatentModalPage";

export class PatentModalPageAssertion extends BaseAssertion <AddPatentModalPage> {

    public assertThatPatentIsAdded(patentName: string): PatentModalPageAssertion {
        this.assertThat(this.page.getPatentName()).hasValue(patentName);
        this.page.logger.info("Successfully verified that patent is added");
        return this;
    }
    public assertThatPatentInvestorNameEmpty(): PatentModalPageAssertion {
        this.assertThat(this.page.getPatentInvestorName()).isVisible();
        this.page.logger.info("Successfully verified that Investor's name is empty");
        return this;
    }

    public assertThatPatentContainsPatentDate(date: string): PatentModalPageAssertion {
        this.assertThat(this.page.getPatentDateSpan()).containsText(date);
        this.page.logger.info("Successfully verified that patent contains patent date");
        return this;
    }

    public assertThatPatentContainsURLName(urlName: string): PatentModalPageAssertion {
        this.assertThat(this.page.getPatentURL()).hasValue(urlName);
        this.page.logger.info("Successfully verified that patent contains URL");
        return this;
    }
}
