// @ts-nocheck
import { BasePage } from "common/BasePage";
import { BaseScenario } from "common/BaseScenario";
import { WelcomePage_New } from "pages/careergrowth/careergrowth/WelcomePage_New";

export class AddCustomSkillToUserScenario implements BaseScenario<BasePage, WelcomePage_New>{

    private skillName: string;

    public run(entry: BasePage): WelcomePage_New {
        return entry
                .goDirectlyTo(WelcomePage_New)
                .refreshPage()
                .clickUpdateCareerProfileLink()
                .clickSkipForNowButton()
                .searchForIntermediateSkill(skillName)
                .selectOptionFromSkillsDropdown(skillName)
                .clickSaveAndContinueButton()
                .clickXButton();
    }
}
