import { RoleListAssertions } from "assertions/careergrowth/careergrowth/RoleListAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { ResultContainer } from "models/ResultContainer";
import { UserModel } from "models/user/UserModel";
import { WelcomePage_New } from "pages/careergrowth/careergrowth/WelcomePage_New";
import { LandingPage } from "pages/landing/LandingPage";
import { AddWorkHistoryToCareerProfileScenario } from "scenarios/jobs/AddWorkHistoryToCareerProfileScenario";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddCustomRoleToUserScenario } from "scenarios/profile/AddCustomRoleToUserScenario";
import { AddCustomSkillToUserScenario } from "scenarios/profile/AddCustomSkillToUserScenario";

export class OrganizationRestrictionToJobVacancyRecommendationsTest extends BaseRestTest {

    private user3: UserModel;

    private user1: UserModel;

    private user2: UserModel;
    private recommendedJobList: ResultContainer = new ResultContainer();
    private careerGoal: string = "Career Goal";
    private workplaceModel: string = "Workplace Model";
    private jobType: string = "Job Type";
    private schedule: string = "Schedule";
    private careerTrack: string = "Career Track";
    private backward: string = "I am open to roles with lower levels of responsibility";
    private internship: string = "Internship";
    private hybrid: string = "Hybrid";
    private fullTime: string = "Full time";
    private management: string = "Management";
    private october: string = "Oct";
    private year_2017: string = "2017";
    private june: string = "Jun";
    private year_2022: string = "2024";
    private organization: string = "Organization";

    private TITLE_1: string = "Manga Reader - A1";
    private TITLE_2: string = "Manga Reader - A2";
    private TITLE_3: string = "Manga Reader - B";
    private TITLE_4: string = "Manga Reader - empty";
    private TITLE_5: string = "Manga Reader - A1 and A2";
    private TITLE_6: string = "Manga Reader - A1 and B";

    private role: string = "Manga Reader";
    private role_2: string = "Manga Reader 2";
    private organizationA1: string = "Anime Watcher A1";
    private organizationB: string = "Anime Watcher B";

    private expectedRestrictionOffNoOrganization: Array<string> = Arrays.asList(this.TITLE_1, this.TITLE_2, this.TITLE_3, this.TITLE_4, this.TITLE_5, this.TITLE_6);
    private noExpectedRestrictionOffNoOrganization: Array<string> = List.of();
    private expectedRestrictionOnNoOrganization: Array<string> = Arrays.asList(this.TITLE_1, this.TITLE_2, this.TITLE_3, this.TITLE_4, this.TITLE_5, this.TITLE_6);
    private noExpectedRestrictionOnNoOrganization: Array<string> = List.of();
    private expectedRestrictionOffOrganizationA1: Array<string> = Arrays.asList(this.TITLE_1, this.TITLE_2, this.TITLE_3, this.TITLE_4, this.TITLE_5, this.TITLE_6);
    private noExpectedRestrictionOffOrganizationA1: Array<string> = List.of();
    private expectedRestrictionOnOrganizationA1: Array<string> = Arrays.asList(this.TITLE_1, this.TITLE_5, this.TITLE_4, this.TITLE_6);
    private noExpectedRestrictionOnOrganizationA1: Array<string> = Arrays.asList(this.TITLE_2, this.TITLE_3);
    private expectedRestrictionOffOrganizationA1andB: Array<string> = Arrays.asList(this.TITLE_1, this.TITLE_2, this.TITLE_3, this.TITLE_4, this.TITLE_5, this.TITLE_6);
    private noExpectedRestrictionOffOrganizationA1andB: Array<string> = List.of();
    private expectedRestrictionOnOrganizationA1andB: Array<string> = Arrays.asList(this.TITLE_1, this.TITLE_3, this.TITLE_4, this.TITLE_5, this.TITLE_6);
    private noExpectedRestrictionOnOrganizationA1andB: Array<string> = Arrays.asList(this.TITLE_2);

    public initialize(): void {
      this.user1 = this.createUser(true);
      this.user2 = this.createUser(true);
      this.user3 = this.createUser(true);
    }

    public dataProvider(): any[][] {
        return [
                [this.user1, false, List.of(), false, List.of(), this.expectedRestrictionOffNoOrganization, this.noExpectedRestrictionOffNoOrganization, this.expectedRestrictionOnNoOrganization, this.noExpectedRestrictionOnNoOrganization],
                [this.user2, true, Collections.singleton(this.organizationA1), false, List.of(), this.expectedRestrictionOffOrganizationA1, this.noExpectedRestrictionOffOrganizationA1, this.expectedRestrictionOnOrganizationA1, this.noExpectedRestrictionOnOrganizationA1],
                [this.user3, true, Collections.singleton(this.organizationA1), true, Collections.singleton(this.organizationB), this.expectedRestrictionOffOrganizationA1andB, this.noExpectedRestrictionOffOrganizationA1andB, this.expectedRestrictionOnOrganizationA1andB, this.noExpectedRestrictionOnOrganizationA1andB]
        ];
    }

