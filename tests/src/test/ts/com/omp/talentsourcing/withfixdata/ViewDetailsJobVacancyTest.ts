import { TalentSourcingAssertions } from "assertions/careergrowth/talentsourcing/TalentSourcingAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginPage } from "pages/other/LoginPage";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

export class ViewDetailsJobVacancyTest extends BaseRestTest {

    private static readonly QA: string = "Lead";
    private static readonly SENIOR_QA_LEAD: string = "DevSecOps Lead";
    private static readonly JOB_VACANCY: string = "Job Vacancy";
    private static readonly DESCRIPTION: string = "Description";
    private static readonly ALL_PUBLISHED_VACANCIES: string = "All Published Vacancies";
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public shouldCheckViewDetailsForJobVacancy(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .goToTalentSourcing()
                .clickOnDisplayVacancyFilter(ViewDetailsJobVacancyTest.ALL_PUBLISHED_VACANCIES)
                .getFirstJobVacancyListInTalentSourcing()
                .check(TalentSourcingAssertions)
                    .assertThatFirstJobVacancyIsDisplayedOnTalentSourcing()
                .endAssertion()
                .shouldTypeAndSearchJobVacancy(ViewDetailsJobVacancyTest.QA)
                .clickOnKebabMenu(ViewDetailsJobVacancyTest.SENIOR_QA_LEAD)
                .check(TalentSourcingAssertions)
                    .assertThatOptionsDisplayed()
                .endAssertion()
                .clickOnViewDetail()
                .check(TalentSourcingAssertions)
                    .assertThatTitleForViewDetails(ViewDetailsJobVacancyTest.JOB_VACANCY)
                    .assertThatTitleForViewDetails(ViewDetailsJobVacancyTest.DESCRIPTION)
                .endAssertion()
                .clickOnBackButton()
                .check(TalentSourcingAssertions)
                    .assertThatJobTitleName(ViewDetailsJobVacancyTest.SENIOR_QA_LEAD, ViewDetailsJobVacancyTest.SENIOR_QA_LEAD)
                .endAssertion();
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
