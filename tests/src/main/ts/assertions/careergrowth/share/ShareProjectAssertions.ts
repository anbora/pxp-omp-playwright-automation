// @ts-nocheck
import { AbstractShareAssertions } from "assertions/careergrowth/share/AbstractShareAssertions";
import { ShareProjectPage } from "pages/careergrowth/share/ShareProjectPage";
import { expect } from "common/testing/playwright";

export class ShareProjectAssertions extends AbstractShareAssertions<ShareProjectAssertions, ShareProjectPage> {

    protected thisReturnInstance(): ShareProjectAssertions {

      return this;
    }

    public assertShareProjectHeaderDisplays(): ShareProjectAssertions {

      return super.assertShareModalHeaderDisplays();

    }

    public assertShareSuccessToasterDisplays(): ShareProjectAssertions {
        expect(this.page.shareSuccessToasterMessage).toBeVisible(this.isVisibleOptions);
        return this;
    }
}
