import { TalentSourcingAssertions } from "assertions/careergrowth/talentsourcing/TalentSourcingAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginPage } from "pages/other/LoginPage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";
import { AddSkillToNewUserScenario_SkillLevel } from "scenarios/profile/AddSkillToNewUserScenario_SkillLevel";

export class CheckJobAndSearchInTalentSourcingTest extends BaseRestTest {
    private static readonly SORRY_NOTHING_MATCHES_YOUR_CRITERIA_TRY_DIFFERENT_KEYWORDS: string = "Sorry, nothing matches your criteria! Try different keywords";
    private static readonly ALL_PUBLISHED_VACANCIES: string = "All Published Vacancies";
    private static readonly QA_12344: string = "QA12344";
    private static readonly SENIOR_QA_LEAD: string = "DevSecOps Lead";
    private static readonly LEAD: string = "Lead";
    private opportunityMarketplace: string = "Opportunity Marketplace";
    private userModel: UserModel;

    public initialize(): void {

    this.userModel = this.createUser(true);

    }

    public shouldCheckIfJobIsDisplayedInTalentSourcing(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.userModel))
                .run(new AddRoleAndFamilyToNewUserScenario(this.userModel.name))
                .run(new AddSkillToNewUserScenario_SkillLevel())
                .goToTalentSourcing()
                .clickOnDisplayVacancyFilter(CheckJobAndSearchInTalentSourcingTest.ALL_PUBLISHED_VACANCIES)
                .getFirstJobVacancyListInTalentSourcing()
                .check(TalentSourcingAssertions)
                    .assertThatFirstJobVacancyIsDisplayedOnTalentSourcing()
                .endAssertion();
    }

    public shouldCheckIfSearchingIsWorking(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.userModel))
                .goToTalentSourcing()
                .clickOnDisplayVacancyFilter(CheckJobAndSearchInTalentSourcingTest.ALL_PUBLISHED_VACANCIES)
                .getFirstJobVacancyListInTalentSourcing()
                .shouldTypeAndSearchJobVacancy(CheckJobAndSearchInTalentSourcingTest.LEAD)
                .check(TalentSourcingAssertions)
                    .assertThatFirstJobVacancyIsDisplayedOnTalentSourcing()
                    .assertThatJobTitleName(CheckJobAndSearchInTalentSourcingTest.SENIOR_QA_LEAD, CheckJobAndSearchInTalentSourcingTest.SENIOR_QA_LEAD)
                    .assertThatBookmarkAndAppliedTextIsDisplayed(CheckJobAndSearchInTalentSourcingTest.SENIOR_QA_LEAD)
                .endAssertion();
    }

    public shouldCheckMessageIfNoJobsFoundWhileSearching(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.userModel))
                .goToTalentSourcing()
                .clickOnDisplayVacancyFilter(CheckJobAndSearchInTalentSourcingTest.ALL_PUBLISHED_VACANCIES)
                .getFirstJobVacancyListInTalentSourcing()
                .shouldTypeAndSearchJobVacancy(CheckJobAndSearchInTalentSourcingTest.QA_12344)
                .check(TalentSourcingAssertions)
                    .assertThatValidationMessageIfNoResultFound(CheckJobAndSearchInTalentSourcingTest.SORRY_NOTHING_MATCHES_YOUR_CRITERIA_TRY_DIFFERENT_KEYWORDS, CheckJobAndSearchInTalentSourcingTest.SORRY_NOTHING_MATCHES_YOUR_CRITERIA_TRY_DIFFERENT_KEYWORDS)
                .endAssertion();
    }

    public afterClass(): void {

      this.deleteUser(this.userModel);

    }
}
