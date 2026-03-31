// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { AddWorkHistoryToCareerProfileScenario } from "scenarios/jobs/AddWorkHistoryToCareerProfileScenario";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";
import { expect } from "common/testing/playwright";

export class WorkHistoryInMeSkillsPassportSanityTest extends BaseRestTest {

    private geodesist: string = "GEODESIST";
    private lumesse: string = "lumesse";
    private creatingMaps: string = "Creating maps";
    private october: string = "Oct";
    private year_2017: string = "2017";
    private june: string = "Jun";
    private year_2022: string = "2022";
    private workHistoryDescription: string = "Professional experience you have gained from previous jobs, internships or contract positions.";

    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser();

    }

    public shouldAddWorkHistoryViaUpdateCareerProfileLink(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.run(new AddRoleAndFamilyToNewUserScenario(this.user.name));
        __page1 = __page1.goToCareerGrowthPage();
        __page1 = __page1.clickUpdateCareerProfileLink();
        __page1 = __page1.run(new AddWorkHistoryToCareerProfileScenario(this.geodesist, this.lumesse, this.creatingMaps, this.october, this.year_2017, this.june, this.year_2022));
        __page1 = __page1.clickSaveAndContinueButton();
        __page1 = __page1.clickXButton();
        __page1 = __page1.goToMePageProfile();
        __page1 = __page1.goToSkillPassportTab();
        expect(__page1.workHistoryHeader).toContainText(this.workHistoryDescription, { timeout: 30000 });
        expect(__page1.workHistoryTitle).toContainText(this.geodesist, { timeout: 30000 });
        expect(__page1.workHistoryPeriod(this.geodesist)).toContainText(this.october + " " + this.year_2017 + " - " + this.june + " " + this.year_2022, { timeout: 30000 });
        expect(__page1.workHistoryCompany(this.geodesist)).toContainText(this.lumesse, { timeout: 30000 });
        __page1 = __page1.clickOnWorkHistoryItem(this.geodesist);
        __page1 = __page1.deleteWorkHistoryItem();
        __page1 = __page1.clickConfirm();
    }

    public shouldAddWorkHistoryViaSkillsPassport(): void {
                let __page2: any = this;
        __page2 = __page2.getOmpLoginPage();
        __page2 = __page2.run(new LoginScenario(this.user));
        __page2 = __page2.goToMePageProfile();
        __page2 = __page2.goToSkillPassportTab();
        __page2 = __page2.clickAddMoreSkillsButton();
        __page2 = __page2.selectWorkHistory();
        __page2 = __page2.fillPositionTitle(this.geodesist);
        __page2 = __page2.fillCompanyName(this.lumesse);
        __page2 = __page2.fillDescription(this.creatingMaps);
        __page2 = __page2.selectStartDateMonth(this.october);
        __page2 = __page2.selectStartDateYear(this.year_2017);
        __page2 = __page2.selectEndDateMonth(this.june);
        __page2 = __page2.selectEndDateYear(this.year_2022);
        __page2 = __page2.clickSaveButton();
        __page2 = __page2.goToCareerGrowthPage();
        __page2 = __page2.clickUpdateCareerProfileLink();
        expect(__page2.positionTitleLabel).toContainText(this.geodesist, { timeout: 30000 });
        expect(__page2.workHistoryPeriodLabel(this.geodesist)).toContainText(this.october + " " + this.year_2017 + " - " + this.june + " " + this.year_2022, { timeout: 30000 });
        expect(__page2.companyNameLabel(this.geodesist)).toContainText(this.lumesse, { timeout: 30000 });
        __page2 = __page2.clickXButton();
        __page2 = __page2.goToMePageProfile();
        __page2 = __page2.goToSkillPassportTab();
        __page2 = __page2.clickOnWorkHistoryItem(this.geodesist);
        __page2 = __page2.deleteWorkHistoryItem();
        __page2 = __page2.clickConfirm();
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
