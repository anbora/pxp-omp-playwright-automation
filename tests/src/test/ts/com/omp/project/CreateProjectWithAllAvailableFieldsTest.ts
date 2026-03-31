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
import { CreateProjectWithAllAvailableFieldsScenario } from "scenarios/project/CreateProjectWithAllAvailableFieldsScenario";
import { expect } from "common/testing/playwright";

//@Group(GroupNameEnum.OMP_REGRESSION) will be repurposed for a different test in the coming days
//@FunctionalArea(FunctionalAreaEnum.PROJECT)
export class CreateProjectWithAllAvailableFieldsTest extends BaseRestTest {

    private projectTitle: string = "AllFieldsTest" + UUID.randomUUID();
    private projectDesc: string = "AllFields Test Desc";
    private skillLevelNumeric: string = "0.25";
    private skillLevel: string = "Beginner";
    private skillName1: string = "learning styles";
    private actionName: string = "View details";
    private locationTextToEnter: string = "Mumbai";
    private locationName: string = "Mumbai, Maharashtra, India";
    private locationNameInDetailsView: string = "Mumbai, India";
    private timeZoneTextToEnter: string = "Pacific Time (US & Canada)";
    private timeZoneToSelect: string = "Pacific Time (US & Canada) (America/Los_Angeles)";
    private timeCommitment: string = "5 hours per week";
    private roleNameToTypeAndAssert: string = "Java developer";
    private roleNameToSelect: string = "Unusual job family -  Java developer";
    private languageToSearchAndSelect: string = "English";
    private openingsCount: string = "1 opening";
    private startDateEndDateText: string = "Flexible";
    private actionName2: string = "Close";
    private toasterText: string = "The Project is closed";
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public createAProjectWithAllAvailableFieldsAndValidateDetailsPage(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.clickCreateButton();
        __page1 = __page1.clickCreateProjectButton();
        expect(__page1.createProjectHeader).toBeVisible({ timeout: 30000 });
        expect(__page1.projectTitle).toBeVisible({ timeout: 30000 });
        expect(__page1.projectDescription).toBeVisible({ timeout: 30000 });
        expect(__page1.projectThumbnail).toBeVisible({ timeout: 30000 });
        __page1 = __page1.run(new CreateProjectWithAllAvailableFieldsScenario(this.projectTitle, this.projectDesc, this.timeZoneTextToEnter, this.timeZoneToSelect, this.timeCommitment, this.languageToSearchAndSelect, this.skillName1, this.roleNameToTypeAndAssert, this.roleNameToSelect, this.skillLevelNumeric));
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
        expect(__page1.skillLevelAndName(this.skillLevel, this.skillName1)).toBeVisible({ timeout: 30000 });
        expect(__page1.relatedJobRolesHeader).toBeVisible({ timeout: 30000 });
        expect(__page1.relatedJobRolesCardTitle(this.roleNameToTypeAndAssert)).toBeVisible({ timeout: 30000 });
        expect(__page1.projectDetailsRightPanelMetaDetails(this.openingsCount)).toBeVisible({ timeout: 30000 });
        expect(__page1.projectDetailsRightPanelMetaDetails(this.startDateEndDateText)).toBeVisible({ timeout: 30000 });
        expect(__page1.projectDetailsRightPanelMetaDetails(this.timeCommitment)).toBeVisible({ timeout: 30000 });
        expect(__page1.projectDetailsRightPanelMetaDetails("Remote Possible")).toBeVisible({ timeout: 30000 });
        expect(__page1.projectDetailsRightPanelSRTextOnly(this.timeZoneTextToEnter)).toBeVisible({ timeout: 30000 });
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
