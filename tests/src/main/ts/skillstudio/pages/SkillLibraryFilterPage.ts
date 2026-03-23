import { PageHandler } from "common/PageHandler";
import { Logger } from "common/testing/logger";
import { Browser, Locator } from "common/testing/playwright";
import { SkillLibraryFilterAssertions } from "skillstudio/assertions/SkillLibraryFilterAssertions";
import { SkillsStudioGlobalNavigationPage } from "skillstudio/pages/SkillsStudioGlobalNavigationPage";

export class SkillLibraryFilterPage extends SkillsStudioGlobalNavigationPage{

    public FilterButton: Locator = this.page.locator("//span[text()='Filters']//ancestor::button");
    public VerifySkillFilterFlyoutTitle: Locator = this.page.locator("//div[@class='sc-dsAker iXBIwG']//div[text()='Skill library filters']");
    public CloseFlyoutButtonLoc: Locator = this.page.locator("//button[@title='close']");
    public typeInputValueFilterLoc(filtertype: string): Locator {
      return this.getLocatorWithParam("//h6[text()='%s']/ancestor::div[1]//input", filtertype);
    }
    public select_organization_loc(org_name: string): Locator {
      return this.getLocatorWithParam("//li[text()='%s']", org_name);
    }
    public selectFilterDropdownParamLoc(value: string): Locator {
      return this.getLocatorWithParam("//li[@data-value='%s']", value);
    }
    public selectLanguagesFromDropdownLoc(value: string): Locator {
      return  getLocatorWithParam("//strong[text()='%s']//ancestor::li", value);
    }
    public clickLinkedSkillDropdownLoc: Locator = this.page.locator("//button[text()='Select...']");
    public selectLinkedSkillValueLoc(value: string): Locator {
      return this.getLocatorWithParam("//li[text()='%s']", value);
    }
    public filterApplyButton: Locator = this.page.locator("//button[@aria-label='Apply']");

    public verifyAppliedFilterParamLoc(value: string): Locator {

      return this.getLocatorWithParam("");

    }
    constructor(browser: Browser, pageHandler: PageHandler, logger: Logger, portalIndex: number) {
      super(browser, pageHandler, logger, portalIndex);
    }

    public clickOnFilter(): SkillLibraryFilterPage {
        FilterButton.click();
        return this;
    }

    public SkillLibraryFilterPage filterParameters( HashMap<String, String[]> dictionary )
    {
        for (const key of dictionary.keySet()) {
            values: string[] = dictionary.get(key);
          if(key=="Status": key=="Sources" ||):  {
                for (const value of values) {
                    this.typeInputValueFilterLoc(key).fill(value);
                    this.selectFilterDropdownParamLoc(value.toLowerCase()).click();
                    System.out.println("asdfasdf");
                    this.page.waitForTimeout(10000);
                }
            } else if (key == "Linked Skill") {
                for (const value of values) {
                    clickLinkedSkillDropdownLoc.click();
                    this.selectLinkedSkillValueLoc(value).click();
                    this.page.waitForTimeout(10000);
                    System.out.println("freerv");
                }
            } else if (key == "Languages") {
                for (const value of values) {
                    this.typeInputValueFilterLoc(key).fill(value);
                    this.selectLanguagesFromDropdownLoc(value).click();
                    this.page.waitForTimeout(10000);
                    System.out.println("freerv");
                }
            }
            System.out.println(key + ": " + Arrays.toString(values));
        }
        filterApplyButton.click();
        //CloseFlyoutButtonLoc.click();
        return this;
    }
}
