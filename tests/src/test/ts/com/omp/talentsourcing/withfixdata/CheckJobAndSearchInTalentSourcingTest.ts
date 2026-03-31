// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginPage } from "pages/other/LoginPage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";
import { AddSkillToNewUserScenario_SkillLevel } from "scenarios/profile/AddSkillToNewUserScenario_SkillLevel";
import { Locator, expect } from "common/testing/playwright";
import { Assert, assertTrue } from "common/testing/runtime";

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
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.userModel));
        __page1 = __page1.run(new AddRoleAndFamilyToNewUserScenario(this.userModel.name));
        __page1 = __page1.run(new AddSkillToNewUserScenario_SkillLevel());
        __page1 = __page1.goToTalentSourcing();
        __page1 = __page1.clickOnDisplayVacancyFilter(CheckJobAndSearchInTalentSourcingTest.ALL_PUBLISHED_VACANCIES);
        __page1 = __page1.getFirstJobVacancyListInTalentSourcing();
        let list: Array<Locator> = Collections.singletonList(__page1.firstItemOnAllTalentSourcingJobList);
        let value: number = __page1.firstItemOnAllTalentSourcingJobList.count();
        Assert.assertTrue(value>0);
    }

    public shouldCheckIfSearchingIsWorking(): void {
                let __page2: any = this;
        __page2 = __page2.getOmpLoginPage();
        __page2 = __page2.run(new LoginScenario(this.userModel));
        __page2 = __page2.goToTalentSourcing();
        __page2 = __page2.clickOnDisplayVacancyFilter(CheckJobAndSearchInTalentSourcingTest.ALL_PUBLISHED_VACANCIES);
        __page2 = __page2.getFirstJobVacancyListInTalentSourcing();
        __page2 = __page2.shouldTypeAndSearchJobVacancy(CheckJobAndSearchInTalentSourcingTest.LEAD);
        let list: Array<Locator> = Collections.singletonList(__page2.firstItemOnAllTalentSourcingJobList);
        let value: number = __page2.firstItemOnAllTalentSourcingJobList.count();
        Assert.assertTrue(value>0);
        expect(__page2.jobName(CheckJobAndSearchInTalentSourcingTest.SENIOR_QA_LEAD)).toContainText(CheckJobAndSearchInTalentSourcingTest.SENIOR_QA_LEAD, { timeout: 30000 });
        __page2.logger.info("Verified Job CheckJobAndSearchInTalentSourcingTest.SENIOR_QA_LEAD " + CheckJobAndSearchInTalentSourcingTest.SENIOR_QA_LEAD);
        expect(__page2.bookMarksText(CheckJobAndSearchInTalentSourcingTest.SENIOR_QA_LEAD)).toBeVisible();
        expect(__page2.appliedText(CheckJobAndSearchInTalentSourcingTest.SENIOR_QA_LEAD)).toBeVisible();
    }

    public shouldCheckMessageIfNoJobsFoundWhileSearching(): void {
                let __page3: any = this;
        __page3 = __page3.getOmpLoginPage();
        __page3 = __page3.run(new LoginScenario(this.userModel));
        __page3 = __page3.goToTalentSourcing();
        __page3 = __page3.clickOnDisplayVacancyFilter(CheckJobAndSearchInTalentSourcingTest.ALL_PUBLISHED_VACANCIES);
        __page3 = __page3.getFirstJobVacancyListInTalentSourcing();
        __page3 = __page3.shouldTypeAndSearchJobVacancy(CheckJobAndSearchInTalentSourcingTest.QA_12344);
        expect(__page3.resultNotFoundMessage(CheckJobAndSearchInTalentSourcingTest.SORRY_NOTHING_MATCHES_YOUR_CRITERIA_TRY_DIFFERENT_KEYWORDS)).toContainText(CheckJobAndSearchInTalentSourcingTest.SORRY_NOTHING_MATCHES_YOUR_CRITERIA_TRY_DIFFERENT_KEYWORDS, { timeout: 30000 });
    }

    public afterClass(): void {

      this.deleteUser(this.userModel);

    }
}
