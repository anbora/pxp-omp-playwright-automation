// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { Assert } from "common/testing/runtime";
import { HrDataConfigurationPage } from "pages/admin/hrdata/configuration/HrDataConfigurationPage";
import { expect } from "common/testing/playwright";

export class HrDataConfigurationAssertion extends BaseAssertion<HrDataConfigurationPage> {

    public assertThatJobRoleConfigurationTitleIsDisplayed(): HrDataConfigurationAssertion {
        expect(this.page.jobRoleConfigurationTitle).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Job role configuration title is visible");
        return this;
    }

    public assertThatOrganizationConfigurationTabIsDisplayed(): HrDataConfigurationAssertion {
        expect(this.page.organizationConfigurationTitle).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Organization configuration title is visible");
        return this;
    }

    public assertThatOrganizationConfigurationIsDisplayed(): HrDataConfigurationAssertion {
        expect(this.page.organizationConfiguration).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Organization configuration is visible");
        return this;
    }

    public assertThatErrorMessageWhileSavingIsDisplayed(): HrDataConfigurationAssertion {
        expect(this.page.errorWhileSaving).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Successfully verified data. Error message is visible");
        return this;
    }

    public assertThatAutomaticallyAssignDetectedSkillsToJobRolesIsDisplayed(): HrDataConfigurationAssertion {
        expect(this.page.automaticallyAssignDetectedSkillsToJobRoles).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Automatically Assign Detected Skills To Job Roles is visible");
        return this;
    }

    public automaticallyAssignDetectedSkillsToJobRolesToggle(): HrDataConfigurationAssertion {
        expect(this.page.automaticallyAssignDetectedSkillsToJobRolesToggle).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Automatically Assign Detected Skills To Job Roles toggle is visible");
        return this;
    }

    public assertThatOverRideDetectedSkillsAssociatedForJobRoleUpdateIsDisplayed(): HrDataConfigurationAssertion {
        expect(this.page.overRideDetectedSkillsAssociatedForJobRoleUpdate).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Override detected skills associated for Job Role update is visible");
        return this;
    }

    public assertThatDetectedSkillLevelIsDisplayed(): HrDataConfigurationAssertion {
        expect(this.page.detectedSkillLevel).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Detected skill level is visible");
        return this;
    }

    public assertThatBeginnerLevelIsDisplayed(): HrDataConfigurationAssertion {
        expect(this.page.beginnerLevel).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Intermediate level is visible");
        return this;
    }

    public assertProficiencyLevels(expectedLevels: Set<string>): HrDataConfigurationAssertion {
        Assert.assertTrue(this.page.proficiencyLevels.allTextContents().containsAll(expectedLevels));
        Assert.assertTrue(this.page.proficiencyLevels.allInnerTexts().length == expectedLevels.length);
        return this;
    }

    public assertThatIntermediateLevelIsDisplayed(): HrDataConfigurationAssertion {
        expect(this.page.intermediateLevel).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Advance level is visible");
        return this;
    }

    public assertThatAdvanceLevelIsDisplayed(): HrDataConfigurationAssertion {
        expect(this.page.advanceLevel).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Advance level is visible");
        return this;
    }

    public assertThatMaximumNumberOfSkillsAssignedToJobRoleIsDisplayed(): HrDataConfigurationAssertion {
        expect(this.page.maximumNumberOfSkillsAssignedToJobRole).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Maximum number of skills assigned to job role Is visible");
        return this;
    }

    public assertThatAllowedRangeIsDisplayed(): HrDataConfigurationAssertion {
        expect(this.page.allowedRange).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Allowed range 1 to 50 Is visible");
        return this;
    }

    public assertThatAutomaticallyAssignDetectedNextRolesToJobRolesIsDisplayed(): HrDataConfigurationAssertion {
        expect(this.page.automaticallyAssignDetectedNextRolesToJobRoles).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Automatically assign detected next roles to job roles Is visible");
        return this;
    }

    public assertThatOverRideRecalculatedNextRolesAssociatedForJobRolesIsDisplayed(): HrDataConfigurationAssertion {
        expect(this.page.overRideRecalculatedNextRolesAssociatedForJobRoles).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Automatically assign detected next roles to job roles Is visible");
        return this;
    }

    public assertThatMaximumNumberOfNextRolesAssociatedToJobRoleIsDisplayed(): HrDataConfigurationAssertion {
        expect(this.page.maximumNumberOfNextRolesAssociatedToJobRole).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Maximum number of next roles associated to job role Is visible");
        return this;
    }

