// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { OpportunityMarketplaceProjectPage } from "pages/admin/OpportunityMarketplaceProjectPage";
import { expect } from "common/testing/playwright";

export class OpportunityMarketplaceProjectAssertions extends BaseAssertion<OpportunityMarketplaceProjectPage> {

    public assertThatEnableProjectIsVisible(): OpportunityMarketplaceProjectAssertions {
        expect(this.page.enableProject).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Enable project is visible");
        return this;
    }

    public assertThatProjectLabelIsVisible(): OpportunityMarketplaceProjectAssertions {
        expect(this.page.project).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Project label is visible");
        return this;
    }

    public assertThatProjectsLabelIsVisible(): OpportunityMarketplaceProjectAssertions {
        expect(this.page.projects).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Projects label is visible");
        return this;
    }

    public assertThatExpandYourKnowledgeLabelIsVisible(): OpportunityMarketplaceProjectAssertions {
        expect(this.page.expandYourKnowledge).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Expand your knowledge label is visible");
        return this;
    }

    public assertThatRequireApplicantMessageLabelIsVisible(): OpportunityMarketplaceProjectAssertions {
        expect(this.page.requireApplicantMessage).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Require Applicant Message label is visible");
        return this;
    }

    public assertThatShowManagerPermissionLabelIsVisible(): OpportunityMarketplaceProjectAssertions {
        expect(this.page.showManagerPermission).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Require Applicant Message label is visible");
        return this;
    }

    public assertThatAdminProjectConfigPageLoads(): OpportunityMarketplaceProjectAssertions {
        expect(this.page.projectConfigShowHideColumHeader).toBeVisible(this.isVisibleOptions);
        expect(this.page.projectConfigRequiredColumHeader).toBeVisible(this.isVisibleOptions);
        return this;
    }
}
