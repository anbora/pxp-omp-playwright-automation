import { Page } from "common/testing/playwright";

export class TranslationChecker {
  constructor(private readonly page: Page) {
    void this.page;
  }

  public getListOfTranslatedElements(exclude: Array<string>): Array<string> {
    return exclude;
  }

  public getListOfNotTranslatedElements(): Array<string> {
    return [];
  }
}
