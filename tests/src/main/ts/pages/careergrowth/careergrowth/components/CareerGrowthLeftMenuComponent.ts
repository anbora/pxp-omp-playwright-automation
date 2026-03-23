import { BasePage } from "common/BasePage";
import { Locator } from "common/testing/playwright";
import { BaseInterface } from "pages/careergrowth/careergrowth/components/BaseInterface";
import { LeftMenuComponentEnum } from "pages/careergrowth/careergrowth/components/LeftMenuComponentEnum";

export interface CareerGrowthLeftMenuComponent<T extends BasePage> extends BaseInterface<T> {
    T getP();

    leftMenuOptionElement(value: string): default Locator {

      return getP().getByText(value, true).build();

    }

    clickInLeftMenuOption(leftMenuComponentEnum: LeftMenuComponentEnum, gClass: Class<G>): default <G extends BasePage> G {
        this.leftMenuOptionElement(leftMenuComponentEnum.value).click();
        return this.getPageClassInstance(gClass);
    }
}