    public shouldCheckThat(user: UserModel, withOrganization: boolean, organizationValueList: Array<string>, withOrganizationUnit: boolean, organizationUnitValueList: Array<string>, expectedRoleList: Array<string>, notExpectedRoleList: Array<string>, expectedRoleList2: Array<string>, notExpectedRoleList2: Array<string>): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(user))
                .run(new AddCustomRoleToUserScenario(user, this.role, "Anime Watcher family -  " + this.role))
                .run(new AddCustomSkillToUserScenario("manga"))
                .run(new AddCustomSkillToUserScenario("illustration"))
                .run(new AddCustomSkillToUserScenario("drawing"))
                .goDirectlyTo(WelcomePage_New)
                .refreshPage()
                .clickUpdateCareerProfileLink()
                .run(new AddWorkHistoryToCareerProfileScenario(this.role, "Manga Reader", this.role, this.october, this.year_2017, this.june, this.year_2022))
                .clickSaveAndContinueButton()
                .clickXButton()
                .goToEditProfileFromUserDropDown(user.name)
                .clickEditProfileButton()
                .goToCareerPreferencesTab()
                .addCareerPreference("Preferred Work Location", "TestingQA")
                .selectCareerPreferenceCheckbox(this.careerGoal, this.backward)
                .selectCareerPreferenceCheckbox(this.careerGoal, "I'm open to horizontal career development moves")
                .selectCareerPreferenceCheckbox(this.careerGoal, "I want to progress my career and take on more responsibility")
                .selectCareerPreferenceCheckbox(this.workplaceModel, this.hybrid)
                .selectCareerPreferenceCheckbox(this.schedule, this.fullTime)
                .selectCareerPreferenceCheckbox(this.careerTrack, this.management)
                .addCareerPreference(this.jobType, this.internship)
                .addAFewCareerPreferencesWithCondition("Department", organizationValueList, withOrganization)
                .clickAFewCheckboxesWithCondition("Legal Unit", organizationUnitValueList, withOrganizationUnit)
                .goToCareerGrowthPage()
                .goToRolesPageViaTab()
                .typeSearchValue(this.role_2)
                .markFirstRoleAsAspirational()
                .goToAdminPanel()
                .selectOpportunityMarketplace()
                .openMenuForJobVacancyOpportunityMarketplace()
                .clickRecommendationsButton()
                .enableOrDisableOrganizationPreferences(true)
                .clickSaveButton()
                .goDirectlyTo(LandingPage)
                .goToCareerGrowthPage()
                .goToVacanciesPageViaTab()
                .waitForGoodOrExcellentMatchForSuggestedJobVacancy()
                .waitForRecommendationsCounterEqualOrGreaterThan(this.recommendedJobList.getListValue().length)
                .getAllRecommendedJobVacanciesWhichContainsTitle(this.recommendedJobList, this.role)
                .check(RoleListAssertions)
                    .assertThatJobRoleListContainsValues(this.recommendedJobList.getListValue(), expectedRoleList2)
                    .assertThatJobRoleListContainsNotValues(this.recommendedJobList.getListValue(), notExpectedRoleList2)
                .endAssertion()
                .goToAdminPanel()
                .selectOpportunityMarketplace()
                .openMenuForJobVacancyOpportunityMarketplace()
                .clickRecommendationsButton()
                .enableOrDisableOrganizationPreferences(false)
                .clickSaveButton()
                .goDirectlyTo(LandingPage)
                .goToCareerGrowthPage()
                .goToVacanciesPageViaTab()
                .waitForGoodOrExcellentMatchForSuggestedJobVacancy()
                .waitForRecommendationsCounterEqualOrGreaterThan(this.recommendedJobList.getListValue().length)
                .getAllRecommendedJobVacanciesWhichContainsTitle(this.recommendedJobList, this.role)
                .check(RoleListAssertions)
                    .assertThatJobRoleListContainsValues(this.recommendedJobList.getListValue(), expectedRoleList)
                    .assertThatJobRoleListContainsNotValues(this.recommendedJobList.getListValue(), notExpectedRoleList)
                .endAssertion();
    }

    public clearAfterTests(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.getCypressUser()))
                .goToAdminPanel()
                .selectOpportunityMarketplace()
                .openMenuForJobVacancyOpportunityMarketplace()
                .clickRecommendationsButton()
                .enableOrDisableOrganizationPreferences(false)
                .clickSaveButton();
    }

    public afterClass(): void {
        this.deleteUser(this.user1);
        this.deleteUser(this.user2);
        this.deleteUser(this.user3);
    }
}
