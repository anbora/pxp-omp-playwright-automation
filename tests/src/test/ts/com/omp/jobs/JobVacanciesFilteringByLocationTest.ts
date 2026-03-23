import { VacanciesListAssertions } from "assertions/careergrowth/careergrowth/VacanciesListAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { TeamsResponsibleEnum } from "common/enums/TeamsResponsibleEnum";
import { JobModel } from "models/job/JobModel";
import { UserModel } from "models/user/UserModel";
import { AllFiltersModalPage } from "pages/careergrowth/jobs/AllFiltersModalPage";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";

export class JobVacanciesFilteringByLocationTest extends BaseRestTest {

    private jobWithLocation: JobModel;
    private user: UserModel;
    private locationId: string = "1_751";
    private locationValue: string = "Recife, Brazil";
    private title: string = UUID.randomUUID().toString();
    private jobId: string;
    private twelve: number = 12;
    private one: number = 1;

    public initialize(): void {
      this.jobWithLocation = this.getObjectFromJson("fixtures/job/PublicOpportunityDto.json", JobModel);
      this.jobId = createJobWithLocation(this.title, this.locationId, this.jobWithLocation);
      this.user = this.createUser();
    }

    public shouldFilterVacanciesByLocation(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .run(new AddRoleAndFamilyToNewUserScenario(this.user.name))
                .goToCareerGrowthPage()
                .goToVacanciesPageViaCard()
                .typeSearchValue(this.title)
                .check(VacanciesListAssertions)
                    .assertThatVacancyCardsDisplayProperNumberOfCards(this.one)
                .endAssertion()
                .clearSearchKeywordCriteria()
                .refreshPage()
                .check(VacanciesListAssertions)
                    .assertThatVacancyCardsDisplayProperNumberOfCards(this.twelve)
                .endAssertion()
                .openFiltersModal(AllFiltersModalPage)
                .searchForLocation(this.locationValue)
                .applyFilters()
                .check(VacanciesListAssertions)
                    .assertThatFilterIsApplied(this.locationValue)
                    .assertThatVacancyCardsDisplayProperNumberOfCards(this.one);
    }

    public cleanUp(): void {
        this.deleteJob(this.jobId);
        this.deleteUser(this.user);
    }
}
