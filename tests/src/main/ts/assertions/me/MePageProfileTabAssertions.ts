// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { assertTrue } from "common/testing/runtime";
import { MePageProfile } from "pages/me/MePageProfile";
import { expect } from "common/testing/playwright";

export class MePageProfileTabAssertions extends BaseAssertion<MePageProfile> {

    public assertThatInterestsLabelIsDisplayed(): MePageProfileTabAssertions {
        expect(this.page.interestsLabel).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Interest label is visible");
        return this;
    }

    public assertThatAddedSkillsValueIsDisplayedOnTheList(skillName: string): MePageProfileTabAssertions {
        expect(this.page.addedSkillValue.first()).toContainText(skillName, this.containsTextOptions);
        this.page.logger.info("Successfully verified data. Added skill name found on the list.");
        return this;
    }

    public assertThatTotalLearningHoursIsDisplayed(): MePageProfileTabAssertions {
        expect(this.page.totalLearningHours).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Total learning hours is visible");
        return this;
    }

    public assertThatInProgressLabelIsDisplayed(): MePageProfileTabAssertions {
        expect(this.page.inProgressLabel).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. In progress label is visible");
        return this;
    }

    public assertThatOpenLearningPlanDisplayed(): MePageProfileTabAssertions {
        expect(this.page.openLearningPlan).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Open learning plan button is visible");
        return this;
    }

    public assertThatMySkillsAssessmentIsDisplayed(): MePageProfileTabAssertions {
        expect(this.page.mySkillsAssessment).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. My skills assessment is visible");
        return this;
    }

    public assertThatOpenSkillsAssessmentIsDisplayed(): MePageProfileTabAssertions {
        expect(this.page.openSkillsAssessment).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Open skills assessment is visible");
        return this;
    }

    public assertThatMyGroupsIsDisplayed(): MePageProfileTabAssertions {
        expect(this.page.myGroups).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. My groups label is visible");
        return this;
    }

    public assertThatViewAllGroupsButtonIsDisplayed(): MePageProfileTabAssertions {
        expect(this.page.viewAllGroupsButton).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. In progress label is visible");
        return this;
    }

    public assertThatMyChannelsIsDisplayed(): MePageProfileTabAssertions {
        expect(this.page.myChannels).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. My channel is visible");
        return this;
    }

    public assertThatViewAllChannelsButtonIsDisplayed(): MePageProfileTabAssertions {
        expect(this.page.findChannels).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Find channels button is visible");
        return this;
    }

    public assertThatBannerIsDisplayed(filename: string): MePageProfileTabAssertions {
        expect(this.page.bannerImageLink(filename)).toBeVisible();
        this.page.logger.info("Successfully verified that default banner is visible");
        return this;
    }

    public assertThatAltTextIs(fileName: string, altText: string): MePageProfileTabAssertions {
        this.assertTrue(this.page.bannerImageLink(fileName).getAttribute("alt").contains(altText));
        this.page.logger.info("Successfully verified that alt text is as expected");
        return this;

    }
}
