// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { SubwayViewModalPage } from "pages/careergrowth/roles/SubwayViewModalPage";
import { expect } from "common/testing/playwright";

export class SubwayViewAssertions extends BaseAssertion<SubwayViewModalPage> {

	public assertThatHeaderIsEqualTo(header: string): SubwayViewAssertions {
        expect(this.page.header).toContainText(header, this.containsTextOptions);
        return this;
    }

	public assertThatStatusIconIsDisplayed(): SubwayViewAssertions {
        expect(this.page.statusIcon).toBeVisible(this.isVisibleOptions);
        return this;
    }

	public assertThatStatusMessageIsEqualTo(status: string): SubwayViewAssertions {
        expect(this.page.statusMessage).toContainText(status, this.containsTextOptions);
        return this;
    }

	public assertThatStatusMessageDescriptionIsEqualTo(description: string): SubwayViewAssertions {
        expect(this.page.statusMessageDescription).toContainText(description, this.containsTextOptions);
        return this;
    }

	public assertThatSubwayViewDescriptionIsEqualTo(description: string): SubwayViewAssertions {
        expect(this.page.subwayViewDescription).toContainText(description, this.containsTextOptions);
        return this;
    }

	public assertThatUserRoleNameIsEqualTo(roleName: string): SubwayViewAssertions {
        expect(this.page.userRoleName).toContainText(roleName, this.containsTextOptions);
        return this;
    }

	public assertThatPathIsDisplayed(number: string): SubwayViewAssertions {
        expect(this.page.path(number)).toBeEnabled();
        return this;
    }

	public assertThatGoalRoleNameIsEqualTo(role: string): SubwayViewAssertions {
        expect(this.page.roleName).toContainText(role, this.containsTextOptions);
        return this;
    }
}
