import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { OpportunityMarketplaceGeneralPage } from "pages/admin/OpportunityMarketplaceGeneralPage";

export class OpportunityMarketplaceGeneralAssertions extends BaseAssertion<OpportunityMarketplaceGeneralPage> {

    public assertThatEnableOpportunityMarketplaceIsVisible(): OpportunityMarketplaceGeneralAssertions {
        this.assertThat(this.page.enableOpportunityMarketplace).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Enable opportunity marketplace is visible");
        return this;
    }

    public assertThatEnableLandingPageIsVisible(): OpportunityMarketplaceGeneralAssertions {
        this.assertThat(this.page.enableLandingPage).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Enable landing this.page is visible");
        return this;
    }

    public assertWelcomeLabelIsVisible(): OpportunityMarketplaceGeneralAssertions {
        this.assertThat(this.page.welcomeLabel).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Welcome label is visible");
        return this;
    }

    public assertThatWelcomeToOpportunityMarketplaceLabelIsVisible(): OpportunityMarketplaceGeneralAssertions {
        this.assertThat(this.page.welcomeToOpportunityMarketplaceLabel).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Welcome to opportunity marketplace label is visible");
        return this;
    }

    public assertThatJobFamilyLabelIsVisible(): OpportunityMarketplaceGeneralAssertions {
        this.assertThat(this.page.jabFamilyLabel).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Job family label is visible");
        return this;
    }

    public assertThatSuggestionsLabelIsVisible(): OpportunityMarketplaceGeneralAssertions {
        this.assertThat(this.page.suggestionsLabel).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Suggestions label is visible");
        return this;
    }

    public assertThatJustForYouLabelIsVisible(): OpportunityMarketplaceGeneralAssertions {
        this.assertThat(this.page.justForYouLabel).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Just for you label is visible");
        return this;
    }

    public assertThatLetUsKnowLabelIsVisible(): OpportunityMarketplaceGeneralAssertions {
        this.assertThat(this.page.letUsKnowLabel).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Let us know label is visible");
        return this;
    }

    public assertThatWorkplaceModelIsVisible(): OpportunityMarketplaceGeneralAssertions {
        this.assertThat(this.page.workplaceModelLabel).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Workplace model label is visible");
        return this;
    }

    public assertThatJobTypeLabelIsVisible(): OpportunityMarketplaceGeneralAssertions {
        this.assertThat(this.page.jobTypeLabel).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Job type label is visible");
        return this;
    }

    public assertThatScheduleLabelIsVisible(): OpportunityMarketplaceGeneralAssertions {
        this.assertThat(this.page.scheduleLabel).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Schedule label is visible");
        return this;
    }

    public assertThatCareerGoalLabelIsVisible(): OpportunityMarketplaceGeneralAssertions {
        this.assertThat(this.page.careerGoalLabel).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Career goal label is visible");
        return this;
    }

    public assertThatOpenToOffersLabelIsVisible(): OpportunityMarketplaceGeneralAssertions {
        this.assertThat(this.page.openToOffersLabel).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Open to offers label is visible");
        return this;
    }

    public assertThatActionForMatchLevelIsAvailable(matchLevel: string): OpportunityMarketplaceGeneralAssertions {
        this.assertThat(this.page.matchLevelAction(matchLevel)).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified that action is displayed for '" + matchLevel + "' level.");
        return this;
    }

    public assertThatIconSetRadiobuttonIsPresent(iconSet: string): OpportunityMarketplaceGeneralAssertions {
        this.assertThat(this.page.iconSetRadiobutton(iconSet)).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified that icon set '" + iconSet + "' is displayed.");
        return this;
    }

    public assertThatIconSetIsSelected(iconSet: string): OpportunityMarketplaceGeneralAssertions {
        this.assertThat(this.page.iconSetRadiobutton(iconSet)).isChecked();
        this.page.logger.info("Successfully verified that icon set '" + iconSet + "' is checked.");
        return this;
    }
}
