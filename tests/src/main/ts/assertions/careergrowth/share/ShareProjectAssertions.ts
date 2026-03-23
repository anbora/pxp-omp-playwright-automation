import { AbstractShareAssertions } from "assertions/careergrowth/share/AbstractShareAssertions";
import { assertThat } from "common/testing/playwrightAssertions";
import { ShareProjectPage } from "pages/careergrowth/share/ShareProjectPage";

export class ShareProjectAssertions extends AbstractShareAssertions<ShareProjectAssertions, ShareProjectPage> {

    protected thisReturnInstance(): ShareProjectAssertions {

      return this;
    }

    public assertShareProjectHeaderDisplays(): ShareProjectAssertions {

      return super.assertShareModalHeaderDisplays();

    }

    public assertShareSuccessToasterDisplays(): ShareProjectAssertions {
        this.assertThat(this.page.shareSuccessToasterMessage).isVisible(this.isVisibleOptions);
        return this;
    }
}
