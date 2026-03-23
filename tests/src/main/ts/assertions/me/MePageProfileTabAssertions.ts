import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { assertTrue } from "common/testing/runtime";
import { MePageProfile } from "pages/me/MePageProfile";

export class MePageProfileTabAssertions extends BaseAssertion<MePageProfile> {

    public assertThatInterestsLabelIsDisplayed(): MePageProfileTabAssertions {
        this.assertThat(this.page.interestsLabel).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Interest label is visible");
        return this;
    }

    public assertThatAddedSkillsValueIsDisplayedOnTheList(skillName: string): MePageProfileTabAssertions {
        this.assertThat(this.page.addedSkillValue.first()).containsText(skillName, this.containsTextOptions);
        this.page.logger.info("Successfully verified data. Added skill name found on the list.");
        return this;
    }

    public assertThatTotalLearningHoursIsDisplayed(): MePageProfileTabAssertions {
        this.assertThat(this.page.totalLearningHours).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Total learning hours is visible");
        return this;
    }

    public assertThatInProgressLabelIsDisplayed(): MePageProfileTabAssertions {
        this.assertThat(this.page.inProgressLabel).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. In progress label is visible");
        return this;
    }

    public assertThatOpenLearningPlanDisplayed(): MePageProfileTabAssertions {
        this.assertThat(this.page.openLearningPlan).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Open learning plan button is visible");
        return this;
    }

    public assertThatMySkillsAssessmentIsDisplayed(): MePageProfileTabAssertions {
        this.assertThat(this.page.mySkillsAssessment).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. My skills assessment is visible");
        return this;
    }

    public assertThatOpenSkillsAssessmentIsDisplayed(): MePageProfileTabAssertions {
        this.assertThat(this.page.openSkillsAssessment).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Open skills assessment is visible");
        return this;
    }

    public assertThatMyGroupsIsDisplayed(): MePageProfileTabAssertions {
        this.assertThat(this.page.myGroups).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. My groups label is visible");
        return this;
    }

    public assertThatViewAllGroupsButtonIsDisplayed(): MePageProfileTabAssertions {
        this.assertThat(this.page.viewAllGroupsButton).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. In progress label is visible");
        return this;
    }

    public assertThatMyChannelsIsDisplayed(): MePageProfileTabAssertions {
        this.assertThat(this.page.myChannels).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. My channel is visible");
        return this;
    }

    public assertThatViewAllChannelsButtonIsDisplayed(): MePageProfileTabAssertions {
        this.assertThat(this.page.findChannels).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Find channels button is visible");
        return this;
    }

    public assertThatBannerIsDisplayed(filename: string): MePageProfileTabAssertions {
        this.assertThat(this.page.bannerImageLink(filename)).isVisible();
        this.page.logger.info("Successfully verified that default banner is visible");
        return this;
    }

    public assertThatAltTextIs(fileName: string, altText: string): MePageProfileTabAssertions {
        this.assertTrue(this.page.bannerImageLink(fileName).getAttribute("alt").contains(altText));
        this.page.logger.info("Successfully verified that alt text is as expected");
        return this;

    }
}
