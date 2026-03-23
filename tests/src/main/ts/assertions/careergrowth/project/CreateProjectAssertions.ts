import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { CreateProjectPage } from "pages/careergrowth/project/CreateProjectPage";

export class CreateProjectAssertions extends BaseAssertion<CreateProjectPage> {

    public assertThatCreateProjectPageLoadsProperly(): CreateProjectAssertions {
        this.assertThat(this.page.createProjectHeader).isVisible(this.isVisibleOptions);
        return this;
    }
    public assertThatProjectPageLoadsAllRequiredFields(): CreateProjectAssertions {
        this.assertThat(this.page.createProjectHeader).isVisible(this.isVisibleOptions);
        this.assertThat(this.page.projectTitle).isVisible(this.isVisibleOptions);
        this.assertThat(this.page.projectDescription).isVisible(this.isVisibleOptions);
        this.assertThat(this.page.projectThumbnail).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatRequiredFieldPromptIsDisplayed(errorMessage: string): CreateProjectAssertions {
        this.assertThat(this.page.errormessageRequiredField.first()).containsText(errorMessage, this.containsTextOptions);
        return this;
    }

    public assertThatDuplicateProjectHeaderIsDisplayed(): CreateProjectAssertions {
        this.assertThat(this.page.createDuplicateProjectHeader).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatEditProjectHeaderIsDisplayed(): CreateProjectAssertions {
        this.assertThat(this.page.editProjectHeader).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatProjectTitleIsCopiedOver(projectTitle: string): CreateProjectAssertions {
        this.assertThat(this.page.projectTitleText(projectTitle)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatProjectDescIsCopiedOver(projectDesc: string): CreateProjectAssertions {
        this.assertThat(this.page.projectDescText(projectDesc)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatThumbnailIsCopiedOver(): CreateProjectAssertions {
        this.assertThat(this.page.replaceImageTxt).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertOwnerFieldIsCopiedOver(): CreateProjectAssertions {
        this.assertThat(this.page.projectOwnersCountTxt).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertDuplicateProjectTitleWarningIsDisplayed(): CreateProjectAssertions {
        this.assertThat(this.page.duplicateProjectTitleWarning).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertSuggestedSkillsHeaderIsDisplayed(): CreateProjectAssertions {
        this.assertThat(this.page.suggestedSkillsSection).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertSuggestedSkillsHeaderIsNotDisplayed(): CreateProjectAssertions {
        this.assertThat(this.page.suggestedSkillsSection).not().isVisible(this.isNotVisibleOptions);
        return this;
    }

    public assertSuggestedSkillIsDisplayed(skillName: string): CreateProjectAssertions {
        this.assertThat(this.page.selectASkillFromSuggestedSkillsSection(skillName)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertCloseProjectModalIsDisplayed(): CreateProjectAssertions {
        this.assertThat(this.page.closeProjectModal).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertTimeZonesFieldIsNotDisplayed(): CreateProjectAssertions {
        this.assertThat(this.page.searchTimeZonesText).not().isVisible(this.isNotVisibleOptions);
        return this;
    }
}
