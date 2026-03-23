import { BasePage } from "common/BasePage";

export interface BaseInterface<T extends BasePage> {
    T getP();

    this.pause(milliseconds: number): default void {

      getP().pause(milliseconds);

    }

    refreshPage(): default T {
        this.getP().refreshCurrentPage(getP().getClass());
        return this.getP();
    }

    this.getPageClassInstance(gClass: Class<G>): default <G extends BasePage> G {

      return getP().getPageClassInstance(gClass);

    }
}
