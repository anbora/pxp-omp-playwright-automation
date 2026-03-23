import { EditFieldModalAssertions } from "assertions/admin/EditFieldModalAssertions";
import { AllFiltersModalAssertions } from "assertions/careergrowth/jobs/AllFiltersModalAssertions";
import { OpportunityMarketplaceConfigurationAssertions } from "assertions/careergrowth/jobs/OpportunityMarketplaceConfigurationAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { AllFiltersModalPage } from "pages/careergrowth/jobs/AllFiltersModalPage";
import { LoginScenario } from "scenarios/other/LoginScenario";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";
import { AddSkillToNewUserScenario_SkillLevel } from "scenarios/profile/AddSkillToNewUserScenario_SkillLevel";

export class LOVFiltersInJobVacanciesPageTest extends BaseRestTest {

    private jobVacancy: string = "Job Vacancy";
    private level: string = "Level";
    private workplaceModel: string = "Workplace Model";
    private jobType: string = "Job Type";
    private schedule: string = "Schedule";
    private careerTrack: string = "Career Track";
    private permanent: string = "Permanent";
    private contract: string = "Contract";
    private temporary: string = "Temporary";
    private volunteer: string = "Volunteer";
    private internship: string = "Internship";
    private probation: string = UUID.randomUUID().toString();
    private probation2: string = UUID.randomUUID().toString();
    private apprenticeship: string = "Apprenticeship";
    private other: string = "Other";
    private customLOVItem: string = "Custom Lov Item";
    private management: string = "Management";
    private individualContributor: string = "Individual contributor";
    private general: string = "General";
    private standardFields: string = "Standard Fields";
    private select: string = "Select";
    private seasonal: string = "Seasonal";
    private one: string = "2";
    private two: string = "3";
    private three: string = "4";
    private four: string = "5";
    private five: string = "6";
    private six: string = "7";
    private seven: string = "8";
    private english: string = "English";
    private opportunityMarketplace: string = "Talent Marketplace";
    private hrData: string = "HR Data";
    private configuration: string = "Configuration";
    private userModel: UserModel;

    public initialize(): void {

    this.userModel = this.createUser(true);

    }

