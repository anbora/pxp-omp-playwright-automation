// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { OpportunityMarketplaceMentorshipPage } from "pages/admin/OpportunityMarketplaceMentorshipPage";
import { expect } from "common/testing/playwright";

export class OpportunityMarketplaceMentorshipAssertions extends BaseAssertion <OpportunityMarketplaceMentorshipPage>{

    public assertThatEnableMentorshipIsVisible(): OpportunityMarketplaceMentorshipAssertions {
        expect(this.page.enableMentorship).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Enable mentorship is visible");
        return this;
    }

    public assertThatMentorshipLabelIsVisible(): OpportunityMarketplaceMentorshipAssertions {
        expect(this.page.mentorshipLabel).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Mentorship label is visible");
        return this;
    }

    public assertThatMentorshipsLabelIsVisible(): OpportunityMarketplaceMentorshipAssertions {
        expect(this.page.mentorshipsLabel).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Mentorships label is visible");
        return this;
    }

    public assertThatBeMentoredBySomeoneLabelIsVisible(): OpportunityMarketplaceMentorshipAssertions {
        expect(this.page.beMentoredBySomeoneLabel).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Be mentored by someone label is visible");
        return this;
    }

    public assertThatMenteeLabelIsVisible(): OpportunityMarketplaceMentorshipAssertions {
        expect(this.page.menteeLabel).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Mentee label is visible");
        return this;
    }

    public assertThatMenteesLabelIsVisible(): OpportunityMarketplaceMentorshipAssertions {
        expect(this.page.menteesLabel).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Mentees label is visible");
        return this;
    }

    public assertThatMentorLabelIsVisible(): OpportunityMarketplaceMentorshipAssertions {
        expect(this.page.mentorLabel).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Mentor label is visible");
        return this;
    }

    public assertThatMentorsLabelIsVisible(): OpportunityMarketplaceMentorshipAssertions {
        expect(this.page.mentorsLabel).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Mentors label is visible");
        return this;
    }
}
