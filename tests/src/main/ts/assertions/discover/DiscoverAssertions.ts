import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { DiscoverPage } from "pages/discover/DiscoverPage";

export class DiscoverAssertions extends BaseAssertion<DiscoverPage> {

    public assertThatDiscoverTabHasActiveClass(): DiscoverAssertions {
        this.assertThat(this.page.discoverTab()).hasClass("active", this.hasClassOptions);
        return this;
    }
}
