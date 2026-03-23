import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { BrowseBySubjectPage } from "cs/pages/BrowseBySubjectPage";

export class BrowseBySubjectAssertions extends BaseAssertion<BrowseBySubjectPage> {

    public assertThatComplianceEmploymentLawIsVisible(): BrowseBySubjectAssertions {
        this.assertThat(this.page.complianceEmploymentLaw.first()).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatCoursePresentationVisible(): BrowseBySubjectAssertions {
        this.assertThat(this.page.quick_Course_Presentation_Opened).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatTitleDisplayed(courseTitle: string): BrowseBySubjectAssertions {
        this.assertThat(this.page.QV_COURSE_TITLE_VERIFICATION(courseTitle)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatTopicIsChecked(topic: string): BrowseBySubjectAssertions {
        this.assertThat(this.page.select_Topic(topic)).isChecked();
        return this;
    }

    public assertThatButtonIsVisible(buttonText: string): BrowseBySubjectAssertions {
        this.assertThat(this.page.browseSubjectButton(buttonText)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatButtonIsDisabled(buttonText: string): BrowseBySubjectAssertions {
    	this.assertThat(this.page.browseSubjectButton(buttonText)).isDisabled();
        return this;
    }

    public assertThatTopicIsNotChecked(topic: string): BrowseBySubjectAssertions {
    	this.assertThat(this.page.selectTopic_Unchecked(topic)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatAppliedFilterIsVisible(name: string, value: string): BrowseBySubjectAssertions {
    	this.assertThat(this.page.verifyAppliedFilter(name,value)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatAppliedFilterCountIsVisible(topic: string, topicCount: string): BrowseBySubjectAssertions {
    	this.assertThat(this.page.gsFilterCount(topic,topicCount)).isVisible(this.isVisibleOptions);
        return this;
    }

	public assertThatSortingOptionVisible(option: string): BrowseBySubjectAssertions {
		this.assertThat(this.page.sortingOption(option)).isVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatSortingOptionNotVisible(option: string): BrowseBySubjectAssertions {
		this.assertThat(this.page.sortingOption(option)).not().isVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatYourLearnerTextVisible(pattern: string): BrowseBySubjectAssertions {
		this.assertThat(this.page.yourLearnerText).hasText(Pattern.compile(pattern));
        return this;
    }

	public assertThatTotalLearnerMetricTextVisible(pattern: string): BrowseBySubjectAssertions {
		this.assertThat(this.page.totalLernerText).hasText(Pattern.compile(pattern));
        return this;
    }

	public assertThatBadgeIsVisible(courseName: string, label: string): BrowseBySubjectAssertions {
		this.assertThat(this.page.card_label(courseName,label)).isVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatHelpLinkIsVisible(text: string): BrowseBySubjectAssertions {
		this.assertThat(this.page.badge_check(text)).isVisible(this.extendedIsVisibleOptions);
        return this;
    }
}
