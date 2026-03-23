import { BasePage } from "common/BasePage";
import { BaseScenario } from "common/BaseScenario";
import { CareerPathPage_New } from "pages/careergrowth/careergrowth/CareerPathPage_New";
import { WelcomePage_New } from "pages/careergrowth/careergrowth/WelcomePage_New";

export class AddSkillToNewUserScenario_SkillLevel implements BaseScenario<BasePage, WelcomePage_New>{

    private static readonly skillName: string = "JavaScript";

    public run(entry: BasePage): WelcomePage_New {
        return entry
                .goDirectlyTo(WelcomePage_New)
                .refreshPage()
                .clickUpdateCareerProfileLink()
                .clickSkipForNowButton()
                .searchForIntermediateSkill(skillName)
                .selectOptionFromSkillsDropdown(skillName)
                .clickSaveAndContinueButton()
                .clickSkipForNowButton()
                .clickSkipForNowButton()
                .clickSaveButton();
    }
}
