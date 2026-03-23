import { BaseAssertion } from "common/BaseAssertion";
import { assertThat } from "common/testing/playwrightAssertions";
import { Assert } from "common/testing/runtime";
import { EditJobVacancyPage } from "pages/careergrowth/jobs/EditJobVacancyPage";

export class EditJobVacancyAssertions extends BaseAssertion<EditJobVacancyPage> {
    private static readonly BEGINNER: number = 1;
    private static readonly INTERMEDIATE: number = 2;
    private static readonly ADVANCED: number = 3;
    public static readonly SKILL_XPATH: string = "//div[contains(@class, 'ed-multi-select__multi-value__label')][text()='%s']";

    public assertThatSkillSectionIsEmpty(): EditJobVacancyAssertions {
        this.assertThat(this.page.emptySkillInput).isVisible(this.isVisibleOptions);
//        this.page.emptySkillInput().should('exist')
        return this;
    }

    public assertThatBeginnerSkillSectionIsEmpty(): EditJobVacancyAssertions {
        this.assertThat(this.page.skillContainer(EditJobVacancyAssertions.BEGINNER).locator(this.page.emptySkillInput_SkillLevel)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatIntermediateSkillSectionIsEmpty(): EditJobVacancyAssertions {
        this.assertThat(this.page.skillContainer(EditJobVacancyAssertions.INTERMEDIATE).locator(this.page.emptySkillInput_SkillLevel)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatAdvancedSkillSectionIsEmpty(): EditJobVacancyAssertions {
        this.assertThat(this.page.skillContainer(EditJobVacancyAssertions.ADVANCED).locator(this.page.emptySkillInput_SkillLevel)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertNumberOfIntermediateSkillsIsAtLeast(expectedNumber: number): EditJobVacancyAssertions {
        Assert.assertTrue(this.page.skillContainer("Intermediate").all().length >= expectedNumber);
        return this;
    }

    public assertThatRoleSectionIsNotEmpty(): EditJobVacancyAssertions {
        this.assertThat(this.page.emptyRoleInput).not().isVisible(this.isNotVisibleOptions);
//        this.page.emptyRoleInput().should('not.exist')
        return this;
    }

    public assertThatEditJobVacancyPageTitleIsDisplayed(): EditJobVacancyAssertions {
        this.assertThat(this.page.pageTitle).isVisible(this.isVisibleOptions);
//        this.page.pageTitle().should('exist')
        return this;
    }

    public assertThatSkillIsAddedAsBeginnerOne(skillValue: string): EditJobVacancyAssertions {
        this.assertThat(this.page.skillContainer(EditJobVacancyAssertions.BEGINNER).locator(String.format(EditJobVacancyAssertions.SKILL_XPATH, skillValue))).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatSkillIsAddedAsIntermediateOne(skillValue: string): EditJobVacancyAssertions {
        this.assertThat(this.page.skillContainer(EditJobVacancyAssertions.INTERMEDIATE).locator(String.format(EditJobVacancyAssertions.SKILL_XPATH, skillValue))).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatSkillIsAddedAsAdvancedOne(skillValue: string): EditJobVacancyAssertions {
        this.assertThat(this.page.skillContainer(EditJobVacancyAssertions.ADVANCED).locator(String.format(EditJobVacancyAssertions.SKILL_XPATH, skillValue))).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertNumberOfProficiencyLevels(expectedNumber: number): EditJobVacancyAssertions {
        this.assertThat(this.page.proficencyLevelsHeaders).hasCount(expectedNumber);
        return this;
    }

    public assertPresenceOfProficiencyLevel(expectedLevel: string): EditJobVacancyAssertions {
        Assert.assertTrue(this.page.proficencyLevelsHeaders.allTextContents().contains(expectedLevel));
        return this;
    }

    public assertThatSkillIsAddedToLevel(skillName: string, level: string): EditJobVacancyAssertions {
        Assert.assertTrue(this.page.skillContainer(level).allTextContents().contains(skillName));
        return this;
    }

    public assertThatSkillIsAdded(skillName: string): EditJobVacancyAssertions {
        Assert.assertTrue(this.page.skillChips().allTextContents().contains(skillName));
        return this;
    }
}
