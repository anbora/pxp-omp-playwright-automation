// @ts-nocheck
import { AbstractShareAssertions } from "assertions/careergrowth/share/AbstractShareAssertions";
import { ShareJobPage } from "pages/careergrowth/share/ShareJobPage";

export class ShareJobAssertions extends AbstractShareAssertions<ShareJobAssertions, ShareJobPage> {

    protected thisReturnInstance(): ShareJobAssertions {

      return this;
    }

    public assertShareJobHeaderDisplays(): ShareJobAssertions {

      return super.assertShareModalHeaderDisplays();

    }

    public assertShareSuccessToasterDisplays(): ShareJobAssertions {

      return super.assertShareSuccessToasterDisplays();

    }
}
