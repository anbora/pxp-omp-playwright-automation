// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { OpportunityMarketplaceJobVacancyPage } from "pages/admin/OpportunityMarketplaceJobVacancyPage";
import { expect } from "common/testing/playwright";

export class OpportunityMarketplaceJobVacancyAssertions extends BaseAssertion<OpportunityMarketplaceJobVacancyPage> {

    public assertThatEnableJobVacancyIsVisible(): OpportunityMarketplaceJobVacancyAssertions {
        expect(this.page.enableJobVacancy).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Enable job vacancy is visible");
        return this;
    }

    public assertThatJobVacancyLabelIsVisible(): OpportunityMarketplaceJobVacancyAssertions {
        expect(this.page.jobVacancy).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Job vacancy label is visible");
        return this;
    }

    public assertThatJobVacanciesLabelIsVisible(): OpportunityMarketplaceJobVacancyAssertions {
        expect(this.page.jobVacancies).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Job vacancies label is visible");
        return this;
    }

    public assertThatBrowseCurrentJobVacanciesLabelIsVisible(): OpportunityMarketplaceJobVacancyAssertions {
        expect(this.page.browseCurrentInternal).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Browse current job vacancies label is visible");
        return this;
    }

    public assertThatAutomaticallyAssignDetectedSkillsIsVisible(): OpportunityMarketplaceJobVacancyAssertions {
        expect(this.page.automaticallyAssignSkills).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Automatically assign detected skills is visible");
        return this;
    }

    public assertThatOverrideDetectedSkillsIsVisible(): OpportunityMarketplaceJobVacancyAssertions {
        expect(this.page.overrideDetectedSkills).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Override detected skills is visible");
        return this;
    }

    public assertThatDetectedSkillsLevelHeaderIsVisible(): OpportunityMarketplaceJobVacancyAssertions {
        expect(this.page.detectedSkillsLevelHeader).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Detected skills level header is visible");
        return this;
    }

    public assertThatDetectedSkillsLevelTextIsVisible(): OpportunityMarketplaceJobVacancyAssertions {
        expect(this.page.detectedSkillsLevelText).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Detected skills level text is visible");
        return this;
    }

    public assertThatMaximumNumberOfSkillsAssignedLabelIsVisible(): OpportunityMarketplaceJobVacancyAssertions {
        expect(this.page.maximumNumberOfSkills).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Maximum number of skills assigned label is visible");
        return this;
    }

    public assertThatLevelRankRestrictionsHeaderIsVisible(): OpportunityMarketplaceJobVacancyAssertions {
        expect(this.page.levelRankRestrictionsHeader).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Level rank restrictions header is visible");
        return this;
    }

    public assertThatNumberOfLevelRanksHigherThanIsVisible(): OpportunityMarketplaceJobVacancyAssertions {
        expect(this.page.numberOfLevelRanksHigher).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Number of level ranks higher than is visible");
        return this;
    }

    public assertThatNumberOfLevelRanksLowerThanIsVisible(): OpportunityMarketplaceJobVacancyAssertions {
        expect(this.page.numberOfLevelRanksLower).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Number of level ranks lower than is visible");
        return this;
    }
}
