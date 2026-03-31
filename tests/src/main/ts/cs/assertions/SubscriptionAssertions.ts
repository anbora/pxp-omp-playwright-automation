// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { ManageObjectivesPage } from "cs/pages/ManageObjectivesPage";
import { SubscriptionPage } from "cs/pages/SubscriptionPage";
import { expect } from "common/testing/playwright";

export class SubscriptionAssertions extends BaseAssertion<SubscriptionPage>{

	public assertThatSubcriptionPresent(expected: string[]): SubscriptionAssertions {
		expect(this.page.availableSubscritpion).toContainText(expected);
        return this;
    }

	public assertThatSubcriptionNotPresent(expected: string[]): SubscriptionAssertions {
		expect(this.page.availableSubscritpion).not.toContainText(expected);
        return this;
    }

	public assertThatReadMoreIsVisible(): SubscriptionAssertions {
		expect(this.page.readMore).toBeVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatAboutCourseVisible(option: string): SubscriptionAssertions {
		expect(this.page.locateSpanText(option)).toBeVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatButtonWithOptionVisible(option: string): SubscriptionAssertions {
		expect(this.page.locateButtonText(option)).toBeVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatYourLearnerMetricVisible(option: string): SubscriptionAssertions {
		expect(this.page.metricYourLearner(option)).toBeVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatTotalLearnerMetricVisible(option: string): SubscriptionAssertions {
		expect(this.page.metricTotalLearner(option)).toBeVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatAppliedFilterVisible(filterName: string, filterValue: string): SubscriptionAssertions {
		if(filterName.equals("Modalities"))
		{
			filterValue=filterValue.substring(0,1).toUpperCase()+filterValue.substring(1);
		}
		expect(this.page.verifyAppliedFilter(filterName,filterValue)).toBeVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatAppliedFilterNotVisible(filterName: string, filterValue: string): SubscriptionAssertions {
		if(filterName.equals("Modalities"))
		{
			filterValue=filterValue.substring(0,1).toUpperCase()+filterValue.substring(1);
		}
		expect(this.page.verifyAppliedFilter(filterName,filterValue)).not.toBeVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatSortingOptionVisible(option: string): SubscriptionAssertions {
		expect(this.page.sortingOption(option)).toBeVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatSortingOptionNotVisible(option: string): SubscriptionAssertions {
		expect(this.page.sortingOption(option)).not.toBeVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatButtonWithOptionNotVisible(option: string): SubscriptionAssertions {
		expect(this.page.locateButtonText(option)).not.toBeVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatYourLearnerTextVisible(): SubscriptionAssertions {
		expect(this.page.yourLearnerText).toHaveText(Pattern.compile("(^\\d$)"));
        return this;
    }

	public assertThatTotalLearnerMetricTextVisible(): SubscriptionAssertions {
		expect(this.page.totalLernerText).toHaveText(Pattern.compile("(^\\d{1,3}|\\d{1,3}.\\d$)"));
        return this;
    }

	public assertThatDurationIsVisible(duration: string): SubscriptionAssertions {
        expect(this.page.duration(duration)).toBeVisible(this.isVisibleOptions);
        return this;
    }

	public assertThatLanguageIsVisible(language: string): SubscriptionAssertions {
        expect(this.page.language(language)).toBeVisible(this.isVisibleOptions);
        return this;
    }

	public assertThatSubscriptionIsVisible(subscriptionlist: string): SubscriptionAssertions {

		let subscriptionlistArray: string[] = subscriptionlist.split(",");
		for (const subscription of subscriptionlistArray) {
			if(subscription.equals("N/A")) {

				expect(this.page.getPage().locator("//span[text()='SUBSCRIPTIONS']/following-sibling:: span[not(text()='')]")).not.toBeVisible();
			}
			else {
				expect(this.page.subscriptions(subscription.trim())).toBeVisible(this.isVisibleOptions);
				//System.out.println("Verified "+subscription);
			}
		}
        return this;
    }

	public assertThatBadgeIsVisible(courseName: string, label: string): SubscriptionAssertions {
		expect(this.page.card_label(courseName,label)).toBeVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatQuickViewDurationIsVisible(courseName: string): SubscriptionAssertions {
		expect(this.page.qv_duration_check(courseName)).toHaveText(Pattern.compile("(\\d.\\d|\\d) (hr|min)"));
        return this;
    }

	public assertThatFilterIsVisible(filterName: string): SubscriptionAssertions {
		expect(this.page.badge_check(filterName)).toBeVisible();
        return this;
    }

  	public assertThatStickyHeaderVisible(headerName: string): SubscriptionAssertions {
		expect(this.page.loc_DIV_ByText(headerName)).toBeVisible(this.extendedIsVisibleOptions);
        return this;
    }

}
