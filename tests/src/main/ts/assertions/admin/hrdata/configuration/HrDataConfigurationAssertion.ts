import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { Assert } from "common/testing/runtime";
import { HrDataConfigurationPage } from "pages/admin/hrdata/configuration/HrDataConfigurationPage";

export class HrDataConfigurationAssertion extends BaseAssertion<HrDataConfigurationPage> {

    public assertThatJobRoleConfigurationTitleIsDisplayed(): HrDataConfigurationAssertion {
        this.assertThat(this.page.jobRoleConfigurationTitle).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Job role configuration title is visible");
        return this;
    }

    public assertThatOrganizationConfigurationTabIsDisplayed(): HrDataConfigurationAssertion {
        this.assertThat(this.page.organizationConfigurationTitle).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Organization configuration title is visible");
        return this;
    }

    public assertThatOrganizationConfigurationIsDisplayed(): HrDataConfigurationAssertion {
        this.assertThat(this.page.organizationConfiguration).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Organization configuration is visible");
        return this;
    }

    public assertThatErrorMessageWhileSavingIsDisplayed(): HrDataConfigurationAssertion {
        this.assertThat(this.page.errorWhileSaving).isVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Error message is visible");
        return this;
    }

    public assertThatAutomaticallyAssignDetectedSkillsToJobRolesIsDisplayed(): HrDataConfigurationAssertion {
        this.assertThat(this.page.automaticallyAssignDetectedSkillsToJobRoles).isVisible(this.isVisibleOptions);
        this.page.logger.info("Automatically Assign Detected Skills To Job Roles is visible");
        return this;
    }

    public automaticallyAssignDetectedSkillsToJobRolesToggle(): HrDataConfigurationAssertion {
        this.assertThat(this.page.automaticallyAssignDetectedSkillsToJobRolesToggle).isVisible(this.isVisibleOptions);
        this.page.logger.info("Automatically Assign Detected Skills To Job Roles toggle is visible");
        return this;
    }

    public assertThatOverRideDetectedSkillsAssociatedForJobRoleUpdateIsDisplayed(): HrDataConfigurationAssertion {
        this.assertThat(this.page.overRideDetectedSkillsAssociatedForJobRoleUpdate).isVisible(this.isVisibleOptions);
        this.page.logger.info("Override detected skills associated for Job Role update is visible");
        return this;
    }

    public assertThatDetectedSkillLevelIsDisplayed(): HrDataConfigurationAssertion {
        this.assertThat(this.page.detectedSkillLevel).isVisible(this.isVisibleOptions);
        this.page.logger.info("Detected skill level is visible");
        return this;
    }

    public assertThatBeginnerLevelIsDisplayed(): HrDataConfigurationAssertion {
        this.assertThat(this.page.beginnerLevel).isVisible(this.isVisibleOptions);
        this.page.logger.info("Intermediate level is visible");
        return this;
    }

    public assertProficiencyLevels(expectedLevels: Set<string>): HrDataConfigurationAssertion {
        Assert.assertTrue(this.page.proficiencyLevels.allTextContents().containsAll(expectedLevels));
        Assert.assertTrue(this.page.proficiencyLevels.allInnerTexts().length == expectedLevels.length);
        return this;
    }

    public assertThatIntermediateLevelIsDisplayed(): HrDataConfigurationAssertion {
        this.assertThat(this.page.intermediateLevel).isVisible(this.isVisibleOptions);
        this.page.logger.info("Advance level is visible");
        return this;
    }

    public assertThatAdvanceLevelIsDisplayed(): HrDataConfigurationAssertion {
        this.assertThat(this.page.advanceLevel).isVisible(this.isVisibleOptions);
        this.page.logger.info("Advance level is visible");
        return this;
    }

    public assertThatMaximumNumberOfSkillsAssignedToJobRoleIsDisplayed(): HrDataConfigurationAssertion {
        this.assertThat(this.page.maximumNumberOfSkillsAssignedToJobRole).isVisible(this.isVisibleOptions);
        this.page.logger.info("Maximum number of skills assigned to job role Is visible");
        return this;
    }

    public assertThatAllowedRangeIsDisplayed(): HrDataConfigurationAssertion {
        this.assertThat(this.page.allowedRange).isVisible(this.isVisibleOptions);
        this.page.logger.info("Allowed range 1 to 50 Is visible");
        return this;
    }

    public assertThatAutomaticallyAssignDetectedNextRolesToJobRolesIsDisplayed(): HrDataConfigurationAssertion {
        this.assertThat(this.page.automaticallyAssignDetectedNextRolesToJobRoles).isVisible(this.isVisibleOptions);
        this.page.logger.info("Automatically assign detected next roles to job roles Is visible");
        return this;
    }

    public assertThatOverRideRecalculatedNextRolesAssociatedForJobRolesIsDisplayed(): HrDataConfigurationAssertion {
        this.assertThat(this.page.overRideRecalculatedNextRolesAssociatedForJobRoles).isVisible(this.isVisibleOptions);
        this.page.logger.info("Automatically assign detected next roles to job roles Is visible");
        return this;
    }

    public assertThatMaximumNumberOfNextRolesAssociatedToJobRoleIsDisplayed(): HrDataConfigurationAssertion {
        this.assertThat(this.page.maximumNumberOfNextRolesAssociatedToJobRole).isVisible(this.isVisibleOptions);
        this.page.logger.info("Maximum number of next roles associated to job role Is visible");
        return this;
    }