    prepareTests(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.userModel))
                .run(new AddRoleAndFamilyToNewUserScenario(this.userModel.name))
                .run(new AddSkillToNewUserScenario_SkillLevel())
                .goToAdminPanel()
                .selectMainTab(this.opportunityMarketplace)
                .openMenuForOpportunityMarketplace(this.general)
                .openOpportunityMarketplaceInnerTab(this.standardFields)
                .editField(this.jobType)
                .enableVisibility(this.other)
                .disableVisibility(this.customLOVItem)
                .clickSetLanguage(this.customLOVItem)
                .deleteTranslation(this.english)
                .setLanguages()
                .clickSave()
                .clickSave();
    }

    public enableDisableAndSetTranslationForLOVFilterOnJobVacanciesPage(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.userModel))
                .goToCareerGrowthPage()
                .goToVacanciesPageViaCard()
                .openFiltersModal(AllFiltersModalPage)
                .showMore(this.jobType)
                .check(AllFiltersModalAssertions)
                    .assertThatFilterTitleIsDisplayed(this.level)
                    .assertThatFilterTitleIsDisplayed(this.workplaceModel)
                    .assertThatFilterTitleIsDisplayed(this.schedule)
                    .assertThatFilterOptionIsDisplayed(this.jobType, this.permanent, this.one)
                    .assertThatFilterOptionIsDisplayed(this.jobType, this.contract, this.two)
                    .assertThatFilterOptionIsDisplayed(this.jobType, this.temporary, this.three)
                    .assertThatFilterOptionIsDisplayed(this.jobType, this.volunteer, this.four)
                    .assertThatFilterOptionIsDisplayed(this.jobType, this.internship, this.five)
                    .assertThatFilterOptionIsDisplayed(this.jobType, this.apprenticeship, this.six)
                    .assertThatFilterOptionIsDisplayed(this.jobType, this.other, this.seven)
                    .assertThatFilterOptionIsDisplayed(this.careerTrack, this.management, "1")
                    .assertThatFilterOptionIsDisplayed(this.careerTrack, this.individualContributor, "2")
                .endAssertion()
                .closeModal()
                .goToAdminPanel()
                .selectMainTab(this.opportunityMarketplace)
                .openMenuForOpportunityMarketplace(this.general)
                .openOpportunityMarketplaceInnerTab(this.standardFields)
                .check(OpportunityMarketplaceConfigurationAssertions)
                    .assertThatTypeForFieldContain(this.jobType, this.select)
                    .assertThatUsageForFieldContain(this.jobType, this.jobVacancy)
                    .assertThatAvailableOptionsForFieldContain(this.jobType, this.permanent + ", " + this.contract + ", " + this.temporary + ", "
                            + this.volunteer + ", " + this.internship + ", " + this.apprenticeship + ", " + this.other)
                .endAssertion()
                .changeContextToAdminPanel()
                .selectMainTab(this.hrData)
                .openMenuForOpportunityMarketplace(this.configuration)
                .openHrDataInnerTab(this.standardFields)
                .check(OpportunityMarketplaceConfigurationAssertions)
                    .assertThatTypeForFieldContain(this.careerTrack, this.select)
                    .assertThatUsageForFieldContain(this.careerTrack, this.jobVacancy)
                    .assertThatAvailableOptionsForFieldContain(this.careerTrack, this.management + ", " + this.individualContributor)
                .endAssertion()
                .changeContextToAdminPanel()
                .selectMainTab(this.opportunityMarketplace)
                .openMenuForOpportunityMarketplace(this.general)
                .openOpportunityMarketplaceInnerTab(this.standardFields)
                .editField(this.jobType)
                .addNewOption()
                .check(EditFieldModalAssertions)
                    .assertThatNewLabelIsDisplayed()
                .endAssertion()
                .closeModal()
                .refreshPage()
                .openOpportunityMarketplaceInnerTab(this.standardFields)
                .editField(this.jobType)
                .disableVisibility(this.other)
                .enableVisibility(this.customLOVItem)
                .typeNewLabel(this.customLOVItem, this.probation)
                .clickSave();
    }

    public checkCustomFiledEnablementAndSetLanguage(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.userModel))
                .goToCareerGrowthPage()
                .goToVacanciesPageViaCard()
                .openFiltersModal(AllFiltersModalPage)
                .showMore(this.jobType)
                .check(AllFiltersModalAssertions)
                    .assertThatFilterOptionIsDisplayed(this.jobType, this.permanent, this.one)
                    .assertThatFilterOptionIsDisplayed(this.jobType, this.contract, this.two)
                    .assertThatFilterOptionIsDisplayed(this.jobType, this.temporary, this.three)
                    .assertThatFilterOptionIsDisplayed(this.jobType, this.volunteer, this.four)
                    .assertThatFilterOptionIsDisplayed(this.jobType, this.internship, this.five)
                    .assertThatFilterOptionIsDisplayed(this.jobType, this.apprenticeship, this.six)
                    .assertThatFilterOptionIsDisplayed(this.jobType, this.probation)
                .endAssertion()
                .closeModal()
                .goToAdminPanel()
                .selectMainTab(this.opportunityMarketplace)
                .openMenuForOpportunityMarketplace(this.general)
                .openOpportunityMarketplaceInnerTab(this.standardFields)
                .editField(this.jobType)
                .clickSetLanguage(this.customLOVItem)
                .selectLanguage(this.english)
                .clickAddLanguage()
                .typeTranslation(this.english, this.probation2)
                .setLanguages()
                .clickSave()
                .clickSave();
    }

    public checkTranslationForJobType(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.userModel))
                .goToCareerGrowthPage()
                .goToVacanciesPageViaCard()
                .openFiltersModal(AllFiltersModalPage)
                .showMore(this.jobType)
                .check(AllFiltersModalAssertions)
                    .assertThatFilterOptionIsDisplayed(this.jobType, this.permanent, this.one)
                    .assertThatFilterOptionIsDisplayed(this.jobType, this.contract, this.two)
                    .assertThatFilterOptionIsDisplayed(this.jobType, this.temporary, this.three)
                    .assertThatFilterOptionIsDisplayed(this.jobType, this.volunteer, this.four)
                    .assertThatFilterOptionIsDisplayed(this.jobType, this.internship, this.five)
                    .assertThatFilterOptionIsDisplayed(this.jobType, this.apprenticeship, this.six)
                    .assertThatFilterOptionIsDisplayed(this.jobType, this.probation2);
    }

    public shouldEnsureTheConditionsAreTheSameAsBeforeTheTest(): void {
        this.getOmpLoginPage()
                .run(new LoginScenario(this.userModel))
                .goToAdminPanel()
                .selectMainTab(this.opportunityMarketplace)
                .openMenuForOpportunityMarketplace(this.general)
                .openOpportunityMarketplaceInnerTab(this.standardFields)
                .editField(this.jobType)
                .enableVisibility(this.other)
                .disableVisibility(this.customLOVItem)
                .clickSetLanguage(this.customLOVItem)
                .deleteTranslation(this.english)
                .setLanguages()
                .clickSave()
                .clickSave();
    }

    public afterClass(): void {

      this.deleteUser(this.userModel);

    }
}
