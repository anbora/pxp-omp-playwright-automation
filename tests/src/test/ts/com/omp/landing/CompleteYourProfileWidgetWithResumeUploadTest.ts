// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { SkillsToDevelopPage } from "pages/careergrowth/profiles/SkillsToDevelopPage";
import { LandingPage } from "pages/landing/LandingPage";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { expect } from "common/testing/playwright";

export class CompleteYourProfileWidgetWithResumeUploadTest extends BaseRestTest {

    private readonly filePath: string = "src/main/resources/fixtures/Christopher_Morgan_cv.pdf";;
    private readonly workHistoryDate: string = "Sep 2015 - May 2019";
    private readonly workHistoryPosition: string = "Web Developer";
    private readonly workHistoryCompany: string = "Luna Web Design";
    private readonly subheaderName1: string = "Current skills";
    private readonly subheaderName2: string = "Skills to develop";
    private readonly subheaderName3: string = "Career Preferences";
    private readonly percentageValueStep1: string = "20% profile completed";
    private readonly percentageValueStep2: string = "100% profile completed";
    private readonly NoviceSkillName: string = "management";
    private readonly NoviceSkillName2: string = "teamwork";
    private readonly progressCountStep1: string = "20";
    private readonly progressCountStep2: string = "40";
    private readonly progressCountStep3: string = "60";
    private readonly progressCountStep4: string = "80";
    private readonly careerGoal: string = "Career Goal";
    private readonly forward: string = "I want to progress my career and take on more responsibility";
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser();

    }

    public shouldCheckThatCompleteYourProfileWidgetIsWorking(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        expect(__page1.completeYourProfileWidgetHeader).toBeVisible({ timeout: 30000 });
        expect(__page1.completeYourProfileWidgetCompletionPercentage(this.percentageValueStep1)).toBeVisible({ timeout: 30000 });
        expect(__page1.completeYourProfileWidgetCompleteNowButton).toBeVisible({ timeout: 30000 });
        expect(__page1.completeYourProfileWidgetAvatar).toBeVisible({ timeout: 30000 });
        __page1 = __page1.clickCompleteNowButton();
        expect(__page1.completeYourProfileModalHeader()).toBeVisible({ timeout: 30000 });
        expect(__page1.completeYourProfileModalProgressCount(this.progressCountStep1)).toBeVisible({ timeout: 30000 });
        __page1 = __page1.clickSelectFile();
        __page1 = __page1.uploadFile(this.filePath);
        __page1 = __page1.clickUploadButton();
        __page1 = __page1.clickNextButton();
        __page1 = __page1.clickAddButton();
        expect(__page1.workHistoryLineLabel(this.workHistoryDate).first()).toBeVisible({ timeout: 30000 });
        expect(__page1.workHistoryLineLabel(this.workHistoryPosition).first()).toBeVisible({ timeout: 30000 });
        expect(__page1.workHistoryLineLabel(this.workHistoryCompany).first()).toBeVisible({ timeout: 30000 });
        expect(__page1.saveAndContinue()).toBeVisible({ timeout: 30000 });
        __page1 = __page1.clickSaveAndContinueButton();
        expect(__page1.completeYourProfileModalSubHeader(this.subheaderName1)).toBeVisible({ timeout: 30000 });
        expect(__page1.completeYourProfileModalProgressCount(this.progressCountStep2)).toBeVisible({ timeout: 30000 });
        __page1 = __page1.searchForSkill(this.NoviceSkillName, "Novice");
        __page1 = __page1.selectOptionFromSkillsDropdown(this.NoviceSkillName);
        expect(__page1.saveAndContinue()).toBeVisible({ timeout: 30000 });
        __page1 = __page1.clickSaveAndContinueButton();
        expect(__page1.completeYourProfileModalSubHeader(this.subheaderName2)).toBeVisible({ timeout: 30000 });
        expect(__page1.completeYourProfileModalProgressCount(this.progressCountStep3)).toBeVisible({ timeout: 30000 });
        __page1 = __page1.searchForSkill(this.NoviceSkillName2, "Novice");
        __page1 = __page1.selectOptionFromSkillsDropdown(this.NoviceSkillName2);
        expect(__page1.saveAndContinue()).toBeVisible({ timeout: 30000 });
        __page1 = __page1.clickSaveAndContinueButton();
        expect(__page1.completeYourProfileModalSubHeader(this.subheaderName3)).toBeVisible({ timeout: 30000 });
        expect(__page1.completeYourProfileModalProgressCount(this.progressCountStep4)).toBeVisible({ timeout: 30000 });
        __page1 = __page1.select1stChkBoxCareerPrefs();
        __page1 = __page1.clickSaveAndContinueButton();
        expect(__page1.completeYourProfileWidgetProfileCompletedHeader()).toBeVisible({ timeout: 30000 });
        expect(__page1.completeYourProfile100CompletedProgressData).toBeVisible({ timeout: 30000 });
        __page1 = __page1.clickSaveButton(LandingPage);
        expect(__page1.completeYourProfileWidgetCompletionPercentage(this.percentageValueStep2)).toBeVisible({ timeout: 30000 });
        expect(__page1.completeYourProfileWidgetUpdateNowButton).toBeVisible({ timeout: 30000 });
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
