// @ts-nocheck

import { BaseTest } from "common/BaseTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { TeamsResponsibleEnum } from "common/enums/TeamsResponsibleEnum";
import { ManageProjectPage } from "pages/careergrowth/project/ManageProjectPage";
import { LandingPage } from "pages/landing/LandingPage";
import { expect } from "common/testing/playwright";

export class ProjectMentorCheckinsTest extends BaseTest {

    private userName: string = "gssouser";
    private userName2: string = "aalison";
    private userPassword: string = "popeye1234";
    private projectParticipant1: string = "Amy Alison";
    private projectParticipant2: string = "Michael Mendes";
    private mentorName: string = "GSSO USER";

    public loginAsProjectOwnerWithCheckinsAndValidateParticipantCheckIns(): void {
                let __page1: any = this;
        __page1 = __page1.getCsLoginPage(this.getConfig().getProficiencyURL());
        __page1 = __page1.loginToApplication_LandingPage(this.userName, this.userPassword);
        __page1 = __page1.goDirectlyTo(LandingPage);
        __page1 = __page1.goToMePageProfile();
        __page1 = __page1.goToProjectsTab();
        __page1 = __page1.clickPublishedTab();
        __page1 = __page1.clickOwnedByMeProjectHorizontalCardActionsDropDown("Demo Test - do not apply");
        __page1 = __page1.clickOwnedByMeProjectHorizontalCardDropDownAction("Manage Project", ManageProjectPage);
        __page1 = __page1.clickParticipantProgressTab();
        expect(__page1.checkInColumnHeader).toBeVisible({ timeout: 30000 });
        expect(__page1.projectParticipantCreateNewCheckInButton(this.projectParticipant2)).toBeVisible({ timeout: 30000 });
        expect(__page1.projectParticipantManageCheckInsButton(this.projectParticipant1)).toBeVisible({ timeout: 30000 });
        expect(__page1.projectParticipantExistingCheckInsContainer(this.projectParticipant1)).toBeVisible({ timeout: 30000 });
        __page1 = __page1.clickCreateNewCheckInButtonForUser(this.projectParticipant2);
        expect(__page1.createNewCheckInModalHeader).toBeVisible({ timeout: 30000 });
    }

    public loginAsMentorAndValidateMenteeCheckIns(): void {
                let __page2: any = this;
        __page2 = __page2.getCsLoginPage(this.getConfig().getProficiencyURL());
        __page2 = __page2.loginToApplication_LandingPage(this.userName, this.userPassword);
        __page2 = __page2.goDirectlyTo(LandingPage);
        __page2 = __page2.goToMePageProfile();
        __page2 = __page2.goToMentorshipsTab();
        __page2 = __page2.clickMyMenteesTab();
        expect(__page2.myMenteesTab).toBeVisible({ timeout: 30000 });
        __page2 = __page2.selectAFilterOption("mentor-options-APPROVED");
        expect(__page2.mentorApplicationStatusText(this.projectParticipant1, "Accepted")).toBeVisible({ timeout: 30000 });
        expect(__page2.mentorCardUserName(this.projectParticipant1)).toBeVisible({ timeout: 30000 });
        expect(__page2.mentorApplicationStatusText(this.projectParticipant2, "Accepted")).toBeVisible({ timeout: 30000 });
        expect(__page2.mentorCardUserName(this.projectParticipant2)).toBeVisible({ timeout: 30000 });
    }

    public loginAsMenteeAndValidateMentorCheckIns(): void {
                let __page3: any = this;
        __page3 = __page3.getCsLoginPage(this.getConfig().getProficiencyURL());
        __page3 = __page3.loginToApplication_LandingPage(this.userName2, this.userPassword);
        __page3 = __page3.goDirectlyTo(LandingPage);
        __page3 = __page3.goToMePageProfile();
        __page3 = __page3.goToMentorshipsTab();
        __page3 = __page3.clickMyMentorsTab();
        expect(__page3.myMentorshipsPageLoad).toBeVisible({ timeout: 30000 });
        __page3 = __page3.selectAFilterOption("mentor-options-INPROGRESS");
        expect(__page3.mentorCardUserName(this.mentorName)).toBeVisible({ timeout: 30000 });
        expect(__page3.mentorApplicationStatusText(this.mentorName, "Current Mentor")).toBeVisible({ timeout: 30000 });
    }
}
