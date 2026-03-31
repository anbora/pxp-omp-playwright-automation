// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, expect } from "common/testing/playwright";
import { ManagerDashboardPage } from "pages/other/ManagerDashboardPage";

export class ManagerDashboardPageAssertions extends BaseAssertion<ManagerDashboardPage> {

    public assertSkillsMatrixLoads(): ManagerDashboardPageAssertions {
        expect(this.page.teamMatrixHeader).toBeVisible(this.isVisibleOptions);
        expect(this.page.filtersIcon).toBeVisible(this.isVisibleOptions);
        expect(this.page.legendIcon).toBeVisible(this.isVisibleOptions);
        expect(this.page.rateSkillsButton).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertRateSkillsModalLoads(): ManagerDashboardPageAssertions {
        expect(this.page.rateSkillsModalHeader).toBeVisible(this.isVisibleOptions);
        return this;
    }
}
