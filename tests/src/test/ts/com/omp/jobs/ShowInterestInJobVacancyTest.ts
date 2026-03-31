// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { Locator, WaitForSelectorState, expect } from "common/testing/playwright";
import { Assert, assertTrue } from "common/testing/runtime";

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
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.goToCareerGrowthPage();
        __page1 = __page1.goToVacanciesPageViaCard();
        __page1 = __page1.typeSearchValue(this.devopsAzureAulutionArchitect);
        __page1 = __page1.clickJobVacancyCardsDetails(this.devopsAzureAulutionArchitect);
        expect(__page1.jobApplied).toBeHidden();
        __page1 = __page1.clickBackButton();
        __page1 = __page1.typeSearchValue(this.devSecOpsLead);
        __page1 = __page1.clickJobVacancyCardsDetails(this.devSecOpsLead);
        __page1 = __page1.clickApplyButton();
        expect(__page1.this.header + this.devSecOpsLead).toContainText(this.header + this.devSecOpsLead, { timeout: 30000 });
        expect(__page1.this.content).toContainText(this.content, { timeout: 30000 });
        expect(__page1.this.hint).toContainText(this.hint, { timeout: 30000 });
        __page1 = __page1.clickProfileButton();
        __page1 = __page1.selectLeftMenuTab(this.applications);
        __page1 = __page1.waitForJobToBeVisible();
        __page1.jobCards.first().waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        Assert.assertTrue(__page1.jobCards.allTextContents().contains(this.devSecOpsLead));
        __page1 = __page1.clickJobCard(this.devSecOpsLead);
        expect(__page1.jobApplied).toContainText(this.showedInterest, { timeout: 30000 });
    }

    public shouldShowInterestByViewingJobDescriptionOnExternalSite(): void {
                let __page2: any = this;
        __page2 = __page2.getOmpLoginPage();
        __page2 = __page2.run(new LoginScenario(this.user));
        __page2 = __page2.goToCareerGrowthPage();
        __page2 = __page2.goToVacanciesPageViaCard();
        __page2 = __page2.typeSearchValue(this.headOfDevelopment);
        __page2 = __page2.clickJobVacancyCardsDetails(this.headOfDevelopment);
        __page2 = __page2.clickViewOnCareerSiteButton();
        expect(__page2.this.header + this.headOfDevelopment).toContainText(this.header + this.headOfDevelopment, { timeout: 30000 });
        expect(__page2.this.content).toContainText(this.content, { timeout: 30000 });
        expect(__page2.this.hint).toContainText(this.hint, { timeout: 30000 });
        __page2 = __page2.clickCloseButton();
        expect(__page2.jobApplied).toContainText(this.showedInterest, { timeout: 30000 });
    }

    public shouldCheckApplyButtonRedirection(): void {
                let __page3: any = this;
        __page3 = __page3.getOmpLoginPage();
        __page3 = __page3.run(new LoginScenario(this.user));
        __page3 = __page3.goToCareerGrowthPage();
        __page3 = __page3.goToVacanciesPageViaTab();
        __page3 = __page3.typeSearchValue(this.devSecOpsLead);
        __page3 = __page3.clickJobVacancyCardsDetails(this.devSecOpsLead);
        expect(__page3.applyUrlButton(this.applicationURL)).toBeVisible({ timeout: 30000 });
    }

    public deleteUser(): void {

      this.deleteUser(this.user);

    }
}
