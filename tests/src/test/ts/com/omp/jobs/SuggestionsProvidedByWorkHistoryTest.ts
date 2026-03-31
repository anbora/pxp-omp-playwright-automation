// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { WelcomePage_New } from "pages/careergrowth/careergrowth/WelcomePage_New";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddBasicCareerPreferencesForUser } from "scenarios/profile/AddBasicCareerPreferencesForUser";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";
import { expect } from "common/testing/playwright";

export class SuggestionsProvidedByWorkHistoryTest extends BaseRestTest {

    private TITLE: string = "Surgeon " + UUID.randomUUID();
    private TITLE_TEXT: string = "Surgeon";
    private workHistoryCompany01: string = "Hospital";
    private workHistoryDescription01: string = "surgery, medical, hospital";
    private startDateMonth01: string = "Oct";
    private startDateYear01: string = "2017";
    private endDateMonth01: string = "Jun";
    private endDateYear01: string = "2023";

    private workHistoryPosition02: string = "DOCTOR";
    private workHistoryCompany02: string = "Hospital2";
    private workHistoryDescription02: string = "medical, hospital";
    private startDateMonth02: string = "Oct";
    private startDateYear02: string = "2013";
    private endDateMonth02: string = "Jun";
    private endDateYear02: string = "2017";

    private careerGoal: string = "Career Goal";
    private level: string = "Level";
    private workplaceModel: string = "Workplace Model";
    private jobType: string = "Job Type";
    private schedule: string = "Schedule";
    private careerTrack: string = "Career Track";
    private backward: string = "I am open to roles with lower levels of responsibility";
    private internship: string = "Professional";
    private remote: string = "Hybrid";
    private temporary: string = "Internship";
    private partTime: string = "Full time";
    private individualContributor: string = "Management";

    private jobId: string;
    private user: UserModel;

    public initialize(): void {
      this.user = this.createUser();
      this.jobId = this.createJob(this.TITLE);
    }

    public shouldUpdateProfileByAddingWorkHistory(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.run(new AddRoleAndFamilyToNewUserScenario(this.user.name));
        __page1 = __page1.run(new AddBasicCareerPreferencesForUser());
        __page1 = __page1.goDirectlyTo(WelcomePage_New);
        __page1 = __page1.refreshPage();
        __page1 = __page1.clickUpdateCareerProfileLink();
        __page1 = __page1.goToCareerPreferenceTab();
        __page1 = __page1.selectCareerPreferenceCheckbox(this.careerGoal, this.backward);
        __page1 = __page1.selectCareerPreferenceCheckbox(this.workplaceModel, this.remote);
        __page1 = __page1.selectCareerPreferenceCheckbox(this.schedule, this.partTime);
        __page1 = __page1.selectCareerPreferenceCheckbox(this.careerTrack, this.individualContributor);
        __page1 = __page1.clickSaveAndContinueButton();
        __page1 = __page1.clickSaveButton();
        __page1 = __page1.goToCareerGrowthPage();
        __page1 = __page1.clickUpdateCareerProfileLink();
        __page1 = __page1.clickAddMoreExperience();
        __page1 = __page1.selectStartDateMonth(this.startDateMonth01);
        __page1 = __page1.selectStartDateYear(this.startDateYear01);
        __page1 = __page1.selectEndDateMonth(this.endDateMonth01);
        __page1 = __page1.selectEndDateYear(this.endDateYear01);
        __page1 = __page1.fillPositionTitle(this.TITLE_TEXT);
        __page1 = __page1.fillCompanyName(this.workHistoryCompany01);
        __page1 = __page1.fillDescription(this.workHistoryDescription01);
        __page1 = __page1.clickDoneButton();
        __page1 = __page1.clickAddMoreExperience();
        __page1 = __page1.selectStartDateMonth(this.startDateMonth02);
        __page1 = __page1.selectStartDateYear(this.startDateYear02);
        __page1 = __page1.selectEndDateMonth(this.endDateMonth02);
        __page1 = __page1.selectEndDateYear(this.endDateYear02);
        __page1 = __page1.fillPositionTitle(this.workHistoryPosition02);
        __page1 = __page1.fillCompanyName(this.workHistoryCompany02);
        __page1 = __page1.fillDescription(this.workHistoryDescription02);
        __page1 = __page1.clickDoneButton();
        expect(__page1.workHistoryLineLabel(this.startDateMonth01 + " " + this.startDateYear01 + " - " + this.endDateMonth01 + " " + this.endDateYear01).first()).toBeVisible({ timeout: 30000 });
        expect(__page1.workHistoryLineLabel(this.TITLE_TEXT).first()).toBeVisible({ timeout: 30000 });
        expect(__page1.workHistoryLineLabel(this.workHistoryCompany01).first()).toBeVisible({ timeout: 30000 });
        expect(__page1.workHistoryLineLabel(this.startDateMonth02 + " " + this.startDateYear02 + " - " + this.endDateMonth02 + " " + this.endDateYear02).first()).toBeVisible({ timeout: 30000 });
        expect(__page1.workHistoryLineLabel(this.workHistoryPosition02).first()).toBeVisible({ timeout: 30000 });
        expect(__page1.workHistoryLineLabel(this.workHistoryCompany02).first()).toBeVisible({ timeout: 30000 });
        __page1 = __page1.clickSaveAndContinueButton();
        __page1 = __page1.clickXButton();
    }

