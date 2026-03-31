// @ts-nocheck
import { UploadResumeFileModalAssertions } from "assertions/careergrowth/project/UploadResumeFileModalAssertions";
import { LandingPageAssertions } from "assertions/landing/LandingPageAssertions";
import { BaseAssertion } from "common/BaseAssertion";
import { expect } from "common/testing/playwright";
import { ExperienceCareerProfileModalPage } from "pages/careergrowth/profiles/ExperienceCareerProfileModalPage";

export class ExperienceCareerProfileModalAssertions extends BaseAssertion<ExperienceCareerProfileModalPage> {

    public assertThatTextInWorkHistoryLineIsAdded(text: string): ExperienceCareerProfileModalAssertions {
        expect(this.page.workHistoryLineLabel(text).first()).toBeVisible(this.isVisibleOptions);
//        this.page.workHistoryLine(text).should('exist')
        return this;
    }

	public assertThatTextInWorkHistoryNotExists(text: string): ExperienceCareerProfileModalAssertions {
        expect(this.page.workHistoryLineLabel(text).first()).not.toBeVisible(this.isNotVisibleOptions);
//        this.page.workHistoryLine(text).should('not.exist')
        return this;
    }

	public assertThatWorkHistoryContainsPositionTitle(position: string): ExperienceCareerProfileModalAssertions {
        expect(this.page.positionTitleInput).toHaveValue(position, this.hasValueOptions);
//        this.page.positionTitle().should('contain.value', position)
        return this;
    }

	public assertThatWorkHistoryContainsCompanyName(company: string): ExperienceCareerProfileModalAssertions {
        expect(this.page.companyNameInput).toHaveValue(company,this.hasValueOptions);
        return this;
    }

	public assertThatWorkHistoryContainsDescription(description: string): ExperienceCareerProfileModalAssertions {
        expect(this.page.descriptionTextarea).toContainText(description, this.containsTextOptions);
//        this.page.description().should('contain.value', description)
        return this;
    }

    public assertThatDateWarningMessagesExist(): ExperienceCareerProfileModalAssertions {
        expect(this.page.dateWarningMessages.first()).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatTitleWarningMessageExist(): ExperienceCareerProfileModalAssertions {
        expect(this.page.titleWarningMessage.first()).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatCompanyNameWarningMessageExist(): ExperienceCareerProfileModalAssertions {
        expect(this.page.companyNameWarningMessage.first()).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatUnsavedHistoryWarningMessageIsDisplayed(): ExperienceCareerProfileModalAssertions {
        expect(this.page.unsavedHistoryWarningMessage.first()).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatDescriptionWarningMessageExists(): ExperienceCareerProfileModalAssertions {
        expect(this.page.descriptionWarningMessage.first()).toBeVisible(this.isVisibleOptions);
        return this;
    }

	public assertThatWorkHistoryContainsLabelWithPositionTitle(position: string): ExperienceCareerProfileModalAssertions {
        expect(this.page.positionTitleLabel).toContainText(position, this.containsTextOptions);
//        this.page.positionTitleLabel.should('contain.value', position)
        return this;
    }

	public assertThatWorkHistoryCompanyLabelIsEqualTo(position: string, company: string): ExperienceCareerProfileModalAssertions {
        expect(this.page.companyNameLabel(position)).toContainText(company, this.containsTextOptions);
        return this;
    }

	public assertThatWorkHistoryPeriodForPositionIsEqualTo(position: string, period: string): ExperienceCareerProfileModalAssertions {
        expect(this.page.workHistoryPeriodLabel(position)).toContainText(period, this.containsTextOptions);
        return this;
    }

	public assertThatGoToPreferencesButtonExists(): ExperienceCareerProfileModalAssertions {
        expect(this.page.goToPreferencesButton).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertWarningText(expectedWarning: string): ExperienceCareerProfileModalAssertions {
        expect(this.page.warning).toHaveText(expectedWarning);
        return this;
    }

    public assertThatStepContainsDescription(description: string, descriptionCont: string): ExperienceCareerProfileModalAssertions {
        expect(this.page.stepDescriptionLabel).toContainText(description, this.containsTextOptions);
        expect(this.page.stepDescriptionContLabel).toContainText(descriptionCont, this.containsTextOptions);
        return this;
    }

    public assertThatRecommendationInformationContainsDescription(description: string, descriptionCont: string): ExperienceCareerProfileModalAssertions {
        expect(this.page.recommendationInformationLabel).toContainText(description, this.containsTextOptions);
        expect(this.page.recommendationInformationContLabel).toContainText(descriptionCont, this.containsTextOptions);
        return this;
    }

    public assertCompleteYourProfileModalHeaderIsDisplayed(): ExperienceCareerProfileModalAssertions {
        expect(this.page.completeYourProfileModalHeader()).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertCompleteYourProfileProgressCount(progressPercentage: string): ExperienceCareerProfileModalAssertions {
        expect(this.page.completeYourProfileModalProgressCount(progressPercentage)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatSaveAndContinueIsDisplayed(): ExperienceCareerProfileModalAssertions {
        expect(this.page.saveAndContinue()).toBeVisible(this.isVisibleOptions);
        return this;
    }
}
