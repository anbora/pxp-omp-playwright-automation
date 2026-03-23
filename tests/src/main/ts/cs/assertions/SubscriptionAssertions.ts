import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { ManageObjectivesPage } from "cs/pages/ManageObjectivesPage";
import { SubscriptionPage } from "cs/pages/SubscriptionPage";

export class SubscriptionAssertions extends BaseAssertion<SubscriptionPage>{

	public assertThatSubcriptionPresent(expected: string[]): SubscriptionAssertions {
		this.assertThat(this.page.availableSubscritpion).containsText(expected);
        return this;
    }

	public assertThatSubcriptionNotPresent(expected: string[]): SubscriptionAssertions {
		this.assertThat(this.page.availableSubscritpion).not().containsText(expected);
        return this;
    }

	public assertThatReadMoreIsVisible(): SubscriptionAssertions {
		this.assertThat(this.page.readMore).isVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatAboutCourseVisible(option: string): SubscriptionAssertions {
		this.assertThat(this.page.locateSpanText(option)).isVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatButtonWithOptionVisible(option: string): SubscriptionAssertions {
		this.assertThat(this.page.locateButtonText(option)).isVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatYourLearnerMetricVisible(option: string): SubscriptionAssertions {
		this.assertThat(this.page.metricYourLearner(option)).isVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatTotalLearnerMetricVisible(option: string): SubscriptionAssertions {
		this.assertThat(this.page.metricTotalLearner(option)).isVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatAppliedFilterVisible(filterName: string, filterValue: string): SubscriptionAssertions {
		if(filterName.equals("Modalities"))
		{
			filterValue=filterValue.substring(0,1).toUpperCase()+filterValue.substring(1);
		}
		this.assertThat(this.page.verifyAppliedFilter(filterName,filterValue)).isVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatAppliedFilterNotVisible(filterName: string, filterValue: string): SubscriptionAssertions {
		if(filterName.equals("Modalities"))
		{
			filterValue=filterValue.substring(0,1).toUpperCase()+filterValue.substring(1);
		}
		this.assertThat(this.page.verifyAppliedFilter(filterName,filterValue)).not().isVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatSortingOptionVisible(option: string): SubscriptionAssertions {
		this.assertThat(this.page.sortingOption(option)).isVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatSortingOptionNotVisible(option: string): SubscriptionAssertions {
		this.assertThat(this.page.sortingOption(option)).not().isVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatButtonWithOptionNotVisible(option: string): SubscriptionAssertions {
		this.assertThat(this.page.locateButtonText(option)).not().isVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatYourLearnerTextVisible(): SubscriptionAssertions {
		this.assertThat(this.page.yourLearnerText).hasText(Pattern.compile("(^\\d$)"));
        return this;
    }

	public assertThatTotalLearnerMetricTextVisible(): SubscriptionAssertions {
		this.assertThat(this.page.totalLernerText).hasText(Pattern.compile("(^\\d{1,3}|\\d{1,3}.\\d$)"));
        return this;
    }

	public assertThatDurationIsVisible(duration: string): SubscriptionAssertions {
        this.assertThat(this.page.duration(duration)).isVisible(this.isVisibleOptions);
        return this;
    }

	public assertThatLanguageIsVisible(language: string): SubscriptionAssertions {
        this.assertThat(this.page.language(language)).isVisible(this.isVisibleOptions);
        return this;
    }

	public assertThatSubscriptionIsVisible(subscriptionlist: string): SubscriptionAssertions {

		let subscriptionlistArray: string[] = subscriptionlist.split(",");
		for (const subscription of subscriptionlistArray) {
			if(subscription.equals("N/A")) {

				this.assertThat(this.page.getPage().locator("//span[text()='SUBSCRIPTIONS']/following-sibling:: span[not(text()='')]")).not().isVisible();
			}
			else {
				this.assertThat(this.page.subscriptions(subscription.trim())).isVisible(this.isVisibleOptions);
				//System.out.println("Verified "+subscription);
			}
		}
        return this;
    }

	public assertThatBadgeIsVisible(courseName: string, label: string): SubscriptionAssertions {
		this.assertThat(this.page.card_label(courseName,label)).isVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatQuickViewDurationIsVisible(courseName: string): SubscriptionAssertions {
		this.assertThat(this.page.qv_duration_check(courseName)).hasText(Pattern.compile("(\\d.\\d|\\d) (hr|min)"));
        return this;
    }

	public assertThatFilterIsVisible(filterName: string): SubscriptionAssertions {
		this.assertThat(this.page.badge_check(filterName)).isVisible();
        return this;
    }

  	public assertThatStickyHeaderVisible(headerName: string): SubscriptionAssertions {
		this.assertThat(this.page.loc_DIV_ByText(headerName)).isVisible(this.extendedIsVisibleOptions);
        return this;
    }

}
