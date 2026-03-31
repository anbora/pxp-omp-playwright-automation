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
import { CreateProjectWithSkillsScenario } from "scenarios/project/CreateProjectWithSkillsScenario";
import { expect } from "common/testing/playwright";

export class CreateProjectWithSkillsTest extends BaseRestTest {

    private projectTitle: string = "SkillsTest" + UUID.randomUUID();
    private projectDesc: string = "SkillsTest Test Desc";
    private skillLevel1: string = "Beginner";
    private skillLevel1Numeric: string = "0.25";
    private skillName2: string = "clearing";
    private skillLevel2: string = "Intermediate";
    private skillLevel2Numeric: string = "0.5";
    private skillLevel3: string = "Advanced";
    private skillLevel3Numeric: string = "0.75";
    private skillName1: string = "learning styles";
    private skillName3: string = "management";
    private actionName: string = "View details";
    private actionName2: string = "Close";
    private toasterText: string = "The Project is closed";
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public createAProjectWithSkillsAtEachLevelAndValidateDetailsPage(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.goToHomePage();
        __page1 = __page1.clickCreateButton();
        __page1 = __page1.clickCreateProjectButton();
        expect(__page1.createProjectHeader).toBeVisible({ timeout: 30000 });
        expect(__page1.projectTitle).toBeVisible({ timeout: 30000 });
        expect(__page1.projectDescription).toBeVisible({ timeout: 30000 });
        expect(__page1.projectThumbnail).toBeVisible({ timeout: 30000 });
        __page1 = __page1.run(new CreateProjectWithSkillsScenario(this.projectTitle, this.projectDesc, this.skillName1, this.skillName2, this.skillName3, this.skillLevel1Numeric, this.skillLevel2Numeric, this.skillLevel3Numeric));
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
        expect(__page1.skillLevelAndName(this.skillLevel1, this.skillName1)).toBeVisible({ timeout: 30000 });
        expect(__page1.relatedSkillsHeader).toBeVisible({ timeout: 30000 });
        expect(__page1.skillLevelAndName(this.skillLevel2, this.skillName2)).toBeVisible({ timeout: 30000 });
        expect(__page1.relatedSkillsHeader).toBeVisible({ timeout: 30000 });
        expect(__page1.skillLevelAndName(this.skillLevel3, this.skillName3)).toBeVisible({ timeout: 30000 });
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
