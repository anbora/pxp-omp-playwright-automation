// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginPage } from "pages/other/LoginPage";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { Locator, expect } from "common/testing/playwright";
import { Assert, assertTrue } from "common/testing/runtime";

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
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.goToTalentSourcing();
        __page1 = __page1.clickOnDisplayVacancyFilter(ManageJobVacancyTest.ALL_PUBLISHED_VACANCIES);
        __page1 = __page1.getFirstJobVacancyListInTalentSourcing();
        let list: Array<Locator> = Collections.singletonList(__page1.firstItemOnAllTalentSourcingJobList);
        let value: number = __page1.firstItemOnAllTalentSourcingJobList.count();
        Assert.assertTrue(value>0);
        __page1 = __page1.shouldTypeAndSearchJobVacancy(ManageJobVacancyTest.LEAD);
        __page1 = __page1.clickOnKebabMenu(ManageJobVacancyTest.SR_LEAD_QA_ENGINEER);
        expect(__page1.viewDetails).toBeVisible();
        expect(__page1.manageJobVacancy).toBeVisible();
        __page1 = __page1.clickOnManageJobVacancy();
        expect(__page1.jobVacancyTitle).toBeVisible({ timeout: 30000 });
        expect(__page1.genericTitleHeader(ManageJobVacancyTest.LINKED_JOB_ROLES)).toBeVisible({ timeout: 30000 });
        expect(__page1.genericTitleHeader(ManageJobVacancyTest.RELATED_SKILLS)).toBeVisible({ timeout: 30000 });
        expect(__page1.peopleTitle).toContainText(ManageJobVacancyTest.TALENT, { timeout: 30000 });
        __page1 = __page1.getFirstCandidateFromSuggestedTalent();
        let list: Array<Locator> = Collections.singletonList(__page1.getFirstCandidateFromSuggestedTalentList);
        Assert.assertTrue(list.length>0);
        __page1 = __page1.clickOnViewDetailsOfCandidate("Smokey Bear");
        expect(__page1.genericTitleForCandidate(ManageJobVacancyTest.JOB_ROLE).first()).toBeVisible({ timeout: 30000 });
        expect(__page1.genericTitleForCandidate(ManageJobVacancyTest.ASPIRATIONAL_ROLES).first()).toBeVisible({ timeout: 30000 });
        expect(__page1.genericTitleForCandidate(ManageJobVacancyTest.PREFERRED_WORK_LOCATION).first()).toBeVisible({ timeout: 30000 });
        expect(__page1.genericTitleForCandidate(ManageJobVacancyTest.LEVEL).first()).toBeVisible({ timeout: 30000 });
        expect(__page1.genericTitleForCandidate(ManageJobVacancyTest.WORKPLACE_MODEL).first()).toBeVisible({ timeout: 30000 });
        expect(__page1.genericTitleForCandidate(ManageJobVacancyTest.JOB_TYPE).first()).toBeVisible({ timeout: 30000 });
        expect(__page1.genericTitleForCandidate(ManageJobVacancyTest.SCHEDULE).first()).toBeVisible({ timeout: 30000 });
        expect(__page1.genericTitleForCandidate(ManageJobVacancyTest.JOB_ROLE_TYPE).first()).toBeVisible({ timeout: 30000 });
        expect(__page1.genericTitleHeader(ManageJobVacancyTest.CAREER_PREFERENCES)).toBeVisible({ timeout: 30000 });
        expect(__page1.genericTitleHeader(ManageJobVacancyTest.WORK_HISTORY)).toBeVisible({ timeout: 30000 });
        expect(__page1.genericTitleHeader(ManageJobVacancyTest.CERTIFICATIONS)).toBeVisible({ timeout: 30000 });
        expect(__page1.genericTitleHeader(ManageJobVacancyTest.LEARNING_GOALS)).toBeVisible({ timeout: 30000 });
        expect(__page1.genericTitleHeader(ManageJobVacancyTest.MATCHING_SKILLS)).toBeVisible({ timeout: 30000 });
        __page1 = __page1.clickOnViewMatchingMatrix();
        expect(__page1.matchingSkill).toBeVisible();
        expect(__page1.getFirstMatchingSkills).toBeVisible({ timeout: 30000 });
        __page1 = __page1.clickOnCloseButton();
        __page1 = __page1.clickOnBackButton();
        expect(__page1.jobName(ManageJobVacancyTest.SR_LEAD_QA_ENGINEER)).toContainText(ManageJobVacancyTest.SR_LEAD_QA_ENGINEER, { timeout: 30000 });
        __page1.logger.info("Verified Job ManageJobVacancyTest.SR_LEAD_QA_ENGINEER " + ManageJobVacancyTest.SR_LEAD_QA_ENGINEER);
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
