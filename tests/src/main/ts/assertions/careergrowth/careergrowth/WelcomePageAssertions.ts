import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { assertTrue } from "common/testing/runtime";
import { WelcomePage_New } from "pages/careergrowth/careergrowth/WelcomePage_New";

export class WelcomePageAssertions extends BaseAssertion<WelcomePage_New> {

    public assertThatWelcomeMessageIsEqualTo(message: string): WelcomePageAssertions {
        this.assertThat(this.page.welcomeMessage).containsText(message, this.containsTextOptions);
//        this.page.welcomeMessage().should("contain.text", message)
        return this;
    }

    public assertThatSuggestionsMessageIsEqualTo(message: string): WelcomePageAssertions {
        this.assertThat(this.page.suggestionsMessage()).containsText(message, this.containsTextOptions);
//        this.page.suggestionsMessage().should("contain.text", message)
        return this;
    }

    public assertThatIconIsDisplayedForTab(title: string, icon: string): WelcomePageAssertions {
        this.assertThat(this.page.tabIcon(title)).hasClass(icon);
//        this.page.tabIcon(title).should("have", icon)
        return this;
    }

    public assertThatTabTipIsEqualTo(text: string): WelcomePageAssertions {
        this.assertThat(this.page.tabTip.last()).containsText(text, this.containsTextOptions);
//        this.page.tabTip().should("contain.text", text)
        return this;
    }

    public assertThatCurrentRoleNameIsNotVisible(): WelcomePageAssertions {
        this.assertThat(this.page.currentRoleName()).not().isVisible(this.isNotVisibleOptions);
//        this.page.currentRoleName().should("contain.text", role)
        return this;
    }

	public assertThatUpdateProfileLinkIsDisplayed(): WelcomePageAssertions {
        this.assertThat(this.page.updateCareerProfileLink()).isVisible(this.isVisibleOptions);
//        this.page.updateCareerProfileLink().should("exist")
        return this;
    }

	public assertThatUpdateProfileLinkIsNotDisplayed(): WelcomePageAssertions {
        this.assertThat(this.page.updateCareerProfileLink()).isHidden();
//        this.page.updateCareerProfileLink().should("not.exist")
        return this;
    }

    public assertThatUpdateCareerProfileLinkIsVisible(): WelcomePageAssertions {
        this.assertThat(this.page.updateCareerProfileLink()).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified that Update Career Profile Link is visible.");
        return this;
    }

    public assertThatUpdateCareerProfileLinkIsNotVisible(): WelcomePageAssertions {
        this.assertThat(this.page.updateCareerProfileLinkWithoutAI()).isHidden();
        return this;
    }

    public assertThatUserNameIsVisible(userName: string): WelcomePageAssertions {
        this.assertThat(this.page.userName()).containsText(userName, this.containsTextOptions);
        return this;
    }

    public assertThatCurrentRoleNameIsEqualTo(role: string): WelcomePageAssertions {
        this.assertThat(this.page.currentRoleName()).containsText(role, this.containsTextOptions);
        return this;
    }

    public assertThatUrlContainsProperText(urlText: string): WelcomePageAssertions {
        this.assertTrue(this.page.getPage().url().contains(urlText), "Expected url: '" + urlText + "' but was: '" + this.page.getPage().url() + "'");
        return this;
    }

    public assertThatYourAspirationalRolesInformationTextIsDisplayed(text: string): WelcomePageAssertions {
        this.assertThat(this.page.yourAspirationalRolesInformation()).isVisible(this.isVisibleOptions);
        this.assertThat(this.page.yourAspirationalRolesInformation()).containsText(text, this.containsTextOptions);
        return this;
    }

    public assertThatMentorshipTabIsNotVisible(): WelcomePageAssertions {
        this.assertThat(this.page.mentorshipsCard).not().isVisible(this.isNotVisibleOptions);
        return this;
    }
}
