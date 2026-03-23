import { Locator, Page } from "common/testing/playwright";

export interface Interface1 {

    removeSkillButton(skill: string): default Locator {

      return getP().locator("//div[contains(@class, 'ed-tag-container')][text()='" + skill + "']/child::button");

    }
    defaultSkillLevelSelect(): default Locator {
      return getP().locator(".talent-marketplace-config-radio-skills select");
    }

    Page getP();
}
