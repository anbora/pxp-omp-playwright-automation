// @ts-nocheck
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { WelcomePage_New } from "pages/careergrowth/careergrowth/WelcomePage_New";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

export class WelcomeCareerGrowthTranslationTest extends BaseRestTest {

    private user: UserModel;
    private listOfExcludedStringForLandingPage: Array<string> = [];
    private careerExploration: string = "Career Exploration";
    private suggestions: string = "Suggestions";
    private jobRoles: string = "Job Roles";
    private jobVacancies: string = "Job Vacancies";
    private projects: string = "Projects";
    private mentorships: string = "Mentorships";

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public shouldCheckTranslationForWelcomePage(): void {
        this.listOfExcludedStringForLandingPage.addAll(Arrays.asList("20%", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "master", "+", this.user.fullName, "Test This"));
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .changeUserDefinedLanguage("Pseudo Localization (xx-XX-native)")
                .goDirectlyTo(WelcomePage_New)
                .checkTranslationWithoutPageRefresh(WelcomePage_New, this.listOfExcludedStringForLandingPage)
                .hoverOverCard(this.careerExploration)
                .checkTranslationWithoutPageRefresh(WelcomePage_New, this.listOfExcludedStringForLandingPage)
                .hoverOverCard(this.suggestions)
                .checkTranslationWithoutPageRefresh(WelcomePage_New, this.listOfExcludedStringForLandingPage)
                .hoverOverCard(this.jobRoles)
                .checkTranslationWithoutPageRefresh(WelcomePage_New, this.listOfExcludedStringForLandingPage)
                .hoverOverCard(this.jobVacancies)
                .checkTranslationWithoutPageRefresh(WelcomePage_New, this.listOfExcludedStringForLandingPage)
                .hoverOverCard(this.projects)
                .checkTranslationWithoutPageRefresh(WelcomePage_New, this.listOfExcludedStringForLandingPage)
                .hoverOverCard(this.mentorships)
                .checkTranslationWithoutPageRefresh(WelcomePage_New, this.listOfExcludedStringForLandingPage);
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
