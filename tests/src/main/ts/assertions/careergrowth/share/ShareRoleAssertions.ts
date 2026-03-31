// @ts-nocheck
import { AbstractShareAssertions } from "assertions/careergrowth/share/AbstractShareAssertions";
import { BaseAssertion } from "common/BaseAssertion";
import { ShareRolePage } from "pages/careergrowth/share/ShareRolePage";

export class ShareRoleAssertions extends AbstractShareAssertions<ShareRoleAssertions, ShareRolePage> {

    protected thisReturnInstance(): ShareRoleAssertions {

      return this;
    }

    public assertShareRoleHeaderDisplays(): ShareRoleAssertions {
        this.assertShareModalHeaderDisplays();
        return this;
    }

    public assertShareSuccessToasterDisplays(): ShareRoleAssertions {

      return super.assertShareSuccessToasterDisplays();

    }
}
