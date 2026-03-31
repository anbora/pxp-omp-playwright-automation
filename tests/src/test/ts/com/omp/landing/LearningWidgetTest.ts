// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { TeamsResponsibleEnum } from "common/enums/TeamsResponsibleEnum";
import { UserModel } from "models/user/UserModel";
import { LandingPage } from "pages/landing/LandingPage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";
import { expect } from "common/testing/playwright";

export class LearningWidgetTest extends BaseRestTest {

    private readonly cardName: string = UUID.randomUUID().toString();
    private readonly cardLevel: string = "Beginner";
    private readonly cardType: string = "Text";
    private readonly emptyContentMessage: string = "View in progress learning here to pick up where you left off";
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser();

    }

    public emptyContinueLearningWidget(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.run(new AddRoleAndFamilyToNewUserScenario(this.user.name));
        __page1 = __page1.goDirectlyTo(LandingPage);
        expect(__page1.allTabForWidget(CONTINUE_LEARNING)).not.toBeVisible({ timeout: 30000 });
        expect(__page1.dueDateTabForWidget(CONTINUE_LEARNING)).not.toBeVisible({ timeout: 5000 });
        expect(__page1.iconForEmptyContentInLearningWidget).toBeVisible({ timeout: 30000 });
        expect(__page1.messageForEmptyContentInLearningWidget.last()).toContainText(this.emptyContentMessage, { timeout: 30000 });
        __page1 = __page1.clickExploreContentButtonForContinueLearningWidget();
        expect(__page1.discoverTab()).toHaveClass("active", { timeout: 30000 });
    }

    public continueLearningWidgetWithSmartCard(): void {
                let __page2: any = this;
        __page2 = __page2.getOmpLoginPage();
        __page2 = __page2.run(new LoginScenario(this.user));
        __page2 = __page2.clickCreateButton();
        __page2 = __page2.clickSmartCardButton();
        __page2 = __page2.goToTextSmartCardTab();
        __page2 = __page2.fillInTitle(this.cardName);
        __page2 = __page2.selectLevel(this.cardLevel);
        __page2 = __page2.clickCreateCardButton();
        __page2 = __page2.clickBookmarkForSmartCard(this.cardName);
        __page2 = __page2.goDirectlyTo(LandingPage);
        expect(__page2.smartCardNameForLearningWidget(this.cardName)).toBeVisible({ timeout: 30000 });
        expect(__page2.smartCardImageForLearningWidget(this.cardName)).toBeVisible({ timeout: 30000 });
        expect(__page2.smartCardTypeForLearningWidget(this.cardName, this.cardType)).toBeVisible({ timeout: 30000 });
        __page2 = __page2.clickSeeAllButtonForContinueLearningWidget();
        __page2 = __page2.clickBookmarkedTab();
        expect(__page2.this.cardName).toContainText(this.cardName, { timeout: 30000 });
        __page2 = __page2.goDirectlyTo(LandingPage);
        __page2 = __page2.clickSmartCardNameForContinueLearningWidget(this.cardName);
        expect(__page2.this.cardName).toContainText(this.cardName, { timeout: 30000 });
        expect(__page2.this.cardType).toContainText(this.cardType, { timeout: 30000 });
        expect(__page2.this.cardLevel).toContainText(this.cardLevel, { timeout: 30000 });
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
