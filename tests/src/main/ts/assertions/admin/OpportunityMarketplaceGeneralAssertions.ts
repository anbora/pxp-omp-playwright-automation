// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { OpportunityMarketplaceGeneralPage } from "pages/admin/OpportunityMarketplaceGeneralPage";
import { expect } from "common/testing/playwright";

export class OpportunityMarketplaceGeneralAssertions extends BaseAssertion<OpportunityMarketplaceGeneralPage> {

    public assertThatEnableOpportunityMarketplaceIsVisible(): OpportunityMarketplaceGeneralAssertions {
        expect(this.page.enableOpportunityMarketplace).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Enable opportunity marketplace is visible");
        return this;
    }

    public assertThatEnableLandingPageIsVisible(): OpportunityMarketplaceGeneralAssertions {
        expect(this.page.enableLandingPage).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Enable landing this.page is visible");
        return this;
    }

    public assertWelcomeLabelIsVisible(): OpportunityMarketplaceGeneralAssertions {
        expect(this.page.welcomeLabel).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Welcome label is visible");
        return this;
    }

    public assertThatWelcomeToOpportunityMarketplaceLabelIsVisible(): OpportunityMarketplaceGeneralAssertions {
        expect(this.page.welcomeToOpportunityMarketplaceLabel).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Welcome to opportunity marketplace label is visible");
        return this;
    }

    public assertThatJobFamilyLabelIsVisible(): OpportunityMarketplaceGeneralAssertions {
        expect(this.page.jabFamilyLabel).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Job family label is visible");
        return this;
    }

    public assertThatSuggestionsLabelIsVisible(): OpportunityMarketplaceGeneralAssertions {
        expect(this.page.suggestionsLabel).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Suggestions label is visible");
        return this;
    }

    public assertThatJustForYouLabelIsVisible(): OpportunityMarketplaceGeneralAssertions {
        expect(this.page.justForYouLabel).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Just for you label is visible");
        return this;
    }

    public assertThatLetUsKnowLabelIsVisible(): OpportunityMarketplaceGeneralAssertions {
        expect(this.page.letUsKnowLabel).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Let us know label is visible");
        return this;
    }

    public assertThatWorkplaceModelIsVisible(): OpportunityMarketplaceGeneralAssertions {
        expect(this.page.workplaceModelLabel).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Workplace model label is visible");
        return this;
    }

    public assertThatJobTypeLabelIsVisible(): OpportunityMarketplaceGeneralAssertions {
        expect(this.page.jobTypeLabel).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Job type label is visible");
        return this;
    }

    public assertThatScheduleLabelIsVisible(): OpportunityMarketplaceGeneralAssertions {
        expect(this.page.scheduleLabel).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Schedule label is visible");
        return this;
    }

    public assertThatCareerGoalLabelIsVisible(): OpportunityMarketplaceGeneralAssertions {
        expect(this.page.careerGoalLabel).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Career goal label is visible");
        return this;
    }

    public assertThatOpenToOffersLabelIsVisible(): OpportunityMarketplaceGeneralAssertions {
        expect(this.page.openToOffersLabel).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Open to offers label is visible");
        return this;
    }

    public assertThatActionForMatchLevelIsAvailable(matchLevel: string): OpportunityMarketplaceGeneralAssertions {
        expect(this.page.matchLevelAction(matchLevel)).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified that action is displayed for '" + matchLevel + "' level.");
        return this;
    }

    public assertThatIconSetRadiobuttonIsPresent(iconSet: string): OpportunityMarketplaceGeneralAssertions {
        expect(this.page.iconSetRadiobutton(iconSet)).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified that icon set '" + iconSet + "' is displayed.");
        return this;
    }

    public assertThatIconSetIsSelected(iconSet: string): OpportunityMarketplaceGeneralAssertions {
        expect(this.page.iconSetRadiobutton(iconSet)).toBeChecked();
        this.page.logger.info("Successfully verified that icon set '" + iconSet + "' is checked.");
        return this;
    }
}
