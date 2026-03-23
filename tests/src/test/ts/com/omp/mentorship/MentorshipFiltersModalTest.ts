import { MentorshipDiscoveryAssertions } from "assertions/careergrowth/mentorship/MentorshipDiscoveryAssertions";
import { BaseRestTest } from "common/BaseRestTest";
import { FunctionalAreaEnum } from "common/enums/FunctionalAreaEnum";
import { GroupNameEnum } from "common/enums/GroupNameEnum";
import { UserModel } from "models/user/UserModel";
import { LandingPage } from "pages/landing/LandingPage";
import { LoginWithOnboardingScenario } from "scenarios/other/LoginWithOnboardingScenario";
import { AddRoleAndFamilyToNewUserScenario } from "scenarios/profile/AddRoleAndFamilyToNewUserScenario";

export class MentorshipFiltersModalTest extends BaseRestTest {

    private user: UserModel;
    private jobRoles: string = "Job Roles";
    private skills: string = "Skills";
    private timeZones: string = "Time Zones";
    private languages: string = "Languages";
    private geographicalLocation: string = "Geographical Location";
    private unitOfBusiness: string = "Unit of Business";
    private department: string = "Department";
    private legalUnit: string = "Legal Unit";
    private searchAllJobRoles: string = "Search all Job Roles";
    private searchAllSkills: string = "Search all this.skills";
    private jobRoleValue: string = "Unusual job family -  Java developer";
    private jobRoleNoFamily: string = "Java developer";
    private skillValue: string = "java 8";
    private timeZonesValue: string = "[UTC −10:00] Pacific/Honolulu";
    private languageValue: string = "Ukrainian";
    private geographicalLocationValue: string = "India";
    private departmentValue: string = "Automation Dept";
    private unitOfBusinessValue: string = "Automation";
    private legalUnitValue: string = "Yuliia";
    private timeZonesSectionNumber: string = "3";
    private languagesSectionNumber: string = "4";
    private locationSectionNumber: string = "5";
    private departmentSectionNumber: string = "6";

    public initialize(): void {

    this.user = this.createUser(true);

    }

    public CheckAllFiltersInFiltersModal(): void {
        this.getOmpLoginPage()
                .run(new LoginWithOnboardingScenario(this.user))
                .run(new AddRoleAndFamilyToNewUserScenario(this.user.name))
                .goDirectlyTo(LandingPage)
                .goToCareerGrowthPage()
                .goToMentorshipPageViaCard()
                .clickInFiltersButton()
                .check(MentorshipDiscoveryAssertions)
                    .assertThatFilterTitlesAreDisplayed(this.jobRoles)
                    .assertThatFilterTitlesAreDisplayed(this.skills)
                    .assertThatFilterTitlesAreDisplayed(this.timeZones)
                    .assertThatFilterTitlesAreDisplayed(this.languages)
                    .assertThatFilterTitlesSecondAreDisplayed(this.geographicalLocation)
                    .assertThatFilterTitlesSecondAreDisplayed(this.unitOfBusiness)
                    .assertThatFilterTitlesSecondAreDisplayed(this.department)
                    .assertThatFilterTitlesSecondAreDisplayed(this.legalUnit)
                    .assertThatSearchFieldsDefaultTextIsDisplayed(this.searchAllJobRoles)
                    .assertThatSearchFieldsDefaultTextIsDisplayed(this.searchAllSkills)
                    .assertThatLocationsAndDepartmentInputFieldsAreDisplayed(this.locationSectionNumber)
                    .assertThatLocationsAndDepartmentInputFieldsAreDisplayed(this.departmentSectionNumber)
                    .assertThatTimeZonesAndLanguagesInputFieldsAreDisplayed(this.timeZonesSectionNumber)
                    .assertThatTimeZonesAndLanguagesInputFieldsAreDisplayed(this.languagesSectionNumber)
                    .assertThatShowMoreFieldIsDisplayed()
                .endAssertion()
                .clickAndFillFilter(this.searchAllJobRoles, this.jobRoleValue, this.jobRoleValue)
                .clickAndFillFilter(this.searchAllSkills, this.skillValue, this.skillValue)
//                .clickAndFillLanguageAndTimezonesFilter(timeZonesSectionNumber,timeZonesValue)
                .clickAndFillLanguageAndTimezonesFilter(this.languagesSectionNumber,this.languageValue)
                .clickAndFillLocationsAndDepartmentFilter(this.locationSectionNumber, this.geographicalLocationValue)
                .clickAndFillLocationsAndDepartmentFilter(this.departmentSectionNumber,this.departmentValue)
                .selectDivisionFilter(this.unitOfBusinessValue)
                .selectLegalUnitFilter(this.legalUnitValue)
                .clickApplyButtonFiltersModal()
                .check(MentorshipDiscoveryAssertions)
                    .assertThatAppliedFiltersAreVisible(this.jobRoleNoFamily)
                    .assertThatAppliedFiltersAreVisible(this.skillValue)
//                  .assertThatAppliedFiltersAreVisible(timeZonesValue)
                    .assertThatAppliedFiltersAreVisible(this.languageValue)
                    .assertThatAppliedFiltersAreVisible(this.geographicalLocationValue)
                    .assertThatAppliedFiltersAreVisible(this.departmentValue)
                    .assertThatAppliedFiltersAreVisible(this.unitOfBusinessValue)
                    .assertThatAppliedFiltersAreVisible(this.legalUnitValue)
                .endAssertion();
    }

    public afterClass(): void {

      this.deleteUser(this.user);

    }
}
