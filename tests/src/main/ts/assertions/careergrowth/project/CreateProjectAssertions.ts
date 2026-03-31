// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { CreateProjectPage } from "pages/careergrowth/project/CreateProjectPage";
import { expect } from "common/testing/playwright";

export class CreateProjectAssertions extends BaseAssertion<CreateProjectPage> {

    public assertThatCreateProjectPageLoadsProperly(): CreateProjectAssertions {
        expect(this.page.createProjectHeader).toBeVisible(this.isVisibleOptions);
        return this;
    }
    public assertThatProjectPageLoadsAllRequiredFields(): CreateProjectAssertions {
        expect(this.page.createProjectHeader).toBeVisible(this.isVisibleOptions);
        expect(this.page.projectTitle).toBeVisible(this.isVisibleOptions);
        expect(this.page.projectDescription).toBeVisible(this.isVisibleOptions);
        expect(this.page.projectThumbnail).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatRequiredFieldPromptIsDisplayed(errorMessage: string): CreateProjectAssertions {
        expect(this.page.errormessageRequiredField.first()).toContainText(errorMessage, this.containsTextOptions);
        return this;
    }

    public assertThatDuplicateProjectHeaderIsDisplayed(): CreateProjectAssertions {
        expect(this.page.createDuplicateProjectHeader).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatEditProjectHeaderIsDisplayed(): CreateProjectAssertions {
        expect(this.page.editProjectHeader).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatProjectTitleIsCopiedOver(projectTitle: string): CreateProjectAssertions {
        expect(this.page.projectTitleText(projectTitle)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatProjectDescIsCopiedOver(projectDesc: string): CreateProjectAssertions {
        expect(this.page.projectDescText(projectDesc)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatThumbnailIsCopiedOver(): CreateProjectAssertions {
        expect(this.page.replaceImageTxt).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertOwnerFieldIsCopiedOver(): CreateProjectAssertions {
        expect(this.page.projectOwnersCountTxt).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertDuplicateProjectTitleWarningIsDisplayed(): CreateProjectAssertions {
        expect(this.page.duplicateProjectTitleWarning).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertSuggestedSkillsHeaderIsDisplayed(): CreateProjectAssertions {
        expect(this.page.suggestedSkillsSection).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertSuggestedSkillsHeaderIsNotDisplayed(): CreateProjectAssertions {
        expect(this.page.suggestedSkillsSection).not.toBeVisible(this.isNotVisibleOptions);
        return this;
    }

    public assertSuggestedSkillIsDisplayed(skillName: string): CreateProjectAssertions {
        expect(this.page.selectASkillFromSuggestedSkillsSection(skillName)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertCloseProjectModalIsDisplayed(): CreateProjectAssertions {
        expect(this.page.closeProjectModal).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertTimeZonesFieldIsNotDisplayed(): CreateProjectAssertions {
        expect(this.page.searchTimeZonesText).not.toBeVisible(this.isNotVisibleOptions);
        return this;
    }
}
