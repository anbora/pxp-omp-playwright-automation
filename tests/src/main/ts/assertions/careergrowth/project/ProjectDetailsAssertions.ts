// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { ProjectDetailsPage } from "pages/careergrowth/project/ProjectDetailsPage";
import { expect } from "common/testing/playwright";

export class ProjectDetailsAssertions extends BaseAssertion<ProjectDetailsPage> {

    public assertThatProjectDetailsPageLoads(projectTitle: string): ProjectDetailsAssertions {
        expect(this.page.projectTitleHeader).toBeVisible(this.isVisibleOptions);
        expect(this.page.applyButton).toBeVisible(this.isVisibleOptions);
        expect(this.page.projectMetaDetailsSection).toBeVisible(this.isVisibleOptions);
        expect(this.page.projectDescriptionHeader).toBeVisible(this.isVisibleOptions);
        expect(this.page.projectDetailsRightPanel).toBeVisible(this.isVisibleOptions);
        expect(this.page.projectOwnersList).toBeVisible(this.isVisibleOptions);
        expect(this.page.projectPublishedDate).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatProjectDetailsPageLoadsForOwner(projectTitle: string): ProjectDetailsAssertions {
        expect(this.page.projectTitleHeader).toBeVisible(this.isVisibleOptions);
        expect(this.page.projectMetaDetailsSection).toBeVisible(this.isVisibleOptions);
        expect(this.page.projectDescriptionHeader).toBeVisible(this.isVisibleOptions);
        expect(this.page.projectDetailsRightPanel).toBeVisible(this.isVisibleOptions);
        expect(this.page.projectOwnersList).toBeVisible(this.isVisibleOptions);
        expect(this.page.projectPublishedDate).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatProjectDetailsPageFieldsLoadsSkills(skillLevel: string, skillName: string): ProjectDetailsAssertions {
        expect(this.page.relatedSkillsHeader).toBeVisible(this.isVisibleOptions);
        expect(this.page.skillLevelAndName(skillLevel, skillName)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatRelatedJobRolesLoads(roleName: string): ProjectDetailsAssertions {
        expect(this.page.relatedJobRolesHeader).toBeVisible(this.isVisibleOptions);
        expect(this.page.relatedJobRolesCardTitle(roleName)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatDetailsPanelTextLoads(openingCount: string, startDateEndDate: string, timeCommitment: string, remotePossible: string, timeZoneName: string): ProjectDetailsAssertions {
        expect(this.page.projectDetailsRightPanelMetaDetails(openingCount)).toBeVisible(this.isVisibleOptions);
        expect(this.page.projectDetailsRightPanelMetaDetails(startDateEndDate)).toBeVisible(this.isVisibleOptions);
        expect(this.page.projectDetailsRightPanelMetaDetails(timeCommitment)).toBeVisible(this.isVisibleOptions);
        expect(this.page.projectDetailsRightPanelMetaDetails(remotePossible)).toBeVisible(this.isVisibleOptions);
       // expect(this.page.projectDetailsRightPanelSRTextOnly(locationName)).toBeVisible(this.isVisibleOptions);
        expect(this.page.projectDetailsRightPanelSRTextOnly(timeZoneName)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertWithdrawConfirmationModalDisplays(): ProjectDetailsAssertions {
        expect(this.page.withdrawConfirmationModal).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertProjectStatusTextDisplays(statusText: string): ProjectDetailsAssertions {
        expect(this.page.projectDetailsApplicantStatusText(statusText)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public appliedConfirmationModalDisplays(): ProjectDetailsAssertions {
        expect(this.page.appliedConfirmationModal).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public applyForALimitedOpeningProjectModalDisplays(): ProjectDetailsAssertions {
        expect(this.page.applyConfirmationModal).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public appliedToALimitedOpeningProjectModalDisplays(): ProjectDetailsAssertions {
        expect(this.page.applyToAProjectConfirmationModal).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public closeProjectModalDisplays(): ProjectDetailsAssertions {
        expect(this.page.closeProjectModal).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertToasterTextDisplays(toasterText: string): ProjectDetailsAssertions {
        expect(this.page.confirmationToaster(toasterText)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertWithdrawToasterTextDisplays(toasterText: string): ProjectDetailsAssertions {
        expect(this.page.withdrawConfirmationToaster(toasterText)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertCapacityFullTextIsDisplayed(): ProjectDetailsAssertions {
        expect(this.page.capacityFullText).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertCapacityFullTextIsNotDisplayed(): ProjectDetailsAssertions {
        expect(this.page.capacityFullText).not.toBeVisible(this.isNotVisibleOptions);
        return this;
    }

    public assertNotifyMeButtonIsDisplayed(): ProjectDetailsAssertions {
        expect(this.page.notifyMeButton).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertNotifyMeButtonIsNotDisplayed(): ProjectDetailsAssertions {
        expect(this.page.notifyMeButton).not.toBeVisible(this.isNotVisibleOptions);
        return this;
    }

    public assertApplyButtonIsDisabled(): ProjectDetailsAssertions {
        expect(this.page.applyButtonDisabled).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertSubscribedTextIsDisplayed(): ProjectDetailsAssertions {
        expect(this.page.subscribedText).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertProjectLocationDisplays(locationName: string): ProjectDetailsAssertions {
        expect(this.page.projectTitleHeader).toBeVisible(this.isVisibleOptions);
        expect(this.page.projectMetaDetailsSection).toBeVisible(this.isVisibleOptions);
        expect(this.page.projectLocationsText(locationName)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertOrgUnitTypeAndValueIsDisplayed(orgUnitType: string, orgUnitValue: string): ProjectDetailsAssertions {
        expect(this.page.orgUnitTypeFieldLabel(orgUnitType)).toBeVisible(this.isVisibleOptions);
        expect(this.page.projectDetailsRightPanelOrgDetails(orgUnitValue)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertManagerConsentCheckBoxIsDisplayed(): ProjectDetailsAssertions {
        expect(this.page.applyToALimitedOpeningProjectManagerConsentChkBox).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatLocationIsVisibleOnProjectDetails(): ProjectDetailsAssertions {
        expect(this.page.projectDetailsLocation).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatLocationIsNotVisibleOnProjectDetails(): ProjectDetailsAssertions {
        expect(this.page.projectDetailsLocation).toBeHidden();
        return this;
    }
}
