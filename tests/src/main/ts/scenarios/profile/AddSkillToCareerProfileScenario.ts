import { BaseScenario } from "common/BaseScenario";
import { SkillsCareerProfileModalPage } from "pages/careergrowth/profiles/SkillsCareerProfileModalPage";

export class AddSkillToCareerProfileScenario implements BaseScenario<SkillsCareerProfileModalPage, SkillsCareerProfileModalPage>{

    private readonly skillName: string;
    private readonly skillLevel: string;

    public run(entry: SkillsCareerProfileModalPage): SkillsCareerProfileModalPage {
        return entry
                .searchForSkill(skillName, skillLevel)
                .selectOptionFromSkillsDropdown(skillName);

    }
}
