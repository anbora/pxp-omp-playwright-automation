// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { TeamsResponsibleEnum } from "common/enums/TeamsResponsibleEnum";
import { ResultContainer } from "models/ResultContainer";
import { UserModel } from "models/user/UserModel";
import { LandingPage } from "pages/landing/LandingPage";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { expect } from "common/testing/playwright";

export class AnnouncementsWidgetTest extends BaseRestTest {

    private announcementTitleContainer: ResultContainer = new ResultContainer();
    private user: UserModel;
    private adminSettings: string = "Settings";

    public initialize(): void {

    this.user = this.createUser(true);

    }
    public announcementsWidgetTest(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.goToAdminPanel();
        __page1 = __page1.selectMainTab(this.adminSettings);
        __page1 = __page1.openSettingsAnnouncementsPage();
        __page1 = __page1.getFirstEnabledAnnouncementTitle(this.announcementTitleContainer);
        __page1 = __page1.goDirectlyTo(LandingPage);
        expect(__page1.announcementsWidget()).toBeVisible({ timeout: 30000 });
        expect(__page1.announcement(this.announcementTitleContainer.getValue())).toBeVisible({ timeout: 30000 });
    }
}
