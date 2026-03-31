// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LandingPage } from "pages/landing/LandingPage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";
import { expect } from "common/testing/playwright";

export class RequestMentorshipAcceptAsMentorTest extends BaseRestTest {

    private mentorSearchName: string = "Samuel Smith";
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public RequestNewMentorshipViaDiscoveryPageAndValidateStatus(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.run(new AddRoleAndFamilyToNewUserScenario(this.user.name));
        __page1 = __page1.goDirectlyTo(LandingPage);
        __page1 = __page1.goToCareerGrowthPage();
        __page1 = __page1.goToMentorshipPageViaCard();
        expect(__page1.allMentorsHeader).toBeVisible({ timeout: 30000 });
        expect(__page1.filtersButton()).toBeVisible({ timeout: 30000 });
        expect(__page1.searchInput()).toBeVisible({ timeout: 30000 });
        expect(__page1.searchButtonElement()).toBeVisible({ timeout: 30000 });
        expect(__page1.sortByDropDown()).toBeVisible({ timeout: 30000 });
        __page1 = __page1.typeSearchValue(this.mentorSearchName);
        expect(__page1.mentorCardMentorName(this.mentorSearchName).first()).toBeVisible({ timeout: 30000 });
        expect(__page1.mentorCardRequestMentorshipButton(this.mentorSearchName)).toBeVisible({ timeout: 30000 });
        __page1 = __page1.clickMentorCardRequestMentorshipButton(this.mentorSearchName);
        expect((__page1.mentorRequestMentorshipModal)).toBeVisible({ timeout: 30000 });
        __page1 = __page1.submitMentorshipRequestWithMessage("sample message");
        expect((__page1.mentorCardApplicationStatus("Request Sent"))).toBeVisible({ timeout: 30000 });
        __page1 = __page1.goToLandingPage();
        __page1 = __page1.requestMentorshipHomePage();
        expect((__page1.mentorCardApplicationStatus("Request Sent"))).toBeVisible({ timeout: 30000 });
    }

    public AcceptMentorshipRequestAndValidateStatus(): void {
                let __page2: any = this;
        __page2 = __page2.getOmpLoginPage();
        __page2 = __page2.run(new LoginScenario(this.getUserByName("Samuel Smith")));
        __page2 = __page2.goToMePageProfile();
        __page2 = __page2.goToMentorshipsTab();
        __page2 = __page2.clickMyMenteesTab();
        expect(__page2.myMenteesTab).toBeVisible({ timeout: 30000 });
        expect(__page2.mentorAcceptRejectButton(String.valueOf(this.user.name), "Accept")).toBeVisible({ timeout: 30000 });
        expect(__page2.mentorAcceptRejectButton(String.valueOf(this.user.name), "Reject")).toBeVisible({ timeout: 30000 });
        __page2 = __page2.clickAcceptRejectButton(String.valueOf(this.user.name), "Accept");
        __page2 = __page2.selectAFilterOption("mentor-options-APPROVED");
        expect(__page2.mentorApplicationStatusText(String.valueOf(this.user.name), "Accepted")).toBeVisible({ timeout: 30000 });
        expect(__page2.mentorCardUserName(String.valueOf(this.user.name))).toBeVisible({ timeout: 30000 });
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
