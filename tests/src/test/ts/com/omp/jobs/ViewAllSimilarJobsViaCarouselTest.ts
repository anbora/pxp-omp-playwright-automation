import { VacanciesListAssertions } from "assertions/careergrowth/careergrowth/VacanciesListAssertions";
import { AllFiltersModalAssertions } from "assertions/careergrowth/jobs/AllFiltersModalAssertions";
import { JobVacancyDetailsAssertions } from "assertions/careergrowth/jobs/JobVacancyDetailsAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { AllFiltersModalPage } from "pages/careergrowth/jobs/AllFiltersModalPage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

export class ViewAllSimilarJobsViaCarouselTest extends BaseRestTest {

    private five: number = 5;
    private twelve: number = 12;
    private jobRoles: string = "Job Roles";
    private unusuals: string = "Unusuals";
    private paranormalTourGuide: string = "Paranormal Tour Guide";
    private marmotStylist: string = "Marmot stylist";

    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser();

    }

    public shouldCheckViewAllLinkForSimilarJobsVacanciesOnRolePage(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
//                .run(new AddRoleAndFamilyToNewUserScenario(user.name))
                .goToCareerGrowthPage()
                .goToRolesPageViaCard()
                .typeSearchValue(this.unusuals)
                .goToFirstRoleCard()
                .clickViewAllButton()
                .check(VacanciesListAssertions)
                    .assertThatFilterIsApplied(this.unusuals)
                    .assertThatVacancyCardsDisplayProperNumberOfCards(this.twelve)
                .endAssertion()
                .clickRightArrowButton()
                .check(VacanciesListAssertions)
                    .assertThatVacancyCardsDisplayNumberOfCardsEquals(this.five)
                .endAssertion()
                .openFiltersModal(AllFiltersModalPage)
                .check(AllFiltersModalAssertions)
                    .assertThatFilterOptionsIsChecked(this.jobRoles, this.unusuals);
    }

    public shouldCheckViewAllLinkForSimilarJobsVacanciesOnJobVacancyPage(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToCareerGrowthPage()
                .goToVacanciesPageViaCard()
                .typeSearchValue(this.marmotStylist)
                .goToFirstJobVacancyOnAllJobsList()
                .check(JobVacancyDetailsAssertions)
                    .assertThatViewAllLinkIsNotDisplayed()
                .endAssertion()
                .clickBackButton()
                .typeSearchValue(this.paranormalTourGuide)
                .goToFirstJobVacancyOnAllJobsList()
                .clickViewAllButton()
                .check(VacanciesListAssertions)
                    .assertThatFilterIsApplied(this.unusuals)
                    .assertThatVacancyCardsDisplayProperNumberOfCards(this.twelve)
                .endAssertion()
                .clickRightArrowButton()
                .check(VacanciesListAssertions)
                    .assertThatVacancyCardsDisplayNumberOfCardsEquals(this.five)
                .endAssertion()
                .openFiltersModal(AllFiltersModalPage)
                .check(AllFiltersModalAssertions)
                    .assertThatFilterOptionsIsChecked(this.jobRoles, this.unusuals);
    }

    public deleteUser(): void {

      this.deleteUser(this.user);

    }
}
