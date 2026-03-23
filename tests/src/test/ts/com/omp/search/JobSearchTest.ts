import { VacanciesListAssertions } from "assertions/careergrowth/careergrowth/VacanciesListAssertions";
import { MyOpportunitiesAssertions } from "assertions/careergrowth/jobs/MyOpportunitiesAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { JobDescription } from "models/job/JobDescription";
import { JobModel } from "models/job/JobModel";
import { UserModel } from "models/user/UserModel";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";
import { AddSkillToNewUserScenario_SkillLevel } from "scenarios/profile/AddSkillToNewUserScenario_SkillLevel";

export class JobSearchTest extends BaseRestTest {

    private readonly ONE_VALUE: number = 1;
    private readonly APPLICATIONS: string = "Applications";
    private readonly TITLE1: string = "Search_by_Title_" + UUID.randomUUID();
	private readonly TITLE2: string = "Search_by_Title_" + UUID.randomUUID();
	private readonly TITLE3: string = "Search_by_Title_" + UUID.randomUUID();
	private readonly DESCRIPTION: string = "Search_by_Description_" + UUID.randomUUID();
	private readonly REFERENCE_NO: string = "Search_by_ReferenceNo_" + UUID.randomUUID();
    private id1: string;
    private id2: string = "restassureJob_" + this.TITLE2;
    private id3: string = "restassureJob_" + this.TITLE3;

    private user: UserModel;

    public initialize(): void {
        let jobModel1: JobModel = this.getObjectFromJson("fixtures/job/PublicOpportunityDto.json", JobModel);
        let jobModel2: JobModel = this.getObjectFromJson("fixtures/job/PublicOpportunityDto.json", JobModel);

        let jobDescriptions: Array<JobDescription> = jobModel1.getJobDescriptions();
        jobDescriptions.get(0).setDescription(this.DESCRIPTION);
        jobModel1.setJobDescriptions(jobDescriptions);
        jobModel1.setId(this.id2);

        jobModel2.setReferenceNumber(this.REFERENCE_NO);
        jobModel2.setId(this.id3);

      this.id1 = this.createJob(this.TITLE1);
      this.id2 = this.createJob(this.TITLE2, jobModel1);
      this.id3 = this.createJob(this.TITLE3, jobModel2);

      this.user = this.createUser();
    }

    public shouldSearchJobByTitle(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .run(new AddRoleAndFamilyToNewUserScenario(this.user.name))
                .run(new AddSkillToNewUserScenario_SkillLevel())
                .goToCareerGrowthPage()
                .goToVacanciesPageViaCard()
                .check(VacanciesListAssertions)
                    .assertThatSearchHerePlaceholderIsDisplayed()
                    .assertThatAllJobVacanciesHeaderIsDisplayed()
                .endAssertion()
                .typeSearchValue(this.TITLE1)
                .check(VacanciesListAssertions)
                    .assertThatVacancyCardsDisplayProperNumberOfCards(this.ONE_VALUE)
                    .assertThatJobVacancyIsOnTheList(this.TITLE1)
                .endAssertion()
                .clearSearchKeywordCriteria()
                .typeSearchValue(this.TITLE1)
                .check(VacanciesListAssertions)
                    .assertThatVacancyCardsDisplayProperNumberOfCards(this.ONE_VALUE)
                    .assertThatJobVacancyIsOnTheList(this.TITLE1)
                .endAssertion()
                .clearSearchKeywordCriteria()
                .clickRightArrowButton()
                .check(VacanciesListAssertions)
                    .assertThatAllJobVacanciesHeaderIsDisplayed()
                .endAssertion()
                .clickMyJobVacanciesButton()
                .check(MyOpportunitiesAssertions)
                    .assertThatSubmenuTabIsSelected(this.APPLICATIONS);
    }

    public shouldSearchJobByDescription(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToCareerGrowthPage()
                .goToVacanciesPageViaCard()
                .typeSearchValue(this.DESCRIPTION)
                .check(VacanciesListAssertions)
                    .assertThatVacancyCardsDisplayProperNumberOfCards(this.ONE_VALUE);
    }

    public shouldSearchJobByReferenceNumber(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToCareerGrowthPage()
                .goToVacanciesPageViaCard()
                .typeSearchValue(this.REFERENCE_NO)
                .check(VacanciesListAssertions)
                    .assertThatVacancyCardsDisplayProperNumberOfCards(this.ONE_VALUE);
    }

    public shouldRemoveJobsViaREST(): void {
        this.deleteJob(this.id1);
        this.deleteJob(this.id2);
        this.deleteJob(this.id3);
    }

    public shouldCheckIfJobsWereDeleted(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToCareerGrowthPage()
                .goToVacanciesPageViaCard()
                .typeSearchValueAndWaitForEmptyResults(this.TITLE1)
                .check(VacanciesListAssertions)
                    .assertThatThereIsNoSuggestions()
                .endAssertion()
                .typeSearchValueAndWaitForEmptyResults(this.DESCRIPTION)
                .check(VacanciesListAssertions)
                    .assertThatThereIsNoSuggestions()
                .endAssertion()
                .typeSearchValueAndWaitForEmptyResults(this.REFERENCE_NO)
                .check(VacanciesListAssertions)
                    .assertThatThereIsNoSuggestions();
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
