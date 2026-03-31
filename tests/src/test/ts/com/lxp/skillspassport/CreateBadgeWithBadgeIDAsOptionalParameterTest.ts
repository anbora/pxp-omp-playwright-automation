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

export class CreateBadgeWithBadgeIDAsOptionalParameterTest extends BaseRestTest {

    private static readonly UNIQUE_SUFFIX: string = UUID.randomUUID().toString();
    private static readonly RANDOM_SUFFIX: string = RandomStringUtils.randomAlphabetic(10);
    private static readonly BADGE_NAME: string = "New EN Badge" + CreateBadgeWithBadgeIDAsOptionalParameterTest.RANDOM_SUFFIX;
    private static readonly BADGE_LEVEL: string = "Beginner";
    private static readonly BADGE_ISSUER: string = "Issuer-"  + CreateBadgeWithBadgeIDAsOptionalParameterTest.UNIQUE_SUFFIX;
    private static readonly ID_NUMBER: string = "ID-"  + CreateBadgeWithBadgeIDAsOptionalParameterTest.UNIQUE_SUFFIX;
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser();

    }

    public addBadgeCardWithoutBadgeID(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.run(new AddRoleAndFamilyToNewUserScenario(this.user.name));
        __page1 = __page1.goToMePageProfile();
        __page1 = __page1.goToSkillPassportTab();
        __page1 = __page1.clickSkillsPassportAddSkillButton();
        __page1 = __page1.selectBadgeType();
        __page1 = __page1.addBadgeTitle(CreateBadgeWithBadgeIDAsOptionalParameterTest.BADGE_NAME);
        __page1 = __page1.selectBadgeLevel(CreateBadgeWithBadgeIDAsOptionalParameterTest.BADGE_LEVEL);
        __page1 = __page1.selectBadgeIssuerFromInput(CreateBadgeWithBadgeIDAsOptionalParameterTest.BADGE_ISSUER);
        __page1 = __page1.clickSaveButton();
        expect(__page1.getBadgeCard()).toContainText(CreateBadgeWithBadgeIDAsOptionalParameterTest.BADGE_NAME);
        __page1.logger.info("Successfully verified that badge is added");
    }

    public editAddedBadgeCardWithoutBadgeID(): void {
                let __page2: any = this;
        __page2 = __page2.getOmpLoginPage();
        __page2 = __page2.run(new LoginScenario(this.user));
        __page2 = __page2.goDirectlyTo(AddEditBadgeModalPage, CreateBadgeWithBadgeIDAsOptionalParameterTest.BADGE_NAME);
        __page2 = __page2.clickBadgeCard();
        __page2 = __page2.editBadgeCard();
        __page2 = __page2.selectBadgeIDFromInput(CreateBadgeWithBadgeIDAsOptionalParameterTest.ID_NUMBER);
        __page2 = __page2.clickSaveButton();
        __page2 = __page2.clickBadgeCard();
        __page2 = __page2.editBadgeCard();
        expect(__page2.getBadgeID()).toHaveValue(CreateBadgeWithBadgeIDAsOptionalParameterTest.ID_NUMBER);
        __page2.logger.info("Successfully verified that badge contains badge ID");
    }

    public afterTests(): void {

      this.deleteUser(this.user);

    }
}
