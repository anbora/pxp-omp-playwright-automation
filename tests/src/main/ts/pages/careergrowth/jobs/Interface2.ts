import { Locator, Page } from "common/testing/playwright";

export interface Interface2 {

    default Locator skillContainer(int n) { return getP().locator(".skill-container div>div.skill-level-display:nth-child(" + n + ")"); };
    default Locator skillContainer(String proficiencyLevel) {return getP().locator("//div[contains(@class, 'ed-skill-section')][descendant::h3[text()='" + proficiencyLevel + "']]/descendant::div[contains(@class, 'ed-tag-container')]"); };

    Page getP();
}
