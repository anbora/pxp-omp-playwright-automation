import { UploadResumeFileModalAssertions } from "assertions/careergrowth/project/UploadResumeFileModalAssertions";
import { LandingPageAssertions } from "assertions/landing/LandingPageAssertions";
import { BaseAssertion } from "common/BaseAssertion";
import { LocatorAssertions } from "common/testing/playwright";
import { assertThat } from "common/testing/playwrightAssertions";
import { ExperienceCareerProfileModalPage } from "pages/careergrowth/profiles/ExperienceCareerProfileModalPage";

export class ExperienceCareerProfileModalAssertions extends BaseAssertion<ExperienceCareerProfileModalPage> {

    public assertThatTextInWorkHistoryLineIsAdded(text: string): ExperienceCareerProfileModalAssertions {
        this.assertThat(this.page.workHistoryLineLabel(text).first()).isVisible(this.isVisibleOptions);
//        this.page.workHistoryLine(text).should('exist')
        return this;
    }

	public assertThatTextInWorkHistoryNotExists(text: string): ExperienceCareerProfileModalAssertions {
        this.assertThat(this.page.workHistoryLineLabel(text).first()).not().isVisible(this.isNotVisibleOptions);
//        this.page.workHistoryLine(text).should('not.exist')
        return this;
    }

	public assertThatWorkHistoryContainsPositionTitle(position: string): ExperienceCareerProfileModalAssertions {
        this.assertThat(this.page.positionTitleInput).hasValue(position, this.hasValueOptions);
//        this.page.positionTitle().should('contain.value', position)
        return this;
    }

	public assertThatWorkHistoryContainsCompanyName(company: string): ExperienceCareerProfileModalAssertions {
        this.assertThat(this.page.companyNameInput).hasValue(company,this.hasValueOptions);
        return this;
    }

	public assertThatWorkHistoryContainsDescription(description: string): ExperienceCareerProfileModalAssertions {
        this.assertThat(this.page.descriptionTextarea).containsText(description, this.containsTextOptions);
//        this.page.description().should('contain.value', description)
        return this;
    }

    public assertThatDateWarningMessagesExist(): ExperienceCareerProfileModalAssertions {
        this.assertThat(this.page.dateWarningMessages.first()).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatTitleWarningMessageExist(): ExperienceCareerProfileModalAssertions {
        this.assertThat(this.page.titleWarningMessage.first()).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatCompanyNameWarningMessageExist(): ExperienceCareerProfileModalAssertions {
        this.assertThat(this.page.companyNameWarningMessage.first()).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatUnsavedHistoryWarningMessageIsDisplayed(): ExperienceCareerProfileModalAssertions {
        this.assertThat(this.page.unsavedHistoryWarningMessage.first()).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatDescriptionWarningMessageExists(): ExperienceCareerProfileModalAssertions {
        this.assertThat(this.page.descriptionWarningMessage.first()).isVisible(this.isVisibleOptions);
        return this;
    }

	public assertThatWorkHistoryContainsLabelWithPositionTitle(position: string): ExperienceCareerProfileModalAssertions {
        this.assertThat(this.page.positionTitleLabel).containsText(position, this.containsTextOptions);
//        this.page.positionTitleLabel.should('contain.value', position)
        return this;
    }

	public assertThatWorkHistoryCompanyLabelIsEqualTo(position: string, company: string): ExperienceCareerProfileModalAssertions {
        this.assertThat(this.page.companyNameLabel(position)).containsText(company, this.containsTextOptions);
        return this;
    }

	public assertThatWorkHistoryPeriodForPositionIsEqualTo(position: string, period: string): ExperienceCareerProfileModalAssertions {
        this.assertThat(this.page.workHistoryPeriodLabel(position)).containsText(period, this.containsTextOptions);
        return this;
    }

	public assertThatGoToPreferencesButtonExists(): ExperienceCareerProfileModalAssertions {
        this.assertThat(this.page.goToPreferencesButton).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertWarningText(expectedWarning: string): ExperienceCareerProfileModalAssertions {
        this.assertThat(this.page.warning).hasText(expectedWarning);
        return this;
    }

    public assertThatStepContainsDescription(description: string, descriptionCont: string): ExperienceCareerProfileModalAssertions {
        this.assertThat(this.page.stepDescriptionLabel).containsText(description, this.containsTextOptions);
        this.assertThat(this.page.stepDescriptionContLabel).containsText(descriptionCont, this.containsTextOptions);
        return this;
    }

    public assertThatRecommendationInformationContainsDescription(description: string, descriptionCont: string): ExperienceCareerProfileModalAssertions {
        this.assertThat(this.page.recommendationInformationLabel).containsText(description, this.containsTextOptions);
        this.assertThat(this.page.recommendationInformationContLabel).containsText(descriptionCont, this.containsTextOptions);
        return this;
    }

    public assertCompleteYourProfileModalHeaderIsDisplayed(): ExperienceCareerProfileModalAssertions {
        this.assertThat(this.page.completeYourProfileModalHeader()).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertCompleteYourProfileProgressCount(progressPercentage: string): ExperienceCareerProfileModalAssertions {
        this.assertThat(this.page.completeYourProfileModalProgressCount(progressPercentage)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatSaveAndContinueIsDisplayed(): ExperienceCareerProfileModalAssertions {
        this.assertThat(this.page.saveAndContinue()).isVisible(this.isVisibleOptions);
        return this;
    }
}
