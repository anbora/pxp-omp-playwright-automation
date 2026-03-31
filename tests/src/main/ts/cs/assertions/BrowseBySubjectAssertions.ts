// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { BrowseBySubjectPage } from "cs/pages/BrowseBySubjectPage";
import { expect } from "common/testing/playwright";

export class BrowseBySubjectAssertions extends BaseAssertion<BrowseBySubjectPage> {

    public assertThatComplianceEmploymentLawIsVisible(): BrowseBySubjectAssertions {
        expect(this.page.complianceEmploymentLaw.first()).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatCoursePresentationVisible(): BrowseBySubjectAssertions {
        expect(this.page.quick_Course_Presentation_Opened).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatTitleDisplayed(courseTitle: string): BrowseBySubjectAssertions {
        expect(this.page.QV_COURSE_TITLE_VERIFICATION(courseTitle)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatTopicIsChecked(topic: string): BrowseBySubjectAssertions {
        expect(this.page.select_Topic(topic)).toBeChecked();
        return this;
    }

    public assertThatButtonIsVisible(buttonText: string): BrowseBySubjectAssertions {
        expect(this.page.browseSubjectButton(buttonText)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatButtonIsDisabled(buttonText: string): BrowseBySubjectAssertions {
    	expect(this.page.browseSubjectButton(buttonText)).toBeDisabled();
        return this;
    }

    public assertThatTopicIsNotChecked(topic: string): BrowseBySubjectAssertions {
    	expect(this.page.selectTopic_Unchecked(topic)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatAppliedFilterIsVisible(name: string, value: string): BrowseBySubjectAssertions {
    	expect(this.page.verifyAppliedFilter(name,value)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatAppliedFilterCountIsVisible(topic: string, topicCount: string): BrowseBySubjectAssertions {
    	expect(this.page.gsFilterCount(topic,topicCount)).toBeVisible(this.isVisibleOptions);
        return this;
    }

	public assertThatSortingOptionVisible(option: string): BrowseBySubjectAssertions {
		expect(this.page.sortingOption(option)).toBeVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatSortingOptionNotVisible(option: string): BrowseBySubjectAssertions {
		expect(this.page.sortingOption(option)).not.toBeVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatYourLearnerTextVisible(pattern: string): BrowseBySubjectAssertions {
		expect(this.page.yourLearnerText).toHaveText(Pattern.compile(pattern));
        return this;
    }

	public assertThatTotalLearnerMetricTextVisible(pattern: string): BrowseBySubjectAssertions {
		expect(this.page.totalLernerText).toHaveText(Pattern.compile(pattern));
        return this;
    }

	public assertThatBadgeIsVisible(courseName: string, label: string): BrowseBySubjectAssertions {
		expect(this.page.card_label(courseName,label)).toBeVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatHelpLinkIsVisible(text: string): BrowseBySubjectAssertions {
		expect(this.page.badge_check(text)).toBeVisible(this.extendedIsVisibleOptions);
        return this;
    }
}
