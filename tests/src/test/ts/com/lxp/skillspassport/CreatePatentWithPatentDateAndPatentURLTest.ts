// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { ResultContainer } from "models/ResultContainer";
import { UserModel } from "models/user/UserModel";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";
import { expect } from "common/testing/playwright";

export class CreatePatentWithPatentDateAndPatentURLTest extends BaseRestTest {

    private static readonly UNIQUE_SUFFIX: string = UUID.randomUUID().toString();
    private static readonly RANDOM_SUFFIX: string = RandomStringUtils.randomAlphabetic(10);
    private static readonly PATENT_NAME: string = "EN Patent" + CreatePatentWithPatentDateAndPatentURLTest.RANDOM_SUFFIX;
    private static readonly INVESTOR_NAME: string = "EN Investor" + CreatePatentWithPatentDateAndPatentURLTest.UNIQUE_SUFFIX;
    private static readonly URL_NAME: string = "http://" + CreatePatentWithPatentDateAndPatentURLTest.RANDOM_SUFFIX + "edcast.com";
    private user: UserModel;

    private dateContainer: ResultContainer;

    public initialize(): void {
      this.user = this.createUser();
      this.dateContainer = new ResultContainer();
    }

    public addPatentWithPatentURLAndPatentDate(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run((new LoginWithOnboardingScenario(this.user)));
        __page1 = __page1.run(new AddRoleAndFamilyToNewUserScenario(this.user.name));
        __page1 = __page1.goToMePageProfile();
        __page1 = __page1.goToSkillPassportTab();
        __page1 = __page1.clickSkillsPassportAddSkillButton();
        __page1 = __page1.selectPatentType();
        __page1 = __page1.addPatentTitle(CreatePatentWithPatentDateAndPatentURLTest.PATENT_NAME);
        __page1 = __page1.selectInvestorsName(CreatePatentWithPatentDateAndPatentURLTest.INVESTOR_NAME);
        __page1 = __page1.selectPatentURLFromInput(CreatePatentWithPatentDateAndPatentURLTest.URL_NAME);
        __page1 = __page1.chooseFifteenDayOfCurrentMonth(this.dateContainer);
        __page1 = __page1.clickSaveButton();
        __page1 = __page1.clickPatentCard();
        expect(__page1.getPatentName()).toHaveValue(CreatePatentWithPatentDateAndPatentURLTest.PATENT_NAME);
        __page1.logger.info("Successfully verified that patent is added");
        __page1 = __page1.editPatentCard();
        expect(__page1.getPatentDateSpan()).toContainText(this.dateContainer.getValue());
        __page1.logger.info("Successfully verified that patent contains patent this.dateContainer.getValue()");
        expect(__page1.getPatentURL()).toHaveValue(CreatePatentWithPatentDateAndPatentURLTest.URL_NAME);
        __page1.logger.info("Successfully verified that patent contains URL");
    }

    public afterTests(): void {

      this.deleteUser(this.user);

    }
}