    public assertThatEnableCareerPathIsDisplayed(): HrDataConfigurationAssertion {
        this.assertThat(this.page.enableCareerPath).isVisible(this.isVisibleOptions);
        this.page.logger.info("Enable Career Path Is visible");
        return this;
    }

    public assertThatEnableOrganizationIsDisplayed(): HrDataConfigurationAssertion {
        this.assertThat(this.page.enableOrganization).isVisible(this.isVisibleOptions);
        this.page.logger.info("Enable organization Is visible");
        return this;
    }

    public assertThatUsageIsDisplayed(): HrDataConfigurationAssertion {
        this.assertThat(this.page.usage).isVisible(this.isVisibleOptions);
        this.page.logger.info("Usage Is visible");
        return this;
    }

    public assertThatOrganizationLevelValuesToBeDisplayedIsDisplayed(): HrDataConfigurationAssertion {
        this.assertThat(this.page.organizationLevelValuesToBeDisplayed).isVisible(this.isVisibleOptions);
        this.page.logger.info("Organization Level Values To Be Displayed Is visible");
        return this;
    }

    public assertThatOrganizationTypeDisplayedOnTheOpportunityCardIsDisplayed(): HrDataConfigurationAssertion {
        this.assertThat(this.page.organizationTypeDisplayedOnTheOpportunityCard).isVisible(this.isVisibleOptions);
        this.page.logger.info("Organization Type Displayed On The Opportunity Card Is visible");
        return this;
    }

    public assertThatLocationsConfigurationIsDisplayed(): HrDataConfigurationAssertion {
        this.assertThat(this.page.locationsConfiguration).isVisible(this.isVisibleOptions);
        this.page.logger.info("Locations Configuration Is visible");
        return this;
    }

    public assertThatJobRoleFilterLabelIsDisplayed(): HrDataConfigurationAssertion {
        this.assertThat(this.page.jobRoleFilter).isVisible(this.isVisibleOptions);
        this.page.logger.info("Job role filter label is visible");
        return this;
    }

    public assertThatInputTypeNumberIsDisplayed(): HrDataConfigurationAssertion {
        this.assertThat(this.page.inputTypeNumber).isVisible(this.isVisibleOptions);
        this.page.logger.info("Input type number is visible");
        return this;
    }

    public assertThatJobRoleFilterCorrectIsDisplayed(): HrDataConfigurationAssertion {
        this.assertThat(this.page.jobRoleFilterCorrect).isVisible(this.isVisibleOptions);
        this.page.logger.info("Correct job filter is visible");
        return this;
    }

    public assertThatJobRoleFilterIncorrectIsDisplayed(): HrDataConfigurationAssertion {
        try {
            this.assertThat(this.page.inputTypeNumber);
        } catch (e) {
            throw new RuntimeException(e);
        }
        this.page.logger.info("Incorrect job filter is not visible");
        return this;
    }

    public assertThatAssociationLabelIsDisplayed(associationLabel: string): HrDataConfigurationAssertion {
        this.assertThat(this.page.association(associationLabel)).isVisible(this.isVisibleOptions);
        this.page.logger.info("Association label is visible");
        return this;
    }

    public assertThatAssociationTypesLabelIsDisplayed(associationTypesLabel: string): HrDataConfigurationAssertion {
        this.assertThat(this.page.associationTypes(associationTypesLabel)).isVisible(this.isVisibleOptions);
        this.page.logger.info("Association label is visible");
        return this;
    }

    public assertThatVisibilityTypesLabelLoopIsDisplayed(visibilityTypesLabel: string, visibilityTypesLabel2: string): HrDataConfigurationAssertion {
        this.assertThat(this.page.visibilityTypesLoop(visibilityTypesLabel,visibilityTypesLabel2)).isVisible(this.isVisibleOptions);
        this.page.logger.info("Visibility label is visible");
        return this;
    }

    public assertThatVisibilityTypesLabelIsDisplayed(visibilityTypesLabel: string): HrDataConfigurationAssertion {
        this.assertThat(this.page.visibilityTypes(visibilityTypesLabel)).isVisible(this.isVisibleOptions);
        this.page.logger.info("Visibility label is visible");
        return this;
    }

    public assertThatSpecifyAssociationLabelIsDisplayed(): HrDataConfigurationAssertion {
        this.assertThat(this.page.specifyAssociation).isVisible(this.isVisibleOptions);
        this.page.logger.info("Specify association of organization unit type with label is visible");
        return this;
    }

    public assertThatVisibilityLabelIsDisplayed(): HrDataConfigurationAssertion {
        this.assertThat(this.page.visibility).isVisible(this.isVisibleOptions);
        this.page.logger.info("Visibility label is visible");
        return this;
    }

    public assertThatSpecifyVisibilityLabelIsDisplayed(): HrDataConfigurationAssertion {
        this.assertThat(this.page.specifyVisibility).isVisible(this.isVisibleOptions);
        this.page.logger.info("Specify visibility of organization unit type on label is visible");
        return this;
    }
    public assertThatSourcingColumnIsDisplayed(): HrDataConfigurationAssertion {
        this.assertThat(this.page.sourcingTable).isVisible(this.isVisibleOptions);
        this.page.logger.info("Sourcing table field is visible");
        return this;
    }
    public assertThatIndustryDropdownValuesAppearOnClick(): HrDataConfigurationAssertion {
        let expectedFirstThreeItems: Array<string> = Arrays.asList("Agriculture", "Construction", "Culture and Leisure");
        for (const expectedText of expectedFirstThreeItems) {
            this.assertThat(this.page.industryDropdownSelect(expectedText)).isVisible();
        }
        return this;
    }

}
