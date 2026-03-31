// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { Assert } from "common/testing/runtime";
import { EditJobVacancyPage } from "pages/careergrowth/jobs/EditJobVacancyPage";
import { expect } from "common/testing/playwright";

export class EditJobVacancyAssertions extends BaseAssertion<EditJobVacancyPage> {
    private static readonly BEGINNER: number = 1;
    private static readonly INTERMEDIATE: number = 2;
    private static readonly ADVANCED: number = 3;
    public static readonly SKILL_XPATH: string = "//div[contains(@class, 'ed-multi-select__multi-value__label')][text()='%s']";

    public assertThatSkillSectionIsEmpty(): EditJobVacancyAssertions {
        expect(this.page.emptySkillInput).toBeVisible(this.isVisibleOptions);
//        this.page.emptySkillInput().should('exist')
        return this;
    }

    public assertThatBeginnerSkillSectionIsEmpty(): EditJobVacancyAssertions {
        expect(this.page.skillContainer(EditJobVacancyAssertions.BEGINNER).locator(this.page.emptySkillInput_SkillLevel)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatIntermediateSkillSectionIsEmpty(): EditJobVacancyAssertions {
        expect(this.page.skillContainer(EditJobVacancyAssertions.INTERMEDIATE).locator(this.page.emptySkillInput_SkillLevel)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatAdvancedSkillSectionIsEmpty(): EditJobVacancyAssertions {
        expect(this.page.skillContainer(EditJobVacancyAssertions.ADVANCED).locator(this.page.emptySkillInput_SkillLevel)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertNumberOfIntermediateSkillsIsAtLeast(expectedNumber: number): EditJobVacancyAssertions {
        Assert.assertTrue(this.page.skillContainer("Intermediate").all().length >= expectedNumber);
        return this;
    }

    public assertThatRoleSectionIsNotEmpty(): EditJobVacancyAssertions {
        expect(this.page.emptyRoleInput).not.toBeVisible(this.isNotVisibleOptions);
//        this.page.emptyRoleInput().should('not.exist')
        return this;
    }

    public assertThatEditJobVacancyPageTitleIsDisplayed(): EditJobVacancyAssertions {
        expect(this.page.pageTitle).toBeVisible(this.isVisibleOptions);
//        this.page.pageTitle().should('exist')
        return this;
    }

    public assertThatSkillIsAddedAsBeginnerOne(skillValue: string): EditJobVacancyAssertions {
        expect(this.page.skillContainer(EditJobVacancyAssertions.BEGINNER).locator(String.format(EditJobVacancyAssertions.SKILL_XPATH, skillValue))).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatSkillIsAddedAsIntermediateOne(skillValue: string): EditJobVacancyAssertions {
        expect(this.page.skillContainer(EditJobVacancyAssertions.INTERMEDIATE).locator(String.format(EditJobVacancyAssertions.SKILL_XPATH, skillValue))).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatSkillIsAddedAsAdvancedOne(skillValue: string): EditJobVacancyAssertions {
        expect(this.page.skillContainer(EditJobVacancyAssertions.ADVANCED).locator(String.format(EditJobVacancyAssertions.SKILL_XPATH, skillValue))).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertNumberOfProficiencyLevels(expectedNumber: number): EditJobVacancyAssertions {
        expect(this.page.proficencyLevelsHeaders).toHaveCount(expectedNumber);
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
