// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { assertTrue } from "common/testing/runtime";
import { WelcomePage_New } from "pages/careergrowth/careergrowth/WelcomePage_New";
import { expect } from "common/testing/playwright";

export class WelcomePageAssertions extends BaseAssertion<WelcomePage_New> {

    public assertThatWelcomeMessageIsEqualTo(message: string): WelcomePageAssertions {
        expect(this.page.welcomeMessage).toContainText(message, this.containsTextOptions);
//        this.page.welcomeMessage().should("contain.text", message)
        return this;
    }

    public assertThatSuggestionsMessageIsEqualTo(message: string): WelcomePageAssertions {
        expect(this.page.suggestionsMessage()).toContainText(message, this.containsTextOptions);
//        this.page.suggestionsMessage().should("contain.text", message)
        return this;
    }

    public assertThatIconIsDisplayedForTab(title: string, icon: string): WelcomePageAssertions {
        expect(this.page.tabIcon(title)).toHaveClass(icon);
//        this.page.tabIcon(title).should("have", icon)
        return this;
    }

    public assertThatTabTipIsEqualTo(text: string): WelcomePageAssertions {
        expect(this.page.tabTip.last()).toContainText(text, this.containsTextOptions);
//        this.page.tabTip().should("contain.text", text)
        return this;
    }

    public assertThatCurrentRoleNameIsNotVisible(): WelcomePageAssertions {
        expect(this.page.currentRoleName()).not.toBeVisible(this.isNotVisibleOptions);
//        this.page.currentRoleName().should("contain.text", role)
        return this;
    }

	public assertThatUpdateProfileLinkIsDisplayed(): WelcomePageAssertions {
        expect(this.page.updateCareerProfileLink()).toBeVisible(this.isVisibleOptions);
//        this.page.updateCareerProfileLink().should("exist")
        return this;
    }

	public assertThatUpdateProfileLinkIsNotDisplayed(): WelcomePageAssertions {
        expect(this.page.updateCareerProfileLink()).toBeHidden();
//        this.page.updateCareerProfileLink().should("not.exist")
        return this;
    }

    public assertThatUpdateCareerProfileLinkIsVisible(): WelcomePageAssertions {
        expect(this.page.updateCareerProfileLink()).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified that Update Career Profile Link is visible.");
        return this;
    }

    public assertThatUpdateCareerProfileLinkIsNotVisible(): WelcomePageAssertions {
        expect(this.page.updateCareerProfileLinkWithoutAI()).toBeHidden();
        return this;
    }

    public assertThatUserNameIsVisible(userName: string): WelcomePageAssertions {
        expect(this.page.userName()).toContainText(userName, this.containsTextOptions);
        return this;
    }

    public assertThatCurrentRoleNameIsEqualTo(role: string): WelcomePageAssertions {
        expect(this.page.currentRoleName()).toContainText(role, this.containsTextOptions);
        return this;
    }

    public assertThatUrlContainsProperText(urlText: string): WelcomePageAssertions {
        this.assertTrue(this.page.getPage().url().contains(urlText), "Expected url: '" + urlText + "' but was: '" + this.page.getPage().url() + "'");
        return this;
    }

    public assertThatYourAspirationalRolesInformationTextIsDisplayed(text: string): WelcomePageAssertions {
        expect(this.page.yourAspirationalRolesInformation()).toBeVisible(this.isVisibleOptions);
        expect(this.page.yourAspirationalRolesInformation()).toContainText(text, this.containsTextOptions);
        return this;
    }

    public assertThatMentorshipTabIsNotVisible(): WelcomePageAssertions {
        expect(this.page.mentorshipsCard).not.toBeVisible(this.isNotVisibleOptions);
        return this;
    }
}
