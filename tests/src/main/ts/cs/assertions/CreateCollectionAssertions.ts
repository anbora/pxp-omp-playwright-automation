// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { CreateCollectionPage } from "cs/pages/CreateCollectionPage";
import { expect } from "common/testing/playwright";

export class CreateCollectionAssertions extends BaseAssertion<CreateCollectionPage> {

    public assertThatMessageIsVisible(message: string): CreateCollectionAssertions {
        expect(this.page.messageElement(message)).toBeVisible(this.extendedIsVisibleOptions);
        return this;
    }

    public assertThatReviewerNameIsVisible(message: string): CreateCollectionAssertions {
        expect(this.page.validateReviewer(message)).toBeVisible(this.extendedIsVisibleOptions);
        return this;
    }

    public assertThatCommentIsVisible(message: string): CreateCollectionAssertions {
        expect(this.page.collectionComment(message)).toBeVisible(this.extendedIsVisibleOptions);
        return this;
    }

    public assertThatCountIsVisible(expectedCount: number): CreateCollectionAssertions {
        expect(this.page.contentCard).toHaveCount(expectedCount);
        return this;
    }

    public assertThatDurationIsVisible(): CreateCollectionAssertions {
        expect(this.page.collectionDuration).toHaveText(Pattern.compile("(^\\d.\\d hours$)"));;
        return this;
    }

    public assertThatPublishCollectionSuccess(message: string): CreateCollectionAssertions {
        expect(this.page.selectReviewer(message)).toBeVisible(this.extendedIsVisibleOptions);
        return this;
    }

    public assertThatButtonIsVisible(message: string): CreateCollectionAssertions {
        expect(this.page.buttonText(message)).toBeVisible(this.extendedIsVisibleOptions);
        return this;
    }

    public assertThatMessageIsNotVisible(message: string): CreateCollectionAssertions {
        expect(this.page.messageElement(message)).not.toBeVisible(this.extendedIsVisibleOptions);
        return this;
    }

    public assertThatMangeOptionNotVisible(message: string): CreateCollectionAssertions {
        expect(this.page.contentSourceOption(message)).not.toBeVisible(this.extendedIsVisibleOptions);
        return this;
    }

    public assertThatMangeOptionVisible(message: string): CreateCollectionAssertions {
        expect(this.page.contentSourceOption(message)).toBeVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatSortingOptionVisible(option: string): CreateCollectionAssertions {
		expect(this.page.sortingOption(option)).toBeVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatSortingOptionNotVisible(option: string): CreateCollectionAssertions {
		expect(this.page.sortingOption(option)).not.toBeVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatFilterValueDisplay(values: string[]): CreateCollectionAssertions {
		const expectedValues = [...values].sort();
		expect(this.page.filterOptions).toContainText(expectedValues);
        return this;
    }

	public assertThatSubsDurationIsVisible(duration: string): CreateCollectionAssertions {
        expect(this.page.duration(duration)).toBeVisible(this.isVisibleOptions);
        return this;
    }

	public assertThatLanguageIsVisible(language: string): CreateCollectionAssertions {
        expect(this.page.language(language)).toBeVisible(this.isVisibleOptions);
        return this;
    }

	public assertThatSubscriptionIsVisible(subscriptionlist: string): CreateCollectionAssertions {
		let subscriptionlistArray: string[] = subscriptionlist.split(",");
		for (const subscription of subscriptionlistArray) {
			if(subscription.equals("N/A")) {

				expect(this.page.getPage().locator("//span[text()='SUBSCRIPTIONS']/following-sibling:: span[not(text()='')]")).not.toBeVisible();
			}
			else {
				expect(this.page.subscriptions(subscription.trim())).toBeVisible(this.isVisibleOptions);
			}
		}

        return this;
    }

	public assertThatContentCardLanguage(lan: string[]): CreateCollectionAssertions {
		const arr = lan.toArray();
        expect(this.page.contentCardlanguage).toContainText(arr);//new String[] {"Unspecified"}); //English
        return this;
    }

	public assertThatContentCardDuration(duration: string[], expectedValue: string): CreateCollectionAssertions {
        expect(this.page.contentCardDuration).toContainText([expectedValue]);
        return this;
    }

	public assertThatAllFilterValueVisible(skills: string): CreateCollectionAssertions {
        expect(this.page.allfilterValue(skills)).toBeVisible(this.isVisibleOptions);
        return this;
    }

	public assertThatAllFilterCategoryVisible(skills: string): CreateCollectionAssertions {
        expect(this.page.downarrowByCategory(skills)).toBeVisible(this.isVisibleOptions);
        return this;
    }

	public assertThatAllFilterCategoryNotVisible(skills: string): CreateCollectionAssertions {
        expect(this.page.downarrowByCategory(skills)).not.toBeVisible(this.isVisibleOptions);
        return this;
    }

	public assertThatBannerPublishMessageVisible(publishType: string, lmsName: string): CreateCollectionAssertions {
        expect(this.page.bannerPublishedAsMessage(publishType,lmsName)).toBeVisible(this.isVisibleOptions);
        return this;
    }

	public assertThatBannerPublisherNameVisible(publisherName: string): CreateCollectionAssertions {
        expect(this.page.bannerPublisherName(publisherName)).toBeVisible(this.isVisibleOptions);
        return this;
    }

	public assertThatBadgeIsVisible(badge: string): CreateCollectionAssertions {
		expect(this.page.badge_check(badge).first()).toBeVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatQVBadgeIsVisible(badge: string): CreateCollectionAssertions {
		expect(this.page.qv_badge_check(badge)).toBeVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatADDContentAIIsVisible(): CreateCollectionAssertions {
		expect(this.page.buttonAddContent_AI).toBeVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatCollectionIsVisible(text: string): CreateCollectionAssertions {
		expect(this.page.locatePTagByText(text)).toBeVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatCollectionCardOptionIsVisible(text: string): CreateCollectionAssertions {
		expect(this.page.locate_LI_TagByText(text)).toBeVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatCollectionCreatorIsVisible(creator: string): CreateCollectionAssertions {
		expect(this.page.loc_CollectionCreator(creator)).toBeVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatHeaderYourCollectionVisible(headerName: string): CreateCollectionAssertions {
		expect(this.page.loc_DIV_ByText(headerName)).toBeVisible(this.extendedIsVisibleOptions);
        return this;
    }

}
