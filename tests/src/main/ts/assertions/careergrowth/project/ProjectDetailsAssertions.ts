import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { ProjectDetailsPage } from "pages/careergrowth/project/ProjectDetailsPage";

export class ProjectDetailsAssertions extends BaseAssertion<ProjectDetailsPage> {

    public assertThatProjectDetailsPageLoads(projectTitle: string): ProjectDetailsAssertions {
        this.assertThat(this.page.projectTitleHeader).isVisible(this.isVisibleOptions);
        this.assertThat(this.page.applyButton).isVisible(this.isVisibleOptions);
        this.assertThat(this.page.projectMetaDetailsSection).isVisible(this.isVisibleOptions);
        this.assertThat(this.page.projectDescriptionHeader).isVisible(this.isVisibleOptions);
        this.assertThat(this.page.projectDetailsRightPanel).isVisible(this.isVisibleOptions);
        this.assertThat(this.page.projectOwnersList).isVisible(this.isVisibleOptions);
        this.assertThat(this.page.projectPublishedDate).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatProjectDetailsPageLoadsForOwner(projectTitle: string): ProjectDetailsAssertions {
        this.assertThat(this.page.projectTitleHeader).isVisible(this.isVisibleOptions);
        this.assertThat(this.page.projectMetaDetailsSection).isVisible(this.isVisibleOptions);
        this.assertThat(this.page.projectDescriptionHeader).isVisible(this.isVisibleOptions);
        this.assertThat(this.page.projectDetailsRightPanel).isVisible(this.isVisibleOptions);
        this.assertThat(this.page.projectOwnersList).isVisible(this.isVisibleOptions);
        this.assertThat(this.page.projectPublishedDate).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatProjectDetailsPageFieldsLoadsSkills(skillLevel: string, skillName: string): ProjectDetailsAssertions {
        this.assertThat(this.page.relatedSkillsHeader).isVisible(this.isVisibleOptions);
        this.assertThat(this.page.skillLevelAndName(skillLevel, skillName)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatRelatedJobRolesLoads(roleName: string): ProjectDetailsAssertions {
        this.assertThat(this.page.relatedJobRolesHeader).isVisible(this.isVisibleOptions);
        this.assertThat(this.page.relatedJobRolesCardTitle(roleName)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatDetailsPanelTextLoads(openingCount: string, startDateEndDate: string, timeCommitment: string, remotePossible: string, timeZoneName: string): ProjectDetailsAssertions {
        this.assertThat(this.page.projectDetailsRightPanelMetaDetails(openingCount)).isVisible(this.isVisibleOptions);
        this.assertThat(this.page.projectDetailsRightPanelMetaDetails(startDateEndDate)).isVisible(this.isVisibleOptions);
        this.assertThat(this.page.projectDetailsRightPanelMetaDetails(timeCommitment)).isVisible(this.isVisibleOptions);
        this.assertThat(this.page.projectDetailsRightPanelMetaDetails(remotePossible)).isVisible(this.isVisibleOptions);
       // assertThat(this.page.projectDetailsRightPanelSRTextOnly(locationName)).isVisible(this.isVisibleOptions);
        this.assertThat(this.page.projectDetailsRightPanelSRTextOnly(timeZoneName)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertWithdrawConfirmationModalDisplays(): ProjectDetailsAssertions {
        this.assertThat(this.page.withdrawConfirmationModal).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertProjectStatusTextDisplays(statusText: string): ProjectDetailsAssertions {
        this.assertThat(this.page.projectDetailsApplicantStatusText(statusText)).isVisible(this.isVisibleOptions);
        return this;
    }

    public appliedConfirmationModalDisplays(): ProjectDetailsAssertions {
        this.assertThat(this.page.appliedConfirmationModal).isVisible(this.isVisibleOptions);
        return this;
    }

    public applyForALimitedOpeningProjectModalDisplays(): ProjectDetailsAssertions {
        this.assertThat(this.page.applyConfirmationModal).isVisible(this.isVisibleOptions);
        return this;
    }

    public appliedToALimitedOpeningProjectModalDisplays(): ProjectDetailsAssertions {
        this.assertThat(this.page.applyToAProjectConfirmationModal).isVisible(this.isVisibleOptions);
        return this;
    }

    public closeProjectModalDisplays(): ProjectDetailsAssertions {
        this.assertThat(this.page.closeProjectModal).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertToasterTextDisplays(toasterText: string): ProjectDetailsAssertions {
        this.assertThat(this.page.confirmationToaster(toasterText)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertWithdrawToasterTextDisplays(toasterText: string): ProjectDetailsAssertions {
        this.assertThat(this.page.withdrawConfirmationToaster(toasterText)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertCapacityFullTextIsDisplayed(): ProjectDetailsAssertions {
        this.assertThat(this.page.capacityFullText).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertCapacityFullTextIsNotDisplayed(): ProjectDetailsAssertions {
        this.assertThat(this.page.capacityFullText).not().isVisible(this.isNotVisibleOptions);
        return this;
    }

    public assertNotifyMeButtonIsDisplayed(): ProjectDetailsAssertions {
        this.assertThat(this.page.notifyMeButton).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertNotifyMeButtonIsNotDisplayed(): ProjectDetailsAssertions {
        this.assertThat(this.page.notifyMeButton).not().isVisible(this.isNotVisibleOptions);
        return this;
    }

    public assertApplyButtonIsDisabled(): ProjectDetailsAssertions {
        this.assertThat(this.page.applyButtonDisabled).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertSubscribedTextIsDisplayed(): ProjectDetailsAssertions {
        this.assertThat(this.page.subscribedText).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertProjectLocationDisplays(locationName: string): ProjectDetailsAssertions {
        this.assertThat(this.page.projectTitleHeader).isVisible(this.isVisibleOptions);
        this.assertThat(this.page.projectMetaDetailsSection).isVisible(this.isVisibleOptions);
        this.assertThat(this.page.projectLocationsText(locationName)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertOrgUnitTypeAndValueIsDisplayed(orgUnitType: string, orgUnitValue: string): ProjectDetailsAssertions {
        this.assertThat(this.page.orgUnitTypeFieldLabel(orgUnitType)).isVisible(this.isVisibleOptions);
        this.assertThat(this.page.projectDetailsRightPanelOrgDetails(orgUnitValue)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertManagerConsentCheckBoxIsDisplayed(): ProjectDetailsAssertions {
        this.assertThat(this.page.applyToALimitedOpeningProjectManagerConsentChkBox).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatLocationIsVisibleOnProjectDetails(): ProjectDetailsAssertions {
        this.assertThat(this.page.projectDetailsLocation).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatLocationIsNotVisibleOnProjectDetails(): ProjectDetailsAssertions {
        this.assertThat(this.page.projectDetailsLocation).isHidden();
        return this;
    }
}
