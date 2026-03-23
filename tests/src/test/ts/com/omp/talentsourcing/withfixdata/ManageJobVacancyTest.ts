import { MatchingMatrixAssertions } from "assertions/careergrowth/talentsourcing/MatchingMatrixAssertions";
import { TalentSourcingAssertions } from "assertions/careergrowth/talentsourcing/TalentSourcingAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginPage } from "pages/other/LoginPage";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";

export class ManageJobVacancyTest extends BaseRestTest {

    private static readonly LEAD: string = "Lead";
    private static readonly SR_LEAD_QA_ENGINEER: string = "DevSecOps Lead";
    private static readonly LINKED_JOB_ROLES: string = "Linked Job Roles";
    private static readonly RELATED_SKILLS: string = "Related Skills";
    private static readonly TALENT: string = "Talent";
    private static readonly JOB_ROLE: string = "Job Role";
    private static readonly ASPIRATIONAL_ROLES: string = "Aspirational Roles";
    private static readonly PREFERRED_WORK_LOCATION: string = "Geographical Location";
    private static readonly LEVEL: string = "Level";
    private static readonly WORKPLACE_MODEL: string = "Workplace Model";
    private static readonly JOB_TYPE: string = "Job Type";
    private static readonly SCHEDULE: string = "Schedule";
    private static readonly JOB_ROLE_TYPE: string = "Job Type";
    private static readonly CAREER_PREFERENCES: string = "Career Preferences";
    private static readonly WORK_HISTORY: string = "Work History";
    private static readonly CERTIFICATIONS: string = "Certifications";
    private static readonly LEARNING_GOALS: string = "Learning Goals";
    private static readonly MATCHING_SKILLS: string = "Matching Skills";
    private static readonly ALL_PUBLISHED_VACANCIES: string = "All Published Vacancies";
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public shouldCheckManageJobVacancyDetails(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .goToTalentSourcing()
                .clickOnDisplayVacancyFilter(ManageJobVacancyTest.ALL_PUBLISHED_VACANCIES)
                .getFirstJobVacancyListInTalentSourcing()
                .check(TalentSourcingAssertions)
                    .assertThatFirstJobVacancyIsDisplayedOnTalentSourcing()
                .endAssertion()
                .shouldTypeAndSearchJobVacancy(ManageJobVacancyTest.LEAD)
                .clickOnKebabMenu(ManageJobVacancyTest.SR_LEAD_QA_ENGINEER)
                .check(TalentSourcingAssertions)
                    .assertThatOptionsDisplayed()
                .endAssertion()
                .clickOnManageJobVacancy()
                .check(TalentSourcingAssertions)
                    .assertThatJobVacancyTitleIsDisplayed()
                    .assertThatGenericTitle(ManageJobVacancyTest.LINKED_JOB_ROLES)
                    .assertThatGenericTitle(ManageJobVacancyTest.RELATED_SKILLS)
                    .assertThatSuggestedTalentTitle(ManageJobVacancyTest.TALENT)
                .endAssertion()
                .getFirstCandidateFromSuggestedTalent()
                .check(TalentSourcingAssertions)
                    .assertThatFirstCandidateFromSuggestedTalent()
                .endAssertion()
                .clickOnViewDetailsOfCandidate("Smokey Bear")
                .check(TalentSourcingAssertions)
                    .assertThatTitlesForCandidateViewDetails(ManageJobVacancyTest.JOB_ROLE)
                    .assertThatTitlesForCandidateViewDetails(ManageJobVacancyTest.ASPIRATIONAL_ROLES)
                    .assertThatTitlesForCandidateViewDetails(ManageJobVacancyTest.PREFERRED_WORK_LOCATION)
                    .assertThatTitlesForCandidateViewDetails(ManageJobVacancyTest.LEVEL)
                    .assertThatTitlesForCandidateViewDetails(ManageJobVacancyTest.WORKPLACE_MODEL)
                    .assertThatTitlesForCandidateViewDetails(ManageJobVacancyTest.JOB_TYPE)
                    .assertThatTitlesForCandidateViewDetails(ManageJobVacancyTest.SCHEDULE)
                    .assertThatTitlesForCandidateViewDetails(ManageJobVacancyTest.JOB_ROLE_TYPE)
                    .assertThatGenericTitle(ManageJobVacancyTest.CAREER_PREFERENCES)
                    .assertThatGenericTitle(ManageJobVacancyTest.WORK_HISTORY)
                    .assertThatGenericTitle(ManageJobVacancyTest.CERTIFICATIONS)
                    .assertThatGenericTitle(ManageJobVacancyTest.LEARNING_GOALS)
                    .assertThatGenericTitle(ManageJobVacancyTest.MATCHING_SKILLS)
                .endAssertion()
                .clickOnViewMatchingMatrix()
                .check(MatchingMatrixAssertions)
                    .assertThatMatchingSkillTitleIsDisplayed()
                    .assertThatFirstMatchingSkillsIsDisplayed()
                .endAssertion()
                .clickOnCloseButton()
                .clickOnBackButton()
                .check(TalentSourcingAssertions)
                    .assertThatJobTitleName(ManageJobVacancyTest.SR_LEAD_QA_ENGINEER, ManageJobVacancyTest.SR_LEAD_QA_ENGINEER)
                .endAssertion();
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
