import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { BrowseBySubjectPage } from "cs/pages/BrowseBySubjectPage";
import { CourseDetailsPage } from "cs/pages/CourseDetailsPage";
import { ResultContainer } from "models/ResultContainer";

export class CourseDetailsAssertions extends BaseAssertion<CourseDetailsPage>{

	public assertThatDurationIsVisible(duration: string): CourseDetailsAssertions {
        this.assertThat(this.page.duration(duration)).isVisible(this.isVisibleOptions);
        return this;
    }

	public assertThatLanguageIsVisible(language: string): CourseDetailsAssertions {
        this.assertThat(this.page.language(language)).isVisible(this.isVisibleOptions);
        return this;
    }

	public assertThatSubscriptionIsVisible(subscriptionlist: string): CourseDetailsAssertions {
		let subscriptionlistArray: string[] = subscriptionlist.split(",");
		for (const subscription of subscriptionlistArray) {
			if(subscription.equals("N/A"))
			{
				this.assertThat(this.page.getPage().locator("//span[text()='SUBSCRIPTIONS']/following-sibling:: span[not(text()='')]")).not().isVisible();
			}
			else
			{
				this.assertThat(this.page.subscriptions(subscription.trim())).isVisible(this.isVisibleOptions);
			}
		}
        return this;
    }

	public assertThatModalitiesIsVisible(): CourseDetailsAssertions {
        this.assertThat(this.page.complianceEmploymentLaw.first()).isVisible(this.isVisibleOptions);
        return this;
    }

	public assertThatContentPartnerIsVisible(provider: string): CourseDetailsAssertions {
        this.assertThat(this.page.contentPartner(provider)).isVisible(this.isVisibleOptions);
        return this;
    }

	public assertThatSkillIsVisible(skills: string): CourseDetailsAssertions {
		if(skills.equals("N/A")){
			this.assertThat(this.page.getPage().locator("//span[text()='SKILLS']/following-sibling::div/div")).not().isVisible(this.isVisibleOptions);
		}
		else {
			this.assertThat(this.page.getPage().locator("//span[text()='SKILLS']/following-sibling::div/div").first()).hasText(skills);
		}
        return this;
    }

	public assertThatCategoryIsVisible(category: string): CourseDetailsAssertions {
		this.assertThat(this.page.verifydetails("CATEGORIES")).hasText(category);
		return this;
	}

	public assertThatTopicIsVisible(topic: string): CourseDetailsAssertions {
		this.assertThat(this.page.verifydetails("TOPICS").first()).hasText(topic);
		return this;
	}

	public assertThatSubjectIsVisible(subject: string): CourseDetailsAssertions {
		this.assertThat(this.page.verifydetails("SUBJECTS").first()).hasText(subject);
		return this;
	}

	public assertThatBadgeIsVisible(badge: string): CourseDetailsAssertions {
		this.assertThat(this.page.badge_check(badge)).isVisible(this.extendedIsVisibleOptions);
        return this;
    }
}
