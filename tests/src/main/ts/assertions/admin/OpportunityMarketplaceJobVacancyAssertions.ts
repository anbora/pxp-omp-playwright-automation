import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { OpportunityMarketplaceJobVacancyPage } from "pages/admin/OpportunityMarketplaceJobVacancyPage";

export class OpportunityMarketplaceJobVacancyAssertions extends BaseAssertion<OpportunityMarketplaceJobVacancyPage> {

    public assertThatEnableJobVacancyIsVisible(): OpportunityMarketplaceJobVacancyAssertions {
        this.assertThat(this.page.enableJobVacancy).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Enable job vacancy is visible");
        return this;
    }

    public assertThatJobVacancyLabelIsVisible(): OpportunityMarketplaceJobVacancyAssertions {
        this.assertThat(this.page.jobVacancy).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Job vacancy label is visible");
        return this;
    }

    public assertThatJobVacanciesLabelIsVisible(): OpportunityMarketplaceJobVacancyAssertions {
        this.assertThat(this.page.jobVacancies).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Job vacancies label is visible");
        return this;
    }

    public assertThatBrowseCurrentJobVacanciesLabelIsVisible(): OpportunityMarketplaceJobVacancyAssertions {
        this.assertThat(this.page.browseCurrentInternal).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Browse current job vacancies label is visible");
        return this;
    }

    public assertThatAutomaticallyAssignDetectedSkillsIsVisible(): OpportunityMarketplaceJobVacancyAssertions {
        this.assertThat(this.page.automaticallyAssignSkills).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Automatically assign detected skills is visible");
        return this;
    }

    public assertThatOverrideDetectedSkillsIsVisible(): OpportunityMarketplaceJobVacancyAssertions {
        this.assertThat(this.page.overrideDetectedSkills).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Override detected skills is visible");
        return this;
    }

    public assertThatDetectedSkillsLevelHeaderIsVisible(): OpportunityMarketplaceJobVacancyAssertions {
        this.assertThat(this.page.detectedSkillsLevelHeader).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Detected skills level header is visible");
        return this;
    }

    public assertThatDetectedSkillsLevelTextIsVisible(): OpportunityMarketplaceJobVacancyAssertions {
        this.assertThat(this.page.detectedSkillsLevelText).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Detected skills level text is visible");
        return this;
    }

    public assertThatMaximumNumberOfSkillsAssignedLabelIsVisible(): OpportunityMarketplaceJobVacancyAssertions {
        this.assertThat(this.page.maximumNumberOfSkills).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Maximum number of skills assigned label is visible");
        return this;
    }

    public assertThatLevelRankRestrictionsHeaderIsVisible(): OpportunityMarketplaceJobVacancyAssertions {
        this.assertThat(this.page.levelRankRestrictionsHeader).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Level rank restrictions header is visible");
        return this;
    }

    public assertThatNumberOfLevelRanksHigherThanIsVisible(): OpportunityMarketplaceJobVacancyAssertions {
        this.assertThat(this.page.numberOfLevelRanksHigher).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Number of level ranks higher than is visible");
        return this;
    }

    public assertThatNumberOfLevelRanksLowerThanIsVisible(): OpportunityMarketplaceJobVacancyAssertions {
        this.assertThat(this.page.numberOfLevelRanksLower).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Number of level ranks lower than is visible");
        return this;
    }
}
