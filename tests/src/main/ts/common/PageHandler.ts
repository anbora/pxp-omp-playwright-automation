import { Page } from "common/testing/playwright";

export class PageHandler {
  pageList: Page[] = [];
  currentPageIndex = 0;

  getCurrentPage() {
    return this.pageList[this.currentPageIndex];
  }

  getPageList() {
    return this.pageList;
  }

  setPageList(pageList: Page[]) {
    this.pageList = pageList;
  }

  getCurrentPageIndex() {
    return this.currentPageIndex;
  }

  setCurrentPageIndex(index: number) {
    this.currentPageIndex = index;
  }
}
