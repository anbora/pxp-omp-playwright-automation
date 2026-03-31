// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { AddPatentModalPage } from "pages/skillspassport/AddPatentModalPage";
import { expect } from "common/testing/playwright";

export class PatentModalPageAssertion extends BaseAssertion <AddPatentModalPage> {

    public assertThatPatentIsAdded(patentName: string): PatentModalPageAssertion {
        expect(this.page.getPatentName()).toHaveValue(patentName);
        this.page.logger.info("Successfully verified that patent is added");
        return this;
    }
    public assertThatPatentInvestorNameEmpty(): PatentModalPageAssertion {
        expect(this.page.getPatentInvestorName()).toBeVisible();
        this.page.logger.info("Successfully verified that Investor's name is empty");
        return this;
    }

    public assertThatPatentContainsPatentDate(date: string): PatentModalPageAssertion {
        expect(this.page.getPatentDateSpan()).toContainText(date);
        this.page.logger.info("Successfully verified that patent contains patent date");
        return this;
    }

    public assertThatPatentContainsURLName(urlName: string): PatentModalPageAssertion {
        expect(this.page.getPatentURL()).toHaveValue(urlName);
        this.page.logger.info("Successfully verified that patent contains URL");
        return this;
    }
}
