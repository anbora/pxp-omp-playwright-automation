import { BaseAssertion } from "common/BaseAssertion";
import { LocatorAssertions } from "common/testing/playwright";
import { assertThat } from "common/testing/playwrightAssertions";
import { Assert, assertTrue } from "common/testing/runtime";
import { RolesListPage_New } from "pages/careergrowth/careergrowth/RolesListPage_New";

export class RoleListAssertions extends BaseAssertion<RolesListPage_New> {

    public assertThatAllJobRolesHeaderIsDisplayed(): RoleListAssertions {
        this.assertThat(this.page.allJobRolesHeader).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatSimilarJobVacancyAvailableIconIsDisplayedForRole(roleTitle: string): RoleListAssertions {
        this.assertThat(this.page.similarJobVacancyForRoleIcon(roleTitle)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatSimilarJobVacancyAvailableIconIsNotDisplayedForRole(roleTitle: string): RoleListAssertions {
        this.assertThat(this.page.similarJobVacancyForRoleIcon(roleTitle)).isHidden();
        return this;
    }

    public assertThatFirstRoleIdIsMarkedWithArrowIcon(roleId: string): RoleListAssertions {
        this.assertThat(this.page.markedAsAspirationalRoleIdArrowIcon(roleId).first()).isVisible(this.isVisibleOptions);
//        this.page.markedAsAspirationalRoleArrowIcon().first().should("be.visible")
        return this;
    }

    public assertNumberOfYourAspirationalRoles(numberOfRoles: number): RoleListAssertions {
        this.assertThat(this.page.numberOfYourAspirationalRoles).hasCount(numberOfRoles);
//        this.page.numberOfYourAspirationalRoles().wait(3000).contains(numberOfRoles)
        return this;
    }

    public assertThatFirstRoleOnAllRolesListIsEqualTo(roleTitle: string): RoleListAssertions {
        this.page.pause(1000);
        this.assertThat(this.page.firstCardName().first()).containsText(roleTitle, this.containsTextOptions);
        return this;
    }

    public assertThatRecommendedRoleSkillsIconIsDisplayed(roleTitle: string, icon: string): RoleListAssertions {
        this.assertThat(this.page.recommendedRoleSkillIcon(roleTitle)).hasClass(icon);
        return this;
    }

    public assertThatSkillIsDisplayedOnRecommendedRoleCard(roleTitle: string, skillName: string): RoleListAssertions {
        this.assertThat(this.page.skillOnRoleCard(roleTitle, skillName)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatMoreSkillsLinkIsDisplayedOnRecommendedRoleCard(roleTitle: string): RoleListAssertions {
        this.assertThat(this.page.moreSkillsLinkOnRecommendedRoleCard(roleTitle)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatJobRoleMatchIsEqualTo(roleTitle: string, match: string): RoleListAssertions {
        this.assertThat(this.page.recommendedRoleMatchLabel(roleTitle)).containsText(match, this.containsTextOptions);
        return this;
    }

    public assertThatFirstRoleOnAllRolesListIsNotEqualTo(roleTitle: string): RoleListAssertions {
        this.page.pause(1000);
        this.assertThat(this.page.firstCardName().first()).not().containsText(roleTitle, this.containsTextOptions);
        return this;
    }

    public assertThatRoleIsNotDisplayedAsRecommended(roleTitle: string): RoleListAssertions {
        this.assertThat(this.page.firstCardName().first()).not().containsText(roleTitle, this.containsTextOptions);
        return this;
    }

    public assertThatLevelIconIsDisplayedForRecommendedRole(roleTitle: string): RoleListAssertions {
        this.assertThat(this.page.recommendedRoleLevelIcon(roleTitle)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatJobFamilyIconIsDisplayedForRecommendedRole(roleTitle: string): RoleListAssertions {
        this.assertThat(this.page.recommendedRoleJobFamilyIcon(roleTitle)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatRecommendedRoleLevelIsEqualTo(roleTitle: string, level: string): RoleListAssertions {
        this.assertThat(this.page.roleLevelByTitle(roleTitle).first()).containsText(level, this.containsTextOptions);
        return this;
    }

    public assertThatRecommendedRoleJobFamilyIsEqualTo(roleTitle: string, jobFamily: string): RoleListAssertions {
        this.assertThat(this.page.roleJobFamilyByTitle(roleTitle).first()).containsText(jobFamily, this.containsTextOptions);
        return this;
    }

    public assertThatFirstRoleOnRecommendedRolesListIsEqualTo(roleTitle: string): RoleListAssertions {
        this.assertThat(this.page.firstCard()).containsText(roleTitle, this.containsTextOptions);
        return this;
    }

    public assertThatCurrentRoleNameIsEqualTo(role: string): RoleListAssertions {
        this.assertThat(this.page.currentRoleName()).containsText(role, this.containsTextOptions);
        return this;
    }

    public assertThatYourAspirationalRolesInformationTextIsDisplayed(text: string): RoleListAssertions {
        this.assertThat(this.page.yourAspirationalRolesInformation()).isVisible(this.isVisibleOptions);
        this.assertThat(this.page.yourAspirationalRolesInformation()).containsText(text, this.containsTextOptions);
        return this;
    }

    public assertThatFilterIsApplied(filterValue: string): RoleListAssertions {
        this.assertThat(this.page.removeFilterButton(filterValue)).isVisible(this.isVisibleOptions);
        return this;
    }

    public assertThatVacancyCardsDisplayProperNumberOfCards(cardsNumber: number): RoleListAssertions {
        this.assertThat(this.page.allCards()).hasCount(cardsNumber, this.hasCountOptions);
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
