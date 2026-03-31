// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { DiscoverPage } from "pages/discover/DiscoverPage";
import { expect } from "common/testing/playwright";

export class DiscoverAssertions extends BaseAssertion<DiscoverPage> {

    public assertThatDiscoverTabHasActiveClass(): DiscoverAssertions {
        expect(this.page.discoverTab()).toHaveClass("active", this.hasClassOptions);
        return this;
    }
}
