import { BaseAssertion } from "common/BaseAssertion";
import { AbstractShareModalPage } from "pages/careergrowth/share/AbstractShareModalPage";

export abstract class AbstractShareAssertions<T extends AbstractShareAssertions<T, G>, G extends AbstractShareModalPage> extends BaseAssertion<G> {

    protected abstract thisReturnInstance(): T;

    public assertShareModalHeaderDisplays(): T {
        this.assertThat(this.page.modalHeader().first()).isVisible(this.isVisibleOptions);
        return this.thisReturnInstance();
    }

    public assertShareSuccessToasterDisplays(): T {
        this.assertThat(this.page.shareSuccessToasterMessage.first()).isVisible(this.isVisibleOptions);
        return this.thisReturnInstance();
    }
}
