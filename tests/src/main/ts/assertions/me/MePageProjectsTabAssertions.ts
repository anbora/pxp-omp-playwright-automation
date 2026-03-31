// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { ProjectsMePage } from "pages/careergrowth/project/ProjectsMePage";
import { expect } from "common/testing/playwright";

export class MePageProjectsTabAssertions extends BaseAssertion <ProjectsMePage> {

    public assertThatProjectNameInProjectsTabIsVisible(projectTitle: string): MePageProjectsTabAssertions {
        expect(this.page.projectTitleMePage(projectTitle)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatProjectNameInProjectsTabIsNotVisible(): MePageProjectsTabAssertions {
        expect(this.page.bookmarkedProjectsEmpty.first()).toContainText("Your bookmarked Projects will be showcased here. Start exploring Projects.", this.containsTextOptions);
        return this;
    }

    public assertThatProjectNameInProjectsTabPublishedIsNotVisible(): MePageProjectsTabAssertions {
        expect(this.page.bookmarkedProjectsEmpty.first()).toContainText("Projects published or owned by you will be showcased here. Get started by creating a Project.", this.containsTextOptions);
        return this;
    }
}
