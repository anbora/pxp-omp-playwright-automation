import { VacanciesListAssertions } from "assertions/careergrowth/careergrowth/VacanciesListAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { AllFiltersModalPage } from "pages/careergrowth/jobs/AllFiltersModalPage";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

export class JobVacanciesFilteringByJobRoleTest extends BaseRestTest {

    private one: string = "1";
    private five: number = 5;
    private jobRoles: string = "Job Roles";
    private rodentsTest: string = "Rodents stylists -  Rodents stylists";
    private rodentsTestFilter: string = "Rodents stylists";
    private guineaPigStylist: string = "Guinea Pig Stylist";
    private miceStylist: string = "Mice Stylist";
    private marmotStylist: string = "Marmot Stylist";
    private chipmunkStylist: string = "Chipmunk Stylist";
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public shouldFilterJobVacanciesByJobRole(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .goToCareerGrowthPage()
                .goToVacanciesPageViaCard()
                .openFiltersModal(AllFiltersModalPage)
                .searchForFilterValue(this.jobRoles, this.rodentsTest)
                .applyFilters()
                .check(VacanciesListAssertions)
                    .assertThatFilterIsApplied(this.rodentsTestFilter)
                    .assertThatVacancyCardsDisplayProperNumberOfCards(this.five)
                    .assertThatJobVacancyIsOnTheList(this.chipmunkStylist)
                    .assertThatJobVacancyIsOnTheList(this.guineaPigStylist)
                    .assertThatJobVacancyIsOnTheList(this.marmotStylist)
                    .assertThatJobVacancyIsOnTheList(this.miceStylist)
//                    .assertThatPageButtonIsNotDisplayed(one)
        ;
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