    public shouldCheckSuggestionsProvidedByWorkHistory(): void {
                let __page2: any = this;
        __page2 = __page2.getOmpLoginPage();
        __page2 = __page2.run(new LoginScenario(this.user));
        __page2 = __page2.goToCareerGrowthPage();
        __page2 = __page2.goToVacanciesPageViaCard();
        __page2 = __page2.typeSearchValue(this.TITLE);
        __page2 = __page2.clearSearchKeywordCriteria();
        __page2 = __page2.waitForGoodOrExcellentMatchForSuggestedJobVacancy();
        expect(__page2.firstCard().first()).toContainText(this.TITLE_TEXT, { timeout: 30000 });
    }

    public shouldUpdateCareerProfileByDeletingWorkHistory(): void {
                let __page3: any = this;
        __page3 = __page3.getOmpLoginPage();
        __page3 = __page3.run(new LoginScenario(this.user));
        __page3 = __page3.goToCareerGrowthPage();
        __page3 = __page3.clickUpdateCareerProfileLink();
        __page3 = __page3.deleteFirstWorkHistoryLine();
        expect(__page3.workHistoryLineLabel(this.startDateMonth01 + " " + this.startDateYear01 + " - " + this.endDateMonth01 + " " + this.endDateYear01).first()).not.toBeVisible({ timeout: 5000 });
        expect(__page3.workHistoryLineLabel(this.TITLE_TEXT).first()).not.toBeVisible({ timeout: 5000 });
        expect(__page3.workHistoryLineLabel(this.workHistoryCompany01).first()).not.toBeVisible({ timeout: 5000 });
        __page3 = __page3.deleteFirstWorkHistoryLine();
        expect(__page3.workHistoryLineLabel(this.startDateMonth02 + " " + this.startDateYear02 + " - " + this.endDateMonth02 + " " + this.endDateYear02).first()).not.toBeVisible({ timeout: 5000 });
        expect(__page3.workHistoryLineLabel(this.workHistoryPosition02).first()).not.toBeVisible({ timeout: 5000 });
        expect(__page3.workHistoryLineLabel(this.workHistoryCompany02).first()).not.toBeVisible({ timeout: 5000 });
        __page3 = __page3.clickSaveAndContinueButton();
        __page3 = __page3.clickXButton();
    }

    public shouldCheckSuggestionsAfterWorkHistoryBeingRemoved(): void {
                let __page4: any = this;
        __page4 = __page4.getOmpLoginPage();
        __page4 = __page4.run(new LoginScenario(this.user));
        __page4 = __page4.goToCareerGrowthPage();
        __page4 = __page4.goToVacanciesPageViaCard();
        __page4 = __page4.waitUntilJobVacancyTitleDisappearsFromRecommendations(this.TITLE_TEXT);
        expect(__page4.cardName(this.TITLE_TEXT)).toBeHidden();
    }

    public afterTests(): void {
        this.deleteUser(this.user);
        this.deleteJob(this.jobId);
    }
}
