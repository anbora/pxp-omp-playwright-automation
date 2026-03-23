import { RoleDetailsAssertions } from "assertions/careergrowth/roles/RoleDetailsAssertions";
import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { MatchingAnalysisModalPage } from "pages/careergrowth/MatchingAnalysisModalPage";

export class MatchingAnalysisModalAssertions extends BaseAssertion<MatchingAnalysisModalPage> {

    public assertThatHeaderIsEqualTo(header: string): MatchingAnalysisModalAssertions {
        this.assertThat(this.page.matchModalHeader).containsText(header, this.containsTextOptions);
        return this;
    }

    public assertThatTabIsDisplayed(title: string): MatchingAnalysisModalAssertions {
        this.assertThat(this.page.matchModalTabTitle(title)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatTabIsActive(tabName: string): MatchingAnalysisModalAssertions {
        this.assertThat(this.page.matchModalTab(tabName)).hasClass("ed-progress-tab active");
        return this;
    }

    public assertThatOverallMatchIsEqualTo(overallMatch: string): MatchingAnalysisModalAssertions {
        this.assertThat(this.page.matchModalDescription).containsText(overallMatch, this.containsTextOptions);
        return this;
    }

    public assertThatOverallMatchLabelForFairAndLowMatchIsEqualTo(opportunityType: string, overallMatch: string): MatchingAnalysisModalAssertions {
        this.assertThat(this.page.matchModalDescription).containsText("This " + opportunityType + " seems to be a " + overallMatch + " match.", this.containsTextOptions);
        return this;
    }

    public assertThatTabDescriptionIsEqualTo(tabName: string, description: string): MatchingAnalysisModalAssertions {
        this.assertThat(this.page.matchModalTabDescription(tabName)).containsText(description, this.containsTextOptions);
        return this;
    }

    public assertThatNoDataDescriptionIsEqualTo(description: string): MatchingAnalysisModalAssertions {
        this.assertThat(this.page.noDataContainerDescription).containsText(description, this.containsTextOptions);
        return this;
    }

    public assertThatNoDataLabelIsNotDisplayed(): MatchingAnalysisModalAssertions {
        this.assertThat(this.page.noDataContainerDescription).isHidden();
        return this;
    }

    public assertThatCrossIconIsDisplayedForTab(tabName: string): MatchingAnalysisModalAssertions {
        this.assertThat(this.page.matchModalTabIcon(tabName)).hasClass("progress-tab-icon primary-color icon-cross-circle");
        return this;
    }

    public assertThatQuestionMarkIconIsDisplayedForTab(tabName: string): MatchingAnalysisModalAssertions {
        this.assertThat(this.page.matchModalTabIcon(tabName)).hasClass("progress-tab-icon primary-color icon-question-circle");
        return this;
    }

    public assertThatTickIconIsDisplayedForTab(tabName: string): MatchingAnalysisModalAssertions {
        this.assertThat(this.page.matchModalTabIcon(tabName)).hasClass("progress-tab-icon primary-color icon-check");
        return this;
    }

    public assertThatCrossStatusIconIsDisplayedForSkill(skillName: string): MatchingAnalysisModalAssertions {
        this.assertThat(this.page.skillStatusIcon(skillName)).hasClass("card-icon icon-cross-circle");
        return this;
    }

    public assertThatQuestionMarkStatusIconIsDisplayedForSkill(skillName: string): MatchingAnalysisModalAssertions {
        this.assertThat(this.page.skillStatusIcon(skillName)).hasClass("card-icon icon-question-circle");
        return this;
    }

    public assertThatTickStatusIconIsDisplayedForSkill(skillName: string): MatchingAnalysisModalAssertions {
        this.assertThat(this.page.skillStatusIcon(skillName)).hasClass("card-icon icon-check");
        return this;
    }

    public assertThatOnTargetStatusIsDisplayedForSkill(skillName: string): MatchingAnalysisModalAssertions {
        this.assertThat(this.page.skillStatusLabel(skillName)).containsText("On target", this.containsTextOptions);
        return this;
    }

    public assertThatOffTargetStatusIsDisplayedForSkill(skillName: string): MatchingAnalysisModalAssertions {
        this.assertThat(this.page.skillStatusLabel(skillName)).containsText("Off target", this.containsTextOptions);
        return this;
    }

    public assertThatYourLevelForSkillIsEqualTo(skillName: string, level: string): MatchingAnalysisModalAssertions {
        this.assertThat(this.page.skillYourLevelLabel(skillName)).containsText(level, this.containsTextOptions);
        return this;
    }

    public assertThatTargetLevelForSkillIsEqualTo(skillName: string, level: string): MatchingAnalysisModalAssertions {
        this.assertThat(this.page.skillTargetLevelLabel(skillName)).containsText(level, this.containsTextOptions);
        return this;
    }

    public assertThatUpdateButtonLabelIsEqualTo(label: string): MatchingAnalysisModalAssertions {
        this.assertThat(this.page.updateButton).containsText(label, this.containsTextOptions);
        return this;
    }

    public assertThatPreferenceTypeIsEqualTo(preferenceName: string, option: string): MatchingAnalysisModalAssertions {
        this.assertThat(this.page.preference(preferenceName)).containsText(option, this.containsTextOptions);
        return this;
    }

    public assertThatPreferenceTypeStatusIsEqualTo(preferenceName: string, status: string): MatchingAnalysisModalAssertions {
        this.assertThat(this.page.preferenceStatus(preferenceName)).containsText(status, this.containsTextOptions);
        return this;
    }

    public assertThatExperienceDescriptionIsEqualTo(description: string): MatchingAnalysisModalAssertions {
        this.assertThat(this.page.experienceDescription).containsText(description, this.containsTextOptions);
        return this;
    }

    public assertThatExperienceStatusIsEqualTo(status: string): MatchingAnalysisModalAssertions {
        this.assertThat(this.page.experienceStatus).containsText(status, this.containsTextOptions);
        return this;
    }

    public assertThatTickStatusIconIsDisplayedForExperience(): MatchingAnalysisModalAssertions {
        this.assertThat(this.page.experienceStatusIcon).hasClass("card-icon icon-check");
        return this;
    }
    public assertNumberOfPossessedSkillsInComparisonToAllRequired(userCurrentNumberOfSkills: number, jobTotalNumberOfSkills: number): MatchingAnalysisModalAssertions {
        this.assertThat(this.page.numberOfPossessedSkills).hasText(String.format("%d of %d skills match your profile", userCurrentNumberOfSkills, jobTotalNumberOfSkills));
        return this;
    }

    public assertNumberOfPossessedSkills(userCurrentNumberOfSkills: number): MatchingAnalysisModalAssertions {
        this.assertThat(this.page.numberOfPossessedSkills).containsText(String.format("%d of", userCurrentNumberOfSkills));
        return this;
    }
}
