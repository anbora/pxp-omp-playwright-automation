import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { OpportunityMarketplaceProjectPage } from "pages/admin/OpportunityMarketplaceProjectPage";

export class OpportunityMarketplaceProjectAssertions extends BaseAssertion<OpportunityMarketplaceProjectPage> {

    public assertThatEnableProjectIsVisible(): OpportunityMarketplaceProjectAssertions {
        this.assertThat(this.page.enableProject).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Enable project is visible");
        return this;
    }

    public assertThatProjectLabelIsVisible(): OpportunityMarketplaceProjectAssertions {
        this.assertThat(this.page.project).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Project label is visible");
        return this;
    }

    public assertThatProjectsLabelIsVisible(): OpportunityMarketplaceProjectAssertions {
        this.assertThat(this.page.projects).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Projects label is visible");
        return this;
    }

    public assertThatExpandYourKnowledgeLabelIsVisible(): OpportunityMarketplaceProjectAssertions {
        this.assertThat(this.page.expandYourKnowledge).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Expand your knowledge label is visible");
        return this;
    }

    public assertThatRequireApplicantMessageLabelIsVisible(): OpportunityMarketplaceProjectAssertions {
        this.assertThat(this.page.requireApplicantMessage).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Require Applicant Message label is visible");
        return this;
    }

    public assertThatShowManagerPermissionLabelIsVisible(): OpportunityMarketplaceProjectAssertions {
        this.assertThat(this.page.showManagerPermission).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Require Applicant Message label is visible");
        return this;
    }

    public assertThatAdminProjectConfigPageLoads(): OpportunityMarketplaceProjectAssertions {
        this.assertThat(this.page.projectConfigShowHideColumHeader).isVisible(this.isVisibleOptions);
        this.assertThat(this.page.projectConfigRequiredColumHeader).isVisible(this.isVisibleOptions);
        return this;
    }
}
