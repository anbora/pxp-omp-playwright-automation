import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { ProjectsMePage } from "pages/careergrowth/project/ProjectsMePage";

export class MePageProjectsTabAssertions extends BaseAssertion <ProjectsMePage> {

    public assertThatProjectNameInProjectsTabIsVisible(projectTitle: string): MePageProjectsTabAssertions {
        this.assertThat(this.page.projectTitleMePage(projectTitle)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatProjectNameInProjectsTabIsNotVisible(): MePageProjectsTabAssertions {
        this.assertThat(this.page.bookmarkedProjectsEmpty.first()).containsText("Your bookmarked Projects will be showcased here. Start exploring Projects.", this.containsTextOptions);
        return this;
    }

    public assertThatProjectNameInProjectsTabPublishedIsNotVisible(): MePageProjectsTabAssertions {
        this.assertThat(this.page.bookmarkedProjectsEmpty.first()).containsText("Projects published or owned by you will be showcased here. Get started by creating a Project.", this.containsTextOptions);
        return this;
    }
}
