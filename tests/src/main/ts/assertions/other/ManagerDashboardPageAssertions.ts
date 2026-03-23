import { BaseAssertion } from "common/BaseAssertion";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser } from "common/testing/playwright";
import { assertThat } from "common/testing/playwrightAssertions";
import { ManagerDashboardPage } from "pages/other/ManagerDashboardPage";

export class ManagerDashboardPageAssertions extends BaseAssertion<ManagerDashboardPage> {

    public assertSkillsMatrixLoads(): ManagerDashboardPageAssertions {
        this.assertThat(this.page.teamMatrixHeader).isVisible(this.isVisibleOptions);
        this.assertThat(this.page.filtersIcon).isVisible(this.isVisibleOptions);
        this.assertThat(this.page.legendIcon).isVisible(this.isVisibleOptions);
        this.assertThat(this.page.rateSkillsButton).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertRateSkillsModalLoads(): ManagerDashboardPageAssertions {
        this.assertThat(this.page.rateSkillsModalHeader).isVisible(this.isVisibleOptions);
        return this;
    }
}
