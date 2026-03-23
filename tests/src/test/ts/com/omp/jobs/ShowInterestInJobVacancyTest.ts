import { JobVacancyDetailsAssertions } from "assertions/careergrowth/jobs/JobVacancyDetailsAssertions";
import { MyOpportunitiesAssertions } from "assertions/careergrowth/jobs/MyOpportunitiesAssertions";
import { ShowInterestModalAssertions } from "assertions/careergrowth/jobs/ShowInterestModalAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

export class ShowInterestInJobVacancyTest extends BaseRestTest {

    private devSecOpsLead: string = "DevSecOps Lead";
    private devopsAzureAulutionArchitect: string = "DevOps Azure Solution Architect";
    private headOfDevelopment: string = "Head of Development in Lumesse";
    private header: string = "Showed interest in ";
    private content: string = "Thanks for your interest in this Job Vacancy!";
    private hint: string = "You can manage your this.applications from your";
    private showedInterest: string = "Showed interest";
    private applications: string = "Applications";
    private applicationURL: string = "https://fake.apply.csod.com";
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser();

    }

    public shouldApplyToShowInterestInAJobVacancy(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .goToCareerGrowthPage()
                .goToVacanciesPageViaCard()
                .typeSearchValue(this.devopsAzureAulutionArchitect)
                .clickJobVacancyCardsDetails(this.devopsAzureAulutionArchitect)
                .check(JobVacancyDetailsAssertions)
                    .assertJobAppliedInfoIsNotDisplayed()
                .endAssertion()
                .clickBackButton()
                .typeSearchValue(this.devSecOpsLead)
                .clickJobVacancyCardsDetails(this.devSecOpsLead)
                .clickApplyButton()
                .check(ShowInterestModalAssertions)
                    .assertThatHeaderIsEqualTo(this.header + this.devSecOpsLead)
                    .assertThatContentIsEqualTo(this.content)
                    .assertThatHintIsEqualTo(this.hint)
                .endAssertion()
                .clickProfileButton()
                .selectLeftMenuTab(this.applications)
                .waitForJobToBeVisible()
                .check(MyOpportunitiesAssertions)
                    .assertThatJobTitleIsPresentOnTheList(this.devSecOpsLead)
                .endAssertion()
                .clickJobCard(this.devSecOpsLead)
                .check(JobVacancyDetailsAssertions)
                    .assertJobAppliedInfoIsDisplayed(this.showedInterest);
    }

    public shouldShowInterestByViewingJobDescriptionOnExternalSite(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToCareerGrowthPage()
                .goToVacanciesPageViaCard()
                .typeSearchValue(this.headOfDevelopment)
                .clickJobVacancyCardsDetails(this.headOfDevelopment)
                .clickViewOnCareerSiteButton()
                .check(ShowInterestModalAssertions)
                    .assertThatHeaderIsEqualTo(this.header + this.headOfDevelopment)
                    .assertThatContentIsEqualTo(this.content)
                    .assertThatHintIsEqualTo(this.hint)
                .endAssertion()
                .clickCloseButton()
                .check(JobVacancyDetailsAssertions)
                    .assertJobAppliedInfoIsDisplayed(this.showedInterest);
    }

    public shouldCheckApplyButtonRedirection(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToCareerGrowthPage()
                .goToVacanciesPageViaTab()
                .typeSearchValue(this.devSecOpsLead)
                .clickJobVacancyCardsDetails(this.devSecOpsLead)
                .check(JobVacancyDetailsAssertions)
                    .assertThatUrlAttachedToButtonEqualTo(this.applicationURL);
    }

    public deleteUser(): void {

      this.deleteUser(this.user);

    }
}
