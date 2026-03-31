// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { BrowseBySubjectPage } from "cs/pages/BrowseBySubjectPage";
import { CourseDetailsPage } from "cs/pages/CourseDetailsPage";
import { ResultContainer } from "models/ResultContainer";
import { expect } from "common/testing/playwright";

export class CourseDetailsAssertions extends BaseAssertion<CourseDetailsPage>{

	public assertThatDurationIsVisible(duration: string): CourseDetailsAssertions {
        expect(this.page.duration(duration)).toBeVisible(this.isVisibleOptions);
        return this;
    }

	public assertThatLanguageIsVisible(language: string): CourseDetailsAssertions {
        expect(this.page.language(language)).toBeVisible(this.isVisibleOptions);
        return this;
    }

	public assertThatSubscriptionIsVisible(subscriptionlist: string): CourseDetailsAssertions {
		let subscriptionlistArray: string[] = subscriptionlist.split(",");
		for (const subscription of subscriptionlistArray) {
			if(subscription.equals("N/A"))
			{
				expect(this.page.getPage().locator("//span[text()='SUBSCRIPTIONS']/following-sibling:: span[not(text()='')]")).not.toBeVisible();
			}
			else
			{
				expect(this.page.subscriptions(subscription.trim())).toBeVisible(this.isVisibleOptions);
			}
		}
        return this;
    }

	public assertThatModalitiesIsVisible(): CourseDetailsAssertions {
        expect(this.page.complianceEmploymentLaw.first()).toBeVisible(this.isVisibleOptions);
        return this;
    }

	public assertThatContentPartnerIsVisible(provider: string): CourseDetailsAssertions {
        expect(this.page.contentPartner(provider)).toBeVisible(this.isVisibleOptions);
        return this;
    }

	public assertThatSkillIsVisible(skills: string): CourseDetailsAssertions {
		if(skills.equals("N/A")){
			expect(this.page.getPage().locator("//span[text()='SKILLS']/following-sibling::div/div")).not.toBeVisible(this.isVisibleOptions);
		}
		else {
			expect(this.page.getPage().locator("//span[text()='SKILLS']/following-sibling::div/div").first()).toHaveText(skills);
		}
        return this;
    }

	public assertThatCategoryIsVisible(category: string): CourseDetailsAssertions {
		expect(this.page.verifydetails("CATEGORIES")).toHaveText(category);
		return this;
	}

	public assertThatTopicIsVisible(topic: string): CourseDetailsAssertions {
		expect(this.page.verifydetails("TOPICS").first()).toHaveText(topic);
		return this;
	}

	public assertThatSubjectIsVisible(subject: string): CourseDetailsAssertions {
		expect(this.page.verifydetails("SUBJECTS").first()).toHaveText(subject);
		return this;
	}

	public assertThatBadgeIsVisible(badge: string): CourseDetailsAssertions {
		expect(this.page.badge_check(badge)).toBeVisible(this.extendedIsVisibleOptions);
        return this;
    }
}
