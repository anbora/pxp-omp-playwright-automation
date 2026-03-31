// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { WelcomePage_New } from "pages/careergrowth/careergrowth/WelcomePage_New";
import { ManageProjectPage } from "pages/careergrowth/project/ManageProjectPage";
import { ProjectDetailsPage } from "pages/careergrowth/project/ProjectDetailsPage";
import { ProjectsMePage } from "pages/careergrowth/project/ProjectsMePage";
import { LandingPage } from "pages/landing/LandingPage";
import { HomePage } from "pages/other/HomePage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddSkillToCareerProfileScenario } from "scenarios/profile/AddSkillToCareerProfileScenario";
import { CreateProjectWithSkillsAnd1RoleScenario } from "scenarios/project/CreateProjectWithSkillsAnd1RoleScenario";
import { expect } from "common/testing/playwright";

export class CreateProjectAndValidateSuggestedCandidatesTest extends BaseRestTest {

    private projectTitle: string = "Quality" + " "+ UUID.randomUUID();
    private projectDesc: string = "Suggested Candidates Test Desc";
    private skillName1: string = "learning styles";
    private skillLevel1: string = "0.25";
    private skillName2: string = "java";
    private skillLevel2: string = "0.5";
    private skillName3: string = "JavaScript";
    private skillLevel3: string = "0.75";
    private actionName: string = "Manage Project";
    private roleNameToTypeAndAssert: string = "software engineer in tests";
    private roleNameToSelect: string = "Software Quality Assurance -  Software Engineer in Tests";
    private candidateTitle: string = "SDET";
    private shareMessage: string = "suggested candidate share msg";
    private user: UserModel;
    private user2: UserModel;

    public initialize(): void {
      this.user = this.createUser(true);
        this.wait(10000);
      this.user2 = this.createUser(true);
    }

    prepareUserForRecommendation(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user2))
                .goToEditProfileFromUserDropDown(this.user2.name)
                .clickEditProfileButton()
                .clickAddJobFamilyAndRoleButton()
                .selectFirstJobRoleFromInput("Software Engineer in Tests", "Software Quality Assurance -  Software Engineer in Tests")
                .clickSelectButton()
                .fillInJobTitle(this.candidateTitle)
                .clickSaveButton()
                .goToCareerGrowthPage()
                .refreshPage()
                .clickUpdateCareerProfileLink()
                .clickSkipForNowButton()
                .run(new AddSkillToCareerProfileScenario(this.skillName1, "Advanced"))
                .run(new AddSkillToCareerProfileScenario(this.skillName2, "Advanced"))
                .run(new AddSkillToCareerProfileScenario(this.skillName3, "Advanced"))
                .clickSaveAndContinueButton()
                .clickXButton();
    }

    public createProjectAndValidateSuggestedCandidatesTest(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.clickCreateButton();
        __page1 = __page1.clickCreateProjectButton();
        expect(__page1.createProjectHeader).toBeVisible({ timeout: 30000 });
        expect(__page1.projectTitle).toBeVisible({ timeout: 30000 });
        expect(__page1.projectDescription).toBeVisible({ timeout: 30000 });
        expect(__page1.projectThumbnail).toBeVisible({ timeout: 30000 });
        __page1 = __page1.run(new CreateProjectWithSkillsAnd1RoleScenario(this.projectTitle, this.projectDesc, this.skillName1, this.skillLevel1, this.skillName2, this.skillLevel2, this.skillName3, this.skillLevel3, this.roleNameToTypeAndAssert, this.roleNameToSelect));
        expect(__page1.ownedByMeHorizontalCardProjectTitle(this.projectTitle)).toBeVisible({ timeout: 30000 });
        __page1 = __page1.goDirectlyTo(ProjectsMePage);
        __page1 = __page1.clickOwnedByMeProjectHorizontalCardActionsDropDown(this.projectTitle);
        __page1 = __page1.clickOwnedByMeProjectHorizontalCardDropDownAction(this.actionName, ManageProjectPage);
        __page1 = __page1.clickSuggestedCandidatesTab();
        __page1 = __page1.refreshUntilSuggestedCandidateAppears(this.user2.fullName);
        expect(__page1.suggestedCandidateName(this.user2.fullName).first()).toBeVisible({ timeout: 30000 });
        expect(__page1.suggestedCandidateTitle(this.user2.fullName, this.candidateTitle).first()).toBeVisible({ timeout: 30000 });
        __page1 = __page1.clickSuggestedCandidatesShareIcon(this.user2.fullName);
        expect(__page1.suggestedCandidateShareModal).toBeVisible({ timeout: 30000 });
        expect(__page1.suggestedCandidateShareModalUserName(this.user2.fullName)).toBeVisible({ timeout: 30000 });
        __page1 = __page1.submitShareWithMessage(this.shareMessage);
        expect(__page1.shareProjectSuccessToaster).toBeVisible({ timeout: 30000 });
    }

    public verifySharedWithMeShowsSharedProject(): void {
                let __page2: any = this;
        __page2 = __page2.getOmpLoginPage();
        __page2 = __page2.run(new LoginScenario(this.user2));
        __page2 = __page2.goToMePageProfile();
        __page2 = __page2.goToProjectsTab();
        __page2 = __page2.clickSharedWithMeTab();
        expect(__page2.projectTitleSharedWithMePage(this.projectTitle)).toBeVisible({ timeout: 30000 });
        expect(__page2.projectSharedByUserName(this.projectTitle, this.user.fullName)).toBeVisible({ timeout: 30000 });
        __page2 = __page2.clickSharedProjectViewMessage(this.projectTitle);
        expect(__page2.shareProjectViewMessageModalHeader).toBeVisible({ timeout: 30000 });
        expect(__page2.shareProjectMessageText(this.shareMessage)).toBeVisible({ timeout: 30000 });
        __page2.shareProjectViewMessageCloseModal.click();
    }

    public closeProject(): void {
                let __page3: any = this;
        __page3 = __page3.getOmpLoginPage();
        __page3 = __page3.run(new LoginScenario(this.user));
        __page3 = __page3.goToMePageProfile();
        __page3 = __page3.goToProjectsTab();
        __page3 = __page3.clickPublishedTab();
        expect(__page3.projectTitleMePage(this.projectTitle)).toBeVisible({ timeout: 30000 });
        __page3 = __page3.clickOwnedByMeProjectHorizontalCardActionsDropDown(this.projectTitle);
        __page3 = __page3.clickOwnedByMeProjectHorizontalCardDropDownAction("Close", ProjectDetailsPage);
        expect(__page3.closeProjectModal).toBeVisible({ timeout: 30000 });
        __page3 = __page3.clickCloseButtonCloseProjectModal();
        __page3 = __page3.goDirectlyTo(LandingPage);
        __page3 = __page3.goToMePageProfile();
        __page3 = __page3.goToProjectsTab();
        __page3 = __page3.clickClosedTab();
        __page3 = __page3.refreshCurrentPage(ProjectsMePage);
        expect(__page3.ownedByMeHorizontalCardProjectTitle(this.projectTitle)).toBeVisible({ timeout: 30000 });
    }

    public afterClass(): void {
        this.deleteUser(this.user);
        this.deleteUser(this.user2);
    }
}
