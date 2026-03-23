import { SkillsPassportMePageAssertions } from "assertions/careergrowth/jobs/SkillsPassportMePageAssertions";
import { ExperienceCareerProfileModalAssertions } from "assertions/careergrowth/profiles/ExperienceCareerProfileModalAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { AddWorkHistoryToCareerProfileScenario } from "scenarios/jobs/AddWorkHistoryToCareerProfileScenario";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";

export class WorkHistoryInMeSkillsPassportSanityTest extends BaseRestTest {

    private geodesist: string = "GEODESIST";
    private lumesse: string = "lumesse";
    private creatingMaps: string = "Creating maps";
    private october: string = "Oct";
    private year_2017: string = "2017";
    private june: string = "Jun";
    private year_2022: string = "2022";
    private workHistoryDescription: string = "Professional experience you have gained from previous jobs, internships or contract positions.";

    private user: UserModel;

    public initialize(): void {

    this.user = this.createUser();

    }

    public shouldAddWorkHistoryViaUpdateCareerProfileLink(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .run(new AddRoleAndFamilyToNewUserScenario(this.user.name))
                .goToCareerGrowthPage()
                .clickUpdateCareerProfileLink()
                .run(new AddWorkHistoryToCareerProfileScenario(this.geodesist, this.lumesse, this.creatingMaps, this.october, this.year_2017, this.june, this.year_2022))
                .clickSaveAndContinueButton()
                .clickXButton()
                .goToMePageProfile()
                .goToSkillPassportTab()
                .check(SkillsPassportMePageAssertions)
                    .assertThatWorkHistoryHeaderHasText(this.workHistoryDescription)
                    .assertThatWorkHistoryTitleIsEqualTo(this.geodesist)
                    .assertThatWorkHistoryPeriodIsEqualTo(this.geodesist, this.october + " " + this.year_2017 + " - " + this.june + " " + this.year_2022)
                    .assertThatWorkHistoryCompanyIsEqualTo(this.geodesist, this.lumesse)
                .endAssertion()
                .clickOnWorkHistoryItem(this.geodesist)
                .deleteWorkHistoryItem()
                .clickConfirm();
    }

    public shouldAddWorkHistoryViaSkillsPassport(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.user))
                .goToMePageProfile()
                .goToSkillPassportTab()
                .clickAddMoreSkillsButton()
                .selectWorkHistory()
                .fillPositionTitle(this.geodesist)
                .fillCompanyName(this.lumesse)
                .fillDescription(this.creatingMaps)
                .selectStartDateMonth(this.october)
                .selectStartDateYear(this.year_2017)
                .selectEndDateMonth(this.june)
                .selectEndDateYear(this.year_2022)
                .clickSaveButton()
                .goToCareerGrowthPage()
                .clickUpdateCareerProfileLink()
                .check(ExperienceCareerProfileModalAssertions)
                    .assertThatWorkHistoryContainsLabelWithPositionTitle(this.geodesist)
                    .assertThatWorkHistoryPeriodForPositionIsEqualTo(this.geodesist, this.october + " " + this.year_2017 + " - " + this.june + " " + this.year_2022)
                    .assertThatWorkHistoryCompanyLabelIsEqualTo(this.geodesist, this.lumesse)
                .endAssertion()
                .clickXButton()
                .goToMePageProfile()
                .goToSkillPassportTab()
                .clickOnWorkHistoryItem(this.geodesist)
                .deleteWorkHistoryItem()
                .clickConfirm();
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
