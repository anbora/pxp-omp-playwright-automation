// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { AddEditBadgeModalPage } from "pages/skillspassport/AddEditBadgeModalPage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";
import { expect } from "common/testing/playwright";

export class CreateBadgeCardWithBadgeIDAndBadgeURLTest extends BaseRestTest {

    private static readonly UNIQUE_SUFFIX: string = UUID.randomUUID().toString();
    private static readonly RANDOM_SUFFIX: string = RandomStringUtils.randomAlphabetic(10);
    private static readonly BADGE_NAME: string = "EN Badge" + CreateBadgeCardWithBadgeIDAndBadgeURLTest.RANDOM_SUFFIX;
    private static readonly BADGE_LEVEL: string = "Beginner";
    private static readonly BADGE_ISSUER: string = "Issuer-"  + CreateBadgeCardWithBadgeIDAndBadgeURLTest.UNIQUE_SUFFIX;
    private static readonly ID_NUMBER: string = "ID-"  + CreateBadgeCardWithBadgeIDAndBadgeURLTest.UNIQUE_SUFFIX;
    private static readonly URL_NAME: string = "https://" + CreateBadgeCardWithBadgeIDAndBadgeURLTest.RANDOM_SUFFIX + ".edcast.com";
    private user: UserModel;
    public initialize(): void {
    this.user = this.createUser();
    }

    public addBadgeCardWithBadgeIDAndBadgeURL(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.run(new AddRoleAndFamilyToNewUserScenario(this.user.name));
        __page1 = __page1.goToMePageProfile();
        __page1 = __page1.goToSkillPassportTab();
        __page1 = __page1.clickSkillsPassportAddSkillButton();
        __page1 = __page1.selectBadgeType();
        __page1 = __page1.addBadgeTitle(CreateBadgeCardWithBadgeIDAndBadgeURLTest.BADGE_NAME);
        __page1 = __page1.selectBadgeLevel(CreateBadgeCardWithBadgeIDAndBadgeURLTest.BADGE_LEVEL);
        __page1 = __page1.selectBadgeIssuerFromInput(CreateBadgeCardWithBadgeIDAndBadgeURLTest.BADGE_ISSUER);
        __page1 = __page1.selectBadgeIDFromInput(CreateBadgeCardWithBadgeIDAndBadgeURLTest.ID_NUMBER);
        __page1 = __page1.selectBadgeURLFromInput(CreateBadgeCardWithBadgeIDAndBadgeURLTest.URL_NAME);
        __page1 = __page1.clickSaveButton();
        __page1 = __page1.clickBadgeCard();
        expect(__page1.getBadgeCard()).toContainText(CreateBadgeCardWithBadgeIDAndBadgeURLTest.BADGE_NAME);
        __page1.logger.info("Successfully verified that badge is added");
        __page1 = __page1.editBadgeCard();
        expect(__page1.getBadgeID()).toHaveValue(CreateBadgeCardWithBadgeIDAndBadgeURLTest.ID_NUMBER);
        __page1.logger.info("Successfully verified that badge contains badge ID");
        expect(__page1.getBadgeURL()).toHaveValue(CreateBadgeCardWithBadgeIDAndBadgeURLTest.URL_NAME);
        __page1.logger.info("Successfully verified that badge contains URL Name");
    }

    public deleteAddedBadgeCardWithBadgeIDAndBadgeURL(): void {
                let __page2: any = this;
        __page2 = __page2.getOmpLoginPage();
        __page2 = __page2.run(new LoginScenario(this.user));
        __page2 = __page2.goDirectlyTo(AddEditBadgeModalPage, CreateBadgeCardWithBadgeIDAndBadgeURLTest.BADGE_NAME);
        __page2 = __page2.clickBadgeCard();
        __page2 = __page2.clickDeleteButton();
        __page2 = __page2.clickConfirmButton();
        expect(__page2.getBadgeCard()).toBeHidden();
        __page2.logger.info("Successfully verified that badge is deleted");
    }

    public afterTests(): void {

      this.deleteUser(this.user);

    }
}
