import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { OpportunityMarketplaceMentorshipPage } from "pages/admin/OpportunityMarketplaceMentorshipPage";

export class OpportunityMarketplaceMentorshipAssertions extends BaseAssertion <OpportunityMarketplaceMentorshipPage>{

    public assertThatEnableMentorshipIsVisible(): OpportunityMarketplaceMentorshipAssertions {
        this.assertThat(this.page.enableMentorship).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Enable mentorship is visible");
        return this;
    }

    public assertThatMentorshipLabelIsVisible(): OpportunityMarketplaceMentorshipAssertions {
        this.assertThat(this.page.mentorshipLabel).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Mentorship label is visible");
        return this;
    }

    public assertThatMentorshipsLabelIsVisible(): OpportunityMarketplaceMentorshipAssertions {
        this.assertThat(this.page.mentorshipsLabel).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Mentorships label is visible");
        return this;
    }

    public assertThatBeMentoredBySomeoneLabelIsVisible(): OpportunityMarketplaceMentorshipAssertions {
        this.assertThat(this.page.beMentoredBySomeoneLabel).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Be mentored by someone label is visible");
        return this;
    }

    public assertThatMenteeLabelIsVisible(): OpportunityMarketplaceMentorshipAssertions {
        this.assertThat(this.page.menteeLabel).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Mentee label is visible");
        return this;
    }

    public assertThatMenteesLabelIsVisible(): OpportunityMarketplaceMentorshipAssertions {
        this.assertThat(this.page.menteesLabel).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Mentees label is visible");
        return this;
    }

    public assertThatMentorLabelIsVisible(): OpportunityMarketplaceMentorshipAssertions {
        this.assertThat(this.page.mentorLabel).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Mentor label is visible");
        return this;
    }

    public assertThatMentorsLabelIsVisible(): OpportunityMarketplaceMentorshipAssertions {
        this.assertThat(this.page.mentorsLabel).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Mentors label is visible");
        return this;
    }
}
