import { TalentSourcingAssertions } from "assertions/careergrowth/talentsourcing/TalentSourcingAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { LoginPage } from "pages/other/LoginPage";
import { LoginScenario } from "scenarios/other/LoginScenario";

export class ManageJobVacancyAddFilterTest extends BaseRestTest {

    private static readonly LEAD: string = "Lead";
    private static readonly SENIOR_QA_LEAD: string = "DevSecOps Lead";
    private static readonly RAJENDRAN: string = "Rajendran Sridhar";
    private static readonly PRZEMYSLAW: string = "Przemyslaw Bozowski";
    private static readonly USER_4: string = "user4 4";
    private static readonly ADD_FILTER: string = "Add filter";
    private static readonly ALL_PUBLISHED_VACANCIES: string = "All Published Vacancies";

    public shouldFilterBasedOnScheduleFilter(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.getCypress2User()))
                .goToTalentSourcing()
                .clickOnDisplayVacancyFilter(ManageJobVacancyAddFilterTest.ALL_PUBLISHED_VACANCIES)
                .getFirstJobVacancyListInTalentSourcing()
                .check(TalentSourcingAssertions)
                    .assertThatFirstJobVacancyIsDisplayedOnTalentSourcing()
                .endAssertion()
                .shouldTypeAndSearchJobVacancy(ManageJobVacancyAddFilterTest.LEAD)
                .clickOnKebabMenu(ManageJobVacancyAddFilterTest.SENIOR_QA_LEAD)
                .check(TalentSourcingAssertions)
                    .assertThatOptionsDisplayed()
                .endAssertion()
                .clickOnManageJobVacancy()
                .clickAllTab()
                .clickOnAddFilterButton(ManageJobVacancyAddFilterTest.ADD_FILTER)
                .clickOnFilterValue("Schedule", "Full time")
                .check(TalentSourcingAssertions)
                    .assertThatSuggestedTalentDisplayedForFilter(ManageJobVacancyAddFilterTest.RAJENDRAN)
                .endAssertion();
    }

    public shouldFilterBasedOnJobTypeFilter(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.getCypress2User()))
                .goToTalentSourcing()
                .clickOnDisplayVacancyFilter(ManageJobVacancyAddFilterTest.ALL_PUBLISHED_VACANCIES)
                .getFirstJobVacancyListInTalentSourcing()
                .check(TalentSourcingAssertions)
                    .assertThatFirstJobVacancyIsDisplayedOnTalentSourcing()
                .endAssertion()
                .shouldTypeAndSearchJobVacancy(ManageJobVacancyAddFilterTest.LEAD)
                .clickOnKebabMenu(ManageJobVacancyAddFilterTest.SENIOR_QA_LEAD)
                .check(TalentSourcingAssertions)
                    .assertThatOptionsDisplayed()
                .endAssertion()
                .clickOnManageJobVacancy()
                .clickAllTab()
                .clickOnAddFilterButton(ManageJobVacancyAddFilterTest.ADD_FILTER)
                .clickOnFilterValue("Job Type", "Permanent")
                .check(TalentSourcingAssertions)
                    .assertThatSuggestedTalentDisplayedForFilter(ManageJobVacancyAddFilterTest.PRZEMYSLAW)
                .endAssertion();
    }

    public shouldFilterBasedOnWorkplaceModel(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.getCypress2User()))
                .goToTalentSourcing()
                .clickOnDisplayVacancyFilter(ManageJobVacancyAddFilterTest.ALL_PUBLISHED_VACANCIES)
                .getFirstJobVacancyListInTalentSourcing()
                .check(TalentSourcingAssertions)
                    .assertThatFirstJobVacancyIsDisplayedOnTalentSourcing()
                .endAssertion()
                .shouldTypeAndSearchJobVacancy(ManageJobVacancyAddFilterTest.LEAD)
                .clickOnKebabMenu(ManageJobVacancyAddFilterTest.SENIOR_QA_LEAD)
                .check(TalentSourcingAssertions)
                    .assertThatOptionsDisplayed()
                .endAssertion()
                .clickOnManageJobVacancy()
                .clickAllTab()
                .clickOnAddFilterButton(ManageJobVacancyAddFilterTest.ADD_FILTER)
                .clickOnFilterValue("Workplace Model", "Hybrid")
                .check(TalentSourcingAssertions)
                    .assertThatSuggestedTalentDisplayedForFilter(ManageJobVacancyAddFilterTest.RAJENDRAN)
                .endAssertion();
    }

    public shouldFilterBasedOnCareerTrack(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.getCypress2User()))
                .goToTalentSourcing()
                .clickOnDisplayVacancyFilter(ManageJobVacancyAddFilterTest.ALL_PUBLISHED_VACANCIES)
                .getFirstJobVacancyListInTalentSourcing()
                .check(TalentSourcingAssertions)
                    .assertThatFirstJobVacancyIsDisplayedOnTalentSourcing()
                .endAssertion()
                .shouldTypeAndSearchJobVacancy(ManageJobVacancyAddFilterTest.LEAD)
                .clickOnKebabMenu(ManageJobVacancyAddFilterTest.SENIOR_QA_LEAD)
                .check(TalentSourcingAssertions)
                    .assertThatOptionsDisplayed()
                .endAssertion()
                .clickOnManageJobVacancy()
                .clickAllTab()
                .clickOnAddFilterButton(ManageJobVacancyAddFilterTest.ADD_FILTER)
                .clickOnFilterValue("Career Track", "Management")
                .check(TalentSourcingAssertions)
                    .assertThatSuggestedTalentDisplayedForFilter(ManageJobVacancyAddFilterTest.USER_4)
                .endAssertion();
    }
}
