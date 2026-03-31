// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { AbstractShareModalPage } from "pages/careergrowth/share/AbstractShareModalPage";
import { expect } from "common/testing/playwright";

export abstract class AbstractShareAssertions<T extends AbstractShareAssertions<T, G>, G extends AbstractShareModalPage> extends BaseAssertion<G> {

    protected abstract thisReturnInstance(): T;

    public assertShareModalHeaderDisplays(): T {
        expect(this.page.modalHeader().first()).toBeVisible(this.isVisibleOptions);
        return this.thisReturnInstance();
    }

    public assertShareSuccessToasterDisplays(): T {
        expect(this.page.shareSuccessToasterMessage.first()).toBeVisible(this.isVisibleOptions);
        return this.thisReturnInstance();
    }
}
