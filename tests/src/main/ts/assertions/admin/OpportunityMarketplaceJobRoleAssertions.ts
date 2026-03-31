// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { OpportunityMarketplaceJobRolePage } from "pages/admin/OpportunityMarketplaceJobRolePage";
import { expect } from "common/testing/playwright";

export class OpportunityMarketplaceJobRoleAssertions extends BaseAssertion<OpportunityMarketplaceJobRolePage> {

    public assertThatEnableJobRolesIsVisible(): OpportunityMarketplaceJobRoleAssertions {
        expect(this.page.enableJobRoles).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Enable job roles is visible");
        return this;
    }

    public assertThatEnableShowUserCarouselIsVisible(): OpportunityMarketplaceJobRoleAssertions {
        expect(this.page.enableShowUserCarousel).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Enable show user carousel is visible");
        return this;
    }

    public assertThatMaxAspirationalRolesIsVisible(): OpportunityMarketplaceJobRoleAssertions {
        expect(this.page.maxAspirationalRoles).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Max aspirational roles is visible");
        return this;
    }

    public assertThatJobRoleLabelIsVisible(): OpportunityMarketplaceJobRoleAssertions {
        expect(this.page.jobRoleLabel).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Job role label is visible");
        return this;
    }

    public assertThatJobRolesLabelIsVisible(): OpportunityMarketplaceJobRoleAssertions {
        expect(this.page.jobRolesLabel).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Job roles label is visible");
        return this;
    }

    public assertThatBrowseJobRolesLabelIsVisible(): OpportunityMarketplaceJobRoleAssertions {
        expect(this.page.browseJobRolesLabel).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Browse job roles label is visible");
        return this;
    }

    public assertThatSelectaRoleLabelIsVisible(): OpportunityMarketplaceJobRoleAssertions {
        expect(this.page.SelectRoleLabel).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Select a role label is visible");
        return this;
    }

    public assertThatCareerExplorationLabelIsVisible(): OpportunityMarketplaceJobRoleAssertions {
        expect(this.page.careerExplorationLabel).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Career exploration label is visible");
        return this;
    }

    public assertThatDiscoverOpportunitiesLabelIsVisible(): OpportunityMarketplaceJobRoleAssertions {
        expect(this.page.discoverOpportunitiesLabel).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Discover opportunities label is visible");
        return this;
    }

    public assertThatLevelRankRestrictionsHeaderIsVisible(): OpportunityMarketplaceJobRoleAssertions {
        expect(this.page.levelRankRestrictionsHeader).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Level ranks restriction header is visible");
        return this;
    }

    public assertThatNumberOfLevelRanksHigherIsVisible(): OpportunityMarketplaceJobRoleAssertions {
        expect(this.page.numberOfLevelRanksHigher).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Number of level ranks higher is visible");
        return this;
    }

    public assertThatNumberOfLevelRanksLowerIsVisible(): OpportunityMarketplaceJobRoleAssertions {
        expect(this.page.numberOfLevelRanksLower).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Number of level ranks lower is visible");
        return this;
    }
}
