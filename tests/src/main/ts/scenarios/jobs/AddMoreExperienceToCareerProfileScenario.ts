import { BaseScenario } from "common/BaseScenario";
import { ExperienceCareerProfileModalPage } from "pages/careergrowth/profiles/ExperienceCareerProfileModalPage";

export class AddMoreExperienceToCareerProfileScenario implements BaseScenario<ExperienceCareerProfileModalPage, ExperienceCareerProfileModalPage>{

    private position: string;
    private company: string;
    private description: string;
    private startDateMonth: string;
    private startDateYear: string;
    private endDateMonth: string;
    private endDateYear: string;

    public run(entry: ExperienceCareerProfileModalPage): ExperienceCareerProfileModalPage {
        return entry
                .clickAddMoreExperience()
                .fillPositionTitle(position)
                .fillCompanyName(company)
                .fillDescription(description)
                .selectStartDateMonth(startDateMonth)
                .selectStartDateYear(startDateYear)
                .selectEndDateMonth(endDateMonth)
                .selectEndDateYear(endDateYear)
                .clickDoneButton();
    }
}
