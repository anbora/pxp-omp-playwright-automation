// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { TeamsResponsibleEnum } from "common/enums/TeamsResponsibleEnum";
import { ResultContainer } from "models/ResultContainer";
import { UserModel } from "models/user/UserModel";
import { SmartCardDetailsPage } from "pages/insights/SmartCardDetailsPage";
import { LandingPage } from "pages/landing/LandingPage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { expect } from "common/testing/playwright";

export class LearningFeedWidgetTest extends BaseRestTest {

    private myAssignmentsCardTitleContainer: ResultContainer = new ResultContainer();

    public todaysInsightsTest(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginScenario(this.getUserByName("Rajendran Sridhar")));
        __page1 = __page1.refreshUntilLearningFeedWidgetTitleLoads();
        expect(__page1.learningFeedWidget).toBeVisible({ timeout: 30000 });
        expect(__page1.todaysInsightsTab).toBeVisible({ timeout: 30000 });
        __page1 = __page1.clickTodaysInsightsTab();
        expect(__page1.todaysInsightsTab).toHaveAttribute("class", "nav-link active", { timeout: 30000 });
    }

    public teamLearningTest(): void {
                let __page2: any = this;
        __page2 = __page2.getOmpLoginPage();
        __page2 = __page2.run(new LoginScenario(this.getUserByName("Rajendran Sridhar")));
        __page2 = __page2.refreshUntilLearningFeedWidgetTitleLoads();
        expect(__page2.learningFeedWidget).toBeVisible({ timeout: 30000 });
        expect(__page2.teamLearningTab).toBeVisible({ timeout: 30000 });
        __page2 = __page2.clickTeamLearningTab();
        expect(__page2.teamLearningTab).toHaveAttribute("class", "nav-link active", { timeout: 30000 });
        expect(__page2.learningFeedNoCardsIcon).toBeVisible({ timeout: 30000 });
    }

    public myAssignmentsTest(): void {
                let __page3: any = this;
        __page3 = __page3.getOmpLoginPage();
        __page3 = __page3.run(new LoginScenario(this.getUserByName("Rajendran Sridhar")));
        __page3 = __page3.refreshUntilLearningFeedWidgetTitleLoads();
        expect(__page3.learningFeedWidget).toBeVisible({ timeout: 30000 });
        expect(__page3.myAssignmentsTab).toBeVisible({ timeout: 30000 });
        __page3 = __page3.clickMyAssignmentsTab();
        expect(__page3.myAssignmentsTab).toHaveAttribute("class", "nav-link active", { timeout: 30000 });
        __page3 = __page3.getFirstCardOnMyAssignmentsList(this.myAssignmentsCardTitleContainer);
        __page3 = __page3.clickMyAssignmentsCardWithTitle(this.myAssignmentsCardTitleContainer.getValue());
        expect(__page3.this.myAssignmentsCardTitleContainer.getValue()).toContainText(this.myAssignmentsCardTitleContainer.getValue(), { timeout: 30000 });
    }

    public featuredTest(): void {
                let __page4: any = this;
        __page4 = __page4.getOmpLoginPage();
        __page4 = __page4.run(new LoginScenario(this.getUserByName("Rajendran Sridhar")));
        __page4 = __page4.refreshUntilLearningFeedWidgetTitleLoads();
        expect(__page4.learningFeedWidget).toBeVisible({ timeout: 30000 });
        expect(__page4.featuredTab).toBeVisible({ timeout: 30000 });
        __page4 = __page4.clickFeaturedTab();
        expect(__page4.featuredTab).toHaveAttribute("class", "nav-link active", { timeout: 30000 });
    }
}
