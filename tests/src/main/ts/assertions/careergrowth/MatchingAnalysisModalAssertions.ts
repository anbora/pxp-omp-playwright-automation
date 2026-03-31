// @ts-nocheck
import { RoleDetailsAssertions } from "assertions/careergrowth/roles/RoleDetailsAssertions";
import { BaseAssertion } from "common/BaseAssertion";
import { MatchingAnalysisModalPage } from "pages/careergrowth/MatchingAnalysisModalPage";
import { expect } from "common/testing/playwright";

export class MatchingAnalysisModalAssertions extends BaseAssertion<MatchingAnalysisModalPage> {

    public assertThatHeaderIsEqualTo(header: string): MatchingAnalysisModalAssertions {
        expect(this.page.matchModalHeader).toContainText(header, this.containsTextOptions);
        return this;
    }

    public assertThatTabIsDisplayed(title: string): MatchingAnalysisModalAssertions {
        expect(this.page.matchModalTabTitle(title)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatTabIsActive(tabName: string): MatchingAnalysisModalAssertions {
        expect(this.page.matchModalTab(tabName)).toHaveClass("ed-progress-tab active");
        return this;
    }

    public assertThatOverallMatchIsEqualTo(overallMatch: string): MatchingAnalysisModalAssertions {
        expect(this.page.matchModalDescription).toContainText(overallMatch, this.containsTextOptions);
        return this;
    }

    public assertThatOverallMatchLabelForFairAndLowMatchIsEqualTo(opportunityType: string, overallMatch: string): MatchingAnalysisModalAssertions {
        expect(this.page.matchModalDescription).toContainText("This " + opportunityType + " seems to be a " + overallMatch + " match.", this.containsTextOptions);
        return this;
    }

    public assertThatTabDescriptionIsEqualTo(tabName: string, description: string): MatchingAnalysisModalAssertions {
        expect(this.page.matchModalTabDescription(tabName)).toContainText(description, this.containsTextOptions);
        return this;
    }

    public assertThatNoDataDescriptionIsEqualTo(description: string): MatchingAnalysisModalAssertions {
        expect(this.page.noDataContainerDescription).toContainText(description, this.containsTextOptions);
        return this;
    }

    public assertThatNoDataLabelIsNotDisplayed(): MatchingAnalysisModalAssertions {
        expect(this.page.noDataContainerDescription).toBeHidden();
        return this;
    }

    public assertThatCrossIconIsDisplayedForTab(tabName: string): MatchingAnalysisModalAssertions {
        expect(this.page.matchModalTabIcon(tabName)).toHaveClass("progress-tab-icon primary-color icon-cross-circle");
        return this;
    }

    public assertThatQuestionMarkIconIsDisplayedForTab(tabName: string): MatchingAnalysisModalAssertions {
        expect(this.page.matchModalTabIcon(tabName)).toHaveClass("progress-tab-icon primary-color icon-question-circle");
        return this;
    }

    public assertThatTickIconIsDisplayedForTab(tabName: string): MatchingAnalysisModalAssertions {
        expect(this.page.matchModalTabIcon(tabName)).toHaveClass("progress-tab-icon primary-color icon-check");
        return this;
    }

    public assertThatCrossStatusIconIsDisplayedForSkill(skillName: string): MatchingAnalysisModalAssertions {
        expect(this.page.skillStatusIcon(skillName)).toHaveClass("card-icon icon-cross-circle");
        return this;
    }

    public assertThatQuestionMarkStatusIconIsDisplayedForSkill(skillName: string): MatchingAnalysisModalAssertions {
        expect(this.page.skillStatusIcon(skillName)).toHaveClass("card-icon icon-question-circle");
        return this;
    }

    public assertThatTickStatusIconIsDisplayedForSkill(skillName: string): MatchingAnalysisModalAssertions {
        expect(this.page.skillStatusIcon(skillName)).toHaveClass("card-icon icon-check");
        return this;
    }

    public assertThatOnTargetStatusIsDisplayedForSkill(skillName: string): MatchingAnalysisModalAssertions {
        expect(this.page.skillStatusLabel(skillName)).toContainText("On target", this.containsTextOptions);
        return this;
    }

    public assertThatOffTargetStatusIsDisplayedForSkill(skillName: string): MatchingAnalysisModalAssertions {
        expect(this.page.skillStatusLabel(skillName)).toContainText("Off target", this.containsTextOptions);
        return this;
    }

    public assertThatYourLevelForSkillIsEqualTo(skillName: string, level: string): MatchingAnalysisModalAssertions {
        expect(this.page.skillYourLevelLabel(skillName)).toContainText(level, this.containsTextOptions);
        return this;
    }

    public assertThatTargetLevelForSkillIsEqualTo(skillName: string, level: string): MatchingAnalysisModalAssertions {
        expect(this.page.skillTargetLevelLabel(skillName)).toContainText(level, this.containsTextOptions);
        return this;
    }

    public assertThatUpdateButtonLabelIsEqualTo(label: string): MatchingAnalysisModalAssertions {
        expect(this.page.updateButton).toContainText(label, this.containsTextOptions);
        return this;
    }

    public assertThatPreferenceTypeIsEqualTo(preferenceName: string, option: string): MatchingAnalysisModalAssertions {
        expect(this.page.preference(preferenceName)).toContainText(option, this.containsTextOptions);
        return this;
    }

    public assertThatPreferenceTypeStatusIsEqualTo(preferenceName: string, status: string): MatchingAnalysisModalAssertions {
        expect(this.page.preferenceStatus(preferenceName)).toContainText(status, this.containsTextOptions);
        return this;
    }

    public assertThatExperienceDescriptionIsEqualTo(description: string): MatchingAnalysisModalAssertions {
        expect(this.page.experienceDescription).toContainText(description, this.containsTextOptions);
        return this;
    }

    public assertThatExperienceStatusIsEqualTo(status: string): MatchingAnalysisModalAssertions {
        expect(this.page.experienceStatus).toContainText(status, this.containsTextOptions);
        return this;
    }

    public assertThatTickStatusIconIsDisplayedForExperience(): MatchingAnalysisModalAssertions {
        expect(this.page.experienceStatusIcon).toHaveClass("card-icon icon-check");
        return this;
    }
    public assertNumberOfPossessedSkillsInComparisonToAllRequired(userCurrentNumberOfSkills: number, jobTotalNumberOfSkills: number): MatchingAnalysisModalAssertions {
        expect(this.page.numberOfPossessedSkills).toHaveText(String.format("%d of %d skills match your profile", userCurrentNumberOfSkills, jobTotalNumberOfSkills));
        return this;
    }

    public assertNumberOfPossessedSkills(userCurrentNumberOfSkills: number): MatchingAnalysisModalAssertions {
        expect(this.page.numberOfPossessedSkills).toContainText(String.format("%d of", userCurrentNumberOfSkills));
        return this;
    }
}
