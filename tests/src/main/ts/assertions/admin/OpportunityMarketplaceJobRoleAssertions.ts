import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { OpportunityMarketplaceJobRolePage } from "pages/admin/OpportunityMarketplaceJobRolePage";

export class OpportunityMarketplaceJobRoleAssertions extends BaseAssertion<OpportunityMarketplaceJobRolePage> {

    public assertThatEnableJobRolesIsVisible(): OpportunityMarketplaceJobRoleAssertions {
        this.assertThat(this.page.enableJobRoles).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Enable job roles is visible");
        return this;
    }

    public assertThatEnableShowUserCarouselIsVisible(): OpportunityMarketplaceJobRoleAssertions {
        this.assertThat(this.page.enableShowUserCarousel).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Enable show user carousel is visible");
        return this;
    }

    public assertThatMaxAspirationalRolesIsVisible(): OpportunityMarketplaceJobRoleAssertions {
        this.assertThat(this.page.maxAspirationalRoles).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Max aspirational roles is visible");
        return this;
    }

    public assertThatJobRoleLabelIsVisible(): OpportunityMarketplaceJobRoleAssertions {
        this.assertThat(this.page.jobRoleLabel).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Job role label is visible");
        return this;
    }

    public assertThatJobRolesLabelIsVisible(): OpportunityMarketplaceJobRoleAssertions {
        this.assertThat(this.page.jobRolesLabel).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Job roles label is visible");
        return this;
    }

    public assertThatBrowseJobRolesLabelIsVisible(): OpportunityMarketplaceJobRoleAssertions {
        this.assertThat(this.page.browseJobRolesLabel).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Browse job roles label is visible");
        return this;
    }

    public assertThatSelectaRoleLabelIsVisible(): OpportunityMarketplaceJobRoleAssertions {
        this.assertThat(this.page.SelectRoleLabel).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Select a role label is visible");
        return this;
    }

    public assertThatCareerExplorationLabelIsVisible(): OpportunityMarketplaceJobRoleAssertions {
        this.assertThat(this.page.careerExplorationLabel).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Career exploration label is visible");
        return this;
    }

    public assertThatDiscoverOpportunitiesLabelIsVisible(): OpportunityMarketplaceJobRoleAssertions {
        this.assertThat(this.page.discoverOpportunitiesLabel).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Discover opportunities label is visible");
        return this;
    }

    public assertThatLevelRankRestrictionsHeaderIsVisible(): OpportunityMarketplaceJobRoleAssertions {
        this.assertThat(this.page.levelRankRestrictionsHeader).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Level ranks restriction header is visible");
        return this;
    }

    public assertThatNumberOfLevelRanksHigherIsVisible(): OpportunityMarketplaceJobRoleAssertions {
        this.assertThat(this.page.numberOfLevelRanksHigher).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Number of level ranks higher is visible");
        return this;
    }

    public assertThatNumberOfLevelRanksLowerIsVisible(): OpportunityMarketplaceJobRoleAssertions {
        this.assertThat(this.page.numberOfLevelRanksLower).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Number of level ranks lower is visible");
        return this;
    }
}
