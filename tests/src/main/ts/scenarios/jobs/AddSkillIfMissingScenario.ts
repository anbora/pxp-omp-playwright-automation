import { BaseScenario } from "common/BaseScenario";
import { ResultContainer } from "models/ResultContainer";
import { JobVacancyDetailsPage } from "pages/careergrowth/jobs/JobVacancyDetailsPage";

export class AddSkillIfMissingScenario implements BaseScenario<JobVacancyDetailsPage, JobVacancyDetailsPage>{
    public static readonly ADDED_SKILL: number = 1;
    public static readonly INTERMEDIATE: number = 2;
    public static readonly NO_LEVELS: number = 1;
    private skillLabel: string;
    private resultContainer: ResultContainer;

    constructor(skillLabel: string, resultContainer: ResultContainer) {
        this.skillLabel = skillLabel;
        this.resultContainer = resultContainer;
    }

    public run(entry: JobVacancyDetailsPage): JobVacancyDetailsPage {
        entry.clickShowMoreSkills();

      if(!entry.getAllSkills().allTextContents().contains(skillLabel): ):  {
            entry.clickEditVacancyButton()
                 .addSkillToProficiencyLevel(skillLabel, "Intermediate")
                 .clickSaveButton();
            resultContainer.setValue(String.valueOf(Integer.parseInt(resultContainer.getValue()) + ADDED_SKILL));
        }
        return entry;
    }
}
