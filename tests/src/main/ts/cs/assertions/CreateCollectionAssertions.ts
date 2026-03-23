import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { CreateCollectionPage } from "cs/pages/CreateCollectionPage";

export class CreateCollectionAssertions extends BaseAssertion<CreateCollectionPage> {

    public assertThatMessageIsVisible(message: string): CreateCollectionAssertions {
        this.assertThat(this.page.messageElement(message)).isVisible(this.extendedIsVisibleOptions);
        return this;
    }

    public assertThatReviewerNameIsVisible(message: string): CreateCollectionAssertions {
        this.assertThat(this.page.validateReviewer(message)).isVisible(this.extendedIsVisibleOptions);
        return this;
    }

    public assertThatCommentIsVisible(message: string): CreateCollectionAssertions {
        this.assertThat(this.page.collectionComment(message)).isVisible(this.extendedIsVisibleOptions);
        return this;
    }

    public assertThatCountIsVisible(expectedCount: number): CreateCollectionAssertions {
        this.assertThat(this.page.contentCard).hasCount(expectedCount);
        return this;
    }

    public assertThatDurationIsVisible(): CreateCollectionAssertions {
        this.assertThat(this.page.collectionDuration).hasText(Pattern.compile("(^\\d.\\d hours$)"));;
        return this;
    }

    public assertThatPublishCollectionSuccess(message: string): CreateCollectionAssertions {
        this.assertThat(this.page.selectReviewer(message)).isVisible(this.extendedIsVisibleOptions);
        return this;
    }

    public assertThatButtonIsVisible(message: string): CreateCollectionAssertions {
        this.assertThat(this.page.buttonText(message)).isVisible(this.extendedIsVisibleOptions);
        return this;
    }

    public assertThatMessageIsNotVisible(message: string): CreateCollectionAssertions {
        this.assertThat(this.page.messageElement(message)).not().isVisible(this.extendedIsVisibleOptions);
        return this;
    }

    public assertThatMangeOptionNotVisible(message: string): CreateCollectionAssertions {
        this.assertThat(this.page.contentSourceOption(message)).not().isVisible(this.extendedIsVisibleOptions);
        return this;
    }

    public assertThatMangeOptionVisible(message: string): CreateCollectionAssertions {
        this.assertThat(this.page.contentSourceOption(message)).isVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatSortingOptionVisible(option: string): CreateCollectionAssertions {
		this.assertThat(this.page.sortingOption(option)).isVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatSortingOptionNotVisible(option: string): CreateCollectionAssertions {
		this.assertThat(this.page.sortingOption(option)).not().isVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatFilterValueDisplay(values: string[]): CreateCollectionAssertions {
		const expectedValues = [...values].sort();
		this.assertThat(this.page.filterOptions).containsText(expectedValues);
        return this;
    }

	public assertThatSubsDurationIsVisible(duration: string): CreateCollectionAssertions {
        this.assertThat(this.page.duration(duration)).isVisible(this.isVisibleOptions);
        return this;
    }

	public assertThatLanguageIsVisible(language: string): CreateCollectionAssertions {
        this.assertThat(this.page.language(language)).isVisible(this.isVisibleOptions);
        return this;
    }

	public assertThatSubscriptionIsVisible(subscriptionlist: string): CreateCollectionAssertions {
		let subscriptionlistArray: string[] = subscriptionlist.split(",");
		for (const subscription of subscriptionlistArray) {
			if(subscription.equals("N/A")) {

				this.assertThat(this.page.getPage().locator("//span[text()='SUBSCRIPTIONS']/following-sibling:: span[not(text()='')]")).not().isVisible();
			}
			else {
				this.assertThat(this.page.subscriptions(subscription.trim())).isVisible(this.isVisibleOptions);
			}
		}

        return this;
    }

	public assertThatContentCardLanguage(lan: string[]): CreateCollectionAssertions {
		const arr = lan.toArray();
        this.assertThat(this.page.contentCardlanguage).containsText(arr);//new String[] {"Unspecified"}); //English
        return this;
    }

	public assertThatContentCardDuration(duration: string[], expectedValue: string): CreateCollectionAssertions {
        this.assertThat(this.page.contentCardDuration).containsText([expectedValue]);
        return this;
    }

	public assertThatAllFilterValueVisible(skills: string): CreateCollectionAssertions {
        this.assertThat(this.page.allfilterValue(skills)).isVisible(this.isVisibleOptions);
        return this;
    }

	public assertThatAllFilterCategoryVisible(skills: string): CreateCollectionAssertions {
        this.assertThat(this.page.downarrowByCategory(skills)).isVisible(this.isVisibleOptions);
        return this;
    }

	public assertThatAllFilterCategoryNotVisible(skills: string): CreateCollectionAssertions {
        this.assertThat(this.page.downarrowByCategory(skills)).not().isVisible(this.isVisibleOptions);
        return this;
    }

	public assertThatBannerPublishMessageVisible(publishType: string, lmsName: string): CreateCollectionAssertions {
        this.assertThat(this.page.bannerPublishedAsMessage(publishType,lmsName)).isVisible(this.isVisibleOptions);
        return this;
    }

	public assertThatBannerPublisherNameVisible(publisherName: string): CreateCollectionAssertions {
        this.assertThat(this.page.bannerPublisherName(publisherName)).isVisible(this.isVisibleOptions);
        return this;
    }

	public assertThatBadgeIsVisible(badge: string): CreateCollectionAssertions {
		this.assertThat(this.page.badge_check(badge).first()).isVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatQVBadgeIsVisible(badge: string): CreateCollectionAssertions {
		this.assertThat(this.page.qv_badge_check(badge)).isVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatADDContentAIIsVisible(): CreateCollectionAssertions {
		this.assertThat(this.page.buttonAddContent_AI).isVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatCollectionIsVisible(text: string): CreateCollectionAssertions {
		this.assertThat(this.page.locatePTagByText(text)).isVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatCollectionCardOptionIsVisible(text: string): CreateCollectionAssertions {
		this.assertThat(this.page.locate_LI_TagByText(text)).isVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatCollectionCreatorIsVisible(creator: string): CreateCollectionAssertions {
		this.assertThat(this.page.loc_CollectionCreator(creator)).isVisible(this.extendedIsVisibleOptions);
        return this;
    }

	public assertThatHeaderYourCollectionVisible(headerName: string): CreateCollectionAssertions {
		this.assertThat(this.page.loc_DIV_ByText(headerName)).isVisible(this.extendedIsVisibleOptions);
        return this;
    }

}
