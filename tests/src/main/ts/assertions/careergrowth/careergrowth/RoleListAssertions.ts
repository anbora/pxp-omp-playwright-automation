// @ts-nocheck
import { BaseAssertion } from "common/BaseAssertion";
import { expect } from "common/testing/playwright";
import { Assert, assertTrue } from "common/testing/runtime";
import { RolesListPage_New } from "pages/careergrowth/careergrowth/RolesListPage_New";

export class RoleListAssertions extends BaseAssertion<RolesListPage_New> {

    public assertThatAllJobRolesHeaderIsDisplayed(): RoleListAssertions {
        expect(this.page.allJobRolesHeader).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatSimilarJobVacancyAvailableIconIsDisplayedForRole(roleTitle: string): RoleListAssertions {
        expect(this.page.similarJobVacancyForRoleIcon(roleTitle)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatSimilarJobVacancyAvailableIconIsNotDisplayedForRole(roleTitle: string): RoleListAssertions {
        expect(this.page.similarJobVacancyForRoleIcon(roleTitle)).toBeHidden();
        return this;
    }

    public assertThatFirstRoleIdIsMarkedWithArrowIcon(roleId: string): RoleListAssertions {
        expect(this.page.markedAsAspirationalRoleIdArrowIcon(roleId).first()).toBeVisible(this.isVisibleOptions);
//        this.page.markedAsAspirationalRoleArrowIcon().first().should("be.visible")
        return this;
    }

    public assertNumberOfYourAspirationalRoles(numberOfRoles: number): RoleListAssertions {
        expect(this.page.numberOfYourAspirationalRoles).toHaveCount(numberOfRoles);
//        this.page.numberOfYourAspirationalRoles().wait(3000).contains(numberOfRoles)
        return this;
    }

    public assertThatFirstRoleOnAllRolesListIsEqualTo(roleTitle: string): RoleListAssertions {
        this.page.pause(1000);
        expect(this.page.firstCardName().first()).toContainText(roleTitle, this.containsTextOptions);
        return this;
    }

    public assertThatRecommendedRoleSkillsIconIsDisplayed(roleTitle: string, icon: string): RoleListAssertions {
        expect(this.page.recommendedRoleSkillIcon(roleTitle)).toHaveClass(icon);
        return this;
    }

    public assertThatSkillIsDisplayedOnRecommendedRoleCard(roleTitle: string, skillName: string): RoleListAssertions {
        expect(this.page.skillOnRoleCard(roleTitle, skillName)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatMoreSkillsLinkIsDisplayedOnRecommendedRoleCard(roleTitle: string): RoleListAssertions {
        expect(this.page.moreSkillsLinkOnRecommendedRoleCard(roleTitle)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatJobRoleMatchIsEqualTo(roleTitle: string, match: string): RoleListAssertions {
        expect(this.page.recommendedRoleMatchLabel(roleTitle)).toContainText(match, this.containsTextOptions);
        return this;
    }

    public assertThatFirstRoleOnAllRolesListIsNotEqualTo(roleTitle: string): RoleListAssertions {
        this.page.pause(1000);
        expect(this.page.firstCardName().first()).not.toContainText(roleTitle, this.containsTextOptions);
        return this;
    }

    public assertThatRoleIsNotDisplayedAsRecommended(roleTitle: string): RoleListAssertions {
        expect(this.page.firstCardName().first()).not.toContainText(roleTitle, this.containsTextOptions);
        return this;
    }

    public assertThatLevelIconIsDisplayedForRecommendedRole(roleTitle: string): RoleListAssertions {
        expect(this.page.recommendedRoleLevelIcon(roleTitle)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatJobFamilyIconIsDisplayedForRecommendedRole(roleTitle: string): RoleListAssertions {
        expect(this.page.recommendedRoleJobFamilyIcon(roleTitle)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatRecommendedRoleLevelIsEqualTo(roleTitle: string, level: string): RoleListAssertions {
        expect(this.page.roleLevelByTitle(roleTitle).first()).toContainText(level, this.containsTextOptions);
        return this;
    }

    public assertThatRecommendedRoleJobFamilyIsEqualTo(roleTitle: string, jobFamily: string): RoleListAssertions {
        expect(this.page.roleJobFamilyByTitle(roleTitle).first()).toContainText(jobFamily, this.containsTextOptions);
        return this;
    }

    public assertThatFirstRoleOnRecommendedRolesListIsEqualTo(roleTitle: string): RoleListAssertions {
        expect(this.page.firstCard()).toContainText(roleTitle, this.containsTextOptions);
        return this;
    }

    public assertThatCurrentRoleNameIsEqualTo(role: string): RoleListAssertions {
        expect(this.page.currentRoleName()).toContainText(role, this.containsTextOptions);
        return this;
    }

    public assertThatYourAspirationalRolesInformationTextIsDisplayed(text: string): RoleListAssertions {
        expect(this.page.yourAspirationalRolesInformation()).toBeVisible(this.isVisibleOptions);
        expect(this.page.yourAspirationalRolesInformation()).toContainText(text, this.containsTextOptions);
        return this;
    }

    public assertThatFilterIsApplied(filterValue: string): RoleListAssertions {
        expect(this.page.removeFilterButton(filterValue)).toBeVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatVacancyCardsDisplayProperNumberOfCards(cardsNumber: number): RoleListAssertions {
        expect(this.page.allCards()).toHaveCount(cardsNumber, this.hasCountOptions);
        return this;
    }

    public assertThatJobRoleListContainsValues(currentListOfRoles: Array<string>, expectedListOfRoles: Array<string>): RoleListAssertions {
        Collections.sort(currentListOfRoles);
        Collections.sort(expectedListOfRoles);
        Assert.assertEquals(currentListOfRoles, expectedListOfRoles, "List of roles are different ");
        return this;
    }

    public assertThatJobRoleListContainsNotValues(currentListOfRoles: Array<string>, expectedListOfRoles: Array<string>): RoleListAssertions {
        Collections.sort(currentListOfRoles);
        Collections.sort(expectedListOfRoles);

        let currentSet: any = new HashSet<>(currentListOfRoles);
        let expectedSet: any = new HashSet<>(expectedListOfRoles);

        currentSet.retainAll(expectedSet);
        Assert.assertTrue(currentSet.isEmpty(), "List should not contains any element but it contains: " + currentSet.length + " elements");
        return this;
    }

    public assertThatUrlContainsProperText(urlText: string): RoleListAssertions {
        this.assertTrue(this.page.getPage().url().contains(urlText), "Expected url: '" + urlText + "' but was: '" + this.page.getPage().url() + "'");
        return this;
    }
}
