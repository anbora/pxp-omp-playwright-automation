import { BasePage } from "common/BasePage";
import { LoadState, Locator } from "common/testing/playwright";
import { CareerGrowthCartComponent } from "pages/careergrowth/careergrowth/components/CareerGrowthCartComponent";

export interface CareerGrowthCarouselComponent<T extends BasePage> extends CareerGrowthCartComponent<T> {
    T getP();
    pageButton(pageNumber: string): default Locator {
      return getP().getLocatorWithParam("//div[@class='pagination']/child::button[text()='%s'] | //div[@class='pagination']/child::a[text()='%s']", pageNumber, pageNumber);
    }
    rightArrowButton(): default Locator {
      return getP().locator("//div[@class='pagination']/descendant::a[contains(text(), '»')] | //div[@class='pagination']/descendant::button[contains(text(), '»')]").build();
    }
    leftArrowButton(): default Locator {
      return getP().locator("//div[@class='pagination']/descendant::a[contains(text(), '«')] | //div[@class='pagination']/descendant::button[contains(text(), '«')]").build();
    }

    clickRightArrowButton(): default T {
        this.rightArrowButton().click();
        this.getP().getPage().waitForLoadState(LoadState.DOMCONTENTLOADED);
        return this.getP();
    }

    clickLeftArrowButton(): default T {
        this.leftArrowButton().click();
        return this.getP();
    }

    clickPageNumber(pageNumber: string): default T {
        this.pageButton(pageNumber).click();
        this.getP().getPage().waitForLoadState();
        return this.getP();
    }
}
