// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { expect } from "common/testing/playwright";

export class MePageContentBasicTest extends BaseRestTest {

    private readonly cardName: string = UUID.randomUUID().toString();
    private readonly cardLevel: string = "Beginner";
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser();

    }

    public createAssignAndVerifyContent(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.clickCreateButton();
        __page1 = __page1.clickSmartCardButton();
        __page1 = __page1.goToTextSmartCardTab();
        __page1 = __page1.fillInTitle(this.cardName);
        __page1 = __page1.selectLevel(this.cardLevel);
        __page1 = __page1.clickCreateCardButton();
        expect(__page1.firstCreatedCard(this.cardName)).toBeVisible({ timeout: 30000 });
        __page1 = __page1.clickThreeDotsCardMenu();
        __page1 = __page1.clickAssignToMe();
        __page1 = __page1.clickAssignButton();
        __page1 = __page1.clickShareCardButton();
        __page1 = __page1.clickShareContentUser();
        __page1 = __page1.clickShareButton();
        __page1 = __page1.clickSharedByMeTab();
        expect(__page1.firstCreatedCard(this.cardName)).toBeVisible({ timeout: 30000 });
        __page1 = __page1.clickAssignedByMeTab();
        expect(__page1.firstCreatedCard(this.cardName)).toBeVisible({ timeout: 30000 });
        __page1 = __page1.clickSharedByMeTab();
        __page1 = __page1.clickThreeDotsCardMenu();
        __page1 = __page1.clickDeleteCard();
        __page1 = __page1.clickAreYouSureDeleteButton();
        expect(__page1.sharedByMeEmpty.first()).toContainText("There are no available cards.", { timeout: 30000 });
        __page1 = __page1.clickDeletedTab();
        expect(__page1.firstCreatedCard(this.cardName)).toBeVisible({ timeout: 30000 });
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
