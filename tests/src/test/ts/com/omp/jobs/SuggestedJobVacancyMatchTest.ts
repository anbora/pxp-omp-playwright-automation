// @ts-nocheck

import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { ResultContainer } from "models/ResultContainer";
import { UserModel } from "models/user/UserModel";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";
import { AddSkillToNewUserScenario_SkillLevel } from "scenarios/profile/AddSkillToNewUserScenario_SkillLevel";
import { expect } from "common/testing/playwright";

export class SuggestedJobVacancyMatchTest extends BaseRestTest {

    private matchTooltip: string = "The match estimates how close your experience and skills fit this opportunity.";
    private scoringName: ResultContainer = new ResultContainer();
    private scoringValue: ResultContainer = new ResultContainer();
    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser();

    }

    public jobVacancyMatchingShouldBeVisibleInJobVacancyDetailsPage(): void {
                let __page1: any = this;
        __page1 = __page1.getOmpLoginPage();
        __page1 = __page1.run(new LoginWithOnboardingScenario(this.user));
        __page1 = __page1.run(new AddRoleAndFamilyToNewUserScenario(this.user.name));
        __page1 = __page1.run(new AddSkillToNewUserScenario_SkillLevel());
        __page1 = __page1.goToSuggestionsPageViaCard();
        __page1 = __page1.waitForSuggestions();
        __page1 = __page1.goToVacanciesPageViaTab();
        __page1 = __page1.getJobVacancyScoringValues(this.scoringName, this.scoringValue);
        __page1 = __page1.goToFirstSuggestedJobVacancyDetailsPage();
        __page1.getPage().waitForLoadState();
        expect(__page1.matchingLabel.first()).toContainText(this.scoringName.getValue(), { timeout: 30000 });
//                    .assertThatTooltipTextIsEqualTo(matchTooltip);
    }

    public backButtonFunctionalityInSuggestedJobVacancyDetailsPage(): void {
                let __page2: any = this;
        __page2 = __page2.getOmpLoginPage();
        __page2 = __page2.run(new LoginScenario(this.user));
        __page2 = __page2.goToCareerGrowthPage();
        __page2 = __page2.goToSuggestionsPageViaTab();
        expect(__page2.recommendedJobBox()).toBeVisible({ timeout: 30000 });
        __page2 = __page2.goToFirstSuggestedJobVacancyDetailsPage();
        __page2 = __page2.clickBackButtonToSuggestionPage();
        expect(__page2.recommendedJobBox()).toBeVisible({ timeout: 30000 });
    }

    public afterTests(): void {

      this.deleteUser(this.user);

    }
}
