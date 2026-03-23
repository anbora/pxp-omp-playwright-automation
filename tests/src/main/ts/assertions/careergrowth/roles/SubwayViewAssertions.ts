import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { SubwayViewModalPage } from "pages/careergrowth/roles/SubwayViewModalPage";

export class SubwayViewAssertions extends BaseAssertion<SubwayViewModalPage> {

	public assertThatHeaderIsEqualTo(header: string): SubwayViewAssertions {
        this.assertThat(this.page.header).containsText(header, this.containsTextOptions);
        return this;
    }

	public assertThatStatusIconIsDisplayed(): SubwayViewAssertions {
        this.assertThat(this.page.statusIcon).isVisible(this.isVisibleOptions);
        return this;
    }

	public assertThatStatusMessageIsEqualTo(status: string): SubwayViewAssertions {
        this.assertThat(this.page.statusMessage).containsText(status, this.containsTextOptions);
        return this;
    }

	public assertThatStatusMessageDescriptionIsEqualTo(description: string): SubwayViewAssertions {
        this.assertThat(this.page.statusMessageDescription).containsText(description, this.containsTextOptions);
        return this;
    }

	public assertThatSubwayViewDescriptionIsEqualTo(description: string): SubwayViewAssertions {
        this.assertThat(this.page.subwayViewDescription).containsText(description, this.containsTextOptions);
        return this;
    }

	public assertThatUserRoleNameIsEqualTo(roleName: string): SubwayViewAssertions {
        this.assertThat(this.page.userRoleName).containsText(roleName, this.containsTextOptions);
        return this;
    }

	public assertThatPathIsDisplayed(number: string): SubwayViewAssertions {
        this.assertThat(this.page.path(number)).isEnabled();
        return this;
    }

	public assertThatGoalRoleNameIsEqualTo(role: string): SubwayViewAssertions {
        this.assertThat(this.page.roleName).containsText(role, this.containsTextOptions);
        return this;
    }
}
