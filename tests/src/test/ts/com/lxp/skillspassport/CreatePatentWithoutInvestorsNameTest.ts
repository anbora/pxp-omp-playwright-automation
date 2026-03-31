// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";
import { expect } from "common/testing/playwright";

export class CreatePatentWithoutInvestorsNameTest extends BaseRestTest {

    private static readonly RANDOM_SUFFIX: string = RandomStringUtils.randomAlphabetic(10);
    private static readonly PATENT_NAME: string = "EN Patent" + CreatePatentWithoutInvestorsNameTest.RANDOM_SUFFIX;
    private static readonly DESCRIPTION: string = "nPreviously, customers regularly created, updated, and deleted content on the platform. However, any content that needed to be removed after a certain number of days had to be removed manually. Content authors were unable to specify the number of days after which the content would be automatically archived from the platform. With the latest update, content authors and Administrators can specify a particular date for automatic archiving. This feature is optional and applies exclusively to this.user c";
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser();

    }

    public addPatentWithoutInvestorsName(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run((new LoginWithOnboardingScenario(this.user)));
        __page1 = __page1.run(new AddRoleAndFamilyToNewUserScenario(this.user.name));
        __page1 = __page1.goToMePageProfile();
        __page1 = __page1.goToSkillPassportTab();
        __page1 = __page1.clickSkillsPassportAddSkillButton();
        __page1 = __page1.selectPatentType();
        __page1 = __page1.addPatentTitle(CreatePatentWithoutInvestorsNameTest.PATENT_NAME);
        __page1 = __page1.addDescriptionFromInput(CreatePatentWithoutInvestorsNameTest.DESCRIPTION);
        __page1 = __page1.clickSaveButton();
        expect(__page1.getPatentName()).toHaveValue(CreatePatentWithoutInvestorsNameTest.PATENT_NAME);
        __page1.logger.info("Successfully verified that patent is added");
        expect(__page1.getPatentInvestorName()).toBeVisible();
        __page1.logger.info("Successfully verified that Investor's name is empty");
    }

    public afterTests(): void {

      this.deleteUser(this.user);

    }
}
