// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { ProjectDetailsPage } from "pages/careergrowth/project/ProjectDetailsPage";
import { ProjectsMePage } from "pages/careergrowth/project/ProjectsMePage";
import { LandingPage } from "pages/landing/LandingPage";
import { HomePage } from "pages/other/HomePage";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";
import { AddSkillToNewUserScenario_SkillLevel } from "scenarios/profile/AddSkillToNewUserScenario_SkillLevel";
import { CreateProjectWithSuggestedSkillsScenario } from "scenarios/project/CreateProjectWithSuggestedSkillsScenario";
import { expect } from "common/testing/playwright";

export class CreateProjectWithSuggestedSkillsTest extends BaseRestTest {

    private projectTitle: string = "Automation";
    private projectDesc: string = "Automation Test Desc";
    private skillLevel1: string = "Beginner";
    private suggestedSkillID: string = "5943564426482605570";
    private skillName: string = "automation";
    private actionName: string = "View details";
    private actionName2: string = "Close";
    private toasterText: string = "The Project is closed";
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public createAProjectWithRecommendedSkills(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.run(new AddRoleAndFamilyToNewUserScenario(this.user.name));
        __page1 = __page1.run(new AddSkillToNewUserScenario_SkillLevel());
        __page1 = __page1.clickCreateButton();
        __page1 = __page1.clickCreateProjectButton();
        expect(__page1.createProjectHeader).toBeVisible({ timeout: 30000 });
        expect(__page1.projectTitle).toBeVisible({ timeout: 30000 });
        expect(__page1.projectDescription).toBeVisible({ timeout: 30000 });
        expect(__page1.projectThumbnail).toBeVisible({ timeout: 30000 });
        __page1 = __page1.run(new CreateProjectWithSuggestedSkillsScenario(this.projectTitle, this.projectDesc, this.suggestedSkillID));
        expect(__page1.ownedByMeHorizontalCardProjectTitle(this.projectTitle)).toBeVisible({ timeout: 30000 });
        __page1 = __page1.goDirectlyTo(ProjectsMePage);
        __page1 = __page1.clickOwnedByMeProjectHorizontalCardActionsDropDown(this.projectTitle);
        __page1 = __page1.clickOwnedByMeProjectHorizontalCardDropDownAction(this.actionName, ProjectDetailsPage);
        expect(__page1.projectTitleHeader).toBeVisible({ timeout: 30000 });
        expect(__page1.projectMetaDetailsSection).toBeVisible({ timeout: 30000 });
        expect(__page1.projectDescriptionHeader).toBeVisible({ timeout: 30000 });
        expect(__page1.projectDetailsRightPanel).toBeVisible({ timeout: 30000 });
        expect(__page1.projectOwnersList).toBeVisible({ timeout: 30000 });
        expect(__page1.projectPublishedDate).toBeVisible({ timeout: 30000 });
        expect(__page1.relatedSkillsHeader).toBeVisible({ timeout: 30000 });
        expect(__page1.skillLevelAndName(this.skillLevel1, this.skillName)).toBeVisible({ timeout: 30000 });
        __page1 = __page1.clickOnAProjectAction(this.actionName2, ProjectDetailsPage);
        expect(__page1.closeProjectModal).toBeVisible({ timeout: 30000 });
        __page1 = __page1.clickCloseButtonCloseProjectModal();
        expect(__page1.confirmationToaster(this.toasterText)).toBeVisible({ timeout: 30000 });
        __page1 = __page1.goDirectlyTo(LandingPage);
        __page1 = __page1.goToMePageProfile();
        __page1 = __page1.goToProjectsTab();
        __page1 = __page1.clickClosedTab();
        expect(__page1.projectTitleMePage(this.projectTitle)).toBeVisible({ timeout: 30000 });
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
