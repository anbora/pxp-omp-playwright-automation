import { EditJobDiscardChangesModalAssertions } from "assertions/careergrowth/jobs/EditJobDiscardChangesModalAssertions";
import { EditJobVacancyAssertions } from "assertions/careergrowth/jobs/EditJobVacancyAssertions";
import { MyOpportunitiesAssertions } from "assertions/careergrowth/jobs/MyOpportunitiesAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { MyOpportunitiesPage } from "pages/careergrowth/jobs/MyOpportunitiesPage";
import { AddWorkHistoryToCareerProfileScenario } from "scenarios/jobs/AddWorkHistoryToCareerProfileScenario";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddBasicCareerPreferencesForUser } from "scenarios/profile/AddBasicCareerPreferencesForUser";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";
import { AddSkillToNewUserScenario_SkillLevel } from "scenarios/profile/AddSkillToNewUserScenario_SkillLevel";

export class EditDismissedJobVacancyTest extends BaseRestTest {

    public static readonly BEGINNER: string = "Beginner";
    public static readonly ADVANCED: string = "Advanced";
    private readonly SKILL_PIANO: string = "solo piano";
    private readonly SKILL_LISTENING: string = "listening skills";
    private readonly dismissed: string = "Dismissed";
    private readonly javaDeveloper: string = "Java developer";
    private readonly lumesse: string = "Lumesse";
    private readonly july: string = "Jul";
    private readonly year_2020: string = "2020";
    private readonly year_2023: string = "2023";
    private readonly javaDeveloperFullTitle: string = "Unusual job family -  Java developer";
    private readonly level: string = "Level";
    private readonly internship: string = "Internship";
    private readonly hybrid: string = "Hybrid";
    private readonly fullTime: string = "Full time";
    private readonly flatSurfaceConservator: string = "Flat surface conservator " + UUID.randomUUID();
    private coding: string = "coding";
    private october: string = "Oct";
    private year_2017: string = "2017";
    private june: string = "Jun";
    private year_2022: string = "2022";
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser();

    }

    public shouldDismissJob(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .run(new AddRoleAndFamilyToNewUserScenario(this.user.name))
                .run(new AddSkillToNewUserScenario_SkillLevel())
                .run(new AddBasicCareerPreferencesForUser())
                .clickUpdateCareerProfileLink()
                .run(new AddWorkHistoryToCareerProfileScenario(this.javaDeveloper, this.lumesse, this.coding,this.october,this.year_2017,this.june,this.year_2022 ))
                .clickSaveAndContinueButton()
                .clickXButton()
                .goToSuggestionsPageViaTab()
                .waitForSuggestions()
                .dismissFirstSuggestedJobCard();
    }

    public shouldAddSkillToDismissedJob(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToMePageProfile()
                .clickOpenJobsTab()
                .selectLeftMenuTab(this.dismissed)
                .waitForJobToBeVisible()
                .editFirstJob()
                .removeAllSkills()
                .addSkillToProficiencyLevel(this.SKILL_PIANO, EditDismissedJobVacancyTest.BEGINNER)
                .check(EditJobVacancyAssertions)
                    .assertThatSkillIsAddedToLevel(this.SKILL_PIANO, EditDismissedJobVacancyTest.BEGINNER)
                .endAssertion()
                .clickSaveButtonAndGoBackToMyOpportunitiesPage();
    }

    public shouldCheckSkillVisibility(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToMePageProfile()
                .clickOpenJobsTab()
                .selectLeftMenuTab(this.dismissed)
                .waitForJobToBeVisible()
                .waitForSkillToBeVisible(this.SKILL_PIANO)
                .check(MyOpportunitiesAssertions)
                    .assertThatSkillChipIsDisplayedForFirstJob(this.SKILL_PIANO)
                .endAssertion();
    }

    public shouldCheckIfDiscardChangesModalAppears(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToMePageProfile()
                .clickOpenJobsTab()
                .selectLeftMenuTab(this.dismissed)
                .editFirstJob()
                .addSkillToProficiencyLevel(this.SKILL_LISTENING, EditDismissedJobVacancyTest.ADVANCED)
                .check(EditJobVacancyAssertions)
                    .assertThatSkillIsAddedToLevel(this.SKILL_LISTENING, EditDismissedJobVacancyTest.ADVANCED)
                .endAssertion()
                .clickCancelButton()
                .check(EditJobDiscardChangesModalAssertions)
                    .assertThatDiscardChangesTitleIsDisplayed()
                .endAssertion()
                .clickCancelButton()
                .check(EditJobVacancyAssertions)
                    .assertThatEditJobVacancyPageTitleIsDisplayed()
                .endAssertion()
                .clickCancelButton()
                .check(EditJobDiscardChangesModalAssertions)
                    .assertThatDiscardChangesTitleIsDisplayed()
                .endAssertion()
                .clickDiscardButton(MyOpportunitiesPage)
                .check(MyOpportunitiesAssertions)
                    .assertThatJobIsPresentOnTheList()
                .endAssertion();
    }

    public afterTests(): void {

      this.deleteUser(this.user);

    }
}