    public assertThatEnableCareerPathIsDisplayed(): HrDataConfigurationAssertion {
        expect(this.page.enableCareerPath).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Enable Career Path Is visible");
        return this;
    }

    public assertThatEnableOrganizationIsDisplayed(): HrDataConfigurationAssertion {
        expect(this.page.enableOrganization).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Enable organization Is visible");
        return this;
    }

    public assertThatUsageIsDisplayed(): HrDataConfigurationAssertion {
        expect(this.page.usage).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Usage Is visible");
        return this;
    }

    public assertThatOrganizationLevelValuesToBeDisplayedIsDisplayed(): HrDataConfigurationAssertion {
        expect(this.page.organizationLevelValuesToBeDisplayed).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Organization Level Values To Be Displayed Is visible");
        return this;
    }

    public assertThatOrganizationTypeDisplayedOnTheOpportunityCardIsDisplayed(): HrDataConfigurationAssertion {
        expect(this.page.organizationTypeDisplayedOnTheOpportunityCard).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Organization Type Displayed On The Opportunity Card Is visible");
        return this;
    }

    public assertThatLocationsConfigurationIsDisplayed(): HrDataConfigurationAssertion {
        expect(this.page.locationsConfiguration).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Locations Configuration Is visible");
        return this;
    }

    public assertThatJobRoleFilterLabelIsDisplayed(): HrDataConfigurationAssertion {
        expect(this.page.jobRoleFilter).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Job role filter label is visible");
        return this;
    }

    public assertThatInputTypeNumberIsDisplayed(): HrDataConfigurationAssertion {
        expect(this.page.inputTypeNumber).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Input type number is visible");
        return this;
    }

    public assertThatJobRoleFilterCorrectIsDisplayed(): HrDataConfigurationAssertion {
        expect(this.page.jobRoleFilterCorrect).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Correct job filter is visible");
        return this;
    }

    public assertThatJobRoleFilterIncorrectIsDisplayed(): HrDataConfigurationAssertion {
        expect(this.page.inputTypeNumber).toHaveValue(/\D+/);
        this.page.logger.info("Incorrect job filter value is displayed");
        return this;
    }

    public assertThatAssociationLabelIsDisplayed(associationLabel: string): HrDataConfigurationAssertion {
        expect(this.page.association(associationLabel)).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Association label is visible");
        return this;
    }

    public assertThatAssociationTypesLabelIsDisplayed(associationTypesLabel: string): HrDataConfigurationAssertion {
        expect(this.page.associationTypes(associationTypesLabel)).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Association label is visible");
        return this;
    }

    public assertThatVisibilityTypesLabelLoopIsDisplayed(visibilityTypesLabel: string, visibilityTypesLabel2: string): HrDataConfigurationAssertion {
        expect(this.page.visibilityTypesLoop(visibilityTypesLabel,visibilityTypesLabel2)).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Visibility label is visible");
        return this;
    }

    public assertThatVisibilityTypesLabelIsDisplayed(visibilityTypesLabel: string): HrDataConfigurationAssertion {
        expect(this.page.visibilityTypes(visibilityTypesLabel)).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Visibility label is visible");
        return this;
    }

    public assertThatSpecifyAssociationLabelIsDisplayed(): HrDataConfigurationAssertion {
        expect(this.page.specifyAssociation).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Specify association of organization unit type with label is visible");
        return this;
    }

    public assertThatVisibilityLabelIsDisplayed(): HrDataConfigurationAssertion {
        expect(this.page.visibility).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Visibility label is visible");
        return this;
    }

    public assertThatSpecifyVisibilityLabelIsDisplayed(): HrDataConfigurationAssertion {
        expect(this.page.specifyVisibility).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Specify visibility of organization unit type on label is visible");
        return this;
    }
    public assertThatSourcingColumnIsDisplayed(): HrDataConfigurationAssertion {
        expect(this.page.sourcingTable).toBeVisible(this.isVisibleOptions);
        this.page.logger.info("Sourcing table field is visible");
        return this;
    }
    public assertThatIndustryDropdownValuesAppearOnClick(): HrDataConfigurationAssertion {
        let expectedFirstThreeItems: Array<string> = Arrays.asList("Agriculture", "Construction", "Culture and Leisure");
        for (const expectedText of expectedFirstThreeItems) {
            expect(this.page.industryDropdownSelect(expectedText)).toBeVisible();
        }
        return this;
    }

}
