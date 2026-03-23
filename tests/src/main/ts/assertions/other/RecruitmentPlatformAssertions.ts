import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { RecruitmentPlatformPage } from "pages/other/RecruitmentPlatformPage";

export class RecruitmentPlatformAssertions extends BaseAssertion<RecruitmentPlatformPage> {

    public assertThatCurrentPageUrlContains(url: string): RecruitmentPlatformAssertions {
//        assertThat(this.page.filtersButton).isVisible(this.isVisibleOptions);
//        cy.url().should('contain', url)
        return this;
    }

	public assertThatRecruitmentPlatformHeaderContains(heading: string): RecruitmentPlatformAssertions {
        this.assertThat(this.page.header).containsText(heading, this.containsTextOptions);
//        this.page.header().should('contain.text', heading)
        return this;
    }

	public assertThatJobTitleIsEqualTo(jobTitle: string): RecruitmentPlatformAssertions {
        this.assertThat(this.page.jobTitle).containsText(jobTitle, this.containsTextOptions);
//        this.page.jobTitle().should('contain.text', jobTitle)
        return this;
    }
}
