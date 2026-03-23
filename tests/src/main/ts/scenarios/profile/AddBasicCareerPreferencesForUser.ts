import { BasePage } from "common/BasePage";
import { BaseScenario } from "common/BaseScenario";
import { WelcomePage_New } from "pages/careergrowth/careergrowth/WelcomePage_New";

export class AddBasicCareerPreferencesForUser implements BaseScenario <BasePage, WelcomePage_New>{

    private careerGoal: string = "Career Goal";
    private level: string = "Level";
    private workplaceModel: string = "Workplace Model";
    private jobType: string = "Job Type";
    private schedule: string = "Schedule";
    private careerTrack: string = "Career Track";
    private backward: string = "I am open to roles with lower levels of responsibility";
    private internship: string = "Internship";
    private remote: string = "Remote";
    private jobTypeInternship: string = "Internship";
    private fullTime: string = "Full time";
    private management: string = "Management";

    public run(entry: BasePage): WelcomePage_New {
        return entry
                .goDirectlyTo(WelcomePage_New)
                .refreshPage()
                .clickUpdateCareerProfileLink()
                .goToCareerPreferenceTab()
                .selectCareerPreferenceCheckbox(careerGoal, backward)
                .addCareerPreference(level, internship)
                .selectCareerPreferenceCheckbox(workplaceModel, remote)
                .addCareerPreference(jobType, jobTypeInternship)
                .selectCareerPreferenceCheckbox(schedule, fullTime)
                .selectCareerPreferenceCheckbox(careerTrack, management)
                .clickSaveAndContinueButton()
                .clickSaveButton();
    }
}
