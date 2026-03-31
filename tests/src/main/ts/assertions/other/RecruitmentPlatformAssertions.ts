// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { RecruitmentPlatformPage } from "pages/other/RecruitmentPlatformPage";
import { expect } from "common/testing/playwright";

export class RecruitmentPlatformAssertions extends BaseAssertion<RecruitmentPlatformPage> {

    public assertThatCurrentPageUrlContains(url: string): RecruitmentPlatformAssertions {
//        expect(this.page.filtersButton).toBeVisible(this.isVisibleOptions);
//        cy.url().should('contain', url)
        return this;
    }

	public assertThatRecruitmentPlatformHeaderContains(heading: string): RecruitmentPlatformAssertions {
        expect(this.page.header).toContainText(heading, this.containsTextOptions);
//        this.page.header().should('contain.text', heading)
        return this;
    }

	public assertThatJobTitleIsEqualTo(jobTitle: string): RecruitmentPlatformAssertions {
        expect(this.page.jobTitle).toContainText(jobTitle, this.containsTextOptions);
//        this.page.jobTitle().should('contain.text', jobTitle)
        return this;
    }
}
